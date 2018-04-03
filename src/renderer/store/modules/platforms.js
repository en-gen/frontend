import metadata from '@/metadata'

const state = {
  instances: []
}

const mutations = {
  LOAD_PLATFORMS (state, platforms) {
    state.instances = platforms
  }
}

const actions = {
  async load ({ commit }) {
    let platforms = await metadata.getPlatforms()
    commit('LOAD_PLATFORMS', platforms)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
