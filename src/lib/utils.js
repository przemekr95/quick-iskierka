/**
 * Generates initials from a full name
 * @param {string} name - Full name
 * @returns {string} - First two initials in uppercase
 */
export const getInitials = name => {
  if (typeof name !== 'string') return '?'

  const initials = name
    .split(' ')
    .filter(word => word && word.length > 0)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()

  return initials || '?'
}
