export interface IndustryWorkflowStep {
  name: string;
  type: 'trigger' | 'ai' | 'tool' | 'guardrail' | 'action';
  description: string;
  icon?: string;
}

export interface IndustryWorkflow {
  id: string;
  title: string;
  summary: string;
  trigger: string;
  aiProcessingSteps: string[];
  actions: string[];
  integrations: string[];
  expectedOutput: string;
  latency: string;
  studioWorkflowId?: string;
  steps: IndustryWorkflowStep[];
  samplePayload: Record<string, any>;
}

export interface IndustryItem {
  id: string;
  categoryLabel: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  agentExamples: string[];
  accentColor: string;
  kpi: string;
  workflows: IndustryWorkflow[];
}

export const INDUSTRY_LIST: IndustryItem[] = [
  {
    id: 'finance-insurance',
    categoryLabel: 'FINANCE & INSURANCE',
    name: 'Finance & Insurance',
    headline: 'High-Velocity Loan Inquiries, Document Collection & Policy Support',
    description: 'Automate underwriting intake, eliminate manual loan document follow-ups, and trigger secure compliance checks with verified audit trails.',
    image: '/src/assets/images/industry_finance_ins_1792573479340.jpg',
    agentExamples: [
      'AI Lead Qualification & Intent Scoring',
      'Loan Enquiry Assistant & Eligibility Check',
      'Automated KYC Document Collection & OCR',
      'Policy Support & Coverage Explanation Agent',
      'Renewal Reminders & CRM Account Updates'
    ],
    accentColor: 'from-cyan-500 to-blue-600',
    kpi: '74% reduction in underwriting intake cycle',
    workflows: [
      {
        id: 'wf-loan-intake',
        title: 'Commercial Loan Pre-Qualification & KYC Intake',
        summary: 'Parses borrower filings, executes vector credit policy retrieval, verifies business entity registration, and syncs to Salesforce Financial Cloud.',
        trigger: 'Borrower submits application portal form or webhook',
        aiProcessingSteps: [
          'Gemini 2.5 Flash extracts revenue figures, EIN, and debt structure from PDF uploads',
          'Vector Memory matches applicant against internal credit underwriting guidelines',
          'Policy Guardrail enforces strict PII encryption and compliance boundaries'
        ],
        actions: [
          'Verify corporate entity via official Secretary of State registry API',
          'Create qualified commercial loan pipeline record in CRM',
          'Dispatch automated SMS & email with secure document upload token'
        ],
        integrations: ['Salesforce', 'PostgreSQL', 'Google Gemini', 'Slack', 'Plaid'],
        expectedOutput: 'Approved Pre-Qualification Packet with verified DTI & risk score tier',
        latency: '1.4s',
        studioWorkflowId: 'lead-qualification',
        steps: [
          { name: 'Portal Inbound Webhook', type: 'trigger', description: 'Receives signed application payload & uploaded balance sheet' },
          { name: 'OCR & Document Parser', type: 'tool', description: 'Extracts 10-K, P&L statements, and authorized signatory ID' },
          { name: 'Gemini Underwriting Evaluator', type: 'ai', description: 'Calculates debt-service coverage ratio (DSCR) & intent score' },
          { name: 'KYC & Sanction Screen Gate', type: 'guardrail', description: 'Validates against OFAC & AML watchlist database' },
          { name: 'CRM Opportunity Creation', type: 'action', description: 'Creates tier-1 opportunity in Salesforce Financial Services' }
        ],
        samplePayload: {
          applicant: "Crestview Logistics LLC",
          loanRequested: "$750,000",
          dscrCalculated: 1.84,
          kycStatus: "VERIFIED_CLEAR",
          recommendedTerm: "60 Months @ 6.4%"
        }
      },
      {
        id: 'wf-policy-renewal',
        title: 'Autonomous Policy Renewal & Risk Adjustment',
        summary: 'Monitors commercial policy expiration dates, calculates claim history risk adjustments, and dispatches proactive renewal quotes.',
        trigger: 'Daily cron schedule: 60 days before policy expiration',
        aiProcessingSteps: [
          'Agent analyzes 12-month claim history and loss ratio trends',
          'Synthesizes personalized renewal terms with customized deductible options'
        ],
        actions: [
          'Generate branded renewal binder PDF',
          'Dispatch executive renewal notification with 1-click accept link'
        ],
        integrations: ['PostgreSQL', 'Google Gemini', 'SendGrid', 'Salesforce'],
        expectedOutput: 'Automated Renewal Binder dispatched to policyholder',
        latency: '820ms',
        steps: [
          { name: 'Schedule Trigger', type: 'trigger', description: 'Runs daily at 06:00 UTC querying policies expiring in 60d' },
          { name: 'Claim History Query', type: 'tool', description: 'Fetches historical loss incidents from PostgreSQL' },
          { name: 'Risk Scoring Agent', type: 'ai', description: 'Computes actuarial rating adjustment factor' },
          { name: 'Binder Generation', type: 'action', description: 'Creates cryptographic PDF binder with policy endorsement' }
        ],
        samplePayload: {
          policyId: "POL-99214-COMM",
          insured: "Apex Transport Group",
          lossRatio: "14.2%",
          adjustedPremium: "$34,200",
          renewalStatus: "DISPATCHED"
        }
      }
    ]
  },
  {
    id: 'real-estate',
    categoryLabel: 'REAL ESTATE',
    name: 'Real Estate',
    headline: 'Property Inquiry Triage, Tour Scheduling & Buyer Scoring',
    description: 'Respond to Zillow and website inquiries in seconds, qualify buyer buying power, and automatically synchronize calendars for property walkthroughs.',
    image: '/src/assets/images/industry_real_estate_1792573480067.jpg',
    agentExamples: [
      '24/7 Property Inquiry Agent (Web, SMS, WhatsApp)',
      'Buyer Buying Power & Intent Lead Scoring',
      'Self-Service Site Visit & Tour Scheduling',
      'Automated Buyer Follow-ups & Price Drop Alerts',
      'Listing Data Syndication & MLS Assistance'
    ],
    accentColor: 'from-blue-500 to-indigo-600',
    kpi: '3.8x increase in qualified agent walkthroughs',
    workflows: [
      {
        id: 'wf-site-visit',
        title: 'Inquiry-to-Tour Autonomous Booking Engine',
        summary: 'Captures inquiries from listing portals, engages prospective buyers with instant answers to HOA/school district questions, and books walkthroughs.',
        trigger: 'New lead payload from Zillow/Realtor.com or website form',
        aiProcessingSteps: [
          'Gemini 2.5 Flash parses price ceiling, desired move-in timeline, and pre-approval status',
          'Retrieves property disclosure documents, HOA rules, and floorplan specs via vector search'
        ],
        actions: [
          'Sync open calendar slots with listing agent Google Calendar',
          'Send instant confirmation SMS with lockbox access or agent meetup details',
          'Create contact & deal card in Follow Up Boss / HubSpot CRM'
        ],
        integrations: ['HubSpot', 'Google Calendar', 'Google Gemini', 'Twilio', 'PostgreSQL'],
        expectedOutput: 'Confirmed walkthrough calendar event & enriched CRM buyer record',
        latency: '950ms',
        studioWorkflowId: 'lead-qualification',
        steps: [
          { name: 'Listing Inbound Webhook', type: 'trigger', description: 'Captures incoming buyer contact from MLS portal' },
          { name: 'Property Fact Retriever', type: 'tool', description: 'Queries vector database for property dimensions, HOA fees, schools' },
          { name: 'Buyer Qualification Agent', type: 'ai', description: 'Scores pre-approval letter status and timeline urgency' },
          { name: 'Calendar Sync Action', type: 'action', description: 'Books mutually available 30-min walkthrough slot' }
        ],
        samplePayload: {
          buyerName: "Marcus Thorne",
          propertyAddress: "742 Evergreen Heights, Austin TX",
          budget: "$1,250,000",
          tourTime: "Saturday, 11:00 AM CST",
          agentAssigned: "Sarah Jenkins"
        }
      }
    ]
  },
  {
    id: 'ecommerce-retail',
    categoryLabel: 'E-COMMERCE & RETAIL',
    name: 'E-Commerce & Retail',
    headline: 'Instant Order Resolution, Cart Recovery & Dynamic Restock',
    description: 'Empower shopping experiences with multi-lingual AI support, automated package tracking inquiries, and personalized abandoned cart outreach.',
    image: '/src/assets/images/industry_ecommerce_1792573480055.jpg',
    agentExamples: [
      'Omnichannel AI Shopping & Fit Support',
      'Real-Time Order Status & Shipping Tracking Replies',
      'Predictive Abandoned Cart Follow-ups with Custom Offers',
      'Semantic Product Recommendations & Bundling',
      'Supplier Inventory Low-Stock Alerts & PO Drafting'
    ],
    accentColor: 'from-violet-500 to-cyan-500',
    kpi: '22% lift in abandoned cart revenue conversion',
    workflows: [
      {
        id: 'wf-order-triage',
        title: 'Autonomous Order Inquiry & Return Authorization',
        summary: 'Resolves "Where is my order?" (WISMO) tickets, verifies carrier delivery coordinates, and generates return shipping labels automatically.',
        trigger: 'Customer inquiry via Chat, Email, or WhatsApp',
        aiProcessingSteps: [
          'Gemini 2.5 Flash extracts order number, carrier tracking ID, and sentiment',
          'Evaluates refund eligibility against return policy window (30-day policy)'
        ],
        actions: [
          'Query Shopify / Commerce Layer API for fulfillment tracking status',
          'Call Shippo / EasyPost API to generate prepaid return label if requested',
          'Send personalized resolution message directly to customer chat'
        ],
        integrations: ['Shopify', 'Zendesk', 'Stripe', 'Google Gemini', 'Slack'],
        expectedOutput: 'Resolved support ticket with real-time carrier delivery timeline',
        latency: '680ms',
        studioWorkflowId: 'support-agent',
        steps: [
          { name: 'Zendesk Ticket Webhook', type: 'trigger', description: 'Ingests customer message asking for package status' },
          { name: 'Shopify Order API', type: 'tool', description: 'Fetches fulfillment carrier, tracking code, and delivery date' },
          { name: 'Gemini Customer Agent', type: 'ai', description: 'Synthesizes conversational tracking summary with estimated delivery' },
          { name: 'Zendesk Public Reply', type: 'action', description: 'Closes ticket and marks status as Solved' }
        ],
        samplePayload: {
          orderId: "SH-88421",
          carrier: "FedEx Ground",
          trackingStatus: "Out for Delivery (Expected Today by 4 PM)",
          customerSatisfactionScore: "Predicted 98%"
        }
      }
    ]
  },
  {
    id: 'healthcare',
    categoryLabel: 'HEALTHCARE',
    name: 'Healthcare Administration',
    headline: 'HIPAA-Compliant Patient Intake, Appointment Reminders & Routing',
    description: 'Streamline administrative patient scheduling, automate pre-visit intake questionnaires, and triage non-clinical administrative inquiries without medical diagnosis.',
    image: '/src/assets/images/industry_healthcare_1792573481385.jpg',
    agentExamples: [
      '24/7 Patient Appointment Booking & Rescheduling',
      'Automated Multi-Channel Pre-Visit Reminders (SMS/Email)',
      'Clinical FAQ & Clinic Hours Assistant (Non-Diagnostic)',
      'Digital Intake Form Collection & Insurance Card Verification',
      'Administrative Workflow & Specialty Referral Routing'
    ],
    accentColor: 'from-emerald-500 to-teal-600',
    kpi: '61% reduction in patient appointment no-shows',
    workflows: [
      {
        id: 'wf-patient-scheduling',
        title: 'Administrative Patient Intake & Clinic Routing',
        summary: 'Guides patients through administrative scheduling, collects insurance provider details, and routes them to the correct medical department.',
        trigger: 'Patient initiates web booking widget or phone IVR',
        aiProcessingSteps: [
          'Extracts patient insurance carrier, preferred doctor, and visit reason',
          'Strict Policy Guardrail: Enforces non-clinical boundaries; explicitly blocks medical diagnoses and advises emergency care if acute symptoms are mentioned'
        ],
        actions: [
          'Check EHR / Practice Management scheduling API for clinic availability',
          'Dispatch encrypted SMS appointment confirmation and digital intake link',
          'Sync referral documents to clinic administration queue'
        ],
        integrations: ['Epic EHR (FHIR)', 'Twilio', 'Google Gemini', 'PostgreSQL'],
        expectedOutput: 'Confirmed administrative visit slot & digital intake package dispatched',
        latency: '890ms',
        steps: [
          { name: 'Patient Booking Webhook', type: 'trigger', description: 'Captures appointment request and chosen provider' },
          { name: 'Non-Clinical Policy Filter', type: 'guardrail', description: 'Validates non-diagnostic scope; denies symptom diagnosis' },
          { name: 'EHR Availability Query', type: 'tool', description: 'Queries provider calendar in practice management system' },
          { name: 'Intake Dispatch Action', type: 'action', description: 'Sends HIPAA-compliant SMS with pre-visit paperwork' }
        ],
        samplePayload: {
          patientRef: "PT-90142",
          department: "Orthopedic Clinic",
          appointmentSlot: "Thursday, Oct 29 at 09:30 AM",
          intakeFormStatus: "Sent via Secure SMS",
          diagnosticDisclaimerShown: true
        }
      }
    ]
  },
  {
    id: 'education',
    categoryLabel: 'EDUCATION',
    name: 'Education & Universities',
    headline: 'Admissions Enquiry Assistants, Student Onboarding & Retention',
    description: 'Engage prospective students 24/7, answer tuition and curriculum questions with vector search, and automate application milestone follow-ups.',
    image: '/src/assets/images/industry_education_1792573483635.jpg',
    agentExamples: [
      'Admissions Enquiry Agent with Course Catalog Grounding',
      '24/7 Student Advisory & Campus Services Assistant',
      'Application Milestone Follow-ups & Missing Doc Chasers',
      'Financial Aid & Scholarship Information Guide',
      'Class Schedule Updates & Exam Deadline Reminders'
    ],
    accentColor: 'from-indigo-500 to-violet-600',
    kpi: '48% increase in completed university applications',
    workflows: [
      {
        id: 'wf-admissions-triage',
        title: 'Prospective Student Admissions & Onboarding Agent',
        summary: 'Answers nuanced questions about prerequisite credits, syllabus requirements, and visa guidelines using official university catalog embeddings.',
        trigger: 'Inquiry via university admissions portal or WhatsApp bot',
        aiProcessingSteps: [
          'Retrieves relevant university catalog pages, fee schedules, and academic calendars',
          'Synthesizes personalized response matching student intended major and residency status'
        ],
        actions: [
          'Create prospective student profile in Slate / Salesforce Education Cloud',
          'Schedule 1-on-1 virtual advisory session with admissions counselor',
          'Dispatch customized curriculum overview PDF'
        ],
        integrations: ['Salesforce Education Cloud', 'PostgreSQL', 'Google Gemini', 'Slack'],
        expectedOutput: 'Answered inquiry & scheduled counselor meeting',
        latency: '740ms',
        steps: [
          { name: 'Admissions Webhook', type: 'trigger', description: 'Captures student inquiry about computer science prerequisites' },
          { name: 'Course Catalog RAG', type: 'tool', description: 'Queries vector embeddings of 2026 Academic Bulletin' },
          { name: 'Admissions Specialist Agent', type: 'ai', description: 'Explains transfer credit equivalencies and deadlines' },
          { name: 'Counselor Booking Action', type: 'action', description: 'Schedules 15-min zoom session with faculty advisor' }
        ],
        samplePayload: {
          studentName: "Aiden Vance",
          intendedMajor: "B.S. Artificial Intelligence",
          creditTransferEvaluated: "32 of 36 Credits Accepted",
          counselorAssigned: "Dr. Evelyn Reed",
          status: "Application In Progress"
        }
      }
    ]
  },
  {
    id: 'agencies-services',
    categoryLabel: 'AGENCIES & PROFESSIONAL SERVICES',
    name: 'Agencies & Professional Services',
    headline: 'Client Intake, Automated Proposals & Executive Deliverable Reporting',
    description: 'Transform consulting and marketing agency operations. Generate client proposals from kickoff notes, automate sprint task creation, and build client progress digests.',
    image: '/src/assets/images/industry_agency_ops_1792573481970.jpg',
    agentExamples: [
      'New Client Onboarding & Discovery Intake Agent',
      'Automated Scoped Proposal & SOW Draft Generation',
      'Linear / Jira Task Creation from Meeting Notes',
      'Executive Meeting Summaries & Action Item Extraction',
      'Weekly Multi-Channel Client Performance Reporting'
    ],
    accentColor: 'from-cyan-500 to-violet-600',
    kpi: '12+ hours saved per account director weekly',
    workflows: [
      {
        id: 'wf-agency-intake',
        title: 'Kickoff Call-to-SOW & Linear Project Scaffold',
        summary: 'Ingests call transcripts from Gong or Google Meet, extracts deliverable milestones, formats a Statement of Work, and seeds sprint backlog tasks.',
        trigger: 'Meeting recording uploaded or webhook from Google Meet',
        aiProcessingSteps: [
          'Gemini 2.5 Pro analyzes discovery transcript to extract client goals, budget, and tech stack',
          'Drafts structured Statement of Work (SOW) with milestone pricing tiers'
        ],
        actions: [
          'Create new client workspace in Notion with project brief',
          'Generate sprint backlog epic and child tickets in Linear or Jira',
          'Send draft proposal notification to account director on Slack for review'
        ],
        integrations: ['Linear', 'Notion', 'Slack', 'Google Gemini', 'Google Drive'],
        expectedOutput: 'Approved Proposal Draft & populated Linear engineering backlog',
        latency: '2.1s',
        studioWorkflowId: 'market-intel',
        steps: [
          { name: 'Meeting Transcript Inbound', type: 'trigger', description: 'Receives transcribed text from 45-minute discovery call' },
          { name: 'Gemini Scope Extractor', type: 'ai', description: 'Identifies functional requirements, timeline, and budget constraints' },
          { name: 'Notion Client Hub Action', type: 'action', description: 'Creates project brief page with embedded milestones' },
          { name: 'Linear Backlog Generator', type: 'action', description: 'Populates 14 development user stories with acceptance criteria' }
        ],
        samplePayload: {
          clientName: "Zephyr Health",
          projectScope: "Healthcare Mobile App Redesign",
          estimatedSprintPoints: 68,
          draftBudget: "$48,000",
          linearTicketsCreated: 14,
          slackNotificationDispatched: true
        }
      }
    ]
  }
];
