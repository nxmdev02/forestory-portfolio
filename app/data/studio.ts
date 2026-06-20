import type { PortfolioItem, StaffMember, TimelineItem } from '~/types/portfolio'

export const categoryLabels: Record<PortfolioItem['category'], string> = {
  furniture: 'Custom Furniture',
  interior: 'Wood Interior',
  kitchen: 'Kitchen',
  table: 'Table',
  storage: 'Storage',
  custom: 'Custom Work'
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'walnut-living-wall-2026',
    title: 'Walnut Living Wall System',
    year: 2026,
    category: 'interior',
    summary: 'A full living-room wall system with walnut storage and display shelving.',
    description:
      'We refined the existing wall line and built custom storage for TV, audio, books, and objects. Dark walnut and soft indirect lighting create a calm, refined living space.',
    client: 'Seongsu Residence',
    location: 'Seoul, Seongdong-gu',
    period: 'Mar 2026 - May 2026',
    coverImage: '/images/placeholder-workshop.jpg',
    images: ['/images/placeholder-workshop.jpg', '/images/placeholder-detail-01.jpg', '/images/placeholder-detail-02.jpg'],
    materials: ['North American Walnut', 'Natural Oil', 'Brass Pulls', 'Indirect LED Lighting']
  },
  {
    id: 'oak-kitchen-island-2026',
    title: 'Oak Kitchen Island',
    year: 2026,
    category: 'kitchen',
    summary: 'An oak island that works as prep counter, storage, and casual dining table.',
    description:
      'Designed for a compact kitchen, this island combines storage, preparation, and dining in one piece. Durable finishes and softened edges make it practical for daily use.',
    client: 'Pangyo Townhouse',
    location: 'Seongnam, Gyeonggi-do',
    period: 'Jan 2026 - Feb 2026',
    coverImage: '/images/placeholder-workshop.jpg',
    images: ['/images/placeholder-workshop.jpg', '/images/placeholder-detail-03.jpg'],
    materials: ['White Oak', 'Matte Ceramic Top', 'Soft-Close Hardware']
  },
  {
    id: 'ash-dining-table-2025',
    title: 'Ash Wood Dining Table',
    year: 2025,
    category: 'table',
    summary: 'A bright six-seat dining table built for everyday family use.',
    description:
      'We shaped soft edges and a stable underframe for a family home. The light, strong ash grain brightens the room while keeping the table durable.',
    client: 'Private Client',
    location: 'Seoul, Mapo-gu',
    period: 'Sep 2025',
    coverImage: '/images/placeholder-workshop.jpg',
    images: ['/images/placeholder-workshop.jpg', '/images/placeholder-detail-04.jpg', '/images/placeholder-detail-05.jpg'],
    materials: ['Ash', 'Hardwax Oil', 'Steel Reinforcement']
  },
  {
    id: 'hanok-tea-room-2025',
    title: 'Hanok Tea Room Cabinet',
    year: 2025,
    category: 'storage',
    summary: 'A low wood cabinet for tea tools and ceramics in a quiet tea room.',
    description:
      'The cabinet was designed around the low windows and floor height of a hanok space. Sliding doors and slim wood slats bring a contemporary reading of traditional details.',
    client: 'Bukchon Tea Room',
    location: 'Seoul, Jongno-gu',
    period: 'Apr 2025 - Jun 2025',
    coverImage: '/images/placeholder-workshop.jpg',
    images: ['/images/placeholder-workshop.jpg', '/images/placeholder-detail-06.jpg'],
    materials: ['Cherry', 'Hanji Glass', 'Oil Stain']
  },
  {
    id: 'atelier-shelving-2024',
    title: 'Atelier Shelving System',
    year: 2024,
    category: 'custom',
    summary: 'Modular shelving for artwork storage, display, and photography.',
    description:
      'Built for a ceramic artist, the shelves use varied heights and depths to support the studio workflow. Modular parts can move between display, shooting, and storage modes.',
    client: 'Ceramic Atelier',
    location: 'Icheon, Gyeonggi-do',
    period: 'Aug 2024',
    coverImage: '/images/placeholder-workshop.jpg',
    images: ['/images/placeholder-workshop.jpg', '/images/placeholder-detail-07.jpg', '/images/placeholder-detail-08.jpg'],
    materials: ['Birch Plywood', 'Oak Veneer', 'Powder-Coated Frame']
  },
  {
    id: 'kids-room-furniture-2023',
    title: 'Growing Kids Room Furniture',
    year: 2023,
    category: 'furniture',
    summary: 'A flexible furniture set combining desk, bookcase, and bed storage.',
    description:
      'Created for a child entering school, the furniture allows height and storage changes over time. Rounded corners and stable fixing details improve safety.',
    client: 'Private Client',
    location: 'Seoul, Seocho-gu',
    period: 'Nov 2023',
    coverImage: '/images/placeholder-workshop.jpg',
    images: ['/images/placeholder-workshop.jpg', '/images/placeholder-detail-09.jpg'],
    materials: ['White Oak', 'Low-VOC Water-Based Finish', 'German Hardware']
  }
]

export const timelineItems: TimelineItem[] = [
  {
    year: 2026,
    title: 'Expanded Integrated Residential Work',
    description: 'Expanded custom wood interior projects that connect living rooms, kitchens, and studies with one consistent material language.'
  },
  {
    year: 2025,
    title: 'WOOD STUDIO Showroom Renewal',
    description: 'Opened a consultation showroom with wood samples, finish tests, and completed furniture examples.'
  },
  {
    year: 2024,
    title: 'Workshop Production Line Reorganized',
    description: 'Separated precision cutting and hand-finishing workflows to improve quality control and delivery stability.'
  },
  {
    year: 2023,
    title: 'Custom Furniture Workshop Launch',
    description: 'Started as a custom workshop focused on solid wood dining tables, cabinets, and residential furniture.'
  }
]

export const staffMembers: StaffMember[] = [
  {
    name: 'Minjae Koo',
    role: 'Founder / Lead Woodworker',
    career: '15 years',
    note: 'Leads proportion, finish, and material decisions with a focus on everyday use.'
  },
  {
    name: 'Seohyun Lee',
    role: 'Furniture Designer',
    career: '9 years',
    note: 'Translates client routines into drawings, samples, and clear production plans.'
  },
  {
    name: 'Doyoon Han',
    role: 'Production Manager',
    career: '11 years',
    note: 'Manages wood selection, joinery, hardware assembly, and process-level quality.'
  }
]

export const studioLocation = {
  name: 'WOOD STUDIO',
  address: '123 Example-ro, Example-gu, Seoul',
  lat: 37.5446,
  lng: 127.0557,
  phone: '010-0000-0000',
  email: 'woodstudio@example.com',
  hours: 'Mon-Sat 10:00 - 18:00'
}
