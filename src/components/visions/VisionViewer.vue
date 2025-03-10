<template>
  <div class="vision-viewer">
    <div class="vision-header">
      <h2>{{ title }}</h2>
      <p v-if="subtitle" class="vision-subtitle">{{ subtitle }}</p>
    </div>

    <div class="vision-content">
      <div class="vision-image-container">
        <!-- Quando tivermos a imagem interativa -->
        <InteractiveImage
          v-if="false"
          :image-src="imageSrc"
          :image-alt="title"
          :hotspots="hotspots"
          @open-details="openHotspotDetails"
        />

        <!-- Placeholder enquanto não temos a imagem interativa -->
        <div v-else class="vision-image-placeholder">
          <div class="placeholder-icon">✧</div>
          <p>Imagem interativa de {{ title }}</p>
          <p class="placeholder-note">A imagem interativa estará disponível em breve</p>
        </div>

        <div class="vision-controls">
          <button class="btn-secondary vision-control" @click="toggleDescription">
            {{ isDescriptionOpen ? 'Fechar Explicação' : 'Ver Explicação' }}
          </button>
          <div class="vision-navigation">
            <button
              class="btn-secondary vision-control"
              :disabled="!previousChapter"
              @click="navigateToPreviousChapter"
            >
              <span class="nav-arrow">←</span> Anterior
            </button>
            <span class="chapter-indicator">Capítulo {{ chapter }}</span>
            <button
              class="btn-secondary vision-control"
              :disabled="!nextChapter"
              @click="navigateToNextChapter"
            >
              Próximo <span class="nav-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <VisionDescription
        v-if="isDescriptionOpen"
        :title="title"
        :chapter="chapter"
        :description="description"
        :scripture-references="scriptureReferences"
        :commentary="commentary"
        @close="closeDescription"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VisionDescription from './VisionDescription.vue'
import InteractiveImage from './InteractiveImage.vue'

export default {
  name: 'VisionViewer',
  components: {
    VisionDescription,
    InteractiveImage
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    book: {
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
    },
    totalChapters: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      imageSrc: '', // Futuramente, a URL da imagem
      hotspots: [], // Futuramente, os pontos interativos
      error: null
    }
  },
  computed: {
    ...mapState(['isDescriptionOpen']),

    previousChapter() {
      const chapter = parseInt(this.chapter)
      return chapter > 1 ? chapter - 1 : null
    },

    nextChapter() {
      const chapter = parseInt(this.chapter)
      return chapter < this.totalChapters ? chapter + 1 : null
    }
  },
  methods: {
    ...mapActions(['toggleDescription']),

    navigateToPreviousChapter() {
      if (this.previousChapter) {
        this.$router.push(`/${this.book}/${this.previousChapter}`)
      }
    },

    navigateToNextChapter() {
      if (this.nextChapter) {
        this.$router.push(`/${this.book}/${this.nextChapter}`)
      }
    },

    closeDescription() {
      this.toggleDescription(false)
    },

    openHotspotDetails(index) {
      // Tratamento para futuras funcionalidades de hotspots
      console.log(`Abrir detalhes do hotspot ${index}`)
    },

    // Tratamento de erros
    handleError(err) {
      this.error = err.message
      console.error('Error in VisionViewer component:', err)
    }
  },
  watch: {
    // Resetar a descrição quando mudar de capítulo
    chapter() {
      if (this.isDescriptionOpen) {
        this.toggleDescription(false)
      }
    }
  },
  mounted() {
    try {
      // Futuramente: carregar dados dinâmicos da imagem
      // this.loadImageData(this.book, this.chapter)
    } catch (err) {
      this.handleError(err)
    }
  }
}
</script>

<style scoped>
.vision-viewer {
  width: 100%;
}

.vision-header {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.vision-subtitle {
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
}

.vision-content {
  display: flex;
  gap: var(--space-lg);
  align-items: flex-start;
}

.vision-image-container {
  flex: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
}

.vision-image-placeholder {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--color-surface);
  padding: var(--space-lg);
  background-image: linear-gradient(45deg, rgba(75, 46, 131, 0.2), rgba(0, 0, 0, 0.4));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.placeholder-icon {
  font-size: 3rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.6; transform: scale(1); }
}

.placeholder-note {
  font-size: 0.8rem;
  margin-top: var(--space-sm);
  color: var(--color-text-muted);
}

.vision-controls {
  padding: var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.vision-navigation {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.chapter-indicator {
  padding: 0 var(--space-md);
  font-family: var(--font-family-heading);
  color: var(--color-secondary);
  min-width: 120px;
  text-align: center;
}

.vision-control {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.vision-control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow {
  font-size: 1.2em;
  line-height: 1;
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-background);
}

.btn-secondary:hover, .btn-secondary:focus {
  background-color: var(--color-secondary-light);
  text-decoration: none;
}

@media (max-width: 1024px) {
  .vision-content {
    flex-direction: column;
  }

  .vision-image-placeholder {
    height: 50vh;
  }

  .vision-controls {
    flex-direction: column;
    gap: var(--space-md);
  }

  .vision-navigation {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .vision-image-placeholder {
    height: 40vh;
  }

  .btn-secondary {
    font-size: 0.9rem;
    padding: var(--space-xs) var(--space-md);
  }
}
</style>
