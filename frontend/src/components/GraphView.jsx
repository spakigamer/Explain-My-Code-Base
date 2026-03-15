import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

const GraphView = ({ data, onNodeClick }) => {
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
            'background-color': '#4f46e5',
            'label': 'data(label)',
            'color': '#fff',
            'font-size': '12px',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': '60px',
            'height': '60px',
            'border-width': 2,
            'border-color': '#ffffff'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#94a3b8',
            'target-arrow-color': '#94a3b8',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'background-color': '#ec4899',
            'border-width': 4,
            'border-color': '#fbcfe8'
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: true
      }
    });

    cy.on('tap', 'node', (evt) => {
      const nodeData = evt.target.data();
      onNodeClick(nodeData);
    });

    return () => cy.destroy();
  }, [data, onNodeClick]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default GraphView;
