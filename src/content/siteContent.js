export const navItems = [
  { label: 'About', href: '#hero' },
  { label: 'Experience', href: '#timeline' },
  { label: 'Projects', href: '#projects' },
  { label: 'Articles', href: '#articles' },
  { label: 'Contact', href: '#contact' },
]

export const headerSections = [
  { id: 'hero', theme: 'light' },
  { id: 'timeline', theme: 'dark' },
  { id: 'projects', theme: 'light' },
  { id: 'articles', theme: 'dark' },
  { id: 'contact', theme: 'dark' },
]

export const heroContent = {
  introLine: 'Delivers high-impact digital products through data-driven UX, modern UI, and strong product thinking, focusing on scalable solutions, seamless user journeys, and measurable business outcomes.',
  primaryTitle: 'UI/UX Designer',
  secondaryTitle: '& Developer',
  location: 'based in India',
  capabilityCards: [
    { label: 'UX Research', cue: 'Discover' },
    { label: 'Interaction Design', cue: 'Shape' },
    { label: 'Design Systems', cue: 'Scale' },
    { label: 'Prototyping', cue: 'Test' },
  ],
}

export const caseStudies = [
  {
    id: '01',
    category: 'B2B Fintech',
    title: 'PulsePay Merchant Suite',
    summary:
      'Restructured a dense merchant dashboard into a calmer decision surface with faster navigation, sharper hierarchy, and guided setup states.',
    outcome: 'Setup completion +32%',
    scope: 'Research  •  Flows  •  UI System',
    year: '2025',
    tone: 'dark',
    gradient: 'from-[#0f1017] via-[#24203f] to-[#5f56ff]',
    layout: 'md:col-span-6 xl:col-span-7 xl:row-span-2',
  },
  {
    id: '02',
    category: 'Health Experience',
    title: 'Orbit Care Companion',
    summary:
      'Designed a check-in and reminder journey that reduced friction for recurring tasks while keeping the interface reassuring and lightweight.',
    outcome: 'Task completion +24%',
    scope: 'Journeys  •  Accessibility',
    year: '2024',
    tone: 'light',
    gradient: 'from-[#f7ead9] via-[#f3d9b3] to-[#ddb57c]',
    layout: 'md:col-span-3 xl:col-span-5',
  },
  {
    id: '03',
    category: 'Ops Workspace',
    title: 'Atlas Command Center',
    summary:
      'Reframed complex operations data into guided views, helping teams scan priorities quickly without losing deep system visibility.',
    outcome: 'Alert triage time -19%',
    scope: 'IA  •  Dashboard Patterns',
    year: '2025',
    tone: 'dark',
    gradient: 'from-[#0a1119] via-[#15324d] to-[#4da1ff]',
    layout: 'md:col-span-3 xl:col-span-5',
  },
  {
    id: '04',
    category: 'Commerce',
    title: 'Loom & Ledger Storefront',
    summary:
      'Shaped a conversion-led product discovery flow that balanced storytelling, filtering, and purchase confidence in one cohesive system.',
    outcome: 'Conversion rate +17%',
    scope: 'E-commerce UX  •  Prototyping',
    year: '2024',
    tone: 'light',
    gradient: 'from-[#f4f0e6] via-[#e8dcc7] to-[#c8b18c]',
    layout: 'md:col-span-6 xl:col-span-8',
  },
  {
    id: '05',
    category: 'EdTech',
    title: 'Northstar Learning Flow',
    summary:
      'Built a modular lesson architecture with clearer progress signals so learners always knew what to do next and why it mattered.',
    outcome: 'Module completion +28%',
    scope: 'Interaction Design  •  Motion',
    year: '2023',
    tone: 'dark',
    gradient: 'from-[#0d0d16] via-[#37204c] to-[#ff6f61]',
    layout: 'md:col-span-3 xl:col-span-4',
  },
  {
    id: '06',
    category: 'Public Service',
    title: 'CivicFlow Service Portal',
    summary:
      'Simplified a multi-step citizen service process into an understandable guided form system with stronger trust cues and error recovery.',
    outcome: 'Drop-off rate -26%',
    scope: 'Service Design  •  Forms',
    year: '2025',
    tone: 'light',
    gradient: 'from-[#edf2f6] via-[#dbe6ef] to-[#a9bed1]',
    layout: 'md:col-span-3 xl:col-span-4',
  },
  {
    id: '07',
    category: 'Design System',
    title: 'Prism Component Language',
    summary:
      'Created a scalable design system foundation that aligned product teams on interaction patterns, tokens, and faster handoff quality.',
    outcome: 'Handoff time -35%',
    scope: 'Tokens  •  Documentation  •  Governance',
    year: '2025',
    tone: 'dark',
    gradient: 'from-[#131316] via-[#1d2736] to-[#6fd2c0]',
    layout: 'md:col-span-6 xl:col-span-8',
  },
]

export const milestones = [
  {
    date: 'Dec 2021',
    title: 'Engineering foundation',
    body: 'Started my engineering journey, building a strong foundation in problem-solving, systems thinking, and technical execution.',
  },
  {
    date: 'Jan 2025',
    title: 'Internship begins',
    body: 'Started my UI/UX internship at GTT Data Solutions, translating design decisions into production-ready interfaces and clearer user flows.',
  },{
    date: 'May 2025',
    title: 'Certified engineer',
    body: 'Graduated with an A grade, bringing together design sensibility, engineering rigor, and a sharper systems mindset.',
  },
  {
    date: 'Jun 2025',
    title: 'Full-time transition',
    body: 'Stepped into a full-time UI/UX Designer role, shaping product systems with stronger consistency, interaction quality, and visual discipline.',
  },
]

export const projects = [
  {
    title: 'Nebula Commerce',
    tag: 'Experience Architecture',
    body: 'A modular storefront system balancing conversion, storytelling, and motion-led product discovery.',
    accent: 'from-[#7e8dff] via-[#675FEC] to-[#312d66]',
  },
  {
    title: 'Flow Atlas',
    tag: 'UX Strategy',
    body: 'An operations workspace reimagined into a calm, cinematic cockpit where every dense workflow feels guided.',
    accent: 'from-[#ffd76e] via-[#e5a624] to-[#544118]',
  },
  {
    title: 'Signal OS',
    tag: 'Design Engineering',
    body: 'A robust design system and frontend language built to make complexity feel precise, responsive, and premium.',
    accent: 'from-[#7bf1df] via-[#50a8ff] to-[#152a52]',
  },
]

export const articles = [
  {
    title: 'Design Is Not Decoration',
    description: 'Why premium interfaces earn trust when visual styling grows from clear system behavior.',
    image:
      'linear-gradient(135deg, rgba(139,124,255,0.95), rgba(80,193,255,0.45)), radial-gradient(circle at 24% 28%, rgba(255,255,255,0.36), transparent 42%)',
  },
  {
    title: 'Motion As Information',
    description: 'How animation reveals hierarchy, intent, continuity, and the next best action without noise.',
    image:
      'linear-gradient(135deg, rgba(255,214,0,0.88), rgba(103,95,236,0.58)), radial-gradient(circle at 72% 24%, rgba(255,255,255,0.24), transparent 38%)',
  },
  {
    title: 'Building Calm Interfaces',
    description: 'Engineering decisions that quietly improve clarity, accessibility, and perceived product quality.',
    image:
      'linear-gradient(135deg, rgba(103,95,236,0.82), rgba(65,62,92,0.98)), radial-gradient(circle at 65% 58%, rgba(255,255,255,0.18), transparent 36%)',
  },
]

export const contacts = [
  { label: 'Address', value: 'Kolhapur, Maharashtra, India' },
  { label: 'Phone', value: '+91 98765 43210' },
  { label: 'Email', value: 'hello@portfolio.dev' },
]
