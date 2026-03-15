import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Zap, BookOpen, Code, GitBranch, Layers, Server,
  Globe, Database, Cpu, BarChart3, FolderTree, Search, Eye,
  GitMerge, History, FileCode, Network, AlertCircle, Lightbulb,
  Info, ChevronRight, Terminal, Box, Workflow
} from 'lucide-react';
import './DocumentationPage.css';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Key Features' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'api-reference', label: 'API Reference' },
  { id: 'arch-mapping', label: 'Architecture Mapping' },
  { id: 'branch-evolution', label: 'Branch Evolution' },
  { id: 'commit-analytics', label: 'Commit Analytics' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'project-structure', label: 'Project Structure' },
];

function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="docs-page">
      {/* Background decoration */}
      <div className="bg-decoration">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
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
            <Link to="/docs" style={{ color: '#818cf8' }}>Documentation</Link>
            <a href="#">GitHub Project</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="docs-hero">
        <div className="docs-hero-inner">
          <div className="docs-hero-badge">
            <span className="docs-hero-badge-dot" />
            v1.0 Documentation
          </div>
          <h1>Documentation</h1>
          <p>
            Everything you need to know about <strong>ExplainMyCodebase</strong> — from architecture mapping
            to branch evolution analysis. A comprehensive guide for developers.
          </p>
        </div>
      </div>

      {/* Layout */}
      <div className="docs-layout">
        {/* Sidebar */}
        <aside className="docs-sidebar">
          <p className="docs-sidebar-title">On this page</p>
          <nav className="docs-sidebar-nav">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`docs-sidebar-link ${activeSection === id ? 'docs-sidebar-link--active' : ''}`}
                onClick={() => setActiveSection(id)}
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="docs-content">

          {/* ====== OVERVIEW ====== */}
          <section id="overview" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--indigo">
                <BookOpen size={18} />
              </div>
              <h2 className="docs-section-title">Overview</h2>
            </div>

            <p className="docs-text">
              <strong>ExplainMyCodebase</strong> is an open-source tool that analyzes public GitHub repositories
              and produces interactive visualizations of their <strong>software architecture</strong> and{' '}
              <strong>branch evolution</strong>. It's designed for developers, engineering managers, and
              open-source contributors who want to understand codebases at a glance—without reading
              thousands of lines of code.
            </p>
            <p className="docs-text">
              Simply paste a GitHub URL and the platform will <strong>clone the repository</strong>,
              parse every JavaScript/TypeScript file using <strong>Babel AST</strong>, build a dependency
              graph, and analyze Git branch history—all in real time. The results are presented through
              beautiful, interactive graph visualizations powered by <strong>Cytoscape.js</strong>.
            </p>

            <div className="docs-callout docs-callout--info">
              <div className="docs-callout-icon">
                <Info size={18} color="#60a5fa" />
              </div>
              <div className="docs-callout-content">
                <strong>Who is this for?</strong> This project is ideal for developers joining new teams,
                contributors evaluating open-source repositories, engineering managers reviewing team
                projects, and students learning about software architecture patterns.
              </div>
            </div>
          </section>

          {/* ====== KEY FEATURES ====== */}
          <section id="features" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--emerald">
                <Layers size={18} />
              </div>
              <h2 className="docs-section-title">Key Features</h2>
            </div>

            <div className="docs-feature-list">
              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--indigo" />
                <div>
                  <div className="docs-feature-item-title">Architecture Mapping</div>
                  <div className="docs-feature-item-desc">
                    Deep parsing of JS/TS files using Babel AST to extract imports, exports, and function declarations.
                    Builds a complete dependency graph showing how files are connected to each other.
                  </div>
                </div>
              </div>

              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--emerald" />
                <div>
                  <div className="docs-feature-item-title">Branch Evolution</div>
                  <div className="docs-feature-item-desc">
                    Visualizes Git branch history using a directed acyclic graph (DAG). Shows parent-child relationships
                    between branches and tracks merge-base connections to the main/master branch.
                  </div>
                </div>
              </div>

              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--purple" />
                <div>
                  <div className="docs-feature-item-title">Commit Analytics</div>
                  <div className="docs-feature-item-desc">
                    Retrieves the last 10 commits per branch with author, timestamp, and message data.
                    Click any branch node to see its commit history in a detailed side panel.
                  </div>
                </div>
              </div>

              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--blue" />
                <div>
                  <div className="docs-feature-item-title">Interactive Graph Visualization</div>
                  <div className="docs-feature-item-desc">
                    Powered by Cytoscape.js with the Dagre layout engine. Supports zooming, panning,
                    node selection, and real-time interactivity for both architecture and evolution views.
                  </div>
                </div>
              </div>

              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--amber" />
                <div>
                  <div className="docs-feature-item-title">Auto-Generated File Summaries</div>
                  <div className="docs-feature-item-desc">
                    Each file node includes an automatically generated description based on its name,
                    exports, and functions. Identifies servers, services, routes, controllers, and UI components.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====== ARCHITECTURE ====== */}
          <section id="architecture" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--purple">
                <Network size={18} />
              </div>
              <h2 className="docs-section-title">System Architecture</h2>
            </div>

            <p className="docs-text">
              ExplainMyCodebase follows a classic <strong>client-server architecture</strong> with a
              React frontend and a Node.js/Express backend. The backend handles repository cloning,
              file analysis, and Git operations, while the frontend renders interactive visualizations.
            </p>

            <div className="docs-arch-grid">
              <div className="docs-arch-card" style={{ '--card-accent': '#60a5fa' }}>
                <div className="docs-arch-card-header">
                  <Globe size={16} color="#60a5fa" />
                  <h4>Frontend (React + Vite)</h4>
                </div>
                <p>
                  Single-page application built with React 19 and Vite. Contains the home page with
                  URL input, an interactive graph viewer (Cytoscape.js), a tab switcher for
                  Architecture/Evolution views, and a details side panel.
                </p>
                <span className="docs-arch-card-tag docs-arch-card-tag--frontend">Frontend</span>
              </div>

              <div className="docs-arch-card" style={{ '--card-accent': '#34d399' }}>
                <div className="docs-arch-card-header">
                  <Server size={16} color="#34d399" />
                  <h4>Backend (Express.js)</h4>
                </div>
                <p>
                  REST API server running on Express 5. Handles the <code>/api/analyze</code> endpoint 
                  which orchestrates the full analysis pipeline: clone → scan → parse → build graph → 
                  analyze branches.
                </p>
                <span className="docs-arch-card-tag docs-arch-card-tag--backend">Backend</span>
              </div>

              <div className="docs-arch-card" style={{ '--card-accent': '#c084fc' }}>
                <div className="docs-arch-card-header">
                  <Cpu size={16} color="#c084fc" />
                  <h4>AST Analysis Engine</h4>
                </div>
                <p>
                  Uses <strong>@babel/parser</strong> and <strong>@babel/traverse</strong> to parse
                  JavaScript/TypeScript files into Abstract Syntax Trees. Extracts import declarations,
                  export declarations, and function declarations.
                </p>
                <span className="docs-arch-card-tag docs-arch-card-tag--service">Service</span>
              </div>

              <div className="docs-arch-card" style={{ '--card-accent': '#fbbf24' }}>
                <div className="docs-arch-card-header">
                  <GitBranch size={16} color="#fbbf24" />
                  <h4>Git Analysis Engine</h4>
                </div>
                <p>
                  Uses <strong>simple-git</strong> to interact with cloned repositories. Fetches all remote
                  branches, retrieves commit histories, and computes merge-base relationships to determine
                  branch parentage.
                </p>
                <span className="docs-arch-card-tag docs-arch-card-tag--graph">Git Engine</span>
              </div>
            </div>
          </section>

          {/* ====== TECH STACK ====== */}
          <section id="tech-stack" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--amber">
                <Box size={18} />
              </div>
              <h2 className="docs-section-title">Tech Stack</h2>
            </div>

            <p className="docs-text">
              The project is built entirely with <strong>JavaScript</strong> across both frontend and
              backend, leveraging modern tooling for fast development and an excellent developer experience.
            </p>

            <div className="docs-tech-grid">
              <TechItem color="#60a5fa" label="Re" name="React 19" role="UI Framework" />
              <TechItem color="#a78bfa" label="Vi" name="Vite 8" role="Build Tool" />
              <TechItem color="#34d399" label="Ex" name="Express 5" role="HTTP Server" />
              <TechItem color="#fbbf24" label="Cy" name="Cytoscape.js" role="Graph Rendering" />
              <TechItem color="#f472b6" label="Ba" name="Babel Parser" role="AST Parsing" />
              <TechItem color="#fb7185" label="Ax" name="Axios" role="HTTP Client" />
              <TechItem color="#2dd4bf" label="Sg" name="simple-git" role="Git Operations" />
              <TechItem color="#818cf8" label="Lu" name="Lucide React" role="Icon Library" />
              <TechItem color="#c084fc" label="Fm" name="Framer Motion" role="Animations" />
              <TechItem color="#f59e0b" label="Da" name="Dagre" role="Graph Layout" />
              <TechItem color="#38bdf8" label="Fs" name="fs-extra" role="File System" />
              <TechItem color="#a3e635" label="Nd" name="Node.js" role="Runtime" />
            </div>
          </section>

          {/* ====== HOW IT WORKS ====== */}
          <section id="how-it-works" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--blue">
                <Workflow size={18} />
              </div>
              <h2 className="docs-section-title">How It Works</h2>
            </div>

            <p className="docs-text">
              When a user submits a GitHub repository URL, the system executes a multi-stage analysis
              pipeline. Here's the complete flow from input to visualization:
            </p>

            <div className="docs-flow">
              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">1</div>
                  <div className="docs-flow-line" />
                </div>
                <div className="docs-flow-content">
                  <h4>Repository Cloning</h4>
                  <p>
                    The backend receives the URL and clones the public repository into a temporary
                    directory using <strong>simple-git</strong>. It then runs <code>git fetch --all</code> to
                    ensure all remote branch references are available locally.
                  </p>
                </div>
              </div>

              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">2</div>
                  <div className="docs-flow-line" />
                </div>
                <div className="docs-flow-content">
                  <h4>Directory Scanning</h4>
                  <p>
                    The <strong>repoService</strong> recursively walks through the file tree, cataloging
                    every file and directory while skipping <code>.git</code> and <code>node_modules</code>.
                    Each file's name, path, and extension are recorded.
                  </p>
                </div>
              </div>

              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">3</div>
                  <div className="docs-flow-line" />
                </div>
                <div className="docs-flow-content">
                  <h4>AST Parsing & Analysis</h4>
                  <p>
                    Every <code>.js</code>, <code>.jsx</code>, <code>.ts</code>, and <code>.tsx</code> file
                    is parsed into an AST using <strong>@babel/parser</strong> with JSX, TypeScript, and
                    decorators plugins. <strong>@babel/traverse</strong> then walks the AST to extract
                    import paths, named exports, and function declarations.
                  </p>
                </div>
              </div>

              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">4</div>
                  <div className="docs-flow-line" />
                </div>
                <div className="docs-flow-content">
                  <h4>Graph Construction</h4>
                  <p>
                    The <strong>graphService</strong> converts analysis results into nodes and edges.
                    Each file becomes a node; import statements between files become directed edges.
                    Relative import paths are resolved with common extension fallbacks.
                  </p>
                </div>
              </div>

              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">5</div>
                  <div className="docs-flow-line" />
                </div>
                <div className="docs-flow-content">
                  <h4>Explanation Generation</h4>
                  <p>
                    The <strong>explanationService</strong> generates human-readable summaries for each
                    file based on its name, exports, and functions. It identifies patterns like servers,
                    services, routes, controllers, and UI components.
                  </p>
                </div>
              </div>

              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">6</div>
                  <div className="docs-flow-line" />
                </div>
                <div className="docs-flow-content">
                  <h4>Branch Analysis</h4>
                  <p>
                    The <strong>branchService</strong> lists all branches (local + remote), deduplicates
                    them, and computes parent relationships using <code>git merge-base</code>. It also
                    retrieves the last 10 commits per branch for the commit analytics panel.
                  </p>
                </div>
              </div>

              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">7</div>
                </div>
                <div className="docs-flow-content">
                  <h4>Visualization Rendering</h4>
                  <p>
                    The frontend receives the JSON response and renders two interactive views using
                    <strong> Cytoscape.js</strong>: a force-directed graph (cose layout) for architecture
                    and a left-to-right DAG (dagre layout) for branch evolution. Users can click nodes
                    to see details in a side panel.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ====== API REFERENCE ====== */}
          <section id="api-reference" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--rose">
                <Terminal size={18} />
              </div>
              <h2 className="docs-section-title">API Reference</h2>
            </div>

            <p className="docs-text">
              The backend exposes a simple REST API. All endpoints are served from{' '}
              <code>http://localhost:5000/api</code>.
            </p>

            <div className="docs-table-wrapper">
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="docs-table-method docs-table-method--post">POST</span></td>
                    <td><span className="docs-table-endpoint">/api/analyze</span></td>
                    <td>Analyzes a GitHub repository. Accepts <code>{"{ repoUrl }"}</code> in the request body and returns architecture + evolution data.</td>
                  </tr>
                  <tr>
                    <td><span className="docs-table-method docs-table-method--get">GET</span></td>
                    <td><span className="docs-table-endpoint">/api/health</span></td>
                    <td>Health check endpoint. Returns <code>{"{ status: 'Backend is running' }"}</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="docs-text" style={{ marginTop: '0.5rem' }}>
              <strong>POST /api/analyze — Request Body:</strong>
            </p>
            <div className="docs-code-block" data-lang="json">
              <pre>{`{
  "repoUrl": "https://github.com/username/repo"
}`}</pre>
            </div>

            <p className="docs-text">
              <strong>Response Shape:</strong>
            </p>
            <div className="docs-code-block" data-lang="json">
              <pre>{`{
  "repository": "https://github.com/username/repo",
  "architecture": {
    "nodes": [
      {
        "id": "src/server.js",
        "label": "server.js",
        "type": "module",
        "info": { "functions": [...], "exports": [...] },
        "description": "Auto-generated summary..."
      }
    ],
    "edges": [
      { "source": "src/app.js", "target": "src/utils.js", "type": "dependency" }
    ]
  },
  "evolution": {
    "nodes": [
      { "id": "main", "label": "main", "type": "branch", "info": { "commits": [...] } }
    ],
    "edges": [
      { "source": "main", "target": "feature-branch", "type": "branch_creation" }
    ],
    "commitData": {
      "main": [
        { "id": "abc123", "message": "Initial commit", "author": "dev", "timestamp": "..." }
      ]
    }
  },
  "fileCount": 42,
  "analyzedCount": 18
}`}</pre>
            </div>
          </section>

          {/* ====== ARCHITECTURE MAPPING ====== */}
          <section id="arch-mapping" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--indigo">
                <Code size={18} />
              </div>
              <h2 className="docs-section-title">Architecture Mapping — In Detail</h2>
            </div>

            <p className="docs-text">
              The architecture mapping feature provides a deep analysis of how files in a codebase are
              interconnected. It uses <strong>Abstract Syntax Tree (AST)</strong> parsing to extract
              precise import/export relationships rather than relying on string matching or regex.
            </p>

            <p className="docs-text"><strong>What gets extracted from each file:</strong></p>

            <div className="docs-feature-list">
              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--indigo" />
                <div>
                  <div className="docs-feature-item-title">Import Declarations</div>
                  <div className="docs-feature-item-desc">
                    Every <code>import ... from '...'</code> statement is captured. The source path
                    is stored and later resolved to find matching nodes in the dependency graph.
                  </div>
                </div>
              </div>
              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--emerald" />
                <div>
                  <div className="docs-feature-item-title">Named Exports</div>
                  <div className="docs-feature-item-desc">
                    Named export declarations (<code>export const ...</code>) are extracted to understand
                    what each module publicly exposes to the rest of the codebase.
                  </div>
                </div>
              </div>
              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--purple" />
                <div>
                  <div className="docs-feature-item-title">Function Declarations</div>
                  <div className="docs-feature-item-desc">
                    Top-level <code>function</code> declarations are recorded. These appear in the details
                    panel as clickable tags when a file node is selected.
                  </div>
                </div>
              </div>
            </div>

            <div className="docs-callout docs-callout--tip">
              <div className="docs-callout-icon">
                <Lightbulb size={18} color="#34d399" />
              </div>
              <div className="docs-callout-content">
                <strong>Supported file types:</strong> The analyzer processes <code>.js</code>,{' '}
                <code>.jsx</code>, <code>.ts</code>, and <code>.tsx</code> files. Other file types
                are included in the file count but not parsed for architecture analysis.
              </div>
            </div>

            <p className="docs-text">
              <strong>Graph visualization:</strong> The architecture view uses a <strong>Cose (Compound Spring Embedder)</strong>{' '}
              layout algorithm in Cytoscape.js. Nodes represent files and are colored indigo. Edges represent
              import dependencies and are rendered with directional arrows pointing from importer to imported.
            </p>
          </section>

          {/* ====== BRANCH EVOLUTION ====== */}
          <section id="branch-evolution" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--emerald">
                <GitMerge size={18} />
              </div>
              <h2 className="docs-section-title">Branch Evolution — In Detail</h2>
            </div>

            <p className="docs-text">
              The branch evolution feature maps out <strong>all branches</strong> in a repository and
              visualizes their relationships as a directed graph. This is especially useful for understanding
              how feature branches relate to the main development line.
            </p>

            <p className="docs-text"><strong>How branch parentage is determined:</strong></p>

            <div className="docs-flow">
              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">1</div>
                  <div className="docs-flow-line" />
                </div>
                <div className="docs-flow-content">
                  <h4>Fetch All Branches</h4>
                  <p>
                    Runs <code>git branch -a</code> to list all local and remote branches. Remote
                    branches prefixed with <code>remotes/origin/</code> are normalized to their short names.
                  </p>
                </div>
              </div>

              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">2</div>
                  <div className="docs-flow-line" />
                </div>
                <div className="docs-flow-content">
                  <h4>Deduplication</h4>
                  <p>
                    Local and remote branches with the same name are merged into a single entry.
                    The <code>HEAD</code> pointer is excluded from the list.
                  </p>
                </div>
              </div>

              <div className="docs-flow-step">
                <div className="docs-flow-connector">
                  <div className="docs-flow-number">3</div>
                </div>
                <div className="docs-flow-content">
                  <h4>Merge-Base Computation</h4>
                  <p>
                    For each non-root branch, the system runs <code>git merge-base &lt;branch&gt; main</code>{' '}
                    to find the common ancestor commit. If a merge base exists, the branch is linked
                    to main/master as its parent, creating an edge in the evolution graph.
                  </p>
                </div>
              </div>
            </div>

            <p className="docs-text">
              <strong>Graph visualization:</strong> The evolution view uses a <strong>Dagre (Directed Acyclic Graph)</strong>{' '}
              layout with left-to-right (LR) ranking. Branch nodes are rendered as rounded rectangles in emerald green.
              Clicking a branch reveals its recent commits with author and timestamp information.
            </p>
          </section>

          {/* ====== COMMIT ANALYTICS ====== */}
          <section id="commit-analytics" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--purple">
                <BarChart3 size={18} />
              </div>
              <h2 className="docs-section-title">Commit Analytics — In Detail</h2>
            </div>

            <p className="docs-text">
              When viewing the <strong>Evolution View</strong>, clicking on any branch node reveals its
              recent commit history in the details panel on the right side. This provides quick insights
              into what work has happened on each branch.
            </p>

            <p className="docs-text"><strong>For each commit, the following data is displayed:</strong></p>

            <div className="docs-feature-list">
              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--indigo" />
                <div>
                  <div className="docs-feature-item-title">Commit Message</div>
                  <div className="docs-feature-item-desc">The full commit message summarizing the change.</div>
                </div>
              </div>
              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--emerald" />
                <div>
                  <div className="docs-feature-item-title">Author Name</div>
                  <div className="docs-feature-item-desc">The Git author of the commit, displayed with a user icon.</div>
                </div>
              </div>
              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--purple" />
                <div>
                  <div className="docs-feature-item-title">Timestamp</div>
                  <div className="docs-feature-item-desc">
                    The date and time of the commit, formatted as a readable locale string.
                  </div>
                </div>
              </div>
              <div className="docs-feature-item">
                <div className="docs-feature-bullet docs-feature-bullet--amber" />
                <div>
                  <div className="docs-feature-item-title">Commit Hash</div>
                  <div className="docs-feature-item-desc">
                    The full SHA hash of the commit, used internally for identification.
                  </div>
                </div>
              </div>
            </div>

            <div className="docs-callout docs-callout--info">
              <div className="docs-callout-icon">
                <Info size={18} color="#60a5fa" />
              </div>
              <div className="docs-callout-content">
                Up to <strong>10 commits</strong> are retrieved per branch using <code>git log -n 10</code>.
                This provides recent activity context without overwhelming the response payload.
              </div>
            </div>
          </section>

          {/* ====== GETTING STARTED ====== */}
          <section id="getting-started" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--cyan">
                <Terminal size={18} />
              </div>
              <h2 className="docs-section-title">Getting Started</h2>
            </div>

            <p className="docs-text">
              To run ExplainMyCodebase locally, you'll need <strong>Node.js 18+</strong> and <strong>Git</strong>{' '}
              installed on your machine. Follow these steps:
            </p>

            <p className="docs-text"><strong>1. Clone the project:</strong></p>
            <div className="docs-code-block" data-lang="bash">
              <pre>{`git clone https://github.com/your-username/ExplainMyCodebase.git
cd ExplainMyCodebase`}</pre>
            </div>

            <p className="docs-text"><strong>2. Install backend dependencies:</strong></p>
            <div className="docs-code-block" data-lang="bash">
              <pre>{`cd backend
npm install`}</pre>
            </div>

            <p className="docs-text"><strong>3. Start the backend server:</strong></p>
            <div className="docs-code-block" data-lang="bash">
              <pre>{`npm run dev
# Server starts at http://localhost:5000`}</pre>
            </div>

            <p className="docs-text"><strong>4. Install frontend dependencies (in a new terminal):</strong></p>
            <div className="docs-code-block" data-lang="bash">
              <pre>{`cd frontend
npm install`}</pre>
            </div>

            <p className="docs-text"><strong>5. Start the frontend dev server:</strong></p>
            <div className="docs-code-block" data-lang="bash">
              <pre>{`npm run dev
# App opens at http://localhost:5173`}</pre>
            </div>

            <div className="docs-callout docs-callout--warning">
              <div className="docs-callout-icon">
                <AlertCircle size={18} color="#fbbf24" />
              </div>
              <div className="docs-callout-content">
                <strong>Note:</strong> The backend must be running on port 5000 for the frontend to
                communicate with it. Make sure both backend and frontend are running simultaneously
                before attempting to analyze a repository.
              </div>
            </div>
          </section>

          {/* ====== PROJECT STRUCTURE ====== */}
          <section id="project-structure" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon docs-section-icon--amber">
                <FolderTree size={18} />
              </div>
              <h2 className="docs-section-title">Project Structure</h2>
            </div>

            <p className="docs-text">
              A quick tour of the directory layout and what each file does:
            </p>

            <div className="docs-code-block" data-lang="tree">
              <pre>{`ExplainMyCodebase/
├── backend/
│   ├── src/
│   │   ├── server.js               # Express server entry point (port 5000)
│   │   ├── routes/
│   │   │   └── analyzeRoutes.js    # POST /api/analyze route definition
│   │   ├── controllers/
│   │   │   └── analyzeController.js # Orchestrates the full analysis pipeline
│   │   └── services/
│   │       ├── repoService.js      # Git clone + directory scanning
│   │       ├── analyzerService.js  # Babel AST parsing per file
│   │       ├── graphService.js     # Builds nodes & edges from analysis
│   │       ├── explanationService.js # Auto-generates file summaries
│   │       └── branchService.js    # Git branch & commit analysis
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                # React DOM entry point
│   │   ├── App.jsx                 # Main app with URL input & results
│   │   ├── App.css                 # App-specific styles
│   │   ├── index.css               # Global CSS utilities
│   │   └── components/
│   │       ├── GraphView.jsx       # Architecture graph (Cytoscape cose)
│   │       ├── EvolutionGraph.jsx  # Branch graph (Cytoscape dagre)
│   │       ├── DocumentationPage.jsx  # This documentation page
│   │       └── DocumentationPage.css  # Documentation styles
│   └── package.json
│
└── *.pdf                           # Project blueprint documents`}</pre>
            </div>

            <div className="docs-table-wrapper">
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>File</th>
                    <th>Responsibility</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: '#e2e8f0', fontWeight: 600 }}>Repo Service</td>
                    <td><code>repoService.js</code></td>
                    <td>Clones GitHub repos to temp directory. Recursively scans all files, skipping .git and node_modules.</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#e2e8f0', fontWeight: 600 }}>Analyzer Service</td>
                    <td><code>analyzerService.js</code></td>
                    <td>Parses JS/TS files via Babel AST. Extracts imports, exports, and function declarations.</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#e2e8f0', fontWeight: 600 }}>Graph Service</td>
                    <td><code>graphService.js</code></td>
                    <td>Converts analysis results into graph nodes and edges. Resolves relative import paths.</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#e2e8f0', fontWeight: 600 }}>Explanation Service</td>
                    <td><code>explanationService.js</code></td>
                    <td>Generates human-readable summaries based on filename patterns, exports, and functions.</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#e2e8f0', fontWeight: 600 }}>Branch Service</td>
                    <td><code>branchService.js</code></td>
                    <td>Lists all branches, deduplicates, finds merge-base parents, retrieves last 10 commits per branch.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Back to Home */}
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Link to="/" className="docs-back-btn">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="docs-footer">
        <p>© 2026 ExplainMyCodebase. Built for developers who care about architecture.</p>
      </footer>
    </div>
  );
}

function TechItem({ color, label, name, role }) {
  return (
    <div className="docs-tech-item">
      <div
        className="docs-tech-icon"
        style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
      >
        {label}
      </div>
      <div>
        <div className="docs-tech-name">{name}</div>
        <div className="docs-tech-role">{role}</div>
      </div>
    </div>
  );
}

export default DocumentationPage;
