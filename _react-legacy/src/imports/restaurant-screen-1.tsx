TAREFA: Criar a tela RestaurantScreen

POSIÇÃO NO FLUXO:
- Acesso: Ao clicar em um restaurante na HomeScreen
- Tela anterior: HomeScreen (botão voltar)
- Próxima tela: ProductScreen (ao clicar em um produto)

ESPECIFICAÇÕES DA TELA:

1. CONTAINER PRINCIPAL
   - Dimensões: 390x844
   - Fundo: #FFF7ED
   - Estrutura: flex column
   - Overflow: hidden (scroll interno)

2. IMAGEM DE CAPA (topo)
   - Altura: 200px
   - Largura: 100%
   - Object-fit: cover
   - Imagem: foto de comida do restaurante (usar URL do Unsplash)
   - Overlay: gradient linear de baixo para cima (transparent → rgba(0,0,0,0.4))
   
   2.1 BOTÃO VOLTAR (sobre a imagem)
   - Posição: absolute, top: 48px, left: 24px
   - Container: w-10 h-10, rounded-full, bg white/90, backdrop-blur
   - Ícone: ArrowLeft (20x20), cor #7C2D12
   - Ação: navegar para /home
   
   2.2 BOTÃO FAVORITAR (sobre a imagem)
   - Posição: absolute, top: 48px, right: 24px
   - Container: w-10 h-10, rounded-full, bg white/90, backdrop-blur
   - Ícone: Heart (20x20)
   - Se não favorito: cor #7C2D12, fill none
   - Se favorito: cor #F97316, fill #F97316
   - Ação: toggle estado favorito

3. CARD DE INFORMAÇÕES (sobrepõe a imagem)
   - Posição: margin-top: -30px (sobe sobre a imagem)
   - Fundo: branco
   - Border-radius: rounded-t-3xl
   - Padding: p-6
   - Sombra: 0 -4px 20px rgba(0,0,0,0.1)
   
   3.1 HEADER DO CARD
   - Layout: flex row, gap-4
   
   - Logo do restaurante:
     - Tamanho: w-16 h-16
     - Border-radius: rounded-xl
     - Borda: 2px solid #FED7AA
     - Imagem ou placeholder com inicial
   
   - Info do restaurante:
     - Nome: text-xl, font-bold, color #7C2D12
     - Categorias: text-sm, color #9A3412 ("Italiana • Massas • Pizza")
     - Status: 
       - Se aberto: "Aberto agora" com bolinha verde
       - Se fechado: "Fechado" com bolinha vermelha
   
   3.2 MÉTRICAS
   - Layout: flex row, justify-between, mt-4, py-4
   - Borda: border-y, border-color #FED7AA
   
   - Avaliação:
     - Ícone Star (preenchida, #F97316)
     - "4.8" font-bold, color #7C2D12
     - "(234)" text-sm, color #9A3412
   
   - Tempo de entrega:
     - Ícone Clock (#9A3412)
     - "30-40" font-bold, color #7C2D12
     - "min" text-sm, color #9A3412
   
   - Taxa de entrega:
     - Ícone DollarSign ou Bike (#9A3412)
     - "R$ 5,00" font-bold, color #7C2D12
     - ou "Grátis" em verde (#22C55E)

4. TABS DE NAVEGAÇÃO
   - Layout: flex row, mt-4
   - Gap: 0 (tabs coladas)
   
   - Tab item:
     - Flex: 1
     - Padding: py-3
     - Text-align: center
     - Font-weight: medium
   
   - Tab ativa: color #F97316, border-bottom 2px solid #F97316
   - Tab inativa: color #9A3412, border-bottom 2px solid transparent
   
   - Tabs: "Cardápio" | "Avaliações" | "Sobre"
   - Tab padrão ativa: "Cardápio"

5. CONTEÚDO DA TAB CARDÁPIO
   - Flex: 1
   - Overflow-y: auto
   - Padding-bottom: 100px (espaço para botão do carrinho)
   
   5.1 CATEGORIAS DO CARDÁPIO (scroll horizontal)
   - Padding: px-6 py-3
   - Layout: flex row, gap-2, overflow-x-auto
   - Chips:
     - Ativo: bg #F97316, text white, px-4 py-2, rounded-full
     - Inativo: bg white, border #FED7AA, text #7C2D12, px-4 py-2, rounded-full
   - Categorias: "Populares", "Pizzas", "Massas", "Bebidas", "Sobremesas"
   
   5.2 LISTA DE PRODUTOS
   - Padding: px-6
   
   - Cada produto:
     - Layout: flex row, gap-4, py-4
     - Borda inferior: 1px solid #FED7AA
     
     - Info (flex: 1):
       - Nome: text-base, font-bold, color #7C2D12
       - Descrição: text-sm, color #9A3412, line-clamp-2, mt-1
       - Preço: text-base, font-bold, color #F97316, mt-2
     
     - Imagem (direita):
       - Tamanho: w-24 h-24
       - Border-radius: rounded-xl
       - Object-fit: cover
       
     - Botão adicionar:
       - Posição: absolute, bottom-right da imagem
       - Container: w-8 h-8, rounded-full, bg #F97316
       - Ícone: Plus (16x16), color white
       - Ação: navegar para ProductScreen com id do produto
   
   - Produtos exemplo (4-6 itens):
     1. Pizza Margherita - "Molho de tomate, mussarela, manjericão fresco" - R$ 45,90
     2. Pizza Calabresa - "Calabresa fatiada, cebola, azeitonas" - R$ 42,90
     3. Lasanha Bolonhesa - "Massa fresca, molho bolonhesa, queijos" - R$ 38,90
     4. Spaghetti Carbonara - "Bacon, ovos, parmesão, pimenta preta" - R$ 36,90
     5. Tiramisu - "Sobremesa italiana com café e mascarpone" - R$ 18,90
     6. Refrigerante - "Coca-Cola, Guaraná ou Sprite 350ml" - R$ 7,90

6. BOTÃO FLUTUANTE DO CARRINHO (footer fixo)
   - Posição: fixed, bottom: 24px, left: 24px, right: 24px
   - Altura: h-14
   - Fundo: #F97316
   - Border-radius: rounded-2xl
   - Sombra: 0 4px 12px rgba(249, 115, 22, 0.4)
   - Layout: flex row, items-center, justify-between, px-6
   
   - Esquerda:
     - Ícone ShoppingBag (20x20), color white
     - "Ver carrinho" text-base, font-bold, color white
     - Badge: "(3 itens)" text-sm, color white/80
   
   - Direita:
     - "R$ 89,90" text-base, font-bold, color white
   
   - Ação: navegar para /cart (CartScreen)
   - Mostrar apenas se houver itens no carrinho

ESTADO DO COMPONENTE:
- restaurant: objeto com dados do restaurante
- activeTab: 'menu' | 'reviews' | 'about'
- activeCategory: string (categoria do cardápio selecionada)
- isFavorite: boolean
- cartItems: array (itens no carrinho)

NAVEGAÇÃO:
- Botão Voltar → navega para: /home
- Clique em produto → navega para: /product/:id (ProductScreen)
- Botão carrinho → navega para: /cart (CartScreen)

NOME DO ARQUIVO: RestaurantScreen.tsx
ROTA: /restaurant/:id