<template>
  <div class="revelation-view">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <!-- Navegação entre modos de visualização -->
    <div class="view-mode-nav">
      <button
        class="mode-button"
        :class="{ 'active': viewMode === 'chapters' }"
        @click="switchViewMode('chapters')"
      >
        Ver por Capítulos
      </button>
      <button
        class="mode-button"
        :class="{ 'active': viewMode === 'visions' }"
        @click="switchViewMode('visions')"
      >
        Explorar Visões
      </button>
    </div>

    <!-- Modo de visualização por capítulos -->
    <RevelationChapters
      v-if="viewMode === 'chapters'"
      :initial-chapter="chapterFromRoute"
      @explore-vision="selectVision"
    />

    <!-- Modo de visualização por visões -->
    <div v-if="viewMode === 'visions'">
      <div v-if="!selectedVisionId" class="visions-index">
        <h1>Apocalipse</h1>
        <p class="subtitle">A Revelação de Jesus Cristo a João</p>

        <div class="intro-content">
          <div class="intro-text">
            <p>O livro do Apocalipse, também conhecido como Revelação, é o último livro do Novo Testamento e foi escrito pelo apóstolo João durante seu exílio na ilha de Patmos. Contém uma série de visões proféticas sobre o fim dos tempos, a Segunda Vinda de Jesus Cristo e o triunfo final de Deus sobre o mal.</p>

            <ScriptureQuote reference="Apocalipse 1:1-2">
              Revelação de Jesus Cristo, a qual Deus lhe deu, para mostrar aos seus servos as coisas que brevemente devem acontecer; e pelo seu anjo as enviou, e as notificou a João seu servo. O qual testificou da palavra de Deus, e do testemunho de Jesus Cristo, e de tudo o que tem visto.
            </ScriptureQuote>

            <p>As visões apocalípticas de João estão repletas de simbolismo rico e complexo, representando forças espirituais, eventos históricos e profecias futuras. Através desta jornada imersiva, você poderá explorar visualmente cada visão e compreender melhor o significado destas poderosas revelações.</p>
          </div>

          <div class="visions-selection">
            <h3>Visões do Apocalipse</h3>
            <div class="visions-grid">
              <div
                v-for="vision in visionPreviews"
                :key="vision.id"
                class="vision-card"
                @click="selectVision(vision.id)"
              >
                <div class="card-image">
                  <img :src="vision.previewImage" :alt="vision.title">
                  <div class="vision-overlay">
                    <span class="vision-name">{{ vision.title }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="vision-experience">
        <ImersiveVision
          :vision-data="getSelectedVisionData"
          v-if="getSelectedVisionData"
        />

        <div class="navigation-controls">
          <button @click="returnToIndex" class="back-button">
            <span class="back-icon">←</span> Voltar para Índice
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScriptureQuote from '@/components/common/ScriptureQuote.vue'
import ImersiveVision from '@/components/visions/ImersiveVision.vue'
import RevelationChapters from '@/components/visions/RevelationChapters.vue'
import { revelationVisions } from '@/data/revelationVisions.js'

export default {
  name: 'RevelationView',
  components: {
    ScriptureQuote,
    ImersiveVision,
    RevelationChapters
  },
  data() {
    return {
      viewMode: 'chapters', // 'chapters' ou 'visions'
      selectedVisionId: null,
      visionPreviews: [
        {
          id: 'revelation',
          title: 'A Revelação de João',
          previewImage: '/images/revelation/preview-throne.jpg' // Substituir pela imagem de preview
        },
        // Aqui você pode adicionar mais visões conforme for expandindo o conteúdo
      ]
    }
  },
  computed: {
    getSelectedVisionData() {
      if (this.selectedVisionId === 'revelation') {
        return revelationVisions
      }
      return null
    },

    // Extrai o número do capítulo da rota, se houver
    chapterFromRoute() {
      const chapterParam = this.$route.params.vision
      if (chapterParam && !isNaN(parseInt(chapterParam))) {
        return parseInt(chapterParam)
      }
      return null
    }
  },
  methods: {
    switchViewMode(mode) {
      this.viewMode = mode
      if (mode === 'visions') {
        this.selectedVisionId = null
      }
    },

    selectVision(visionId) {
      this.selectedVisionId = visionId
      if (this.viewMode === 'chapters') {
        this.viewMode = 'visions'
      }
      window.scrollTo(0, 0) // Volta para o topo da página
    },

    returnToIndex() {
      this.selectedVisionId = null
    },

    createStars() {
      const starsContainer = document.querySelector('.stars-container')
      if (!starsContainer) return

      const starCount = 100

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.classList.add('star')

        // Posicionar aleatoriamente
        const x = Math.random() * 100
        const y = Math.random() * 100

        // Tamanho aleatório
        const size = Math.random() * 2 + 1

        // Tempo de animação aleatório
        const duration = Math.random() * 3 + 2

        star.style.left = `${x}%`
        star.style.top = `${y}%`
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.animationDuration = `${duration}s`

        starsContainer.appendChild(star)
      }
    }
  },
  mounted() {
    this.createStars()

    // Verificar se há um parâmetro na URL para abrir uma visão específica
    const visionParam = this.$route.params.vision

    // Se o parâmetro é um número, provavelmente é um capítulo
    if (visionParam && !isNaN(parseInt(visionParam))) {
      this.viewMode = 'chapters'
    }
    // Se é um ID de visão
    else if (visionParam) {
      this.viewMode = 'visions'
      this.selectVision(visionParam)
    }
  }
}
</script>

<style scoped>
.revelation-view {
  position: relative;
  min-height: 100vh;
}

.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.view-mode-nav {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  padding: var(--space-md) 0;
}

.mode-button {
  background-color: var(--color-surface);
  color: var(--color-text);
  padding: var(--space-sm) var(--space-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  font-family: var(--font-family-heading);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.mode-button.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary-light);
  box-shadow: 0 0 10px rgba(75, 46, 131, 0.5);
}

.mode-button:hover:not(.active) {
  background-color: rgba(75, 46, 131, 0.3);
}

.visions-index {
  padding: var(--space-lg) 0;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: var(--space-md);
  color: var(--color-secondary);
  text-shadow: 0 0 20px rgba(196, 180, 84, 0.5);
}

.subtitle {
  text-align: center;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xl);
  font-size: 1.2rem;
  font-style: italic;
}

.intro-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-xxl);
}

.intro-text {
  line-height: 1.8;
}

.intro-text p {
  margin-bottom: var(--space-lg);
}

.visions-selection {
  background-color: var(--color-surface);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.visions-selection h3 {
  text-align: center;
  margin-bottom: var(--space-lg);
  color: var(--color-secondary);
  font-size: 1.4rem;
  letter-spacing: 0.05em;
}

.visions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
}

.vision-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  box-shadow: var(--shadow-md);
}

.vision-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform var(--transition-normal);
}

.vision-card:hover .card-image img {
  transform: scale(1.05);
}

.vision-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-md);
  background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5) 70%, transparent);
  transition: all var(--transition-normal);
}

.vision-name {
  color: var(--color-secondary);
  font-family: var(--font-family-heading);
  font-size: 1.2rem;
  font-weight: 600;
}

/* Visão imersiva */
.vision-experience {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-md);
}

.navigation-controls {
  margin: var(--space-lg) 0;
  display: flex;
  justify-content: center;
}

.back-button {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  font-family: var(--font-family-heading);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.back-button:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
}

.back-icon {
  font-size: 1.2rem;
}

/* Responsividade */
@media (max-width: 1024px) {
  .intro-content {
    grid-template-columns: 1fr;
  }

  .visions-selection {
    margin-top: var(--space-lg);
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  .visions-grid {
    grid-template-columns: 1fr;
  }

  .card-image {
    height: 180px;
  }

  .view-mode-nav {
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-md);
  }
}
</style>
