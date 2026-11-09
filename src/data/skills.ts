export interface ExpertiseCategory {
  id: string;
  num: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string;
  metrics: string;
  deliverables: string[];
}

export interface TechGroup {
  id: string;
  index: string;
  category: string;
  subtitle: string;
  items: {
    name: string;
    context: string;
    tag: string;
  }[];
}

export const EXPERTISE_CATEGORIES: ExpertiseCategory[] = [
  {
    id: 'software-engineering',
    num: '01',
    title: 'Software Engineering',
    shortTitle: 'SOFTWARE',
    subtitle: 'Full-Stack & Native Desktop Systems',
    description:
      'Designing and building resilient, zero-bloat software products from the ground up. From multi-user web applications with role-based access control to ultra-fast offline-first native desktop executables.',
    technologies: ['Python', 'Go', 'JavaScript', 'TypeScript', 'Flask', 'PySide6 / Qt', 'SQLite', 'PostgreSQL', 'REST APIs'],
    image: '/projects/daysoft.jpg',
    metrics: '3 PRODUCTION PLATFORMS · < 2MS LOCAL LATENCY',
    deliverables: [
      'Standalone Native Desktop Applications (PySide6 / Tkinter)',
      'Full-Stack Financial & Operations Platforms (Flask / FastAPI)',
      'Relational Schema Design & Encrypted Local Storage',
      'Multi-User RBAC & Audit Trail Engines'
    ]
  },
  {
    id: 'infrastructure-networking',
    num: '02',
    title: 'IT Infrastructure & Networking',
    shortTitle: 'SYSTEMS',
    subtitle: 'CCNA-Certified Enterprise & Local Topologies',
    description:
      'Engineering dependable physical and logical network architectures. Bridging low-level packet routing, VLAN segmentation, and enterprise switching with hands-on institutional and commercial IT administration.',
    technologies: ['Cisco Networking', 'TCP/IP', 'Routing & Switching', 'VLANs & OSPF', 'Firewall Technologies', 'Linux Administration'],
    image: '/assets/reference/exp-2.avif',
    metrics: 'CCNA CERTIFIED · ENTERPRISE & R&D INFRASTRUCTURE',
    deliverables: [
      'LAN / WAN Topology Design & Structured Cabling',
      'Cisco Router & L2/L3 Switch Provisioning',
      'VLAN Segmentation, Subnetting & Inter-VLAN Routing',
      'Institutional eOffice & Server Room Administration'
    ]
  },
  {
    id: 'cybersecurity',
    num: '03',
    title: 'Cybersecurity',
    shortTitle: 'SECURITY',
    subtitle: 'Defensive Hardening, OSINT & Vulnerability Assessment',
    description:
      'Investigating attack surfaces, conducting open-source intelligence reconnaissance, auditing network perimeters, and hardening endpoints and databases against unauthorized access and credential compromise.',
    technologies: ['OSINT', 'Vulnerability Assessment', 'Security Testing', 'Hashcat', 'Firewall Policies', 'RBAC Security'],
    image: '/assets/reference/exp-4.avif',
    metrics: 'DEFENSIVE HARDENING · CRYPTOGRAPHIC AUDITING',
    deliverables: [
      'Open-Source Intelligence (OSINT) & Surface Reconnaissance',
      'Password Hash Auditing & Cryptographic Recovery (Hashcat)',
      'Network Perimeter Firewall Rules & Access Control Lists',
      'Application Vulnerability Assessment & Local Data Encryption'
    ]
  },
  {
    id: 'ai-llm-development',
    num: '04',
    title: 'Artificial Intelligence & LLM Development',
    shortTitle: 'INTELLIGENCE',
    subtitle: 'Transformer Architectures & Attention Mechanics',
    description:
      'Exploring neural networks from first principles—implementing multi-head self-attention (Query, Key, Value matrices), custom Transformer blocks in PyTorch, and integrating AI-assisted workflows into practical tools.',
    technologies: ['PyTorch', 'LLM Architecture', 'Transformers', 'Attention Mechanisms (QKV)', 'Neural Networks', 'Python'],
    image: '/assets/reference/exp-1.avif',
    metrics: 'FIRST-PRINCIPLES PYTORCH · QKV SELF-ATTENTION',
    deliverables: [
      'Custom Transformer & Self-Attention Implementations',
      'Query, Key, Value (QKV) Tensor Mechanics & Tokenization',
      'Neural Network Training Loops & Embedding Spaces in PyTorch',
      'AI-Assisted Code & Document Processing Pipelines'
    ]
  },
  {
    id: 'automation-solutions',
    num: '05',
    title: 'Automation & Technical Solutions',
    shortTitle: 'AUTOMATION',
    subtitle: 'Standalone Utilities, Hardware & Workflow Tooling',
    description:
      'Transforming repetitive manual bottlenecks into single-click standalone executables and hardware-integrated workflows—from Outlook MSG parsing and PDF-to-DOCX engines to thermal POS receipt printing.',
    technologies: ['Python Executables', 'ESC/POS Thermal Hardware', 'Excel Report Engines', 'Batch Scripting', 'Automated Backups', 'System Diagnostics'],
    image: '/assets/reference/exp-5.avif',
    metrics: 'ZERO-DEPENDENCY EXES · HARDWARE INTEGRATION',
    deliverables: [
      'Standalone Windows/Linux Utility Executables (PDF2DOCX, MSG Viewer)',
      'ESC/POS Thermal Printer & Barcode Scanner Integration',
      'Automated Encrypted Database Snapshot Daemons',
      'Custom Excel Financial Ledger Generators'
    ]
  }
];

export const TECHNICAL_ARSENAL: TechGroup[] = [
  {
    id: 'programming',
    index: '01',
    category: 'Programming',
    subtitle: 'Core Languages & Runtime Foundations',
    items: [
      {
        name: 'Python',
        context: 'Primary language for desktop apps (PySide6/Tkinter), backend services (Flask), automation executables, and PyTorch ML research.',
        tag: 'PRIMARY'
      },
      {
        name: 'Go',
        context: 'Concurrent systems programming, fast CLI utilities, and lightweight network services.',
        tag: 'SYSTEMS'
      },
      {
        name: 'JavaScript',
        context: 'Interactive web interfaces, asynchronous REST client orchestration, DOM/Canvas rendering, and modern frontend architecture.',
        tag: 'FRONTEND'
      }
    ]
  },
  {
    id: 'backend-databases',
    index: '02',
    category: 'Backend & Databases',
    subtitle: 'Data Persistence & Application Servers',
    items: [
      {
        name: 'Flask',
        context: 'Production REST APIs, multi-user RBAC authentication, session security, and server-rendered financial cockpits (LedgeSoft, Hero Quarters).',
        tag: 'WEB ENGINE'
      },
      {
        name: 'SQLite',
        context: 'Zero-configuration, encrypted local relational storage for offline-first desktop ledgers and embedded POS systems.',
        tag: 'EMBEDDED DB'
      },
      {
        name: 'PostgreSQL',
        context: 'Enterprise relational database architecture, foreign-key integrity constraints, indexing, and concurrent multi-user transactions.',
        tag: 'RELATIONAL DB'
      }
    ]
  },
  {
    id: 'ai-machine-learning',
    index: '03',
    category: 'AI & Machine Learning',
    subtitle: 'Deep Learning & Language Model Internals',
    items: [
      {
        name: 'PyTorch',
        context: 'Tensor computation, autograd backpropagation, custom neural network layers, and model training loops.',
        tag: 'DEEP LEARNING'
      },
      {
        name: 'LLM Architecture',
        context: 'Tokenization, positional encodings, autoregressive decoding, layer normalization, and residual stream mechanics.',
        tag: 'FOUNDATION'
      },
      {
        name: 'Transformers',
        context: 'Encoder-decoder and decoder-only block construction, feed-forward projections, and context window scaling.',
        tag: 'ARCHITECTURE'
      },
      {
        name: 'Attention Mechanisms',
        context: 'Scaled dot-product self-attention, Query-Key-Value (QKV) projections, causal masking, and multi-head attention routing.',
        tag: 'Q·K·V CORE'
      }
    ]
  },
  {
    id: 'networking-infrastructure',
    index: '04',
    category: 'Networking & Infrastructure',
    subtitle: 'Packet Switching, Routing & Perimeter Control',
    items: [
      {
        name: 'TCP/IP',
        context: 'OSI/TCP stack analysis, IPv4/IPv6 subnetting, CIDR allocation, ARP, DNS, DHCP, and packet-level troubleshooting.',
        tag: 'PROTOCOL'
      },
      {
        name: 'Routing & Switching',
        context: 'Static and dynamic routing (OSPF/EIGRP), VLAN trunking (802.1Q), Spanning Tree Protocol (STP), and L2/L3 switching.',
        tag: 'TOPOLOGY'
      },
      {
        name: 'Network Administration',
        context: 'End-to-end office/institutional LAN provisioning, structured cabling diagnostics, uptime monitoring, and endpoint management.',
        tag: 'OPERATIONS'
      },
      {
        name: 'Firewall Technologies',
        context: 'Perimeter security rules, stateful packet inspection, NAT/PAT configuration, VPN tunneling, and ACL enforcement.',
        tag: 'PERIMETER'
      },
      {
        name: 'Cisco Networking',
        context: 'CCNA-certified configuration and diagnostics on Cisco IOS routers and Catalyst switches.',
        tag: 'CCNA VERIFIED'
      }
    ]
  },
  {
    id: 'cybersecurity',
    index: '05',
    category: 'Cybersecurity',
    subtitle: 'Reconnaissance, Auditing & Security Testing',
    items: [
      {
        name: 'OSINT',
        context: 'Open-Source Intelligence gathering, digital footprint analysis, domain/network reconnaissance, and metadata auditing.',
        tag: 'RECON'
      },
      {
        name: 'Vulnerability Assessment',
        context: 'Identifying misconfigurations, exposed services, weak access controls, and unpatched infrastructure risks.',
        tag: 'AUDIT'
      },
      {
        name: 'Security Testing',
        context: 'Authentication flow testing, role-permission boundary verification, and endpoint resilience validation.',
        tag: 'TESTING'
      },
      {
        name: 'Hashcat & Security Tools',
        context: 'Cryptographic hash analysis, password policy strength auditing, and practical offensive/defensive security utilities.',
        tag: 'CRYPTO / TOOLS'
      }
    ]
  },
  {
    id: 'development-tools',
    index: '06',
    category: 'Development Tools',
    subtitle: 'Version Control, OS & Engineering Workflow',
    items: [
      {
        name: 'Git',
        context: 'Distributed version control, branching strategies, release tagging, and clean commit histories.',
        tag: 'VCS'
      },
      {
        name: 'GitHub',
        context: 'Open-source repository hosting, standalone binary releases, documentation, and static deployment pipelines.',
        tag: 'COLLABORATION'
      },
      {
        name: 'Linux',
        context: 'Command-line system administration, shell scripting, service daemons, permissions, and network interface management.',
        tag: 'OS KERNEL'
      },
      {
        name: 'VS Code',
        context: 'Primary integrated development environment configured for Python, Go, TypeScript, and remote debugging.',
        tag: 'IDE'
      }
    ]
  }
];
