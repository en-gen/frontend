<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        
        <b-form-group label="Fullscreen"
                      label-for="fullscreenToggle"
                      horizontal>
          <b-form-checkbox id="fullscreenToggle"
                           v-model="fullscreen"/>
        </b-form-group>

      </div>
    </div>
  </div>
</template>

<script>
const window = require('electron').remote.getCurrentWindow()

export default {
  data () {
    return {
      fullscreen: Boolean
    }
  },
  watch: {
    fullscreen: function (newFullscreen, oldFullscreen) {
      window.setFullScreen(newFullscreen)
    }
  },
  props: {
    platform: Object
  },
  methods: {
  }
}
</script>