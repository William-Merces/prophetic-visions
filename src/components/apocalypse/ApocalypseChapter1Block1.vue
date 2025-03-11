<template>
  <div class="apocalypse-chapter">
    <!-- Bloco 1: Contexto Histórico -->
    <ImersiveNarrative
      v-if="currentBlock === 1"
      :slides="contextSlides"
      blockTitle="Nos Passos de João"
      @complete="completeBlock(1)"
    />

    <!-- Botão para avançar para o próximo bloco (após completar o bloco atual) -->
    <div v-if="blockCompleted && !showNextBlock" class="block-completed">
      <h3>Bloco Concluído</h3>
      <button class="btn btn-secondary" @click="showNextBlock = true">
        Continuar para o próximo bloco
      </button>
    </div>

    <!-- Mensagem temporária para os próximos blocos (a serem implementados) -->
    <div v-if="showNextBlock" class="next-block-preview">
      <h3>Próximo Bloco: A Experiência da Visão</h3>
      <p>Este bloco está em desenvolvimento e estará disponível em breve.</p>
      <p>Aqui você experimentará a visão como se fosse João, com uma narrativa imersiva e imagens detalhadas da visão do Filho do Homem em Apocalipse 1.</p>
      <button class="btn" @click="resetExperience">Voltar ao início</button>
    </div>
  </div>
</template>

<script>
import ImersiveNarrative from './ImersiveNarrative.vue'

export default {
  name: 'ApocalypseChapter1Block1',
  components: {
    ImersiveNarrative
  },
  data() {
    return {
      currentBlock: 1,
      blockCompleted: false,
      showNextBlock: false,
      // Dados do Bloco 1: Contexto Histórico
      contextSlides: [
        {
          title: "Roma, 95 d.C.",
          text: [
            "O Império Romano controla todo o mundo conhecido.",
            "O imperador Domiciano exige ser adorado como 'Senhor e Deus'."
          ],
          backgroundImage: "/images/apocalypse/rome-empire-map.jpg",
          overlayClass: "dark"
        },
        {
          title: "Tempos de Perseguição",
          text: [
            "Para os que seguem a Cristo, recusar-se a adorar o imperador significa perseguição.",
            "Muitos cristãos enfrentam prisão, exílio ou morte por sua fé."
          ],
          backgroundImage: "/images/apocalypse/roman-persecution.jpg",
          overlayClass: "dramatic"
        },
        {
          title: "João, O Último Apóstolo",
          text: [
            "Entre os perseguidos está João, o último apóstolo vivo.",
            "Agora com cerca de 90 anos, ele guarda as memórias de ter caminhado com Jesus.",
            "Aquele que repousou no peito do Mestre durante a Última Ceia."
          ],
          backgroundImage: "/images/apocalypse/apostle-john.jpg",
          overlayClass: "light"
        },
        {
          title: "Exílio em Patmos",
          text: [
            "Por seu testemunho inabalável, João foi exilado para Patmos.",
            "Uma ilha rochosa e árida no Mar Egeu, usada como colônia penal romana.",
            "Separado de seu rebanho, mas não de seu Senhor."
          ],
          backgroundImage: "/images/apocalypse/patmos-island.jpg",
          overlayClass: "dark"
        },
        {
          title: "Igrejas em Crise",
          text: [
            "As sete igrejas da Ásia que João pastoreava estão em crise.",
            "Perseguição externa. Falsos ensinamentos internos. Alguns abandonando a fé.",
            "Eles precisam desesperadamente de esperança e direção."
          ],
          backgroundImage: "/images/apocalypse/asian-churches.jpg",
          overlayClass: "dramatic"
        },
        {
          title: "O Dia do Senhor",
          text: [
            "É domingo, o Dia do Senhor em Patmos.",
            "João está em oração, sozinho nas rochosas encostas da ilha...",
            "Ele não sabe que está prestes a receber a maior revelação da história."
          ],
          backgroundImage: "/images/apocalypse/john-praying-patmos.jpg",
          overlayClass: "light"
        }
      ]
    }
  },
  methods: {
    completeBlock(blockNumber) {
      console.log(`Bloco ${blockNumber} concluído`)
      this.blockCompleted = true
    },

    resetExperience() {
      this.currentBlock = 1
      this.blockCompleted = false
      this.showNextBlock = false
    }
  }
}
</script>

<style scoped>
.apocalypse-chapter {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.block-completed,
.next-block-preview {
  text-align: center;
  padding: 3rem;
  margin: 2rem auto;
  max-width: 800px;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  animation: fadeIn 1s ease;
}

.next-block-preview h3 {
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
}

.next-block-preview p {
  margin-bottom: 1rem;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.next-block-preview .btn {
  margin-top: 1.5rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .apocalypse-chapter {
    padding: 1rem 0.5rem;
  }

  .block-completed,
  .next-block-preview {
    padding: 1.5rem;
  }
}
</style>
