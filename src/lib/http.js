/**
 * Normalizes different error shapes into a user-facing message.
 * Supports Error instances, plain strings, HTTP-like objects (status, statusText), and generic objects.
 * Falls back to the provided defaultMessage or a generic message.
 * @param {unknown} err - Caught error from fetch/JSON parsing or custom throw.
 * @param {Object} [options]
 * @param {string} [options.defaultMessage] - Message used when no better detail is available.
 * @returns {string} - Human-readable error message.
 */
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

/**
 * Fetches JSON and throws enriched errors with status and statusText when response is not ok.
 * Also wraps JSON parsing failures with a descriptive error.
 * @param {string} url - Endpoint to fetch.
 * @param {Object} [options]
 * @param {string} [options.defaultErrorMessage] - Message used when response.ok is false.
 * @returns {Promise<any>} - Parsed JSON payload.
 * @throws {Error} - With status/statusText when HTTP not ok, or cause when JSON parse fails.
 */
export const fetchJson = async (url, { defaultErrorMessage } = {}) => {
  let response

  try {
    response = await fetch(url)
  } catch (err) {
    const error = new Error(
      defaultErrorMessage ||
        'Wystąpił błąd sieci podczas komunikacji z serwerem'
    )
    error.cause = err
    error.status = 0
    error.statusText = 'Błąd połączenia z siecią'
    throw error
  }

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
