import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WorkflowDefinition, WorkflowNode } from '../types/workflow';
import { 
  Play, Pause, RotateCcw, ZoomIn, ZoomOut, ExternalLink, CheckCircle2, 
  Clock, Globe, FileText, Send, Webhook, GitFork, Terminal, Copy, Check,
  Activity, AlertCircle, Sparkles, Shield
} from 'lucide-react';
import { ServiceIcon } from './common/BrandIcons';

interface Props {
  workflow: WorkflowDefinition;
  onOpenInStudio?: (workflowId: string) => void;
  className?: string;
  showInspectorPanel?: boolean;
  onWorkflowComplete?: () => void;
  autoRotate?: boolean;
}

export function InteractiveWorkflowCanvas({
  workflow,
  onOpenInStudio,
  className = "",
  showInspectorPanel = true,
  onWorkflowComplete,
  autoRotate = true
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [playbackState, setPlaybackState] = useState<'idle' | 'playing' | 'paused' | 'completed'>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [nodeExecutionStatus, setNodeExecutionStatus] = useState<Record<string, 'ready' | 'pending' | 'running' | 'success' | 'error'>>({});
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [copiedSection, setCopiedSection] = useState<'input' | 'output' | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // References for reliable state machine timing
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const settleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver to pause when off-screen and resume when visible
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Clear all timers
  const clearAllTimers = useCallback(() => {
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current);
      stepTimerRef.current = null;
    }
    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
    if (loopTimerRef.current) {
      clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }
    if (elapsedIntervalRef.current) {
      clearInterval(elapsedIntervalRef.current);
      elapsedIntervalRef.current = null;
    }
  }, []);

  // Reset simulation states
  const resetSimulation = useCallback(() => {
    clearAllTimers();
    setPlaybackState('idle');
    setCurrentStepIndex(-1);
    setSelectedNodeId(workflow.nodes[0]?.id || null);
    setElapsedMs(0);
    pausedElapsedRef.current = 0;

    const initialStatus: Record<string, 'ready' | 'pending' | 'running' | 'success' | 'error'> = {};
    workflow.nodes.forEach(node => {
      initialStatus[node.id] = 'ready';
    });
    setNodeExecutionStatus(initialStatus);
  }, [clearAllTimers, workflow.nodes]);

  // Reset when workflow ID changes
  useEffect(() => {
    resetSimulation();
  }, [workflow.id, resetSimulation]);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Step advancement logic
  const advanceStep = useCallback((stepIdx: number) => {
    const nodes = workflow.nodes;
    if (stepIdx >= nodes.length) {
      // Completed all stages
      setPlaybackState('completed');
      if (elapsedIntervalRef.current) {
        clearInterval(elapsedIntervalRef.current);
        elapsedIntervalRef.current = null;
      }

      // Mark all nodes as success
      setNodeExecutionStatus(prev => {
        const completed: Record<string, 'ready' | 'pending' | 'running' | 'success' | 'error'> = {};
        nodes.forEach(n => { completed[n.id] = 'success'; });
        return completed;
      });

      // Pause before rotating or restarting (2.2s)
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
      loopTimerRef.current = setTimeout(() => {
        if (!isVisible || prefersReducedMotion) return;
        if (onWorkflowComplete && autoRotate) {
          onWorkflowComplete();
        } else {
          resetSimulation();
          advanceStep(0);
        }
      }, 2200);

      return;
    }

    const currentNode = nodes[stepIdx];
    setSelectedNodeId(currentNode.id);
    setCurrentStepIndex(stepIdx);

    // Update statuses: past are success, current is running, future are pending
    setNodeExecutionStatus(prev => {
      const updated = { ...prev };
      nodes.forEach((n, idx) => {
        if (idx < stepIdx) updated[n.id] = 'success';
        else if (idx === stepIdx) updated[n.id] = 'running';
        else updated[n.id] = 'pending';
      });
      return updated;
    });

    // Settle current node to success after realistic step latency
    const stepDuration = 900;
    const settleDelay = 650;

    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      setNodeExecutionStatus(prev => ({
        ...prev,
        [currentNode.id]: 'success'
      }));
    }, settleDelay);

    // Schedule next step
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    stepTimerRef.current = setTimeout(() => {
      advanceStep(stepIdx + 1);
    }, stepDuration);
  }, [workflow.nodes, isVisible, prefersReducedMotion, onWorkflowComplete, autoRotate, resetSimulation]);

  // Play handler
  const handlePlay = useCallback(() => {
    if (playbackState === 'completed') {
      resetSimulation();
    }

    setPlaybackState('playing');
    startTimeRef.current = Date.now() - pausedElapsedRef.current;

    // Start elapsed millisecond timer
    if (elapsedIntervalRef.current) clearInterval(elapsedIntervalRef.current);
    elapsedIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setElapsedMs(elapsed);
    }, 40);

    const nextStep = currentStepIndex < 0 ? 0 : currentStepIndex >= workflow.nodes.length ? 0 : currentStepIndex;
    advanceStep(nextStep);
  }, [playbackState, resetSimulation, currentStepIndex, workflow.nodes.length, advanceStep]);

  // Pause handler
  const handlePause = useCallback(() => {
    setPlaybackState('paused');
    pausedElapsedRef.current = elapsedMs;
    clearAllTimers();
  }, [elapsedMs, clearAllTimers]);

  // Replay handler
  const handleReplay = useCallback(() => {
    resetSimulation();
    setTimeout(() => {
      handlePlay();
    }, 60);
  }, [resetSimulation, handlePlay]);

  // Respond to visibility changes (pause when off-screen, auto-start when visible)
  useEffect(() => {
    if (!isVisible) {
      if (playbackState === 'playing') {
        handlePause();
      }
    } else {
      if (!prefersReducedMotion && playbackState === 'idle') {
        const autoStart = setTimeout(() => {
          handlePlay();
        }, 700);
        return () => clearTimeout(autoStart);
      }
    }
  }, [isVisible, prefersReducedMotion, playbackState, handlePause, handlePlay]);

  // Copy helper
  const handleCopy = (content: unknown, type: 'input' | 'output') => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopiedSection(type);
    setTimeout(() => setCopiedSection(null), 1800);
  };

  const selectedNode = workflow.nodes.find(n => n.id === selectedNodeId) || workflow.nodes[0];

  // Helper to calculate bezier port centers
  const getNodeCenter = (nodeId: string, isOutput: boolean) => {
    const node = workflow.nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return {
      x: isOutput ? node.x + 210 : node.x,
      y: node.y + 42
    };
  };

  // Node icon renderer supporting Clock, Globe, FileText, Send, Webhook, git-fork, and ServiceIcons
  const renderNodeIcon = (icon: string, status: string) => {
    const isRunning = status === 'running';
    const iconClass = `w-4 h-4 transition-all ${isRunning ? 'animate-pulse text-cyan-300' : 'text-slate-300'}`;

    if (icon === 'gemini') {
      return <ServiceIcon id="gemini" className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />;
    }
    if (icon === 'salesforce') {
      return <ServiceIcon id="salesforce" className="w-4 h-4" />;
    }
    if (icon === 'slack') {
      return <ServiceIcon id="slack" className="w-4 h-4" />;
    }
    if (icon === 'postgres') {
      return <ServiceIcon id="postgres" className="w-4 h-4" />;
    }
    if (icon === 'Clock') {
      return <Clock className={`${iconClass} ${isRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />;
    }
    if (icon === 'Globe') {
      return <Globe className={iconClass} />;
    }
    if (icon === 'FileText') {
      return <FileText className={iconClass} />;
    }
    if (icon === 'Send') {
      return <Send className={iconClass} />;
    }
    if (icon === 'Webhook') {
      return <Webhook className={iconClass} />;
    }
    if (icon === 'git-fork') {
      return <GitFork className={iconClass} />;
    }
    return <Terminal className={iconClass} />;
  };

  // Sequence rail labels
  const sequenceLabels = workflow.nodes.map(n => n.title).join(' → ');
  const progressPercent = currentStepIndex < 0 
    ? 0 
    : Math.min(100, Math.round(((currentStepIndex + (playbackState === 'completed' ? 1 : 0.6)) / workflow.nodes.length) * 100));

  return (
    <div 
      ref={containerRef}
      className={`relative flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-[#0F172A] text-slate-100 shadow-2xl ${className}`}
    >
      {/* 1. Top Control Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B1120] border-b border-slate-800 text-xs gap-3">
        {/* Left: Window Dots & Workflow Identity */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-bold text-white tracking-tight truncate">{workflow.name}</span>
          <span className="hidden md:inline-block text-slate-600">·</span>
          <span className="hidden lg:inline-block text-cyan-400 font-mono text-[11px] truncate">
            {sequenceLabels}
          </span>
        </div>

        {/* Right: Controls (Zoom, Replay, Play/Pause, Studio) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-900/90 rounded-lg border border-slate-800 p-0.5">
            <button
              onClick={() => setZoom(prev => Math.max(0.75, +(prev - 0.1).toFixed(2)))}
              className="p-1 hover:text-white text-slate-400 hover:bg-slate-800 rounded transition"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[10px] font-mono text-slate-400">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(1.25, +(prev + 0.1).toFixed(2)))}
              className="p-1 hover:text-white text-slate-400 hover:bg-slate-800 rounded transition"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Replay Control */}
          <button
            onClick={handleReplay}
            className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition text-xs font-medium"
            title="Replay from stage 1"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          {/* Play / Pause Toggle Control */}
          {playbackState === 'playing' ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-sm active:scale-95"
              title="Pause live demo"
            >
              <Pause className="w-3 h-3 fill-current" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg font-semibold text-xs bg-[#0891B2] hover:bg-cyan-500 text-white transition shadow-sm active:scale-95"
              title="Play live demo"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>
                {playbackState === 'paused' ? 'Resume' : playbackState === 'completed' ? 'Restart Demo' : 'Play Live Demo'}
              </span>
            </button>
          )}

          {onOpenInStudio && (
            <button
              onClick={() => onOpenInStudio(workflow.id)}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition ml-1 border border-slate-700"
              title="Open this pipeline in Workflow Studio"
            >
              <span>Studio</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Interactive Stage (Canvas Workspace + Live Inspector) */}
      <div className="relative flex flex-col lg:flex-row min-h-[440px] overflow-hidden">
        
        {/* Left: Canvas Workspace Area */}
        <div className="relative flex-1 overflow-x-auto overflow-y-hidden bg-[#0A0F1D] bg-dot-grid-dark p-6 select-none">
          <div 
            className="relative min-w-[1300px] h-[360px] transition-transform duration-200 origin-top-left"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* SVG Connection Lines & Animated Flowing Packets */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="wire-active-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0891B2" />
                  <stop offset="50%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>

                <filter id="packet-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <filter id="packet-glow-violet" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {workflow.connections.map(conn => {
                const fromIdx = workflow.nodes.findIndex(n => n.id === conn.fromNodeId);
                const toIdx = workflow.nodes.findIndex(n => n.id === conn.toNodeId);

                const start = getNodeCenter(conn.fromNodeId, true);
                const end = getNodeCenter(conn.toNodeId, false);
                const dx = Math.abs(end.x - start.x) * 0.55;
                const pathD = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;

                // Determine if this connection is actively transmitting right now
                const isActivelyTransmitting = (playbackState === 'playing' && toIdx === currentStepIndex);
                const isPastConnected = fromIdx < currentStepIndex || playbackState === 'completed';

                return (
                  <g key={conn.id}>
                    {/* Background Wire Path */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isPastConnected ? "#1E293B" : "#141D2E"}
                      strokeWidth="3.5"
                    />

                    {/* Foreground Active Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={
                        isActivelyTransmitting 
                          ? "url(#wire-active-grad)" 
                          : isPastConnected 
                          ? "#0891B2" 
                          : "#2A374A"
                      }
                      strokeWidth={isActivelyTransmitting ? "2.5" : isPastConnected ? "1.75" : "1.25"}
                      strokeDasharray={isActivelyTransmitting ? "6 4" : "none"}
                      opacity={isActivelyTransmitting ? 1 : isPastConnected ? 0.6 : 0.4}
                      className={isActivelyTransmitting && !prefersReducedMotion ? "animate-wire-flow" : ""}
                    />

                    {/* Flowing Cyan and Violet Data Particles (active transmission) */}
                    {isActivelyTransmitting && !prefersReducedMotion && (
                      <>
                        {/* Cyan Particle */}
                        <circle r="4" fill="#0891B2" filter="url(#packet-glow-cyan)">
                          <animateMotion
                            path={pathD}
                            dur="0.95s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle r="2" fill="#FFFFFF">
                          <animateMotion
                            path={pathD}
                            dur="0.95s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        {/* Violet Particle offset by 0.45s */}
                        <circle r="4" fill="#7C3AED" filter="url(#packet-glow-violet)">
                          <animateMotion
                            path={pathD}
                            dur="0.95s"
                            begin="0.45s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle r="2" fill="#FFFFFF">
                          <animateMotion
                            path={pathD}
                            dur="0.95s"
                            begin="0.45s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        {/* Electric Blue Micro Sparkle */}
                        <circle r="1.5" fill="#38BDF8" opacity="0.9">
                          <animateMotion
                            path={pathD}
                            dur="0.95s"
                            begin="0.22s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </>
                    )}

                    {/* Subtle Heartbeat Particle on already completed connections */}
                    {isPastConnected && !isActivelyTransmitting && !prefersReducedMotion && (
                      <circle r="2.5" fill="#0891B2" opacity="0.4" filter="url(#packet-glow-cyan)">
                        <animateMotion
                          path={pathD}
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Workflow Node Cards */}
            {workflow.nodes.map((node, idx) => {
              const isSelected = selectedNodeId === node.id;
              const status = nodeExecutionStatus[node.id] || 'ready';

              let borderColor = 'border-slate-800/90 hover:border-slate-700';
              let badgeColor = 'bg-slate-800/80 text-slate-400';
              let badgeLabel = 'Ready';

              if (status === 'running') {
                borderColor = 'border-[#0891B2] shadow-[0_0_24px_rgba(8,145,178,0.4)] ring-2 ring-cyan-500/50 bg-[#0E1729]';
                badgeColor = 'bg-cyan-950 text-cyan-300 border border-cyan-700 animate-pulse font-bold';
                badgeLabel = 'Running...';
              } else if (status === 'success') {
                borderColor = 'border-emerald-500/70 shadow-[0_0_12px_rgba(16,185,129,0.2)] bg-[#0C1524]';
                badgeColor = 'bg-emerald-950/70 text-emerald-300 border border-emerald-600/70 font-semibold';
                badgeLabel = '200 OK';
              } else if (status === 'pending') {
                borderColor = 'border-slate-800/90 bg-[#0A101D] opacity-75';
                badgeColor = 'bg-slate-900 text-amber-300/80 border border-amber-900/40';
                badgeLabel = 'Pending';
              } else if (status === 'error') {
                borderColor = 'border-rose-500/80 shadow-[0_0_16px_rgba(244,63,94,0.3)] bg-rose-950/20';
                badgeColor = 'bg-rose-950 text-rose-300 border border-rose-800 font-bold';
                badgeLabel = 'Error';
              } else if (isSelected) {
                borderColor = 'border-[#0891B2] ring-1 ring-[#0891B2]/50';
              }

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: '210px'
                  }}
                  className={`group cursor-pointer rounded-xl backdrop-blur border transition-all duration-200 ${borderColor} p-3.5 z-10 shadow-lg select-none`}
                >
                  {/* Left input port */}
                  {node.inputs.length > 0 && (
                    <div 
                      className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#1E293B] border-2 border-[#0891B2] group-hover:scale-125 transition-transform" 
                      title="Input Port"
                    />
                  )}

                  {/* Right output port */}
                  {node.outputs.length > 0 && (
                    <div 
                      className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#1E293B] border-2 border-[#7C3AED] group-hover:scale-125 transition-transform"
                      title="Output Port"
                    />
                  )}

                  {/* Node Header: Icon + Title + Status Badge */}
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <div className={`w-6 h-6 rounded-md bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shrink-0 ${
                        status === 'running' ? 'border-cyan-500 shadow-[0_0_8px_rgba(8,145,178,0.5)]' : ''
                      }`}>
                        {renderNodeIcon(node.icon, status)}
                      </div>
                      <span className="text-xs font-bold text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
                        {node.title}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${badgeColor}`}>
                      {badgeLabel}
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <div className="text-[11px] text-slate-400 truncate font-mono">
                    {node.subtitle}
                  </div>

                  {/* Live Progress Bar indicator during execution */}
                  {status === 'running' && (
                    <div className="mt-2.5 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 h-full w-full animate-pulse rounded-full" />
                    </div>
                  )}

                  {/* Stage Index Pip */}
                  <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>STAGE 0{idx + 1}</span>
                    <span>{node.executionTime || '40ms'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live Node Data Inspector Panel */}
        {showInspectorPanel && selectedNode && (
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 bg-[#0B1120] p-4 flex flex-col justify-between text-xs shrink-0">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    nodeExecutionStatus[selectedNode.id] === 'running' 
                      ? 'bg-[#0891B2] animate-ping' 
                      : nodeExecutionStatus[selectedNode.id] === 'success'
                      ? 'bg-emerald-400'
                      : 'bg-slate-500'
                  }`} />
                  <span className="font-bold text-slate-200">Node Data Inspector</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80 uppercase">
                  {selectedNode.type}
                </span>
              </div>

              {/* Active Stage Metadata */}
              <div className="space-y-3">
                <div className="bg-[#070D18] p-2.5 rounded-lg border border-slate-800/90">
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">Active Stage</span>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="font-bold text-white text-sm">{selectedNode.title}</p>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      nodeExecutionStatus[selectedNode.id] === 'running'
                        ? 'text-cyan-300 bg-cyan-950 border-cyan-800 animate-pulse'
                        : nodeExecutionStatus[selectedNode.id] === 'success'
                        ? 'text-emerald-300 bg-emerald-950 border-emerald-800'
                        : 'text-slate-400 bg-slate-900 border-slate-800'
                    }`}>
                      {(nodeExecutionStatus[selectedNode.id] || 'READY').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] font-mono mt-1">{selectedNode.subtitle}</p>
                </div>

                {/* Input Arguments */}
                {selectedNode.sampleInput && (
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                      <span>Input Arguments</span>
                      <button
                        onClick={() => handleCopy(selectedNode.sampleInput, 'input')}
                        className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition"
                        title="Copy Input JSON"
                      >
                        {copiedSection === 'input' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedSection === 'input' ? 'Copied' : 'JSON'}</span>
                      </button>
                    </div>
                    <pre className="p-2.5 rounded-lg bg-[#050914] border border-slate-800/90 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-28">
                      {JSON.stringify(selectedNode.sampleInput, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Step Output */}
                {selectedNode.sampleOutput && (
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                      <span>Step Output Response</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] ${
                          nodeExecutionStatus[selectedNode.id] === 'success' 
                            ? 'text-emerald-400 font-semibold' 
                            : nodeExecutionStatus[selectedNode.id] === 'running'
                            ? 'text-cyan-300 animate-pulse'
                            : 'text-slate-400'
                        }`}>
                          {nodeExecutionStatus[selectedNode.id] === 'success' 
                            ? 'Committed' 
                            : nodeExecutionStatus[selectedNode.id] === 'running'
                            ? 'Streaming...'
                            : 'Verified Schema'}
                        </span>
                        <button
                          onClick={() => handleCopy(selectedNode.sampleOutput, 'output')}
                          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition"
                          title="Copy Output JSON"
                        >
                          {copiedSection === 'output' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedSection === 'output' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                    <pre className="p-2.5 rounded-lg bg-[#050914] border border-slate-800/90 text-[11px] font-mono text-emerald-300/95 overflow-x-auto max-h-36">
                      {JSON.stringify(selectedNode.sampleOutput, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Footer of Inspector */}
            <div className="pt-3 border-t border-slate-800 mt-3 space-y-2">
              <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                <span>Latency: <strong className="text-white">{selectedNode.executionTime || '40ms'}</strong></span>
                <span>Type: <strong className="text-cyan-400 uppercase">{selectedNode.type}</strong></span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 leading-tight">
                Benchmark Scenario: Verified deterministic sample traces. Never fabricated as production telemetry.
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. Footer Status Bar with Live Execution Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2 bg-[#080D1A] border-t border-slate-800 text-[11px] text-slate-400 gap-2 font-mono">
        {/* Left: Dynamic Live Metrics */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${playbackState === 'playing' ? 'bg-[#0891B2] animate-ping' : 'bg-slate-600'}`} />
            <span>
              Stage <strong className="text-white">{currentStepIndex >= 0 ? currentStepIndex + 1 : 0}</strong> of <strong className="text-slate-300">{workflow.nodes.length}</strong> stages
            </span>
          </span>

          <span className="text-slate-700">|</span>

          <span>
            Playback: <strong className={`uppercase ${playbackState === 'playing' ? 'text-cyan-400' : 'text-slate-300'}`}>{playbackState}</strong>
          </span>

          <span className="text-slate-700">|</span>

          <span>
            Elapsed: <strong className="text-slate-200">{elapsedMs}ms</strong> <span className="text-slate-500">(Demo)</span>
          </span>

          <span className="text-slate-700">|</span>

          <span>
            Progress: <strong className="text-emerald-400">{progressPercent}%</strong>
          </span>
        </div>

        {/* Right: Demo Label */}
        <div className="text-slate-400 text-[10px] tracking-wide shrink-0">
          [DEMO SIMULATION] Continuous Autonomous Loop · Isolated Benchmark Sandbox
        </div>
      </div>
    </div>
  );
}
