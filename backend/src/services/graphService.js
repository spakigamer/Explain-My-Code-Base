import path from 'path';

export const buildGraph = (analysisResults) => {
  const nodes = [];
  const edges = [];
  
  // Create nodes
  analysisResults.forEach(res => {
    nodes.push({
      id: res.relativePath,
      label: path.basename(res.relativePath),
      type: 'module',
      info: {
        functions: res.functions,
        exports: res.exports
      }
    });
  });

  // Create edges based on imports
  analysisResults.forEach(res => {
    res.imports.forEach(imp => {
      // Basic relative path resolution
      let targetPath = imp;
      
      // If it starts with ., it's a relative import
      if (imp.startsWith('.')) {
        const dir = path.dirname(res.relativePath);
        targetPath = path.normalize(path.join(dir, imp));
        
        // Handle common extensions if missing
        const possibleTargets = [
          targetPath,
          `${targetPath}.js`,
          `${targetPath}.jsx`,
          `${targetPath}.ts`,
          `${targetPath}.tsx`,
          path.join(targetPath, 'index.js'),
          path.join(targetPath, 'index.ts')
        ].map(p => p.replace(/\\/g, '/'));

        const match = analysisResults.find(r => 
          possibleTargets.includes(r.relativePath.replace(/\\/g, '/'))
        );

        if (match) {
          edges.push({
            source: res.relativePath,
            target: match.relativePath,
            type: 'dependency'
          });
        }
      }
    });
  });

  return { nodes, edges };
};

export const buildHierarchicalGraph = (analysisResults) => {
  const nodes = [];
  const edges = [];
  const folderNodes = new Set();

  analysisResults.forEach(res => {
    const parts = res.relativePath.split(/[\/\\]/);
    let currentPath = '';

    // Create folder nodes
    for (let i = 0; i < parts.length - 1; i++) {
        const prevPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i];
        
        if (!folderNodes.has(currentPath)) {
            nodes.push({
                id: currentPath,
                label: parts[i],
                type: 'module',
                parentId: prevPath || null
            });
            folderNodes.add(currentPath);
        }
    }

    // Create file node
    const filePath = res.relativePath.replace(/\\/g, '/');
    const fileName = parts[parts.length - 1];
    const parentFolder = parts.slice(0, -1).join('/');

    nodes.push({
      id: filePath,
      label: fileName,
      type: 'file',
      parentId: parentFolder || null,
      info: {
        complexity: res.complexity,
        functions: res.functions
      }
    });

    // Create function nodes (Zoom Level 4)
    res.functions.forEach(func => {
        nodes.push({
            id: `${filePath}::${func}`,
            label: func,
            type: 'function',
            parentId: filePath
        });
    });
  });

  // Create edges for dependencies (file to file)
  // Reuse logic from buildGraph or similar
  analysisResults.forEach(res => {
    res.imports.forEach(imp => {
      if (imp.startsWith('.')) {
        const dir = path.dirname(res.relativePath);
        let targetPath = path.normalize(path.join(dir, imp)).replace(/\\/g, '/');
        
        const possibleTargets = [
            targetPath,
            `${targetPath}.js`,
            `${targetPath}.jsx`,
            `${targetPath}.ts`,
            `${targetPath}.tsx`,
            `${targetPath}/index.js`,
            `${targetPath}/index.ts`
        ];

        const match = analysisResults.find(r => 
            possibleTargets.includes(r.relativePath.replace(/\\/g, '/'))
        );

        if (match) {
            edges.push({
                source: res.relativePath.replace(/\\/g, '/'),
                target: match.relativePath.replace(/\\/g, '/'),
                type: 'dependency'
            });
        }
      }
    });
  });

  return { nodes, edges };
};
