<template>
  <div class="home">
    <div class="stars-container">
      <!-- Animação de estrelas via JavaScript no mounted() -->
    </div>

    <!-- Hero Section com visão imersiva -->
    <div class="hero-section">
      <h1 class="hero-title">
        <span class="hero-title-line">Prophetic</span>
        <span class="hero-title-line">Visions</span>
      </h1>
      <h2 class="hero-subtitle">Veja com os olhos dos profetas</h2>

      <div class="hero-description">
        <p>Uma experiência imersiva que permite você visualizar as mesmas visões celestiais reveladas aos profetas através dos tempos.</p>
        <p>Mergulhe nas escrituras como nunca antes, entendendo o significado profundo por trás de cada símbolo e a relevância para os dias atuais.</p>
      </div>

      <div class="hero-actions">
        <router-link to="/apocalypse" class="btn btn-hero">
          Iniciar Jornada Profética
          <span class="btn-icon">→</span>
        </router-link>
      </div>
    </div>

    <!-- Seção de recursos/características da experiência -->
    <div class="features-section">
      <h2>Sua jornada profética inclui</h2>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">👁️</div>
          <h3>Visualização Imersiva</h3>
          <p>Imagens detalhadas que recriam as visões exatamente como os profetas as descreveram, permitindo que você veja o que eles viram.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <h3>Interpretação Profunda</h3>
          <p>Explicações detalhadas de cada símbolo e seu significado teológico, tornando compreensível o que antes parecia misterioso.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📜</div>
          <h3>Contexto Histórico</h3>
          <p>Conheça o cenário em que estas revelações foram recebidas, enriquecendo sua compreensão dos eventos proféticos.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🔄</div>
          <h3>Conexões Escriturísticas</h3>
          <p>Descubra como as visões de diferentes profetas se conectam através dos séculos, revelando o plano divino em toda sua amplitude.</p>
        </div>
      </div>
    </div>

    <!-- Seção de livros proféticos disponíveis -->
    <div class="books-section">
      <h2>Livros Proféticos</h2>
      <p class="section-description">Sua jornada começa com o Apocalipse, com mais livros proféticos sendo disponibilizados em breve.</p>

      <div class="books-container">
        <div
          v-for="book in books"
          :key="book.id"
          class="book-card"
          :class="{ 'unlocked': book.unlocked }"
        >
          <div class="book-cover">
            <div class="book-spine"></div>
            <div class="book-front">
              <div class="book-icon">{{ book.icon }}</div>
              <h3 class="book-title">{{ book.name }}</h3>
              <div class="book-author">{{ book.author }}</div>

              <div class="book-status">
                <template v-if="book.unlocked">
                  <span class="status-available">
                    <span class="check-icon">✓</span> Disponível
                  </span>
                </template>
                <template v-else>
                  <span class="status-locked">
                    <span class="lock-icon">🔒</span> Em breve
                  </span>
                </template>
              </div>
            </div>
          </div>

          <div class="book-content">
            <p class="book-description">{{ book.description }}</p>

            <div class="book-action">
              <router-link
                v-if="book.unlocked"
                :to="book.route"
                class="btn btn-book"
              >
                Explorar Visões
              </router-link>
              <button
                v-else
                class="btn btn-book disabled"
                disabled
              >
                Em desenvolvimento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de depoimentos/feedback -->
    <div class="testimonials-section">
      <h2>O que as pessoas estão dizendo</h2>

      <div class="testimonials-container">
        <div class="testimonial-card">
          <div class="testimonial-quote">"Nunca entendi completamente o Apocalipse até experimentar esta jornada visual. Agora os símbolos fazem sentido!"</div>
          <div class="testimonial-author">Mateus S.</div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-quote">"A forma como as conexões entre diferentes visões proféticas são mostradas me deu uma perspectiva totalmente nova sobre as escrituras."</div>
          <div class="testimonial-author">Raquel L.</div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-quote">"Ver as visões como João as viu me fez sentir como se eu estivesse realmente em Patmos. Uma experiência transformadora!"</div>
          <div class="testimonial-author">Pedro A.</div>
        </div>
      </div>
    </div>

    <!-- Call to action final -->
    <div class="final-cta">
      <h2>Pronto para ver com os olhos dos profetas?</h2>
      <p>Embarque nesta jornada visual pelas revelações divinas e descubra um novo nível de compreensão profética.</p>
      <router-link to="/apocalypse" class="btn btn-hero">
        Começar Agora
        <span class="btn-icon">→</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      books: [
        {
          id: 'apocalypse',
          name: 'Apocalipse',
          author: 'João, o Revelador',
          description: 'A revelação de Jesus Cristo a João em Patmos, com visões do trono celestial, os sete selos, e o destino final da humanidade.',
          icon: '📖',
          unlocked: true,
          route: '/apocalypse'
        },
        {
          id: 'daniel',
          name: 'Daniel',
          author: 'Daniel, o Profeta',
          description: 'Visões de impérios mundiais, o Ancião de Dias, e profecias detalhadas sobre o fim dos tempos.',
          icon: '🦁',
          unlocked: false,
          route: '/daniel'
        },
        {
          id: 'ezekiel',
          name: 'Ezequiel',
          author: 'Ezequiel, o Sacerdote',
          description: 'Visões da glória divina, criaturas celestiais, rodas místicas e o templo restaurado.',
          icon: '🔥',
          unlocked: false,
          route: '/ezekiel'
        },
        {
          id: 'isaiah',
          name: 'Isaías',
          author: 'Isaías, o Profeta',
          description: 'Visão do trono divino, serafins clamando "Santo", e revelações sobre o Messias vindouro.',
          icon: '👑',
          unlocked: false,
          route: '/isaiah'
        }
      ]
    }
  },
  mounted() {
    this.createStars();
  },
  methods: {
    createStars() {
      const starsContainer = document.querySelector('.stars-container');
      if (!starsContainer) return;

      const starCount = 150;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Posicionar aleatoriamente
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamanho aleatório
        const size = Math.random() * 2 + 1;

        // Tempo de animação aleatório
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;

        starsContainer.appendChild(star);
      }
    }
  }
}
</script>

<style scoped>
.home {
  position: relative;
}

.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: twinkle var(--transition-slow) infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.2; }
  100% { opacity: 0.8; }
}

/* Hero Section */
.hero-section {
  height: 90vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--space-xl);
  background: radial-gradient(circle at center, rgba(75, 46, 131, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
}

.hero-title {
  font-size: 4rem;
  margin-bottom: var(--space-md);
  text-shadow: 0 0 20px rgba(196, 180, 84, 0.7);
  letter-spacing: 0.1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-title-line {
  font-size: 6rem;
  font-weight: 700;
  line-height: 1.1;
  background: linear-gradient(to right, var(--color-secondary) 0%, #ffffff 50%, var(--color-secondary) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  text-shadow: 0 0 20px rgba(196, 180, 84, 0.7);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { text-shadow: 0 0 10px rgba(196, 180, 84, 0.7); }
  to { text-shadow: 0 0 20px rgba(196, 180, 84, 0.9), 0 0 30px rgba(196, 180, 84, 0.5); }
}

.hero-subtitle {
  font-size: 1.8rem;
  color: var(--color-secondary-light);
  margin-bottom: var(--space-lg);
  font-family: var(--font-family-quote);
  font-weight: 400;
  font-style: italic;
}

.hero-description {
  max-width: 800px;
  margin-bottom: var(--space-xl);
}

.hero-description p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

.hero-actions {
  margin-top: var(--space-lg);
}

.btn-hero {
  font-size: 1.2rem;
  padding: var(--space-md) var(--space-xl);
  background-color: var(--color-secondary);
  color: var(--color-background);
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.3);
}

.btn-hero:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px rgba(196, 180, 84, 0.5);
  background-color: var(--color-secondary-light);
}

.btn-icon {
  transition: transform var(--transition-fast);
}

.btn-hero:hover .btn-icon {
  transform: translateX(5px);
}

/* Features Section */
.features-section {
  padding: var(--space-xxl) var(--space-xl);
  background-color: rgba(0, 0, 0, 0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
}

.features-section h2 {
  font-size: 2.5rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-xl);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-5px);
  background-color: rgba(75, 46, 131, 0.2);
  border-color: rgba(196, 180, 84, 0.3);
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--space-md);
  color: var(--color-secondary);
}

.feature-card h3 {
  font-size: 1.3rem;
  color: var(--color-secondary-light);
  margin-bottom: var(--space-md);
}

.feature-card p {
  line-height: 1.7;
  color: var(--color-text);
}

/* Books Section */
.books-section {
  padding: var(--space-xxl) var(--space-xl);
  text-align: center;
}

.books-section h2 {
  font-size: 2.5rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
}

.section-description {
  max-width: 800px;
  margin: 0 auto var(--space-xl);
  font-size: 1.1rem;
  color: var(--color-text-muted);
}

.books-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.book-card {
  background: linear-gradient(145deg, rgba(30, 30, 30, 0.7), rgba(20, 20, 20, 0.9));
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-normal);
  height: 100%;
  box-shadow: var(--shadow-md);
  position: relative;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
}

.book-card.unlocked {
  opacity: 1;
  background: linear-gradient(145deg, rgba(75, 46, 131, 0.3), rgba(20, 20, 20, 0.9));
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.book-card:hover {
  transform: translateY(-10px) rotate(1deg);
}

.book-card.unlocked:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(196, 180, 84, 0.3);
}

.book-cover {
  position: relative;
  display: flex;
  height: 200px;
  perspective: 1000px;
  margin-bottom: var(--space-md);
}

.book-spine {
  width: 40px;
  height: 100%;
  background: linear-gradient(to right, rgba(50, 50, 50, 0.8), rgba(30, 30, 30, 0.8));
  transform-origin: left;
  transform: rotateY(25deg);
  border-radius: 2px 0 0 2px;
}

.book-card.unlocked .book-spine {
  background: linear-gradient(to right, var(--color-secondary-dark), var(--color-primary-dark));
  box-shadow: 0 0 10px rgba(196, 180, 84, 0.2);
}

.book-front {
  position: absolute;
  left: 20px;
  top: 0;
  width: calc(100% - 40px);
  height: 100%;
  background: linear-gradient(45deg, rgba(40, 40, 40, 0.9), rgba(60, 60, 60, 0.9));
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 0 5px 5px 0;
  transform-origin: left;
  transform: rotateY(15deg);
  transition: all var(--transition-normal);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
}

.book-card.unlocked .book-front {
  background: linear-gradient(45deg, rgba(75, 46, 131, 0.7), rgba(40, 40, 40, 0.9));
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(196, 180, 84, 0.2);
}

.book-card:hover .book-front {
  transform: rotateY(0);
}

.book-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-sm);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.book-title {
  font-size: 1.3rem;
  margin-bottom: var(--space-xs);
  color: var(--color-text);
}

.book-card.unlocked .book-title {
  color: var(--color-secondary);
}

.book-author {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-style: italic;
  margin-bottom: var(--space-sm);
}

.book-status {
  margin-top: auto;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.status-available {
  color: var(--color-secondary);
  display: flex;
  align-items: center;
  gap: 5px;
}

.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: var(--color-secondary);
  color: var(--color-background);
  border-radius: 50%;
  font-size: 0.7rem;
}

.status-locked {
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 5px;
}

.lock-icon {
  color: var(--color-text-muted);
}

.book-content {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.book-description {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: var(--space-md);
  color: var(--color-text-muted);
  flex: 1;
}

.book-card.unlocked .book-description {
  color: var(--color-text);
}

.book-action {
  margin-top: auto;
}

.btn-book {
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md);
  font-size: 0.9rem;
  background-color: var(--color-secondary);
  color: var(--color-background);
  transition: all var(--transition-normal);
}

.btn-book:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(196, 180, 84, 0.3);
}

.btn-book.disabled {
  background-color: rgba(100, 100, 100, 0.3);
  cursor: not-allowed;
  color: var(--color-text-muted);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Testimonials Section */
.testimonials-section {
  padding: var(--space-xxl) var(--space-xl);
  background-color: rgba(0, 0, 0, 0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
}

.testimonials-section h2 {
  font-size: 2.5rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-xl);
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  transition: all var(--transition-normal);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  background-color: rgba(75, 46, 131, 0.2);
  border-color: rgba(196, 180, 84, 0.3);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 3rem;
  color: var(--color-secondary);
  opacity: 0.3;
  line-height: 1;
  font-family: var(--font-family-quote);
}

.testimonial-quote {
  font-family: var(--font-family-quote);
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: var(--space-lg);
}

.testimonial-author {
  font-weight: 600;
  color: var(--color-secondary);
  position: relative;
  display: inline-block;
  padding-top: var(--space-xs);
}

.testimonial-author::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background-color: var(--color-secondary);
  opacity: 0.5;
}

/* Final CTA Section */
.final-cta {
  padding: var(--space-xxl) var(--space-xl);
  text-align: center;
  background: radial-gradient(circle at center, rgba(75, 46, 131, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
}

.final-cta h2 {
  font-size: 2.5rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
}

.final-cta p {
  max-width: 700px;
  margin: 0 auto var(--space-xl);
  font-size: 1.2rem;
  line-height: 1.6;
}

/* Responsiveness */
@media (max-width: 1024px) {
  .hero-title-line {
    font-size: 5rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .features-section h2,
  .books-section h2,
  .testimonials-section h2,
  .final-cta h2 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: auto;
    padding: var(--space-xl) var(--space-md);
  }

  .hero-title-line {
    font-size: 3.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-description p {
    font-size: 1rem;
  }

  .btn-hero {
    width: 100%;
    justify-content: center;
    font-size: 1.1rem;
  }

  .features-section,
  .books-section,
  .testimonials-section,
  .final-cta {
    padding: var(--space-xl) var(--space-md);
  }

  .book-card {
    max-width: 350px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .hero-title-line {
    font-size: 2.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .testimonial-quote {
    font-size: 1rem;
  }
}
</style>
