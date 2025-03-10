/**
 * Utilitários para manipulação de texto
 */
export function titleCase(value: string): string {
  if (!value) return ''
  return value.toString().replace(/\b\w/g, (l) => l.toUpperCase())
}
