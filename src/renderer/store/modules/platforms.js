import metadata from '@/metadata'
import { throttle } from 'lodash'

const getPlatforms = throttle(metadata.getPlatforms, 300000)

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
    if (state.instances.length === 0) {
      let platforms = await getPlatforms()
      commit('LOAD_PLATFORMS', platforms)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
