import React, { useState, useRef, useEffect } from 'react';
import { WorkflowDefinition, WorkflowNode, WorkflowConnection, NodeType } from '../../types/workflow';
import { SAMPLE_WORKFLOWS } from '../../data/mockWorkflows';
import { AVRXLogo, ServiceIcon } from '../common/BrandIcons';
import { 
  ArrowLeft, Play, Save, Download, Upload, CheckCircle2, AlertCircle, 
  Trash2, Plus, ZoomIn, ZoomOut, RotateCcw, X, Terminal, ChevronDown, 
  ChevronUp, Sliders, Database, Cpu, Webhook, MessageSquare, Shield,
  GitFork, Clock, UserCheck, Code
} from 'lucide-react';

interface Props {
  initialWorkflowId?: string;
  onExit: () => void;
}

export function WorkflowStudio({ initialWorkflowId, onExit }: Props) {
  // Find initial workflow or default to first
  const initial = SAMPLE_WORKFLOWS.find(w => w.id === initialWorkflowId) || SAMPLE_WORKFLOWS[0];

  const [workflow, setWorkflow] = useState<WorkflowDefinition>(JSON.parse(JSON.stringify(initial)));
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(workflow.nodes[0]?.id || null);
  const [zoom, setZoom] = useState<number>(1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<Array<{ time: string; nodeName: string; msg: string; status: 'info' | 'success' | 'warn' | 'error' }>>([]);
  const [logsOpen, setLogsOpen] = useState<boolean>(true);
  const [activeWireStart, setActiveWireStart] = useState<{ nodeId: string; portId: string } | null>(null);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [nodeFilter, setNodeFilter] = useState('');

  // Node drag state
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Template loader
  const loadTemplate = (id: string) => {
    const found = SAMPLE_WORKFLOWS.find(w => w.id === id);
    if (found) {
      setWorkflow(JSON.parse(JSON.stringify(found)));
      setSelectedNodeId(found.nodes[0]?.id || null);
      setExecutionLogs([{
        time: new Date().toLocaleTimeString(),
        nodeName: 'System',
        msg: `Loaded template: ${found.name}`,
        status: 'info'
      }]);
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = workflow.nodes.find(n => n.id === nodeId);
    if (!node) return;
    setSelectedNodeId(nodeId);
    setDraggedNodeId(nodeId);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNodeId) return;
    const newX = Math.max(10, Math.round((e.clientX - dragOffset.x) / 10) * 10);
    const newY = Math.max(10, Math.round((e.clientY - dragOffset.y) / 10) * 10);

    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => n.id === draggedNodeId ? { ...n, x: newX, y: newY } : n)
    }));
  };

  const handleMouseUp = () => {
    setDraggedNodeId(null);
  };

  // Add new node from palette
  const addNode = (type: NodeType, title: string, subtitle: string, icon: string) => {
    const id = `node-${Date.now().toString().slice(-5)}`;
    // Position node in visible viewport
    const x = 300 + (workflow.nodes.length % 3) * 60;
    const y = 100 + (workflow.nodes.length % 3) * 60;

    const newNode: WorkflowNode = {
      id,
      title,
      subtitle,
      type,
      icon,
      x,
      y,
      inputs: type === 'trigger' ? [] : [{ id: 'in-1', name: 'Input', type: 'input', dataType: 'json' }],
      outputs: [{ id: 'out-1', name: 'Output', type: 'output', dataType: 'json' }],
      status: 'idle',
      sampleInput: { message: "Test payload payload" },
      sampleOutput: { status: "processed", timestamp: Date.now() },
      executionTime: '35ms'
    };

    setWorkflow(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
    setSelectedNodeId(id);

    setExecutionLogs(prev => [
      { time: new Date().toLocaleTimeString(), nodeName: title, msg: `Added node to workflow canvas.`, status: 'info' },
      ...prev
    ]);
  };

  // Wire connect handlers
  const handlePortClick = (e: React.MouseEvent, nodeId: string, portId: string, isOutput: boolean) => {
    e.stopPropagation();

    if (isOutput) {
      setActiveWireStart({ nodeId, portId });
      setExecutionLogs(prev => [
        { time: new Date().toLocaleTimeString(), nodeName: 'Router', msg: `Connection started from port ${portId}. Click an input port to link.`, status: 'info' },
        ...prev
      ]);
    } else if (activeWireStart) {
      if (activeWireStart.nodeId === nodeId) {
        setActiveWireStart(null);
        return;
      }
      // Create new connection
      const newConn: WorkflowConnection = {
        id: `conn-${Date.now()}`,
        fromNodeId: activeWireStart.nodeId,
        fromPortId: activeWireStart.portId,
        toNodeId: nodeId,
        toPortId: portId
      };
      setWorkflow(prev => ({
        ...prev,
        connections: [...prev.connections, newConn]
      }));
      setActiveWireStart(null);
      setExecutionLogs(prev => [
        { time: new Date().toLocaleTimeString(), nodeName: 'Router', msg: `Linked node ${activeWireStart.nodeId} -> ${nodeId}`, status: 'success' },
        ...prev
      ]);
    }
  };

  // Delete node
  const deleteSelectedNode = () => {
    if (!selectedNodeId) return;
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.filter(n => n.id !== selectedNodeId),
      connections: prev.connections.filter(c => c.fromNodeId !== selectedNodeId && c.toNodeId !== selectedNodeId)
    }));
    setSelectedNodeId(null);
  };

  // Validate workflow
  const validateWorkflow = () => {
    const hasTrigger = workflow.nodes.some(n => n.type === 'trigger');
    if (!hasTrigger) {
      setValidationResult({ valid: false, message: 'Workflow must have at least one trigger node.' });
      return;
    }
    const disconnected = workflow.nodes.filter(n => {
      if (n.type === 'trigger') return false;
      return !workflow.connections.some(c => c.toNodeId === n.id);
    });

    if (disconnected.length > 0) {
      setValidationResult({ 
        valid: false, 
        message: `${disconnected.length} node(s) (${disconnected.map(d => d.title).join(', ')}) have no inbound route.` 
      });
      return;
    }

    setValidationResult({ valid: true, message: 'Graph validation passed! All 7 topological rules verified.' });
  };

  // Run full simulated execution
  const executeWorkflow = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setValidationResult(null);

    setExecutionLogs(prev => [
      { time: new Date().toLocaleTimeString(), nodeName: 'Runner', msg: `Starting execution run for '${workflow.name}'...`, status: 'info' },
      ...prev
    ]);

    const stepNodes = [...workflow.nodes];
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < stepNodes.length) {
        const node = stepNodes[idx];
        setSelectedNodeId(node.id);

        setWorkflow(prev => ({
          ...prev,
          nodes: prev.nodes.map(n => n.id === node.id ? { ...n, status: 'running' } : n)
        }));

        setTimeout(() => {
          setWorkflow(prev => ({
            ...prev,
            nodes: prev.nodes.map(n => n.id === node.id ? { ...n, status: 'success' } : n)
          }));
          setExecutionLogs(prev => [
            { time: new Date().toLocaleTimeString(), nodeName: node.title, msg: `Step 0${idx + 1} completed (${node.executionTime || '42ms'}) - Status 200 OK`, status: 'success' },
            ...prev
          ]);
        }, 350);

        idx++;
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        setExecutionLogs(prev => [
          { time: new Date().toLocaleTimeString(), nodeName: 'Runner', msg: `Execution finished with 0 errors. All payloads committed.`, status: 'success' },
          ...prev
        ]);
      }
    }, 700);
  };

  // Save to localStorage
  const saveWorkflow = () => {
    localStorage.setItem(`avrx_workflow_${workflow.id}`, JSON.stringify(workflow));
    setExecutionLogs(prev => [
      { time: new Date().toLocaleTimeString(), nodeName: 'Storage', msg: `Saved workflow '${workflow.name}' to local browser storage.`, status: 'success' },
      ...prev
    ]);
  };

  // Export JSON
  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workflow, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${workflow.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const selectedNode = workflow.nodes.find(n => n.id === selectedNodeId);

  // Available node palette templates
  const paletteCategories = [
    {
      category: 'Triggers',
      items: [
        { type: 'trigger' as NodeType, title: 'Inbound Webhook', subtitle: 'POST /v1/webhook', icon: 'webhook' },
        { type: 'trigger' as NodeType, title: 'Cron Schedule', subtitle: 'Recurring 08:00 UTC', icon: 'clock' },
        { type: 'trigger' as NodeType, title: 'Inbound Email', subtitle: 'Parse support@ email', icon: 'mail' }
      ]
    },
    {
      category: 'AI & Agents',
      items: [
        { type: 'agent' as NodeType, title: 'Gemini 2.5 Flash', subtitle: 'Fast reasoning agent', icon: 'gemini' },
        { type: 'agent' as NodeType, title: 'Gemini 2.5 Pro', subtitle: 'Deep cognitive planner', icon: 'gemini' },
        { type: 'agent' as NodeType, title: 'Intent Classifier', subtitle: 'Categorize inbound requests', icon: 'git-fork' }
      ]
    },
    {
      category: 'Memory & Databases',
      items: [
        { type: 'memory' as NodeType, title: 'pgvector Recall', subtitle: 'PostgreSQL semantic embeddings', icon: 'postgres' },
        { type: 'memory' as NodeType, title: 'Pinecone Index', subtitle: 'Serverless vector search', icon: 'database' }
      ]
    },
    {
      category: 'Governance & Logic',
      items: [
        { type: 'human' as NodeType, title: 'Slack Approval Gate', subtitle: 'Human sign-off checkpoint', icon: 'user-check' },
        { type: 'logic' as NodeType, title: 'Conditional Branch', subtitle: 'IF / ELSE router', icon: 'git-fork' }
      ]
    },
    {
      category: 'Integrations & Actions',
      items: [
        { type: 'action' as NodeType, title: 'Slack Channel Post', subtitle: 'Send block kit alert', icon: 'slack' },
        { type: 'action' as NodeType, title: 'Salesforce CRM', subtitle: 'Upsert opportunity row', icon: 'salesforce' },
        { type: 'action' as NodeType, title: 'HTTP REST Request', subtitle: 'Call external endpoint', icon: 'webhook' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#070A0F] text-slate-100 select-none overflow-hidden font-sans">
      
      {/* Studio Top Navigation Bar */}
      <div className="h-14 px-4 bg-[#0B0F17] border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-xs font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Site</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/avrx-ai-website-logo_3196534c.png"
              alt="AVRX AI"
              className="h-6 sm:h-7 w-auto object-contain"
            />
            <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
            <input
              type="text"
              value={workflow.name}
              onChange={e => setWorkflow({ ...workflow, name: e.target.value })}
              className="bg-transparent text-xs sm:text-sm font-bold text-white px-2 py-1 rounded hover:bg-slate-900/60 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500 w-48 sm:w-72 truncate font-sans"
            />
          </div>
        </div>

        {/* Center / Right Studio Actions */}
        <div className="flex items-center gap-2">
          
          {/* Template Switcher */}
          <div className="relative hidden md:block">
            <select
              value={workflow.id}
              onChange={e => loadTemplate(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-300 px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {SAMPLE_WORKFLOWS.map(t => (
                <option key={t.id} value={t.id}>Template: {t.name.split('&')[0].trim()}</option>
              ))}
            </select>
          </div>

          <button
            onClick={validateWorkflow}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Validate</span>
          </button>

          <button
            onClick={saveWorkflow}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={exportJSON}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          {/* Execution Button */}
          <button
            onClick={executeWorkflow}
            disabled={isExecuting}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition shadow-sm ${
              isExecuting
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isExecuting ? 'animate-pulse' : ''}`} />
            <span>{isExecuting ? 'Running Steps...' : 'Simulate Run'}</span>
          </button>
        </div>
      </div>

      {/* Validation Banner if present */}
      {validationResult && (
        <div className={`px-4 py-2 text-xs flex items-center justify-between border-b ${
          validationResult.valid 
            ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' 
            : 'bg-rose-950/60 border-rose-800 text-rose-300'
        }`}>
          <div className="flex items-center gap-2">
            {validationResult.valid ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{validationResult.message}</span>
          </div>
          <button onClick={() => setValidationResult(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Studio Body (3 Columns) */}
      <div className="relative flex-1 flex overflow-hidden">
        
        {/* Left Column: Node Palette Library */}
        <div className="w-64 bg-[#0A0D15] border-r border-slate-800 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider block mb-2">
              Node Library
            </span>
            <input
              type="text"
              value={nodeFilter}
              onChange={e => setNodeFilter(e.target.value)}
              placeholder="Search components..."
              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {paletteCategories.map((cat, cIdx) => {
              const matchingItems = cat.items.filter(item => 
                item.title.toLowerCase().includes(nodeFilter.toLowerCase()) ||
                item.subtitle.toLowerCase().includes(nodeFilter.toLowerCase())
              );
              if (matchingItems.length === 0) return null;

              return (
                <div key={cIdx}>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">
                    {cat.category}
                  </div>
                  <div className="space-y-1.5">
                    {matchingItems.map((item, iIdx) => (
                      <button
                        key={iIdx}
                        onClick={() => addNode(item.type, item.title, item.subtitle, item.icon)}
                        className="w-full text-left p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between group"
                      >
                        <div className="truncate pr-2">
                          <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 truncate">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono truncate">
                            {item.subtitle}
                          </div>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
            Click component to add to canvas
          </div>
        </div>

        {/* Center: Dotted Canvas Area */}
        <div 
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative flex-1 overflow-auto bg-[#070A0F] bg-dot-grid-dark p-8"
        >
          {/* Zoom and Reset Controls Floating in Canvas */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-[#0F1420]/90 backdrop-blur border border-slate-800 rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono text-slate-300">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(1.4, prev + 0.1))}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Connection Instructions when wiring */}
          {activeWireStart && (
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-cyan-950/90 border border-cyan-800 rounded-lg text-xs text-cyan-300 font-mono shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Wiring: Click destination input port to connect (or click canvas to cancel)</span>
            </div>
          )}

          {/* Scaling Container */}
          <div 
            className="relative min-w-[1400px] min-h-[900px] transition-transform duration-100 origin-top-left"
            style={{ transform: `scale(${zoom})` }}
            onClick={() => setActiveWireStart(null)}
          >
            {/* SVG Wires */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="active-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>

              {workflow.connections.map(conn => {
                const fromNode = workflow.nodes.find(n => n.id === conn.fromNodeId);
                const toNode = workflow.nodes.find(n => n.id === conn.toNodeId);
                if (!fromNode || !toNode) return null;

                const startX = fromNode.x + 230;
                const startY = fromNode.y + 45;
                const endX = toNode.x;
                const endY = toNode.y + 45;
                const dx = Math.abs(endX - startX) * 0.55;
                const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;

                const isConnectedToRunning = isExecuting && (toNode.status === 'running' || fromNode.status === 'running');

                return (
                  <g key={conn.id}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="3.5"
                    />
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isConnectedToRunning ? "url(#active-line-grad)" : "#334155"}
                      strokeWidth={isConnectedToRunning ? "2.5" : "1.75"}
                      strokeDasharray={isConnectedToRunning ? "6 4" : "none"}
                      className={isConnectedToRunning ? "animate-wire-flow" : ""}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Draggable Workflow Nodes */}
            {workflow.nodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              let borderClass = 'border-slate-800 hover:border-slate-700';

              if (node.status === 'running') {
                borderClass = 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/40';
              } else if (node.status === 'success') {
                borderClass = 'border-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
              } else if (isSelected) {
                borderClass = 'border-cyan-400 ring-2 ring-cyan-500/30';
              }

              return (
                <div
                  key={node.id}
                  onMouseDown={e => handleMouseDown(e, node.id)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: '230px'
                  }}
                  className={`group cursor-grab active:cursor-grabbing rounded-xl bg-[#0F1420]/95 backdrop-blur border p-3 z-10 shadow-xl transition-shadow ${borderClass}`}
                >
                  {/* Left Inbound Port */}
                  {node.inputs.map(port => (
                    <div
                      key={port.id}
                      onClick={e => handlePortClick(e, node.id, port.id, false)}
                      className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1E293B] border-2 border-cyan-500/80 hover:bg-cyan-400 hover:scale-125 transition cursor-crosshair z-20 flex items-center justify-center"
                      title={`Connect Input (${port.name})`}
                    />
                  ))}

                  {/* Right Outbound Port */}
                  {node.outputs.map(port => (
                    <div
                      key={port.id}
                      onClick={e => handlePortClick(e, node.id, port.id, true)}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1E293B] border-2 border-violet-500/80 hover:bg-violet-400 hover:scale-125 transition cursor-crosshair z-20 flex items-center justify-center"
                      title={`Connect Output (${port.name})`}
                    />
                  ))}

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center">
                        <ServiceIcon id={node.icon} className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-200 truncate">{node.title}</span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {node.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono truncate">{node.subtitle}</p>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{node.executionTime || 'Ready'}</span>
                    <span className={node.status === 'success' ? 'text-emerald-400' : node.status === 'running' ? 'text-cyan-400' : 'text-slate-400'}>
                      {node.status || 'idle'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Inspector & Configuration */}
        {selectedNode ? (
          <div className="w-80 bg-[#0B0F17] border-l border-slate-800 flex flex-col justify-between shrink-0 p-4 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Configuration</span>
                </div>
                <button
                  onClick={deleteSelectedNode}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-900 transition"
                  title="Delete selected node"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Node Name</label>
                  <input
                    type="text"
                    value={selectedNode.title}
                    onChange={e => {
                      const newTitle = e.target.value;
                      setWorkflow(prev => ({
                        ...prev,
                        nodes: prev.nodes.map(n => n.id === selectedNode.id ? { ...n, title: newTitle } : n)
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Subtitle / Path</label>
                  <input
                    type="text"
                    value={selectedNode.subtitle}
                    onChange={e => {
                      const newSub = e.target.value;
                      setWorkflow(prev => ({
                        ...prev,
                        nodes: prev.nodes.map(n => n.id === selectedNode.id ? { ...n, subtitle: newSub } : n)
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono focus:outline-none focus:border-cyan-500 text-[11px]"
                  />
                </div>

                {selectedNode.type === 'agent' && (
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Inference Model</label>
                    <select
                      value={selectedNode.model || 'gemini-2.5-flash'}
                      onChange={e => {
                        const m = e.target.value;
                        setWorkflow(prev => ({
                          ...prev,
                          nodes: prev.nodes.map(n => n.id === selectedNode.id ? { ...n, model: m } : n)
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono text-[11px]"
                    >
                      <option value="gemini-2.5-flash">Google Gemini 2.5 Flash</option>
                      <option value="gemini-2.5-pro">Google Gemini 2.5 Pro</option>
                      <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</option>
                      <option value="llama-3-70b">Llama 3 70B (VPC Host)</option>
                    </select>
                  </div>
                )}

                {/* Sample JSON payload */}
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="font-semibold">Mock Input JSON</span>
                    <span className="font-mono text-[10px] text-cyan-400">Sandbox</span>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-[#05070B] border border-slate-800 text-[11px] font-mono text-slate-300 max-h-36 overflow-auto">
                    {JSON.stringify(selectedNode.sampleInput || { test: true }, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="font-semibold">Output Preview</span>
                    <span className="font-mono text-[10px] text-emerald-400">200 OK</span>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-[#05070B] border border-slate-800 text-[11px] font-mono text-emerald-300/90 max-h-36 overflow-auto">
                    {JSON.stringify(selectedNode.sampleOutput || { processed: true }, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>ID: {selectedNode.id}</span>
              <span className="font-mono">{selectedNode.executionTime || '0ms'}</span>
            </div>
          </div>
        ) : (
          <div className="w-80 bg-[#0B0F17] border-l border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-500">
            <Sliders className="w-8 h-8 text-slate-700 mb-2" />
            <p className="text-xs">Select any node on the canvas to inspect and configure its parameters.</p>
          </div>
        )}

      </div>

      {/* Bottom Collapsible Execution Logs Drawer */}
      <div className="bg-[#0A0D14] border-t border-slate-800 shrink-0">
        <div 
          onClick={() => setLogsOpen(!logsOpen)}
          className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition text-xs"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-slate-300 font-mono text-[11px]">EXECUTION RUNTIME CONSOLE</span>
            <span className="text-slate-500 font-mono text-[11px]">({executionLogs.length} events)</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[10px] font-mono">Simulated Local Environment</span>
            {logsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </div>
        </div>

        {logsOpen && (
          <div className="h-32 overflow-y-auto px-4 py-2 space-y-1 font-mono text-[11px] bg-[#05070B] border-t border-slate-900">
            {executionLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-slate-500 shrink-0">{log.time}</span>
                <span className={`shrink-0 font-semibold ${
                  log.status === 'success' ? 'text-emerald-400' :
                  log.status === 'warn' ? 'text-amber-400' :
                  log.status === 'error' ? 'text-rose-400' : 'text-cyan-400'
                }`}>
                  [{log.nodeName}]
                </span>
                <span className="text-slate-300">{log.msg}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
