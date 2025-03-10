<template>
  <div class="revelation">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <div v-if="!chapter" class="revelation-intro">
      <h1>Apocalipse</h1>
      <p class="subtitle">A Revelação de Jesus Cristo a João</p>

      <div class="intro-content">
        <div class="intro-text">
          <p>O livro do Apocalipse, também conhecido como Revelação, é o último livro do Novo Testamento e foi escrito pelo apóstolo João durante seu exílio na ilha de Patmos. Contém uma série de visões proféticas sobre o fim dos tempos, a Segunda Vinda de Jesus Cristo e o triunfo final de Deus sobre o mal.</p>

          <ScriptureQuote reference="Apocalipse 1:1-2">
            Revelação de Jesus Cristo, a qual Deus lhe deu, para mostrar aos seus servos as coisas que brevemente devem acontecer; e pelo seu anjo as enviou, e as notificou a João seu servo. O qual testificou da palavra de Deus, e do testemunho de Jesus Cristo, e de tudo o que tem visto.
          </ScriptureQuote>

          <p>As visões apocalípticas de João estão repletas de simbolismo rico e complexo, representando forças espirituais, eventos históricos e profecias futuras. Através destas páginas, você poderá explorar visualmente cada capítulo e compreender melhor o significado destas poderosas revelações.</p>
        </div>

        <div class="chapter-selection">
          <h3>Selecione um Capítulo</h3>
          <div class="chapters-grid">
            <router-link
              v-for="n in 22"
              :key="n"
              :to="`/revelation/${n}`"
              class="chapter-button"
            >
              {{ n }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="revelation-chapter">
      <VisionViewer
        :title="getChapterTitle(chapter)"
        :subtitle="getChapterSubtitle(chapter)"
        book="revelation"
        :chapter="chapter"
        :description="getChapterDescription(chapter)"
        :scripture-references="getChapterReferences(chapter)"
        :commentary="getChapterCommentary(chapter)"
        :total-chapters="22"
      />

      <div class="chapter-navigation">
        <router-link to="/revelation" class="btn">
          Voltar para Índice
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ScriptureQuote from '@/components/common/ScriptureQuote.vue'
import VisionViewer from '@/components/visions/VisionViewer.vue'

export default {
  name: 'RevelationView',
  components: {
    ScriptureQuote,
    VisionViewer
  },
  props: {
    chapter: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      chapterData: {
        1: {
          title: "A Visão do Filho do Homem",
          subtitle: "João vê o Cristo glorificado",
          description: "No primeiro capítulo do Apocalipse, João recebe uma visão do Senhor ressuscitado e glorificado. Cristo aparece em Sua majestade divina, em meio a sete castiçais de ouro, representando as sete igrejas. O Salvador é descrito com cabelos brancos como lã, olhos como chama de fogo, pés semelhantes a latão fino, e uma voz como de muitas águas. De Sua boca sai uma espada afiada de dois gumes, e Seu rosto brilha como o sol em sua força.\n\nJoão cai aos pés do Senhor como morto, mas é confortado quando o Salvador coloca Sua mão direita sobre ele, dizendo: 'Não temas; Eu sou o primeiro e o último; e o que vive, e fui morto, mas eis que estou vivo para todo o sempre'. O Senhor então instrui João a escrever o que viu, o que é, e o que há de acontecer depois destas coisas.",
          scriptureReferences: [
            {
              source: "Apocalipse 1:12-18",
              text: "E, virando-me, vi sete castiçais de ouro; E no meio dos sete castiçais um semelhante ao Filho do homem, vestido até aos pés de uma roupa comprida, e cingido pelos peitos com um cinto de ouro. E a sua cabeça e cabelos eram brancos como lã branca, como a neve, e os seus olhos como chama de fogo; E os seus pés, semelhantes a latão fino, ardente como em fornalha; e a sua voz como a voz de muitas águas. E tinha na sua destra sete estrelas; e da sua boca saía uma aguda espada de dois fios; e o seu rosto era como o sol, quando na sua força resplandece. E eu, quando o vi, caí a seus pés como morto; e ele pôs sobre mim a sua destra, dizendo-me: Não temas; Eu sou o primeiro e o último; E o que vivo e fui morto, mas eis aqui estou vivo para todo o sempre. Amém. E tenho as chaves da morte e do inferno."
            },
            {
              source: "D&C 110:2-3",
              text: "Vimos o Senhor de pé no parapeito do púlpito, diante de nós; e sob seus pés havia um pavimento de ouro puro, da cor de âmbar. Seus olhos eram como labareda de fogo; os cabelos de sua cabeça eram brancos como a pura neve; seu semblante resplandecia mais do que o brilho do sol; e sua voz era como o ruído de muitas águas, sim, a voz de Jeová."
            }
          ],
          commentary: "O presidente Joseph Fielding Smith ensinou: 'Em Sua aparição a João em Patmos, nosso Salvador apareceu em Sua glória ressuscitada. Ele apareceu de maneira semelhante ao profeta Joseph Smith e a Oliver Cowdery no Templo de Kirtland em 3 de abril de 1836. A descrição é quase idêntica... Esta semelhança não é coincidência, mas uma confirmação da verdade da revelação divina nos tempos antigos e modernos.' (Doutrinas de Salvação, vol. 1, p. 25)"
        },
        2: {
          title: "Mensagens às Sete Igrejas (Parte 1)",
          subtitle: "Éfeso, Esmirna, Pérgamo e Tiatira",
          description: "No segundo capítulo, Cristo dirige mensagens específicas a quatro das sete igrejas da Ásia. Cada mensagem inclui elogios por forças, advertências sobre fraquezas e promessas aos que vencerem. À igreja de Éfeso, Cristo reconhece sua perseverança e discernimento doutrinário, mas adverte que eles abandonaram seu primeiro amor. À igreja de Esmirna, que sofre tribulação e pobreza, Cristo dá um encorajamento a ser fiel até a morte. À igreja de Pérgamo, Cristo elogia por manter a fé em meio à perseguição, mas adverte contra falsas doutrinas. À igreja de Tiatira, Cristo reconhece suas obras de caridade e serviço, mas adverte contra tolerar o falso ensinamento.",
          scriptureReferences: [
            {
              source: "Apocalipse 2:7",
              text: "Quem tem ouvidos, ouça o que o Espírito diz às igrejas: Ao que vencer, dar-lhe-ei a comer da árvore da vida, que está no meio do paraíso de Deus."
            },
            {
              source: "Apocalipse 2:10",
              text: "Não temas as coisas que hás de padecer. Eis que o diabo lançará alguns de vós na prisão, para que sejais tentados; e tereis uma tribulação de dez dias. Sê fiel até à morte, e dar-te-ei a coroa da vida."
            }
          ],
          commentary: "O Élder Bruce R. McConkie explicou: 'As sete igrejas da Ásia receberam conselhos específicos do Senhor ressuscitado através de João, mas estes conselhos se aplicam a todos os santos em todas as eras. Os elogios, as advertências e as promessas não são apenas para os membros do primeiro século, mas para todos os que buscam herdar as bênçãos do reino do Pai.'"
        }
        // Outros capítulos seriam adicionados conforme necessário
      }
    }
  },
  methods: {
    getChapterTitle(chapter) {
      const chapterNum = parseInt(chapter)
      return this.chapterData[chapterNum]?.title || `Capítulo ${chapterNum}`
    },

    getChapterSubtitle(chapter) {
      const chapterNum = parseInt(chapter)
      return this.chapterData[chapterNum]?.subtitle || ''
    },

    getChapterDescription(chapter) {
      const chapterNum = parseInt(chapter)
      return this.chapterData[chapterNum]?.description || 'Descrição em breve...'
    },

    getChapterReferences(chapter) {
      const chapterNum = parseInt(chapter)
      return this.chapterData[chapterNum]?.scriptureReferences || []
    },

    getChapterCommentary(chapter) {
      const chapterNum = parseInt(chapter)
      return this.chapterData[chapterNum]?.commentary || ''
    },

    createStars() {
      const starsContainer = document.querySelector('.stars-container')
      const starCount = 100

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.classList.add('star')

        // Posicionar aleatoriamente
        const x = Math.random() * 100
        const y = Math.random() * 100

        // Tamanho aleatório
        const size = Math.random() * 2 + 1

        // Tempo de animação aleatório
        const duration = Math.random() * 3 + 2

        star.style.left = `${x}%`
        star.style.top = `${y}%`
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.animationDuration = `${duration}s`

        starsContainer.appendChild(star)
      }
    }
  },
  mounted() {
    this.createStars()
  }
}
</script>

<style scoped>
.revelation {
  position: relative;
}

.revelation-intro {
  padding: var(--space-lg) 0;
}

.subtitle {
  text-align: center;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xl);
}

.intro-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--space-xl);
}

.intro-text {
  line-height: 1.8;
}

.intro-text p {
  margin-bottom: var(--space-lg);
}

.chapter-selection {
  background-color: var(--color-surface);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chapter-selection h3 {
  text-align: center;
  margin-bottom: var(--space-md);
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-sm);
}

.chapter-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--space-sm);
  background-color: var(--color-primary-dark);
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  text-align: center;
  font-family: var(--font-family-heading);
}

.chapter-button:hover {
  background-color: var(--color-primary);
  transform: translateY(-2px);
}

.revelation-chapter {
  padding: var(--space-lg) 0;
}

.chapter-navigation {
  display: flex;
  justify-content: center;
  margin-top: var(--space-xl);
}

@media (max-width: 768px) {
  .intro-content {
    grid-template-columns: 1fr;
  }

  .chapters-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 480px) {
  .chapters-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
