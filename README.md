# ExplainMyCodebase ⚡

**ExplainMyCodebase** is an open-source tool that analyzes public GitHub repositories and produces interactive visualizations of their **software architecture** and **branch evolution**. It's designed for developers, engineering managers, and open-source contributors who want to understand codebases at a glance—without reading thousands of lines of code.

![Architecture View](https://via.placeholder.com/800x400?text=Architecture+View+Visualization)

## 🚀 Key Features

- **Architecture Mapping**: Deep parsing of JS/TS files using Babel AST to extract imports, exports, and function declarations. Builds a complete dependency graph showing how files are connected.
- **Branch Evolution**: Visualizes Git branch history using a directed acyclic graph (DAG). Shows parent-child relationships between branches and tracks merge-base connections.
- **Commit Analytics**: Retrieves the last 10 commits per branch with author, timestamp, and message data.
- **Interactive Graph Visualization**: Powered by Cytoscape.js with the Dagre layout engine. Supports zooming, panning, and real-time node selection.
- **Auto-Generated File Summaries**: Each file node includes an automatically generated description based on its name, exports, and functions.

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Framework
- **Vite 8** - Build Tool
- **Cytoscape.js** - Graph Rendering
- **Framer Motion** - Animations
- **Lucide React** - Icon Library
- **Axios** - HTTP Client

### Backend
- **Node.js** - Runtime
- **Express 5** - HTTP Server
- **@babel/parser** - AST Parsing
- **simple-git** - Git Operations
- **fs-extra** - File System Utilities

## 🏃 Getting Started

### Prerequisites
- **Node.js 18+**
- **Git**

### 1. Clone the project
```bash
git clone https://github.com/spakigamer/Explain-My-Code-Base.git
cd Explain-My-Code-Base
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
# Server starts at http://localhost:5000
```

### 3. Setup Frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
# App opens at http://localhost:5173
```

> [!IMPORTANT]
> The backend must be running on port 5000 for the frontend to communicate with it.

## 📂 Project Structure

```text
ExplainMyCodebase/
├── backend/
│   ├── src/
│   │   ├── server.js               # Express server entry point
│   │   ├── routes/                 # API route definitions
│   │   ├── controllers/            # Request handlers
│   │   └── services/               # Core logic (Git, AST, Graph)
├── frontend/
│   ├── src/
│   │   ├── components/             # React components (HomePage, GraphView, etc.)
│   │   ├── App.jsx                 # Main application entry
│   │   └── index.css               # Global styles
```

## 📖 How It Works

1.  **Repository Cloning**: The backend clones the public repository into a temporary directory.
2.  **Directory Scanning**: The `repoService` recursively walks through the file tree.
3.  **AST Parsing**: Every JS/TS file is parsed into an AST using `@babel/parser` to extract dependencies.
4.  **Graph Construction**: The `graphService` converts analysis results into nodes and edges.
5.  **Branch Analysis**: The `branchService` computes parent relationships and retrieves commit histories.
6.  **Visualization**: The frontend renders the data using Cytoscape.js.

## 📄 API Reference

### `POST /api/analyze`
Analyzes a GitHub repository.
- **Body**: `{ "repoUrl": "https://github.com/username/repo" }`
- **Returns**: JSON object containing architecture nodes/edges and evolution data.

### `GET /api/health`
Checks if the backend is running.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## ⚖️ License
This project is licensed under the ISC License.
