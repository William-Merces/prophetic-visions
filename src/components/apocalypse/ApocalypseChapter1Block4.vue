<template>
  <div class="prophetic-connections">
    <div class="block-header">
      <h2 class="block-title">Ecos Através do Tempo</h2>
      <p class="block-subtitle">Conexões entre a visão de João e outras revelações proféticas</p>
    </div>

    <!-- Linha do tempo profética -->
    <div class="timeline-container">
      <div class="timeline-bar"></div>
      <div class="timeline-points">
        <div
          v-for="(point, index) in timelinePoints"
          :key="index"
          class="timeline-point"
          :class="{ 'active': activePoint === index }"
          @click="setActivePoint(index)"
        >
          <div class="point-date">{{ point.date }}</div>
          <div class="point-marker">
            <div class="point-icon">{{ point.icon }}</div>
          </div>
          <div class="point-label">{{ point.label }}</div>
        </div>
      </div>
    </div>

    <!-- Conteúdo da visão selecionada -->
    <div class="vision-comparison">
      <transition name="fade" mode="out-in">
        <div :key="activePoint" class="vision-content">
          <h3 class="vision-title">{{ activeVision.title }}</h3>

          <div class="vision-context">
            <p>{{ activeVision.context }}</p>
          </div>

          <div class="comparison-container">
            <div class="vision-column">
              <h4 class="column-title">A Visão de {{ activeVision.prophet }}</h4>
              <div class="vision-image-container">
                <img :src="activeVision.image" :alt="activeVision.title" class="vision-image">
              </div>
              <div class="vision-scripture">
                <p class="scripture-text">{{ activeVision.scripture }}</p>
                <span class="scripture-ref">{{ activeVision.reference }}</span>
              </div>
            </div>

            <div class="connection-column">
              <h4 class="column-title">Conexões com Apocalipse 1</h4>
              <ul class="connections-list">
                <li
                  v-for="(connection, index) in activeVision.connections"
                  :key="index"
                  class="connection-item"
                >
                  <div class="connection-icon">{{ connection.icon }}</div>
                  <div class="connection-text">
                    <h5 class="connection-title">{{ connection.title }}</h5>
                    <p class="connection-description">{{ connection.description }}</p>
                    <div class="connection-scriptures">
                      <div class="scripture-pair">
                        <div class="scripture-block">
                          <span class="scripture-label">{{ activeVision.prophet }}:</span>
                          <span class="scripture-verse">{{ connection.originalText }}</span>
                          <span class="scripture-source">{{ connection.originalRef }}</span>
                        </div>
                        <div class="scripture-arrow">↔</div>
                        <div class="scripture-block">
                          <span class="scripture-label">João:</span>
                          <span class="scripture-verse">{{ connection.apocalypseText }}</span>
                          <span class="scripture-source">{{ connection.apocalypseRef }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="prophetic-significance">
            <h4>Significado Profético</h4>
            <p>{{ activeVision.significance }}</p>
          </div>
        </div>
      </transition>
    </div>

    <!-- Botão para concluir o bloco -->
    <div class="block-navigation">
      <button class="btn btn-secondary" @click="completeBlock">
        Concluir Capítulo
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApocalypseChapter1Block4',
  data() {
    return {
      activePoint: 0,
      timelinePoints: [
        {
          date: "740 a.C.",
          label: "Isaías",
          icon: "📜"
        },
        {
          date: "95 d.C.",
          label: "João",
          icon: "📖"
        },
        {
          date: "1836",
          label: "Joseph Smith",
          icon: "🔑"
        }
      ],
      visions: [
        {
          title: "A Visão do Trono de Isaías",
          prophet: "Isaías",
          context: "Por volta de 740 a.C., o profeta Isaías recebeu uma visão extraordinária no templo de Jerusalém. Ocorrida no ano da morte do rei Uzias, esta visão marcou o comissionamento de Isaías como profeta e estabeleceu padrões que se repetiriam em revelações futuras, incluindo a visão de João em Patmos.",
          image: "/images/connections/isaiah-vision.jpg",
          scripture: "No ano em que morreu o rei Uzias, eu vi também ao Senhor assentado sobre um alto e sublime trono; e o seu séquito enchia o templo. Acima dele estavam serafins... E clamavam uns aos outros, dizendo: Santo, Santo, Santo é o Senhor dos Exércitos; toda a terra está cheia da sua glória.",
          reference: "Isaías 6:1-3",
          significance: "A visão de Isaías estabeleceu um padrão para encontros divinos que seria repetido ao longo das escrituras. Tanto Isaías quanto João experimentaram a santidade esmagadora de Deus, tiveram uma reação de indignidade, receberam uma forma de purificação ou conforto, e foram comissionados com uma mensagem. Estas visões mostram que Deus mantém um padrão consistente em como revela Sua majestade e prepara Seus mensageiros.",
          connections: [
            {
              title: "O Trono Divino",
              icon: "👑",
              description: "Tanto Isaías quanto João viram representações da majestade divina entronizada. Para Isaías, era o Senhor em um trono alto e elevado; para João, era o Cristo glorificado entre os candeeiros.",
              originalText: "Eu vi também ao Senhor assentado sobre um alto e sublime trono; e o seu séquito enchia o templo.",
              originalRef: "Isaías 6:1",
              apocalypseText: "E no meio dos sete candeeiros um semelhante ao Filho do homem, vestido até aos pés, e cingido pelo peito com um cinto de ouro.",
              apocalypseRef: "Apocalipse 1:13"
            },
            {
              title: "O Toque Purificador",
              icon: "✨",
              description: "Em ambas as visões, há um momento de contato divino que purifica e prepara o profeta. Isaías recebe o toque de um carvão vivo em seus lábios; João recebe o toque da mão direita de Cristo.",
              originalText: "Mas um dos serafins voou para mim trazendo na mão uma brasa viva, que tirara do altar com uma tenaz. E com ela tocou a minha boca, e disse: Eis que isto tocou os teus lábios; e a tua iniquidade foi tirada, e purificado o teu pecado.",
              originalRef: "Isaías 6:6-7",
              apocalypseText: "E ele pôs sobre mim a sua destra, dizendo-me: Não temas; Eu sou o primeiro e o último.",
              apocalypseRef: "Apocalipse 1:17"
            },
            {
              title: "O Comissionamento Divino",
              icon: "📣",
              description: "Ambos os profetas são comissionados após sua experiência de temor e purificação. Isaías é enviado com uma mensagem difícil para um povo rebelde; João é instruído a escrever o que viu para as sete igrejas.",
              originalText: "Depois disto ouvi a voz do Senhor, que dizia: A quem enviarei, e quem há de ir por nós? Então disse eu: Eis-me aqui, envia-me a mim.",
              originalRef: "Isaías 6:8",
              apocalypseText: "Escreve as coisas que tens visto, e as que são, e as que depois destas hão de acontecer.",
              apocalypseRef: "Apocalipse 1:19"
            },
            {
              title: "A Reação de Temor",
              icon: "😱",
              description: "Ambos os profetas ficaram esmagados pela santidade divina que testemunharam. A reação inicial foi de temor e consciência de indignidade, mostrando o impacto natural da presença de Deus sobre seres humanos.",
              originalText: "Então disse eu: Ai de mim! Pois estou perdido; porque sou um homem de lábios impuros... porque os meus olhos viram o Rei, o Senhor dos Exércitos.",
              originalRef: "Isaías 6:5",
              apocalypseText: "E eu, quando o vi, caí a seus pés como morto; e ele pôs sobre mim a sua destra, dizendo-me: Não temas.",
              apocalypseRef: "Apocalipse 1:17"
            }
          ]
        },
        {
          title: "A Revelação de Cristo a João",
          prophet: "João",
          context: "Em aproximadamente 95 d.C., o apóstolo João, exilado na ilha de Patmos por seu testemunho de Jesus, recebeu a mais extensa revelação apocalíptica das escrituras. Esta visão do Cristo glorificado no primeiro capítulo estabelece o tom para todo o livro do Apocalipse e revela a natureza divina de Jesus de formas poderosas.",
          image: "/images/connections/john-patmos-vision.jpg",
          scripture: "E virei-me para ver quem falava comigo. E, virando-me, vi sete candeeiros de ouro; E no meio dos sete candeeiros um semelhante ao Filho do homem... E quando o vi, caí a seus pés como morto; e ele pôs sobre mim a sua destra, dizendo-me: Não temas.",
          reference: "Apocalipse 1:12-13, 17",
          significance: "A visão de João serve como um ponto central de conexão entre as revelações anteriores e posteriores. Ela incorpora elementos das visões do Antigo Testamento, mas também antecipa revelações futuras como a de Joseph Smith. Esta continuidade demonstra que Deus revela Sua glória de maneira consistente através dos tempos, adaptando a mensagem para cada geração, mas mantendo Sua natureza imutável.",
          connections: [
            {
              title: "Visões centrais do Apocalipse",
              icon: "📖",
              description: "Esta é a visão inicial que serve como fundamento para todo o livro do Apocalipse. Como ponto central na nossa análise, suas conexões com outras visões demonstram a continuidade da revelação divina através do tempo.",
              originalText: "Eu fui arrebatado em espírito no dia do Senhor, e ouvi detrás de mim uma grande voz, como de trombeta, que dizia: Eu sou o Alfa e o Ômega...",
              originalRef: "Apocalipse 1:10-11",
              apocalypseText: "Escreve as coisas que tens visto, e as que são, e as que depois destas hão de acontecer.",
              apocalypseRef: "Apocalipse 1:19"
            },
            {
              title: "O Cristo no Centro",
              icon: "✝️",
              description: "João coloca o Cristo glorificado no centro de sua visão, estabelecendo que toda revelação apocalíptica gira ao redor de Jesus. Isto serve como conexão crucial entre todas as outras visões proféticas.",
              originalText: "E no meio dos sete candeeiros, um semelhante ao Filho do homem, vestido até aos pés, e cingido pelo peito com um cinto de ouro.",
              originalRef: "Apocalipse 1:13",
              apocalypseText: "Eu sou o Alfa e o Ômega, o princípio e o fim, diz o Senhor, que é, e que era, e que há de vir, o Todo-Poderoso.",
              apocalypseRef: "Apocalipse 1:8"
            },
            {
              title: "Revelação Progressiva",
              icon: "🔄",
              description: "A visão de João serve como um ponto de ligação entre as revelações do Antigo Testamento e as visões que viriam no futuro. Ele recebe instrução para escrever não apenas sobre o passado e presente, mas sobre o que está por vir.",
              originalText: "Escreve as coisas que tens visto, e as que são, e as que depois destas hão de acontecer.",
              originalRef: "Apocalipse 1:19",
              apocalypseText: "Revelação de Jesus Cristo, a qual Deus lhe deu, para mostrar aos seus servos as coisas que brevemente devem acontecer.",
              apocalypseRef: "Apocalipse 1:1"
            }
          ]
        },
        {
          title: "A Visão no Templo de Kirtland",
          prophet: "Joseph Smith",
          context: "Em 3 de abril de 1836, após a dedicação do Templo de Kirtland, Joseph Smith e Oliver Cowdery tiveram uma experiência visionária extraordinária. Nesta revelação moderna, eles viram o Senhor Jesus Cristo de uma maneira que ecoa notavelmente a visão de João em Patmos, estabelecendo uma continuidade na forma como Cristo se revela através das dispensações.",
          image: "/images/connections/kirtland-temple-vision.jpg",
          scripture: "O véu foi retirado de nossa mente e abertos os olhos de nosso entendimento. Vimos o Senhor em pé no parapeito do púlpito, diante de nós... Seus olhos eram como labareda de fogo; os cabelos de sua cabeça eram brancos como a pura neve; seu semblante resplandecia mais do que o brilho do sol.",
          reference: "D&C 110:1-3",
          significance: "A visão no Templo de Kirtland demonstra que o padrão de revelação divina não terminou com o cânone bíblico. As notáveis similaridades com a visão de João não são coincidência, mas evidência de que Cristo se revela de maneira consistente através das eras. Esta continuidade da revelação reforça a imutabilidade de Cristo e a confiabilidade de Seu padrão de comunicação com Seus profetas.",
          connections: [
            {
              title: "A Aparência Glorificada",
              icon: "✨",
              description: "A descrição física de Cristo na visão de Kirtland contém elementos quase idênticos à visão de João em Patmos, incluindo os olhos como labareda de fogo, cabelos brancos como neve, e face mais brilhante que o sol.",
              originalText: "Seus olhos eram como labareda de fogo; os cabelos de sua cabeça eram brancos como a pura neve; seu semblante resplandecia mais do que o brilho do sol.",
              originalRef: "D&C 110:3",
              apocalypseText: "E os seus olhos eram como chama de fogo. E a sua cabeça e cabelos eram brancos como lã branca... E o seu rosto era como o sol, quando resplandece na sua força.",
              apocalypseRef: "Apocalipse 1:14, 16"
            },
            {
              title: "O Véu Removido",
              icon: "🔍",
              description: "Tanto João quanto Joseph Smith tiveram uma experiência onde o véu entre os mundos mortal e eterno foi temporariamente removido. Ambos foram 'no Espírito' para receber suas visões.",
              originalText: "O véu foi retirado de nossa mente e abertos os olhos de nosso entendimento.",
              originalRef: "D&C 110:1",
              apocalypseText: "Eu fui arrebatado em espírito no dia do Senhor, e ouvi detrás de mim uma grande voz, como de trombeta.",
              apocalypseRef: "Apocalipse 1:10"
            },
            {
              title: "Palavras de Conforto",
              icon: "❤️",
              description: "Em ambas as visões, as primeiras palavras de Cristo são palavras de conforto e paz. A João, Cristo diz 'Não temas'; a Joseph e Oliver, 'Vossos pecados vos são perdoados'.",
              originalText: "Regozije-se o coração de vossos irmãos e o coração de todo o meu povo, que com sua força construiu esta casa ao meu nome. Pois eis que aceitei esta casa e meu nome aqui estará.",
              originalRef: "D&C 110:6-7",
              apocalypseText: "E ele pôs sobre mim a sua destra, dizendo-me: Não temas; Eu sou o primeiro e o último.",
              apocalypseRef: "Apocalipse 1:17"
            },
            {
              title: "O Contexto do Templo",
              icon: "⛪",
              description: "Ambas as visões ocorrem em contextos relacionados ao templo. Joseph Smith estava literalmente em um templo dedicado, enquanto João viu candeeiros de ouro que evocam o templo de Jerusalém.",
              originalText: "Vimos o Senhor em pé no parapeito do púlpito, diante de nós... A voz que ouvimos era como o som de muitas águas.",
              originalRef: "D&C 110:2-3",
              apocalypseText: "E no meio dos sete candeeiros um semelhante ao Filho do homem... E a sua voz era como a voz de muitas águas.",
              apocalypseRef: "Apocalipse 1:13, 15"
            },
            {
              title: "Restauração das Chaves",
              icon: "🔑",
              description: "Na visão de João, Cristo declara ter 'as chaves da morte e do Hades', enquanto na visão de Kirtland, diversos mensageiros celestiais viriam restaurar chaves específicas para a última dispensação.",
              originalText: "Após esta visão, os céus novamente se abriram a nós e Moisés apareceu diante de nós e conferiu-nos as chaves da coligação de Israel...",
              originalRef: "D&C 110:11",
              apocalypseText: "E tenho as chaves da morte e do Hades.",
              apocalypseRef: "Apocalipse 1:18"
            }
          ]
        }
      ]
    }
  },
  computed: {
    activeVision() {
      return this.visions[this.activePoint] || this.visions[0]
    }
  },
  methods: {
    setActivePoint(index) {
      this.activePoint = index
      // Rolar para o topo da comparação de visões
      this.$nextTick(() => {
        const comparisonEl = document.querySelector('.vision-comparison')
        if (comparisonEl) {
          comparisonEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    },
    completeBlock() {
      this.$emit('complete')
    }
  }
}
</script>

<style scoped>
.prophetic-connections {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.block-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.block-title {
  color: var(--color-secondary);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.block-subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

/* Timeline styling */
.timeline-container {
  position: relative;
  margin: var(--space-xl) 0;
  padding: var(--space-xl) 0;
}

.timeline-bar {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 4px;
  background: linear-gradient(to right,
    var(--color-primary-dark),
    var(--color-secondary),
    var(--color-primary)
  );
  transform: translateY(-50%);
  border-radius: 2px;
}

.timeline-points {
  display: flex;
  justify-content: space-around;
  position: relative;
  max-width: 80%;
  margin: 0 auto;
}

.timeline-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  z-index: 2;
}

.point-date {
  margin-bottom: var(--space-md);
  font-family: var(--font-family-heading);
  font-size: 0.9rem;
  color: var(--color-secondary);
}

.point-marker {
  width: 60px;
  height: 60px;
  background-color: var(--color-surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-md);
  border: 2px solid var(--color-secondary);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.point-icon {
  font-size: 1.8rem;
}

.point-label {
  font-family: var(--font-family-heading);
  font-size: 1.1rem;
  color: var(--color-text);
  transition: all var(--transition-normal);
}

.timeline-point:hover .point-marker {
  transform: scale(1.1);
  box-shadow: 0 0 15px var(--color-secondary);
}

.timeline-point.active .point-marker {
  background-color: var(--color-primary);
  border-color: var(--color-secondary);
  transform: scale(1.15);
  box-shadow: 0 0 20px var(--color-secondary);
}

.timeline-point.active .point-label {
  color: var(--color-secondary);
  font-weight: 600;
}

/* Vision comparison styling */
.vision-comparison {
  margin-top: var(--space-xxl);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.vision-content {
  padding: var(--space-xl);
}

.vision-title {
  text-align: center;
  color: var(--color-secondary);
  font-size: 1.8rem;
  margin-bottom: var(--space-lg);
}

.vision-context {
  margin-bottom: var(--space-xl);
  line-height: 1.7;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.column-title {
  text-align: center;
  color: var(--color-secondary-light);
  margin-bottom: var(--space-lg);
  font-size: 1.3rem;
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.vision-image-container {
  margin-bottom: var(--space-md);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.vision-image {
  width: 100%;
  height: auto;
  display: block;
}

.vision-scripture {
  background-color: rgba(0, 0, 0, 0.3);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-secondary);
  margin: var(--space-md) 0;
}

.scripture-text {
  font-family: var(--font-family-quote);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: var(--space-sm);
}

.scripture-ref {
  display: block;
  text-align: right;
  color: var(--color-secondary);
  font-size: 0.9rem;
}

.connections-list {
  list-style: none;
  padding: 0;
}

.connection-item {
  display: flex;
  margin-bottom: var(--space-lg);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  border-left: 3px solid var(--color-primary);
}

.connection-icon {
  font-size: 2rem;
  margin-right: var(--space-md);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
}

.connection-text {
  flex: 1;
}

.connection-title {
  color: var(--color-secondary);
  margin-bottom: var(--space-xs);
  font-size: 1.1rem;
}

.connection-description {
  margin-bottom: var(--space-md);
  line-height: 1.6;
}

.connection-scriptures {
  background-color: rgba(0, 0, 0, 0.2);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
}

.scripture-pair {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.scripture-block {
  flex: 1;
  min-width: 200px;
  background-color: rgba(75, 46, 131, 0.2);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
}

.scripture-label {
  display: block;
  color: var(--color-secondary);
  font-weight: 600;
  margin-bottom: var(--space-xs);
  font-size: 0.9rem;
}

.scripture-verse {
  display: block;
  font-style: italic;
  margin-bottom: var(--space-xs);
  font-size: 0.9rem;
  line-height: 1.6;
}

.scripture-source {
  display: block;
  text-align: right;
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.scripture-arrow {
  font-size: 1.5rem;
  color: var(--color-secondary);
  margin: 0 var(--space-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.prophetic-significance {
  background-color: rgba(75, 46, 131, 0.1);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-secondary);
  margin-top: var(--space-xl);
}

.prophetic-significance h4 {
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
  font-size: 1.2rem;
}

.prophetic-significance p {
  line-height: 1.7;
}

.block-navigation {
  margin-top: var(--space-xl);
  text-align: center;
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 1024px) {
  .comparison-container {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .connection-item {
    flex-direction: column;
  }

  .connection-icon {
    margin-right: 0;
    margin-bottom: var(--space-sm);
  }
}

@media (max-width: 768px) {
  .timeline-points {
    flex-direction: column;
    gap: var(--space-xl);
    align-items: center;
    max-width: 100%;
  }

  .timeline-bar {
    top: 0;
    bottom: 0;
    left: 50%;
    right: auto;
    width: 4px;
    height: auto;
    transform: translateX(-50%);
  }

  .point-date {
    order: 1;
    margin-bottom: 0;
    margin-top: var(--space-md);
  }

  .point-label {
    order: -1;
    margin-bottom: var(--space-md);
  }

  .prophetic-connections {
    padding: 1rem 0.5rem;
  }

  .vision-content {
    padding: var(--space-md);
  }
}
</style>
