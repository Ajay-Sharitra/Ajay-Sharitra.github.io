export interface TimelineExperience {
  id: string;
  index: string;
  period: string;
  role: string;
  organization: string;
  environment: string;
  location: string;
  summary: string;
  responsibilities: string[];
  domains: string[];
}

export interface LabExperiment {
  id: string;
  code: string;
  title: string;
  category: string;
  status: 'ACTIVE RESEARCH' | 'PROTOTYPE' | 'EXPERIMENTAL LAB';
  summary: string;
  technicalDeepDive: string;
  parameters: { label: string; value: string }[];
  stack: string[];
  diagramType: 'attention-qkv' | 'network-topology' | 'security-hash' | 'hardware-pos';
}

export const PROFESSIONAL_EXPERIENCE: TimelineExperience[] = [
  {
    id: 'independent-architect',
    index: '01',
    period: '2024 — PRESENT',
    role: 'Software Developer & Network Infrastructure Architect',
    organization: 'Independent Technical Practice',
    environment: 'Commercial Software & Local Enterprise Infrastructure',
    location: 'Tirunelveli, Tamil Nadu',
    summary:
      'Architecting and deploying standalone commercial software products (Day Soft, LedgeSoft, Hero Quarters) alongside end-to-end network infrastructure and Annual Maintenance Contracts (AMC) for regional enterprises and contractors.',
    responsibilities: [
      'Engineered LedgeSoft, a full-stack construction financial OS featuring 15 REST APIs, 8 relational SQLite tables, multi-user RBAC, and automated Excel P&L reporting.',
      'Built Day Soft, an offline-first native desktop daybook ledger in Python and PySide6 with encrypted local storage and automated external backup daemons.',
      'Designed and provisioned office LAN/WAN networks, Cisco switch VLAN topologies, Wi-Fi coverage architectures, and hardware diagnostics for local businesses.',
      'Delivered open-source Python desktop utilities (MSG Viewer & PDF2DOCX standalone executables) solving everyday document and email workflow bottlenecks.'
    ],
    domains: ['Python', 'Flask', 'PySide6', 'SQLite', 'Cisco LAN/WAN', 'System Architecture']
  },
  {
    id: 'nic-eoffice-institutional',
    index: '02',
    period: 'PROFESSIONAL TENURE',
    role: 'IT Infrastructure, NIC eOffice & Technical Support Engineer',
    organization: 'Institutional & R&D Environment Operations',
    environment: 'Government / Institutional R&D Digital Governance & Network Operations',
    location: 'Tamil Nadu, India',
    summary:
      'Provided mission-critical application support for NIC eOffice digital governance workflows, institutional IT infrastructure administration, network troubleshooting, and cybersecurity hygiene within structured R&D and institutional environments.',
    responsibilities: [
      'Administered and supported NIC eOffice electronic file movement, digital signature certificates (DSC), role hierarchies, and user onboarding across institutional departments.',
      'Executed daily IT infrastructure operations, workstation provisioning, OS patch management, and hardware/peripheral diagnostics in high-uptime institutional settings.',
      'Diagnosed and resolved complex TCP/IP connectivity, routing, switching, DNS/DHCP, and firewall access issues across segmented institutional LANs.',
      'Enforced endpoint security policies, vulnerability checks, access control compliance, and secure backup protocols to protect sensitive institutional data.'
    ],
    domains: ['NIC eOffice Support', 'R&D Institutional IT', 'TCP/IP Troubleshooting', 'Endpoint Security', 'Firewall & Access Control']
  },
  {
    id: 'ccna-cse-foundation',
    index: '03',
    period: 'ACADEMIC & CERTIFICATION MILESTONE',
    role: 'B.E. Computer Science & Engineering · Cisco CCNA Certified',
    organization: 'Computer Science Engineering & Cisco Networking Academy',
    environment: 'Systems Engineering, Algorithms, Networks & Security Foundations',
    location: 'Tamil Nadu, India',
    summary:
      'Completed Bachelor of Engineering in Computer Science & Engineering and earned verified Cisco Certified Network Associate (CCNA) credentials, establishing a rigorous foundation across operating systems, data structures, packet networking, and cryptography.',
    responsibilities: [
      'Mastered core Computer Science disciplines: Data Structures & Algorithms, Operating Systems, Relational Database Management Systems, and Computer Networks.',
      'Earned Cisco CCNA verification covering IPv4/IPv6 subnetting, OSPF routing, Spanning Tree Protocol, VLAN segmentation, and network security hardening.',
      'Conducted hands-on laboratory research in Linux system administration, OSINT reconnaissance, cryptographic hash analysis, and neural network fundamentals.'
    ],
    domains: ['B.E. CSE', 'Cisco CCNA (Verified)', 'Linux Internals', 'Cryptography & Security', 'Algorithms']
  }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'lab-transformer-qkv',
    code: 'EXP // 01-LLM',
    title: 'Custom LLMs & Transformer Q·K·V Attention Mechanics',
    category: 'NEURAL ARCHITECTURE & PYTORCH',
    status: 'ACTIVE RESEARCH',
    summary:
      'Deconstructing Large Language Models from scratch in PyTorch—implementing scaled dot-product self-attention, Query-Key-Value tensor projections, causal masking, and token embedding spaces.',
    technicalDeepDive:
      'Rather than treating LLMs as opaque APIs, this laboratory experiment builds the autoregressive Transformer block from raw PyTorch tensors. Each input token embedding is projected into Query (Q), Key (K), and Value (V) vectors via learned weight matrices. Attention weights are computed via softmax((Q · K^T) / √d_k) with a lower-triangular causal mask, routing contextual information across sequence positions.',
    parameters: [
      { label: 'ATTENTION FORMULA', value: 'softmax(QKᵀ / √dₖ)V' },
      { label: 'FRAMEWORK', value: 'PyTorch + Autograd' },
      { label: 'ARCHITECTURE', value: 'Decoder-Only Transformer' },
      { label: 'FOCUS', value: 'Multi-Head QKV Routing' }
    ],
    stack: ['Python', 'PyTorch', 'Self-Attention', 'QKV Matrices', 'Tokenization', 'Neural Networks'],
    diagramType: 'attention-qkv'
  },
  {
    id: 'lab-cyber-osint',
    code: 'EXP // 02-SEC',
    title: 'OSINT Reconnaissance & Cryptographic Hash Auditing',
    category: 'CYBERSECURITY & VULNERABILITY LAB',
    status: 'EXPERIMENTAL LAB',
    summary:
      'Evaluating authentication resilience, password entropy, and exposed attack surfaces using Hashcat GPU/CPU recovery pipelines, OSINT footprinting, and controlled vulnerability assessments.',
    technicalDeepDive:
      'Security engineering requires understanding how credentials and perimeters fail under stress. This research track focuses on auditing hashing implementations (bcrypt, SHA-256, NTLM) using rule-based and mask-based Hashcat workloads, paired with Open-Source Intelligence (OSINT) workflows to identify accidental metadata and service exposure before malicious actors do.',
    parameters: [
      { label: 'AUDIT ENGINE', value: 'Hashcat / Custom Rules' },
      { label: 'RECONNAISSANCE', value: 'Passive & Active OSINT' },
      { label: 'DEFENSE TARGET', value: 'Zero-Trust RBAC & Salting' },
      { label: 'ENVIRONMENT', value: 'Isolated Linux Lab' }
    ],
    stack: ['OSINT', 'Hashcat', 'Vulnerability Assessment', 'Security Testing', 'Linux', 'Cryptanalysis'],
    diagramType: 'security-hash'
  },
  {
    id: 'lab-network-packets',
    code: 'EXP // 03-NET',
    title: 'Multi-VLAN Enterprise Routing & Firewall Perimeter Lab',
    category: 'CISCO INFRASTRUCTURE & PACKET ENGINEERING',
    status: 'PROTOTYPE',
    summary:
      'Simulating and stress-testing segmented institutional network topologies with inter-VLAN routing, OSPF failover, ACL packet filtering, and DMZ firewall isolation.',
    technicalDeepDive:
      'Built to mirror real institutional and R&D campus networks: departments are isolated into dedicated 802.1Q VLANs (Administration, R&D Lab, eOffice Server Cluster, Guest). Extended Access Control Lists (ACLs) and stateful firewall rules enforce strict least-privilege packet flow while OSPF ensures sub-second route convergence.',
    parameters: [
      { label: 'ROUTING PROTOCOL', value: 'OSPFv2 + 802.1Q Trunking' },
      { label: 'PERIMETER', value: 'Stateful ACLs + NAT/PAT' },
      { label: 'CERTIFICATION', value: 'Cisco CCNA Standard' },
      { label: 'DIAGNOSTICS', value: 'Packet Trace & Latency' }
    ],
    stack: ['Cisco IOS', 'TCP/IP', 'VLANs', 'OSPF', 'Firewall ACLs', 'Network Administration'],
    diagramType: 'network-topology'
  },
  {
    id: 'lab-hardware-automation',
    code: 'EXP // 04-HW',
    title: 'AI-Assisted Development & Hardware ESC/POS Automation',
    category: 'HARDWARE INTERFACING & WORKFLOW AUTOMATION',
    status: 'PROTOTYPE',
    summary:
      'Bridging high-level Python/TypeScript software with raw USB/Bluetooth thermal printer byte streams (ESC/POS), offline document parsers, and AI-accelerated engineering pipelines.',
    technicalDeepDive:
      'Practical field software often meets legacy hardware and proprietary file formats. This lab combines raw ESC/POS hexadecimal command buffers for 58mm/80mm thermal printers with bilingual Tamil/English glyph rendering, alongside standalone binary packaging for zero-dependency Windows execution.',
    parameters: [
      { label: 'PROTOCOL', value: 'Raw ESC/POS Byte Stream' },
      { label: 'LOCALIZATION', value: 'Bilingual Tamil + English' },
      { label: 'PACKAGING', value: 'PyInstaller Standalone EXE' },
      { label: 'WORKFLOW', value: 'AI-Assisted Synthesis' }
    ],
    stack: ['Python', 'ESC/POS', 'USB/Serial I/O', 'AI-Assisted Dev', 'Automation', 'SQLite'],
    diagramType: 'hardware-pos'
  }
];
