import Axios from 'axios'

const baseUrl = 'https://api.baseplate.appetiserdev.tech/api/v1/auth'

export default {
  async onLogin (username, password) {
    const requestConfig = {
      method: 'POST',
      url: `${baseUrl}/login`,
      data: { username, password }
    }
    try {
      const { data } = await Axios.request(requestConfig)
      const response = data
      this.processData(response)
      return response
    } catch (error) {
      const { data } = error.response
      return data
    }
  },

  onLogout () {
    const requestConfig = {
      method: 'POST',
      url: `${baseUrl}/logout`
    }
    Axios.request(requestConfig)
    this.removeStorageData()
  },

  async onSignUp (email, fullName, password, passwordConfirmation) {
    const requestConfig = {
      method: 'POST',
      url: `${baseUrl}/register`,
      data: { email, password, full_name: fullName, password_confirmation: passwordConfirmation }
    }
    try {
      const { data } = await Axios.request(requestConfig)
      const response = data
      this.processData(response)
      return response
    } catch (error) {
      const { data } = error.response
      return data
    }
  },

  async onVerify (token, email) {
    const storageData = localStorage.getItem('appetiser')

    if (storageData === null) {
      return false
    }

    // eslint-disable-next-line camelcase
    const { access_token } = JSON.parse(storageData)

    const requestConfig = {
      method: 'POST',
      url: `${baseUrl}/verification/verify`,
      headers: {
        Authorization: access_token
      },
      data: { token, via: email }
    }
    try {
      const { data } = await Axios.request(requestConfig)
      const response = data

      this.processData(response)

      return response
    } catch (error) {
      const { data } = error.response
      return data
    }
  },

  async verifyToken () {
    const storageData = localStorage.getItem('appetiser')

    if (storageData === null) {
      return false
    }

    // eslint-disable-next-line camelcase
    const { access_token, email } = JSON.parse(storageData)

    const requestConfig = {
      method: 'POST',
      url: `${baseUrl}/check-username`,
      headers: {
        Authorization: access_token
      },
      data: {
        username: email
      }
    }

    try {
      const { data } = await Axios.request(requestConfig)
      const response = data
      const { username } = response.data
      return username === email
    } catch {
      this.removeStorageData()
      return false
    }
  },

  async onResendVerification (email) {
    const storageData = localStorage.getItem('appetiser')

    if (storageData === null) {
      return false
    }

    // eslint-disable-next-line camelcase
    const { access_token } = JSON.parse(storageData)

    const requestConfig = {
      method: 'POST',
      url: `${baseUrl}/verification/resend`,
      headers: {
        Authorization: access_token
      },
      data: {
        via: email
      }
    }
    try {
      const { data } = await Axios.request(requestConfig)
      const response = data

      return response
    } catch (error) {
      const { data } = error.response
      return data
    }
  },

  isAuthenticated () {
    return !!localStorage.getItem('appetiser')
  },

  processData (response) {
    // eslint-disable-next-line camelcase
    const { access_token, user } = response.data
    const jsonData = JSON.stringify({ access_token, email: user.email })

    if (response.http_status === 200) {
      localStorage.setItem('appetiser', jsonData)
    }
  },

  removeStorageData () {
    localStorage.removeItem('appetiser')
  }
}
