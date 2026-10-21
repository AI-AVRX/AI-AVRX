import { WorkflowDefinition } from '../types/workflow';

export const SAMPLE_WORKFLOWS: WorkflowDefinition[] = [
  {
    id: 'market-intel',
    name: 'Autonomous Market & Competitor Intelligence',
    description: 'Scheduled pipeline: Daily Cron → AI Scraper → AI Agent → Report Generator → Output. Ingests competitive filings, synthesizes market signals with Gemini, drafts briefs, and dispatches to Slack.',
    category: 'Research',
    triggerType: 'Cron Schedule (08:00 UTC)',
    executionCount: '15.6k runs',
    avgLatency: '1.8s',
    nodes: [
      {
        id: 'res-1',
        title: 'Daily Cron',
        subtitle: 'Schedule Trigger (08:00 UTC)',
        type: 'trigger',
        icon: 'Clock',
        x: 40,
        y: 150,
        inputs: [],
        outputs: [{ id: 'out-1', name: 'Trigger Event', type: 'output', dataType: 'json' }],
        sampleInput: null,
        sampleOutput: {
          triggerSource: "cron_daemon_0800_utc",
          scheduledTime: "08:00:00Z",
          monitoredSectors: ["Enterprise AI", "Cloud Infrastructure", "DevOps"],
          monitoredDomainsCount: 14,
          jobRunId: "run_88192"
        },
        executionTime: '4ms'
      },
      {
        id: 'res-2',
        title: 'AI Scraper',
        subtitle: 'Headless Feed Extractor',
        type: 'tool',
        icon: 'Globe',
        x: 290,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Target Sources', type: 'input', dataType: 'json' }],
        outputs: [{ id: 'out-1', name: 'Raw Articles', type: 'output', dataType: 'json' }],
        sampleInput: {
          targetSources: [
            "SEC 10-K Filings",
            "Regulatory Feeds",
            "Industry Press RSS",
            "Changelog Feeds"
          ],
          depth: "depth_2_changelogs",
          maxPagesPerDomain: 10
        },
        sampleOutput: {
          recordsParsed: 18,
          sourcesInspected: 14,
          unstructuredTokens: 142000,
          extractedEntities: ["Acme Cloud", "VectorScale", "HyperAgent"],
          status: "ingested_clean"
        },
        executionTime: '640ms'
      },
      {
        id: 'res-3',
        title: 'AI Agent',
        subtitle: 'Gemini 2.5 Flash Analyst',
        type: 'agent',
        icon: 'gemini',
        x: 540,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Raw Articles', type: 'input', dataType: 'json' }],
        outputs: [{ id: 'out-1', name: 'Synthesis', type: 'output', dataType: 'json' }],
        model: 'gemini-2.5-flash',
        sampleInput: {
          rawExtracts: "18 parsed filings & releases across 14 monitored domains",
          task: "Analyze pricing deltas, SOC2 compliance roadmaps, and key feature launches"
        },
        sampleOutput: {
          pricingShiftsDetected: 2,
          featureLaunches: 4,
          marketSentiment: "Neutral-Bullish",
          strategicSummary: "Competitors shifted towards usage-based token tiers and announced SOC2 Type II certs.",
          hallucinationScore: 0.0,
          confidence: 0.98
        },
        executionTime: '420ms'
      },
      {
        id: 'res-4',
        title: 'Report Generator',
        subtitle: 'Format Markdown & Tables',
        type: 'logic',
        icon: 'FileText',
        x: 790,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Synthesis', type: 'input', dataType: 'json' }],
        outputs: [{ id: 'out-1', name: 'Digest JSON', type: 'output', dataType: 'json' }],
        sampleInput: {
          findingsCount: 6,
          template: "executive_markdown_digest",
          includePricingComparison: true
        },
        sampleOutput: {
          documentId: "REP-2026-Q4-88",
          title: "Daily Market Intelligence Brief",
          readTime: "3 min",
          sectionsGenerated: ["Executive Summary", "Pricing Radar", "Roadmap Deltas"],
          status: "compiled_verified"
        },
        executionTime: '38ms'
      },
      {
        id: 'res-5',
        title: 'Output',
        subtitle: 'Slack & Email Dispatch',
        type: 'action',
        icon: 'Send',
        x: 1040,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Digest JSON', type: 'input', dataType: 'json' }],
        outputs: [],
        sampleInput: {
          channel: "#leadership-intel",
          emailList: ["exec-team@avrx.ai"],
          reportId: "REP-2026-Q4-88",
          priority: "high"
        },
        sampleOutput: {
          slackDelivered: true,
          messageId: "msg_intel_99412",
          emailRecipients: 14,
          receiptTimestamp: "08:00:04.120Z",
          deliveryStatus: "200 OK"
        },
        executionTime: '92ms'
      }
    ],
    connections: [
      { id: 'r1', fromNodeId: 'res-1', fromPortId: 'out-1', toNodeId: 'res-2', toPortId: 'in-1' },
      { id: 'r2', fromNodeId: 'res-2', fromPortId: 'out-1', toNodeId: 'res-3', toPortId: 'in-1' },
      { id: 'r3', fromNodeId: 'res-3', fromPortId: 'out-1', toNodeId: 'res-4', toPortId: 'in-1' },
      { id: 'r4', fromNodeId: 'res-4', fromPortId: 'out-1', toNodeId: 'res-5', toPortId: 'in-1' }
    ]
  },
  {
    id: 'lead-qualification',
    name: 'Autonomous Lead Qualification',
    description: 'Direct pipeline: New Lead → AI Agent → Qualification → CRM → Notification. Enriches incoming leads, scores intent with Gemini, updates Salesforce and notifies Slack.',
    category: 'Sales & CRM',
    triggerType: 'Inbound Webhook',
    executionCount: '48.2k runs',
    avgLatency: '1.2s',
    nodes: [
      {
        id: 'node-lead',
        title: 'New Lead',
        subtitle: 'POST /v1/leads/webhook',
        type: 'trigger',
        icon: 'Webhook',
        x: 40,
        y: 150,
        inputs: [],
        outputs: [{ id: 'out-1', name: 'Lead Payload', type: 'output', dataType: 'json' }],
        sampleInput: null,
        sampleOutput: {
          leadId: "LD-9904",
          fullName: "Sarah Connor",
          email: "sarah.connor@cyberdyne.ai",
          company: "Cyberdyne Systems",
          headcount: "450",
          inquiry: "Need enterprise autonomous agent orchestrator for 40 support engineers."
        },
        executionTime: '8ms'
      },
      {
        id: 'node-agent',
        title: 'AI Agent',
        subtitle: 'Gemini 2.5 Flash Reasoner',
        type: 'agent',
        icon: 'gemini',
        x: 290,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Raw Inbound', type: 'input', dataType: 'json' }],
        outputs: [{ id: 'out-1', name: 'Enriched Profile', type: 'output', dataType: 'json' }],
        model: 'gemini-2.5-flash',
        sampleInput: { inquiry: "Autonomous agent orchestrator for 40 support engineers", company: "Cyberdyne Systems" },
        sampleOutput: {
          intentScore: 94,
          budgetSignal: "High (> $50k ARR)",
          industry: "Industrial Automation",
          urgency: "Q4 Immediate",
          recommendedRoute: "direct_sales_exec"
        },
        executionTime: '420ms'
      },
      {
        id: 'node-qual',
        title: 'Qualification',
        subtitle: 'Intent >= 85 & B2B Fit',
        type: 'logic',
        icon: 'git-fork',
        x: 540,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Enriched Profile', type: 'input', dataType: 'json' }],
        outputs: [{ id: 'out-1', name: 'Qualified Deal', type: 'output', dataType: 'json' }],
        sampleInput: { intentScore: 94, budgetSignal: "High (> $50k ARR)" },
        sampleOutput: {
          decision: "QUALIFIED_STRATEGIC",
          priorityTier: "P1 Urgent",
          territory: "North America West"
        },
        executionTime: '4ms'
      },
      {
        id: 'node-crm',
        title: 'CRM',
        subtitle: 'Salesforce Opportunity Sync',
        type: 'action',
        icon: 'salesforce',
        x: 790,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Qualified Deal', type: 'input', dataType: 'json' }],
        outputs: [{ id: 'out-1', name: 'Record ID', type: 'output', dataType: 'string' }],
        sampleInput: { account: "Cyberdyne Systems", stage: "Discovery Call", amount: "$72,000 ARR" },
        sampleOutput: {
          recordId: "0065g000003U8aWAAS",
          stage: "Pipeline: Qualification",
          assignedAE: "Marcus Vance"
        },
        executionTime: '180ms'
      },
      {
        id: 'node-notify',
        title: 'Notification',
        subtitle: 'Slack #inbound-deals Alert',
        type: 'action',
        icon: 'slack',
        x: 1040,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Opportunity Card', type: 'input', dataType: 'json' }],
        outputs: [],
        sampleInput: { channel: "#inbound-deals", message: "🚀 Strategic Lead: Cyberdyne Systems ($72k ARR)" },
        sampleOutput: {
          ok: true,
          channel: "C0123ABC",
          ts: "1729482910.123",
          dispatchedAt: "14:22:01 UTC"
        },
        executionTime: '88ms'
      }
    ],
    connections: [
      { id: 'c1', fromNodeId: 'node-lead', fromPortId: 'out-1', toNodeId: 'node-agent', toPortId: 'in-1' },
      { id: 'c2', fromNodeId: 'node-agent', fromPortId: 'out-1', toNodeId: 'node-qual', toPortId: 'in-1' },
      { id: 'c3', fromNodeId: 'node-qual', fromPortId: 'out-1', toNodeId: 'node-crm', toPortId: 'in-1' },
      { id: 'c4', fromNodeId: 'node-crm', fromPortId: 'out-1', toNodeId: 'node-notify', toPortId: 'in-1' }
    ]
  },
  {
    id: 'support-agent',
    name: 'Autonomous Customer Support',
    description: 'Omnichannel pipeline: New Ticket → AI Agent → Doc Retrieval → Quality Check → Notification. Ingests Zendesk tickets, searches pgvector embeddings, and sends verified solutions.',
    category: 'Support',
    triggerType: 'Zendesk Webhook',
    executionCount: '124.9k runs',
    avgLatency: '890ms',
    nodes: [
      {
        id: 'sup-1',
        title: 'New Ticket',
        subtitle: 'Zendesk Webhook Trigger',
        type: 'trigger',
        icon: 'Webhook',
        x: 40,
        y: 150,
        inputs: [],
        outputs: [{ id: 'out-1', name: 'Ticket Data', type: 'output', dataType: 'json' }],
        sampleInput: null,
        sampleOutput: {
          ticketId: "ZD-9982",
          user: "dev@acme.org",
          subject: "Webhook signature HMAC mismatch on Node v22 rawBody buffer"
        },
        executionTime: '12ms'
      },
      {
        id: 'sup-2',
        title: 'AI Agent',
        subtitle: 'Gemini Intent & Analyzer',
        type: 'agent',
        icon: 'gemini',
        x: 290,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Ticket Query', type: 'input', dataType: 'json' }],
        outputs: [{ id: 'out-1', name: 'Categorized Intent', type: 'output', dataType: 'json' }],
        model: 'gemini-2.5-flash',
        sampleInput: { query: "Node v22 webhook signature HMAC mismatch rawBody buffer" },
        sampleOutput: {
          category: "API Integration",
          severity: "Normal",
          intent: "Documentation Lookup",
          confidenceScore: 0.96
        },
        executionTime: '240ms'
      },
      {
        id: 'sup-3',
        title: 'Doc Retrieval',
        subtitle: 'PostgreSQL pgvector',
        type: 'memory',
        icon: 'postgres',
        x: 540,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Intent', type: 'input', dataType: 'json' }],
        outputs: [{ id: 'out-1', name: 'KB Snippets', type: 'output', dataType: 'json' }],
        sampleInput: { category: "API Integration", keyword: "HMAC Node v22 rawBody" },
        sampleOutput: {
          snippet: "In Node v22, use rawBody buffer instead of parsed JSON body when hashing HMAC with sha256.",
          similarity: 0.94,
          sourceDoc: "Crypto_Migration_v22.md"
        },
        executionTime: '45ms'
      },
      {
        id: 'sup-4',
        title: 'Quality Check',
        subtitle: 'Confidence >= 95%',
        type: 'logic',
        icon: 'git-fork',
        x: 790,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Docs', type: 'input', dataType: 'json' }],
        outputs: [{ id: 'out-1', name: 'Verified Response', type: 'output', dataType: 'json' }],
        sampleInput: { confidence: 0.98, threshold: 0.95 },
        sampleOutput: {
          verified: true,
          canAutoReply: true,
          humanEscalationRequired: false
        },
        executionTime: '3ms'
      },
      {
        id: 'sup-5',
        title: 'Notification',
        subtitle: 'Send Zendesk Resolution',
        type: 'action',
        icon: 'Send',
        x: 1040,
        y: 150,
        inputs: [{ id: 'in-1', name: 'Reply Payload', type: 'input', dataType: 'json' }],
        outputs: [],
        sampleInput: { status: "solved", publicReply: true, ticketId: "ZD-9982" },
        sampleOutput: {
          ok: true,
          ticketUpdated: true,
          replySent: true,
          csatSurveyTriggered: true
        },
        executionTime: '110ms'
      }
    ],
    connections: [
      { id: 's1', fromNodeId: 'sup-1', fromPortId: 'out-1', toNodeId: 'sup-2', toPortId: 'in-1' },
      { id: 's2', fromNodeId: 'sup-2', fromPortId: 'out-1', toNodeId: 'sup-3', toPortId: 'in-1' },
      { id: 's3', fromNodeId: 'sup-3', fromPortId: 'out-1', toNodeId: 'sup-4', toPortId: 'in-1' },
      { id: 's4', fromNodeId: 'sup-4', fromPortId: 'out-1', toNodeId: 'sup-5', toPortId: 'in-1' }
    ]
  }
];
