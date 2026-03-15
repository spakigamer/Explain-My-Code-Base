import React, { useState } from 'react';
import axios from 'axios';
import { Search, Info, Github, Layers, Code, Zap, Loader2, GitBranch, Share2, History, User, Calendar } from 'lucide-react';
import GraphView from './GraphView';
import EvolutionGraph from './EvolutionGraph';
import { Link } from 'react-router-dom';

function HomePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('architecture');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);
    setSelectedNode(null);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await axios.post(`${baseUrl}/api/analyze`, { repoUrl: url });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze repository. Make sure the URL is public and valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#050816', color: '#f1f5f9' }}>
      {/* Background Orbs */}
      <div className="bg-decoration">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
      </div>

      {/* Navbar */}
      <nav className="app-navbar">
        <div className="app-navbar-inner">
          <Link to="/" className="app-logo" style={{ textDecoration: 'none' }}>
            <div className="app-logo-icon">
              <Zap size={18} color="#fff" />
            </div>
            <span className="app-logo-text">ExplainMyCodebase</span>
          </Link>
          <div className="app-nav-links">
            <Link to="/docs" style={{ color: '#64748b', textDecoration: 'none' }}>Documentation</Link>
            <a href="https://github.com/spakigamer/Explain-My-Code-Base" style={{ color: '#64748b', textDecoration: 'none' }}>GitHub Project</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem' }}>
        
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Open Source Code Analyzer
          </div>
          
          <h1 className="hero-title">
            Broaden Your Horizons
          </h1>
          
          <p className="hero-subtitle">
            Paste a public GitHub repository URL to analyze both its
            <strong> software architecture</strong> and <strong>branch evolution</strong>.
          </p>

          {/* Search Form */}
          <form onSubmit={handleAnalyze} className="search-form">
            <div className="search-bar">
              <div className="search-icon">
                <Github size={20} />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="search-input"
              />
              <button type="submit" disabled={loading} className="search-button">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
            {error && <p className="search-error">{error}</p>}
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p className="loading-text">Analyzing repository...</p>
            <p className="loading-subtext">This may take a moment depending on the repo size.</p>
          </div>
        )}

        {/* Results */}
        {data && (
          <div className="results-area">
            {/* View Switcher */}
            <div className="view-switcher">
              <div className="view-switcher-inner">
                <button 
                  onClick={() => { setActiveTab('architecture'); setSelectedNode(null); }}
                  className={`view-switcher-btn ${activeTab === 'architecture' ? 'view-switcher-btn--active-arch' : ''}`}
                >
                  <Share2 size={16} /> Architecture View
                </button>
                <button 
                  onClick={() => { setActiveTab('evolution'); setSelectedNode(null); }}
                  className={`view-switcher-btn ${activeTab === 'evolution' ? 'view-switcher-btn--active-evo' : ''}`}
                >
                  <GitBranch size={16} /> Evolution View
                </button>
              </div>
            </div>

            <div className="results-grid">
              {/* Graph Panel */}
              <div className="graph-panel">
                <div className="graph-badge">
                  <div className={`graph-badge-pill ${activeTab === 'architecture' ? 'graph-badge-pill--arch' : 'graph-badge-pill--evo'}`}>
                    {activeTab === 'architecture' ? `${data.analyzedCount} files mapped` : `${data.evolution.nodes.length} branches tracked`}
                  </div>
                </div>
                
                {activeTab === 'architecture' ? (
                  <GraphView data={data.architecture} onNodeClick={setSelectedNode} />
                ) : (
                  <EvolutionGraph data={data.evolution} onNodeClick={setSelectedNode} />
                )}
              </div>

              {/* Details Panel */}
              <div className="details-panel">
                <div className="details-header">
                  {activeTab === 'architecture' 
                    ? <Info size={18} color="#818cf8" /> 
                    : <History size={18} color="#34d399" />
                  }
                  <h3>{activeTab === 'architecture' ? 'Module Details' : 'Branch History'}</h3>
                </div>

                {selectedNode ? (
                  activeTab === 'architecture' ? (
                    <div className="details-content space-y-6">
                      <div>
                        <h4 className="detail-label">File Name</h4>
                        <p className="detail-value">{selectedNode.label}</p>
                      </div>
                      <div>
                        <h4 className="detail-label">Path</h4>
                        <p className="detail-value--path">{selectedNode.id}</p>
                      </div>
                      <div>
                        <h4 className="detail-label">Summary</h4>
                        <p className="detail-value--desc">{selectedNode.description}</p>
                      </div>
                      {selectedNode.info?.functions?.length > 0 && (
                        <div>
                          <h4 className="detail-label">Functions</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {selectedNode.info.functions.map(f => (
                              <span key={f} className="func-tag">{f}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="details-content space-y-6">
                      <div>
                        <h4 className="detail-label">Branch Name</h4>
                        <p className="detail-value" style={{ color: '#6ee7b7' }}>{selectedNode.label}</p>
                      </div>
                      <div>
                        <h4 className="detail-label">Recent Commits</h4>
                        <div className="space-y-4" style={{ marginTop: '0.75rem' }}>
                          {data.evolution.commitData[selectedNode.id]?.map(commit => (
                            <div key={commit.id} className="commit-card">
                              <p className="commit-message">{commit.message}</p>
                              <div className="commit-meta">
                                <span className="commit-meta-item"><User size={10} /> {commit.author}</span>
                                <span className="commit-meta-item"><Calendar size={10} /> {new Date(commit.timestamp).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="details-empty">
                    <Layers size={40} />
                    <p>Select a {activeTab === 'architecture' ? 'module' : 'branch'} to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        {!data && !loading && (
          <div className="features-grid">
            <FeatureCard 
              icon={<Code size={22} className="text-blue-400" />}
              iconClass="feature-card-icon--blue"
              title="Architecture Mapping" 
              desc="Deep parsing of project file relations using Babel AST engines."
            />
            <FeatureCard 
              icon={<GitBranch size={22} className="text-emerald-400" />}
              iconClass="feature-card-icon--emerald"
              title="Branch Evolution" 
              desc="Visualize Git history and parent-child relationships between branches."
            />
            <FeatureCard 
              icon={<History size={22} className="text-purple-400" />}
              iconClass="feature-card-icon--purple"
              title="Commit Analytics" 
              desc="Track changes over time with per-branch commit insights and summaries."
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 ExplainMyCodebase. Built for developers who care about architecture.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, iconClass, title, desc }) {
  return (
    <div className="feature-card">
      <div className={`feature-card-icon ${iconClass || ''}`}>
        {icon}
      </div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-desc">{desc}</p>
    </div>
  );
}

export default HomePage;
