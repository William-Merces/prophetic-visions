<template>
  <div class="dark-band-section" :class="{ 'full-height': fullHeight }">
    <!-- Fundo com faixa escura -->
    <div class="section-background">
      <div class="dark-band" :style="bandStyle"></div>
    </div>

    <!-- Conteúdo da seção -->
    <div class="section-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DarkBandBackground',
  props: {
    fullHeight: {
      type: Boolean,
      default: false
    },
    bandHeight: {
      type: Number,
      default: 300
    },
    bandOpacity: {
      type: Number,
      default: 0.8,
      validator: value => value >= 0 && value <= 1
    },
    bandColor: {
      type: String,
      default: 'rgba(20, 10, 40, $opacity)' // Tom roxo escuro por padrão
    }
  },
  computed: {
    bandStyle() {
      // Substitui o placeholder $opacity pelo valor real
      const midColor = this.bandColor.replace('$opacity', this.bandOpacity.toString());
      const edgeColor = this.bandColor.replace('$opacity', '0');

      return {
        height: `${this.bandHeight}px`,
        background: `linear-gradient(
          to bottom,
          ${edgeColor} 0%,
          ${midColor.replace('$opacity', (this.bandOpacity * 0.8).toString())} 30%,
          ${midColor} 50%,
          ${midColor.replace('$opacity', (this.bandOpacity * 0.8).toString())} 70%,
          ${edgeColor} 100%
        )`
      };
    }
  }
}
</script>

<style scoped>
.dark-band-section {
  position: relative;
  width: 100%;
  min-height: 50vh; /* Metade da altura da viewport por padrão */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.dark-band-section.full-height {
  min-height: 100vh;
}

.section-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.dark-band {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  z-index: 2;
}

.section-content {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Responsividade */
@media (max-width: 768px) {
  .dark-band {
    height: 250px !important;
  }
}

@media (max-width: 480px) {
  .dark-band {
    height: 200px !important;
  }

  .section-content {
    padding: 1.5rem;
  }
}
</style>
