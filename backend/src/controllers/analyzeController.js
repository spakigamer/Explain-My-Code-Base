import { cloneRepository, scanDirectory } from '../services/repoService.js';
import { analyzeRepository } from '../services/analyzerService.js';
import { buildGraph, buildHierarchicalGraph } from '../services/graphService.js';
import { generateExplanations } from '../services/explanationService.js';
import { getBranchData, getFileModificationFrequency } from '../services/branchService.js';
import { generateHealthReport } from '../services/healthService.js';
import fs from 'fs-extra';

export const analyzeRepo = async (req, res) => {
  const { repoUrl } = req.body;
  
  if (!repoUrl) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }

  let repoPath = '';
  try {
    repoPath = await cloneRepository(repoUrl);
    
    // Architecture Analysis
    const fileList = await scanDirectory(repoPath);
    const analysisResults = await analyzeRepository(repoPath, fileList);
    const { nodes: archNodes, edges: archEdges } = buildGraph(analysisResults);
    const explainedNodes = generateExplanations(archNodes);

    const hierarchicalData = buildHierarchicalGraph(analysisResults);

    // Branch Analysis
    const branchInfo = await getBranchData(repoPath);
    const modificationFrequency = await getFileModificationFrequency(repoPath);

    // Health Analysis
    const healthReport = generateHealthReport(archNodes, archEdges, analysisResults, modificationFrequency);

    const branchNodes = branchInfo.branches.map(b => ({
       id: b.id,
       label: b.label,
       type: 'branch',
       info: {
         commits: b.commits
       }
    }));
    const branchEdges = branchInfo.branches
      .filter(b => b.created_from)
      .map(b => ({
        source: b.created_from,
        target: b.id,
        type: 'branch_creation'
      }));
    
    res.json({
      repository: repoUrl,
      architecture: {
        nodes: explainedNodes,
        edges: archEdges
      },
      map: hierarchicalData,
      health: healthReport,
      evolution: {
        nodes: branchNodes,
        edges: branchEdges,
        commitData: branchInfo.commits
      },
      fileCount: fileList.length,
      analyzedCount: analysisResults.length
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze repository' });
  } finally {
    if (repoPath) {
      // fs.remove(repoPath).catch(err => console.error('Cleanup error:', err));
    }
  }
};
