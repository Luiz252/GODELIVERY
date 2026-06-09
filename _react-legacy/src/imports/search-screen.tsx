TAREFA: Criar a tela SearchScreen

POSIÇÃO NO FLUXO:
- Acesso: Ao clicar no campo de busca na HomeScreen
- Tela anterior: HomeScreen (botão voltar)
- Ações: Buscar restaurantes/produtos, aplicar filtros

ESPECIFICAÇÕES DA TELA:

1. CONTAINER PRINCIPAL
   - Dimensões: 390x844
   - Fundo: #FFF7ED
   - Estrutura: flex column

2. HEADER (topo)
   - Padding: pt-12 px-6 pb-4
   - Fundo: #FFF7ED
   - Layout: flex row, items-center, gap-3
   
   2.1 BOTÃO VOLTAR
   - Ícone: ArrowLeft do Lucide (24x24)
   - Cor: #7C2D12
   - Ação: navegar para HomeScreen (/home)
   
   2.2 CAMPO DE BUSCA (expandido)
   - Flex: 1 (ocupa resto do espaço)
   - Altura: h-12
   - Fundo: branco (#FFFFFF)
   - Borda: 2px solid #FED7AA
   - Border-radius: rounded-xl
   - Ícone Search (Lucide) à esquerda, cor #9A3412
   - Placeholder: "Buscar restaurantes, pratos..."
   - Foco automático ao abrir a tela (autoFocus)

3. CONTEÚDO (scroll)
   - Padding: px-6
   - Overflow-y: auto
   - Flex: 1
   
   3.1 SEÇÃO "Buscas recentes"
   - Título: "Buscas recentes"
   - Estilo título: text-base, font-bold, color #7C2D12, mb-3, mt-4
   - Botão "Limpar" à direita do título, text-sm, color #F97316
   
   - Lista de buscas (cada item):
     - Layout: flex row, items-center, justify-between, py-3
     - Borda inferior: 1px solid #FED7AA
     - Esquerda: ícone Clock (Lucide, 18px, #9A3412) + texto da busca (#7C2D12)
     - Direita: ícone X (Lucide, 18px, #9A3412) para remover
   
   - Itens exemplo:
     - "Pizza"
     - "Sushi Premium"
     - "Hambúrguer"
     - "Açaí"

   3.2 SEÇÃO "Filtros rápidos"
   - Título: "Filtros"
   - Estilo título: text-base, font-bold, color #7C2D12, mb-3, mt-6
   
   - Chips horizontais com scroll (flex row, gap-2, overflow-x-auto):
     - Chip inativo: px-4, py-2, rounded-full, bg white, border #FED7AA, text #7C2D12
     - Chip ativo: px-4, py-2, rounded-full, bg #F97316, text white, font-medium
   
   - Chips:
     - "Entrega grátis" (toggle)
     - "Até 30 min"
     - "30-45 min"
     - "Melhor avaliados"
     - "Mais próximos"
     - "Promoções"

   3.3 SEÇÃO "Categorias"
   - Título: "Categorias"
   - Estilo título: text-base, font-bold, color #7C2D12, mb-3, mt-6
   
   - Grid 3 colunas (grid grid-cols-3 gap-3):
     - Cada item: flex column, items-center, p-4, bg white, rounded-xl
     - Sombra: 0 2px 8px rgba(0,0,0,0.04)
     - Ícone: 32x32, cor #F97316
     - Texto: text-xs, font-medium, color #7C2D12, mt-2
   
   - Itens:
     - Pizza (ícone Pizza)
     - Hambúrguer (ícone UtensilsCrossed)
     - Sushi (ícone Fish ou UtensilsCrossed)
     - Açaí (ícone Cherry ou IceCream)
     - Bebidas (ícone Wine)
     - Doces (ícone Cake)
     - Brasileira (ícone Utensils)
     - Saudável (ícone Salad ou Leaf)
     - Ver todos (ícone Grid ou MoreHorizontal)

4. SEM BOTTOM NAVIGATION
   - Esta tela é um modal/overlay, não precisa da navegação inferior
   - O botão voltar retorna para Home que tem a navegação

ESTADO DO COMPONENTE:
- searchQuery: string (valor do campo de busca)
- recentSearches: string[] (lista de buscas recentes)
- activeFilters: string[] (filtros selecionados)

FUNCIONALIDADES:
- Ao digitar, filtrar resultados em tempo real (futura implementação)
- Ao clicar em busca recente, preencher o campo
- Ao clicar no X da busca recente, remover da lista
- Ao clicar em "Limpar", remover todas as buscas recentes
- Chips são toggle (clica ativa, clica de novo desativa)

NAVEGAÇÃO:
- Botão Voltar → navega para: /home (HomeScreen)
- Ao selecionar categoria → futuramente navega para lista filtrada

NOME DO ARQUIVO: SearchScreen.tsx
ROTA: /search