<template>
  <div class="revelation-chapters">
    <div class="chapters-header">
      <h2>Apocalipse</h2>
      <p class="subtitle">Selecione um capítulo para estudo</p>
    </div>

    <div class="chapters-grid">
      <div
        v-for="chapter in 22"
        :key="chapter"
        class="chapter-card"
        :class="{ 'available': isChapterAvailable(chapter) }"
        @click="selectChapter(chapter)"
      >
        <div class="chapter-number">{{ chapter }}</div>
        <div class="chapter-info">
          <span v-if="isChapterAvailable(chapter)" class="available-tag">Disponível</span>
          <span v-else class="coming-soon-tag">Em breve</span>
        </div>
      </div>
    </div>

    <div v-if="selectedChapter && chapterContent" class="chapter-view">
      <div class="chapter-navigation">
        <button
          v-if="selectedChapter > 1"
          class="nav-button prev-btn"
          @click="selectChapter(selectedChapter - 1)"
        >
          <span class="nav-arrow">←</span> Capítulo {{ selectedChapter - 1 }}
        </button>
        <span class="current-chapter">Capítulo {{ selectedChapter }}</span>
        <button
          v-if="selectedChapter < 22"
          class="nav-button next-btn"
          @click="selectChapter(selectedChapter + 1)"
        >
          Capítulo {{ selectedChapter + 1 }} <span class="nav-arrow">→</span>
        </button>
      </div>

      <div class="chapter-content">
        <div class="chapter-title">
          <h3>{{ chapterContent.title }}</h3>
        </div>

        <ScriptureQuote :reference="`Apocalipse ${selectedChapter}`">
          {{ chapterContent.excerpt }}
        </ScriptureQuote>

        <div class="chapter-summary">
          <h4>Resumo do Capítulo</h4>
          <p>{{ chapterContent.summary }}</p>
        </div>

        <div class="chapter-exploration">
          <h4>Exploração Visual</h4>
          <p>{{ chapterContent.exploration }}</p>

          <div v-if="chapterContent.visionKey" class="vision-link">
            <button @click="exploreVision(chapterContent.visionKey)" class="btn btn-secondary">
              Explorar Visão Imersiva
            </button>
          </div>
          <div v-else class="vision-placeholder">
            <div class="lock-icon">🔒</div>
            <p>A experiência imersiva para este capítulo estará disponível em breve.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScriptureQuote from '@/components/common/ScriptureQuote.vue'

export default {
  name: 'RevelationChapters',
  components: {
    ScriptureQuote
  },
  props: {
    initialChapter: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      selectedChapter: null,
      availableChapters: [1, 4, 5, 6], // Capítulos que têm conteúdo na aplicação
      chapterData: {
        1: {
          title: "A Visão do Filho do Homem",
          excerpt: "Eu fui arrebatado em espírito no dia do Senhor, e ouvi detrás de mim uma grande voz, como de trombeta, que dizia: Eu sou o Alfa e o Ômega, o primeiro e o derradeiro...",
          summary: "João, exilado na ilha de Patmos, recebe uma visão do Cristo glorificado. Jesus aparece em esplendor divino, andando entre sete candeeiros de ouro que representam as sete igrejas da Ásia. A aparência de Cristo é majestosa, com cabelos brancos, olhos como chama de fogo, pés como bronze polido, e uma voz como o som de muitas águas.",
          exploration: "Neste capítulo, você pode explorar a visão inicial de João, onde Cristo se revela em Sua glória divina. A experiência imersiva permite visualizar os detalhes do Cristo glorificado, como descrito nas escrituras.",
          visionKey: null
        },
        4: {
          title: "O Trono Celestial",
          excerpt: "Depois destas coisas, olhei, e eis que estava uma porta aberta no céu. E a primeira voz que ouvi era como de uma trombeta que falava comigo, dizendo: Sobe aqui, e mostrar-te-ei as coisas que depois destas devem acontecer.",
          summary: "João é convidado a subir ao céu através de uma porta aberta. Lá ele contempla o trono de Deus, rodeado por 24 anciãos vestidos de branco e quatro seres viventes cheios de olhos. Um mar de vidro semelhante ao cristal se estende diante do trono, e há constante adoração a Deus.",
          exploration: "Explore a sala do trono celestial, com seus seres viventes, anciãos e a majestade de Deus entronizado. Este capítulo está disponível na experiência imersiva.",
          visionKey: "revelation" // Conecta à visão imersiva
        },
        5: {
          title: "O Cordeiro e o Livro Selado",
          excerpt: "E vi na destra do que estava assentado sobre o trono um livro escrito por dentro e por fora, selado com sete selos. E vi um anjo forte, bradando com grande voz: Quem é digno de abrir o livro e de desatar os seus selos?",
          summary: "Um livro selado com sete selos aparece na mão direita de Deus. Ninguém é considerado digno de abrir os selos, até que o Cordeiro que foi morto - Jesus Cristo - aparece e toma o livro. A cena culmina em adoração universal ao Cordeiro.",
          exploration: "Visualize o momento dramático em que o Cordeiro que foi morto é o único considerado digno de abrir o livro selado dos julgamentos divinos.",
          visionKey: "revelation" // Conecta à visão imersiva
        },
        6: {
          title: "Os Seis Primeiros Selos",
          excerpt: "E, havendo o Cordeiro aberto um dos selos, olhei, e ouvi um dos quatro animais, que dizia como com voz de trovão: Vem, e vê. E olhei, e eis um cavalo branco; e o que estava assentado sobre ele tinha um arco; e foi-lhe dada uma coroa, e saiu vitorioso, e para vencer.",
          summary: "O Cordeiro começa a abrir os selos do livro. Os quatro primeiros selos liberam os quatro cavaleiros do Apocalipse: o cavaleiro branco (conquista), o cavaleiro vermelho (guerra), o cavaleiro preto (fome) e o cavaleiro amarelo (morte). O quinto selo revela as almas dos mártires, e o sexto selo desencadeia cataclismos cósmicos.",
          exploration: "Esta experiência imersiva permite visualizar os dramáticos quatro cavaleiros do Apocalipse e os eventos associados à abertura dos seis primeiros selos.",
          visionKey: "revelation" // Conecta à visão imersiva
        }
      }
    }
  },
  computed: {
    chapterContent() {
      return this.selectedChapter ? this.chapterData[this.selectedChapter] || null : null
    }
  },
  methods: {
    isChapterAvailable(chapter) {
      return this.availableChapters.includes(chapter)
    },

    selectChapter(chapter) {
      if (this.isChapterAvailable(chapter)) {
        this.selectedChapter = chapter
        // Scroll para o topo da visão do capítulo
        this.$nextTick(() => {
          const chapterView = document.querySelector('.chapter-view')
          if (chapterView) {
            chapterView.scrollIntoView({ behavior: 'smooth' })
          }
        })
      } else {
        // Opcional: mostrar feedback que esse capítulo ainda não está disponível
        this.selectedChapter = null
      }
    },

    exploreVision(visionKey) {
      // Emitir evento para o componente pai lidar com a navegação
      this.$emit('explore-vision', visionKey)
    }
  },
  mounted() {
    // Se um capítulo inicial foi fornecido, selecione-o
    if (this.initialChapter && this.isChapterAvailable(this.initialChapter)) {
      this.selectChapter(this.initialChapter)
    }
  }
}
</script>

<style scoped>
.revelation-chapters {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-md);
}

.chapters-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.subtitle {
  color: var(--color-text-muted);
  font-style: italic;
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.chapter-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-md);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.chapter-card.available {
  border-color: rgba(196, 180, 84, 0.3);
  box-shadow: 0 0 10px rgba(196, 180, 84, 0.2);
}

.chapter-card.available:hover {
  transform: translateY(-5px);
  background-color: rgba(75, 46, 131, 0.3);
}

.chapter-card:not(.available):hover::after {
  content: "Em desenvolvimento";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.chapter-number {
  font-family: var(--font-family-heading);
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.available .chapter-number {
  color: var(--color-secondary);
}

.chapter-info {
  font-size: 0.8rem;
}

.available-tag {
  color: var(--color-secondary);
}

.coming-soon-tag {
  color: var(--color-text-muted);
  font-style: italic;
}

.chapter-view {
  margin-top: var(--space-xl);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  animation: fadeIn 0.5s ease-in-out;
}

.chapter-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  background-color: rgba(75, 46, 131, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.current-chapter {
  font-family: var(--font-family-heading);
  color: var(--color-secondary);
  font-size: 1.2rem;
}

.nav-button {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-arrow {
  font-size: 1.2rem;
}

.chapter-content {
  padding: var(--space-lg);
}

.chapter-title {
  margin-bottom: var(--space-lg);
  text-align: center;
}

.chapter-title h3 {
  color: var(--color-secondary);
  font-size: 1.8rem;
}

.chapter-summary,
.chapter-exploration {
  margin-top: var(--space-xl);
}

.chapter-summary h4,
.chapter-exploration h4 {
  color: var(--color-secondary-light);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid rgba(196, 180, 84, 0.3);
}

.chapter-summary p,
.chapter-exploration p {
  line-height: 1.8;
}

.vision-link {
  margin-top: var(--space-lg);
  text-align: center;
}

.vision-placeholder {
  margin-top: var(--space-lg);
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
}

.lock-icon {
  font-size: 2rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-sm);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  .chapters-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }

  .chapter-number {
    font-size: 1.5rem;
  }

  .chapter-navigation {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .nav-button {
    width: 100%;
    justify-content: center;
  }
}
</style>

