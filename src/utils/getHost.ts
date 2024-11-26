export const getHost = () => {
  if (location.hostname.includes('localhost')) {
    return ''
  }

  return ''
}