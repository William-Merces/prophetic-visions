<template>
  <div class="prophet-selection" :class="{ 'compact-view': compact }">
    <h2 v-if="showTitle" class="section-title">{{ title }}</h2>

    <div class="prophets-grid" :class="{ 'center-items': centerItems }">
      <!-- Apocalipse - disponível -->
      <router-link to="/apocalypse" class="prophet-card available">
        <div class="card-content">
          <div class="prophet-icon">📖</div>
          <h3 class="prophet-name">Apocalipse</h3>
          <p class="prophet-desc">As visões de João em Patmos</p>
          <div class="availability-badge available">
            <span class="badge-icon">✓</span>
            <span class="badge-text">Disponível</span>
          </div>
        </div>
        <div class="card-overlay">
          <div class="explore-button">EXPLORAR</div>
        </div>
      </router-link>

      <!-- Daniel - bloqueado -->
      <div class="prophet-card locked" @click="showProphetInfo('daniel')">
        <div class="card-content">
          <div class="prophet-icon">🦁</div>
          <h3 class="prophet-name">Daniel</h3>
          <p class="prophet-desc">As visões na Babilônia</p>
          <div class="availability-badge locked">
            <span class="badge-icon">🔒</span>
            <span class="badge-text">Em breve</span>
          </div>
        </div>
        <div class="card-overlay locked">
          <div class="locked-button">EM BREVE</div>
        </div>
      </div>

      <!-- Ezequiel - bloqueado -->
      <div class="prophet-card locked" @click="showProphetInfo('ezequiel')">
        <div class="card-content">
          <div class="prophet-icon">🔥</div>
          <h3 class="prophet-name">Ezequiel</h3>
          <p class="prophet-desc">A visão do trono e do templo</p>
          <div class="availability-badge locked">
            <span class="badge-icon">🔒</span>
            <span class="badge-text">Em breve</span>
          </div>
        </div>
        <div class="card-overlay locked">
          <div class="locked-button">EM BREVE</div>
        </div>
      </div>

      <!-- Isaías - bloqueado -->
      <div class="prophet-card locked" @click="showProphetInfo('isaias')" v-if="!compact">
        <div class="card-content">
          <div class="prophet-icon">👑</div>
          <h3 class="prophet-name">Isaías</h3>
          <p class="prophet-desc">A visão do Senhor no templo</p>
          <div class="availability-badge locked">
            <span class="badge-icon">🔒</span>
            <span class="badge-text">Em breve</span>
          </div>
        </div>
        <div class="card-overlay locked">
          <div class="locked-button">EM BREVE</div>
        </div>
      </div>

      <!-- Moisés - bloqueado -->
      <div class="prophet-card locked" @click="showProphetInfo('moises')" v-if="!compact">
        <div class="card-content">
          <div class="prophet-icon">⛰️</div>
          <h3 class="prophet-name">Moisés</h3>
          <p class="prophet-desc">A visão da criação</p>
          <div class="availability-badge locked">
            <span class="badge-icon">🔒</span>
            <span class="badge-text">Em breve</span>
          </div>
        </div>
        <div class="card-overlay locked">
          <div class="locked-button">EM BREVE</div>
        </div>
      </div>

      <!-- Abraão - bloqueado -->
      <div class="prophet-card locked" @click="showProphetInfo('abraao')" v-if="!compact">
        <div class="card-content">
          <div class="prophet-icon">✨</div>
          <h3 class="prophet-name">Abraão</h3>
          <p class="prophet-desc">A visão das inteligências</p>
          <div class="availability-badge locked">
            <span class="badge-icon">🔒</span>
            <span class="badge-text">Em breve</span>
          </div>
        </div>
        <div class="card-overlay locked">
          <div class="locked-button">EM BREVE</div>
        </div>
      </div>

      <!-- Néfi - bloqueado -->
      <div class="prophet-card locked" @click="showProphetInfo('nefi')" v-if="!compact">
        <div class="card-content">
          <div class="prophet-icon">📜</div>
          <h3 class="prophet-name">Néfi</h3>
          <p class="prophet-desc">A visão da árvore da vida</p>
          <div class="availability-badge locked">
            <span class="badge-icon">🔒</span>
            <span class="badge-text">Em breve</span>
          </div>
        </div>
        <div class="card-overlay locked">
          <div class="locked-button">EM BREVE</div>
        </div>
      </div>
    </div>

    <!-- Modal de informação sobre profeta -->
    <div class="prophet-modal" v-if="showModal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <h3 class="modal-title">
          <span class="modal-icon">{{ modalData.icon }}</span>
          {{ modalData.name }}
        </h3>
        <p class="modal-description">{{ modalData.description }}</p>
        <div class="modal-info">
          <p class="coming-soon">Esta experiência estará disponível em breve.</p>
          <p class="modal-suggestion">
            Enquanto isso, você pode explorar as visões do Apocalipse que já estão disponíveis.
          </p>
        </div>
        <div class="modal-actions">
          <button class="modal-btn close-btn" @click="closeModal">Fechar</button>
          <router-link to="/apocalypse" class="modal-btn action-btn">
            Explorar Apocalipse
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProphetSelectionComponent',
  props: {
    title: {
      type: String,
      default: 'Explore as Visões dos Profetas'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean,
      default: false
    },
    centerItems: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false,
      selectedProphet: null,
      prophetsData: {
        daniel: {
          name: 'Visões de Daniel',
          icon: '🦁',
          description: 'Daniel, servo de Deus no exílio babilônico, recebeu extraordinárias visões proféticas sobre reinos futuros, o Messias e o fim dos tempos. Suas visões incluem as quatro bestas (Daniel 7), o carneiro e o bode (Daniel 8) e a famosa cronologia das setenta semanas (Daniel 9).'
        },
        ezequiel: {
          name: 'Visões de Ezequiel',
          icon: '🔥',
          description: 'O profeta Ezequiel, durante o exílio em Babilônia, contemplou visões impressionantes do trono de Deus, seres celestiais com quatro faces, e um templo futuro detalhado. Suas visões incluem os querubins, a glória de Deus e o vale de ossos secos, representando a restauração de Israel.'
        },
        isaias: {
          name: 'Visões de Isaías',
          icon: '👑',
          description: 'Isaías, um dos maiores profetas de Israel, teve uma visão transformadora do Senhor no templo, onde serafins proclamavam "Santo, Santo, Santo". Esta experiência mudou sua vida e o comissionou como profeta, levando-o a proferir algumas das mais profundas profecias messiânicas da Bíblia.'
        },
        moises: {
          name: 'Visões de Moisés',
          icon: '⛰️',
          description: 'Moisés, o grande libertador de Israel, recebeu revelações divinas no Monte Sinai e contemplou a glória de Deus. Além das tábuas da lei, Moisés recebeu uma visão extraordinária da criação, detalhando os eventos cósmicos e a formação da terra.'
        },
        abraao: {
          name: 'Visões de Abraão',
          icon: '✨',
          description: 'Abraão, o patriarca e pai dos fiéis, recebeu visões divinas sobre sua posteridade e o plano eterno de Deus. Em uma visão extraordinária, contemplou as inteligências organizadas antes da criação do mundo e a grande obra do Senhor nos céus.'
        },
        nefi: {
          name: 'Visões de Néfi',
          icon: '📜',
          description: 'Néfi, filho do profeta Leí, recebeu uma magnífica visão em resposta à sua oração. Nela, contemplou a árvore da vida, o nascimento e ministério do Salvador, o futuro de seu povo e eventos dos últimos dias, incluindo a restauração do evangelho e a batalha entre as forças de luz e das trevas.'
        }
      }
    }
  },
  computed: {
    modalData() {
      return this.selectedProphet ? this.prophetsData[this.selectedProphet] : {};
    }
  },
  methods: {
    showProphetInfo(prophetId) {
      this.selectedProphet = prophetId;
      this.showModal = true;

      // Desabilitar scroll do body quando modal estiver aberto
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      this.showModal = false;
      this.selectedProphet = null;

      // Restaurar scroll do body
      document.body.style.overflow = '';
    }
  },
  beforeUnmount() {
    // Garantir que o scroll é restaurado caso o componente seja desmontado
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>
.prophet-selection {
  width: 100%;
  margin-bottom: 3rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 3rem;
  position: relative;
  letter-spacing: 0.05em;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(196, 180, 84, 0.3);
}

.prophets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.prophets-grid.center-items {
  justify-content: center;
}

/* Versão compacta mostra apenas 3 cards */
.compact-view .prophets-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  max-width: 900px;
}

.prophet-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: linear-gradient(145deg, rgba(30, 30, 30, 0.8), rgba(10, 10, 10, 0.8));
  transition: all var(--transition-normal);
  position: relative;
  box-shadow: var(--shadow-md);
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: default;
}

.prophet-card.available {
  background: linear-gradient(145deg, rgba(48, 24, 96, 0.95), rgba(20, 12, 40, 0.9));
  border-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.2);
  cursor: pointer;
}

.prophet-card.locked:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.prophet-card.available:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 30px rgba(196, 180, 84, 0.3);
}

.card-content {
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.prophet-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-normal);
}

.prophet-card.available .prophet-icon {
  background-color: rgba(48, 24, 96, 0.7);
  border-color: var(--color-primary);
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.3);
}

.prophet-card:hover .prophet-icon {
  transform: scale(1.1);
}

.prophet-name {
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  transition: color var(--transition-normal);
}

.prophet-card.available .prophet-name {
  color: var(--color-primary);
}

.prophet-desc {
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.availability-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  margin-top: auto;
}

.availability-badge.available {
  background-color: rgba(76, 175, 80, 0.2);
  color: var(--color-success);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.availability-badge.locked {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text-muted);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.badge-icon {
  font-size: 1rem;
}

/* Overlay dos cards com botões estilizados */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(48, 24, 96, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all var(--transition-normal);
  pointer-events: none;
}

.card-overlay.locked {
  background-color: rgba(0, 0, 0, 0.8);
}

.prophet-card:hover .card-overlay {
  opacity: 1;
}

/* Botão EXPLORAR estilizado como na imagem */
.explore-button {
  color: var(--color-primary);
  font-size: 1.2rem;
  font-family: var(--font-family-heading);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.7rem 2.5rem;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  background-color: rgba(48, 24, 96, 0.95);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.3), inset 0 0 10px rgba(196, 180, 84, 0.1);
  font-weight: 600;
  position: relative;
  text-shadow: 0 0 8px rgba(196, 180, 84, 0.5);
  transition: all 0.3s ease;
}

.explore-button::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 1px solid rgba(196, 180, 84, 0.3);
  border-radius: var(--radius-md);
  opacity: 0.5;
  transition: all 0.3s ease;
}

.prophet-card:hover .explore-button {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(196, 180, 84, 0.4), inset 0 0 15px rgba(196, 180, 84, 0.2);
}

.prophet-card:hover .explore-button::before {
  opacity: 0.8;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
}

/* Botão EM BREVE para cards bloqueados */
.locked-button {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  font-family: var(--font-family-heading);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.6rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  background-color: rgba(0, 0, 0, 0.5);
}

/* Modal para informações dos profetas */
.prophet-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: var(--color-surface);
  width: 100%;
  max-width: 550px;
  border-radius: var(--radius-lg);
  padding: 2rem;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(196, 180, 84, 0.05);
  border: 1px solid rgba(196, 180, 84, 0.1);
  animation: scaleIn 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  transform: rotate(90deg);
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(196, 180, 84, 0.3);
}

.modal-icon {
  font-size: 2rem;
}

.modal-description {
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.modal-info {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--color-primary);
}

.coming-soon {
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.modal-suggestion {
  color: var(--color-text-muted);
  font-style: italic;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.modal-btn {
  padding: 0.7rem 1.5rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-family-heading);
  font-weight: 500;
  transition: all var(--transition-normal);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.close-btn {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.action-btn {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  box-shadow: 0 0 15px rgba(196, 180, 84, 0.2);
}

.action-btn:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.3);
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* Responsividade */
@media (max-width: 992px) {
  .section-title {
    font-size: 2rem;
  }

  .prophets-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
  }

  .prophets-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .prophet-card .card-content {
    padding: 2rem 1rem;
  }

  .prophet-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5rem;
  }

  .prophet-name {
    font-size: 1.5rem;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem;
  }

  .section-title::after {
    width: 80px;
  }

  .prophets-grid {
    grid-template-columns: 1fr;
    max-width: 280px;
    margin: 0 auto;
  }

  .modal-content {
    padding: 1.2rem;
  }
}
</style>
