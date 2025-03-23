<template>
  <div class="prophetic-connections">
    <div class="block-header">
      <h3 class="block-title">Ecos Através do Tempo</h3>
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
                  :class="{ 'active': activeConnection === index }"
                  @click="toggleConnection(index)"
                >
                  <div class="connection-header">
                    <div class="connection-icon">{{ connection.icon }}</div>
                    <h5 class="connection-title">{{ connection.title }}</h5>
                    <div class="expand-icon">{{ activeConnection === index ? '−' : '+' }}</div>
                  </div>

                  <div v-if="activeConnection === index" class="connection-details">
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

    <!-- Reflexão final sobre as conexões proféticas -->
    <div class="final-reflection">
      <h3>Reflexão sobre as Conexões Proféticas</h3>

      <p>Ao estudar estes paralelos entre visões separadas por séculos, podemos observar alguns princípios importantes:</p>

      <ul class="reflection-points">
        <li>
          <strong>Consistência Divina:</strong> Deus revela Sua glória de maneiras semelhantes através das eras, mostrando a consistência de Sua natureza e mensagem.
        </li>
        <li>
          <strong>Progressão da Revelação:</strong> Cada nova revelação expande e esclarece as anteriores, formando um rico tapete profético que atravessa as Escrituras.
        </li>
        <li>
          <strong>Encontros Transformadores:</strong> Em cada visão, o encontro com a santidade divina primeiro esmaga o vidente, depois o levanta e comissiona para um propósito maior.
        </li>
        <li>
          <strong>Conexão com Cristo:</strong> Mesmo as visões do Antigo Testamento contêm elementos que apontam para Cristo, revelando Sua centralidade em todo o plano divino.
        </li>
      </ul>

      <p>Estas conexões não são coincidências, mas evidências de um Autor divino por trás de todas estas revelações, trabalhando através de diferentes profetas em diferentes momentos da história para comunicar verdades eternas.</p>
    </div>

    <!-- Botão para concluir o bloco -->
    <div class="block-navigation">
      <button class="btn btn-secondary" @click="completeBlock">
        Concluir este Bloco <span class="btn-icon">→</span>
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
      activeConnection: null,
      timelinePoints: [
        {
          date: "740 a.C.",
          label: "Isaías",
          icon: "📜"
        },
        {
          date: "593 a.C.",
          label: "Ezequiel",
          icon: "🔥"
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
          title: "A Visão dos Seres Viventes de Ezequiel",
          prophet: "Ezequiel",
          context: "Em 593 a.C., durante o exílio babilônico, o sacerdote Ezequiel teve uma visão extraordinária à beira do rio Quebar. Esta revelação complexa apresentou criaturas celestiais, rodas místicas, e uma figura em um trono com aparência de homem, envolta em fogo e resplendor.",
          image: "/images/connections/ezekiel-vision.jpg",
          scripture: "E olhei, e eis que um vento tempestuoso vinha do norte, uma grande nuvem, com um fogo revolvendo-se, e um resplendor ao redor dela, e no meio uma coisa como de cor de âmbar, que saía do meio do fogo. E do meio dela saía a semelhança de quatro seres viventes.",
          reference: "Ezequiel 1:4-5",
          significance: "A visão de Ezequiel, assim como a de João, ocorreu durante um período de exílio e tribulação para o povo de Deus. Ambas as visões serviram para mostrar que, apesar das circunstâncias difíceis, Deus ainda reina soberano. As imagens de seres celestiais, fogo divino e a figura com aparência humana no trono antecipam elementos da visão de Cristo glorificado que João receberia séculos depois.",
          connections: [
            {
              title: "A Figura Humana Divina",
              icon: "👑",
              description: "Tanto Ezequiel quanto João viram uma figura com aparência humana que emanava glória divina. Em ambos os casos, esta figura representava Deus se manifestando em forma visível.",
              originalText: "E sobre a semelhança do trono havia uma figura semelhante à aparência de um homem... Tal como o aspecto do arco que aparece na nuvem no dia da chuva, assim era o aspecto do resplendor em redor. Este era o aspecto da semelhança da glória do Senhor.",
              originalRef: "Ezequiel 1:26, 28",
              apocalypseText: "E no meio dos sete candeeiros um semelhante ao Filho do homem... E o seu rosto era como o sol, quando resplandece na sua força.",
              apocalypseRef: "Apocalipse 1:13, 16"
            },
            {
              title: "Aparência de Fogo",
              icon: "🔥",
              description: "Em ambas as visões, elementos de fogo são associados à manifestação divina, simbolizando a pureza, santidade e o poder consumidor de Deus.",
              originalText: "E vi-a como a cor de âmbar, como a aparência do fogo dentro dela ao redor... até aos seus lombos e para cima; e desde os seus lombos e para baixo, vi como a semelhança de fogo, e um resplendor ao redor dele.",
              originalRef: "Ezequiel 1:27",
              apocalypseText: "E os seus olhos eram como chama de fogo. E os seus pés, semelhantes a latão reluzente, como se tivessem sido refinados numa fornalha.",
              apocalypseRef: "Apocalipse 1:14-15"
            },
            {
              title: "A Prostração do Profeta",
              icon: "🧎",
              description: "Ambos os videntes caem prostrados diante da visão da glória divina, demonstrando a resposta humana apropriada ao confrontar a presença de Deus em Sua majestade.",
              originalText: "E quando a vi, caí com o rosto em terra, e ouvi uma voz de quem falava.",
              originalRef: "Ezequiel 1:28",
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
          significance: "A visão de João serve como um ponto central de conexão entre as revelações anteriores e posteriores. Ela incorpora elementos das visões do Antigo Testamento, mas também antecipa revelações futuras. Esta continuidade demonstra que Deus revela Sua glória de maneira consistente através dos tempos, adaptando a mensagem para cada geração, mas mantendo Sua natureza imutável.",
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
              title: "O Contexto do Templo",
              icon: "⛪",
              description: "Ambas as visões ocorrem em contextos relacionados ao templo. Joseph Smith estava literalmente em um templo dedicado, enquanto João viu candeeiros de ouro que evocam o templo de Jerusalém.",
              originalText: "Vimos o Senhor em pé no parapeito do púlpito, diante de nós... A voz que ouvimos era como o som de muitas águas.",
              originalRef: "D&C 110:2-3",
              apocalypseText: "E no meio dos sete candeeiros um semelhante ao Filho do homem... E a sua voz era como a voz de muitas águas.",
              apocalypseRef: "Apocalipse 1:13, 15"
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
      this.activeConnection = null

      // Rolar para o topo da comparação de visões
      this.$nextTick(() => {
        const comparisonEl = document.querySelector('.vision-comparison')
        if (comparisonEl) {
          comparisonEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    },

    toggleConnection(index) {
      if (this.activeConnection === index) {
        this.activeConnection = null
      } else {
        this.activeConnection = index
      }
    },

    completeBlock() {
      // Emitir evento para indicar que o bloco foi concluído
      this.$emit('complete', 4)
    }
  }
}
</script>

<style scoped>
.prophetic-connections {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
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
  font-family: var(--font-family-quote);
  font-style: italic;
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
  color: var(--color-text-muted);
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
  border: 2px solid rgba(255, 255, 255, 0.1);
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
  border-color: var(--color-secondary);
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
}

.timeline-point.active .point-marker {
  background-color: var(--color-primary);
  border-color: var(--color-secondary);
  transform: scale(1.15);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.5);
}

.timeline-point.active .point-label {
  color: var(--color-secondary);
  font-weight: 600;
}

.timeline-point.active .point-date {
  color: var(--color-secondary);
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
  max-height: 300px;
  object-fit: cover;
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
  margin-bottom: var(--space-md);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-normal);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.connection-item:hover {
  transform: translateY(-3px);
  background-color: rgba(75, 46, 131, 0.2);
}

.connection-header {
  padding: var(--space-md);
  display: flex;
  align-items: center;
  cursor: pointer;
}

.connection-icon {
  font-size: 1.5rem;
  margin-right: var(--space-md);
  min-width: 30px;
  text-align: center;
}

.connection-title {
  flex: 1;
  margin: 0;
  font-size: 1rem;
}

.expand-icon {
  font-size: 1.2rem;
  color: var(--color-text-muted);
}

.connection-details {
  padding: 0 var(--space-md) var(--space-md);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  animation: fadeIn 0.3s ease;
}

.connection-description {
  margin-bottom: var(--space-md);
  line-height: 1.6;
  font-size: 0.95rem;
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
  font-family: var(--font-family-quote);
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

/* Seção de reflexão final */
.final-reflection {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  margin: var(--space-xl) 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-md);
  animation: fadeIn 1s ease;
}

.final-reflection h3 {
  text-align: center;
  color: var(--color-secondary);
  margin-bottom: var(--space-lg);
  font-size: 1.5rem;
}

.final-reflection p {
  line-height: 1.7;
  margin-bottom: var(--space-lg);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.reflection-points {
  max-width: 900px;
  margin: 0 auto var(--space-xl);
  padding-left: var(--space-xl);
}

.reflection-points li {
  margin-bottom: var(--space-md);
  line-height: 1.7;
}

.reflection-points strong {
  color: var(--color-secondary);
}

/* Navegação do bloco */
.block-navigation {
  text-align: center;
  margin-top: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  font-size: 1.1rem;
}

.btn-icon {
  transition: transform var(--transition-fast);
}

.btn-secondary:hover .btn-icon {
  transform: translateX(5px);
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Responsividade */
@media (max-width: 1024px) {
  .comparison-container {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .scripture-pair {
    flex-direction: column;
  }

  .scripture-arrow {
    transform: rotate(90deg);
    margin: var(--space-xs) 0;
  }
}

@media (max-width: 768px) {
  .block-title {
    font-size: 1.5rem;
  }

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

  .vision-content {
    padding: var(--space-md);
  }

  .vision-title {
    font-size: 1.5rem;
  }

  .prophetic-significance {
    padding: var(--space-md);
  }

  .final-reflection {
    padding: var(--space-md);
  }

  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
