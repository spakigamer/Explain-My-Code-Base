export const detectCycles = (nodes, edges) => {
  const adj = {};
  nodes.forEach(node => {
    adj[node.id] = [];
  });
  edges.forEach(edge => {
    if (adj[edge.source]) {
      adj[edge.source].push(edge.target);
    }
  });

  const visited = new Set();
  const recStack = new Set();
  let cycleCount = 0;

  const dfs = (u) => {
    visited.add(u);
    recStack.add(u);

    for (const v of adj[u] || []) {
      if (!visited.has(v)) {
        if (dfs(v)) return true;
      } else if (recStack.has(v)) {
        return true;
      }
    }

    recStack.delete(u);
    return false;
  };

  nodes.forEach(node => {
    visited.clear();
    recStack.clear();
    if (dfs(node.id)) {
      cycleCount++;
    }
  });

  return cycleCount;
};

export const findUnusedModules = (nodes, edges) => {
  const inDegree = {};
  nodes.forEach(node => inDegree[node.id] = 0);
  edges.forEach(edge => {
    inDegree[edge.target] = (inDegree[edge.target] || 0) + 1;
  });

  const unused = nodes.filter(node => inDegree[node.id] === 0);
  // Exclude main entry points if possible, but for now just count
  return unused.length;
};

export const computeHealthScore = (metrics) => {
  let score = 100;
  score -= (metrics.circularDependencies * 5);
  score -= (metrics.unusedModules * 2);
  score -= (metrics.highComplexityModules * 3);
  
  return Math.max(0, Math.min(100, score));
};

export const generateHealthReport = (nodes, edges, analysisResults, modificationFrequency) => {
  const circularDependencies = detectCycles(nodes, edges);
  const unusedModules = findUnusedModules(nodes, edges);
  
  const highComplexityThreshold = 5; // e.g. depth > 5 or funcs > 15
  const highComplexityModules = analysisResults.filter(res => 
    res.complexity.maxNestingDepth > 4 || res.complexity.functionCount > 10
  ).length;

  // Find most modified file
  let mostModifiedFile = 'none';
  let maxMod = 0;
  Object.entries(modificationFrequency).forEach(([file, count]) => {
    if (count > maxMod) {
      maxMod = count;
      mostModifiedFile = file;
    }
  });

  const metrics = {
    totalModules: nodes.length,
    circularDependencies,
    unusedModules,
    highComplexityModules,
    mostModifiedFile,
  };

  const architectureScore = computeHealthScore(metrics);

  return {
    ...metrics,
    architectureScore
  };
};
