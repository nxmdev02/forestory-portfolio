export type PortfolioCategory = 'furniture' | 'interior' | 'kitchen' | 'table' | 'storage' | 'custom'

export interface PortfolioItem {
  id: string
  title: string
  year: number
  category: PortfolioCategory
  summary: string
  description: string
  client?: string
  location?: string
  period?: string
  coverImage: string
  images: string[]
  materials: string[]
}

export interface StaffMember {
  name: string
  role: string
  career: string
  note: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export interface TimelineItem {
  year: number
  title: string
  description: string
}

export interface HistoryItem {
  year: number
  title: string
  description: string
}
