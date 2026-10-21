export type NodeType = 
  | 'trigger' 
  | 'agent' 
  | 'llm' 
  | 'memory' 
  | 'tool' 
  | 'logic' 
  | 'action' 
  | 'human';

export interface WorkflowPort {
  id: string;
  name: string;
  type: 'input' | 'output';
  dataType?: 'json' | 'string' | 'boolean' | 'any';
}

export interface WorkflowNode {
  id: string;
  title: string;
  subtitle: string;
  type: NodeType;
  icon: string;
  x: number;
  y: number;
  status?: 'idle' | 'running' | 'success' | 'error' | 'waiting';
  inputs: WorkflowPort[];
  outputs: WorkflowPort[];
  config?: Record<string, any>;
  sampleInput?: any;
  sampleOutput?: any;
  executionTime?: string;
  model?: string;
}

export interface WorkflowConnection {
  id: string;
  fromNodeId: string;
  fromPortId: string;
  toNodeId: string;
  toPortId: string;
  label?: string;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  category: 'Sales & CRM' | 'Support' | 'Research' | 'DevOps & Cloud' | 'Marketing';
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  triggerType: string;
  executionCount: string;
  avgLatency: string;
}

export interface IntegrationItem {
  id: string;
  name: string;
  category: 'AI Models' | 'Databases' | 'Communication' | 'CRM & Sales' | 'Developer & Cloud' | 'Productivity';
  description: string;
  badge?: string;
  templatesCount: number;
  featured?: boolean;
}

export interface ExecutionLogItem {
  id: string;
  timestamp: string;
  nodeId: string;
  nodeName: string;
  status: 'started' | 'completed' | 'failed' | 'paused';
  durationMs: number;
  tokensUsed?: number;
  details: string;
}
