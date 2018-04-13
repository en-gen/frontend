<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <b-form-group label="Platform"
                      :label-for="this.platform.alias + '_platformSelect'">
          <b-form-select :id="this.platform.alias + '_platformSelect'"
                        :options="platformOptions"
                        v-model="selectedPlatformOption" />
        </b-form-group>
        
        <b-form-group label="Meta Media Location"
                      :label-for="this.platform.alias + '_metaMediaPath'">
          <b-input-group>
            <b-form-input
              :id="this.platform.alias + '_metaMediaPath'"
              :value="this.platform.metaMediaPath" />
            <b-input-group-append>
              <b-button @click="onMetaMediaPathClicked">Browse</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Media Location"
                      :label-for="this.platform.alias + '_mediaPath'">
          <b-input-group>
            <b-form-input
              :id="this.platform.alias + '_mediaPath'"
              :value="this.platform.mediaPath" />
            <b-input-group-append>
              <b-button @click="onMediaPathClicked">Browse</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        
        <b-form-group label="Media File Extensions"
                      description="case-sensitive, comma-separated"
                      :label-for="this.platform.alias + '_mediaExtensions'">
          <b-input />
        </b-form-group>
        
        <b-form-group label="Launch Command">
          <b-form-radio-group buttons
                              :options="launchOptions"
                              v-model="selectedLaunchOption" />
        </b-form-group>
        <component :is="launchConfigUI" :platform="platform"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import LaunchRetroArch from './launch/LaunchRetroArch'
import LaunchAdvanced from './launch/LaunchAdvanced'
import LaunchExtreme from './launch/LaunchExtreme'

const { dialog } = require('electron').remote

export default {
  components: {
    LaunchRetroArch,
    LaunchAdvanced,
    LaunchExtreme
  },
  data () {
    return {
      loading: false,
      selectedPlatformOption: Object,
      selectedLaunchOption: 'ADVANCED'
    }
  },
  props: {
    platform: Object
  },
  computed: {
    ...mapState('platforms', {
      remotePlatforms: 'instances'
    }),
    platformOptions: function () {
      return this.remotePlatforms.map(x => { return { value: x, text: x.name } })
    },
    launchOptions: function () {
      let options = [
        { text: 'Advanced', value: 'ADVANCED' },
        { text: 'Extreme', value: 'EXTREME' }
      ]

      // TODO: if retroach path configured...
      options.splice(0, 0, { text: 'RetroArch', value: 'RETROARCH' })

      return options
    },
    launchConfigUI: function () {
      switch (this.selectedLaunchOption) {
        case 'RETROARCH': {
          return LaunchRetroArch
        }
        case 'ADVANCED': {
          return LaunchAdvanced
        }
        case 'EXTREME': {
          return LaunchExtreme
        }
      }
    }
  },
  methods: {
    ...mapActions('platforms', {
      loadPlatforms: 'load'
    }),
    onMetaMediaPathClicked: function (event) {
      dialog.showOpenDialog({
        properties: [ 'openDirectory' ]
      },
      filePaths => {
        if (filePaths === undefined) return
        this.platform.metaMediaPath = filePaths[0]
      })
    },
    onMediaPathClicked: function (event) {
      dialog.showOpenDialog({
        properties: [ 'openDirectory' ]
      },
      filePaths => {
        if (filePaths === undefined) return
        this.platform.mediaPath = filePaths[0]
      })
    }
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