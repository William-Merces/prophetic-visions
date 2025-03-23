<template>
  <div class="symbols-explanation">
    <div class="block-header">
      <h3 class="block-title">Desvendando os Símbolos</h3>
      <p class="block-subtitle">Compreendendo o significado teológico da visão do Filho do Homem</p>
    </div>

    <!-- Navegação por abas para diferentes grupos de símbolos -->
    <div class="symbol-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-button"
        :class="{ 'active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.title }}
      </button>
    </div>

    <!-- Conteúdo da aba ativa -->
    <div class="tab-content">
      <transition name="fade" mode="out-in">
        <div :key="activeTab" class="symbol-content">
          <h3 class="symbol-group-title">{{ activeTabData.title }}</h3>

          <!-- Introdução da aba -->
          <div class="symbol-introduction">
            <p>{{ activeTabData.introduction }}</p>
          </div>

          <!-- Lista de símbolos na aba atual -->
          <div class="symbols-list">
            <div
              v-for="(symbol, index) in activeTabData.symbols"
              :key="index"
              class="symbol-card"
              :class="{ 'active': activeSymbol === index }"
              @click="selectSymbol(index)"
            >
              <div class="symbol-card-header">
                <div class="symbol-icon">{{ symbol.icon }}</div>
                <h4 class="symbol-name">{{ symbol.name }}</h4>
              </div>

              <div class="symbol-card-content" v-if="activeSymbol === index">
                <p class="symbol-description">{{ symbol.description }}</p>

                <div class="symbol-scripture">
                  <p class="scripture-text">"{{ symbol.scripture }}"</p>
                  <span class="scripture-ref">{{ symbol.reference }}</span>
                </div>

                <div class="symbol-explanation">
                  <h5>Significado Teológico:</h5>
                  <p>{{ symbol.theological }}</p>
                </div>

                <div class="symbol-application">
                  <h5>Aplicação:</h5>
                  <p>{{ symbol.application }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Seção de perguntas para reflexão -->
    <div class="reflection-section">
      <h3>Reflexões</h3>
      <p class="reflection-intro">
        Considere estas perguntas à medida que reflete sobre os símbolos da visão:
      </p>
      <ul class="reflection-questions">
        <li>Como a compreensão dos símbolos aprofunda sua percepção de Cristo?</li>
        <li>De que maneira estes símbolos teriam trazido conforto aos cristãos em perseguição?</li>
        <li>Qual símbolo mais ressoou com você e por quê?</li>
        <li>Como estes símbolos mudam a forma como você enxerga a igreja hoje?</li>
      </ul>
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
  name: 'ApocalypseChapter1Block3',
  data() {
    return {
      activeTab: 'christ',
      activeSymbol: null,
      tabs: [
        { id: 'christ', title: 'Cristo Glorificado', icon: '👑' },
        { id: 'church', title: 'Igreja e Ministério', icon: '🕯️' },
        { id: 'message', title: 'Mensagem e Propósito', icon: '📜' }
      ],
      tabsData: {
        // Aba 1: Símbolos relacionados a Cristo
        christ: {
          title: 'Cristo Glorificado: A Divindade Revelada',
          introduction: 'Na visão do Filho do Homem, João contempla Cristo não mais como o humilde servo, mas como o Rei divino em toda Sua glória. Cada elemento desta visão revela um aspecto da natureza, caráter e obra de Cristo.',
          symbols: [
            {
              name: 'Semelhante ao Filho do Homem',
              icon: '👤',
              description: 'João vê alguém "semelhante ao Filho do Homem" - o título que Jesus frequentemente usava para Si mesmo durante Seu ministério terreno.',
              scripture: 'E no meio dos sete candeeiros, um semelhante ao Filho do homem...',
              reference: 'Apocalipse 1:13',
              theological: 'Este título conecta o Cristo glorificado ao Jesus histórico que caminhou na Galiléia, mas também evoca a visão de Daniel 7, onde "um como o filho do homem" se aproxima do Ancião de Dias para receber domínio eterno. Mostra que Jesus é tanto humano quanto divino.',
              application: 'Embora Cristo esteja agora glorificado, Ele ainda mantém Sua humanidade e compreende nossas lutas humanas. Podemos adorá-Lo como Deus e confiar nEle como alguém que conhece nossa condição.'
            },
            {
              name: 'Vestes Longas e Cinto de Ouro',
              icon: '👘',
              description: 'Cristo aparece vestido com uma roupa que chegava até os pés e um cinto de ouro ao peito.',
              scripture: '...vestido com uma roupa que chegava até aos pés, e cingido pelo peito com um cinto de ouro.',
              reference: 'Apocalipse 1:13',
              theological: 'As vestes longas e o cinto remetem às vestimentas do Sumo Sacerdote no Antigo Testamento. Cristo é mostrado em Seu ofício sacerdotal, mediando entre Deus e a humanidade. O cinto de ouro simboliza realeza e dignidade.',
              application: 'Temos um Sumo Sacerdote que intercede por nós continuamente. Não precisamos de intermediários humanos para acessar a Deus - Cristo é nosso mediador perfeito que compreende nossas fraquezas.'
            },
            {
              name: 'Cabelos Brancos como Lã',
              icon: '⚪',
              description: 'Os cabelos de Cristo são descritos como brancos, como lã, como neve.',
              scripture: 'E a sua cabeça e cabelos eram brancos como lã branca, como a neve...',
              reference: 'Apocalipse 1:14',
              theological: 'Cabelos brancos simbolizam sabedoria, pureza e eternidade. Esta imagem evoca diretamente a visão do "Ancião de Dias" em Daniel 7:9, conectando Cristo ao Pai Eterno e declarando Sua divindade.',
              application: 'Nossa fé está fundamentada não em um mestre humano, mas no Deus eterno que possui sabedoria infinita. Podemos confiar em Sua orientação mesmo quando não compreendemos Seus caminhos.'
            },
            {
              name: 'Olhos como Chama de Fogo',
              icon: '🔥',
              description: 'Os olhos de Cristo são descritos como chamas de fogo ardentes.',
              scripture: 'E os seus olhos eram como chama de fogo.',
              reference: 'Apocalipse 1:14',
              theological: 'Olhos de fogo simbolizam discernimento perfeito, julgamento penetrante e conhecimento completo. Nada pode ser escondido da vista de Cristo - Ele vê através de todas as pretensões e enganos.',
              application: 'Devemos viver com integridade, sabendo que Cristo vê não apenas nossas ações externas, mas também nossos motivos internos. Não podemos esconder nada dEle, o que nos chama a uma vida de autenticidade.'
            },
            {
              name: 'Pés como Bronze Polido',
              icon: '🦶',
              description: 'Seus pés são semelhantes ao bronze refinado numa fornalha ardente.',
              scripture: 'E os seus pés, semelhantes a latão reluzente, como se tivessem sido refinados numa fornalha...',
              reference: 'Apocalipse 1:15',
              theological: 'O bronze refinado no fogo representa pureza, estabilidade e julgamento. Os pés simbolizam o fundamento sobre o qual Cristo se mantém - imutável e inabalável. Também sugere Seu poder para esmagar Seus inimigos.',
              application: 'Em tempos de perseguição e tribulação, podemos nos apoiar na natureza imutável de Cristo. Sua firmeza nos dá confiança quando tudo ao nosso redor parece incerto.'
            },
            {
              name: 'Voz como Muitas Águas',
              icon: '🌊',
              description: 'Sua voz é descrita como o som de muitas águas.',
              scripture: 'E a sua voz era como a voz de muitas águas.',
              reference: 'Apocalipse 1:15',
              theological: 'A voz como muitas águas evoca o poder esmagador de cataratas ou do oceano - irresistível, majestosa e autorizada. É a voz do Criador que falou e o universo veio à existência.',
              application: 'Quando Cristo fala, devemos ouvir. Sua palavra tem autoridade sobre toda a criação e sobre nossas vidas. Precisamos estar atentos à Sua voz acima do barulho do mundo.'
            }
          ]
        },

        // Aba 2: Símbolos relacionados à Igreja
        church: {
          title: 'Igreja e Ministério: Os Candeeiros e as Estrelas',
          introduction: 'Além de revelar Cristo, a visão também mostra Sua relação com a Igreja e seus líderes. Os símbolos dos candeeiros e estrelas ilustram o papel, responsabilidade e posição da Igreja no plano divino.',
          symbols: [
            {
              name: 'Sete Candeeiros de Ouro',
              icon: '🕯️',
              description: 'João vê sete candeeiros de ouro, e Cristo anda no meio deles.',
              scripture: 'O mistério das sete estrelas... e dos sete candeeiros de ouro. Os sete candeeiros que viste são as sete igrejas.',
              reference: 'Apocalipse 1:20',
              theological: 'Os candeeiros representam as sete igrejas da Ásia Menor - e por extensão, toda a Igreja universal. Como candeeiros, a função primária da Igreja é irradiar luz em um mundo escuro. O ouro simboliza o valor e a preciosidade da Igreja aos olhos de Deus.',
              application: 'A Igreja não existe para si mesma, mas para brilhar com a luz de Cristo no mundo. Nossa principal missão não é o conforto ou entretenimento, mas ser testemunha da verdade e graça de Cristo em um mundo de trevas.'
            },
            {
              name: 'Cristo Entre os Candeeiros',
              icon: '⛪',
              description: 'Cristo é visto andando no meio dos sete candeeiros de ouro.',
              scripture: 'E no meio dos sete candeeiros um semelhante ao Filho do homem...',
              reference: 'Apocalipse 1:13',
              theological: 'Cristo andando entre os candeeiros mostra Sua presença ativa entre as igrejas. Ele não está distante, mas intimamente envolvido com Seu povo. Ele observa, avalia, sustenta e interage com Suas igrejas continuamente.',
              application: 'As igrejas nunca estão sozinhas ou abandonadas, mesmo em perseguição. Cristo está presente em cada congregação, conhecendo suas lutas, celebrando suas vitórias e trabalhando através delas para cumprir Seus propósitos.'
            },
            {
              name: 'As Sete Estrelas',
              icon: '⭐',
              description: 'Cristo segura sete estrelas em Sua mão direita.',
              scripture: 'Tinha na sua destra sete estrelas... As sete estrelas são os anjos das sete igrejas.',
              reference: 'Apocalipse 1:16, 20',
              theological: 'As estrelas representam os "anjos" ou mensageiros/líderes das sete igrejas. Estando na mão direita de Cristo, simboliza que Ele os protege, dirige e tem autoridade sobre eles. A liderança da igreja é um dom de Cristo para Seu povo.',
              application: 'Os líderes da igreja devem lembrar que são responsáveis perante Cristo e dependentes de Seu poder. Congregações devem reconhecer seus líderes como dons de Cristo, enquanto lembram que a autoridade final reside apenas em Cristo.'
            },
            {
              name: 'A Mão Direita',
              icon: '👋',
              description: 'Cristo segura as estrelas em Sua mão direita e coloca essa mesma mão sobre João.',
              scripture: 'E ele tinha na sua destra sete estrelas... E ele pôs sobre mim a sua destra, dizendo-me: Não temas.',
              reference: 'Apocalipse 1:16-17',
              theological: 'A mão direita na Bíblia simboliza poder, autoridade e favor. Cristo usando Sua mão direita tanto para segurar as estrelas quanto para confortar João mostra a conexão entre Seu poder soberano e Sua compaixão pessoal.',
              application: 'O mesmo Cristo que governa o universo e dirige a Igreja também se importa individualmente com cada seguidor. Seu poder nunca está separado de Seu amor; Ele usa Sua autoridade para proteger e sustentar Seu povo.'
            }
          ]
        },

        // Aba 3: Mensagem e Propósito
        message: {
          title: 'Mensagem e Propósito: O Impacto da Visão',
          introduction: 'A visão do Filho do Homem não foi dada apenas para impressionar, mas para transmitir uma mensagem poderosa tanto para João quanto para as igrejas. Estes elementos revelam o propósito maior por trás da aparição de Cristo.',
          symbols: [
            {
              name: 'A Voz como de Trombeta',
              icon: '📢',
              description: 'A primeira coisa que João ouve é uma voz poderosa como uma trombeta, chamando sua atenção.',
              scripture: 'Eu fui arrebatado em espírito no dia do Senhor, e ouvi detrás de mim uma grande voz, como de trombeta.',
              reference: 'Apocalipse 1:10',
              theological: 'A trombeta na Bíblia frequentemente anuncia a presença divina (como no Monte Sinai), convoca para reuniões solenes ou proclama julgamentos. Esta voz de trombeta indica que uma revelação divina oficial está começando - algo que exige atenção completa e reverência.',
              application: 'Quando Deus fala, devemos prestar atenção total. A palavra de Deus não é uma sugestão casual, mas uma proclamação autoritativa que merece nossa completa atenção e resposta.'
            },
            {
              name: 'Caindo como Morto',
              icon: '🧎',
              description: 'Ao ver Cristo em Sua glória, João cai a Seus pés como morto.',
              scripture: 'E eu, quando o vi, caí a seus pés como morto; e ele pôs sobre mim a sua destra, dizendo-me: Não temas.',
              reference: 'Apocalipse 1:17',
              theological: 'A reação de João demonstra o impacto avassalador da santidade divina sobre seres humanos caídos. Sem a mediação da graça, a presença pura de Deus seria fatal para a humanidade pecadora. É uma resposta apropriada de temor e reverência diante da majestade divina.',
              application: 'A adoração verdadeira começa com uma compreensão adequada da santidade de Deus e nossa indignidade. Devemos nos aproximar de Deus com reverência e temor, não com casualidade ou presunção, reconhecendo a vastidão da distância que Sua graça transpõe.'
            },
            {
              name: 'Não Temas',
              icon: '❤️',
              description: 'A primeira palavra de Cristo para João em sua condição prostrada é "Não temas".',
              scripture: 'Não temas; Eu sou o primeiro e o último; E o que vive; fui morto, mas eis aqui estou vivo para todo o sempre.',
              reference: 'Apocalipse 1:17-18',
              theological: 'As palavras "não temas" aparecem frequentemente em encontros divinos na Bíblia. Embora a santidade de Deus seja aterrorizante, Seu amor convida à aproximação. Cristo não revela Sua glória para destruir, mas para transformar. Seu desejo não é terror, mas relacionamento.',
              application: 'Mesmo em nosso estado mais indigno, Cristo nos convida a nos aproximarmos. Devemos ter temor reverente de Sua santidade, mas não medo paralisante. Seu amor nos permite aproximação, não fuga.'
            },
            {
              name: 'As Chaves da Morte e do Hades',
              icon: '🔑',
              description: 'Cristo declara que possui as chaves da morte e do Hades (o reino dos mortos).',
              scripture: 'E o que vive; fui morto, mas eis aqui estou vivo para todo o sempre, Amém. E tenho as chaves da morte e do inferno.',
              reference: 'Apocalipse 1:18',
              theological: 'Chaves simbolizam autoridade e acesso. Ao possuir as chaves da morte e do Hades, Cristo demonstra que venceu os maiores inimigos da humanidade através de Sua própria morte e ressurreição. Ele agora controla o destino eterno de todos e pode libertar os cativos.',
              application: 'Para o cristão, a morte perdeu seu terror final. Cristo conquistou-a e a transforma em uma porta para a vida eterna. Não precisamos temer a morte ou o julgamento quando confiamos nAquele que controla ambos.'
            }
          ]
        }
      }
    }
  },
  computed: {
    activeTabData() {
      return this.tabsData[this.activeTab] || {}
    }
  },
  methods: {
    selectSymbol(index) {
      // Toggle o símbolo ativo
      if (this.activeSymbol === index) {
        this.activeSymbol = null
      } else {
        this.activeSymbol = index
      }
    },

    completeBlock() {
      // Emitir evento para indicar que o bloco foi concluído
      this.$emit('complete', 3)
    }
  }
}
</script>

<style scoped>
.symbols-explanation {
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

/* Navegação por abas */
.symbol-tabs {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
}

.tab-button {
  background-color: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-family-heading);
}

.tab-button.active {
  background-color: var(--color-primary-dark);
  border-color: var(--color-secondary);
  box-shadow: 0 0 10px rgba(196, 180, 84, 0.3);
}

.tab-button:hover:not(.active) {
  background-color: rgba(75, 46, 131, 0.3);
  transform: translateY(-2px);
}

.tab-icon {
  font-size: 1.2rem;
}

/* Conteúdo da aba */
.tab-content {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  margin-bottom: var(--space-xl);
}

.symbol-content {
  padding: var(--space-xl);
}

.symbol-group-title {
  text-align: center;
  color: var(--color-secondary);
  margin-bottom: var(--space-lg);
  font-size: 1.5rem;
}

.symbol-introduction {
  margin-bottom: var(--space-xl);
  line-height: 1.7;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

/* Cards de símbolos */
.symbols-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.symbol-card {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-normal);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.symbol-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  background-color: rgba(75, 46, 131, 0.2);
}

.symbol-card.active {
  box-shadow: var(--shadow-lg);
  background-color: rgba(75, 46, 131, 0.3);
  border-color: var(--color-secondary);
}

.symbol-card-header {
  padding: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.symbol-icon {
  font-size: 2rem;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.symbol-name {
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-secondary-light);
}

.symbol-card-content {
  padding: 0 var(--space-md) var(--space-md);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.symbol-description {
  margin-bottom: var(--space-md);
  line-height: 1.7;
}

.symbol-scripture {
  background-color: rgba(0, 0, 0, 0.3);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-md);
  border-left: 2px solid var(--color-secondary);
}

.scripture-text {
  font-family: var(--font-family-quote);
  font-style: italic;
  margin-bottom: var(--space-xs);
  font-size: 0.95rem;
}

.scripture-ref {
  display: block;
  text-align: right;
  color: var(--color-secondary);
  font-size: 0.85rem;
}

.symbol-explanation,
.symbol-application {
  margin-top: var(--space-md);
}

.symbol-explanation h5,
.symbol-application h5 {
  color: var(--color-secondary);
  margin-bottom: var(--space-xs);
  font-size: 0.95rem;
}

.symbol-explanation p,
.symbol-application p {
  line-height: 1.7;
  font-size: 0.95rem;
}

/* Seção de reflexões */
.reflection-section {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  margin-bottom: var(--space-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-md);
}

.reflection-section h3 {
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
  text-align: center;
}

.reflection-intro {
  margin-bottom: var(--space-md);
  text-align: center;
}

.reflection-questions {
  list-style-type: none;
  padding: 0;
  max-width: 800px;
  margin: 0 auto;
}

.reflection-questions li {
  margin-bottom: var(--space-md);
  padding: var(--space-md);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  line-height: 1.7;
  border-left: 2px solid var(--color-primary);
}

/* Navegação do bloco */
.block-navigation {
  margin-top: var(--space-xl);
  text-align: center;
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
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsividade */
@media (max-width: 768px) {
  .block-title {
    font-size: 1.5rem;
  }

  .symbol-tabs {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .tab-button {
    width: 100%;
    justify-content: center;
  }

  .symbols-list {
    grid-template-columns: 1fr;
  }

  .symbol-content {
    padding: var(--space-md);
  }

  .reflection-section {
    padding: var(--space-md);
  }

  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
