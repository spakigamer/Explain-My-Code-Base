import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import fs from 'fs-extra';
import path from 'path';

export const analyzeFile = async (filePath) => {
  const content = await fs.readFile(filePath, 'utf-8');
  
  try {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy'],
    });

    const fileData = {
      path: filePath,
      imports: [],
      exports: [],
      functions: [],
    };

    traverse.default(ast, {
      ImportDeclaration({ node }) {
        fileData.imports.push(node.source.value);
      },
      ExportNamedDeclaration({ node }) {
        if (node.declaration && node.declaration.declarations) {
          node.declaration.declarations.forEach(d => {
            if (d.id) fileData.exports.push(d.id.name);
          });
        }
      },
      FunctionDeclaration({ node }) {
        if (node.id) fileData.functions.push(node.id.name);
      }
    });

    return fileData;
  } catch (error) {
    // console.error(`Error parsing file ${filePath}:`, error.message);
    return null; // Skip files that can't be parsed (e.g. non-JS files)
  }
};

export const analyzeRepository = async (repoPath, fileList) => {
  const analysisResults = [];
  
  for (const file of fileList) {
    if (file.type === 'file' && (file.extension === '.js' || file.extension === '.jsx' || file.extension === '.ts' || file.extension === '.tsx')) {
      const fullPath = path.join(repoPath, file.path);
      const result = await analyzeFile(fullPath);
      if (result) {
        analysisResults.push({
          ...result,
          relativePath: file.path
        });
      }
    }
  }
  
  return analysisResults;
};
