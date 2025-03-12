<template>
  <div class="history-context-block">
    <!-- Cabeçalho do bloco -->
    <div class="block-header">
      <h3 class="block-title">Nos Passos de João</h3>
      <p class="block-subtitle">O contexto histórico da revelação</p>
    </div>

    <!-- Experiência imersiva narrativa -->
    <ImersiveNarrative
      :slides="contextSlides"
      :typing-speed="40"
      :auto-start-typing="true"
      :auto-fullscreen="true"
      @complete="narrativeCompleted = true"
      @exit-fullscreen="$emit('exit-fullscreen')"
    />

    <!-- Seção de reflexão após completar a narrativa -->
    <div v-if="narrativeCompleted" class="reflection-section">
      <h4 class="reflection-title">Reflexão Histórica</h4>

      <div
        class="reflection-questions"
        v-touch:swipe.left="nextReflectionQuestion"
        v-touch:swipe.right="prevReflectionQuestion"
      >
        <transition-group name="slide-fade" tag="div" class="questions-carousel">
          <div
            v-for="(question, index) in reflectionQuestions"
            :key="question.id"
            v-show="currentQuestion === index"
            class="question-card"
          >
            <h5>{{ question.title }}</h5>
            <p>{{ question.text }}</p>

            <div class="question-navigation">
              <button
                v-if="index > 0"
                class="nav-btn"
                @click="prevReflectionQuestion"
              >
                <span class="nav-arrow">←</span> Anterior
              </button>
              <div class="question-indicator">
                {{ index + 1 }} / {{ reflectionQuestions.length }}
              </div>
              <button
                v-if="index < reflectionQuestions.length - 1"
                class="nav-btn"
                @click="nextReflectionQuestion"
              >
                Próxima <span class="nav-arrow">→</span>
              </button>
            </div>
          </div>
        </transition-group>
      </div>

      <div class="historical-insights">
        <h4>Contexto Adicional</h4>
        <p>O imperador Domiciano (81-96 d.C.) intensificou a perseguição aos cristãos, exigindo ser adorado como "Dominus et Deus" (Senhor e Deus). Recusar-se a participar do culto imperial poderia resultar em execução.</p>
        <p>As sete igrejas mencionadas no Apocalipse estavam localizadas na província romana da Ásia (atual Turquia ocidental), um centro de culto imperial onde os cristãos enfrentavam pressão constante para comprometer sua fé.</p>
        <p>Patmos, uma pequena ilha rochosa no Mar Egeu, era usada pelos romanos como local de banimento para prisioneiros políticos. Foi neste ambiente hostil que João recebeu a maior visão de esperança já registrada.</p>
      </div>

      <!-- Botão para completar o bloco -->
      <div class="completion-actions">
        <button class="btn btn-secondary" @click="completeBlock('next')">
          Concluir e Continuar <span class="btn-icon">→</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import ImersiveNarrative from './ImersiveNarrative.vue'

export default {
  name: 'ApocalypseChapter1Block1',
  components: {
    ImersiveNarrative
  },
  data() {
    return {
      narrativeCompleted: false,
      currentQuestion: 0,

      // Questões de reflexão separadas
      reflectionQuestions: [
        {
          id: 1,
          title: "O Império e a Igreja",
          text: "A igreja primitiva enfrentou severa perseguição sob o Império Romano. Como o contexto político do primeiro século moldou a forma e o conteúdo da revelação dada a João?"
        },
        {
          id: 2,
          title: "Exílio e Revelação",
          text: "João estava exilado em Patmos quando recebeu esta visão. De que maneira o isolamento pode ter preparado João para receber uma revelação tão profunda? O que isso nos ensina sobre momentos de isolamento em nossa própria vida espiritual?"
        },
        {
          id: 3,
          title: "O Dia do Senhor",
          text: "João especifica que estava \"em espírito, no dia do Senhor\" quando teve esta visão. Qual é o significado do \"dia do Senhor\" para a igreja primitiva e como isso contextualizaria esta experiência para os primeiros leitores?"
        }
      ],

      // Dados para a narrativa imersiva
      contextSlides: [
        {
          title: "Roma, 95 d.C.",
          text: [
            "O Império Romano controla todo o mundo conhecido.",
            "O imperador Domiciano exige ser adorado como 'Senhor e Deus'."
          ],
          backgroundImage: "/images/apocalypse/rome-empire-map.jpg",
          overlayClass: "dark"
        },
        {
          title: "Tempos de Perseguição",
          text: [
            "Para os que seguem a Cristo, recusar-se a adorar o imperador significa perseguição.",
            "Muitos cristãos enfrentam prisão, exílio ou morte por sua fé."
          ],
          backgroundImage: "/images/apocalypse/roman-persecution.jpg",
          overlayClass: "dramatic"
        },
        {
          title: "João, O Último Apóstolo",
          text: [
            "Entre os perseguidos está João, o último apóstolo vivo.",
            "Agora com cerca de 90 anos, ele guarda as memórias de ter caminhado com Jesus.",
            "Aquele que repousou no peito do Mestre durante a Última Ceia."
          ],
          backgroundImage: "/images/apocalypse/apostle-john.jpg",
          overlayClass: "light"
        },
        {
          title: "Exílio em Patmos",
          text: [
            "Por seu testemunho inabalável, João foi exilado para Patmos.",
            "Uma ilha rochosa e árida no Mar Egeu, usada como colônia penal romana.",
            "Separado de seu rebanho, mas não de seu Senhor."
          ],
          backgroundImage: "/images/apocalypse/patmos-island.jpg",
          overlayClass: "dark"
        },
        {
          title: "Igrejas em Crise",
          text: [
            "As sete igrejas da Ásia que João pastoreava estão em crise.",
            "Perseguição externa. Falsos ensinamentos internos. Alguns abandonando a fé.",
            "Eles precisam desesperadamente de esperança e direção."
          ],
          backgroundImage: "/images/apocalypse/asian-churches.jpg",
          overlayClass: "dramatic"
        },
        {
          title: "O Dia do Senhor",
          text: [
            "É domingo, o Dia do Senhor em Patmos.",
            "João está em oração, sozinho nas rochosas encostas da ilha...",
            "Ele não sabe que está prestes a receber a maior revelação da história."
          ],
          backgroundImage: "/images/apocalypse/john-praying-patmos.jpg",
          overlayClass: "light"
        }
      ]
    }
  },
  methods: {
    completeBlock(action = null) {
      // Emitir evento para indicar que o bloco foi concluído
      this.$emit('complete', 1, action);
    },

    nextReflectionQuestion() {
      if (this.currentQuestion < this.reflectionQuestions.length - 1) {
        this.currentQuestion++;
      }
    },

    prevReflectionQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },

    // Inicializar observadores de toque para reflexão
    setupTouchEvents() {
      const questionsElement = this.$el.querySelector('.reflection-questions');
      if (questionsElement) {
        let startX = 0;
        let endX = 0;

        questionsElement.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
        }, { passive: true });

        questionsElement.addEventListener('touchend', (e) => {
          endX = e.changedTouches[0].clientX;

          // Detectar direção do deslize
          const diffX = endX - startX;
          const threshold = 50; // Distância mínima para considerar como deslize

          if (diffX > threshold) {
            // Deslize para a direita
            this.prevReflectionQuestion();
          } else if (diffX < -threshold) {
            // Deslize para a esquerda
            this.nextReflectionQuestion();
          }
        }, { passive: true });
      }
    }
  },
  mounted() {
    this.setupTouchEvents();

    // Garantir que o scroll esteja no topo
    window.scrollTo(0, 0);
  }
}
</script>
<style scoped>
.history-context-block {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 1s ease;
}

.block-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.block-title {
  font-size: 2rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-xs);
}

.block-subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  font-style: italic;
  font-family: var(--font-family-quote);
}

/* Seção de reflexão */
.reflection-section {
  margin-top: var(--space-xxl);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.8s ease;
}

.reflection-title {
  text-align: center;
  color: var(--color-secondary);
  font-size: 1.5rem;
  margin-bottom: var(--space-lg);
  position: relative;
}

.reflection-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background-color: var(--color-secondary);
}

.reflection-questions {
  margin-bottom: var(--space-xl);
  position: relative;
  overflow: hidden;
  touch-action: pan-y; /* Permitir scroll vertical mas gerenciar swipe horizontal */
  min-height: 200px; /* Altura mínima para evitar saltos de layout */
}

.questions-carousel {
  position: relative;
  width: 100%;
}

.question-card {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  border-left: 3px solid var(--color-primary);
  margin-bottom: var(--space-md);
  position: relative;
  transition: all 0.3s ease;
}

.question-card h5 {
  color: var(--color-secondary-light);
  margin-bottom: var(--space-md);
  font-size: 1.1rem;
}

.question-card p {
  line-height: 1.7;
  color: var(--color-text);
}

.question-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.question-indicator {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.historical-insights {
  margin-top: var(--space-xl);
  padding: var(--space-lg);
  background-color: rgba(75, 46, 131, 0.1);
  border-radius: var(--radius-md);
  border: 1px solid rgba(75, 46, 131, 0.3);
}

.historical-insights h4 {
  color: var(--color-secondary-light);
  margin-bottom: var(--space-md);
  font-size: 1.2rem;
  text-align: center;
}

.historical-insights p {
  margin-bottom: var(--space-md);
  line-height: 1.7;
}

.completion-actions {
  margin-top: var(--space-xl);
  text-align: center;
}

.btn-secondary {
  padding: var(--space-sm) var(--space-lg);
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
}

.btn-icon {
  font-size: 1.2rem;
  transition: transform var(--transition-fast);
}

.btn-secondary:hover .btn-icon {
  transform: translateX(5px);
}

.nav-btn {
  background-color: rgba(0, 0, 0, 0.4);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.nav-btn:hover, .nav-btn:active {
  background-color: rgba(75, 46, 131, 0.4);
  transform: translateY(-2px);
}

.nav-arrow {
  font-size: 1.1rem;
}

/* Transições para carrossel de questões */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-leave-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsividade */
@media (max-width: 768px) {
  .block-title {
    font-size: 1.5rem;
  }

  .reflection-section {
    padding: var(--space-md);
  }

  .question-card {
    padding: var(--space-md);
  }

  .historical-insights {
    padding: var(--space-md);
  }

  .btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .question-navigation {
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  .question-indicator {
    order: -1;
    width: 100%;
    text-align: center;
    margin-bottom: var(--space-xs);
  }
}

/* Dica visual de swipe */
.reflection-questions::after {
  content: "";
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  opacity: 0.7;
  animation: swipeHint 2s infinite;
}

@keyframes swipeHint {
  0%, 100% { transform: translateX(-50%); }
  50% { transform: translateX(calc(-50% + 15px)); }
}

/* Feedback de toque */
@media (hover: none) {
  .question-card:active {
    background-color: rgba(75, 46, 131, 0.3);
  }
}
</style>
