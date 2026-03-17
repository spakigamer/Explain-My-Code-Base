import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

const ArchitectureMap = ({ data, onNodeClick }) => {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    const elements = [];
    
    // Add nodes
    data.nodes.forEach(node => {
      elements.push({
        data: {
          id: node.id,
          label: node.label,
          type: node.type,
          parent: node.parentId,
          info: node.info
        }
      });
    });

    // Add edges
    data.edges.forEach((edge, index) => {
      elements.push({
        data: {
          id: `e${index}`,
          source: edge.source,
          target: edge.target
        }
      });
    });

    const cy = cytoscape({
      container: containerRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#cbd5e1',
            'font-size': '10px',
            'text-valign': 'center',
            'text-halign': 'center',
            'background-color': '#1e293b',
            'border-width': 1,
            'border-color': '#334155',
            'width': '60px',
            'height': '60px',
            'shape': 'round-rectangle'
          }
        },
        {
          selector: 'node[type="module"]',
          style: {
            'background-color': '#334155',
            'border-color': '#818cf8',
            'border-width': 2,
            'shape': 'rectangle',
            'text-valign': 'top',
            'text-margin-y': -5,
            'font-weight': 'bold',
            'color': '#818cf8'
          }
        },
        {
          selector: 'node[type="file"]',
          style: {
            'background-color': '#0f172a',
            'border-color': '#34d399',
            'shape': 'ellipse',
            'width': '40px',
            'height': '40px'
          }
        },
        {
          selector: 'node[type="function"]',
          style: {
            'background-color': '#1e293b',
            'border-color': '#a78bfa',
            'width': '20px',
            'height': '20px',
            'font-size': '6px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': '#475569',
            'target-arrow-color': '#475569',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'opacity': 0.6
          }
        },
        {
          selector: ':selected',
          style: {
            'border-color': '#f59e0b',
            'border-width': 3,
            'line-color': '#f59e0b',
            'target-arrow-color': '#f59e0b'
          }
        }
      ],
      layout: {
        name: 'dagre',
        rankDir: 'TB',
        nodeSep: 50,
        rankSep: 100
      }
    });

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      onNodeClick(node.data());
    });

    cyRef.current = cy;

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="architecture-map-container">
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div className="map-legend">
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#818cf8' }}></span> Module</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#34d399' }}></span> File</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#a78bfa' }}></span> Function</div>
      </div>
    </div>
  );
};

export default ArchitectureMap;
