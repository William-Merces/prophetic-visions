<template>
  <div class="meaning-stage">
    <div class="symbols-introduction">
      <h3>Os Símbolos da Visão</h3>
      <p>A visão de João do Filho do Homem está repleta de símbolos poderosos. Cada elemento da visão transmite um significado teológico profundo sobre a natureza e o caráter de Cristo ressuscitado e sua relação com a Igreja.</p>
      <p>Explore cada símbolo para compreender sua origem nas Escrituras, seu significado e relevância para os primeiros cristãos e para nós hoje.</p>
    </div>

    <!-- Grid de símbolos interativos -->
    <div class="symbols-grid">
      <div
        v-for="(symbol, index) in symbols"
        :key="symbol.id"
        class="symbol-card"
        :class="{ 'expanded': expandedSymbol === index }"
        @click="toggleSymbol(index)"
      >
        <div class="symbol-header">
          <div class="symbol-icon">{{ symbol.icon }}</div>
          <h4 class="symbol-title">{{ symbol.name }}</h4>
          <div class="expand-icon">{{ expandedSymbol === index ? '−' : '+' }}</div>
        </div>

        <transition name="fade">
          <div v-if="expandedSymbol === index" class="symbol-details">
            <div class="symbol-image" v-if="symbol.image">
              <img :src="symbol.image" :alt="symbol.name">
            </div>

            <p class="symbol-description">{{ symbol.description }}</p>

            <div class="symbol-scripture">
              <p class="scripture-text">"{{ symbol.scriptureText }}"</p>
              <span class="scripture-ref">{{ symbol.scriptureRef }}</span>
            </div>

            <div class="symbol-meaning">
              <h5>Significado:</h5>
              <p>{{ symbol.meaning }}</p>
            </div>

            <div class="symbol-relevance">
              <h5>Relevância:</h5>
              <p>{{ symbol.relevance }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Seção de síntese e aplicação -->
    <div class="synthesis-section">
      <h3>Síntese e Aplicação</h3>

      <div class="synthesis-content">
        <p>Esta poderosa visão inicial estabelece o tom para todo o livro do Apocalipse. João vê Cristo em toda Sua glória divina, não mais como o servo humilde, mas como o Rei eterno e vitorioso. Os símbolos revelam Sua autoridade, sabedoria, pureza, poder e domínio sobre a morte.</p>

        <div class="key-message">
          <h4>A Mensagem para as Igrejas Sob Perseguição</h4>
          <p>Para as igrejas sofrendo sob a perseguição romana, esta visão era uma poderosa lembrança de que:</p>
          <ul>
            <li>Cristo está presente entre elas (andando entre os candeeiros)</li>
            <li>Ele conhece suas lutas (olhos de fogo que tudo veem)</li>
            <li>Ele protege seus líderes (as sete estrelas em Sua mão)</li>
            <li>Sua palavra tem poder para julgar (a espada afiada)</li>
            <li>Ele já conquistou a morte (vivo para todo o sempre)</li>
            <li>Ele tem autoridade sobre todos os poderes (chaves da morte e do Hades)</li>
          </ul>
          <p>A visão não era apenas para confortar, mas para fortalecer as igrejas a permanecerem fiéis em meio à adversidade. A perspectiva celestial transformava completamente a compreensão da situação terrena.</p>
        </div>

        <div class="application">
          <h4>Aplicação Para Hoje</h4>
          <p>Esta visão de Cristo permanece profundamente relevante para cristãos contemporâneos:</p>
          <ul>
            <li><strong>Em tempos de dúvida</strong> - Ele é o Alfa e o Ômega, o Primeiro e o Último</li>
            <li><strong>Em tempos de medo</strong> - "Não tenha medo" é Seu comando e conforto</li>
            <li><strong>Em tempos de perseguição</strong> - Ele caminha entre Seu povo e conhece suas lutas</li>
            <li><strong>Em face da morte</strong> - Ele vive e tem as chaves da morte</li>
            <li><strong>Em tempos de confusão moral</strong> - Seus olhos como chama de fogo veem a verdade</li>
            <li><strong>Em tempos de injustiça</strong> - Sua palavra é uma espada afiada que traz julgamento</li>
          </ul>
          <p>Quando nossa visão do Senhor Jesus se alinha com a revelação dada a João, nossa fé é fortalecida para enfrentar qualquer desafio que a vida apresente.</p>
        </div>

        <div class="reflection-question">
          <p>Na sua caminhada de fé, qual aspecto desta visão de Cristo você mais precisa lembrar hoje?</p>
        </div>

        <div class="continue-section">
          <button class="btn btn-primary" @click="completeStage">
            Concluir Jornada
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeaningStage',
  data() {
    return {
      expandedSymbol: null,
      symbols: [
        {
          id: 'candeeiros',
          name: 'Os Sete Candeeiros de Ouro',
          icon: '🕯️',
          image: '/images/apocalypse/seven-lampstands-symbol.jpg',
          description: 'João viu sete candeeiros de ouro, com Cristo andando entre eles.',
          scriptureText: 'O mistério das sete estrelas que viste na minha destra e dos sete candeeiros de ouro: as sete estrelas são os anjos das sete igrejas, e os sete candeeiros que viste são as sete igrejas.',
          scriptureRef: 'Apocalipse 1:20',
          meaning: 'Os candeeiros representam as sete igrejas da Ásia. No templo antigo, o candeeiro de ouro (menorá) simbolizava a presença de Deus e a luz da verdade. Aqui, as igrejas são representadas como candeeiros porque sua função é refletir a luz de Cristo no mundo. O ouro simboliza o valor e a preciosidade da Igreja aos olhos de Deus.',
          relevance: 'Cristo andando entre os candeeiros mostra Sua presença ativa entre Seu povo. As igrejas podem estar sofrendo perseguição na terra, mas na realidade celestial, Cristo está presente, atento e caminhando entre elas. Isto traz conforto em tempos de aparente ausência divina.'
        },
        {
          id: 'vestes',
          name: 'Vestes Longas e Cinto de Ouro',
          icon: '👘',
          image: '/images/apocalypse/long-robe-symbol.jpg',
          description: 'Cristo aparece vestido com uma roupa que chegava até os pés e um cinto de ouro ao peito.',
          scriptureText: 'E no meio dos sete candeeiros um semelhante ao Filho do homem, vestido até aos pés de uma veste comprida, e cingido pelos peitos com um cinto de ouro.',
          scriptureRef: 'Apocalipse 1:13',
          meaning: 'As vestes longas e o cinto remetem às vestimentas do Sumo Sacerdote no Antigo Testamento. O cinto atravessado no peito, em vez de na cintura, era característico de autoridade real. Cristo é mostrado em Sua dupla função: rei e sacerdote, mediando entre Deus e a humanidade.',
          relevance: 'Jesus como Sumo Sacerdote celestial garante nosso acesso direto a Deus. Mesmo sob a opressão romana, os cristãos tinham um representante no tribunal celestial, intercedendo por eles. Hoje, isto nos assegura que Cristo continua a interceder por nós (Hebreus 7:25).'
        },
        {
          id: 'cabelos',
          name: 'Cabelos Brancos como Lã',
          icon: '⚪',
          image: '/images/apocalypse/white-hair-symbol.jpg',
          description: 'Os cabelos de Cristo são descritos como brancos, como lã, como neve.',
          scriptureText: 'E a sua cabeça e cabelos eram brancos como lã branca, como a neve, e os seus olhos como chama de fogo.',
          scriptureRef: 'Apocalipse 1:14',
          meaning: 'Cabelos brancos simbolizam sabedoria, pureza e eternidade. Esta imagem conecta Cristo ao "Ancião de Dias" em Daniel 7:9, declarando Sua divindade e natureza eterna. O branco como neve também representa pureza absoluta, sem mácula ou contaminação.',
          relevance: 'A identificação de Jesus com as características do "Ancião de Dias" é uma afirmação poderosa de Sua divindade. Para comunidades cristãs sendo pressionadas a adorar o imperador como deus, esta era uma declaração audaciosa: o verdadeiro Deus eterno é Jesus Cristo, não Domiciano ou qualquer outro governante terreno.'
        },
        {
          id: 'olhos',
          name: 'Olhos como Chama de Fogo',
          icon: '🔥',
          image: '/images/apocalypse/fire-eyes-symbol.jpg',
          description: 'Os olhos de Cristo são descritos como chamas de fogo ardentes.',
          scriptureText: 'E os seus olhos como chama de fogo.',
          scriptureRef: 'Apocalipse 1:14',
          meaning: 'Olhos de fogo simbolizam discernimento perfeito, julgamento penetrante e conhecimento completo. O fogo representa purificação e também julgamento. Nada pode ser escondido deste olhar – Ele vê através de todas as pretensões, enganos e hipocrisia.',
          relevance: 'Para as igrejas da Ásia, algumas das quais estavam comprometendo a verdade ou tolerando falsos ensinamentos, os olhos como fogo lembravam que Cristo vê a realidade interior para além das aparências. Esta imagem traz tanto conforto (Ele vê o verdadeiro sofrimento) quanto advertência (Ele vê o verdadeiro estado espiritual).'
        },
        {
          id: 'pes',
          name: 'Pés como Bronze Polido',
          icon: '🦶',
          image: '/images/apocalypse/bronze-feet-symbol.jpg',
          description: 'Seus pés são semelhantes ao bronze refinado numa fornalha ardente.',
          scriptureText: 'E os seus pés, semelhantes a latão reluzente, como se tivessem sido refinados numa fornalha.',
          scriptureRef: 'Apocalipse 1:15',
          meaning: 'O bronze refinado no fogo representa pureza, estabilidade e força. Na visão de Ezequiel (1:7), os querubins também tinham pés semelhantes. Os pés simbolizam o fundamento sobre o qual Cristo se mantém – imutável e inabalável. Também sugere Seu poder para esmagar Seus inimigos.',
          relevance: 'Os pés de bronze comunicam dois aspectos essenciais: estabilidade e julgamento. Cristo permanece firme enquanto impérios vêm e vão. Para igrejas pressionadas pelo poder de Roma, a mensagem era clara – o reino de Cristo é o único verdadeiramente inabalável e duradouro.'
        },
        {
          id: 'voz',
          name: 'Voz como Muitas Águas',
          icon: '🌊',
          image: '/images/apocalypse/many-waters-symbol.jpg',
          description: 'Sua voz é descrita como o som de muitas águas.',
          scriptureText: 'E a sua voz como a voz de muitas águas.',
          scriptureRef: 'Apocalipse 1:15',
          meaning: 'A voz como muitas águas evoca o poder esmagador de cataratas ou do oceano – irresistível, majestosa e autorizada. Em Ezequiel 43:2, a voz de Deus é similarmente descrita. É a voz do Criador que falou e o universo veio à existência. Representa poder, autoridade e juízo divino.',
          relevance: 'Quando os governantes terrenos emitiam decretos contra os cristãos, a voz mais poderosa no universo era a de Cristo. Esta imagem é um lembrete de que Suas palavras permanecem e superam todas as outras vozes de autoridade. Suas promessas são mais confiáveis que qualquer proclamação humana.'
        },
        {
          id: 'estrelas',
          name: 'Sete Estrelas na Mão Direita',
          icon: '⭐',
          image: '/images/apocalypse/seven-stars-symbol.jpg',
          description: 'Cristo segura sete estrelas em Sua mão direita.',
          scriptureText: 'Tinha na sua destra sete estrelas... As sete estrelas são os anjos das sete igrejas.',
          scriptureRef: 'Apocalipse 1:16, 20',
          meaning: 'As estrelas representam os "anjos" (mensageiros ou líderes) das sete igrejas. Estando na mão direita de Cristo, simboliza que Ele os protege, dirige e tem autoridade sobre eles. A mão direita era o lugar de favor e poder. Isso mostra que a liderança da igreja é um dom de Cristo para Seu povo.',
          relevance: 'Para líderes cristãos enfrentando martírio, esta imagem era profundamente reconfortante – eles estavam seguros na mão de Cristo, independentemente do que acontecesse a seus corpos físicos. Hoje, lembra-nos que a verdadeira liderança espiritual deriva sua autoridade e proteção diretamente de Cristo.'
        },
        {
          id: 'espada',
          name: 'Espada de Dois Gumes',
          icon: '⚔️',
          image: '/images/apocalypse/sharp-sword-symbol.jpg',
          description: 'Da boca de Cristo sai uma espada afiada de dois gumes.',
          scriptureText: 'E da sua boca saía uma aguda espada de dois fios.',
          scriptureRef: 'Apocalipse 1:16',
          meaning: 'A espada representa a Palavra de Deus – penetrante, poderosa e decisiva. Saindo de Sua boca, mostra que Suas palavras têm poder para julgar e separar a verdade da mentira. Em Hebreus 4:12, a Palavra de Deus é comparada a uma espada de dois gumes que penetra até a divisão da alma e do espírito.',
          relevance: 'Em um mundo cheio de propaganda imperial e falsos ensinamentos, a espada simboliza o poder da verdade divina para cortar através das mentiras. Para cristãos hoje, lembra que as palavras de Cristo têm poder para revelar nossos verdadeiros motivos e transformar corações.'
        },
        {
          id: 'face',
          name: 'Face como o Sol',
          icon: '☀️',
          image: '/images/apocalypse/sun-face-symbol.jpg',
          description: 'O rosto de Cristo brilha com intensidade insuportável, como o sol do meio-dia.',
          scriptureText: 'E o seu rosto era como o sol, quando resplandece na sua força.',
          scriptureRef: 'Apocalipse 1:16',
          meaning: 'O rosto que foi cuspido e golpeado durante Sua paixão agora brilha como o sol em sua força. A humilhação deu lugar à exaltação suprema. Este brilho representa a glória revelada de Sua divindade, reminiscente da transfiguração (Mateus 17:2). O mesmo Jesus que foi desprezado agora é a fonte de toda luz e glória.',
          relevance: 'Esta transformação do servo sofredor para o Rei glorioso fornecia esperança para cristãos sofrendo por sua fé. Assim como Cristo passou da cruz para a glória, os fiéis receberiam uma coroa de vida após seu sofrimento temporário. A ressurreição e glorificação de Cristo são o modelo para nosso próprio futuro glorioso.'
        },
        {
          id: 'chaves',
          name: 'As Chaves da Morte e do Hades',
          icon: '🔑',
          image: '/images/apocalypse/keys-symbol.jpg',
          description: 'Cristo declara que possui as chaves da morte e do Hades (o reino dos mortos).',
          scriptureText: 'E o que vive; fui morto, mas eis aqui estou vivo para todo o sempre, Amém. E tenho as chaves da morte e do inferno.',
          scriptureRef: 'Apocalipse 1:18',
          meaning: 'Chaves simbolizam autoridade e acesso. Ao possuir as chaves da morte e do Hades, Cristo demonstra que venceu os maiores inimigos da humanidade através de Sua própria morte e ressurreição. Ele agora controla o destino eterno de todos e pode libertar os cativos. A morte não é mais uma prisão permanente, mas uma porta pela qual Cristo tem a chave.',
          relevance: 'Para cristãos enfrentando a morte por sua fé, esta declaração removia o medo definitivo. A pior arma do imperador – execução – já havia sido derrotada por Cristo. Esta verdade permanece como a fonte definitiva de esperança diante da mortalidade humana, transformando como vivemos e como enfrentamos a morte.'
        }
      ]
    }
  },
  methods: {
    toggleSymbol(index) {
      if (this.expandedSymbol === index) {
        this.expandedSymbol = null
      } else {
        this.expandedSymbol = index

        // Rolagem suave para o símbolo expandido
        this.$nextTick(() => {
          const symbolCard = document.querySelectorAll('.symbol-card')[index]
          if (symbolCard) {
            symbolCard.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            })
          }
        })
      }
    },

    completeStage() {
      this.$emit('complete')
    }
  }
}
</script>

<style scoped>
.meaning-stage {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* Introdução dos símbolos */
.symbols-introduction {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
}

.symbols-introduction h3 {
  font-size: 2rem;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  animation: glow 3s infinite alternate;
}

@keyframes glow {
  0% { text-shadow: 0 0 10px rgba(196, 180, 84, 0.5); }
  100% { text-shadow: 0 0 20px rgba(196, 180, 84, 0.8); }
}

.symbols-introduction p {
  max-width: 800px;
  margin: 0 auto 1rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

/* Grid de símbolos */
.symbols-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.symbol-card {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-normal);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.symbol-card:hover {
  transform: translateY(-5px);
  background-color: rgba(75, 46, 131, 0.3);
  border-color: rgba(196, 180, 84, 0.3);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.symbol-card.expanded {
  grid-column: 1 / -1;
  background-color: rgba(75, 46, 131, 0.2);
  border-color: var(--color-secondary);
  box-shadow: 0 0 30px rgba(196, 180, 84, 0.3);
}

.symbol-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
}

.symbol-icon {
  font-size: 2rem;
  line-height: 1;
}

.symbol-title {
  flex: 1;
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-secondary-light);
}

.expand-icon {
  font-size: 1.5rem;
  color: var(--color-text-muted);
  transition: transform var(--transition-fast);
}

.symbol-card.expanded .expand-icon {
  transform: rotate(180deg);
}

/* Detalhes do símbolo expandido */
.symbol-details {
  padding: 0 1.5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  animation: fadeInDown 0.5s ease;
}

.symbol-card.expanded .symbol-image {
  grid-column: 1;
  grid-row: 1 / span 3;
}

.symbol-image {
  overflow: hidden;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
}

.symbol-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.symbol-image:hover img {
  transform: scale(1.05);
}

.symbol-description {
  grid-column: 2;
  grid-row: 1;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.symbol-scripture {
  grid-column: 2;
  grid-row: 2;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--color-secondary);
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
  grid-column: 1 / -1;
  grid-row: 4;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  margin-top: 1rem;
}

.symbol-meaning h5,
.symbol-relevance h5 {
  color: var(--color-secondary-light);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.symbol-meaning p,
.symbol-relevance p {
  line-height: 1.7;
}

.symbol-relevance {
  grid-column: 1 / -1;
  grid-row: 5;
  padding-top: 1rem;
}

/* Seção de síntese */
.synthesis-section {
  padding: 3rem 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  animation: fadeInUp 1s ease;
}

.synthesis-section h3 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-secondary);
  font-size: 2rem;
}

.synthesis-content {
  max-width: 900px;
  margin: 0 auto;
}

.synthesis-content p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.key-message {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: var(--radius-md);
  margin: 2rem 0;
  border-left: 3px solid var(--color-secondary);
}

.key-message h4,
.application h4 {
  color: var(--color-secondary-light);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.key-message ul,
.application ul {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.key-message li,
.application li {
  margin-bottom: 0.8rem;
  line-height: 1.6;
}

.application {
  background-color: rgba(75, 46, 131, 0.2);
  padding: 2rem;
  border-radius: var(--radius-md);
  margin: 2rem 0;
  border: 1px solid rgba(196, 180, 84, 0.2);
}

.reflection-question {
  font-family: var(--font-family-quote);
  font-style: italic;
  font-size: 1.2rem;
  text-align: center;
  margin: 2.5rem 0;
  color: var(--color-secondary-light);
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

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform-origin: top center;
}

.fade-enter-from {
  opacity: 0;
  transform: scaleY(0.8);
}

.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
}

/* Responsividade */
@media (max-width: 992px) {
  .symbols-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .symbol-details {
    grid-template-columns: 1fr;
  }

  .symbol-card.expanded .symbol-image {
    grid-column: auto;
    grid-row: auto;
  }

  .symbol-description,
  .symbol-scripture {
    grid-column: auto;
    grid-row: auto;
  }
}

@media (max-width: 768px) {
  .symbols-introduction h3,
  .synthesis-section h3 {
    font-size: 1.7rem;
  }

  .symbols-introduction p {
    font-size: 1rem;
  }

  .symbols-grid {
    gap: 1rem;
  }

  .symbol-header {
    padding: 1rem;
  }

  .symbol-icon {
    font-size: 1.5rem;
  }

  .key-message,
  .application {
    padding: 1.5rem;
  }

  .reflection-question {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .symbols-introduction,
  .synthesis-section {
    padding: 1.5rem 1rem;
  }

  .symbol-title {
    font-size: 1rem;
  }

  .symbol-details {
    padding: 0 1rem 1rem;
  }

  .key-message h4,
  .application h4 {
    font-size: 1.2rem;
  }
}
</style>
