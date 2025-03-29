<template>
  <!-- Seção de Hero com faixa escura horizontal para destaque do texto -->
  <div class="hero-section">
    <!-- Fundo com faixa escura -->
    <div class="hero-background">
      <!-- Fundo preto básico -->
      <div class="background-base"></div>

      <!-- Faixa escura horizontal para destacar texto -->
      <div class="dark-band"></div>

      <!-- Camada de estrelas -->
      <div class="stars-layer"></div>
    </div>

    <!-- Conteúdo centralizado -->
    <div class="hero-content">
      <h1 class="hero-title">PRONTO PARA VER COM OS OLHOS DOS PROFETAS?</h1>
      <p class="hero-description">
        Embarque nesta jornada visual pelas revelações divinas e descubra um novo nível
        de compreensão profética.
      </p>

      <router-link to="/apocalypse/1" class="cta-button">
        COMEÇAR AGORA →
      </router-link>
    </div>
  </div>
</template>

<style>
/* Estilos para o fundo com faixa horizontal */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background-base {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  z-index: 1;
}

.dark-band {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(
    to bottom,
    rgba(20, 10, 40, 0) 0%,
    rgba(20, 10, 40, 0.7) 30%,
    rgba(20, 10, 40, 0.8) 50%,
    rgba(20, 10, 40, 0.7) 70%,
    rgba(20, 10, 40, 0) 100%
  );
  transform: translateY(-50%);
  z-index: 2;
}

.stars-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

/* Conteúdo da seção hero */
.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-family: var(--font-family-heading);
  font-weight: 700;
  color: #c4b454;
  margin-bottom: 2rem;
  text-shadow: 0 0 15px rgba(196, 180, 84, 0.5);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 3rem;
  max-width: 700px;
  line-height: 1.6;
}

.cta-button {
  background-color: #c4b454;
  color: #000000;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: var(--font-family-heading);
  padding: 1rem 2.5rem;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  box-shadow: 0 0 20px rgba(196, 180, 84, 0.3);
}

.cta-button:hover {
  background-color: #d9cf82;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(196, 180, 84, 0.4);
}

/* Responsividade */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .cta-button {
    font-size: 1rem;
    padding: 0.9rem 2rem;
  }

  .dark-band {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .dark-band {
    height: 200px;
  }
}
</style>
