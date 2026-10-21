import { IntegrationItem } from '../types/workflow';

export const INTEGRATIONS_LIST: IntegrationItem[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'AI Models',
    description: 'Direct multi-modal models including Gemini 2.5 Flash, Pro, reasoning tokens, and native search/maps grounding.',
    badge: 'Official Partner',
    templatesCount: 42,
    featured: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    category: 'AI Models',
    description: 'Claude 3.5 Sonnet and Haiku with deep context windows and tool calling syntax.',
    badge: 'Popular',
    templatesCount: 36,
    featured: true
  },
  {
    id: 'openai',
    name: 'OpenAI GPT-4o',
    category: 'AI Models',
    description: 'GPT-4o, o1 reasoning models, and Whisper audio models with structured JSON output.',
    templatesCount: 38,
    featured: true
  },
  {
    id: 'postgres',
    name: 'PostgreSQL & pgvector',
    category: 'Databases',
    description: 'Execute parameterized queries, perform hybrid vector semantic searches, and stream row transactions.',
    badge: 'Core Engine',
    templatesCount: 54,
    featured: true
  },
  {
    id: 'pinecone',
    name: 'Pinecone Vector DB',
    category: 'Databases',
    description: 'Serverless vector indexes for semantic similarity, agent long-term memory, and RAG pipelines.',
    templatesCount: 29
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    category: 'Databases',
    description: 'Enterprise data cloud connector for multi-cluster warehouse analytics and automated data ingestion.',
    templatesCount: 18
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    description: 'Send block-kit notifications, listen to mention events, and dispatch interactive approval modals.',
    badge: 'Most Used',
    templatesCount: 68,
    featured: true
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'Communication',
    description: 'Post rich embeds, manage community bot interactions, and stream event updates.',
    templatesCount: 22
  },
  {
    id: 'salesforce',
    name: 'Salesforce CRM',
    category: 'CRM & Sales',
    description: 'Create and update Leads, Accounts, Opportunities, and execute SOQL enterprise queries.',
    badge: 'Enterprise',
    templatesCount: 31,
    featured: true
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM & Sales',
    description: 'Synchronize CRM contacts, deals, company enrichments, and marketing email workflows.',
    templatesCount: 27
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Developer & Cloud',
    description: 'Trigger on pull requests, release events, automate issue triage, and post AI code reviews.',
    templatesCount: 45,
    featured: true
  },
  {
    id: 'aws',
    name: 'AWS S3 & Lambda',
    category: 'Developer & Cloud',
    description: 'Trigger serverless functions, upload generated documents, and manage SQS queues.',
    templatesCount: 33
  },
  {
    id: 'stripe',
    name: 'Stripe Payments',
    category: 'Developer & Cloud',
    description: 'Listen to invoice payments, dispute webhooks, refund actions, and churn risk triggers.',
    templatesCount: 24
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity',
    description: 'Sync databases, append meeting summaries, and build collaborative AI research hubs.',
    templatesCount: 39
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Developer & Cloud',
    description: 'Create engineering tickets, sync cycles, and link customer reports to sprint backlogs.',
    templatesCount: 21
  },
  {
    id: 'zendesk',
    name: 'Zendesk Support',
    category: 'Productivity',
    description: 'Automate ticket resolution, assign agents, parse customer intent, and draft macro responses.',
    badge: 'Enterprise',
    templatesCount: 26
  },
  {
    id: 'webhooks',
    name: 'Custom Webhooks & REST',
    category: 'Developer & Cloud',
    description: 'Accept any JSON/XML webhook and call arbitrary HTTP REST endpoints with mutual TLS.',
    templatesCount: 88,
    featured: true
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Databases',
    description: 'Realtime database changes, authentication events, and storage buckets.',
    templatesCount: 30
  }
];
