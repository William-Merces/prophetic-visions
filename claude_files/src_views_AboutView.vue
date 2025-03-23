<template>
  <div class="about">
    <div class="about-header">
      <h1>Sobre Prophetic Visions</h1>
    </div>

    <div class="about-content">
      <div class="about-section">
        <h2>Nossa Missão</h2>
        <p>Prophetic Visions foi criado com o objetivo de tornar as visões proféticas das escrituras mais acessíveis e compreensíveis através de uma experiência visual e interativa. Queremos ajudar os membros de A Igreja de Jesus Cristo dos Santos dos Últimos Dias a entender mais profundamente as profecias e revelações contidas nas escrituras.</p>

        <ScriptureQuote reference="D&C 76:12">
          Pelo poder do Espírito nossos olhos foram abertos e nosso entendimento foi iluminado, de modo a ver e compreender as coisas de Deus.
        </ScriptureQuote>
      </div>

      <div class="about-section">
        <h2>Nossa Abordagem</h2>
        <p>Combinamos imagens detalhadas criadas por inteligência artificial com narrativas escritas e interpretações baseadas em fontes confiáveis:</p>

        <ul class="sources-list">
          <li>Bíblia Sagrada (Velho e Novo Testamento)</li>
          <li>O Livro de Mórmon</li>
          <li>Doutrina e Convênios</li>
          <li>Pérola de Grande Valor</li>
          <li>Ensinamentos de profetas e apóstolos modernos</li>
        </ul>

        <p>Cada visão é apresentada com imagens interativas que permitem explorar elementos específicos e suas interpretações. As explicações são baseadas nas escrituras e nos ensinamentos da Igreja, com referências para estudo adicional.</p>
      </div>

      <div class="about-section">
        <h2>Planos Futuros</h2>
        <p>Prophetic Visions está em constante desenvolvimento. Começando com o Livro do Apocalipse, planejamos expandir para incluir as visões de outros profetas nas escrituras:</p>

        <ul class="future-list">
          <li>As visões de Daniel</li>
          <li>As visões de Ezequiel</li>
          <li>As visões de Moisés</li>
          <li>As visões de Néfi</li>
          <li>As visões de Abraão</li>
        </ul>

        <p>Estamos comprometidos em continuar melhorando a experiência e adicionando mais conteúdo para ajudar na compreensão das profecias e visões contidas nas escrituras.</p>
      </div>

      <div class="about-section">
        <h2>Disclaimer</h2>
        <p>Prophetic Visions não é um produto oficial de A Igreja de Jesus Cristo dos Santos dos Últimos Dias. As interpretações fornecidas são baseadas em fontes doutrinárias oficiais, mas representam nosso melhor entendimento baseado nessas fontes.</p>
        <p>Incentivamos todos os usuários a estudar as escrituras por si mesmos, orar por revelação pessoal e buscar a orientação do Espírito Santo para a compreensão das profecias.</p>

        <ScriptureQuote reference="Morôni 10:4-5">
          E quando receberdes estas coisas, eu vos exorto a perguntardes a Deus, o Pai Eterno, em nome de Cristo, se estas coisas não são verdadeiras; e se perguntardes com um coração sincero e com real intenção, tendo fé em Cristo, ele vos manifestará sua verdade disso pelo poder do Espírito Santo.
          E pelo poder do Espírito Santo podeis saber a verdade de todas as coisas.
        </ScriptureQuote>
      </div>

      <div class="about-actions">
        <router-link to="/" class="btn">Voltar para o Início</router-link>
        <router-link to="/revelation" class="btn btn-secondary">Explorar Apocalipse</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ScriptureQuote from '@/components/common/ScriptureQuote.vue'

export default {
  name: 'AboutView',
  components: {
    ScriptureQuote
  }
}
</script>

<style scoped>
.about {
  max-width: 900px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.about-section {
  margin-bottom: var(--space-xxl);
}

.about-section h2 {
  margin-bottom: var(--space-md);
  color: var(--color-secondary);
  border-bottom: 1px solid rgba(196, 180, 84, 0.3);
  padding-bottom: var(--space-xs);
}

.about-section p {
  margin-bottom: var(--space-md);
  line-height: 1.8;
}

.sources-list,
.future-list {
  margin: var(--space-md) 0 var(--space-lg) var(--space-xl);
}

.sources-list li,
.future-list li {
  margin-bottom: var(--space-sm);
  line-height: 1.6;
}

.about-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-top: var(--space-xxl);
}

@media (max-width: 768px) {
  .about-actions {
    flex-direction: column;
    gap: var(--space-sm);
  }
}
</style>
