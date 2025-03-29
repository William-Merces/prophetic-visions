<template>
  <div class="apocalypse-chapter" ref="chapterContainer">
    <!-- Fundo imersivo com estrelas e efeitos visuais -->
    <ImmersiveBackground theme="revelation" :intensity="1.5" :hasParticles="true">
      <!-- Cabeçalho do capítulo -->
      <div class="chapter-header">
        <h1 class="chapter-title">Apocalipse 1</h1>
        <h2 class="chapter-subtitle">A Visão do Filho do Homem</h2>
      </div>

      <!-- Navegação do progresso -->
      <div class="progress-navigation">
        <div
          v-for="stage in stages"
          :key="stage.id"
          class="progress-stage"
          :class="{
            'active': currentStage >= stage.id,
            'current': currentStage === stage.id
          }"
          @click="navigateToStage(stage.id)"
        >
          <div class="stage-number">{{ stage.id }}</div>
          <div class="stage-info">
            <div class="stage-name">{{ stage.name }}</div>
            <div class="stage-description">{{ stage.description }}</div>
          </div>
        </div>
      </div>

      <!-- Conteúdo da etapa atual -->
      <div class="stage-content">
        <!-- Etapa 1: O Cenário -->
        <div v-if="currentStage === 1" class="stage-container context-stage">
          <div class="stage-section">
            <h3 class="section-title">O Cenário Histórico</h3>

            <div class="context-slider">
              <div class="slider-controls">
                <button
                  class="control-btn prev-btn"
                  @click="prevContextSlide"
                  :disabled="currentContextSlide === 0"
                >
                  <span class="control-icon">←</span>
                </button>

                <div class="slide-indicators">
                  <div
                    v-for="(_, index) in contextSlides"
                    :key="index"
                    class="slide-indicator"
                    :class="{ 'active': currentContextSlide === index }"
                    @click="goToContextSlide(index)"
                  ></div>
                </div>

                <button
                  class="control-btn next-btn"
                  @click="nextContextSlide"
                  :disabled="currentContextSlide === contextSlides.length - 1"
                >
                  <span class="control-icon">→</span>
                </button>
              </div>

              <transition name="slide" mode="out-in">
                <div
                  :key="currentContextSlide"
                  class="context-slide"
                  :style="{ backgroundImage: `url(${contextSlides[currentContextSlide].image})` }"
                >
                  <div class="slide-overlay" :class="contextSlides[currentContextSlide].overlayClass"></div>
                  <div class="slide-content">
                    <h3 class="slide-title">{{ contextSlides[currentContextSlide].title }}</h3>
                    <div class="slide-text">
                      <p v-for="(paragraph, idx) in contextSlides[currentContextSlide].text" :key="idx">
                        {{ paragraph }}
                      </p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <div class="stage-actions">
              <button class="action-btn next-stage-btn" @click="completeCurrentStage">
                Próximo: A Revelação <span class="btn-icon">→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Etapa 2: A Revelação -->
        <div v-if="currentStage === 2" class="stage-container revelation-stage">
          <div class="stage-section">
            <h3 class="section-title">A Revelação Divina</h3>

            <div class="revelation-experience">
              <div class="experience-controls">
                <button
                  class="control-btn prev-btn"
                  @click="prevRevelationSlide"
                  :disabled="currentRevelationSlide === 0"
                >
                  <span class="control-icon">←</span>
                </button>

                <div class="slide-indicators">
                  <div
                    v-for="(_, index) in revelationSlides"
                    :key="index"
                    class="slide-indicator"
                    :class="{ 'active': currentRevelationSlide === index }"
                    @click="goToRevelationSlide(index)"
                  ></div>
                </div>

                <button
                  class="control-btn next-btn"
                  @click="nextRevelationSlide"
                  :disabled="currentRevelationSlide === revelationSlides.length - 1"
                >
                  <span class="control-icon">→</span>
                </button>
              </div>

              <transition name="fade" mode="out-in">
                <div
                  :key="currentRevelationSlide"
                  class="revelation-scene"
                  :style="{ backgroundImage: `url(${revelationSlides[currentRevelationSlide].image})` }"
                >
                  <div class="scene-overlay" :class="revelationSlides[currentRevelationSlide].overlayClass"></div>

                  <!-- Efeitos especiais com base na cena atual -->
                  <div v-if="revelationSlides[currentRevelationSlide].effects" class="scene-effects">
                    <div
                      v-for="(effect, idx) in revelationSlides[currentRevelationSlide].effects"
                      :key="idx"
                      :class="effect"
                    ></div>
                  </div>

                  <div class="scene-content">
                    <h3 class="scene-title">{{ revelationSlides[currentRevelationSlide].title }}</h3>
                    <div class="scene-narrative">
                      <p v-for="(paragraph, idx) in revelationSlides[currentRevelationSlide].narrative" :key="idx">
                        {{ paragraph }}
                      </p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <div class="stage-actions">
              <button class="action-btn prev-stage-btn" @click="previousStage">
                <span class="btn-icon">←</span> Voltar: O Cenário
              </button>
              <button class="action-btn next-stage-btn" @click="completeCurrentStage">
                Próximo: O Significado <span class="btn-icon">→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Etapa 3: O Significado -->
        <div v-if="currentStage === 3" class="stage-container meaning-stage">
          <div class="stage-section">
            <h3 class="section-title">O Significado dos Símbolos</h3>

            <div class="symbols-introduction">
              <p>A visão de João do Filho do Homem está repleta de simbolismo poderoso. Cada elemento transmite um significado teológico profundo sobre a natureza e o caráter de Cristo glorificado.</p>
            </div>

            <div class="symbols-grid">
              <div
                v-for="(symbol, index) in symbols"
                :key="index"
                class="symbol-card"
                :class="{ 'expanded': expandedSymbol === index }"
                @click="toggleSymbol(index)"
              >
                <div class="symbol-header">
                  <div class="symbol-icon">{{ symbol.icon }}</div>
                  <h4 class="symbol-name">{{ symbol.name }}</h4>
                  <div class="expand-icon">{{ expandedSymbol === index ? '−' : '+' }}</div>
                </div>

                <transition name="expand">
                  <div v-if="expandedSymbol === index" class="symbol-details">
                    <p class="symbol-description">{{ symbol.description }}</p>

                    <div class="scripture-reference">
                      <p class="scripture-text">"{{ symbol.scripture }}"</p>
                      <span class="scripture-ref">{{ symbol.reference }}</span>
                    </div>

                    <div class="symbol-meaning">
                      <h5>Significado:</h5>
                      <p>{{ symbol.meaning }}</p>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <div class="final-reflection">
              <h4>Reflexão</h4>
              <p>Esta visão inicial estabelece o tom para todo o livro do Apocalipse. João vê Cristo em toda Sua glória divina, não mais como o servo humilde, mas como o Rei eterno e vitorioso. Os símbolos revelam Sua autoridade, sabedoria, pureza, poder e domínio sobre a morte.</p>
              <p>A mensagem é clara para as igrejas que sofrem perseguição: Cristo está presente entre elas, conhece suas lutas, e já conquistou a vitória final sobre todos os inimigos.</p>
            </div>

            <div class="stage-actions">
              <button class="action-btn prev-stage-btn" @click="previousStage">
                <span class="btn-icon">←</span> Voltar: A Revelação
              </button>
              <button class="action-btn complete-btn" @click="completeChapter">
                Concluir Capítulo <span class="btn-icon">✓</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botões fixos de navegação -->
      <div class="fixed-navigation">
        <button class="nav-btn back-btn" @click="exitExperience" title="Voltar à seleção de capítulos">
          <span class="nav-icon">←</span>
        </button>
        <button class="nav-btn fullscreen-btn" @click="toggleFullscreen" title="Alternar tela cheia">
          <span class="nav-icon">{{ isFullscreen ? '⟲' : '⟱' }}</span>
        </button>
      </div>
    </ImmersiveBackground>

    <!-- Modal de conclusão -->
    <transition name="modal">
      <div v-if="showCompletionModal" class="completion-modal">
        <div class="modal-backdrop" @click="closeCompletionModal"></div>
        <div class="modal-content">
          <h3 class="modal-title">Capítulo Concluído!</h3>
          <div class="modal-message">
            <p>Você completou com sucesso sua jornada através do primeiro capítulo do Apocalipse.</p>
            <p>Você experimentou a visão impressionante que João teve do Filho do Homem glorificado e explorou o significado dos símbolos proféticos.</p>
          </div>
          <div class="modal-actions">
            <button class="action-btn" @click="returnToChapterSelection">
              Voltar à Seleção de Capítulos
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ImmersiveBackground from '@/components/common/ImmersiveBackground.vue';

export default {
  name: 'ApocalypseChapter1',
  components: {
    ImmersiveBackground
  },
  data() {
    return {
      // Estado atual da experiência
      currentStage: 1,
      isFullscreen: false,
      showCompletionModal: false,

      // Etapas disponíveis
      stages: [
        {
          id: 1,
          name: 'O Cenário',
          description: 'Contexto histórico da revelação'
        },
        {
          id: 2,
          name: 'A Revelação',
          description: 'A visão do Filho do Homem'
        },
        {
          id: 3,
          name: 'O Significado',
          description: 'Interpretação dos símbolos'
        }
      ],

      // Controle dos slides
      currentContextSlide: 0,
      currentRevelationSlide: 0,
      expandedSymbol: null,

      // Conteúdo da etapa 1: Contexto
      contextSlides: [
        {
          title: "Roma, 95 d.C.",
          image: "/images/apocalypse/rome-empire-map.jpg",
          overlayClass: "dark",
          text: [
            "O Império Romano controla todo o mundo conhecido, de Gibraltar até a Mesopotâmia, do Norte da África até a Britânia.",
            "O imperador Domiciano exige ser adorado como 'Senhor e Deus', estabelecendo o culto imperial em todas as províncias.",
            "Aqueles que se recusam a oferecer incenso ao imperador são considerados inimigos do estado."
          ]
        },
        {
          title: "Tempos de Perseguição",
          image: "/images/apocalypse/roman-persecution.jpg",
          overlayClass: "dramatic",
          text: [
            "Para os seguidores de Cristo, recusar-se a adorar o imperador significa enfrentar perseguição: confisco de bens, proibição de comércio, prisão, exílio ou morte.",
            "Muitos cristãos escolhem a morte em vez de negar sua fé, tornando-se mártires — testemunhas que selam seu testemunho com sangue.",
            "As comunidades cristãs se reúnem em segredo, usando símbolos como o peixe (ICHTHYS) para identificar uns aos outros."
          ]
        },
        {
          title: "João, O Último Apóstolo",
          image: "/images/apocalypse/apostle-john.jpg",
          overlayClass: "light",
          text: [
            "Entre os perseguidos está João, o último apóstolo vivo, agora com cerca de 90 anos de idade.",
            "Ele carrega as memórias de ter caminhado com Jesus, de ter repousado em Seu peito durante a Última Ceia, de ter permanecido aos pés da cruz.",
            "Após décadas servindo como pastor e líder espiritual, João vê as igrejas que fundou enfrentando sua maior prova."
          ]
        },
        {
          title: "Exílio em Patmos",
          image: "/images/apocalypse/patmos-island.jpg",
          overlayClass: "dark",
          text: [
            "Por seu testemunho inabalável, João foi exilado para Patmos — uma ilha rochosa e árida no Mar Egeu, usada como colônia penal romana.",
            "Separado das congregações que pastoreava, mas não de seu Senhor, João continua em comunhão com Deus através da oração.",
            "A ilha torna-se não apenas seu lugar de exílio, mas o ponto de encontro entre o céu e a terra."
          ]
        },
        {
          title: "Igrejas em Crise",
          image: "/images/apocalypse/asian-churches.jpg",
          overlayClass: "dramatic",
          text: [
            "As sete igrejas da Ásia que João pastoreava estão em crise: perseguição externa, falsos ensinamentos internos, alguns abandonando a fé.",
            "Éfeso perdeu seu primeiro amor. Pérgamo compromete-se com doutrinas falsas. Tiatira tolera a imoralidade. Sardes está espiritualmente morta.",
            "Eles precisam desesperadamente de esperança e direção para perseverar nos tempos sombrios."
          ]
        },
        {
          title: "O Dia do Senhor",
          image: "/images/apocalypse/john-praying-patmos.jpg",
          overlayClass: "light",
          text: [
            "É domingo, o Dia do Senhor, em Patmos. João está em oração, sozinho nas rochosas encostas da ilha.",
            "No silêncio da adoração, seu espírito se eleva além do exílio terreno, além das limitações da carne e do tempo.",
            "Ele não sabe que está prestes a receber a maior revelação da história — um vislumbre do plano divino que se desdobrará até o fim dos tempos."
          ]
        }
      ],

      // Conteúdo da etapa 2: Revelação
      revelationSlides: [
        {
          title: "Arrebatado em Espírito",
          image: "/images/apocalypse/spirit-veil.jpg",
          overlayClass: "light",
          effects: ["celestial-rays"],
          narrative: [
            "Uma sensação sobrenatural percorre seu corpo. Não é mais a brisa marítima que toca sua pele, mas algo diferente... algo transcendente.",
            "Você já não está mais em Patmos. Pelo menos não fisicamente. É como se existisse simultaneamente em dois reinos, com seus sentidos espirituais despertados."
          ]
        },
        {
          title: "A Voz como de Trombeta",
          image: "/images/apocalypse/heavenly-voice.jpg",
          overlayClass: "dramatic",
          effects: ["celestial-rays", "holy-light"],
          narrative: [
            "De repente, uma voz ressoa atrás de você - não como uma voz humana, mas poderosa como uma trombeta celestial.",
            "Ela reverbera não apenas em seus ouvidos, mas em todo o seu ser: 'EU SOU O ALFA E O ÔMEGA, O PRIMEIRO E O ÚLTIMO!'"
          ]
        },
        {
          title: "Os Sete Candeeiros",
          image: "/images/apocalypse/seven-lampstands.jpg",
          overlayClass: "dark",
          effects: ["holy-light"],
          narrative: [
            "Ao se virar para ver quem fala, a realidade ao seu redor se transforma...",
            "Diante de seus olhos, sete candeeiros de ouro surgem, brilhando com uma luz sobrenatural que não provém de chama alguma."
          ]
        },
        {
          title: "O Filho do Homem",
          image: "/images/apocalypse/son-of-man.jpg",
          overlayClass: "dramatic",
          effects: ["divine-presence", "holy-light"],
          narrative: [
            "Entre os candeeiros, surge uma figura que paralisa seu ser inteiro.",
            "Alguém 'semelhante ao Filho do Homem'. Mas não é o humilde carpinteiro da Galileia...",
            "É Cristo em sua glória divina revelada em toda sua magnitude."
          ]
        },
        {
          title: "Sua Aparência Divina",
          image: "/images/apocalypse/divine-appearance.jpg",
          overlayClass: "light",
          effects: ["divine-presence", "holy-light"],
          narrative: [
            "Seus olhos mal conseguem suportar a visão.",
            "Cabelos brancos como neve irradiam sabedoria eterna. Olhos como chamas de fogo parecem enxergar através de sua alma.",
            "Seus pés, como bronze polido, pisam entre os candeeiros com autoridade divina."
          ]
        },
        {
          title: "Seu Poder e Glória",
          image: "/images/apocalypse/christ-glory.jpg",
          overlayClass: "dramatic",
          effects: ["divine-presence", "holy-light"],
          narrative: [
            "Em sua mão direita, sete estrelas brilham intensamente. De sua boca sai uma espada afiada de dois gumes.",
            "Seu rosto... é como contemplar o sol do meio-dia sem proteção.",
            "A glória é insuportável. O temor, esmagador."
          ]
        },
        {
          title: "Prostrado como Morto",
          image: "/images/apocalypse/john-fallen.jpg",
          overlayClass: "dark",
          effects: [],
          narrative: [
            "Você cai aos seus pés como morto.",
            "Nenhuma força resta em seu corpo. Nenhuma palavra sai de seus lábios.",
            "Diante de tal majestade, você é apenas pó e cinzas."
          ]
        },
        {
          title: "Conforto Divino",
          image: "/images/apocalypse/divine-touch.jpg",
          overlayClass: "light",
          effects: ["divine-presence"],
          narrative: [
            "Então, quando pensa que não pode suportar mais, uma mão toca seu ombro.",
            "A mesma mão que segura as sete estrelas agora traz conforto, e você ouve:",
            "'Não tenha medo. EU SOU o Primeiro e o Último, o que vive. Estive morto, mas eis que estou vivo para todo o sempre! E tenho as chaves da morte e do Hades.'"
          ]
        }
      ],

      // Conteúdo da etapa 3: Significado
      symbols: [
        {
          name: "Os Sete Candeeiros de Ouro",
          icon: "🕯️",
          description: "João viu sete candeeiros de ouro, com Cristo andando entre eles.",
          scripture: "O mistério das sete estrelas... e dos sete candeeiros de ouro. Os sete candeeiros que viste são as sete igrejas.",
          reference: "Apocalipse 1:20",
          meaning: "Os candeeiros representam as sete igrejas da Ásia. Como candeeiros, a função da Igreja é refletir a luz de Cristo no mundo. O ouro simboliza o valor e a preciosidade da Igreja aos olhos de Deus."
        },
        {
          name: "Vestes Longas e Cinto de Ouro",
          icon: "👘",
          description: "Cristo aparece vestido com uma roupa que chegava até os pés e um cinto de ouro ao peito.",
          scripture: "...vestido com uma roupa que chegava até aos pés, e cingido pelo peito com um cinto de ouro.",
          reference: "Apocalipse 1:13",
          meaning: "As vestes longas e o cinto remetem às vestimentas do Sumo Sacerdote no Antigo Testamento. Cristo é mostrado em Seu ofício sacerdotal, mediando entre Deus e a humanidade. O cinto de ouro simboliza realeza e dignidade."
        },
        {
          name: "Cabelos Brancos como Lã",
          icon: "⚪",
          description: "Os cabelos de Cristo são descritos como brancos, como lã, como neve.",
          scripture: "E a sua cabeça e cabelos eram brancos como lã branca, como a neve...",
          reference: "Apocalipse 1:14",
          meaning: "Cabelos brancos simbolizam sabedoria, pureza e eternidade. Esta imagem conecta Cristo ao 'Ancião de Dias' em Daniel 7:9, declarando Sua divindade e natureza eterna, compartilhada com o Pai."
        },
        {
          name: "Olhos como Chama de Fogo",
          icon: "🔥",
          description: "Os olhos de Cristo são descritos como chamas de fogo ardentes.",
          scripture: "E os seus olhos eram como chama de fogo.",
          reference: "Apocalipse 1:14",
          meaning: "Olhos de fogo simbolizam discernimento perfeito, julgamento penetrante e conhecimento completo. Nada pode ser escondido da vista de Cristo - Ele vê através de todas as pretensões e enganos."
        },
        {
          name: "Pés como Bronze Polido",
          icon: "🦶",
          description: "Seus pés são semelhantes ao bronze refinado numa fornalha ardente.",
          scripture: "E os seus pés, semelhantes a latão reluzente, como se tivessem sido refinados numa fornalha...",
          reference: "Apocalipse 1:15",
          meaning: "O bronze refinado no fogo representa pureza, estabilidade e julgamento. Os pés simbolizam o fundamento sobre o qual Cristo se mantém - imutável e inabalável. Também sugere Seu poder para esmagar Seus inimigos."
        },
        {
          name: "Voz como Muitas Águas",
          icon: "🌊",
          description: "Sua voz é descrita como o som de muitas águas.",
          scripture: "E a sua voz era como a voz de muitas águas.",
          reference: "Apocalipse 1:15",
          meaning: "A voz como muitas águas evoca o poder esmagador de cataratas ou do oceano - irresistível, majestosa e autorizada. É a voz do Criador que falou e o universo veio à existência."
        },
        {
          name: "Sete Estrelas na Mão Direita",
          icon: "⭐",
          description: "Cristo segura sete estrelas em Sua mão direita.",
          scripture: "Tinha na sua destra sete estrelas... As sete estrelas são os anjos das sete igrejas.",
          reference: "Apocalipse 1:16, 20",
          meaning: "As estrelas representam os 'anjos' ou mensageiros/líderes das sete igrejas. Estando na mão direita de Cristo, simboliza que Ele os protege, dirige e tem autoridade sobre eles. A liderança da igreja é um dom de Cristo para Seu povo."
        },
        {
          name: "Espada de Dois Gumes",
          icon: "⚔️",
          description: "Da boca de Cristo sai uma espada afiada de dois gumes.",
          scripture: "E da sua boca saía uma aguda espada de dois fios...",
          reference: "Apocalipse 1:16",
          meaning: "A espada representa a Palavra de Deus - penetrante, poderosa e decisiva. Saindo de Sua boca, mostra que Suas palavras têm poder de julgamento e de separar a verdade da mentira."
        },
        {
          name: "Face como o Sol",
          icon: "☀️",
          description: "O rosto de Cristo brilha com intensidade insuportável, como o sol do meio-dia.",
          scripture: "E o seu rosto era como o sol, quando resplandece na sua força.",
          reference: "Apocalipse 1:16",
          meaning: "O rosto que foi cuspido e golpeado agora brilha como o sol em sua força. A humilhação deu lugar à exaltação suprema. O mesmo Jesus que foi desprezado agora é a fonte de toda luz e glória."
        },
        {
          name: "As Chaves da Morte e do Hades",
          icon: "🔑",
          description: "Cristo declara que possui as chaves da morte e do Hades (o reino dos mortos).",
          scripture: "E o que vive; fui morto, mas eis aqui estou vivo para todo o sempre, Amém. E tenho as chaves da morte e do inferno.",
          reference: "Apocalipse 1:18",
          meaning: "Chaves simbolizam autoridade e acesso. Ao possuir as chaves da morte e do Hades, Cristo demonstra que venceu os maiores inimigos da humanidade através de Sua própria morte e ressurreição. Ele agora controla o destino eterno de todos e pode libertar os cativos."
        }
      ]
    };
  },
  methods: {
    // Navegação entre etapas
    navigateToStage(stageId) {
      // Permite navegação apenas para etapas já vistas ou a próxima
      if (stageId <= Math.max(this.currentStage, 1)) {
        this.currentStage = stageId;
        this.scrollToTop();
      }
    },

    completeCurrentStage() {
      if (this.currentStage < 3) {
        this.currentStage++;
        this.scrollToTop();
      }
    },

    previousStage() {
      if (this.currentStage > 1) {
        this.currentStage--;
        this.scrollToTop();
      }
    },

    completeChapter() {
      // Mostrar modal de conclusão
      this.showCompletionModal = true;

      // Emitir evento para o componente pai
      this.$emit('complete', 1);

      // Salvar progresso no localStorage
      this.saveProgress();
    },

    saveProgress() {
      try {
        const progress = JSON.parse(localStorage.getItem('apocalypse-progress') || '{}');
        progress['chapter-1'] = {
          completed: true,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('apocalypse-progress', JSON.stringify(progress));
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
      }
    },

    // Navegação entre slides da etapa 1
    prevContextSlide() {
      if (this.currentContextSlide > 0) {
        this.currentContextSlide--;
      }
    },

    nextContextSlide() {
      if (this.currentContextSlide < this.contextSlides.length - 1) {
        this.currentContextSlide++;
      }
    },

    goToContextSlide(index) {
      if (index >= 0 && index < this.contextSlides.length) {
        this.currentContextSlide = index;
      }
    },

    // Navegação entre slides da etapa 2
    prevRevelationSlide() {
      if (this.currentRevelationSlide > 0) {
        this.currentRevelationSlide--;
      }
    },

    nextRevelationSlide() {
      if (this.currentRevelationSlide < this.revelationSlides.length - 1) {
        this.currentRevelationSlide++;
      }
    },

    goToRevelationSlide(index) {
      if (index >= 0 && index < this.revelationSlides.length) {
        this.currentRevelationSlide = index;
      }
    },

// Interação com cartões de símbolos
toggleSymbol(index) {
      if (this.expandedSymbol === index) {
        this.expandedSymbol = null;
      } else {
        this.expandedSymbol = index;

        // Scrollar para o símbolo expandido em dispositivos móveis
        if (window.innerWidth <= 768) {
          this.$nextTick(() => {
            const symbolElement = document.querySelectorAll('.symbol-card')[index];
            if (symbolElement) {
              symbolElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          });
        }
      }
    },

    // Navegação geral
    scrollToTop() {
      // Rolagem suave para o topo da seção de conteúdo
      window.scrollTo({
        top: this.$refs.chapterContainer.offsetTop - 70, // Offset para o cabeçalho fixo
        behavior: 'smooth'
      });
    },

    exitExperience() {
      // Sair do modo tela cheia, se estiver ativo
      if (this.isFullscreen) {
        this.exitFullscreenMode();
      }

      // Navegar de volta para a seleção de capítulos
      this.$router.push('/apocalypse');
    },

    returnToChapterSelection() {
      this.closeCompletionModal();
      this.exitExperience();
    },

    closeCompletionModal() {
      this.showCompletionModal = false;
    },

    // Controle de tela cheia
    toggleFullscreen() {
      if (!this.isFullscreen) {
        this.enterFullscreenMode();
      } else {
        this.exitFullscreenMode();
      }
    },

    enterFullscreenMode() {
      const element = this.$refs.chapterContainer;

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },

    exitFullscreenMode() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },

    handleFullscreenChange() {
      this.isFullscreen = !!(document.fullscreenElement ||
                            document.mozFullScreenElement ||
                            document.webkitFullscreenElement ||
                            document.msFullscreenElement);
    },

    // Navegação por teclado
    handleKeydown(event) {
      // Navegação por teclado para etapas
      if (event.key === 'ArrowRight' && !this.showCompletionModal) {
        if (this.currentStage === 1) {
          this.nextContextSlide();
        } else if (this.currentStage === 2) {
          this.nextRevelationSlide();
        }
      } else if (event.key === 'ArrowLeft' && !this.showCompletionModal) {
        if (this.currentStage === 1) {
          this.prevContextSlide();
        } else if (this.currentStage === 2) {
          this.prevRevelationSlide();
        }
      } else if (event.key === 'Escape') {
        if (this.isFullscreen) {
          this.exitFullscreenMode();
        } else if (this.showCompletionModal) {
          this.closeCompletionModal();
        }
      }
    }
  },
  mounted() {
    // Adicionar listeners para o modo tela cheia
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);

    // Adicionar listener para navegação por teclado
    window.addEventListener('keydown', this.handleKeydown);

    // Verificar se há um parâmetro de etapa na URL
    const stageParam = this.$route.query.stage;
    if (stageParam && !isNaN(parseInt(stageParam))) {
      const stage = parseInt(stageParam);
      if (stage >= 1 && stage <= 3) {
        this.currentStage = stage;
      }
    }
  },
  beforeUnmount() {
    // Remover listeners
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
    window.removeEventListener('keydown', this.handleKeydown);

    // Garantir que o modo tela cheia seja desativado
    if (this.isFullscreen) {
      this.exitFullscreenMode();
    }
  }
}
</script>

<style scoped>
.apocalypse-chapter {
  min-height: 100vh;
  position: relative;
}

/* Cabeçalho */
.chapter-header {
  text-align: center;
  padding: 3rem 1rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.chapter-title {
  font-size: 3rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
  animation: glow 3s infinite alternate;
  letter-spacing: 0.05em;
}

.chapter-subtitle {
  font-size: 1.5rem;
  color: var(--color-text);
  font-family: var(--font-family-quote);
  font-style: italic;
}

/* Navegação de progresso */
.progress-navigation {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  padding: 0 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.progress-stage {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.7;
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: 250px;
}

.progress-stage.active {
  opacity: 1;
  background-color: rgba(75, 46, 131, 0.3);
  border-color: var(--color-secondary);
}

.progress-stage.current {
  transform: scale(1.03);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stage-number {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  font-weight: bold;
  color: var(--color-text-muted);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.progress-stage.active .stage-number {
  background-color: var(--color-secondary);
  color: var(--color-background);
  border-color: var(--color-secondary);
}

.stage-info {
  flex: 1;
}

.stage-name {
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: var(--color-secondary-light);
}

.stage-description {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* Conteúdo da etapa */
.stage-content {
  padding: 1rem;
}

.stage-container {
  max-width: 1000px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: fadeIn 0.8s ease;
}

.stage-section {
  padding: 2rem;
}

.section-title {
  text-align: center;
  color: var(--color-secondary);
  font-size: 2rem;
  margin-bottom: 2rem;
}

/* Slider da etapa 1 */
.context-slider {
  position: relative;
  margin-bottom: 2rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.slider-controls {
  position: absolute;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 10;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.control-btn:hover:not(:disabled) {
  background-color: rgba(75, 46, 131, 0.6);
  transform: translateY(-3px);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-icon {
  font-size: 1.2rem;
}

.slide-indicators {
  display: flex;
  gap: 0.5rem;
}

.slide-indicator {
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.slide-indicator.active {
  background-color: var(--color-secondary);
  transform: scale(1.2);
}

.context-slide {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.slide-overlay.dark {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
}

.slide-overlay.light {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4));
}

.slide-overlay.dramatic {
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8));
}

.slide-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-text);
  max-width: 700px;
  margin: 0 auto;
}

.slide-title {
  font-size: 2rem;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}

.slide-text p {
  margin-bottom: 1rem;
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  font-size: 1.1rem;
}

/* Experiência de revelação da etapa 2 */
.revelation-experience {
  position: relative;
  margin-bottom: 2rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.experience-controls {
  position: absolute;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 10;
}

.revelation-scene {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.scene-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.scene-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}

.holy-light {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, rgba(255, 253, 230, 0.4) 0%, rgba(255, 253, 230, 0) 70%);
  animation: pulse-light 8s infinite alternate;
}

.celestial-rays {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 253, 230, 0.1) 0%,
    rgba(255, 253, 230, 0) 50%,
    rgba(255, 253, 230, 0.1) 100%
  );
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

.scene-content {
  position: relative;
  z-index: 3;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-text);
  max-width: 700px;
  margin: 0 auto;
}

.scene-title {
  font-size: 2rem;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}

.scene-narrative p {
  margin-bottom: 1rem;
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  font-size: 1.1rem;
}

/* Símbolos da etapa 3 */
.symbols-introduction {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem;
}

.symbols-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.symbol-card {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.symbol-card:hover {
  background-color: rgba(75, 46, 131, 0.3);
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.1);
}

.symbol-card.expanded {
  background-color: rgba(75, 46, 131, 0.3);
  border-color: var(--color-secondary);
  grid-column: 1 / -1;
  cursor: default;
}

.symbol-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}

.symbol-icon {
  font-size: 1.5rem;
}

.symbol-name {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  color: var(--color-text);
}

.expand-icon {
  font-size: 1.2rem;
  color: var(--color-text-muted);
  transition: transform var(--transition-normal);
}

.symbol-card.expanded .expand-icon {
  transform: rotate(180deg);
}

.symbol-details {
  padding: 0 1rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.symbol-description {
  grid-column: 1 / -1;
  line-height: 1.6;
}

.scripture-reference {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  border-left: 3px solid var(--color-secondary);
  grid-column: 1;
  grid-row: 2;
}

.scripture-text {
  font-family: var(--font-family-quote);
  font-style: italic;
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

.scripture-ref {
  display: block;
  text-align: right;
  color: var(--color-secondary);
  font-weight: 500;
}

.symbol-meaning {
  grid-column: 2;
  grid-row: 2;
}

.symbol-meaning h5 {
  color: var(--color-secondary-light);
  margin-bottom: 0.5rem;
}

/* Reflexão final */
.final-reflection {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  margin-bottom: 2rem;
  border-left: 3px solid var(--color-secondary);
}

.final-reflection h4 {
  color: var(--color-secondary);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.final-reflection p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.final-reflection p:last-child {
  margin-bottom: 0;
}

/* Botões de ação da etapa */
.stage-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font-family-heading);
  font-weight: 500;
}

.next-stage-btn {
  background-color: var(--color-secondary);
  color: var(--color-background);
}

.next-stage-btn:hover {
  background-color: var(--color-secondary-light);
  transform: translateY(-3px);
}

.prev-stage-btn {
  background-color: rgba(0, 0, 0, 0.3);
  color: var(--color-text);
}

.prev-stage-btn:hover {
  background-color: rgba(0, 0, 0, 0.5);
  transform: translateY(-3px);
}

.complete-btn {
  background-color: var(--color-success);
  color: var(--color-background);
  border-color: var(--color-success);
}

.complete-btn:hover {
  transform: translateY(-3px);
  filter: brightness(1.1);
}

.btn-icon {
  transition: transform var(--transition-fast);
}

.next-stage-btn:hover .btn-icon,
.complete-btn:hover .btn-icon {
  transform: translateX(3px);
}

.prev-stage-btn:hover .btn-icon {
  transform: translateX(-3px);
}

/* Navegação fixa */
.fixed-navigation {
  position: fixed;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 100;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.nav-btn:hover {
  background-color: rgba(75, 46, 131, 0.6);
  transform: translateY(-3px);
}

.nav-icon {
  font-size: 1.2rem;
}

/* Modal de conclusão */
.completion-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: scaleIn 0.3s ease forwards;
}

.modal-title {
  color: var(--color-secondary);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-message {
  margin-bottom: 2rem;
}

.modal-message p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

/* Animações */
@keyframes glow {
  0%, 100% { text-shadow: 0 0 15px rgba(196, 180, 84, 0.5); }
  50% { text-shadow: 0 0 25px rgba(196, 180, 84, 0.8); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
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

/* Transições */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-out;
  max-height: 1000px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsividade */
@media (max-width: 992px) {
  .chapter-title {
    font-size: 2.5rem;
  }

  .progress-navigation {
    flex-direction: column;
    align-items: center;
  }

  .progress-stage {
    width: 100%;
    max-width: 500px;
  }

  .symbols-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .symbol-details {
    grid-template-columns: 1fr;
  }

  .scripture-reference,
  .symbol-meaning {
    grid-column: 1;
  }

  .symbol-meaning {
    grid-row: 3;
  }
}

@media (max-width: 768px) {
  .chapter-header {
    padding: 2rem 1rem 1rem;
  }

  .chapter-title {
    font-size: 2rem;
  }

  .chapter-subtitle {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .stage-section {
    padding: 1.5rem 1rem;
  }

  .slide-title,
  .scene-title {
    font-size: 1.7rem;
  }

  .context-slide,
  .revelation-scene {
    height: 350px;
  }

  .slide-text p,
  .scene-narrative p {
    font-size: 1rem;
  }

  .stage-actions {
    flex-direction: column;
    gap: 0.8rem;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }

  .symbols-grid {
    grid-template-columns: 1fr;
  }

  .fixed-navigation {
    bottom: 1rem;
    top: auto;
    right: 1rem;
    left: auto;
  }
}

@media (max-width: 480px) {
  .chapter-title {
    font-size: 1.7rem;
  }

  .chapter-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .context-slide,
  .revelation-scene {
    height: 300px;
  }

  .slide-title,
  .scene-title {
    font-size: 1.5rem;
  }

  .control-btn {
    width: 36px;
    height: 36px;
  }

  .slide-indicators {
    gap: 0.3rem;
  }

  .slide-indicator {
    width: 8px;
    height: 8px;
  }

  .modal-content {
    padding: 1.5rem 1rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }
}
</style>
