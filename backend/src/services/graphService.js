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
