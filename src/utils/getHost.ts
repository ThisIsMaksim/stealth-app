export const getHost = () => {
  if (location.hostname.includes('localhost')) {
    return ''
  }

  return 'http://95.214.62.89:8080'
}