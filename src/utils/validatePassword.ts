export const validatePassword = (password: string) => {
  let regExpWeak = /[a-z]/
  let regExpMedium = /\d+/
  let min_week_password = 3
  let min_medium_password = 6

  let password_week = password.match(regExpWeak)
  let password_medium = password.match(regExpMedium)

  if (password) {
    if (password.length <= min_week_password && (password_week || password_medium)) {
      return false
    }
    if (password.length >= min_medium_password && ((password_week && password_medium) || (password_medium) || (password_week))) {
      return true
    }
  }

  return false
}