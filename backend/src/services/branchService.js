import simpleGit from 'simple-git';

export const getBranchData = async (repoPath) => {
  const git = simpleGit(repoPath);
  
  try {
    // Force a fetch to ensure all remote pointers are available
    await git.fetch(['--all']);
    
    const branches = await git.branch(['-a']);
    
    // Normalize branch names and identify remotes
    const branchMap = new Map();
    
    branches.all.forEach(b => {
      // Ignore HEAD pointer
      if (b.includes('HEAD')) return;
      
      const isRemote = b.startsWith('remotes/origin/');
      const name = b.replace('remotes/origin/', '');
      
      if (!branchMap.has(name) || !isRemote) {
        branchMap.set(name, {
          name,
          fullName: b,
          isRemote
        });
      }
    });

    const uniqueBranches = Array.from(branchMap.values());
    console.log(`Analyzing branches: ${uniqueBranches.map(b => b.name).join(', ')}`);
    
    const branchRelationships = [];
    const commitData = {};

    for (const branchObj of uniqueBranches) {
      const branchName = branchObj.name;
      const branchRef = branchObj.fullName;
      
      try {
        // Get commits for this branch reference
        const logs = await git.log([branchRef, '-n', '10']);
        const branchCommits = logs.all.map(commit => ({
          id: commit.hash,
          message: commit.message,
          author: commit.author_name,
          timestamp: commit.date
        }));
        
        commitData[branchName] = branchCommits;

        // Parent detection
        let createdFrom = null;
        if (branchName !== 'main' && branchName !== 'master') {
           const rootBranch = branchMap.has('main') ? 'main' : (branchMap.has('master') ? 'master' : null);
           
           if (rootBranch && branchName !== rootBranch) {
             try {
                // Find the merge base between the branch and the root
                const base = await git.raw(['merge-base', branchRef, rootBranch]);
                if (base.trim()) {
                  createdFrom = rootBranch;
                }
             } catch (e) {
                // Failed to find merge base
             }
           }
        }

        branchRelationships.push({
          id: branchName,
          label: branchName,
          created_from: createdFrom,
          commits: branchCommits.map(c => c.id)
        });
      } catch (err) {
        console.warn(`Could not process branch ${branchName}:`, err.message);
      }
    }

    return {
      branches: branchRelationships,
      commits: commitData
    };
  } catch (error) {
    console.error('Git branch analysis error:', error);
    return { branches: [], commits: {} };
  }
};

export const getFileModificationFrequency = async (repoPath) => {
  const git = simpleGit(repoPath);
  try {
    const log = await git.raw(['log', '--name-only', '--pretty=format:']);
    const lines = log.split('\n').filter(line => line.trim() !== '');
    
    const frequency = {};
    lines.forEach(file => {
      frequency[file] = (frequency[file] || 0) + 1;
    });

    return frequency;
  } catch (error) {
    console.error('Error getting file frequency:', error);
    return {};
  }
};
