<template>
  <ImersiveExperience
    :experience-title="experienceTitle"
    :experience-subtitle="experienceSubtitle"
    :intro-text="introText"
    :stages="stages"
    @complete="completeExperience"
  >
    <template #stage-context>
      <ContextStage />
    </template>
    <template #stage-revelation>
      <RevelationStage />
    </template>
    <template #stage-meaning>
      <MeaningStage />
    </template>
  </ImersiveExperience>
</template>

<script>
// eslint-disable-next-line vue/no-unused-components
import ImersiveExperience from './ImersiveExperience.vue'
// eslint-disable-next-line vue/no-unused-components
import ContextStage from './ContextStage.vue'
// eslint-disable-next-line vue/no-unused-components
import RevelationStage from './RevelationStage.vue'
// eslint-disable-next-line vue/no-unused-components
import MeaningStage from './MeaningStage.vue'

export default {
  name: 'ApocalypseExperience',
  components: {
    ImersiveExperience,
    ContextStage,
    RevelationStage,
    MeaningStage
  },
  data() {
    return {
      experienceTitle: 'APOCALIPSE',
      experienceSubtitle: 'As Visões de João em Patmos',
      introText: `
        <p>Bem-vindo à jornada imersiva pelas visões do Apocalipse, o último e mais enigmático livro da Bíblia.</p>

        <p>Você está prestes a entrar no mundo do apóstolo João, que, exilado na ilha de Patmos por volta do ano 95 d.C., recebeu a mais extraordinária revelação de Jesus Cristo.</p>

        <p>Esta experiência lhe permitirá:</p>
        <ul>
          <li>Compreender o contexto histórico em que as visões foram recebidas</li>
          <li>Ver e sentir as visões como se você estivesse com João</li>
          <li>Explorar o significado profundo dos símbolos e sua relevância</li>
        </ul>

        <p>Prepare-se para uma jornada transformadora pelas visões proféticas que têm fascinado e inspirado cristãos por dois milênios.</p>
      `,
      stages: [
        {
          title: 'O Cenário',
          tagline: 'Compreenda o momento histórico da revelação',
          icon: '📜',
          component: ContextStage,
          coverStyle: {
            backgroundImage: 'url("/images/apocalypse/patmos-island.jpg")'
          }
        },
        {
          title: 'A Revelação',
          tagline: 'Veja o que o profeta viu em primeira pessoa',
          icon: '👁️',
          component: RevelationStage,
          coverStyle: {
            backgroundImage: 'url("/images/apocalypse/son-of-man.jpg")'
          }
        },
        {
          title: 'O Significado',
          tagline: 'Entenda o que viu, explore os símbolos da visão',
          icon: '🔍',
          component: MeaningStage,
          coverStyle: {
            backgroundImage: 'url("/images/apocalypse/seven-lampstands-symbol.jpg")'
          }
        }
      ]
    }
  },
  methods: {
    completeExperience(completedStages) {
      // Emitir evento para o componente pai
      this.$emit('complete', {
        chapter: 'apocalypse-chapter-1',
        completedStages
      })

      // Opcional: Redirecionar para outra página ou mostrar certificado
      // this.$router.push('/apocalypse/completed')

      // Notificar o usuário
      alert('Parabéns! Você completou a jornada pelo primeiro capítulo do Apocalipse.')
    }
  }
}
</script>
