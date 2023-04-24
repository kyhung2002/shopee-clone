import { User } from 'src/types/user.type'

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}
export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || ''
}
export const getProfile = () => {
  const result = localStorage.getItem('profile') || null
  if (result) {
    return JSON.parse(result)
  }
}
export const saveProfile = (profile: User) => {
  const newProfile = JSON.stringify(profile)
  localStorage.setItem('profile', newProfile)
}
