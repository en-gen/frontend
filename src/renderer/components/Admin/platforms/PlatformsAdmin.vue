<template>
  <div class="container-fluid">
    <b-tabs cards>
      <b-tab v-for="platform in platforms" :key="platform.id">
        <template slot="title">
          <span class="platform-alias">{{ platform.alias }}</span> <b-button-close />
        </template>
        <platform-edit :platform="platform"/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<style>
.platform-alias {
  text-transform: uppercase
}
</style>

<script>
import { mapState, mapActions } from 'vuex'

import PlatformEdit from './PlatformEdit'

export default {
  components: {
    PlatformEdit
  },
  props: {
    firstRun: false
  },
  data () {
    return {
      loading: false,
      selected: null,

      platforms: [
        {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'Nintendo Entertainment System',
          alias: 'nes',
          metaMediaPath: undefined,
          mediaPath: undefined
        },
        {
          id: '00000000-0000-0000-0000-000000000002',
          name: 'Super Nintendo Entertainment System',
          alias: 'snes',
          metaMediaPath: undefined,
          mediaPath: undefined
        }
      ]
    }
  },
  computed: {
    ...mapState('platforms', {
      remotePlatforms: 'instances'
    }),
    options: function () {
      return this.remotePlatforms.map(x => { return { value: x, text: x.name } })
    }
  },
  methods: {
    ...mapActions('platforms', {
      loadPlatforms: 'load'
    })
  },
  async mounted () {
    this.loading = true
    try {
      await this.loadPlatforms()
    } finally {
      this.loading = false
    }
  }
}
</script>