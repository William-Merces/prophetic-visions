<template>
  <div class="apocalypse-chapter1">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <!-- Tutorial overlay quando necessário -->
    <div v-if="showTutorial" class="tutorial-overlay" @click="dismissTutorial">
      <div class="tutorial-content" @click.stop>
        <h3>Bem-vindo à experiência imersiva do Apocalipse</h3>
        <p>Prepare-se para mergulhar na visão de João e explorar os mistérios revelados.</p>

        <div class="tutorial-steps">
          <div class="tutorial-step">
            <div class="step-number">1</div>
            <div class="step-info">
              <h4>Introdução</h4>
              <p>Nos Passos de João: Conheça o contexto histórico e pessoal de João quando recebeu a revelação em Patmos.</p>
            </div>
          </div>

          <div class="tutorial-step">
            <div class="step-number">2</div>
            <div class="step-info">
              <h4>Narração</h4>
              <p>Através dos Olhos de João: Experimente a visão do Filho do Homem como se você fosse João em Patmos.</p>
            </div>
          </div>

          <div class="tutorial-step">
            <div class="step-number">3</div>
            <div class="step-info">
              <h4>Interação</h4>
              <p>Desvendando os Símbolos: Descubra o significado dos símbolos e imagens da visão do Filho do Homem.</p>
            </div>
          </div>

          <div class="tutorial-step">
            <div class="step-number">4</div>
            <div class="step-info">
              <h4>Reflexão</h4>
              <p>Ecos Através do Tempo: Veja como a visão de João se conecta com outras revelações através da história.</p>
            </div>
          </div>
        </div>

        <button class="btn btn-secondary tutorial-dismiss" @click="dismissTutorial">
          Iniciar Jornada
        </button>
      </div>
    </div>

    <!-- Cabeçalho do capítulo (agora clicável para iniciar experiência) -->
    <div v-if="!activeBlock && !showIntroduction" class="chapter-header" @click="showIntroScreen" role="button" tabindex="0">
      <h2 class="chapter-title">A Visão do Filho do Homem</h2>
      <p class="chapter-description">
        Explore a primeira visão do Apocalipse, onde João vê Cristo glorificado
        caminhando entre sete candeeiros de ouro.
      </p>
      <div class="chapter-action-hint">
        <span class="tap-icon">👆</span> Toque para iniciar a experiência
      </div>
    </div>

    <!-- Navegação entre blocos (quando não estiver em um bloco específico) -->
    <div v-if="!activeBlock && !showIntroduction" class="blocks-navigation">
      <p class="blocks-instruction">Escolha uma parte da experiência:</p>
      <div class="blocks-grid">
        <div
          v-for="block in blocks"
          :key="block.id"
          class="block-card"
          :class="{
            'completed': completedBlocks.includes(block.id),
            'pulse-attention': needsAttention && !completedBlocks.includes(block.id),
            'highlight-recent': lastCompletedBlock === block.id
          }"
          @click="selectBlock(block.id)"
        >
          <div class="block-content">
            <div class="block-icon">{{ block.icon }}</div>
            <h3 class="block-title">{{ block.title }}</h3>
            <p class="block-description">{{ block.description }}</p>
            <div class="block-status">
              <span v-if="completedBlocks.includes(block.id)" class="status-completed">
                <span class="check-icon">✓</span> Concluído
              </span>
              <span v-else class="status-available">
                <span class="tap-icon">👆</span> Toque para iniciar
              </span>
            </div>
            <div class="block-action-hint">
              <button
                class="start-btn"
                :class="{'completed-btn': completedBlocks.includes(block.id)}"
              >
                {{ completedBlocks.includes(block.id) ? 'Revisitar' : 'Iniciar Experiência' }}
              </button>
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
        @complete="completeBlock(1, $event)"
        @exit-fullscreen="returnToBlocks"
      />

      <!-- Bloco 2: A Experiência da Visão - "Através dos Olhos de João" -->
      <ApocalypseChapter1Block2
        v-if="activeBlock === 2"
        @complete="completeBlock(2, $event)"
        @exit-fullscreen="returnToBlocks"
      />

      <!-- Bloco 3: Desvendando os Símbolos -->
      <ApocalypseChapter1Block3
        v-if="activeBlock === 3"
        @complete="completeBlock(3, $event)"
        @exit-fullscreen="returnToBlocks"
      />

      <!-- Bloco 4: Ecos Através do Tempo -->
      <ApocalypseChapter1Block4
        v-if="activeBlock === 4"
        @complete="completeBlock(4, $event)"
        @exit-fullscreen="returnToBlocks"
      />

      <!-- Botão para voltar à seleção de blocos (fixo no topo) -->
      <div class="block-navigation fixed">
        <button class="nav-btn back-btn" @click="returnToBlocks">
          <span class="nav-icon">←</span> Voltar para seleção
        </button>
      </div>
    </div>

    <!-- Botão para completar capítulo (ativo quando todos os blocos foram completados) -->
    <div class="chapter-completion" v-if="allBlocksCompleted && !activeBlock && !showIntroduction">
      <p class="completion-message">Parabéns! Você concluiu todos os blocos deste capítulo.</p>
      <button class="btn btn-complete" @click="completeChapter">
        Marcar Capítulo como Concluído
      </button>
    </div>

    <!-- Rodapé com informações do capítulo -->
    <div class="chapter-footer" v-if="!activeBlock && !showIntroduction">
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
      showTutorial: false,
      showIntroduction: false,
      needsAttention: false,
      tutorialTimeout: null,
      attentionInterval: null,
      lastCompletedBlock: null,
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
    showIntroScreen() {
      // Mostrar a tela de introdução quando o usuário clica em "Toque para iniciar"
      this.showTutorial = true;

      // Garantir que o scroll esteja disponível
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';

      // Salvar que a introdução foi mostrada
      try {
        localStorage.setItem('apocalypse-intro-seen', 'true');
      } catch (error) {
        console.error('Erro ao salvar estado da introdução:', error);
      }
    },

    selectBlock(blockId) {
      this.activeBlock = blockId;
      this.dismissTutorial();
      this.showIntroduction = false;

      // Adicionar uma classe ao body para impedir rolagem enquanto estiver em um bloco
      document.body.classList.add('immersive-mode');

      // Rolar para o topo quando selecionar um bloco
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Parar animação de atenção
      this.stopAttentionAnimation();
    },

    completeBlock(blockId, action = null) {
      // Adicionar à lista de blocos concluídos se ainda não estiver
      if (!this.completedBlocks.includes(blockId)) {
        this.completedBlocks.push(blockId);
        this.lastCompletedBlock = blockId;

        // Salvar o progresso
        this.saveProgress();
      }

      // Emitir evento para o componente pai
      this.$emit('return-to-selection', blockId);

      // Se a ação for "next", ir para o próximo bloco
      if (action === 'next') {
        const nextBlockId = blockId + 1;
        if (this.blocks.find(block => block.id === nextBlockId)) {
          this.selectBlock(nextBlockId);
          return;
        }
      }

      // Se não houver próximo bloco ou se action não for 'next',
      // voltar para a seleção de blocos
      this.returnToBlocks();
    },

    returnToBlocks() {
      // Remover a classe do body que impede rolagem
      document.body.classList.remove('immersive-mode');

      // Restaurar scroll
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';

      // Redefinir bloco ativo
      this.activeBlock = null;
      this.showIntroduction = false;

      // Rolar para o topo quando voltar para seleção
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Se todos os blocos foram completados, destacar o botão de conclusão
      if (this.allBlocksCompleted) {
        setTimeout(() => {
          const completionBtn = document.querySelector('.btn-complete');
          if (completionBtn) {
            completionBtn.classList.add('highlight-attention');
            setTimeout(() => {
              completionBtn.classList.remove('highlight-attention');
            }, 2000);
          }
        }, 500);
      } else {
        // Se ainda houver blocos não concluídos, iniciar animação de atenção
        this.startAttentionAnimation();
      }
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

    dismissTutorial() {
      this.showTutorial = false;
      clearTimeout(this.tutorialTimeout);

      // Salvar que o tutorial foi visto
      try {
        localStorage.setItem('apocalypse-tutorial-seen', 'true');
      } catch (error) {
        console.error('Erro ao salvar estado do tutorial:', error);
      }

      // Iniciar animação de atenção para os blocos
      this.startAttentionAnimation();
    },

    startAttentionAnimation() {
      // Limpar intervalo existente se houver
      if (this.attentionInterval) {
        clearInterval(this.attentionInterval);
      }

      // Ativar a animação de atenção
      this.needsAttention = true;

      // Alternar a animação periodicamente
      this.attentionInterval = setInterval(() => {
        this.needsAttention = !this.needsAttention;
      }, 3000);

      // Parar a animação após 15 segundos
      setTimeout(() => {
        this.stopAttentionAnimation();
      }, 15000);
    },

    stopAttentionAnimation() {
      if (this.attentionInterval) {
        clearInterval(this.attentionInterval);
        this.attentionInterval = null;
      }
      this.needsAttention = false;
    },

    // Funções para salvar e carregar progresso
    saveProgress() {
      try {
        localStorage.setItem('apocalypse-chapter1-completed', JSON.stringify(this.completedBlocks));
        localStorage.setItem('apocalypse-chapter1-last-completed', this.lastCompletedBlock?.toString() || '');
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
      }
    },

    loadProgress() {
      try {
        // Carregar blocos concluídos
        const saved = localStorage.getItem('apocalypse-chapter1-completed');
        if (saved) {
          this.completedBlocks = JSON.parse(saved);
        }

        // Carregar último bloco concluído
        const lastCompleted = localStorage.getItem('apocalypse-chapter1-last-completed');
        if (lastCompleted) {
          this.lastCompletedBlock = parseInt(lastCompleted) || null;
        }

        // Verificar se o tutorial/introdução já foi visto
        const tutorialSeen = localStorage.getItem('apocalypse-tutorial-seen');
        const introSeen = localStorage.getItem('apocalypse-intro-seen');

        if (tutorialSeen === 'true' && introSeen === 'true') {
          // Se ambos já foram vistos, não mostrar nada
          this.showTutorial = false;
          this.showIntroduction = false;
        } else if (introSeen === 'true') {
          // Se a introdução foi vista mas o tutorial não, mostrar tutorial
          this.showTutorial = true;
          this.showIntroduction = false;

          // Timeout para auto-dismissal do tutorial se o usuário não interagir
          this.tutorialTimeout = setTimeout(() => {
            this.dismissTutorial();
          }, 10000);
        } else if (this.completedBlocks.length > 0) {
          // Não mostrar introdução/tutorial se já há progresso
          this.showTutorial = false;
          this.showIntroduction = false;
        } else {
          // Padrão: não mostrar nada, esperar clique no "Toque para iniciar"
          this.showTutorial = false;
          this.showIntroduction = false;
        }
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    },

    // Adicionar atributos de dados aos blocos para seleção mais fácil
    addBlockDataAttributes() {
      this.$nextTick(() => {
        const blockCards = document.querySelectorAll('.block-card');
        blockCards.forEach((card, index) => {
          const blockId = this.blocks[index].id;
          card.setAttribute('data-id', blockId);
        });
      });
    }
  },
  mounted() {
    this.createStars();
    this.loadProgress();
    this.addBlockDataAttributes();

    // Adicionar atributos especiais para acessibilidade
    this.$nextTick(() => {
      const blockCards = document.querySelectorAll('.block-card');
      blockCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Iniciar ${card.querySelector('.block-title').textContent}`);
      });
    });

    // Garantir que o scroll esteja habilitado
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  },
  beforeUnmount() {
    // Limpar timers
    clearTimeout(this.tutorialTimeout);
    clearInterval(this.attentionInterval);

    // Garantir que a classe immersive-mode seja removida do body
    document.body.classList.remove('immersive-mode');

    // Restaurar scroll
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
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
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(196, 180, 84, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.chapter-header::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(196, 180, 84, 0.3) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.5);
  transition: transform 0.5s ease, opacity 0.5s ease;
  pointer-events: none;
}

.chapter-header:hover {
  background-color: rgba(75, 46, 131, 0.3);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--color-secondary);
}

.chapter-header:hover::after {
  opacity: 0.4;
  transform: scale(1);
}

.chapter-header:active {
  transform: translateY(0);
  transition: transform 0.2s ease;
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
  color: var(--color-text);
  font-size: 1.1rem;
  line-height: 1.6;
}

.chapter-action-hint {
  margin-top: var(--space-md);
  color: var(--color-secondary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  animation: pulseOpacity 2s infinite;
}

@keyframes pulseOpacity {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.blocks-instruction {
  color: var(--color-text);
  margin-bottom: var(--space-lg);
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from { text-shadow: 0 0 2px rgba(196, 180, 84, 0.3); }
  to { text-shadow: 0 0 10px rgba(196, 180, 84, 0.8); }
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
  position: relative;
  overflow: hidden;
}

.block-card::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(196, 180, 84, 0.3) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.5);
  transition: transform 0.5s ease, opacity 0.5s ease;
  pointer-events: none;
}

.block-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  background-color: rgba(75, 46, 131, 0.3);
}

.block-card:hover::after {
  opacity: 0.4;
  transform: scale(1);
}

.block-card:active {
  transform: translateY(0);
  transition: transform 0.2s ease;
}

.block-card.completed {
  border-color: var(--color-secondary);
  background-color: rgba(196, 180, 84, 0.1);
}

.block-card.highlight-completed {
  animation: highlightSuccess 2s ease;
}

.block-card.highlight-recent {
  border: 2px solid var(--color-secondary);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.5);
  animation: pulseRecent 2s infinite alternate;
}

@keyframes pulseRecent {
  from { box-shadow: 0 0 10px rgba(196, 180, 84, 0.3); }
  to { box-shadow: 0 0 20px rgba(196, 180, 84, 0.7); }
}

@keyframes highlightSuccess {
  0%, 100% { box-shadow: var(--shadow-md); }
  50% { box-shadow: 0 0 30px rgba(196, 180, 84, 0.6); }
}

.block-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 1;
}

.block-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-md);
  color: var(--color-text);
  transition: transform 0.3s ease;
}

.block-card:hover .block-icon {
  transform: scale(1.1);
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

.block-card.completed .block-description {
  color: var(--color-text);
}

.block-status {
  font-size: 0.9rem;
  font-weight: 500;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-sm);
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
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
}

.tap-icon {
  animation: tapPulse 1.5s infinite;
  transform-origin: bottom center;
}

@keyframes tapPulse {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.block-action-hint {
  margin-top: var(--space-sm);
}

.start-btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-lg);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  width: 100%;
}

.completed-btn {
  background-color: var(--color-primary);
  border: 1px solid var(--color-secondary);
}

.block-card:hover .start-btn {
  background-color: var(--color-secondary-light);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Animação de atenção para blocos */
.block-card.pulse-attention {
  animation: pulseAttention 2s infinite;
}

@keyframes pulseAttention {
  0%, 100% { transform: translateY(0); box-shadow: var(--shadow-md); }
  50% { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(196, 180, 84, 0.4); }
}

.active-block-container {
  position: relative;
  margin-bottom: var(--space-xl);
  animation: fadeIn 0.5s ease;
  min-height: 100vh;
}

.block-navigation {
  margin-top: var(--space-xl);
  text-align: center;
}

.block-navigation.fixed {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  margin-top: 0;
  width: auto;
}

.nav-btn {
  background-color: rgba(0, 0, 0, 0.8);
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

.nav-btn:active {
  transform: translateY(0);
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
  padding: var(--space-sm) var(--space-xl);
  font-size: 1.1rem;
}

.btn-complete:hover {
  background-color: var(--color-secondary-light);
  transform: translateY(-2px);
}

.btn-complete.highlight-attention {
  animation: highlightAttention 2s ease;
}

@keyframes highlightAttention {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(196, 180, 84, 0.6); }
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

/* Tutorial overlay */
.tutorial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
  animation: fadeIn 0.5s ease;
  backdrop-filter: blur(5px);
}

.tutorial-content {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  max-width: 600px;
  width: 90%;
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-secondary);
  animation: scaleIn 0.5s ease;
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.tutorial-content h3 {
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
  font-size: 1.5rem;
}

.tutorial-steps {
  margin: var(--space-lg) 0;
}

.tutorial-step {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--space-md);
  text-align: left;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  transition: all 0.3s ease;
}

.tutorial-step:hover {
  background-color: rgba(75, 46, 131, 0.2);
  transform: translateY(-3px);
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--color-secondary);
  color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: var(--space-md);
  flex-shrink: 0;
}

.step-info {
  flex: 1;
}

.step-info h4 {
  color: var(--color-secondary);
  margin-bottom: var(--space-xs);
  font-size: 1.1rem;
}

.step-info p {
  color: var(--color-text);
  font-size: 0.9rem;
  line-height: 1.5;
}

.tutorial-dismiss {
  padding: var(--space-sm) var(--space-xl);
  animation: pulseDismiss 2s infinite;
  margin-top: var(--space-md);
}

@keyframes pulseDismiss {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Body class para modo imersivo */
:global(body.immersive-mode) {
  overflow: hidden;
  height: 100vh;
  position: fixed;
  width: 100%;
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
    padding: 0 var(--space-sm);
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

  .block-navigation.fixed {
    width: 90%;
    top: 5px;
  }

  .tutorial-content {
    padding: var(--space-lg);
  }
}

/* Telas muito pequenas */
@media (max-width: 375px) {
  .chapter-title {
    font-size: 1.5rem;
  }

  .nav-btn {
    font-size: 0.8rem;
    padding: var(--space-xs) var(--space-md);
  }

  .block-icon {
    font-size: 2rem;
  }

  .block-title {
    font-size: 1.1rem;
  }

  .tutorial-step {
    flex-direction: column;
    align-items: flex-start;
  }

  .step-number {
    margin-bottom: var(--space-xs);
  }
}
</style>
