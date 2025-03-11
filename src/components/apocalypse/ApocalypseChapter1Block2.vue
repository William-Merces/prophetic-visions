<template>
  <div class="apocalypse-vision">
    <!-- Bloco 2: A Experiência da Visão -->
    <ImersiveNarrative
      v-if="currentStep === 'narration'"
      :slides="visionSlides"
      blockTitle="Através dos Olhos de João"
      :typingSpeed="50"
      @complete="completeNarration"
    />

    <!-- Hotspots interativos após a narração -->
    <div v-if="currentStep === 'interaction'" class="vision-interaction">
      <div class="interactive-wrapper">
        <img
          :src="currentInteractionImage.src"
          :alt="currentInteractionImage.alt"
          class="vision-image"
        >

        <!-- Overlay narrativo inicial -->
        <div v-if="!hasInteracted" class="narrative-overlay" @click="hideNarrativeOverlay">
          <div class="narrative-content">
            <p>{{ currentInteractionImage.narrative }}</p>
            <div class="narrative-hint">Toque nos pontos brilhantes para explorar detalhes da visão</div>
          </div>
        </div>

        <!-- Hotspots -->
        <div
          v-for="(hotspot, index) in currentInteractionImage.hotspots"
          :key="index"
          class="hotspot"
          :class="{ 'active': activeHotspot === index, 'pulsating': !activeHotspot }"
          :style="{
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`
          }"
          @click="selectHotspot(index)"
        >
          <div class="hotspot-indicator"></div>
        </div>

        <!-- Painel de detalhes do hotspot -->
        <transition name="detail-fade">
          <div v-if="activeHotspot !== null" class="hotspot-details">
            <div class="details-header">
              <h3>{{ currentHotspotData.title }}</h3>
              <button class="close-btn" @click="closeHotspot">&times;</button>
            </div>
            <div class="details-content">
              <p>{{ currentHotspotData.description }}</p>
              <div v-if="currentHotspotData.scripture" class="scripture-reference">
                <p class="scripture-text">"{{ currentHotspotData.scripture }}"</p>
                <span class="scripture-verse">{{ currentHotspotData.reference }}</span>
              </div>

              <div v-if="currentHotspotData.reflection" class="reflection-section">
                <h4>Reflexão Pessoal</h4>
                <p>{{ currentHotspotData.reflection }}</p>
              </div>

              <!-- Botões de navegação entre hotspots quando houver múltiplos -->
              <div v-if="currentInteractionImage.hotspots.length > 1" class="hotspot-navigation">
                <button
                  class="nav-btn hotspot-prev"
                  @click.stop="navigateHotspot('prev')"
                  :disabled="activeHotspot === 0"
                >
                  <span class="nav-icon">←</span> Anterior
                </button>
                <button
                  class="nav-btn hotspot-next"
                  @click.stop="navigateHotspot('next')"
                  :disabled="activeHotspot === currentInteractionImage.hotspots.length - 1"
                >
                  Próximo <span class="nav-icon">→</span>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Navegação entre as imagens interativas -->
      <div class="interaction-navigation">
        <button
          v-if="interactionIndex > 0"
          class="nav-btn"
          @click="previousImage"
        >
          <span class="nav-arrow">←</span> Imagem anterior
        </button>

        <div class="image-info">
          <span class="current-image">{{ interactionIndex + 1 }}</span> / {{ interactiveImages.length }}
        </div>

        <button
          v-if="interactionIndex < interactiveImages.length - 1"
          class="nav-btn"
          @click="nextImage"
        >
          Próxima imagem <span class="nav-arrow">→</span>
        </button>

        <button
          v-else
          class="nav-btn complete-btn"
          @click="completeInteraction"
        >
          Concluir <span class="nav-arrow">→</span>
        </button>
      </div>
    </div>

    <!-- Reflexão final após a interação -->
    <div v-if="currentStep === 'reflection'" class="vision-reflection">
      <div class="reflection-container">
        <h2 class="reflection-title">Reflexão: O Encontro Divino</h2>

        <div class="reflection-content">
          <p>Você acaba de experimentar a visão de João do Filho do Homem em toda Sua glória. Agora, tome um momento para refletir sobre esta experiência:</p>

          <div class="reflection-questions">
            <div class="question-item">
              <h3>1. A Santidade Divina</h3>
              <p>Quando você contempla um Cristo tão poderoso e majestoso, como isso transforma sua compreensão de quem Ele é? Como o conhecimento de que Jesus não é apenas um humilde servo, mas o Senhor glorificado, afeta sua adoração?</p>
            </div>

            <div class="question-item">
              <h3>2. A Identidade da Igreja</h3>
              <p>Cristo caminha entre os candeeiros de ouro - as igrejas. O que isso revela sobre o valor que Ele dá à Sua igreja e Sua presença contínua entre os crentes? Como isso desafia a maneira como vemos nossa comunidade de fé?</p>
            </div>

            <div class="question-item">
              <h3>3. O Temor e o Conforto</h3>
              <p>João cai como morto diante da visão, mas é confortado pelo toque de Cristo. Como você equilibra o temor reverente diante da santidade de Deus com a intimidade pessoal que Ele oferece? O que significa receber o "Não temas" divino?</p>
            </div>
          </div>

          <div class="personal-application">
            <h3>Aplicação Pessoal</h3>
            <p>A visão do Cristo glorificado foi dada para fortalecer João e as igrejas que enfrentavam perseguição. Da mesma forma, esta revelação da verdadeira natureza de Cristo nos oferece força em nossos desafios atuais. Leve consigo esta imagem do Cristo glorificado em seu dia a dia, lembrando que o mesmo Jesus que caminhou na Galiléia é também o Rei eternamente reinante.</p>
          </div>
        </div>

        <div class="reflection-actions">
          <button class="btn btn-secondary" @click="completeReflection">
            Concluir Reflexão e Avançar
          </button>
        </div>
      </div>
    </div>

    <!-- Botão para concluir o bloco -->
    <div v-if="currentStep === 'completed'" class="block-completed">
      <h3>Experiência Concluída</h3>
      <p>Você vivenciou a visão de João do Filho do Homem e refletiu sobre seu significado.</p>
      <p class="completion-message">
        "Quando o vi, caí a seus pés como morto. Então ele colocou sua mão direita sobre mim e disse: 'Não tenha medo. Eu sou o Primeiro e o Último. Sou o que vive. Estive morto, mas eis que estou vivo para todo o sempre!'" <span class="verse-ref">— Apocalipse 1:17-18</span>
      </p>
      <button class="btn btn-primary" @click="$emit('complete')">
        Continuar para o próximo bloco
      </button>
    </div>
  </div>
</template>

<script>
import ImersiveNarrative from './ImersiveNarrative.vue'

export default {
  name: 'ApocalypseChapter1Block2',
  components: {
    ImersiveNarrative
  },
  data() {
    return {
      currentStep: 'narration', // 'narration', 'interaction', 'reflection', 'completed'
      interactionIndex: 0,
      activeHotspot: null,
      hasInteracted: false,
      completedSections: {
        narration: false,
        interaction: false,
        reflection: false
      },

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
            },
            {
              x: 50,
              y: 20,
              title: "Não Temas",
              description: "Mesmo na majestade aterrorizante da visão, há uma aura de conforto que começa a envolver você. As primeiras palavras de Cristo - 'Não temas' - começam a acalmar seu coração enquanto Ele se aproxima. Existe uma intimidade e um amor por trás da glória terrível, um desejo de comunicar e não apenas assustar.",
              scripture: "Não temas; Eu sou o primeiro e o último; E o que vive; fui morto, mas eis aqui estou vivo para todo o sempre.",
              reference: "Apocalipse 1:17-18",
              reflection: "O temor é a resposta natural à santidade divina, mas não é o estado final desejado. Cristo não revela Sua glória para nos paralisar de medo, mas para transformar nosso temor em adoração e confiança renovada."
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
              description: "Seus olhos não são como olhos humanos, mas queimam como chamas vivas, penetrantes e ativas. Eles parecem enxergar através de todas as camadas da realidade, conhecendo cada segredo, cada intenção oculta. Quando Ele olha para você, sente como se toda sua vida estivesse exposta - nada pode ser escondido daquele olhar.",
              scripture: "E os seus olhos eram como chama de fogo.",
              reference: "Apocalipse 1:14",
              reflection: "Os olhos que choram por Lázaro também flamejam com discernimento perfeito. O mesmo Jesus que vê nossas lágrimas também conhece nossos corações. Não podemos esconder nada dEle, mas também não precisamos - Ele já conhece e ainda ama."
            },
            {
              x: 50,
              y: 85,
              title: "Pés de Bronze",
              description: "Seus pés brilham como bronze refinado em uma fornalha, reluzentes e indestrutivelmente fortes. Onde Ele pisa, o chão parece vibrar com poder e autoridade. Estes não são pés que vacilam ou tropeçam, mas que permanecem firmes em Seu propósito eterno, capazes de esmagar toda oposição.",
              scripture: "E os seus pés, semelhantes a latão reluzente, como se tivessem sido refinados numa fornalha...",
              reference: "Apocalipse 1:15",
              reflection: "Os pés que foram perfurados na cruz agora resplandecem como metal purificado. O sofrimento deu lugar à força inabalável. A cruz, que parecia derrota, revela-se como o caminho para a glória eterna."
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
            },
            {
              x: 50,
              y: 70,
              title: "Voz como Muitas Águas",
              description: "Quando Cristo fala, sua voz ressoa não como uma voz humana, mas como o som de cachoeiras, oceanos e rios poderosos combinados. É um som majestoso, irresistível e esmagador que vibra em seu peito e enche todo o ambiente. É a voz do Criador, a mesma que pronunciou 'haja luz' e trouxe o universo à existência.",
              scripture: "E a sua voz era como a voz de muitas águas.",
              reference: "Apocalipse 1:15",
              reflection: "A voz que sussurrou parábolas à multidão agora ressoa como o rugido de muitas águas. O mesmo Deus que fala em 'silêncio suave' também proclama Sua verdade com autoridade cósmica que nenhum poder pode silenciar."
            }
          ]
        },
        {
          src: "/images/apocalypse/interactive-falling-rising.jpg",
          alt: "Caindo e Sendo Erguido",
          title: "Caindo e Sendo Erguido",
          narrative: "A visão é simplesmente esmagadora para sua capacidade humana. Como Isaías, Ezequiel e Daniel antes de você, a revelação da glória divina é mais do que um mortal pode suportar. Você cai como morto, completamente sobrecarregado pela santidade divina, mas o que vem a seguir é tão surpreendente quanto a própria visão.",
          hotspots: [
            {
              x: 35,
              y: 60,
              title: "Caindo como Morto",
              description: "Você experimenta o colapso total da força humana diante da santidade divina. Seu corpo simplesmente não consegue permanecer de pé. É como se toda energia vital o abandonasse, deixando-o prostrado e indefeso. Não é um desmaio comum, mas o impacto da presença não mediada de Deus sobre um ser mortal e finito.",
              scripture: "E eu, quando o vi, caí a seus pés como morto...",
              reference: "Apocalipse 1:17",
              reflection: "Há uma diferença entre adoração casual e encontro genuíno com o Deus vivo. A queda de João representa a resposta apropriada à verdadeira santidade - não familiaridade casual, mas prostração reverente diante dAquele que transcende nossa compreensão."
            },
            {
              x: 65,
              y: 40,
              title: "O Toque Confortador",
              description: "Quando pensa que vai morrer, você sente o toque da mão direita de Cristo - a mesma mão que segura as sete estrelas. Não é um toque que queima ou destroi, mas que restaura. É gentil, mas poderoso, transmitindo vida e força para seu corpo debilitado. Com esse toque, começa a retornar à consciência e ouvir Suas palavras de conforto.",
              scripture: "E ele pôs sobre mim a sua destra, dizendo-me: Não temas; Eu sou o primeiro e o último...",
              reference: "Apocalipse 1:17",
              reflection: "O mesmo Cristo que tem poder para nos deixar prostrados também nos levanta com Sua mão direita. Sua santidade nos derruba, mas Seu amor nos ergue. Este é o padrão do encontro divino: somos quebrantados para sermos restaurados."
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
            },
            {
              x: 50,
              y: 30,
              title: "O Primeiro e o Último",
              description: "A voz de Cristo declara: 'Eu sou o Primeiro e o Último'. Estas palavras fazem o tempo e o espaço ao seu redor parecerem dobrar-se. Você vislumbra, por um momento, a eternidade que se estende antes da criação e além do fim dos tempos. Cristo existe antes do início e permanecerá após o fim - toda a história está contida em Seu ser.",
              scripture: "Eu sou o Alfa e o Ômega, o princípio e o fim, diz o Senhor, que é, e que era, e que há de vir, o Todo-Poderoso.",
              reference: "Apocalipse 1:8",
              reflection: "Num mundo de constante mudança, Cristo permanece o ponto fixo - o Primeiro e o Último. Nossa história pessoal, com todos seus altos e baixos, está contida dentro da história maior que Ele sustenta do início ao fim. Nada em nossas vidas está fora de Seu conhecimento ou controle."
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
      if (this.activeHotspot === null) return {}
      return this.currentInteractionImage.hotspots[this.activeHotspot] || {}
    }
  },
  mounted() {
    // Adicionar manipuladores de teclas para navegação
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeUnmount() {
    // Remover manipuladores de teclas
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleKeyDown(event) {
      // Navegação com teclas de seta
      if (this.currentStep === 'interaction') {
        if (event.key === 'ArrowLeft') {
          this.previousImage()
        } else if (event.key === 'ArrowRight') {
          this.nextImage()
        } else if (event.key === 'Escape') {
          this.closeHotspot()
        }
      }
    },

    // Navegação entre etapas
    completeNarration() {
      this.currentStep = 'interaction'
      this.completedSections.narration = true
      // Rolar para o topo quando mudar para a interação
      window.scrollTo(0, 0)
    },

    completeInteraction() {
      this.currentStep = 'reflection'
      this.completedSections.interaction = true
      // Rolar para o topo quando mudar para a reflexão
      window.scrollTo(0, 0)
    },

    completeReflection() {
      this.currentStep = 'completed'
      this.completedSections.reflection = true
      // Rolar para o topo quando concluir
      window.scrollTo(0, 0)
    },

    // Métodos para a interação com hotspots
    hideNarrativeOverlay() {
      this.hasInteracted = true
    },

    selectHotspot(index) {
      this.activeHotspot = index
      this.hasInteracted = true
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

    // Navegação entre imagens
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
    }
  }
}
</script>

<style scoped>
.apocalypse-vision {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
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
}

.interactive-wrapper {
  position: relative;
}

.vision-image {
  width: 100%;
  height: auto;
  display: block;
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
  animation: pulse 2s infinite;
}

.hotspot.active .hotspot-indicator {
  background-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.5), 0 0 15px var(--color-primary);
  transform: translate(-50%, -50%) scale(1.2);
}

.hotspot:hover .hotspot-indicator {
  transform: translate(-50%, -50%) scale(1.3);
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
  50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
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

/* Etapa final: bloco completado */
.block-completed {
  text-align: center;
  padding: var(--space-xxl) var(--space-xl);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  animation: fadeIn 1s ease;
}

.block-completed h3 {
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
  font-size: 1.5rem;
}

.block-completed p {
  margin-bottom: var(--space-lg);
  line-height: 1.7;
}

.completion-message {
  font-family: var(--font-family-quote);
  font-style: italic;
  max-width: 800px;
  margin: 0 auto var(--space-xl);
  padding: var(--space-md);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-secondary);
}

.verse-ref {
  display: block;
  text-align: right;
  color: var(--color-secondary);
  margin-top: var(--space-xs);
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.detail-fade-enter-active, .detail-fade-leave-active {
  transition: all 0.3s ease;
}
.detail-fade-enter-from, .detail-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsividade */
@media (max-width: 768px) {
  .apocalypse-vision {
    padding: 1rem 0.5rem;
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
  }

  .vision-reflection {
    padding: var(--space-md);
  }

  .reflection-title {
    font-size: 1.5rem;
  }
}
</style>
