import simpleGit from 'simple-git';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const git = simpleGit();

export const cloneRepository = async (repoUrl) => {
  const tempDir = path.join(os.tmpdir(), 'explain-my-codebase', Date.now().toString());
  
  try {
    await fs.ensureDir(tempDir);
    console.log(`Cloning ${repoUrl} into ${tempDir}...`);
    await git.clone(repoUrl, tempDir);
    // After cloning, ensure all remote branches are fetched so we can see them
    const repoGit = simpleGit(tempDir);
    await repoGit.fetch(['--all']);
    return tempDir;
  } catch (error) {
    console.error('Error cloning repository:', error);
    throw new Error('Failed to clone repository');
  }
};

export const scanDirectory = async (dirPath) => {
  const structure = [];
  
  const walk = async (currentPath, relativePath = '') => {
    const files = await fs.readdir(currentPath);
    
    for (const file of files) {
      if (file === '.git' || file === 'node_modules') continue;
      
      const fullPath = path.join(currentPath, file);
      const relPath = path.join(relativePath, file);
      const stats = await fs.stat(fullPath);
      
      if (stats.isDirectory()) {
        structure.push({
          name: file,
          path: relPath,
          type: 'directory'
        });
        await walk(fullPath, relPath);
      } else {
        structure.push({
          name: file,
          path: relPath,
          type: 'file',
          extension: path.extname(file)
        });
      }
    }
  };
  
  await walk(dirPath);
  return structure;
};
