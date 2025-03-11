<template>
  <nav class="main-navigation" :class="{ 'nav-scrolled': isScrolled }">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/" class="nav-link" exact-active-class="active">Início</router-link>
      </li>

      <li class="nav-item">
        <router-link to="/apocalypse" class="nav-link" active-class="active">Apocalipse</router-link>
      </li>

      <li class="nav-item">
        <router-link to="/about" class="nav-link" active-class="active">Sobre</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TheNavigation',
  data() {
    return {
      isScrolled: false
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 30
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // Verifica posição inicial
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
