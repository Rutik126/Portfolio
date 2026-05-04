export const navItems = [
  { label: 'About', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#timeline' },
  { label: 'Articles', href: '#articles' },
  { label: 'Contact', href: '#contact' },
]

export const headerSections = [
  { id: 'hero', theme: 'light' },
  { id: 'projects', theme: 'light' },
  { id: 'timeline', theme: 'dark' },
  { id: 'articles', theme: 'dark' },
  { id: 'contact', theme: 'dark' },
]

export const heroContent = {
  introLine: 'I’m Rutik Kumbhar, a UI/UX Designer focused on solving real-world problems through intuitive digital experiences. I enjoy turning complex ideas into simple, user-friendly solutions.',
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
  // {
  //   id: '04',
  //   category: 'Commerce',
  //   title: 'Loom & Ledger Storefront',
  //   summary:
  //     'Shaped a conversion-led product discovery flow that balanced storytelling, filtering, and purchase confidence in one cohesive system.',
  //   outcome: 'Conversion rate +17%',
  //   scope: 'E-commerce UX  •  Prototyping',
  //   year: '2024',
  //   tone: 'light',
  //   gradient: 'from-[#f4f0e6] via-[#e8dcc7] to-[#c8b18c]',
  //   layout: 'md:col-span-6 xl:col-span-8',
  // },
  // {
  //   id: '05',
  //   category: 'EdTech',
  //   title: 'Northstar Learning Flow',
  //   summary:
  //     'Built a modular lesson architecture with clearer progress signals so learners always knew what to do next and why it mattered.',
  //   outcome: 'Module completion +28%',
  //   scope: 'Interaction Design  •  Motion',
  //   year: '2023',
  //   tone: 'dark',
  //   gradient: 'from-[#0d0d16] via-[#37204c] to-[#ff6f61]',
  //   layout: 'md:col-span-3 xl:col-span-4',
  // },
  // {
  //   id: '06',
  //   category: 'Public Service',
  //   title: 'CivicFlow Service Portal',
  //   summary:
  //     'Simplified a multi-step citizen service process into an understandable guided form system with stronger trust cues and error recovery.',
  //   outcome: 'Drop-off rate -26%',
  //   scope: 'Service Design  •  Forms',
  //   year: '2025',
  //   tone: 'light',
  //   gradient: 'from-[#edf2f6] via-[#dbe6ef] to-[#a9bed1]',
  //   layout: 'md:col-span-3 xl:col-span-4',
  // },
  // {
  //   id: '07',
  //   category: 'Design System',
  //   title: 'Prism Component Language',
  //   summary:
  //     'Created a scalable design system foundation that aligned product teams on interaction patterns, tokens, and faster handoff quality.',
  //   outcome: 'Handoff time -35%',
  //   scope: 'Tokens  •  Documentation  •  Governance',
  //   year: '2025',
  //   tone: 'dark',
  //   gradient: 'from-[#131316] via-[#1d2736] to-[#6fd2c0]',
  //   layout: 'md:col-span-6 xl:col-span-8',
  // },
]

export const milestones = [
  {
  date: 'Dec 2021',
  title: 'Engineering Foundation',
  body: 'Started my engineering journey, learning how to solve problems, think in systems, and build things from the ground up.',
},
{
  date: 'Jan 2025',
  title: 'UI/UX Internship',
  body: 'Began my UI/UX internship at GTT Data Solutions, where I worked on real projects and learned how design decisions impact actual users.',
},
{
  date: 'May 2025',
  title: 'Graduation',
  body: 'Graduated with an A grade, gaining both technical knowledge and a clearer understanding of how design and engineering work together.',
},
{
  date: 'Jun 2025',
  title: 'UI/UX Designer',
  body: 'Started working as a full-time UI/UX Designer, focusing on creating clean, usable interfaces and improving overall user experience.',
},
]

export const projects = [
  {
  slug: 'rsf-workforce-system',
  title: 'RSF Workforce System',
  tag: 'Product Design',
  body: 'A workforce management system designed to streamline attendance, task tracking, and daily operations for factory workers.',
  accent: 'from-[#7e8dff] via-[#675FEC] to-[#312d66]',
  client: 'Rajarambapu Sugar Factory',
  role: 'Product Designer',
  duration: 'Sep — Nov 2025',
  industry: 'Industrial Manufacturing',
  platform: 'iOS · Android',
  shortDescription:
    'Designed a mobile-first system to digitize factory operations, improving visibility, coordination, and task management for on-ground teams.',
  heroImage: '/rsf-project-img/RSF.png',

  overview: [
    'This project focused on transforming manual factory workflows into a structured digital system for managing attendance, tasks, and daily operations.',
    'The goal was to simplify complex processes into a clear, usable mobile experience tailored for real-world industrial environments.',
  ],

  sections: [
    {
      title: 'Context',
      body:
        'Factory operations relied heavily on manual tracking and fragmented communication. This made it difficult to monitor attendance, track task progress, and maintain consistent reporting across teams.',
      images: ['/rsf-project-img/1.png'],
    },
    {
      title: 'Approach',
      body:
        'I designed a mobile-first experience focused on clarity and ease of use. The system introduced structured task flows, clear status indicators, and simplified interfaces optimized for workers with varying levels of digital familiarity.',
      images: [],
    },
    {
      title: 'Outcome',
      body:
        'The final design brings clarity to day-to-day operations by centralizing workflows into a single system. It improves visibility, reduces manual effort, and enables more efficient coordination between workers and supervisors.',
      images: ['/rsf-project-img/RSF.png'],
    },
  ],
},
  {
    slug: 'townsquare-community-platform',
    title: 'TownSquare',
    tag: 'Community Platform',
    body: 'A location-based community platform that helps neighbors stay informed, connected, and engaged in their local area.',
    accent: 'from-[#ffd76e] via-[#e5a624] to-[#544118]',
    client: 'Personal Project',
    role: 'UI/UX Designer',
    duration: 'Nov 2025 - Jan 2026',
    industry: 'Social Networking',
    platform: 'Mobile App',
    shortDescription:
      'A digital neighborhood experience designed to connect people living in the same area through local updates, social interaction, and community support.',
    heroImage: '/TownSquare-project-img/cover.png',
    overview: [
      'TownSquare was created from the observation that people often miss meaningful local interactions because of busy routines, different work locations, and conflicting schedules, even when they live close to each other.',
      'The project imagines a simple digital neighborhood where users can stay aware of local incidents, share useful updates, connect with nearby people, and support small buying and selling within their own community.',
    ],
    sections: [
      {
        title: 'Problem & Vision',
        body:
          'Modern routines often reduce opportunities for neighbors to interact, leaving people disconnected from nearby events, local issues, and the people living around them. TownSquare was designed to bridge that gap by creating a location-based platform focused on real-time local awareness and stronger community connection.',
        images: ['/TownSquare-project-img/cover_3.png'],
      },
      {
        title: 'Core Experience',
        body:
          'The app adapts content based on the user’s current city, making local updates more relevant and useful. It supports incident sharing, neighborhood updates, local friendships, and small-scale community commerce, while also allowing users to switch locations smoothly when they relocate.',
        images: [
          '/TownSquare-project-img/Components.png',
          '/TownSquare-project-img/TownSquare.png',
        ],
      },
      {
        title: 'Outcome',
        body:
          'TownSquare is positioned as a useful and engaging ecosystem that brings together social connection, local awareness, and accessibility in one place. The overall experience aims to strengthen neighborhoods by helping people stay informed, build trust, and participate more actively in their local community.',
        images: ['/TownSquare-project-img/cover_2.png'],
      },
    ],
  },
  // {
  //   slug: 'signal-os',
  //   title: 'Signal OS',
  //   tag: 'Design Engineering',
  //   body: 'A robust design system and frontend language built to make complexity feel precise, responsive, and premium.',
  //   accent: 'from-[#7bf1df] via-[#50a8ff] to-[#152a52]',
  //   client: 'Rajarambapu Sugar Factory',
  //   role: 'Product Designer',
  //   duration: 'Mar — May 2026',
  //   industry: 'Design Systems',
  //   platform: 'Web Platform',
  //   shortDescription:
  //     'A system-level initiative aligning interface patterns, reusable components, and implementation behavior into one scalable product language.',
  //   heroImage: '/project%20%201%20port.png',
  //   overview: [
  //     'Signal OS focused on consistency at scale, defining how interface pieces should behave, not just how they should look.',
  //     'It created a stronger bridge between design intent and frontend execution, improving repeatability without flattening the product’s visual character.',
  //   ],
  //   sections: [
  //     {
  //       title: 'Foundation',
  //       body:
  //         'The work started by identifying repeated interaction patterns, mismatched states, and visual drift across the product surface. From there, I defined a shared component language with clearer tokens and usage logic.',
  //       images: ['/Img/5.png'],
  //     },
  //     {
  //       title: 'Pattern Library',
  //       body:
  //         'Reusable modules were documented around state behavior, spacing logic, hierarchy, and motion principles. The goal was to give teams a practical system that accelerated execution rather than adding process overhead.',
  //       images: ['/Img/6.png', '/Img/7.png'],
  //     },
  //     {
  //       title: 'Delivery',
  //       body:
  //         'By tying interaction rules and implementation quality together, the system made interfaces feel more coherent, more premium, and more dependable across different product areas.',
  //       images: ['/Img/8.png'],
  //     },
  //   ],
  // },
]

export const articles = [
  {
    title: 'Designing for Habit: How UX Designers Prioritize User Behavior Across Different Apps',
    description:
      'A UX-focused look at how different apps shape repeated behavior through user needs, context, motivation, and interaction patterns.',
    image: 'url("/Articals/artical_5.png")',
    href: 'https://medium.com/@ruthikkumbhar/designing-for-habit-how-ux-designers-prioritize-user-behavior-across-different-apps-5978f1f57143',
  },
  {
    title: 'AI Can Build Fast, But Can It Build Right?',
    description:
      'A practical look at the gap between shipping quickly with AI and building products with the right quality, structure, and decisions.',
    image: 'url("/Articals/artical_1.png")',
    href: 'https://medium.com/@ruthikkumbhar/ai-can-build-fast-but-can-it-build-right-2e0b3705bbea',
  },
  {
    title: 'How to Set Up Apache Superset on Your Local Machine',
    description:
      'A step-by-step setup guide for running Apache Superset locally so you can start exploring data and dashboards on your own machine.',
    image: 'url("/Articals/artical_2.png")',
    href: 'https://medium.com/@ruthikkumbhar/how-to-set-up-apache-superset-on-your-local-machine-step-by-step-guide-0b18ed82d3f2',
  },
  {
    title: 'Creating Your First Chart and Dashboard in Apache Superset',
    description:
      'A guided walkthrough for turning raw data into your first working chart and dashboard inside Apache Superset.',
    image: 'url("/Articals/artical_3.png")',
    href: 'https://medium.com/@ruthikkumbhar/creating-your-first-chart-and-dashboard-in-apache-superset-step-by-step-c3293b36b934',
  },
  {
    title: 'Advanced Methods and Queries for Creating Charts in Apache Superset',
    description:
      'More advanced chart-building techniques and query methods for creating richer visualizations in Apache Superset.',
    image: 'url("/Articals/artical_4.png")',
    href: 'https://medium.com/@ruthikkumbhar/advanced-methods-and-queries-for-creating-charts-in-apache-superset-24a118f5d1af',
  },
]

export const contacts = [
  { label: 'Address', value: 'Sangli, Maharashtra, India' },
  { label: 'Phone', value: '+91 8799884560' },
  { label: 'Email', value: 'ruthikkumbhar@gmail.com' },
]
