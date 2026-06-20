import { portfolioItems } from '~/data/studio'
import type { PortfolioItem } from '~/types/portfolio'

const STORAGE_KEY = 'wood-studio-managed-portfolio'

const normalizePortfolioItem = (item: PortfolioItem): PortfolioItem => ({
  ...item,
  year: Number(item.year),
  images: item.images?.length ? item.images : [item.coverImage],
  materials: item.materials?.length ? item.materials : ['Wood']
})

export const usePortfolioStore = () => {
  const managedItems = useState<PortfolioItem[]>('managed-portfolio-items', () => [])
  const hasLoadedManagedItems = useState('managed-portfolio-loaded', () => false)

  const loadManagedItems = () => {
    if (!import.meta.client || hasLoadedManagedItems.value) return

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      managedItems.value = raw ? JSON.parse(raw).map(normalizePortfolioItem) : []
    } catch {
      managedItems.value = []
    } finally {
      hasLoadedManagedItems.value = true
    }
  }

  const persistManagedItems = () => {
    if (!import.meta.client) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(managedItems.value))
  }

  const allPortfolioItems = computed(() =>
    [...managedItems.value, ...portfolioItems].sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year
      return a.title.localeCompare(b.title)
    })
  )

  const saveManagedItem = (item: PortfolioItem) => {
    const normalized = normalizePortfolioItem(item)
    const index = managedItems.value.findIndex((entry) => entry.id === normalized.id)

    if (index >= 0) {
      managedItems.value.splice(index, 1, normalized)
    } else {
      managedItems.value.unshift(normalized)
    }

    persistManagedItems()
  }

  const deleteManagedItem = (id: string) => {
    managedItems.value = managedItems.value.filter((item) => item.id !== id)
    persistManagedItems()
  }

  if (import.meta.client) {
    loadManagedItems()
  }

  return {
    allPortfolioItems,
    managedItems,
    loadManagedItems,
    saveManagedItem,
    deleteManagedItem
  }
}
