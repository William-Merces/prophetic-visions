<template>
  <div class="interactive-image-container" ref="container">
    <div class="image-wrapper">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="interactive-image"
        ref="image"
        @load="initializeImage"
      >

      <div
        v-for="(hotspot, index) in hotspots"
        :key="index"
        class="hotspot"
        :class="{ 'active': activeHotspot === index }"
        :style="{
          left: `${hotspot.x}%`,
          top: `${hotspot.y}%`,
          transform: 'translate(-50%, -50%)'
        }"
        @click="selectHotspot(index)"
      ></div>

      <div v-if="activeHotspot !== null" class="hotspot-tooltip" :style="tooltipStyle">
        <div class="tooltip-header">
          <h4>{{ activeHotspotData.title }}</h4>
          <button class="close-tooltip" @click="closeTooltip">×</button>
        </div>
        <div class="tooltip-content">
          <p>{{ activeHotspotData.description }}</p>
          <button v-if="activeHotspotData.hasDetails" class="btn-secondary tooltip-btn" @click="openDetails">
            Ver Mais
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InteractiveImage',
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      default: 'Imagem interativa'
    },
    hotspots: {
      type: Array,
      required: true
      // Each hotspot should have: { x, y, title, description, hasDetails }
      // x and y are percentages (0-100) of the image dimensions
    }
  },
  data() {
    return {
      activeHotspot: null,
      tooltipStyle: {}
    }
  },
  computed: {
    activeHotspotData() {
      return this.activeHotspot !== null ? this.hotspots[this.activeHotspot] : null
    }
  },
  methods: {
    initializeImage() {
      // Image has loaded, ready for interaction
      console.log('Image loaded and ready')
    },

    selectHotspot(index) {
      if (this.activeHotspot === index) {
        this.closeTooltip()
        return
      }

      this.activeHotspot = index
      this.$nextTick(() => {
        this.positionTooltip()
      })
    },

    closeTooltip() {
      this.activeHotspot = null
    },

    positionTooltip() {
      if (this.activeHotspot === null || !this.$refs.container) return

      const container = this.$refs.container
      const containerRect = container.getBoundingClientRect()
      const hotspot = this.hotspots[this.activeHotspot]

      // Calculate position as pixels
      const posX = (hotspot.x / 100) * containerRect.width
      const posY = (hotspot.y / 100) * containerRect.height

      // Determine if tooltip should go above, below, left, or right
      // For simplicity, we'll just place it below the hotspot
      this.tooltipStyle = {
        left: `${posX}px`,
        top: `${posY + 20}px`,
        transform: 'translateX(-50%)'
      }

      // Adjust if tooltip would go off-screen
      const tooltipElement = container.querySelector('.hotspot-tooltip')
      if (tooltipElement) {
        const tooltipRect = tooltipElement.getBoundingClientRect()

        // Adjust horizontal position if needed
        if (posX - (tooltipRect.width / 2) < 0) {
          this.tooltipStyle.left = '10px'
          this.tooltipStyle.transform = 'translateX(0)'
        } else if (posX + (tooltipRect.width / 2) > containerRect.width) {
          this.tooltipStyle.left = `${containerRect.width - 10}px`
          this.tooltipStyle.transform = 'translateX(-100%)'
        }
      }
    },

    openDetails() {
      if (this.activeHotspot !== null) {
        this.$emit('open-details', this.activeHotspot)
      }
    }
  },
  mounted() {
    // Add resize listener to reposition tooltip if window resizes
    window.addEventListener('resize', this.positionTooltip)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.positionTooltip)
  }
}
</script>

<style scoped>
.interactive-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-md);
}

.image-wrapper {
  position: relative;
}

.interactive-image {
  display: block;
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
}

.hotspot {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: var(--color-secondary);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3), 0 0 10px rgba(196, 180, 84, 0.7);
  transition: all var(--transition-fast);
}

.hotspot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: var(--color-background);
  border-radius: 50%;
}

.hotspot.active {
  background-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-dark), 0 0 15px var(--color-primary);
}

.hotspot:hover {
  transform: translate(-50%, -50%) scale(1.2);
}

.hotspot-tooltip {
  position: absolute;
  z-index: 20;
  width: 250px;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  animation: tooltip-appear var(--transition-normal) forwards;
}

@keyframes tooltip-appear {
  from {
    opacity: 0;
    transform: translateY(10px) translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primary-dark);
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tooltip-header h4 {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text);
}

.close-tooltip {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.tooltip-content {
  padding: var(--space-md);
}

.tooltip-content p {
  margin-bottom: var(--space-md);
  font-size: 0.9rem;
}

.tooltip-btn {
  width: 100%;
  font-size: 0.8rem;
  padding: var(--space-xs) var(--space-md);
}

@media (max-width: 768px) {
  .hotspot {
    width: 24px;
    height: 24px;
  }

  .hotspot::before {
    width: 12px;
    height: 12px;
  }

  .hotspot-tooltip {
    width: calc(100% - 40px);
    max-width: 300px;
  }
}
</style>
