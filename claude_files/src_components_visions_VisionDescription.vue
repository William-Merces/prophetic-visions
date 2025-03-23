<template>
  <div class="vision-description">
    <div class="description-header">
      <h3>{{ title }} - Capítulo {{ chapter }}</h3>
      <button class="close-btn" @click="$emit('close')" aria-label="Fechar descrição">×</button>
    </div>

    <div class="description-content">
      <div class="description-text">
        <p v-html="formattedDescription"></p>

        <div v-if="scriptureReferences && scriptureReferences.length" class="scripture-section">
          <h4>Referências Escriturais</h4>
          <div v-for="(reference, index) in scriptureReferences" :key="index">
            <ScriptureQuote :reference="reference.source">
              {{ reference.text }}
            </ScriptureQuote>
          </div>
        </div>

        <div v-if="commentary" class="commentary-section">
          <h4>Comentário Profético</h4>
          <p v-html="formattedCommentary"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScriptureQuote from '@/components/common/ScriptureQuote.vue'

export default {
  name: 'VisionDescription',
  components: {
    ScriptureQuote
  },
  props: {
    title: {
      type: String,
      required: true
    },
    chapter: {
      type: [Number, String],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    scriptureReferences: {
      type: Array,
      default: () => []
    },
    commentary: {
      type: String,
      default: ''
    }
  },
  computed: {
    formattedDescription() {
      return this.description.replace(/\n/g, '<br>')
    },
    formattedCommentary() {
      return this.commentary.replace(/\n/g, '<br>')
    }
  }
}
</script>

<style scoped>
.vision-description {
  flex: 1;
  max-width: 100%;
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-normal);
  animation: slide-in var(--transition-normal) forwards;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.description-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(75, 46, 131, 0.2);
}

.description-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--space-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background-color var(--transition-fast);
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.description-content {
  padding: var(--space-lg);
  overflow-y: auto;
  flex: 1;
}

.description-text {
  line-height: 1.7;
}

.description-text p {
  margin-bottom: var(--space-md);
}

.scripture-section,
.commentary-section {
  margin-top: var(--space-xl);
}

h4 {
  font-size: 1.1rem;
  margin-bottom: var(--space-md);
  color: var(--color-secondary-light);
  border-bottom: 1px solid rgba(196, 180, 84, 0.3);
  padding-bottom: var(--space-xs);
}

@media (max-width: 1024px) {
  .vision-description {
    max-height: 60vh;
  }
}

@media (max-width: 768px) {
  .description-header {
    padding: var(--space-sm) var(--space-md);
  }

  .description-content {
    padding: var(--space-md);
  }
}
</style>
