const cookieParser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    auth: null
  }
}
export const getters = {
  auth: (state) => {
    return state.auth
  }
}
export const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  }
}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let token = null
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      token = parsed.token
    }
    commit('setAuth', token)
  },
  setAuth ({ commit }, user) {
    if (!user) {
      commit('setAuth', null)
      document.cookie = 'token=;path=/;expires=0'
    } else {
      user.getIdToken().then((token) => {
        commit('setAuth', token)
        const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days.
        document.cookie = 'token=' + token + ';path=/;max-age=' + expiresIn
        return null
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error getting ID token.', error)
        commit('setAuth', null)
        document.cookie = 'token=;path=/;expires=0'
      })
    }
  }
}
