TAREFA: Criar a tela OnboardingScreen2

POSIÇÃO NO FLUXO:
- Tela anterior: OnboardingScreen1 (botão voltar ou swipe)
- Próxima tela: OnboardingScreen3 (botão "Próximo")
- Alternativa: LoginScreen (botão "Pular")

ESPECIFICAÇÕES DA TELA:

1. CONTAINER PRINCIPAL
   - Dimensões: 390x844
   - Fundo: #FFF7ED
   - Padding horizontal: 32px
   - Estrutura: flex column, justify-between

2. BOTÃO VOLTAR (topo esquerdo)
   - Posição: absolute, top: 48px, left: 32px
   - Ícone: ArrowLeft do Lucide (24x24)
   - Cor: #7C2D12
   - Ação: navegar para OnboardingScreen1

3. BOTÃO PULAR (topo direito)
   - Posição: absolute, top: 48px, right: 32px
   - Texto: "Pular"
   - Cor: #9A3412
   - Fonte: text-sm, font-medium
   - Ação: navegar para LoginScreen

4. ÁREA DE ILUSTRAÇÃO (centro-topo)
   - Posição: centralizada, margin-top: 100px
   - Tamanho: 280x280px
   - Conteúdo: ilustração de entregador em moto/bicicleta com mochila térmica
   - Estilo: flat/minimalista em tons de laranja e marrom

5. ÁREA DE TEXTO (centro)
   - Título: "Entrega rápida e segura"
   - Estilo título: text-2xl, font-bold, color #7C2D12, text-center
   - Subtítulo: "Acompanhe seu pedido em tempo real até chegar em você"
   - Estilo subtítulo: text-base, color #9A3412, text-center, margin-top: 12px

6. INDICADOR DE PÁGINA (dots)
   - 3 dots horizontais com gap de 8px
   - Dot 1 (inativo): width 8px, height 8px, bg #FED7AA
   - Dot 2 (ativo): width 24px, height 8px, bg #F97316
   - Dot 3 (inativo): width 8px, height 8px, bg #FED7AA

7. BOTÃO PRÓXIMO (footer)
   - Texto: "Próximo"
   - Mesmo estilo do OnboardingScreen1
   - Ação: navegar para OnboardingScreen3

NAVEGAÇÃO (IMPORTANTE - LINKAR AS TELAS):
- Botão Voltar (ArrowLeft) → navega para: /onboarding-1 (OnboardingScreen1)
- Botão "Pular" → navega para: /login (LoginScreen)
- Botão "Próximo" → navega para: /onboarding-3 (OnboardingScreen3)

NOME DO ARQUIVO: OnboardingScreen2.tsx
ROTA: /onboarding-2