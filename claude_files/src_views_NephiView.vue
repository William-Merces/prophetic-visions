<template>
  <div class="locked-view">
    <LockedContent
      title="Visões de Néfi"
      message="As visões proféticas de Néfi estão em desenvolvimento e serão disponibilizadas em breve."
    />
  </div>
</template>

<script>
import LockedContent from '@/components/common/LockedContent.vue'

export default {
  name: 'NephiView',
  components: {
    LockedContent
  }
}
</script>
