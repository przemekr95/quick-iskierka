// TODO

export const NAVIGATION_ITEMS = [
  {
    path: '/',
    label: 'Home',
    exact: true,
  },
  {
    path: '/klub',
    label: 'Klub',
    exact: false,
  },
  {
    path: '/druzyna',
    label: 'Drużyna',
    exact: false,
  },
  {
    path: '/kontakt',
    label: 'Kontakt',
    exact: false,
  },
]

/**
 * Get navigation item by path
 * @param {string} path - The path to find
 * @returns {Object|null} Navigation item or null if not found
 */
export const getNavigationItem = path => {
  return NAVIGATION_ITEMS.find(item => item.path === path) || null
}

/**
 * Get page title by path
 * @param {string} path - The current path
 * @returns {string} Page title
 */
export const getPageTitle = path => {
  const item = getNavigationItem(path)
  if (!item) return 'MUKS Iskierka Tarnów'

  return item.path === '/'
    ? 'MUKS Iskierka Tarnów - Klub Siatkarski'
    : `${item.label} - MUKS Iskierka Tarnów`
}

export default NAVIGATION_ITEMS
