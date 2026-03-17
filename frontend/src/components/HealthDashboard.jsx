import React from 'react';
import { Activity, AlertCircle, CheckCircle, FileCode, GitCommit, Layout, Package } from 'lucide-react';

const HealthDashboard = ({ healthData }) => {
  if (!healthData) return null;

  const {
    architectureScore,
    totalModules,
    circularDependencies,
    unusedModules,
    highComplexityModules,
    mostModifiedFile
  } = healthData;

  const getScoreColor = (score) => {
    if (score > 80) return '#10b981';
    if (score > 50) return '#f59e0b';
    return '#ef4444';
  };

  const circumference = 2 * Math.PI * 65;
  const offset = circumference - (architectureScore / 100) * circumference;

  return (
    <div className="health-dashboard animate-fade-in">
      <div className="health-grid">
        {/* Main Score Card */}
        <div className="health-card health-card--main glass">
          <div className="health-score-container">
            <svg className="health-score-svg" width="160" height="160">
              <circle
                className="health-score-bg"
                cx="80" cy="80" r="65"
                strokeWidth="10"
              />
              <circle
                className="health-score-progress"
                cx="80" cy="80" r="65"
                strokeWidth="10"
                stroke={getScoreColor(architectureScore)}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="health-score-text">
              <span className="health-score-value">{architectureScore}</span>
              <span className="health-score-label">pts</span>
            </div>
          </div>
          <h2 className="health-title">Architecture Health</h2>
          <p className="health-subtitle">Overall quality based on structural patterns</p>
        </div>

        {/* Metrics Column */}
        <div className="metrics-column">
          <MetricCard 
            icon={<Package size={20} />} 
            label="Total Modules" 
            value={totalModules} 
            color="#818cf8"
            desc="Total JS/TS files analyzed"
          />
          <MetricCard 
            icon={<AlertCircle size={20} />} 
            label="Circular" 
            value={circularDependencies} 
            color={circularDependencies > 0 ? '#ef4444' : '#10b981'}
            warning={circularDependencies > 0}
            desc="Modules that depend on each other"
          />
          <MetricCard 
            icon={<Layout size={20} />} 
            label="Unused" 
            value={unusedModules} 
            color={unusedModules > (totalModules * 0.1) ? '#f59e0b' : '#10b981'}
            desc="Files with no incoming imports"
          />
          <MetricCard 
            icon={<Activity size={20} />} 
            label="Complex" 
            value={highComplexityModules} 
            color={highComplexityModules > 5 ? '#f59e0b' : '#10b981'}
            desc="Deeply nested code structures"
          />
        </div>

        {/* Volatility Card */}
        <div className="info-card glass">
          <div className="info-card-header">
            <div className="info-icon-box">
              <GitCommit size={20} />
            </div>
            <h3>Most Volatile Module</h3>
          </div>
          <div className="volatile-path-box">
            <p className="info-card-value">{mostModifiedFile}</p>
          </div>
          <p className="info-card-desc">
            This module has the highest change frequency. High volatility in complex modules often indicates technical debt.
          </p>
        </div>
      </div>

      <div className="health-recommendations glass">
        <div className="recommendations-header">
           <Layout size={18} />
           <h3>Optimization Strategy</h3>
        </div>
        <div className="recommendations-grid">
          {circularDependencies > 0 && (
            <div className="rec-item rec-item--danger">
              <div className="rec-icon"><AlertCircle size={16} /></div>
              <p>Break <strong>{circularDependencies}</strong> circular dependency chains to prevent memory leaks and tight coupling.</p>
            </div>
          )}
          {unusedModules > 0 && (
            <div className="rec-item rec-item--info">
              <div className="rec-icon"><CheckCircle size={16} /></div>
              <p>Verify if <strong>{unusedModules}</strong> identified unused modules are dead code or dynamic imports.</p>
            </div>
          )}
          {highComplexityModules > 0 && (
            <div className="rec-item rec-item--warning">
              <div className="rec-icon"><FileCode size={16} /></div>
              <p>Refactor <strong>{highComplexityModules}</strong> modules with deep nesting to reduce cognitive load.</p>
            </div>
          )}
          {architectureScore > 85 && (
            <div className="rec-item rec-item--success">
              <div className="rec-icon"><CheckCircle size={16} /></div>
              <p>Excellent work! Your modular architecture is highly maintainable.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, color, warning, desc }) => (
  <div className={`metric-card glass ${warning ? 'metric-card--warning' : ''}`}>
    <div className="metric-icon" style={{ backgroundColor: `${color}15`, color }}>
      {icon}
    </div>
    <div className="metric-info">
      <div className="metric-top">
        <span className="metric-label">{label}</span>
        <span className="metric-value" style={{ color }}>{value}</span>
      </div>
      <span className="metric-desc">{desc}</span>
    </div>
  </div>
);

export default HealthDashboard;
