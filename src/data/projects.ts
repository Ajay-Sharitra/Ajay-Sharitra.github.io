export interface Project {
  id: string;
  slug: string;
  title: string;
  titleLines: string[];
  category: string;
  year: string;
  badge: string;
  role: string;
  services: string[];
  tools: string[];
  summary: string;
  problemSolved: string;
  overview: string;
  architecture: {
    layer: string;
    detail: string;
  }[];
  developmentProcess: {
    phase: string;
    description: string;
  }[];
  challenges: string;
  implementationDetails: string;
  finalOutcome: string;
  highlights: string[];
  cover: string;
  gallery: {
    src: string;
    caption: string;
  }[];
  githubUrl?: string;
  externalUrl?: string;
  stats: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: '01',
    slug: 'daysoft',
    title: 'DAY SOFT',
    titleLines: ['DAY', 'SOFT'],
    category: 'STANDALONE DAYBOOK MANAGEMENT SOFTWARE',
    year: '2024 — 2025',
    badge: 'LIVE · NATIVE DESKTOP',
    role: 'System Architect & Solo Software Developer',
    services: ['Desktop Software Engineering', 'Offline-First Architecture', 'Local Data Cryptography'],
    tools: ['Python', 'PySide6 / Qt', 'SQLite', 'Encrypted Local Storage', 'Automated Backup Daemon'],
    summary:
      'A fast, offline-first native desktop daybook and financial journal engineered for working professionals and local proprietorships who demand 100% data privacy and zero cloud dependency.',
    problemSolved:
      'In tier-2 and tier-3 towns, reliable broadband cannot be a mandatory dependency for daily store bookkeeping, nor do proprietors want sensitive daily cashflows stored on third-party SaaS clouds with recurring monthly fees.',
    overview:
      'Day Soft was engineered in Python and PySide6 to deliver an instantaneous, native desktop financial journal. It requires zero internet connectivity, incurs zero subscription fees, and stores all ledger transactions in an encrypted local SQLite database with automated daily snapshots to USB and secondary drives.',
    architecture: [
      {
        layer: 'Presentation Layer (PySide6 / Qt)',
        detail: 'Zero-latency native desktop GUI with keyboard-first navigation, instant voucher entry, and high-contrast ledger tables.'
      },
      {
        layer: 'Transactional Core (Python)',
        detail: 'Double-entry balance verification engine with real-time credit/debit reconciliation and date-range filtering.'
      },
      {
        layer: 'Persistence & Security (SQLite)',
        detail: 'Local relational database with authenticated access gates and an automated snapshot daemon writing redundant backups to external storage.'
      }
    ],
    developmentProcess: [
      {
        phase: '01 // Field Discovery',
        description: 'Observed how local proprietors record daily cash-in and cash-out in physical daybooks and identified the friction of slow web-based accounting tools.'
      },
      {
        phase: '02 // Schema & GUI Prototyping',
        description: 'Designed a keyboard-driven PySide6 interface capable of logging a transaction in under 4 seconds with zero mouse dependency.'
      },
      {
        phase: '03 // Hardening & Backup Automation',
        description: 'Implemented local login protection, database integrity checks, and automatic background backups upon application exit.'
      }
    ],
    challenges:
      'Ensuring zero data corruption during unexpected power cuts common in regional offices while keeping memory consumption under 45MB RAM on older desktop hardware.',
    implementationDetails:
      'Built with strict WAL (Write-Ahead Logging) mode in SQLite and atomic transaction commits so every daybook entry is safely persisted to disk within 2 milliseconds.',
    finalOutcome:
      'Delivered a production-ready standalone desktop application that operates 100% offline with sub-2ms local query latency and complete financial data sovereignty.',
    highlights: [
      'Zero-latency native desktop GUI optimized for rapid keyboard data entry',
      'Double-entry balance verification and real-time multi-filter ledger search',
      'Automated daily backup daemon to USB and secondary local storage',
      'Authenticated local SQLite storage ensuring complete financial privacy',
      'Lightweight memory footprint (< 45MB RAM during heavy ledger queries)'
    ],
    cover: '/projects/daysoft.jpg',
    gallery: [
      { src: '/projects/daysoft.jpg', caption: 'Day Soft — Offline-First Desktop Financial Ledger & Terminal View' },
      { src: '/projects/ledgesoft.jpg', caption: 'Structured Financial Audit & Balance Reconciliation Engine' }
    ],
    githubUrl: 'https://github.com/Ajay-Sharitra',
    externalUrl: 'https://ajay-sharitra.github.io/',
    stats: [
      { label: 'QUERY LATENCY', value: '< 2MS' },
      { label: 'CLOUD DEPENDENCY', value: '0% OFFLINE' },
      { label: 'MEMORY FOOTPRINT', value: '< 45MB RAM' }
    ]
  },
  {
    id: '02',
    slug: 'ledgesoft',
    title: 'LEDGESOFT',
    titleLines: ['LEDGE', 'SOFT'],
    category: 'CUSTOM SOFTWARE DEVELOPMENT · CONSTRUCTION FINANCIAL OS',
    year: '2025 — 2026',
    badge: 'LIVE · v0.1g',
    role: 'Lead Architect & Solo Full-Stack Developer',
    services: ['Financial Intelligence', 'Full-Stack Web Architecture', 'Multi-User RBAC Security'],
    tools: ['Python', 'Flask', 'SQLite', 'REST APIs', 'Chart.js', 'Excel Report Engine'],
    summary:
      'A complete financial intelligence platform built for small-to-midsize construction companies in Tirunelveli—replacing ₹50,000/year ERPs with straightforward, robust project P&L tracking.',
    problemSolved:
      'A local civil construction firm was losing track of material costs, site advances, subcontractor disbursements, and stage invoicing across active sites, while traditional ERPs were bloated and prohibitively expensive.',
    overview:
      'LedgeSoft provides a fast, zero-nonsense financial cockpit with automated Profit & Loss statements, multi-tier user role permissions separating Site Supervisors, Accountants, and Managing Directors, comprehensive audit logging, and single-click Excel ledger exports.',
    architecture: [
      {
        layer: 'REST API Layer (15 Endpoints)',
        detail: 'Flask-powered backend serving 15 granularly authorized REST endpoints for projects, expenses, invoices, and analytics.'
      },
      {
        layer: 'Relational Core (8 DB Tables)',
        detail: 'Normalized SQLite/PostgreSQL-ready relational schema with foreign key constraints, audit trails, and automated snapshot exports.'
      },
      {
        layer: 'RBAC & Reporting Engine',
        detail: 'Role-Based Access Control enforcement paired with a custom Excel generation engine for tax-ready accounting sheets.'
      }
    ],
    developmentProcess: [
      {
        phase: '01 // Domain Modeling',
        description: 'Mapped real civil construction cashflows: client stage payments, site petty cash, raw material procurement, and labor payouts.'
      },
      {
        phase: '02 // API & RBAC Engineering',
        description: 'Engineered 8 relational tables and 15 REST API routes with strict role boundaries and immutable audit logs.'
      },
      {
        phase: '03 // Live Deployment',
        description: 'Deployed v0.1g with interactive Chart.js cashflow visualization and one-click multi-sheet Excel export.'
      }
    ],
    challenges:
      'Designing a permission model simple enough for non-technical site supervisors to log daily expenses while giving managing directors complete audit visibility.',
    implementationDetails:
      'Implemented session-hardened RBAC middleware across all 15 Flask endpoints, real-time P&L aggregation queries, and automated workbook formatting.',
    finalOutcome:
      'Live in production (v0.1g), reducing software licensing costs by 95% compared to legacy construction ERPs while eliminating spreadsheet reconciliation errors.',
    highlights: [
      'Comprehensive Project P&L engine with live cashflow visualization',
      '15 REST API endpoints with granular role-based authorization',
      '8 relational database tables with foreign key constraints & audit trail',
      'Multi-user RBAC separating Site Supervisors, Accountants, and Directors',
      'One-click multi-format Excel ledger reporting for immediate tax readiness'
    ],
    cover: '/projects/ledgesoft.jpg',
    gallery: [
      { src: '/projects/ledgesoft.jpg', caption: 'LedgeSoft — Construction Financial Intelligence & Site Operations' },
      { src: '/projects/daysoft.jpg', caption: 'Automated Ledger & P&L Reconciliation Architecture' }
    ],
    githubUrl: 'https://github.com/Ajay-Sharitra',
    externalUrl: 'https://github.com/Ajay-Sharitra/Ajay-Sharitra.github.io',
    stats: [
      { label: 'SAVINGS VS ERP', value: '95% LESS' },
      { label: 'REST ENDPOINTS', value: '15 APIS' },
      { label: 'SCHEMA ARCHITECTURE', value: '8 DB TABLES' }
    ]
  },
  {
    id: '03',
    slug: 'python-utility-applications',
    title: 'PYTHON UTILITY SUITE',
    titleLines: ['PYTHON', 'UTILITIES'],
    category: 'STANDALONE PYTHON EXECUTABLES & AUTOMATION',
    year: '2023 — 2025',
    badge: 'OPEN SOURCE · EXE + SOURCE',
    role: 'Creator & Maintainer',
    services: ['Workflow Automation', 'Document Parsing', 'Standalone Binary Packaging'],
    tools: ['Python', 'Tkinter', 'extract-msg', 'pdf2docx', 'PyInstaller', 'OS File Systems'],
    summary:
      'Open-source standalone Python desktop executables—PDF2DOCX Converter and Outlook MSG Viewer—built to eliminate paid subscription paywalls for everyday document and email tasks.',
    problemSolved:
      'Office workers frequently receive proprietary Outlook .msg attachments they cannot open without MS Outlook, or face paywalls when converting multi-page PDFs into editable Word documents.',
    overview:
      'Published as open-source repositories with pre-compiled standalone Windows executables. MSG-VIEWER-PYTHON-BUILD parses .msg files, renders the email body in a clean native scrollable window, and automatically extracts attachments into a dedicated Desktop folder. PDF2DOCX_PYTHON_BUILD converts PDF documents to editable .docx files locally with ~90% layout accuracy and zero cloud uploads.',
    architecture: [
      {
        layer: 'Native GUI Shell (Tkinter)',
        detail: 'Lightweight native file-picker dialogs and scrollable content viewers requiring zero browser overhead.'
      },
      {
        layer: 'Document & MIME Parsers',
        detail: 'OLE2 / MAPI stream extraction via extract_msg and structural layout reconstruction for PDF-to-DOCX conversion.'
      },
      {
        layer: 'Standalone Packaging',
        detail: 'Compiled into self-contained Windows .exe binaries so end users can run them without installing Python or dependencies.'
      }
    ],
    developmentProcess: [
      {
        phase: '01 // Bottleneck Identification',
        description: 'Identified recurring daily IT support requests around unreadable .msg email attachments and restricted PDF conversion websites.'
      },
      {
        phase: '02 // Parser & File System Logic',
        description: 'Wrote automated directory creation and binary attachment extraction routines alongside GUI status handlers.'
      },
      {
        phase: '03 // Open-Source Release',
        description: 'Published full Python source code and standalone executable builds on GitHub for public use.'
      }
    ],
    challenges:
      'Handling both plain-text and HTML-encoded .msg bodies gracefully while automatically organizing multiple binary attachments on the user desktop.',
    implementationDetails:
      'Uses os.environ USERPROFILE path resolution, automatic folder provisioning named after the source .msg archive, and stream-based binary file writing.',
    finalOutcome:
      'Two publicly available open-source repositories on GitHub providing instant, offline, zero-cost document conversion and email inspection.',
    highlights: [
      'MSG-VIEWER-PYTHON-BUILD: Instant viewing of Outlook .msg email subjects and bodies',
      'Automated extraction of .msg attachments into structured Desktop directories',
      'PDF2DOCX_PYTHON_BUILD: Offline PDF-to-Word conversion bypassing online paywalls',
      ' ~90% layout preservation accuracy on standard English office documents',
      'Distributed with both full open-source Python code and standalone .exe binaries'
    ],
    cover: '/assets/reference/utility-preview.avif',
    gallery: [
      { src: '/assets/reference/utility-preview.avif', caption: 'Standalone Python Utility Executables — MSG Viewer & PDF2DOCX' },
      { src: '/projects/daysoft.jpg', caption: 'Offline Desktop Execution & Local File System Automation' }
    ],
    githubUrl: 'https://github.com/Ajay-Sharitra/MSG-VIEWER-PYTHON-BUILD-',
    externalUrl: 'https://github.com/Ajay-Sharitra/PDF2DOCX_PYTHON_BUILD',
    stats: [
      { label: 'OPEN SOURCE REPOS', value: '02 LIVE' },
      { label: 'CONVERSION ACCURACY', value: '~90%' },
      { label: 'RUNTIME', value: 'STANDALONE EXE' }
    ]
  },
  {
    id: '04',
    slug: 'heroquarters',
    title: 'HERO QUARTERS',
    titleLines: ['HERO', 'QUARTERS'],
    category: 'WEBSITE & WEB APPLICATION DEVELOPMENT',
    year: '2025 — 2026',
    badge: 'CLOSED BETA · WEB OS',
    role: 'Product Designer & Full-Stack Developer',
    services: ['Web Application Architecture', 'Interactive UI/UX Design', 'Task Orchestration'],
    tools: ['Python', 'Flask', 'SQLite', 'TailwindCSS', 'JavaScript', 'HTML5 Canvas'],
    summary:
      'A comic-book-noir themed team workflow and operations command center—turning mundane project tracking into high-momentum mission briefings, villain blocker tracking, and role-based dispatch.',
    problemSolved:
      'Conventional project management web apps feel like sterile corporate spreadsheets that small engineering and creative teams dread opening every morning.',
    overview:
      'Hero Quarters reimagines daily team operations through an expressive command-center interface: tasks are Missions, bugs and blockers are Villains, and team members operate with customized clearance levels. Beneath the stylized web interface lies a disciplined Flask + SQLite workflow engine with automated state transitions and real-time operational dashboards.',
    architecture: [
      {
        layer: 'Interactive Command UI',
        detail: 'Responsive web interface with drag-and-drop mission state transitions, custom visual telemetry, and zero-bloat CSS.'
      },
      {
        layer: 'Workflow State Engine (Flask)',
        detail: 'Server-side mission lifecycle orchestration, blocker severity escalation, and clearance-based view filtering.'
      },
      {
        layer: 'Operational Database (SQLite)',
        detail: 'Persistent tracking of team velocity, mission clearance rates, and historical blocker resolution timelines.'
      }
    ],
    developmentProcess: [
      {
        phase: '01 // Experience Direction',
        description: 'Crafted an original tactical noir visual language that makes daily standups and bug triage genuinely engaging.'
      },
      {
        phase: '02 // Full-Stack Implementation',
        description: 'Built the Mission Board, Villain Dossier blocker tracker, and Secret Lair velocity dashboard on Flask and SQLite.'
      },
      {
        phase: '03 // Closed Beta Testing',
        description: 'Refined clearance permissions and instant briefing dispatch with small test teams.'
      }
    ],
    challenges:
      'Balancing a bold, thematic visual identity with crisp typographic legibility and fast task-switching performance.',
    implementationDetails:
      'Engineered modular UI components, role-gated mission views, and real-time status aggregation without heavy frontend framework bloat.',
    finalOutcome:
      'In closed beta testing, demonstrating how bespoke web application design can dramatically improve daily team engagement and operational clarity.',
    highlights: [
      'Interactive Mission Board with rapid status transitions and priority tags',
      'Villain Dossier: severity-based bug and blocker tracking with mitigation logs',
      'Secret Lair Dashboard: real-time team velocity and mission clearance metrics',
      'Granular HQ clearance levels protecting sensitive client deliverables',
      'Bespoke web design combining editorial typography with responsive layouts'
    ],
    cover: '/projects/heroquarters.jpg',
    gallery: [
      { src: '/projects/heroquarters.jpg', caption: 'Hero Quarters — Tactical Command Center & Team Workflow Web OS' },
      { src: '/projects/shoptrack.jpg', caption: 'Bespoke Web & Localized Interface Engineering' }
    ],
    githubUrl: 'https://github.com/Ajay-Sharitra/portfolio',
    externalUrl: 'https://ajay-sharitra.github.io/',
    stats: [
      { label: 'RELEASE STAGE', value: 'CLOSED BETA' },
      { label: 'CORE STACK', value: 'FLASK + SQLITE' },
      { label: 'ARCHITECTURE', value: 'RBAC WEB OS' }
    ]
  },
  {
    id: '05',
    slug: 'ai-llm-experiments',
    title: 'AI & LLM ARCHITECTURE LAB',
    titleLines: ['AI & LLM', 'SYSTEMS'],
    category: 'ARTIFICIAL INTELLIGENCE & TRANSFORMER RESEARCH',
    year: '2025 — 2026',
    badge: 'RESEARCH & PROTOTYPES',
    role: 'AI / ML Systems Researcher & Developer',
    services: ['Custom LLM Architecture', 'Transformer Self-Attention', 'AI-Assisted Tooling'],
    tools: ['Python', 'PyTorch', 'Transformers', 'Attention Mechanisms (QKV)', 'Neural Networks'],
    summary:
      'First-principles implementation and experimentation with custom Large Language Models, Transformer blocks, Query-Key-Value (QKV) attention mechanisms, and AI-assisted software workflows.',
    problemSolved:
      'Relying solely on high-level wrapper APIs obscures how language models actually reason, attend to context, and fail on edge cases.',
    overview:
      'This research initiative focuses on building and inspecting neural network components from the ground up in PyTorch. It encompasses multi-head self-attention math (Query, Key, Value matrix projections and scaled dot-product attention), token embedding pipelines, positional encoding schemes, and practical AI-assisted automation for local software engineering.',
    architecture: [
      {
        layer: 'Embedding & Positional Layer',
        detail: 'Tokenization and sinusoidal/learned positional encodings mapping discrete text into dense PyTorch vector spaces.'
      },
      {
        layer: 'Multi-Head Q·K·V Attention',
        detail: 'Parallel linear projections computing scaled dot-product attention softmax((QK^T)/√d_k)V with causal autoregressive masking.'
      },
      {
        layer: 'Feed-Forward & Residual Stream',
        detail: 'LayerNorm, GELU/ReLU non-linear projections, residual connections, and logits decoding.'
      }
    ],
    developmentProcess: [
      {
        phase: '01 // Mathematical Foundations',
        description: 'Implemented raw matrix multiplication and softmax scaling for Query, Key, and Value tensors in PyTorch.'
      },
      {
        phase: '02 // Transformer Block Assembly',
        description: 'Stacked multi-head attention with residual pathways, layer normalization, and position-wise feed-forward networks.'
      },
      {
        phase: '03 // Applied AI Workflows',
        description: 'Integrated LLM-assisted synthesis and document intelligence into practical developer utilities.'
      }
    ],
    challenges:
      'Visualizing and debugging attention head weight distributions and preventing gradient instability across deeper custom layers.',
    implementationDetails:
      'Built modular PyTorch nn.Module classes for single-head and multi-head attention with inspectable attention weight matrices.',
    finalOutcome:
      'Established a deep, verifiable foundation in LLM internals—enabling both custom neural experimentation and high-velocity AI-augmented software engineering.',
    highlights: [
      'From-scratch PyTorch implementation of Scaled Dot-Product Self-Attention',
      'Explicit Query (Q), Key (K), and Value (V) tensor projection pipelines',
      'Causal masking and multi-head context aggregation experiments',
      'Neural network training loops, loss tracking, and embedding inspection',
      'Practical integration of AI-assisted workflows into production tool development'
    ],
    cover: '/assets/reference/exp-1.avif',
    gallery: [
      { src: '/assets/reference/exp-1.avif', caption: 'Transformer Self-Attention & Neural Architecture Exploration' },
      { src: '/assets/reference/exp-3.avif', caption: 'Deep Learning Layers & Contextual Routing Topologies' }
    ],
    githubUrl: 'https://github.com/Ajay-Sharitra',
    stats: [
      { label: 'CORE ENGINE', value: 'PYTORCH' },
      { label: 'MECHANISM', value: 'Q·K·V ATTENTION' },
      { label: 'PARADIGM', value: 'TRANSFORMERS' }
    ]
  },
  {
    id: '06',
    slug: 'networking-infrastructure-solutions',
    title: 'INFRASTRUCTURE & RETAIL SYSTEMS',
    titleLines: ['NETWORK', '& SYSTEMS'],
    category: 'NETWORKING, CYBERSECURITY & FIELD SOLUTIONS',
    year: '2023 — 2026',
    badge: 'CCNA · FIELD DEPLOYED',
    role: 'Network Engineer & Systems Architect',
    services: ['Cisco LAN/WAN Architecture', 'Firewall & Security Hardening', 'Retail POS & AMC'],
    tools: ['Cisco IOS', 'TCP/IP', 'VLANs & OSPF', 'Firewall ACLs', 'TypeScript', 'SQLite', 'ESC/POS'],
    summary:
      'End-to-end network infrastructure engineering, Cisco routing & switching, institutional eOffice support, security hardening, and bilingual retail POS systems (ShopTrack & TailorDesk).',
    problemSolved:
      'Local enterprises, institutional offices, and neighbourhood merchants often suffer from unreliable networks, unsegmented flat LANs, and paper-bound billing registers.',
    overview:
      'Combines CCNA-certified network engineering with field-ready software systems. Encompasses structured LAN/WAN deployments, Cisco switch VLAN segmentation, firewall perimeter security, institutional NIC eOffice technical operations, and bilingual (Tamil & English) edge systems like ShopTrack (Kirana POS with thermal receipt printing) and TailorDesk.',
    architecture: [
      {
        layer: 'Physical & Data-Link Layer',
        detail: 'Structured cabling, Wi-Fi heatmapping, Cisco Catalyst switch port security, and 802.1Q VLAN segmentation.'
      },
      {
        layer: 'Network & Perimeter Security',
        detail: 'IPv4/IPv6 subnetting, OSPF routing, stateful firewall ACLs, VPN remote access, and vulnerability auditing.'
      },
      {
        layer: 'Edge Application Layer (ShopTrack / eOffice)',
        detail: 'Bilingual Tamil/English POS interfaces, ESC/POS 58mm/80mm thermal printer integration, and institutional eOffice support.'
      }
    ],
    developmentProcess: [
      {
        phase: '01 // Site Audit & Topology Design',
        description: 'Assessed physical layout, bandwidth bottlenecks, and security boundaries for offices and retail establishments.'
      },
      {
        phase: '02 // Provisioning & Hardening',
        description: 'Configured routers, switches, VLAN trunks, firewall rules, and automated local/offsite backup routines.'
      },
      {
        phase: '03 // AMC & Edge Software Integration',
        description: 'Backed deployments with predictable Annual Maintenance Contracts (AMC) and custom edge software.'
      }
    ],
    challenges:
      'Engineering rock-solid network reliability and intuitive bilingual interfaces for environments with intermittent ISP connectivity and non-technical staff.',
    implementationDetails:
      'Paired redundant network routing and strict ACL rules with offline-capable SQLite edge applications and direct ESC/POS hardware drivers.',
    finalOutcome:
      'Delivered dependable network infrastructure, institutional IT continuity, and accessible retail digitalization across Tirunelveli and Tamil Nadu.',
    highlights: [
      'CCNA-verified Cisco routing, switching, and VLAN segmentation deployments',
      'Institutional NIC eOffice application support and R&D IT troubleshooting',
      'Firewall rule configuration, OSINT surface checks, and endpoint hardening',
      'ShopTrack & TailorDesk: Bilingual (Tamil & English) retail & artisan architectures',
      'Annual Maintenance Contracts (AMC) with automated backups and < 2hr response'
    ],
    cover: '/projects/shoptrack.jpg',
    gallery: [
      { src: '/projects/shoptrack.jpg', caption: 'ShopTrack — Bilingual Retail POS & Hardware-Integrated Field Systems' },
      { src: '/projects/tailordesk.jpg', caption: 'TailorDesk — Bespoke Order Lifecycle & Measurement Architecture' }
    ],
    githubUrl: 'https://github.com/Ajay-Sharitra',
    stats: [
      { label: 'CERTIFICATION', value: 'CISCO CCNA' },
      { label: 'LOCALIZATION', value: 'TAMIL & EN' },
      { label: 'SUPPORT SLA', value: '< 2HR DIRECT' }
    ]
  }
];
