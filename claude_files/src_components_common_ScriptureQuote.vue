<template>
  <blockquote class="scripture-quote">
    <slot></slot>
    <cite class="scripture-reference">{{ reference }}</cite>
  </blockquote>
</template>

<script>
export default {
  name: 'ScriptureQuote',
  props: {
    reference: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.scripture-quote {
  position: relative;
  font-family: var(--font-family-quote);
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text);
  background-color: rgba(0, 0, 0, 0.3);
  border-left: 3px solid var(--color-secondary);
  margin: var(--space-lg) 0;
  padding: var(--space-lg) var(--space-lg) var(--space-lg) var(--space-xl);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.scripture-quote::before {
  content: '"';
  position: absolute;
  left: var(--space-sm);
  top: -10px;
  font-family: var(--font-family-heading);
  font-size: 4rem;
  color: var(--color-secondary);
  opacity: 0.3;
  line-height: 1;
}

.scripture-reference {
  display: block;
  font-style: normal;
  font-weight: 500;
  color: var(--color-secondary);
  margin-top: var(--space-md);
  text-align: right;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .scripture-quote {
    font-size: 1rem;
    padding: var(--space-md) var(--space-md) var(--space-md) var(--space-lg);
  }
}
</style>
