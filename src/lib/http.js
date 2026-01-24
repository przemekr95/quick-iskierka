export const normalizeError = (err, { defaultMessage } = {}) => {
  const fallback =
    defaultMessage || 'Wystąpił nieoczekiwany błąd podczas wykonywania żądania.'

  let message = null

  // Prefer Error.message when available
  if (err instanceof Error && typeof err.message === 'string') {
    const trimmed = err.message.trim()
    if (trimmed) {
      message = trimmed
    }
  } else if (typeof err === 'string') {
    // Handle plain string errors
    const trimmed = err.trim()
    if (trimmed) {
      message = trimmed
    }
  } else if (err && typeof err === 'object') {
    // Handle common network / HTTP-like error shapes
    if ('statusText' in err && typeof err.statusText === 'string') {
      const trimmed = err.statusText.trim()
      if (trimmed) {
        message = trimmed
      }
    }

    if (!message && 'status' in err && typeof err.status === 'number') {
      message = `Żądanie nie powiodło się (status ${err.status}).`
    }

    if (!message && typeof err.toString === 'function') {
      const str = err.toString().trim()
      if (str && str !== '[object Object]') {
        message = str
      }
    }
  }

  return message || fallback
}

export const fetchJson = async (url, { defaultErrorMessage } = {}) => {
  const response = await fetch(url)

  if (!response.ok) {
    const error = new Error(
      defaultErrorMessage || 'Nie udało się pobrać danych z serwera'
    )
    error.status = response.status
    error.statusText = response.statusText
    throw error
  }

  try {
    return await response.json()
  } catch (err) {
    const error = new Error('Nie udało się przetworzyć odpowiedzi z serwera')
    error.cause = err
    throw error
  }
}
