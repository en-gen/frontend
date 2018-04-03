<template>
  <div>hello from system select</div>
</template>

<script>
import { mapState } from 'Vuex'

export default {
  computed: {
    ...mapState('systems', {
      systems: 'instances'
    })
  }
}
</script>