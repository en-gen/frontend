<template>
  <div>
    <h5>platforms!</h5>
    <b-form-select v-model="selected" :options="options" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    firstRun: false
  },
  data () {
    return {
      loading: false,
      selected: null
    }
  },
  computed: {
    ...mapState('platforms', {
      platforms: 'instances'
    }),
    options: function () {
      let test = this.platforms
      console.log(test)
      return test.map(x => { return { value: x, text: x.name } })
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