<template>
  <div class="locked-view">
    <LockedContent
      title="Visões de Moisés"
      message="As visões proféticas de Moisés estão em desenvolvimento e serão disponibilizadas em breve."
    />
  </div>
</template>

<script>
import LockedContent from '@/components/common/LockedContent.vue'

export default {
  name: 'MosesView',
  components: {
    LockedContent
  }
}
</script>
