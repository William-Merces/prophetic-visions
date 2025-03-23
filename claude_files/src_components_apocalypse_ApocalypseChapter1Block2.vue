<script>
import ImersiveNarrative from './ImersiveNarrative.vue'

export default {
  name: 'ApocalypseChapter1Block2',
  components: {
    ImersiveNarrative
  },
  data() {
    return {
      currentStep: 'intro', // 'intro', 'narration', 'interaction', 'reflection'
      interactionIndex: 0,
      activeHotspot: null,
      hasInteracted: false,
      isFullscreen: false,

      // Slides para a narrativa imersiva
      visionSlides: [
        {
          title: "A Ilha de Patmos",
          text: [
            "A luz ao seu redor se desvanece. O som das ondas quebrando nas rochas de Patmos silencia.",
            "Você está sozinho, ajoelhado em oração no Dia do Senhor."
          ],
          backgroundImage: "/images/apocalypse/patmos-rocks.jpg",
          overlayClass: "dramatic"
        },
        {
          title: "Arrebatado no Espírito",
          text: [
            "Uma sensação estranha percorre seu corpo. Não é mais o vento marítimo que toca sua pele, mas algo diferente... algo sobrenatural.",
            "Você já não está mais em Patmos. Pelo menos não fisicamente."
          ],
          backgroundImage: "/images/apocalypse/spirit-veil.jpg",
          overlayClass: "light"
        },
        {
          title: "A Voz como de Trombeta",
          text: [
            "De repente, uma voz ressoa atrás de você - não como uma voz humana, mas poderosa como uma trombeta celestial.",
            "Ela reverbera não apenas em seus ouvidos, mas em todo o seu ser:",
            "'EU SOU O ALFA E O ÔMEGA, O PRIMEIRO E O ÚLTIMO!'"
          ],
          backgroundImage: "/images/apocalypse/heavenly-voice.jpg",
          overlayClass: "dramatic"
        },
        {
          title: "A Visão Inicial",
          text: [
            "Seu coração acelera. Seu corpo treme.",
            "Ao se virar para ver quem fala, a realidade ao seu redor se transforma...",
            "Diante de seus olhos, sete candeeiros de ouro surgem, brilhando com uma luz sobrenatural."
          ],
          backgroundImage: "/images/apocalypse/seven-lampstands.jpg",
          overlayClass: "light"
        },
        {
          title: "O Filho do Homem",
          text: [
            "Entre os candeeiros, surge uma figura que paralisa seu ser.",
            "Alguém 'semelhante ao Filho do Homem'. Mas não é o humilde carpinteiro da Galileia que você conheceu décadas atrás...",
            "É Cristo em sua glória divina revelada em toda sua magnitude."
          ],
          backgroundImage: "/images/apocalypse/son-of-man.jpg",
          overlayClass: "dramatic"
        },
        {
          title: "Sua Aparência Divina",
          text: [
            "Seus olhos mal conseguem suportar a visão.",
            "Cabelos brancos como neve irradiam sabedoria eterna. Olhos como chamas de fogo parecem enxergar através de sua alma.",
            "Seus pés, como bronze polido em uma fornalha, pisam entre os candeeiros com autoridade divina."
          ],
          backgroundImage: "/images/apocalypse/divine-appearance.jpg",
          overlayClass: "light"
        },
        {
          title: "Seu Poder e Glória",
          text: [
            "Em sua mão direita, sete estrelas brilham intensamente. De sua boca sai uma espada afiada de dois gumes.",
            "Seu rosto... é como contemplar o sol do meio-dia sem nenhuma proteção.",
            "A glória é insuportável. O temor, esmagador."
          ],
          backgroundImage: "/images/apocalypse/christ-glory.jpg",
          overlayClass: "dramatic"
        },
        {
          title: "Prostrado como Morto",
          text: [
            "Você cai aos seus pés como morto.",
            "Nenhuma força resta em seu corpo. Nenhuma palavra sai de seus lábios.",
            "Diante de tal majestade, você é apenas pó e cinzas."
          ],
          backgroundImage: "/images/apocalypse/john-fallen.jpg",
          overlayClass: "dark"
        },
        {
          title: "Conforto Divino",
          text: [
            "Então, quando pensa que não pode suportar mais, uma mão toca seu ombro.",
            "A mesma mão que segura as sete estrelas agora traz conforto, e você ouve:",
            "'Não tenha medo. EU SOU o Primeiro e o Último, o que vive. Estive morto, mas eis que estou vivo para todo o sempre! E tenho as chaves da morte e do Hades.'"
          ],
          backgroundImage: "/images/apocalypse/divine-touch.jpg",
          overlayClass: "light"
        }
      ],

      // Imagens interativas com hotspots
      interactiveImages: [
        {
          src: "/images/apocalypse/interactive-lampstands.jpg",
          alt: "Os Sete Candeeiros de Ouro",
          title: "Os Sete Candeeiros de Ouro",
          narrative: "Você ainda está tentando se recuperar da visão estonteante, enquanto foca no brilho dos sete candeeiros dourados. Cristo caminha entre eles com autoridade divina. Seus olhos são atraídos para diferentes elementos da cena à sua frente.",
          hotspots: [
            {
              x: 50,
              y: 35,
              title: "Os Candeeiros de Ouro",
              description: "Os sete candeeiros de ouro brilham com uma luz que não parece natural. O design lembra a menorá do templo, mas com sete lâmpadas separadas, não unidas por uma base. Você compreende que representam as sete igrejas da Ásia que você pastoreia - refletores da luz divina no mundo.",
              scripture: "Os sete candeeiros que viste são as sete igrejas.",
              reference: "Apocalipse 1:20",
              reflection: "A luz não vem das igrejas por si mesmas - elas simplesmente refletem a luz de Cristo. Como a lua reflete o sol, a igreja é chamada a refletir a glória de Cristo para um mundo em trevas."
            },
            {
              x: 30,
              y: 65,
              title: "A Posição de Cristo",
              description: "Cristo não observa as igrejas de longe, mas caminha no meio delas. Cada passo Seu ressoa com autoridade. Sua presença é ativa, atenta, vigilante. Ele não está distante dos desafios e lutas de Suas igrejas, mas intimamente presente entre elas, observando e avaliando cada uma.",
              scripture: "...e no meio dos sete candeeiros, um semelhante ao Filho do Homem...",
              reference: "Apocalipse 1:13",
              reflection: "Assim como Cristo caminha entre os candeeiros, Ele está presente em Sua igreja hoje. Não como um observador distante, mas como uma presença ativa, conhecendo nossas lutas, celebrando nossas vitórias, purificando nossas falhas."
            },
            {
              x: 70,
              y: 50,
              title: "A Luz da Menorá",
              description: "O brilho dos candeeiros ilumina o ambiente ao redor com uma luz dourada e calorosa. Este não é um brilho fraco ou vacilante, mas constante e forte. À medida que Cristo se move entre os candeeiros, Seu reflexo multiplica a luz, preenchendo o ambiente com um resplendor ainda mais intenso.",
              scripture: "Vós sois a luz do mundo. Não se pode esconder uma cidade edificada sobre um monte.",
              reference: "Mateus 5:14",
              reflection: "Cada candeeiro representa uma comunidade de fé distinta, com seus próprios desafios e forças. Juntos, porém, eles formam uma luz mais poderosa, revelando o propósito divino para a igreja como um todo."
            }
          ]
        },
        {
          src: "/images/apocalypse/interactive-son-of-man.jpg",
          alt: "O Filho do Homem Glorificado",
          title: "O Filho do Homem Glorificado",
          narrative: "À medida que sua visão se estabiliza, você foca na figura majestosa do Cristo glorificado. Ele não é mais o humilde mestre que você seguiu pela Galileia, mas o Rei dos reis em toda Sua majestade divina. Cada detalhe de Sua aparência transmite um aspecto de Sua natureza e caráter.",
          hotspots: [
            {
              x: 50,
              y: 25,
              title: "Vestes Sacerdotais",
              description: "Cristo veste uma túnica que flui até Seus pés, cingida ao peito com um cinto dourado que reluz com brilho celestial. São vestes que lembram as do Sumo Sacerdote, mas com uma majestade muito maior. Cada dobra do tecido parece emanar luz própria, como se a roupa fosse tecida com glória divina.",
              scripture: "...vestido com uma roupa que chegava até aos pés, e cingido pelo peito com um cinto de ouro.",
              reference: "Apocalipse 1:13",
              reflection: "As vestes combinam sacerdócio e realeza - Cristo como mediador e como monarca. Ele é tanto nosso Sumo Sacerdote que intercede por nós quanto nosso Rei que governa com autoridade."
            },
            {
              x: 50,
              y: 15,
              title: "Cabelos Brancos",
              description: "Os cabelos de Cristo são de um branco intenso e radiante, como a mais pura lã ou neve iluminada pelo sol. Não é o branco da velhice, mas da eternidade e perfeita sabedoria. A luz parece emanar deles, criando uma aura de autoridade e conhecimento antigo ao redor de Sua cabeça.",
              scripture: "E a sua cabeça e cabelos eram brancos como lã branca, como a neve...",
              reference: "Apocalipse 1:14",
              reflection: "Esta imagem ecoa a visão do 'Ancião de Dias' em Daniel 7. Cristo não é apenas o Filho, mas compartilha a natureza eterna do Pai - o conhecimento perfeito de todas as coisas, o julgamento que vem da sabedoria infinita."
            },
            {
              x: 45,
              y: 35,
              title: "Olhos como Chama de Fogo",
              description: "Seus olhos não são como olhos humanos, mas queimam como chamas vivas, penetrantes e ativos. Eles parecem enxergar através de todas as camadas da realidade, conhecendo cada segredo, cada intenção oculta. Quando Ele olha para você, sente como se toda sua vida estivesse exposta - nada pode ser escondido daquele olhar.",
              scripture: "E os seus olhos eram como chama de fogo.",
              reference: "Apocalipse 1:14",
              reflection: "Os olhos que choram por Lázaro também flamejam com discernimento perfeito. O mesmo Jesus que vê nossas lágrimas também conhece nossos corações. Não podemos esconder nada dEle, mas também não precisamos - Ele já conhece e ainda ama."
            }
          ]
        },
        {
          src: "/images/apocalypse/interactive-power-symbols.jpg",
          alt: "Símbolos de Poder e Autoridade",
          title: "Símbolos de Poder e Autoridade",
          narrative: "O Cristo glorificado não só tem aparência majestosa, mas cada elemento associado a Ele transmite poder soberano. Sua voz, Sua mão, Sua palavra - tudo expressa autoridade divina que transcende o cosmos. Você contempla os símbolos de Seu poder que demonstram Seu domínio sobre toda a criação.",
          hotspots: [
            {
              x: 30,
              y: 40,
              title: "Sete Estrelas",
              description: "Na mão direita de Cristo, sete estrelas brilham intensamente. Elas não o queimam, mas flutuam como joias vivas em Sua palma. Cada uma emite luz própria, reluzindo com energia celestial. Você entende que estas estrelas representam os anjos ou mensageiros das sete igrejas, totalmente sob Seu controle e proteção.",
              scripture: "O mistério das sete estrelas... As sete estrelas são os anjos das sete igrejas.",
              reference: "Apocalipse 1:20",
              reflection: "As estrelas - mensageiros das igrejas - estão na mesma mão que depois tocará seu ombro para confortá-lo. Cristo segura os líderes de Sua igreja com o mesmo cuidado e poder com que oferece conforto aos caídos."
            },
            {
              x: 70,
              y: 40,
              title: "Espada de Dois Gumes",
              description: "Da boca de Cristo não saem palavras comuns, mas uma espada longa e afiada, com dois gumes cortantes que brilham com luz própria. Não é uma arma física, mas a manifestação visual da força penetrante de Sua palavra, capaz de cortar através de todas as falsidades e revelar a verdade mais profunda.",
              scripture: "E da sua boca saía uma aguda espada de dois fios...",
              reference: "Apocalipse 1:16",
              reflection: "A mesma boca que fala palavras de conforto também pronuncia julgamento e verdade. A palavra de Cristo é tanto misericordiosa quanto incisiva, tanto curadora quanto cortante, sempre operando para separar a verdade da mentira."
            },
            {
              x: 50,
              y: 20,
              title: "Face como o Sol",
              description: "O rosto de Cristo brilha com intensidade insuportável, como o sol do meio-dia. Não é possível olhar diretamente para Ele por muito tempo. A glória que emana é tão poderosa que ilumina todo o ambiente ao redor, fazendo até os candeeiros parecerem pálidos em comparação. É a manifestação visual da glória de Deus em toda sua plenitude.",
              scripture: "E o seu rosto era como o sol, quando resplandece na sua força.",
              reference: "Apocalipse 1:16",
              reflection: "O rosto que foi cuspido e golpeado agora brilha como o sol em sua força. A humilhação deu lugar à exaltação suprema. O mesmo Jesus que foi desprezado agora é a fonte de toda luz e glória."
            }
          ]
        },
        {
          src: "/images/apocalypse/interactive-keys-authority.jpg",
          alt: "As Chaves da Autoridade",
          title: "As Chaves da Autoridade",
          narrative: "As palavras de Cristo ressoam com autoridade absoluta enquanto Ele revela Sua identidade e missão. Você percebe que esta visão não é apenas para provocar temor, mas para estabelecer a base de toda a revelação que está por vir. Cristo está revelando Seu direito de falar sobre o futuro, baseado em quem Ele é e no que já conquistou.",
          hotspots: [
            {
              x: 40,
              y: 50,
              title: "As Chaves da Morte e do Hades",
              description: "Cristo ergue em Sua mão chaves enormes que brilham com luz própria. Estas não são chaves comuns, mas símbolos de autoridade suprema sobre os reinos que antes mantinham toda a humanidade cativa - a morte e o mundo dos mortos. Ao vê-las, você compreende que Cristo conquistou os maiores inimigos da humanidade.",
              scripture: "E tenho as chaves da morte e do Hades.",
              reference: "Apocalipse 1:18",
              reflection: "Aquele que foi sepultado em um túmulo emprestado agora possui as chaves da morte. A cruz parecia ser a vitória da morte sobre Jesus, mas tornou-se a conquista de Jesus sobre a morte - não apenas para Si mesmo, mas para todos que nEle creem."
            },
            {
              x: 60,
              y: 50,
              title: "O Conquistador da Morte",
              description: "Cristo afirma com voz ressoante: 'Estive morto, mas eis que estou vivo'. Na figura diante de você, vê simultaneamente as marcas da crucificação e a glória da ressurreição. É como se Sua história estivesse gravada em Seu próprio ser - o sofrimento passado e a vitória eterna agora inseparáveis em Sua identidade.",
              scripture: "Não temas... fui morto, mas eis aqui estou vivo para todo o sempre, Amém.",
              reference: "Apocalipse 1:17-18",
              reflection: "A ressurreição não é apenas um evento histórico, mas uma realidade presente e eterna. Cristo não apenas ressuscitou, mas 'está vivo para todo o sempre'. Sua vitória não é temporária, mas permanente; não é parcial, mas completa e irreversível."
            }
          ]
        }
      ]
    }
  },
  computed: {
    currentInteractionImage() {
      return this.interactiveImages[this.interactionIndex] || {}
    },
    currentHotspotData() {
      if (this.activeHotspot === null) return {};
      return this.currentInteractionImage.hotspots[this.activeHotspot] || {};
    }
  },
  methods: {
    startNarration() {
      this.currentStep = 'narration'
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      // Ativar modo tela cheia imediatamente sem delay
      this.enterFullscreen()
    },

    // Método para entrar em modo tela cheia
    enterFullscreen() {
      if (this.isFullscreen) return; // Evitar chamadas redundantes

      this.isFullscreen = true
      const container = this.$el

      try {
        if (container.requestFullscreen) {
          container.requestFullscreen()
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen()
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen()
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen()
        }
      } catch (e) {
        console.error('Erro ao entrar em modo de tela cheia:', e)
        // Definir isFullscreen como true mesmo que a API falhe,
        // para manter a experiência visual correta
      }
    },

    completeNarration() {
      this.currentStep = 'interaction'
      this.interactionIndex = 0
      this.activeHotspot = null
      this.hasInteracted = false
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    hideNarrativeOverlay() {
      this.hasInteracted = true
    },

    selectHotspot(index) {
      if (this.activeHotspot === index) {
        this.closeHotspot()
      } else {
        this.activeHotspot = index
        this.hasInteracted = true
      }
    },

    closeHotspot() {
      this.activeHotspot = null
    },

    navigateHotspot(direction) {
      if (this.activeHotspot === null) return

      if (direction === 'prev' && this.activeHotspot > 0) {
        this.activeHotspot--
      } else if (direction === 'next' && this.activeHotspot < this.currentInteractionImage.hotspots.length - 1) {
        this.activeHotspot++
      }
    },

    previousImage() {
      if (this.interactionIndex > 0) {
        this.interactionIndex--
        this.activeHotspot = null
        this.hasInteracted = false
      }
    },

    nextImage() {
      if (this.interactionIndex < this.interactiveImages.length - 1) {
        this.interactionIndex++
        this.activeHotspot = null
        this.hasInteracted = false
      }
    },

    completeInteraction() {
      this.currentStep = 'reflection'
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    completeReflection(action = null) {
      // Emitir evento para o componente pai saber que o bloco foi concluído
      // Passa o parâmetro 'next' se fornecido
      this.$emit('complete', action)

      // Garantir que o scroll esteja disponível
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';

      // Garantir saída do modo tela cheia
      if (this.isFullscreen) {
        this.exitFullscreen();
      }
    },

    exitFullscreen() {
      if (!this.isFullscreen) return; // Evitar chamadas redundantes

      this.isFullscreen = false;

      try {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } catch (e) {
        console.error('Erro ao sair do modo de tela cheia:', e);
      }
    },

    toggleFullscreen() {
      if (this.isFullscreen) {
        this.exitFullscreen();
        // Emitir evento para retornar à seleção de blocos
        this.$emit('exit-fullscreen');
      } else {
        this.enterFullscreen();
      }
    },

    handleFullscreenChange() {
      // Detectar quando o usuário sai do modo tela cheia usando Esc
      const isInFullscreenMode =
        document.fullscreenElement === this.$el ||
        document.webkitFullscreenElement === this.$el ||
        document.mozFullScreenElement === this.$el ||
        document.msFullscreenElement === this.$el;

      // Atualizar o estado apenas se houver uma mudança real
      if (this.isFullscreen !== isInFullscreenMode) {
        this.isFullscreen = isInFullscreenMode;
      }

      // Se o usuário saiu do modo tela cheia mas ainda estamos na narrativa,
      // tentar entrar em tela cheia novamente após um pequeno delay
      if (!isInFullscreenMode && this.currentStep === 'narration') {
        setTimeout(() => {
          this.enterFullscreen();
        }, 500);
      }
    }
  },
  mounted() {
    // Iniciar diretamente na narração sem mostrar a tela de introdução
    // já que ela foi movida para o componente principal
    this.startNarration();

    // Adicionar listeners para eventos de mudança no modo tela cheia
    document.addEventListener('fullscreenchange', this.handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange)
  },
  beforeUnmount() {
    // Remover event listeners antes de destruir o componente
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange)

    // Se estiver em modo tela cheia, sair antes de desmontar
    if (this.isFullscreen) {
      this.exitFullscreen();
    }

    // Garantir que o scroll esteja habilitado
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  }
}
</script>
<template>
  <div class="apocalypse-vision" :class="{ 'fullscreen-mode': isFullscreen }">
    <div class="vision-interaction" v-if="currentStep === 'interaction'">
      <div class="interactive-wrapper">
        <img :src="currentInteractionImage.src" :alt="currentInteractionImage.alt" class="vision-image" :class="{ 'loaded': isImageLoaded }" @load="isImageLoaded = true" />
        <div class="narrative-overlay" v-if="!activeHotspot && !hasInteracted" @click="hideNarrativeOverlay">
          <div class="narrative-content">
            <p>{{ currentInteractionImage.narrative }}</p>
            <p class="narrative-hint">Toque nos pontos brilhantes para explorar</p>
          </div>
        </div>
        <div
          v-for="(hotspot, index) in currentInteractionImage.hotspots"
          :key="index"
          class="hotspot"
          :class="{ 'pulsating': !activeHotspot, 'active': activeHotspot === index, 'hidden': activeHotspot !== null && activeHotspot !== index }"
          :style="{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }"
          @click="selectHotspot(index)"
        >
          <div class="hotspot-indicator"></div>
        </div>
        <div class="hotspot-details" v-if="activeHotspot !== null">
          <div class="details-header">
            <h3>{{ currentHotspotData.title }}</h3>
            <button class="close-btn" @click="closeHotspot">×</button>
          </div>
          <div class="details-content">
            <p>{{ currentHotspotData.description }}</p>
            <div class="scripture-reference">
              <p class="scripture-text">"{{ currentHotspotData.scripture }}"</p>
              <p class="scripture-verse">{{ currentHotspotData.reference }}</p>
            </div>
            <div class="reflection-section">
              <h4>Reflexão</h4>
              <p>{{ currentHotspotData.reflection }}</p>
            </div>
          </div>
          <div class="hotspot-navigation">
            <button class="nav-btn" @click="navigateHotspot('prev')" :disabled="activeHotspot === 0">
              <span class="nav-icon">←</span> Anterior
            </button>
            <button class="nav-btn" @click="navigateHotspot('next')" :disabled="activeHotspot === currentInteractionImage.hotspots.length - 1">
              Próximo <span class="nav-icon">→</span>
            </button>
          </div>
        </div>
      </div>

      <div class="interaction-navigation">
        <button class="nav-btn" @click="previousImage" :disabled="interactionIndex === 0">
          <span class="nav-arrow">←</span> Anterior
        </button>
        <div class="image-info">
          <span class="current-image">Imagem {{ interactionIndex + 1 }} de {{ interactiveImages.length }}</span>
        </div>
        <button class="nav-btn" @click="nextImage" :disabled="interactionIndex === interactiveImages.length - 1">
          Próxima <span class="nav-arrow">→</span>
        </button>
        <button class="complete-btn" @click="completeInteraction">
          Concluir Interação
        </button>
      </div>
    </div>

    <ImersiveNarrative
      v-if="currentStep === 'narration'"
      :slides="visionSlides"
      :typing-speed="40"
      :auto-start-typing="true"
      :auto-fullscreen="true"
      @complete="completeNarration"
      @exit-fullscreen="$emit('exit-fullscreen')"
    />

    <div class="vision-reflection" v-if="currentStep === 'reflection'">
      <h2 class="reflection-title">Reflexão Final</h2>
      <div class="reflection-content">
        <p>Reflita sobre o que você aprendeu durante esta jornada imersiva. Como essas verdades sobre Cristo glorificado podem impactar sua vida diária?</p>
        <div class="reflection-questions">
          <div class="question-item">
            <h3>A Visão do Glorificado</h3>
            <p>Como a visão de Cristo em Sua glória muda sua perspectiva sobre quem Ele é? De que maneira esta visão complementa a imagem do Jesus humilde dos evangelhos?</p>
          </div>
          <div class="question-item">
            <h3>Imagens de Autoridade</h3>
            <p>Quais símbolos de autoridade e poder divino mais te impactaram? De que forma estes símbolos trazem conforto em tempos de perseguição e dificuldade?</p>
          </div>
          <div class="question-item">
            <h3>Aplicação Pessoal</h3>
            <p>Se Jesus caminha entre os candeeiros (as igrejas) hoje, o que Ele veria na sua vida espiritual e na sua comunidade de fé? Como esta compreensão pode transformar sua adoração?</p>
          </div>
        </div>
        <div class="personal-application">
          <h3>Aplicação Pessoal</h3>
          <p>Reserve um momento para refletir sobre como esta experiência da visão de João impactou sua compreensão de Cristo e da igreja. Considere compartilhar estas reflexões com alguém em sua comunidade de fé.</p>
        </div>
        <div class="reflection-actions">
          <button class="complete-btn" @click="completeReflection('next')">
            Completar Reflexão
          </button>
        </div>
      </div>
    </div>

      <button class="fullscreen-btn" @click="toggleFullscreen" v-if="currentStep === 'interaction'">
        <span class="fullscreen-icon">{{ isFullscreen ? '⟲' : '⟱' }}</span>
      </button>
    </div>
  </template>
<style scoped>
.apocalypse-vision {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  animation: fadeIn 1s ease;
  position: relative;
  transition: all 0.5s ease;
}

.fullscreen-mode {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  padding: 0;
  margin: 0;
  overflow: auto;
  z-index: 9999;
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

/* Estilização para a seção de interação */
.vision-interaction {
  position: relative;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  margin-bottom: var(--space-xl);
  animation: fadeIn 0.8s ease;
}

.interactive-wrapper {
  position: relative;
}

.vision-image {
  width: 100%;
  height: auto;
  display: block;
  max-height: 70vh;
  object-fit: contain;
}

/* Estilização do overlay narrativo */
.narrative-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 70%, transparent);
  padding: var(--space-lg);
  color: var(--color-text);
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.narrative-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.narrative-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: var(--space-md);
  font-family: var(--font-family-quote);
  font-style: italic;
}

.narrative-hint {
  font-size: 0.9rem;
  color: var(--color-secondary);
  animation: pulse 2s infinite ease-in-out;
}

/* Botão de tela cheia */
.fullscreen-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.fullscreen-btn:hover {
  background-color: rgba(75, 46, 131, 0.7);
  transform: translateY(-2px);
}

.fullscreen-icon {
  font-size: 1.4rem;
}

@keyframes pulse {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

/* Estilização dos hotspots */
.hotspot {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 5;
  transition: all 0.3s ease;
}

.hotspot-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background-color: var(--color-secondary);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.3), 0 0 10px var(--color-secondary);
  transition: all 0.3s ease;
}

.hotspot.pulsating .hotspot-indicator {
  animation: hotspotPulse 2s infinite;
}

@keyframes hotspotPulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
}
.hotspot.active .hotspot-indicator {
  background-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.5), 0 0 15px var(--color-primary);
  transform: translate(-50%, -50%) scale(1.2);
}

.hotspot:hover .hotspot-indicator {
  transform: translate(-50%, -50%) scale(1.3);
}

/* Estilização do painel de detalhes */
.hotspot-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  padding: var(--space-lg);
  z-index: 6;
  max-height: 70%;
  overflow-y: auto;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: var(--space-sm);
}

.details-header h3 {
  margin: 0;
  color: var(--color-secondary);
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
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

.details-content {
  line-height: 1.7;
}

.details-content p {
  margin-bottom: var(--space-md);
}

.scripture-reference {
  margin-top: var(--space-md);
  padding: var(--space-md);
  background-color: rgba(75, 46, 131, 0.2);
  border-left: 3px solid var(--color-secondary);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.scripture-text {
  font-style: italic;
  margin-bottom: var(--space-xs);
  font-family: var(--font-family-quote);
}

.scripture-verse {
  color: var(--color-secondary);
  font-size: 0.9rem;
  display: block;
  text-align: right;
}

.reflection-section {
  margin-top: var(--space-md);
  padding: var(--space-md);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
}

.reflection-section h4 {
  color: var(--color-secondary);
  margin-bottom: var(--space-sm);
  font-size: 1rem;
}

/* Navegação entre hotspots */
.hotspot-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--space-md);
}

/* Navegação entre imagens */
.interaction-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-background-alt);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.image-info {
  text-align: center;
}

.current-image {
  color: var(--color-secondary);
  font-weight: 600;
}

.nav-btn {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.nav-btn:hover:not(:disabled) {
  background-color: rgba(75, 46, 131, 0.3);
  transform: translateY(-2px);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow, .nav-icon {
  font-size: 1.2rem;
}

.complete-btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
}

.complete-btn:hover:not(:disabled) {
  background-color: var(--color-secondary-light);
}

/* Seção de reflexão final */
.vision-reflection {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--space-xl);
  padding: var(--space-xl);
  animation: fadeIn 1s ease;
}

.reflection-title {
  text-align: center;
  color: var(--color-secondary);
  margin-bottom: var(--space-lg);
  font-size: 1.8rem;
}

.reflection-content {
  max-width: 900px;
  margin: 0 auto;
}

.reflection-content > p {
  text-align: center;
  margin-bottom: var(--space-xl);
  font-size: 1.1rem;
  line-height: 1.7;
}

.reflection-questions {
  margin-bottom: var(--space-xl);
}

.question-item {
  margin-bottom: var(--space-lg);
  padding: var(--space-md);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-primary);
}

.question-item h3 {
  color: var(--color-secondary);
  margin-bottom: var(--space-sm);
  font-size: 1.2rem;
}

.question-item p {
  line-height: 1.7;
}

.personal-application {
  padding: var(--space-lg);
  background-color: rgba(75, 46, 131, 0.2);
  border-radius: var(--radius-md);
  margin-top: var(--space-lg);
}

.personal-application h3 {
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
  text-align: center;
}

.reflection-actions {
  text-align: center;
  margin-top: var(--space-xl);
}

/* Transições */
.detail-fade-enter-active, .detail-fade-leave-active {
  transition: all 0.3s ease;
}
.detail-fade-enter-from, .detail-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsividade */
@media (max-width: 768px) {
  .apocalypse-vision {
    padding: 1rem 0.5rem;
  }

  .fullscreen-mode {
    padding: 0;
  }

  .block-title {
    font-size: 1.5rem;
  }

  .narrative-content p {
    font-size: 1rem;
  }

  .hotspot-details {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 60vh;
    overflow-y: auto;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    z-index: 100;
  }

  .interaction-navigation {
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  .image-info {
    order: -1;
    width: 100%;
    margin-bottom: var(--space-sm);
  }

  .nav-btn {
    flex: 1;
    justify-content: center;
  }

  .vision-reflection {
    padding: var(--space-md);
  }

  .reflection-title {
    font-size: 1.5rem;
  }

  .intro-steps {
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
  }

  .intro-step {
    width: 100%;
    max-width: 100%;
  }

  .begin-btn {
    width: 100%;
    justify-content: center;
  }

  .fullscreen-btn {
    bottom: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}

/* Suporte para telas pequenas */
@media (max-width: 480px) {
  .block-subtitle {
    font-size: 0.9rem;
  }

  .hotspot {
    width: 44px; /* Área de toque ligeiramente aumentada para telas menores */
    height: 44px;
  }

  .details-header h3 {
    font-size: 1.1rem;
  }

  .scripture-text,
  .details-content p {
    font-size: 0.9rem;
  }

  .question-item {
    padding: var(--space-sm);
  }

  .question-item h3 {
    font-size: 1.1rem;
  }

  .personal-application {
    padding: var(--space-md);
  }
}

/* Melhorias de acessibilidade */
.hotspot:focus .hotspot-indicator,
.nav-btn:focus,
.close-btn:focus,
.begin-btn:focus,
.fullscreen-btn:focus {
  outline: 2px solid var(--color-secondary);
  outline-offset: 2px;
}

/* Animações aprimoradas */
@keyframes floatIn {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.question-item {
  animation: floatIn 0.5s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.1s);
}

.question-item:nth-child(1) { --index: 1; }
.question-item:nth-child(2) { --index: 2; }
.question-item:nth-child(3) { --index: 3; }

/* Efeitos de hover aprimorados */
.nav-btn:hover:not(:disabled) {
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.hotspot:hover .hotspot-indicator {
  box-shadow: 0 0 0 4px rgba(196, 180, 84, 0.3), 0 0 15px var(--color-secondary);
}

/* Estilização da barra de rolagem para os painéis com scroll */
.hotspot-details::-webkit-scrollbar,
.reflection-content::-webkit-scrollbar {
  width: 8px;
}

.hotspot-details::-webkit-scrollbar-track,
.reflection-content::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.2);
  border-radius: 4px;
}

.hotspot-details::-webkit-scrollbar-thumb,
.reflection-content::-webkit-scrollbar-thumb {
  background-color: rgba(196, 180, 84, 0.3);
  border-radius: 4px;
}

.hotspot-details::-webkit-scrollbar-thumb:hover,
.reflection-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(196, 180, 84, 0.5);
}

/* Estado de carregamento e transições refinadas */
.vision-image {
  transition: opacity 0.5s ease, transform 1s ease;
  opacity: 0;
}

.vision-image.loaded {
  opacity: 1;
  transform: scale(1);
}

.vision-image:not(.loaded) {
  transform: scale(0.98);
}

/* Estado de foco para acessibilidade */
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-secondary);
  outline-offset: 2px;
}

/* Estilos de impressão para quando o usuário quiser imprimir a reflexão */
@media print {
  .apocalypse-vision {
    padding: 0;
    max-width: 100%;
  }

  .block-header,
  .vision-reflection {
    border: none;
    box-shadow: none;
    background: none;
  }

  .nav-btn,
  .interaction-navigation,
  .begin-btn,
  .fullscreen-btn {
    display: none !important;
  }

  body {
    background-color: white !important;
    color: black !important;
  }

  .reflection-title,
  .question-item h3,
  .personal-application h3 {
    color: #333 !important;
  }

  .question-item,
  .personal-application {
    border: 1px solid #ccc;
    background: none;
  }
}
</style>
