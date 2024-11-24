export const getHost = () => {
  if (location.hostname.includes('localhost')) {
    return ''
  }

  return 'https://95.214.62.89:8080'
}