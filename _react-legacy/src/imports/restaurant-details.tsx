TAREFA: Excluir a RestaurantScreen atual e criar uma NOVA do zero.

CONTEXTO:
Esta é a tela de detalhes de um restaurante no app GoDelivery. O usuário chega aqui ao clicar em um restaurante na HomeScreen.

DESIGN SYSTEM (obrigatório):
- Fundo: #FFF7ED
- Cor primária: #F97316 (laranja)
- Texto principal: #7C2D12 (marrom escuro)
- Texto secundário: #9A3412 (marrom médio)
- Bordas: #FED7AA (bege)
- Cards: #FFFFFF (branco)
- Ícones: Lucide React

RESPONSIVIDADE (obrigatório):
- Container principal: w-full min-h-screen (NUNCA usar 390px ou 844px fixos)
- Usar w-full, flex-1, percentuais
- Esconder TODOS os scrollbars (scrollbar-width: none)

ESTRUTURA DA TELA (de cima para baixo):

1. IMAGEM DE CAPA
   - Largura: w-full
   - Altura: h-48 (192px)
   - Imagem: foto de comida italiana (massa, pizza) do Unsplash
   - Object-fit: cover
   - Overlay: gradiente de baixo para cima (transparent → rgba(0,0,0,0.3))

2. BOTÃO VOLTAR (sobre a imagem)
   - Posição: absolute, top-12, left-6
   - Container: w-10 h-10, rounded-full, bg-white/90, backdrop-blur-sm
   - Sombra: shadow-md
   - Ícone: ArrowLeft do Lucide (20x20), cor #7C2D12
   - Ação: navigate('/home')

3. BOTÃO FAVORITAR (sobre a imagem)
   - Posição: absolute, top-12, right-6
   - Container: w-10 h-10, rounded-full, bg-white/90, backdrop-blur-sm
   - Sombra: shadow-md
   - Ícone: Heart do Lucide (20x20)
   - Estado normal: cor #7C2D12, sem preenchimento
   - Estado ativo: cor #F97316, preenchido
   - Ação: toggle favorito

4. CARD DE INFORMAÇÕES
   - Posição: margin-top: -24px (sobe sobre a imagem)
   - Fundo: branco
   - Border-radius: rounded-t-3xl (24px só no topo)
   - Padding: p-6
   - Sombra: shadow-lg
   
   4.1 HEADER DO CARD (layout flex row, gap-4):
   
   - LOGO DO RESTAURANTE (esquerda):
     - Tamanho: w-16 h-16
     - Border-radius: rounded-xl
     - Borda: 2px solid #FED7AA
     - Imagem: logo ou foto do restaurante
     - Object-fit: cover
   
   - INFORMAÇÕES (direita, flex-1):
     - Nome: "Pasta & Vino"
       - Estilo: text-xl, font-bold, color #7C2D12
     - Categorias: "Italiana • Massas • Pizza"
       - Estilo: text-sm, color #9A3412, mt-1
     - Status (flex row, items-center, gap-1.5, mt-2):
       - Bolinha: w-2 h-2, rounded-full, bg-green-500
       - Texto: "Aberto agora", text-sm, color #22C55E, font-medium

   4.2 MÉTRICAS (flex row, justify-between, mt-4, py-4, border-y border-[#FED7AA]):
   
   - Coluna 1 - Avaliação (items-center):
     - Ícone Star preenchida, w-5 h-5, color #F97316
     - Número: "4.8", font-bold, color #7C2D12
     - Subtexto: "(234)", text-xs, color #9A3412
   
   - Coluna 2 - Tempo (items-center):
     - Ícone Clock, w-5 h-5, color #9A3412
     - Número: "30-40", font-bold, color #7C2D12
     - Subtexto: "min", text-xs, color #9A3412
   
   - Coluna 3 - Entrega (items-center):
     - Ícone Bike ou DollarSign, w-5 h-5, color #22C55E
     - Texto: "Grátis", font-bold, color #22C55E
     - Subtexto: "entrega", text-xs, color #9A3412

5. TABS DE NAVEGAÇÃO
   - Layout: flex row, mt-4
   - Tabs: "Cardápio" | "Avaliações" | "Sobre"
   
   - Tab ativa (Cardápio):
     - color #F97316
     - font-medium
     - border-bottom: 2px solid #F97316
   
   - Tab inativa:
     - color #9A3412
     - border-bottom: 2px solid transparent

6. CATEGORIAS DO CARDÁPIO
   - Container: px-6 py-3
   - Layout: flex row, gap-2, overflow-x-auto
   - ESCONDER scrollbar horizontal
   
   - Chips:
     - "Populares" (ATIVO): bg-#F97316, text-white, px-4 py-2, rounded-full, font-medium
     - "Pizzas" (inativo): bg-white, border #FED7AA, text #7C2D12, px-4 py-2, rounded-full
     - "Massas" (inativo): mesmo estilo
     - "Bebidas" (inativo): mesmo estilo
     - "Sobremesas" (inativo): mesmo estilo

7. LISTA DE PRODUTOS
   - Container: px-6, flex-1, overflow-y-auto
   - ESCONDER scrollbar vertical
   - Padding-bottom: pb-24 (espaço para botão do carrinho)
   
   Cada produto (flex row, gap-4, py-4, border-b border-[#FED7AA]):
   
   - INFO DO PRODUTO (flex-1):
     - Nome: text-base, font-bold, color #7C2D12
     - Descrição: text-sm, color #9A3412, mt-1, line-clamp-2
     - Preço: text-base, font-bold, color #F97316, mt-2
   
   - IMAGEM DO PRODUTO (direita):
     - Container: relative
     - Imagem: w-24 h-24, rounded-xl, object-cover
     - Botão +: absolute, bottom-0, right-0, w-8 h-8, rounded-full, bg-#F97316
       - Ícone Plus, w-4 h-4, color white
       - Ação: navegar para ProductScreen
   
   PRODUTOS (usar imagens REAIS de COMIDA do Unsplash):
   
   1. Pizza Margherita
      - Descrição: "Molho de tomate, mussarela fresca, manjericão e azeite"
      - Preço: "R$ 45,90"
      - Imagem: buscar "margherita pizza" no Unsplash
   
   2. Pizza Calabresa
      - Descrição: "Calabresa fatiada, cebola roxa, azeitonas e molho especial"
      - Preço: "R$ 42,90"
      - Imagem: buscar "pepperoni pizza" no Unsplash (DEVE SER FOTO DE PIZZA)
   
   3. Lasanha Bolonhesa
      - Descrição: "Massa fresca artesanal, molho bolonhesa com carne e queijos"
      - Preço: "R$ 38,90"
      - Imagem: buscar "lasagna" no Unsplash
   
   4. Spaghetti Carbonara
      - Descrição: "Bacon crocante, ovos caipira, parmesão e pimenta preta"
      - Preço: "R$ 36,90"
      - Imagem: buscar "carbonara pasta" no Unsplash
   
   5. Tiramisù
      - Descrição: "Sobremesa italiana clássica com café espresso e mascarpone"
      - Preço: "R$ 18,90"
      - Imagem: buscar "tiramisu dessert" no Unsplash

8. BOTÃO DO CARRINHO (footer fixo)
   - Posição: fixed, bottom-6, left-6, right-6
   - Altura: h-14
   - Fundo: #F97316
   - Border-radius: rounded-2xl
   - Sombra: shadow-lg, shadow-orange-500/30
   - Layout: flex row, items-center, justify-between, px-6
   
   - Lado esquerdo (flex row, items-center, gap-2):
     - Ícone ShoppingBag, w-5 h-5, color white
     - Texto: "Ver carrinho", font-bold, color white
     - Badge: "(3)", text-sm, color white/80
   
   - Lado direito:
     - Texto: "R$ 127,70", font-bold, color white
   
   - Ação: navigate('/cart')

ESTADO DO COMPONENTE:
- activeTab: 'menu' | 'reviews' | 'about' (padrão: 'menu')
- activeCategory: string (padrão: 'Populares')
- isFavorite: boolean (padrão: false)

NAVEGAÇÃO:
- Botão voltar → /home
- Clique no produto (botão +) → /product/:id
- Botão carrinho → /cart

NOME DO ARQUIVO: RestaurantScreen.tsx
ROTA: /restaurant/:id

IMPORTANTE:
- Todas as imagens devem ser de COMIDA real
- ESCONDER todos os scrollbars
- Usar w-full, não valores fixos de largura
- Testar se o layout funciona em diferentes tamanhos de tela