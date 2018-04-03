<template>
  <b-modal v-model="show"
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
    :hide-header="true"
    :hide-footer="true"
    :center="true">
    <b-tabs card>
      <b-tab title="Platforms">
        <PlatformsAdmin />
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
import PlatformsAdmin from './Admin/PlatformsAdmin'

export default {
  components: {
    PlatformsAdmin
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