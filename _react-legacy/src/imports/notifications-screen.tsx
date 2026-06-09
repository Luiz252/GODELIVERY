TAREFA: Criar a tela NotificationsScreen

POSIÇÃO NO FLUXO:
- Acesso: Ao clicar no ícone de sino (Bell) na HomeScreen
- Tela anterior: HomeScreen (botão voltar)

ESPECIFICAÇÕES DA TELA:

1. CONTAINER PRINCIPAL
   - Dimensões: 390x844
   - Fundo: #FFF7ED
   - Estrutura: flex column

2. HEADER
   - Padding: pt-12 px-6 pb-4
   - Fundo: #FFF7ED
   - Layout: flex row, items-center, justify-between
   
   2.1 LADO ESQUERDO
   - Botão voltar: ArrowLeft (24x24), cor #7C2D12
   - Título: "Notificações", text-xl, font-bold, color #7C2D12, ml-4
   
   2.2 LADO DIREITO
   - Botão: "Marcar todas como lidas"
   - Estilo: text-sm, font-medium, color #F97316

3. LISTA DE NOTIFICAÇÕES
   - Padding: px-6
   - Flex: 1
   - Overflow-y: auto
   
   Cada notificação:
   - Layout: flex row, gap-3, py-4
   - Borda inferior: 1px solid #FED7AA
   - Se NÃO LIDA: fundo levemente destacado (bg-white com borda-l-4 #F97316)
   - Se LIDA: fundo transparente
   
   3.1 ÍCONE (esquerda)
   - Container: w-12 h-12, rounded-full, flex items-center justify-center
   - Tipos e cores:
     - Pedido (Package): fundo #FFF7ED, ícone #F97316
     - Promoção (Tag ou Percent): fundo #FEF3C7, ícone #F59E0B
     - Entrega (Truck): fundo #DCFCE7, ícone #22C55E
     - Sistema (Bell): fundo #F3F4F6, ícone #6B7280
   
   3.2 CONTEÚDO (centro)
   - Flex: 1
   - Título: text-sm, font-bold, color #7C2D12
   - Descrição: text-sm, color #9A3412, mt-1, line-clamp-2
   - Tempo: text-xs, color #9A3412, opacity-60, mt-1
   
   3.3 INDICADOR NÃO LIDA (direita)
   - Se não lida: bolinha w-2 h-2, rounded-full, bg #F97316
   - Se lida: nada

4. LISTA DE NOTIFICAÇÕES (dados exemplo):

   Notificação 1 (NÃO LIDA):
   - Tipo: Entrega (Truck)
   - Título: "Seu pedido saiu para entrega!"
   - Descrição: "O pedido #1234 do Sushi Premium está a caminho"
   - Tempo: "Agora"
   
   Notificação 2 (NÃO LIDA):
   - Tipo: Promoção (Tag)
   - Título: "20% OFF em pizzas hoje!"
   - Descrição: "Use o cupom PIZZA20 e aproveite o desconto"
   - Tempo: "Há 2 horas"
   
   Notificação 3 (LIDA):
   - Tipo: Pedido (Package)
   - Título: "Pedido entregue com sucesso"
   - Descrição: "Avalie sua experiência com Pasta & Vino"
   - Tempo: "Ontem"
   
   Notificação 4 (LIDA):
   - Tipo: Promoção (Tag)
   - Título: "Frete grátis no fim de semana!"
   - Descrição: "Peça sem taxa de entrega sábado e domingo"
   - Tempo: "Há 2 dias"
   
   Notificação 5 (LIDA):
   - Tipo: Sistema (Bell)
   - Título: "Bem-vindo ao GoDelivery!"
   - Descrição: "Use o cupom BEMVINDO e ganhe R$10 de desconto"
   - Tempo: "Há 5 dias"

5. ESTADO VAZIO (se não houver notificações)
   - Centralizado na tela
   - Ícone: BellOff (64x64), cor #FED7AA
   - Texto: "Nenhuma notificação"
   - Subtexto: "Suas notificações aparecerão aqui"

ESTADO DO COMPONENTE:
- notifications: array com objetos {id, type, title, description, time, isRead}

FUNCIONALIDADES:
- Ao clicar em "Marcar todas como lidas": atualiza todas para isRead: true
- Ao clicar em uma notificação: marca como lida e pode navegar para o contexto

NAVEGAÇÃO:
- Botão Voltar → navega para: /home (HomeScreen)
- Clique em notificação de pedido → futuramente navega para detalhes do pedido

NOME DO ARQUIVO: NotificationsScreen.tsx
ROTA: /notifications