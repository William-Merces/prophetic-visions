<template>
  <div class="revelation-stage">
    <!-- Seção da experiência imersiva -->
    <div class="immersive-experience">
      <transition name="fade" mode="out-in">
        <div :key="currentVisionIndex" class="vision-scene">
          <!-- Background da visão -->
          <div class="vision-background">
            <div
              class="background-image"
              :style="{ backgroundImage: `url(${currentVision.backgroundImage})` }"
            ></div>
            <div class="overlay" :class="currentVision.overlayClass"></div>

            <!-- Efeitos especiais baseados na visão atual -->
            <div v-if="currentVision.effects" class="special-effects">
              <div
                v-for="(effect, index) in currentVision.effects"
                :key="index"
                :class="effect"
              ></div>
            </div>
          </div>

          <!-- Conteúdo da visão -->
          <div class="vision-content">
            <h3 class="vision-title">{{ currentVision.title }}</h3>

            <div class="vision-narrative">
              <div class="narrative-text">
                <p v-for="(paragraph, index) in currentVision.narrative" :key="index" class="text-line">
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Controles de navegação -->
      <div class="vision-controls">
        <button class="nav-btn prev-btn" @click="prevVision" :disabled="currentVisionIndex === 0">
          <span class="nav-icon">←</span> Anterior
        </button>

        <!-- Indicadores de cenas -->
        <div class="vision-indicators">
          <span
            v-for="(_, index) in visions"
            :key="index"
            class="indicator"
            :class="{ 'active': currentVisionIndex === index }"
            @click="goToVision(index)"
          ></span>
        </div>

        <button
          v-if="currentVisionIndex < visions.length - 1"
          class="nav-btn next-btn"
          @click="nextVision"
        >
          Próximo <span class="nav-icon">→</span>
        </button>

        <button
          v-else
          class="nav-btn complete-btn"
          @click="completeStage"
        >
          Prosseguir <span class="nav-icon">→</span>
        </button>
      </div>
    </div>

    <!-- Seção de reflexão (mostrada após a última visão) -->
    <div v-if="showReflection" class="reflection-section">
      <h3>Refletindo Sobre a Visão</h3>

      <div class="reflection-content">
        <p>Você acaba de experimentar, ainda que parcialmente, o impacto avassalador da visão de João. Imagine um homem idoso, já enfraquecido pelo exílio, confrontado subitamente com a realidade celestial e a manifestação da glória de Cristo ressuscitado.</p>

        <p>Esta visão não foi apenas uma experiência visual, mas um encontro transformador que engajou todos os sentidos — o som da voz como de trombeta, o brilho do rosto como o sol, o calor da mão direita que trazia conforto.</p>

        <div class="scripture-box">
          <p class="scripture">
            "Quando o vi, caí aos seus pés como morto. Então ele colocou sua mão direita sobre mim e disse: 'Não tenha medo. Eu sou o Primeiro e o Último. Sou aquele que vive. Estive morto, mas eis que estou vivo para todo o sempre!'"
          </p>
          <span class="scripture-ref">Apocalipse 1:17-18</span>
        </div>

        <p>A resposta inicial de João — cair como morto — ilustra a reação humana apropriada diante da santidade divina. Ao longo da Bíblia, desde Isaías até Ezequiel e agora João, vemos que a aproximação da glória de Deus resulta em profunda consciência da própria finitude e indignidade.</p>

        <p>No entanto, esta visão não foi dada para aterrorizar, mas para fortalecer. As palavras de Cristo "Não tenha medo" e seu toque compassivo demonstram que a glória divina é revelada não para nos destruir, mas para nos levantar e comissionar.</p>

        <div class="reflection-questions">
          <h4>Para sua reflexão pessoal:</h4>
          <ul>
            <li>Se você experimentasse esta visão, qual aspecto teria maior impacto em você?</li>
            <li>Como a imagem de Cristo glorificado contrasta com representações populares de Jesus?</li>
            <li>De que maneira esta visão poderia ter fortalecido cristãos sofrendo perseguição?</li>
          </ul>
        </div>

        <div class="continue-section">
          <button class="btn btn-primary" @click="completeStage">
            Prosseguir para o Significado
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RevelationStage',
  data() {
    return {
      currentVisionIndex: 0,
      showReflection: false,
      visions: [
        {
          title: "A Ilha de Patmos",
          backgroundImage: "/images/apocalypse/patmos-rocks.jpg",
          overlayClass: "dramatic",
          effects: [],
          narrative: [
            "Você está em Patmos, uma ilha árida e rochosa no Mar Egeu.",
            "É domingo, o Dia do Senhor, e você está em oração solitária, meditando nas Escrituras e comunhão com Deus.",
            "A luz ao seu redor começa a se desvanecer. O som das ondas quebrando contra as rochas lentamente silencia.",
            "Uma estranha sensação de deslocamento toma conta de você, como se sua consciência estivesse se expandindo além dos limites físicos."
          ]
        },
        {
          title: "Arrebatado em Espírito",
          backgroundImage: "/images/apocalypse/spirit-veil.jpg",
          overlayClass: "light",
          effects: ["celestial-rays"],
          narrative: [
            "Uma sensação sobrenatural percorre seu corpo — não é mais a brisa marítima que toca sua pele, mas algo diferente... algo transcendente.",
            "Sua percepção muda. Você já não está mais em Patmos — pelo menos não da maneira como estava antes.",
            "O véu entre o mundo físico e o espiritual parece ter se tornado translúcido.",
            "É como se você existisse simultaneamente em dois reinos, com seus sentidos espirituais despertados para uma nova dimensão de realidade."
          ]
        },
        {
          title: "A Voz como de Trombeta",
          backgroundImage: "/images/apocalypse/heavenly-voice.jpg",
          overlayClass: "dramatic",
          effects: ["celestial-rays", "holy-light"],
          narrative: [
            "De repente, uma voz ressoa atrás de você — não uma voz comum, humana, mas poderosa como uma trombeta celestial.",
            "A voz reverbera não apenas em seus ouvidos, mas em todo o seu ser, sacudindo cada fibra de sua existência:",
            "'EU SOU O ALFA E O ÔMEGA, O PRIMEIRO E O ÚLTIMO!'",
            "'ESCREVE EM UM LIVRO O QUE VIRES E ENVIA ÀS SETE IGREJAS...'"
          ]
        },
        {
          title: "Os Sete Candeeiros de Ouro",
          backgroundImage: "/images/apocalypse/seven-lampstands.jpg",
          overlayClass: "dark",
          effects: ["holy-light"],
          narrative: [
            "Seu coração acelera e seu corpo treme enquanto você se vira para ver quem fala.",
            "A realidade ao seu redor se transforma...",
            "Diante de seus olhos deslumbrados, surgem sete candeeiros de ouro, brilhando com uma luz sobrenatural que não provém de chama alguma.",
            "Os candeeiros formam um círculo, como sentinelas de luz em meio à escuridão circundante."
          ]
        },
        {
          title: "Semelhante ao Filho do Homem",
          backgroundImage: "/images/apocalypse/son-of-man.jpg",
          overlayClass: "dramatic",
          effects: ["divine-presence", "holy-light"],
          narrative: [
            "Entre os candeeiros, surge uma figura que paralisa seu ser inteiro.",
            "Alguém 'semelhante ao Filho do Homem' — mas não é o humilde carpinteiro da Galileia que alguns conheceram décadas atrás...",
            "É Cristo em sua plena glória divina, revelada em toda sua magnitude.",
            "A visão é tão avassaladora que seus sentidos mal conseguem processar o que veem."
          ]
        },
        {
          title: "Sua Aparência Divina",
          backgroundImage: "/images/apocalypse/divine-appearance.jpg",
          overlayClass: "light",
          effects: ["divine-presence", "holy-light", "celestial-rays"],
          narrative: [
            "Seus olhos mal suportam contemplar a figura diante de você.",
            "Cabelos brancos como lã pura, como neve, irradiam sabedoria eterna e pureza absoluta.",
            "Seus olhos são como chamas de fogo penetrantes, capazes de enxergar através de todas as camadas da alma.",
            "Seus pés, semelhantes ao bronze polido em uma fornalha ardente, reluzem com o brilho de quem caminha com suprema autoridade."
          ]
        },
        {
          title: "Seu Poder e Glória",
          backgroundImage: "/images/apocalypse/christ-glory.jpg",
          overlayClass: "dramatic",
          effects: ["divine-presence", "holy-light", "celestial-rays"],
          narrative: [
            "Em sua mão direita, sete estrelas brilham intensamente, sem queimar sua palma.",
            "De sua boca sai uma espada afiada de dois gumes, refletindo o poder de sua palavra para julgar e discernir.",
            "Seu rosto... é como contemplar o sol do meio-dia sem qualquer proteção.",
            "A glória é insuportável. O temor, completamente esmagador."
          ]
        },
        {
          title: "Prostrado como Morto",
          backgroundImage: "/images/apocalypse/john-fallen.jpg",
          overlayClass: "dark",
          effects: ["holy-light"],
          narrative: [
            "A grandeza da visão é demais para suportar. Você cai aos seus pés como morto.",
            "Nenhuma força resta em seu corpo. Nenhuma palavra consegue sair de seus lábios.",
            "Diante de tal majestade, você é apenas pó e cinzas.",
            "A consciência de sua própria finitude e fragilidade nunca foi tão aguda quanto agora, em contraste com a glória infinita diante de você."
          ]
        },
        {
          title: "O Toque de Conforto",
          backgroundImage: "/images/apocalypse/divine-touch.jpg",
          overlayClass: "light",
          effects: ["divine-presence"],
          narrative: [
            "Então, quando você pensa que não pode suportar mais, uma mão toca seu ombro direito.",
            "A mesma mão que segura as sete estrelas, que sustenta as igrejas e o universo, agora traz conforto e restauração.",
            "Uma voz agora mais suave, mas ainda cheia de autoridade, diz:",
            "'Não tenha medo. EU SOU o Primeiro e o Último, o que vive. Estive morto, mas eis que estou vivo para todo o sempre! E tenho as chaves da morte e do Hades.'"
          ]
        }
      ]
    }
  },
  computed: {
    currentVision() {
      return this.visions[this.currentVisionIndex] || {}
    }
  },
  methods: {
    nextVision() {
      if (this.currentVisionIndex < this.visions.length - 1) {
        this.currentVisionIndex++
      } else {
        this.showReflection = true

        // Rolagem suave até a seção de reflexão
        this.$nextTick(() => {
          const reflectionSection = document.querySelector('.reflection-section')
          if (reflectionSection) {
            reflectionSection.scrollIntoView({ behavior: 'smooth' })
          }
        })
      }
    },

    prevVision() {
      if (this.currentVisionIndex > 0) {
        this.currentVisionIndex--
        this.showReflection = false
      }
    },

    goToVision(index) {
      if (index >= 0 && index < this.visions.length) {
        this.currentVisionIndex = index
        this.showReflection = false
      }
    },

    completeStage() {
      this.$emit('complete')
    },

    handleKeydown(e) {
      if (e.key === 'ArrowRight') {
        this.nextVision()
      } else if (e.key === 'ArrowLeft') {
        this.prevVision()
      }
    }
  },
  mounted() {
    // Adicionar listener para teclas de seta
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    // Remover listener de teclado
    window.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>

<style scoped>
.revelation-stage {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* Seção de experiência imersiva */
.immersive-experience {
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 600px;
  overflow: hidden;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.vision-scene {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

/* Background e efeitos */
.vision-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 1;
  transition: transform 0.5s ease;
}

.vision-scene:hover .background-image {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.overlay.dark {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
}

.overlay.light {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
}

.overlay.dramatic {
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9));
}

/* Efeitos especiais */
.special-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  pointer-events: none;
}

.holy-light {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, rgba(255, 253, 230, 0.4) 0%, rgba(255, 253, 230, 0) 70%);
  animation: pulse-light 4s infinite alternate;
}

.celestial-rays {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 253, 230, 0.1) 0%, rgba(255, 253, 230, 0) 50%, rgba(255, 253, 230, 0.1) 100%);
  opacity: 0.8;
  animation: rotate 120s linear infinite;
}

.divine-presence {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 253, 230, 0.2) 0%, transparent 70%);
  animation: pulse-presence 10s infinite;
}

@keyframes pulse-light {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-presence {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

/* Conteúdo da visão */
.vision-content {
  position: relative;
  z-index: 10;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.vision-title {
  font-size: 2.5rem;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  font-family: var(--font-family-heading);
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  animation: fadeInDown 1s ease;
}

.vision-narrative {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: var(--radius-md);
  backdrop-filter: blur(5px);
  animation: fadeIn 1s ease 0.3s forwards;
  opacity: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.text-line {
  margin-bottom: 1rem;
  line-height: 1.8;
  font-size: 1.2rem;
  font-family: var(--font-family-quote);
  color: var(--color-text);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.text-line:last-child {
  margin-bottom: 0;
}

/* Controles de navegação */
.vision-controls {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 20;
}

.nav-btn {
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-family-heading);
  font-size: 1rem;
}

.nav-btn:hover:not(:disabled) {
  background-color: rgba(75, 46, 131, 0.7);
  transform: translateY(-2px);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-icon {
  font-size: 1.1rem;
  transition: transform var(--transition-fast);
}

.prev-btn:hover .nav-icon {
  transform: translateX(-3px);
}

.next-btn:hover .nav-icon,
.complete-btn:hover .nav-icon {
  transform: translateX(3px);
}

.complete-btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
}

.complete-btn:hover {
  background-color: var(--color-secondary-light);
}

/* Indicadores de visão */
.vision-indicators {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.indicator.active {
  background-color: var(--color-secondary);
  transform: scale(1.2);
}

.indicator:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.5);
}

/* Seção de reflexão */
.reflection-section {
  padding: 3rem 2rem;
  margin-top: 3rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeInUp 1s ease;
}

.reflection-section h3 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-secondary);
  font-size: 2rem;
}

.reflection-content {
  max-width: 800px;
  margin: 0 auto;
}

.reflection-content p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.scripture-box {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: var(--radius-md);
  margin: 2rem 0;
  border-left: 3px solid var(--color-secondary);
}

.scripture {
  font-family: var(--font-family-quote);
  font-style: italic;
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.scripture-ref {
  display: block;
  text-align: right;
  color: var(--color-secondary);
}

.reflection-questions {
  background-color: rgba(75, 46, 131, 0.2);
  padding: 1.5rem 2rem;
  border-radius: var(--radius-md);
  margin: 2rem 0;
  border: 1px solid rgba(196, 180, 84, 0.2);
}

.reflection-questions h4 {
  color: var(--color-secondary-light);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.reflection-questions ul {
  margin-left: 1.5rem;
}

.reflection-questions li {
  margin-bottom: 0.8rem;
  line-height: 1.6;
}

.continue-section {
  text-align: center;
  margin-top: 2.5rem;
}

.btn-arrow {
  display: inline-block;
  margin-left: 0.5rem;
  transition: transform var(--transition-fast);
}

.btn:hover .btn-arrow {
  transform: translateX(5px);
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transições entre visões */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsividade */
@media (max-width: 992px) {
  .vision-title {
    font-size: 2rem;
  }

  .text-line {
    font-size: 1.1rem;
  }

  .scripture {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .immersive-experience {
    height: 70vh;
  }

  .vision-title {
    font-size: 1.8rem;
  }

  .vision-narrative {
    padding: 1.5rem;
  }

  .text-line {
    font-size: 1rem;
  }

  .vision-controls {
    flex-wrap: wrap;
    padding: 0 1rem;
  }

  .nav-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .reflection-section h3 {
    font-size: 1.7rem;
  }

  .reflection-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .vision-title {
    font-size: 1.5rem;
  }

  .vision-content {
    padding: 1rem;
  }

  .vision-narrative {
    padding: 1rem;
  }

  .vision-controls {
    bottom: 1rem;
  }

  .scripture-box {
    padding: 1.5rem;
  }

  .scripture {
    font-size: 1rem;
  }

  .reflection-questions {
    padding: 1rem;
  }
}
</style>
