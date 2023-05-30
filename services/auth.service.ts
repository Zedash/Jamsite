import { fetchWrapper } from '@/utils/fetchWrapper'

export const authService = {
  login,
  loginFacebook,
}

function login(username: string, password: string) {
  return fetchWrapper.post('/login_check', {
    _username: username,
    _password: password,
  })
}

function loginFacebook(id: number, email: string) {
  return fetchWrapper.post('/facebook/login_check', {
    id,
    email,
  })
}
