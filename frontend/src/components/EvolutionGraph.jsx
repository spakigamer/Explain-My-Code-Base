import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

const EvolutionGraph = ({ data, onNodeClick }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: {
        nodes: data.nodes.map(node => ({
          data: { ...node }
        })),
        edges: data.edges.map(edge => ({
          data: { ...edge }
        }))
      },
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#059669',
            'label': 'data(label)',
            'color': '#fff',
            'font-size': '12px',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': '120px',
            'height': '40px',
            'shape': 'round-rectangle',
            'border-width': 2,
            'border-color': '#10b981'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#10b981',
            'target-arrow-color': '#10b981',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'target-endpoint': 'outside-to-node'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'background-color': '#10b981',
            'border-color': '#fff',
            'border-width': 4
          }
        }
      ],
      layout: {
        name: 'dagre',
        rankDir: 'LR', // Left to Right
        spacingFactor: 1.2
      }
    });

    cy.on('tap', 'node', (evt) => {
      onNodeClick(evt.target.data());
    });

    return () => cy.destroy();
  }, [data, onNodeClick]);

  return <div ref={containerRef} className="w-full h-full bg-slate-900/40" />;
};

export default EvolutionGraph;
