<template>
  <b-modal v-model="show" size="lg" centered
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
    :hide-header="true"
    :hide-footer="true">
    <b-tabs card>
      <b-tab title="Options">
      </b-tab>
      <b-tab title="Platforms">
        <platforms-admin />
      </b-tab>
      <b-tab title="Input">
      </b-tab>
      <b-tab title="Video">
        <video-admin />
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<style>
  .modal-lg {
    max-width: 95%;
  }
</style>

<script>
import PlatformsAdmin from './admin/platforms/PlatformsAdmin'
import VideoAdmin from './admin/VideoAdmin'

export default {
  components: {
    PlatformsAdmin,
    VideoAdmin
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    window.addEventListener('keyup', $event => {
      if ($event.keyCode === 27) {
        this.show = !this.show
      }
    })
  }
}
</script>