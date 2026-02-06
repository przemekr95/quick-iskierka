export const LEFT_NAVIGATION = [
  {
    href: 'https://www.facebook.com/MUKSIskierkaTarnow/',
    label: 'Aktualności',
    icon: 'facebook',
    target: '_blank',
    type: 'external',
  },
  {
    path: '/',
    label: 'Strona główna',
    type: 'internal',
  },
]

export const RIGHT_NAVIGATION = [
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
 * Get all navigation items
 * @returns {Array} All navigation items from both left and right navigation
 */
export const getAllNavigationItems = () => {
  return [
    ...LEFT_NAVIGATION.filter(item => item.type === 'internal'),
    ...RIGHT_NAVIGATION,
  ]
}

/**
 * Get navigation item by path
 * @param {string} path - The path to find
 * @returns {Object|null} Navigation item or null if not found
 */
export const getNavigationItem = path => {
  const allItems = getAllNavigationItems()
  return allItems.find(item => item.path === path) || null
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
    ? 'MUKS Iskierka Tarnów'
    : `${item.label} - MUKS Iskierka Tarnów`
}
