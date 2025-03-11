<template>
  <div class="apocalypse-chapter1">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <!-- Cabeçalho do capítulo -->
    <div class="chapter-header">
      <h1>Apocalipse: Capítulo 1</h1>
      <h2 class="chapter-subtitle">A Visão do Filho do Homem</h2>

      <!-- Navegação entre blocos (quando não estiver em um bloco específico) -->
      <div v-if="!activeBlock" class="blocks-navigation">
        <p class="blocks-instruction">Escolha uma parte da experiência para começar:</p>
        <div class="blocks-grid">
          <div
            v-for="block in blocks"
            :key="block.id"
            class="block-card"
            :class="{ 'unlocked': block.unlocked, 'completed': completedBlocks.includes(block.id) }"
            @click="block.unlocked && selectBlock(block.id)"
          >
            <div class="block-icon">{{ block.icon }}</div>
            <h3 class="block-title">{{ block.title }}</h3>
            <p class="block-description">{{ block.description }}</p>
            <div class="block-status">
              <span v-if="completedBlocks.includes(block.id)" class="status-completed">Concluído</span>
              <span v-else-if="block.unlocked" class="status-available">Disponível</span>
              <span v-else class="status-locked">Bloqueado</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo do bloco ativo -->
    <div v-if="activeBlock" class="active-block-container">
      <!-- Bloco 1: Contexto Histórico - "Nos Passos de João" -->
      <ApocalypseChapter1Block1
        v-if="activeBlock === 1"
        @complete="completeBlock(1)"
      />

      <!-- Bloco 2: A Experiência da Visão - "Através dos Olhos de João" -->
      <ApocalypseChapter1Block2
        v-if="activeBlock === 2"
        @complete="completeBlock(2)"
      />

      <!-- Bloco 3: Desvendando os Símbolos -->
      <ApocalypseChapter1Block3
        v-if="activeBlock === 3"
        @complete="completeBlock(3)"
      />

      <!-- Bloco 4: Ecos Através do Tempo -->
      <ApocalypseChapter1Block4
        v-if="activeBlock === 4"
        @complete="completeBlock(4)"
      />

      <!-- Blocos futuros serão adicionados aqui -->
      <!-- Placeholder para os próximos blocos (a serem implementados) -->
      <div v-else class="block-placeholder">
        <h3>{{ getActiveBlock.title }}</h3>
        <p>Este bloco da experiência está em desenvolvimento e estará disponível em breve.</p>
        <div class="block-preview">
          <p>{{ getActiveBlock.preview }}</p>
        </div>
        <button class="btn" @click="returnToBlocks">Voltar para seleção</button>
      </div>

      <!-- Botão para voltar à seleção de blocos -->
      <div class="block-navigation">
        <button class="nav-btn back-btn" @click="returnToBlocks">
          <span class="nav-icon">←</span> Voltar para seleção
        </button>
      </div>
    </div>

    <!-- Rodapé com informações do capítulo -->
    <div class="chapter-footer">
      <div class="scripture-reference">
        <blockquote>
          "Eu fui arrebatado em espírito no dia do Senhor, e ouvi detrás de mim uma grande voz, como de trombeta, que dizia: Eu sou o Alfa e o Ômega, o primeiro e o derradeiro..."
          <cite>Apocalipse 1:10-11</cite>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import ApocalypseChapter1Block1 from './ApocalypseChapter1Block1.vue'
import ApocalypseChapter1Block2 from './ApocalypseChapter1Block2.vue'
import ApocalypseChapter1Block3 from './ApocalypseChapter1Block3.vue'
import ApocalypseChapter1Block4 from './ApocalypseChapter1Block4.vue'

export default {
  name: 'ApocalypseChapter1',
  components: {
    ApocalypseChapter1Block1,
    ApocalypseChapter1Block2,
    ApocalypseChapter1Block3,
    ApocalypseChapter1Block4
  },
  data() {
    return {
      activeBlock: null,
      completedBlocks: [],
      activeBlockCompleted: false,
      blocks: [
        {
          id: 1,
          title: "Nos Passos de João",
          description: "Conheça o contexto histórico e pessoal de João quando recebeu a revelação em Patmos.",
          icon: "📜",
          unlocked: true,
          preview: "Uma jornada pela história do primeiro século, onde você conhecerá as circunstâncias de João quando recebeu esta incrível revelação."
        },
        {
          id: 2,
          title: "Através dos Olhos de João",
          description: "Experimente a visão do Filho do Homem como se você fosse João em Patmos.",
          icon: "👁️",
          unlocked: true, // Alterado para true para desbloquear este bloco
          preview: "Uma experiência imersiva onde você verá o Cristo glorificado entre os sete candeeiros de ouro, experimentando a mesma emoção e temor que João sentiu."
        },
        {
          id: 3,
          title: "Desvendando os Símbolos",
          description: "Descubra o significado dos símbolos e imagens da visão do Filho do Homem.",
          icon: "🔍",
          unlocked: true, // Alterado para true para desbloquear este bloco
          preview: "Uma exploração detalhada dos símbolos presentes na visão, revelando seu significado teológico e profundo propósito para as igrejas de ontem e hoje."
        },
        {
          id: 4,
          title: "Ecos Através do Tempo",
          description: "Veja como a visão de João se conecta com outras revelações através da história.",
          icon: "⏳",
          unlocked: true, // Alterado para true para desbloquear este bloco
          preview: "Uma análise das conexões entre a visão de João e outras visões proféticas, como a de Isaías no templo e a de Joseph Smith no Templo de Kirtland."
        }
      ]
    }
  },
  computed: {
    getActiveBlock() {
      if (!this.activeBlock) return {}
      return this.blocks.find(block => block.id === this.activeBlock) || {}
    }
  },
  methods: {
    selectBlock(blockId) {
      this.activeBlock = blockId
      // Rolar para o topo quando selecionar um bloco
      window.scrollTo(0, 0)
    },

    completeBlock(blockId) {
      console.log(`Bloco ${blockId} concluído`)

      // Adicionar à lista de blocos concluídos se ainda não estiver
      if (!this.completedBlocks.includes(blockId)) {
        this.completedBlocks.push(blockId)
      }

      // Desbloquear o próximo bloco se existir
      const nextBlockId = blockId + 1
      const nextBlock = this.blocks.find(block => block.id === nextBlockId)
      if (nextBlock) {
        nextBlock.unlocked = true
      }

      // Voltar para a seleção de blocos
      this.activeBlock = null

      // Rolar para o topo quando completar um bloco
      window.scrollTo(0, 0)
    },

    returnToBlocks() {
      this.activeBlock = null
      // Rolar para o topo quando voltar para seleção
      window.scrollTo(0, 0)
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
    },

    // Carregar o estado dos blocos completados do armazenamento local, se disponível
    loadCompletedBlocks() {
      try {
        const saved = localStorage.getItem('apocalypse-chapter1-completed')
        if (saved) {
          this.completedBlocks = JSON.parse(saved)

          // Desbloquear blocos subsequentes aos completados
          this.completedBlocks.forEach(blockId => {
            const nextBlockId = blockId + 1
            const nextBlock = this.blocks.find(block => block.id === nextBlockId)
            if (nextBlock) {
              nextBlock.unlocked = true
            }
          })
        }
      } catch (error) {
        console.error('Erro ao carregar blocos completados:', error)
      }
    },

    // Salvar o estado dos blocos completados no armazenamento local
    saveCompletedBlocks() {
      try {
        localStorage.setItem('apocalypse-chapter1-completed', JSON.stringify(this.completedBlocks))
      } catch (error) {
        console.error('Erro ao salvar blocos completados:', error)
      }
    }
  },
  watch: {
    // Salvar os blocos completados sempre que houver mudanças
    completedBlocks: {
      handler() {
        this.saveCompletedBlocks()
      },
      deep: true
    }
  },
  mounted() {
    this.createStars()

    // Carregar estado salvo
    this.loadCompletedBlocks()

    // Garantir que todos os blocos estejam desbloqueados independentemente do estado salvo
    this.blocks.forEach(block => {
      block.unlocked = true;
    });
  }
}
</script>
<style scoped>
.apocalypse-chapter1 {
  position: relative;
  min-height: 100vh;
  padding: 2rem 1rem;
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

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: twinkle var(--transition-slow) infinite alternate;
}

@keyframes twinkle {
  from { opacity: 0.2; }
  to { opacity: 0.8; }
}

.chapter-header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 3rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
}

.chapter-subtitle {
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: 2rem;
  font-weight: normal;
  font-family: var(--font-family-quote);
  font-style: italic;
}

.blocks-instruction {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.blocks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.block-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.7;
  position: relative;
  overflow: hidden;
}

.block-card.unlocked {
  opacity: 1;
  cursor: pointer;
  box-shadow: var(--shadow-md);
}

.block-card.unlocked:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  background-color: rgba(75, 46, 131, 0.3);
}

.block-card.completed {
  border-color: var(--color-secondary);
}

.block-card.completed::after {
  content: "✓";
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--color-secondary);
  color: var(--color-background);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.block-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.block-title {
  color: var(--color-secondary);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.block-description {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.block-status {
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-completed {
  color: var(--color-secondary);
}

.status-available {
  color: var(--color-text);
}

.status-locked {
  color: var(--color-text-muted);
}

.active-block-container {
  position: relative;
  margin-bottom: 3rem;
}

.block-placeholder {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.block-placeholder h3 {
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.block-preview {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  font-style: italic;
  color: var(--color-text-muted);
}

.block-navigation {
  margin-top: 2rem;
  text-align: center;
}

.nav-btn {
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  padding: 0.7rem 1.5rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-family-heading);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-btn:hover {
  background-color: rgba(75, 46, 131, 0.7);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1.2rem;
}

.chapter-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.scripture-reference {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.scripture-reference blockquote {
  font-family: var(--font-family-quote);
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.7;
  color: var(--color-text);
  position: relative;
}

.scripture-reference blockquote::before {
  content: '"';
  font-size: 3rem;
  color: var(--color-secondary);
  opacity: 0.5;
  position: absolute;
  top: -20px;
  left: -15px;
}

.scripture-reference cite {
  display: block;
  margin-top: 1rem;
  color: var(--color-secondary);
  font-style: normal;
  font-weight: 500;
}

@media (max-width: 768px) {
  .apocalypse-chapter1 {
    padding: 1rem 0.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .chapter-subtitle {
    font-size: 1.3rem;
  }

  .blocks-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .block-placeholder {
    padding: 2rem 1rem;
  }

  .scripture-reference blockquote {
    font-size: 1rem;
  }
}
</style>
