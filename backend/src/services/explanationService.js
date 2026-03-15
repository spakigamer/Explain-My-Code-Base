import path from 'path';

export const generateExplanations = (nodes) => {
  return nodes.map(node => {
    const fileName = node.label;
    const functions = node.info.functions || [];
    const exports = node.info.exports || [];
    
    let summary = `This module represents ${fileName}. `;
    
    if (exports.length > 0) {
      summary += `It exports the following members: ${exports.join(', ')}. `;
    }
    
    if (functions.length > 0) {
      summary += `It contains functions such as ${functions.slice(0, 3).join(', ')}${functions.length > 3 ? '...' : ''}. `;
    }

    if (fileName.toLowerCase().includes('server')) {
      summary += "This appears to be a server entry point.";
    } else if (fileName.toLowerCase().includes('service')) {
      summary += "This is likely a service layer handling business logic.";
    } else if (fileName.toLowerCase().includes('route')) {
      summary += "This module handles API routing.";
    } else if (fileName.toLowerCase().includes('controller')) {
      summary += "This module acts as a controller for handling requests.";
    } else if (fileName.toLowerCase().includes('component') || fileName.match(/\.jsx$|\.tsx$/)) {
      summary += "This is a UI component.";
    }

    return {
      ...node,
      description: summary
    };
  });
};
