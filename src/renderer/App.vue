<template>
  <div id="app" class="container-fluid">
    <admin />
  <!--platform-select/ -->
  </div>
</template>

<style>
</style>

<script>
import PlatformSelect from '@/components/PlatformSelect'
import Admin from '@/components/Admin'

export default {
  name: 'frontend',
  components: {
    PlatformSelect,
    Admin
  }
}
</script>