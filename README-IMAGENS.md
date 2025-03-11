# Instruções para Substituição de Imagens

## Estrutura de Pastas

Crie a seguinte estrutura de pastas para armazenar as imagens das visões:

```
public/
  └── images/
      ├── textures/
      │   ├── texture-stars.jpg      (textura de fundo estrelado)
      │   └── texture-parchment.jpg  (textura de pergaminho)
      │
      └── revelation/
          ├── preview-throne.jpg     (imagem de preview para a seleção inicial)
          ├── door-revelation.jpg    (Imagem 1: A Porta da Revelação)
          ├── throne-celestial.jpg   (Imagem 2: O Trono Celestial)
          ├── four-living-creatures.jpg  (Imagem 3: Os Quatro Seres Viventes)
          ├── lamb-scroll.jpg        (Imagem 4: O Cordeiro e o Livro Selado)
          └── four-horsemen.jpg      (Imagem 5: Os Quatro Cavaleiros)
```

## Especificações das Imagens

### Texturas

1. **texture-stars.jpg**: Imagem de um céu estrelado para o fundo, preferivelmente escura com estrelas visíveis.
2. **texture-parchment.jpg**: Textura de pergaminho antigo para elementos decorativos.

### Imagens das Visões do Apocalipse

1. **preview-throne.jpg**:
   - Dimensões: 600x400px
   - Descrição: Uma versão reduzida da imagem do trono celestial para usar como thumbnail na seleção inicial.

2. **door-revelation.jpg** (Imagem 1 que você compartilhou):
   - Dimensões: 1200x800px ou maior (mantenha a proporção)
   - Descrição: João contemplando uma porta dourada aberta no céu, com luz divina emanando através dela.

3. **throne-celestial.jpg** (Imagem 2 que você compartilhou):
   - Dimensões: 1200x800px ou maior
   - Descrição: O trono de Deus com Cristo entronizado em glória, rodeado pelos 24 anciãos vestidos de branco.

4. **four-living-creatures.jpg**:
   - Dimensões: 1200x800px ou maior
   - Descrição: Os quatro seres viventes com faces de leão, boi, homem e águia ao redor do trono.

5. **lamb-scroll.jpg**:
   - Dimensões: 1200x800px ou maior
   - Descrição: Um cordeiro como imolado (simbolizando Cristo), abrindo um livro/pergaminho selado com sete selos.

6. **four-horsemen.jpg**:
   - Dimensões: 1200x800px ou maior
   - Descrição: Os quatro cavaleiros do Apocalipse em cavalos de cores diferentes (branco, vermelho, preto e amarelo pálido).

## Como Substituir as Imagens

1. Crie as pastas necessárias na estrutura do projeto:
   ```bash
   mkdir -p public/images/textures
   mkdir -p public/images/revelation
   ```

2. Coloque suas imagens nas pastas correspondentes, usando exatamente os nomes de arquivo especificados.

3. Se suas imagens tiverem proporções diferentes das recomendadas, ajuste os pontos de hotspot (coordenadas x, y) no arquivo `src/data/revelationVisions.js`. As coordenadas são baseadas em porcentagens da largura e altura da imagem (0-100%).

## Pontos Interativos (Hotspots)

Os hotspots estão definidos com coordenadas percentuais para cada imagem. Se você precisar ajustar a posição dos hotspots para que correspondam melhor aos elementos nas suas imagens, edite as propriedades `x` e `y` nos objetos hotspot do arquivo `src/data/revelationVisions.js`.

Exemplo:
```javascript
hotspots: [
  {
    x: 50, // Centro horizontal da imagem (50%)
    y: 35, // 35% da altura a partir do topo
    title: "A Porta Celestial",
    // ...
  }
]
```

## Recomendações

1. Use imagens de alta qualidade mas otimizadas para web (formatos .jpg ou .webp)
2. Mantenha a estética e paleta de cores consistentes entre as imagens
3. Certifique-se de que os elementos referenciados nos hotspots sejam claramente visíveis nas imagens
4. Teste o site em dispositivos móveis para garantir que as imagens e hotspots funcionem bem em diferentes tamanhos de tela
