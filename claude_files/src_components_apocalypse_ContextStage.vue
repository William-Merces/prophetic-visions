<template>
  <div class="context-stage">
    <!-- Carrossel de slides com contexto histórico -->
    <div class="context-carousel">
      <transition name="slide" mode="out-in">
        <div :key="currentSlideIndex" class="slide">
          <div
            class="slide-background"
            :style="{ backgroundImage: `url(${currentSlide.image})` }"
          >
            <div class="overlay" :class="currentSlide.overlayClass"></div>
          </div>

          <div class="slide-content">
            <h3 class="slide-title">{{ currentSlide.title }}</h3>
            <div class="slide-text">
              <p v-for="(paragraph, index) in currentSlide.paragraphs" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </transition>

      <!-- Navegação de slides -->
      <div class="slide-navigation">
        <button class="nav-btn prev-btn" @click="prevSlide" :disabled="currentSlideIndex === 0">
          <span class="nav-icon">←</span> Anterior
        </button>

        <!-- Indicadores de slides -->
        <div class="slide-indicators">
          <span
            v-for="(_, index) in slides"
            :key="index"
            class="indicator"
            :class="{ 'active': currentSlideIndex === index }"
            @click="goToSlide(index)"
          ></span>
        </div>

        <button
          v-if="currentSlideIndex < slides.length - 1"
          class="nav-btn next-btn"
          @click="nextSlide"
        >
          Próximo <span class="nav-icon">→</span>
        </button>

        <button
          v-else
          class="nav-btn complete-btn"
          @click="completeStage"
        >
          Continuar <span class="nav-icon">→</span>
        </button>
      </div>
    </div>

    <!-- Seção de informações adicionais (revelada com scroll) -->
    <div class="additional-info" v-if="showAdditionalInfo">
      <h3>Contexto Histórico de João e o Apocalipse</h3>

      <div class="info-columns">
        <div class="info-column">
          <div class="info-card">
            <h4>Império Romano no Século I</h4>
            <p>Na época em que o Apocalipse foi escrito, o Império Romano alcançava o auge de seu poder. Sob o imperador Domiciano (81-96 d.C.), intensificou-se a perseguição aos cristãos que se recusavam a adorar o imperador como "Senhor e Deus".</p>
            <p>O culto imperial tornou-se obrigatório, e aqueles que não participavam eram considerados inimigos do estado, enfrentando punições severas, exílio ou morte.</p>
          </div>

          <div class="info-card">
            <h4>As Sete Igrejas da Ásia</h4>
            <p>O livro foi dirigido às sete igrejas da província romana da Ásia (atual Turquia ocidental): Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia.</p>
            <p>Estas comunidades cristãs enfrentavam ameaças tanto externas (perseguição) quanto internas (falsos ensinamentos e acomodação cultural).</p>
          </div>
        </div>

        <div class="info-column">
          <div class="info-card">
            <h4>João, o Revelador</h4>
            <p>Tradicionalmente identificado como João, o apóstolo amado de Jesus, ele estava exilado na ilha de Patmos "por causa da palavra de Deus e do testemunho de Jesus" (Apocalipse 1:9).</p>
            <p>Patmos era uma pequena ilha no Mar Egeu usada pelos romanos como colônia penal. Foi lá, provavelmente durante o reinado de Domiciano (por volta de 95 d.C.), que João recebeu a revelação divina.</p>
          </div>

          <div class="info-card">
            <h4>Propósito do Apocalipse</h4>
            <p>Em tempos de intensa perseguição, o Apocalipse foi escrito para oferecer esperança aos cristãos sofrendo, assegurando-lhes que Deus está no controle da história e que Cristo triunfará sobre todos os poderes hostis.</p>
            <p>O livro usa linguagem simbólica para proteger os cristãos (uma acusação direta contra Roma seria perigosa) e para expressar realidades espirituais que transcendem expressões literais.</p>
          </div>
        </div>
      </div>

      <div class="continue-section">
        <button class="btn btn-primary" @click="completeStage">
          Avançar para a Revelação
          <span class="btn-arrow">→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContextStage',
  data() {
    return {
      currentSlideIndex: 0,
      showAdditionalInfo: false,
      slides: [
        {
          title: "Roma, 95 d.C.",
          image: "/images/apocalypse/rome-empire-map.jpg",
          overlayClass: "dark",
          paragraphs: [
            "O Império Romano domina todo o mundo conhecido, de Gibraltar até a Mesopotâmia, do Norte da África até a Britânia.",
            "O imperador Domiciano exige ser adorado como 'Senhor e Deus', estabelecendo seu culto imperial em todas as províncias.",
            "Aqueles que se recusam a oferecer incenso ao imperador são considerados inimigos do estado."
          ]
        },
        {
          title: "Tempo de Perseguição",
          image: "/images/apocalypse/roman-persecution.jpg",
          overlayClass: "dramatic",
          paragraphs: [
            "Para os seguidores de Cristo, recusar-se a adorar o imperador significa enfrentar as consequências: confisco de bens, proibição de comércio, prisão, exílio ou morte.",
            "Muitos cristãos escolhem a morte em vez de negar sua fé, tornando-se mártires — testemunhas que selam seu testemunho com sangue.",
            "As comunidades cristãs se reúnem em segredo, usando símbolos como o peixe (ICHTHYS) para identificar uns aos outros."
          ]
        },
        {
          title: "João, O Último Apóstolo",
          image: "/images/apocalypse/apostle-john.jpg",
          overlayClass: "light",
          paragraphs: [
            "Entre os perseguidos está João, o último apóstolo vivo, agora com cerca de 90 anos de idade.",
            "Ele carrega as memórias vívidas de ter caminhado com Jesus, de ter repousado em Seu peito durante a Última Ceia, de ter permanecido aos pés da cruz.",
            "Após décadas servindo como pastor e líder espiritual, João vê as igrejas que fundou enfrentando sua maior prova."
          ]
        },
        {
          title: "Exílio em Patmos",
          image: "/images/apocalypse/patmos-island.jpg",
          overlayClass: "dark",
          paragraphs: [
            "Por seu testemunho inabalável, João foi exilado para Patmos — uma ilha rochosa, árida e isolada no Mar Egeu, usada como colônia penal romana.",
            "Separado das congregações que pastoreava, mas não de seu Senhor, João continua em comunhão com Deus através da oração e meditação nas Escrituras.",
            "A ilha torna-se não apenas seu lugar de exílio, mas o ponto de encontro divino entre o céu e a terra."
          ]
        },
        {
          title: "Igrejas em Crise",
          image: "/images/apocalypse/asian-churches.jpg",
          overlayClass: "dramatic",
          paragraphs: [
            "As sete igrejas da Ásia que João pastoreava estão em crise profunda: perseguição externa, falsos ensinamentos internos, alguns abandonando a fé.",
            "Éfeso perdeu seu primeiro amor. Esmirna enfrenta tribulação. Pérgamo compromete-se com doutrinas falsas. Tiatira tolera a imoralidade. Sardes está espiritualmente morta. Filadélfia permanece fiel apesar da fraqueza. Laodiceia tornou-se morna e apática.",
            "Eles precisam desesperadamente de esperança e direção para perseverar nos tempos sombrios que virão."
          ]
        },
        {
          title: "O Dia do Senhor",
          image: "/images/apocalypse/john-praying-patmos.jpg",
          overlayClass: "light",
          paragraphs: [
            "É domingo, o Dia do Senhor, em Patmos. João está em oração, sozinho nas rochosas encostas da ilha, contemplando o mar azul do Egeu.",
            "No silêncio da adoração, seu espírito se eleva além do exílio terreno, além das limitações da carne e do tempo.",
            "Ele não sabe que está prestes a receber a maior revelação da história — um vislumbre do trono celestial e do plano divino que se desdobrará até o fim dos tempos."
          ]
        }
      ],

      // Para possível implementação futura de auto-scroll
      autoScroll: false,
      scrollInterval: null
    }
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentSlideIndex] || {}
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlideIndex < this.slides.length - 1) {
        this.currentSlideIndex++
      } else {
        this.showAdditionalInfo = true
        // Rolagem suave até a seção de informações adicionais
        this.$nextTick(() => {
          const additionalInfo = document.querySelector('.additional-info')
          if (additionalInfo) {
            additionalInfo.scrollIntoView({ behavior: 'smooth' })
          }
        })
      }
    },

    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--
      }
    },

    goToSlide(index) {
      if (index >= 0 && index < this.slides.length) {
        this.currentSlideIndex = index
      }
    },

    completeStage() {
      this.$emit('complete')
    },

    startAutoScroll() {
      if (!this.autoScroll) return

      this.scrollInterval = setInterval(() => {
        if (this.currentSlideIndex < this.slides.length - 1) {
          this.nextSlide()
        } else {
          this.stopAutoScroll()
        }
      }, 5000) // Muda de slide a cada 5 segundos
    },

    stopAutoScroll() {
      if (this.scrollInterval) {
        clearInterval(this.scrollInterval)
        this.scrollInterval = null
      }
    }
  },
  mounted() {
    // Para possível implementação futura de auto-scroll
    if (this.autoScroll) {
      this.startAutoScroll()
    }

    // Adicionar listener para teclas de seta
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.nextSlide()
      } else if (e.key === 'ArrowLeft') {
        this.prevSlide()
      }
    })
  },
  beforeUnmount() {
    this.stopAutoScroll()

    // Remover listener de teclado
    window.removeEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.nextSlide()
      } else if (e.key === 'ArrowLeft') {
        this.prevSlide()
      }
    })
  },
}
</script>

<style scoped>
.context-stage {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* Carrossel de slides */
.context-carousel {
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  overflow: hidden;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.slide {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.slide-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 1;
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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
}

.overlay.light {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
}

.overlay.dramatic {
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
}

.slide-content {
  position: relative;
  z-index: 3;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.slide-title {
  font-size: 2.5rem;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  font-family: var(--font-family-heading);
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  animation: fadeInDown 1s ease;
}

.slide-text {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  animation: fadeIn 1s ease 0.3s forwards;
  opacity: 0;
}

.slide-text p {
  margin-bottom: 1rem;
  line-height: 1.8;
  font-size: 1.2rem;
  color: var(--color-text);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.slide-text p:last-child {
  margin-bottom: 0;
}

/* Navegação de slides */
.slide-navigation {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 10;
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
  font-size: 0.9rem;
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

/* Indicadores de slides */
.slide-indicators {
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

/* Seção de informações adicionais */
.additional-info {
  padding: 3rem 2rem;
  margin-top: 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeInUp 1s ease;
}

.additional-info h3 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-secondary);
  font-size: 1.8rem;
}

.info-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-card {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
  transition: all var(--transition-normal);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-color: rgba(196, 180, 84, 0.3);
}

.info-card h4 {
  color: var(--color-secondary-light);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.info-card p {
  line-height: 1.7;
  margin-bottom: 1rem;
}

.info-card p:last-child {
  margin-bottom: 0;
}

.continue-section {
  text-align: center;
  margin-top: 2rem;
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

/* Transições entre slides */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

/* Responsividade */
@media (max-width: 992px) {
  .slide-title {
    font-size: 2rem;
  }

  .slide-text p {
    font-size: 1.1rem;
  }

  .info-columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .context-carousel {
    height: 70vh;
  }

  .slide-title {
    font-size: 1.8rem;
  }

  .slide-text {
    padding: 1rem;
  }

  .slide-text p {
    font-size: 1rem;
  }

  .slide-navigation {
    flex-wrap: wrap;
    padding: 0 1rem;
  }

  .nav-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .slide-title {
    font-size: 1.5rem;
  }

  .slide-content {
    padding: 1rem;
  }

  .slide-navigation {
    bottom: 1rem;
  }

  .info-card {
    padding: 1rem;
  }

  .info-card h4 {
    font-size: 1.2rem;
  }
}
</style>
