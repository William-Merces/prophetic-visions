<template>
  <div class="apocalypse-chapter1">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <!-- Cabeçalho do capítulo -->
    <div class="chapter-header">
      <h2 class="chapter-title">A Visão do Filho do Homem</h2>
      <p class="chapter-description">
        Explore a primeira visão do Apocalipse, onde João vê Cristo glorificado
        caminhando entre sete candeeiros de ouro.
      </p>
    </div>

    <!-- Navegação entre blocos (quando não estiver em um bloco específico) -->
    <div v-if="!activeBlock" class="blocks-navigation">
      <p class="blocks-instruction">Escolha uma parte da experiência:</p>
      <div class="blocks-grid">
        <div
          v-for="block in blocks"
          :key="block.id"
          class="block-card"
          :class="{ 'completed': completedBlocks.includes(block.id) }"
          @click="selectBlock(block.id)"
        >
          <div class="block-icon">{{ block.icon }}</div>
          <h3 class="block-title">{{ block.title }}</h3>
          <p class="block-description">{{ block.description }}</p>
          <div class="block-status">
            <span v-if="completedBlocks.includes(block.id)" class="status-completed">
              <span class="check-icon">✓</span> Concluído
            </span>
            <span v-else class="status-available">Clique para iniciar</span>
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

      <!-- Botão para voltar à seleção de blocos -->
      <div class="block-navigation">
        <button class="nav-btn back-btn" @click="returnToBlocks">
          <span class="nav-icon">←</span> Voltar para seleção
        </button>
      </div>
    </div>

    <!-- Botão para completar capítulo (ativo quando todos os blocos foram completados) -->
    <div class="chapter-completion" v-if="allBlocksCompleted && !activeBlock">
      <p class="completion-message">Parabéns! Você concluiu todos os blocos deste capítulo.</p>
      <button class="btn btn-complete" @click="completeChapter">
        Marcar Capítulo como Concluído
      </button>
    </div>

    <!-- Rodapé com informações do capítulo -->
    <div class="chapter-footer" v-if="!activeBlock">
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
      blocks: [
        {
          id: 1,
          title: "Nos Passos de João",
          description: "Conheça o contexto histórico e pessoal de João quando recebeu a revelação em Patmos.",
          icon: "📜"
        },
        {
          id: 2,
          title: "Através dos Olhos de João",
          description: "Experimente a visão do Filho do Homem como se você fosse João em Patmos.",
          icon: "👁️"
        },
        {
          id: 3,
          title: "Desvendando os Símbolos",
          description: "Descubra o significado dos símbolos e imagens da visão do Filho do Homem.",
          icon: "🔍"
        },
        {
          id: 4,
          title: "Ecos Através do Tempo",
          description: "Veja como a visão de João se conecta com outras revelações através da história.",
          icon: "⏳"
        }
      ]
    }
  },
  computed: {
    allBlocksCompleted() {
      return this.completedBlocks.length === this.blocks.length;
    }
  },
  methods: {
    selectBlock(blockId) {
      this.activeBlock = blockId;

      // Rolar para o topo quando selecionar um bloco
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    completeBlock(blockId) {
      // Adicionar à lista de blocos concluídos se ainda não estiver
      if (!this.completedBlocks.includes(blockId)) {
        this.completedBlocks.push(blockId);

        // Salvar o progresso
        this.saveProgress();
      }

      // Voltar para a seleção de blocos
      this.returnToBlocks();
    },

    returnToBlocks() {
      this.activeBlock = null;

      // Rolar para o topo quando voltar para seleção
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    completeChapter() {
      // Emitir evento para o componente pai saber que o capítulo foi concluído
      this.$emit('complete', 1);
    },

    createStars() {
      const starsContainer = document.querySelector('.stars-container');
      if (!starsContainer) return;

      const starCount = 100;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Posicionar aleatoriamente
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamanho aleatório
        const size = Math.random() * 2 + 1;

        // Tempo de animação aleatório
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;

        starsContainer.appendChild(star);
      }
    },

    // Funções para salvar e carregar progresso
    saveProgress() {
      try {
        localStorage.setItem('apocalypse-chapter1-completed', JSON.stringify(this.completedBlocks));
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
      }
    },

    loadProgress() {
      try {
        const saved = localStorage.getItem('apocalypse-chapter1-completed');
        if (saved) {
          this.completedBlocks = JSON.parse(saved);
        }
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    }
  },
  mounted() {
    this.createStars();
    this.loadProgress();
  }
}
</script>

<style scoped>
.apocalypse-chapter1 {
  position: relative;
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
  margin-bottom: var(--space-xl);
  animation: fadeIn 1s ease;
}

.chapter-title {
  font-size: 2.5rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
  text-shadow: 0 0 10px rgba(196, 180, 84, 0.5);
}

.chapter-description {
  max-width: 700px;
  margin: 0 auto;
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
}

.blocks-instruction {
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
  text-align: center;
  font-size: 1.1rem;
}

.blocks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
  animation: fadeIn 1s ease;
}

.block-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  text-align: center;
  transition: all var(--transition-normal);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.block-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  background-color: rgba(75, 46, 131, 0.3);
}

.block-card.completed {
  border-color: var(--color-secondary);
  background-color: rgba(196, 180, 84, 0.1);
}

.block-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

.block-card.completed .block-icon {
  color: var(--color-secondary);
}

.block-title {
  color: var(--color-secondary-light);
  margin-bottom: var(--space-md);
  font-size: 1.3rem;
}

.block-description {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin-bottom: var(--space-lg);
  line-height: 1.5;
  flex-grow: 1;
}

.block-status {
  font-size: 0.85rem;
  font-weight: 500;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
}

.status-completed {
  color: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
}

.check-icon {
  background-color: var(--color-secondary);
  color: var(--color-background);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.status-available {
  color: var(--color-text);
  opacity: 0.8;
}

.active-block-container {
  position: relative;
  margin-bottom: var(--space-xl);
  animation: fadeIn 0.5s ease;
}

.block-navigation {
  margin-top: var(--space-xl);
  text-align: center;
}

.nav-btn {
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  padding: var(--space-xs) var(--space-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-family-heading);
  font-size: 0.95rem;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.nav-btn:hover {
  background-color: rgba(75, 46, 131, 0.7);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1.2rem;
}

.chapter-completion {
  text-align: center;
  margin: var(--space-xl) 0;
  padding: var(--space-lg);
  background-color: rgba(196, 180, 84, 0.1);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-secondary);
  animation: pulseGlow 2s infinite alternate;
}

@keyframes pulseGlow {
  from { box-shadow: 0 0 5px rgba(196, 180, 84, 0.3); }
  to { box-shadow: 0 0 15px rgba(196, 180, 84, 0.5); }
}

.completion-message {
  margin-bottom: var(--space-md);
  color: var(--color-secondary);
  font-size: 1.1rem;
}

.btn-complete {
  background-color: var(--color-secondary);
  color: var(--color-background);
  font-weight: 600;
}

.btn-complete:hover {
  background-color: var(--color-secondary-light);
}

.chapter-footer {
  margin-top: var(--space-xxl);
  padding-top: var(--space-lg);
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
  margin-top: var(--space-md);
  color: var(--color-secondary);
  font-style: normal;
  font-weight: 500;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsividade */
@media (max-width: 768px) {
  .chapter-title {
    font-size: 1.8rem;
  }

  .chapter-description {
    font-size: 1rem;
  }

  .blocks-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .block-card {
    padding: var(--space-md);
  }

  .scripture-reference blockquote {
    font-size: 1rem;
  }

  .nav-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
