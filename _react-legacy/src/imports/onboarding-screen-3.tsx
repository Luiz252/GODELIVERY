TAREFA: Criar a tela OnboardingScreen3

POSIÇÃO NO FLUXO:
- Tela anterior: OnboardingScreen2 (botão voltar)
- Próxima tela: LoginScreen (botão "Começar")
- Esta é a ÚLTIMA tela do onboarding

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
   - Ação: navegar para OnboardingScreen2

3. SEM BOTÃO PULAR
   - Esta é a última tela, não precisa de "Pular"

4. ÁREA DE ILUSTRAÇÃO (centro-topo)
   - Posição: centralizada, margin-top: 100px
   - Tamanho: 280x280px
   - Conteúdo: ilustração de pessoa feliz em casa comendo comida delivery
   - Estilo: flat/minimalista em tons de laranja e marrom

5. ÁREA DE TEXTO (centro)
   - Título: "Aproveite sua refeição"
   - Estilo título: text-2xl, font-bold, color #7C2D12, text-center
   - Subtítulo: "Pague online com segurança e ganhe cupons exclusivos"
   - Estilo subtítulo: text-base, color #9A3412, text-center, margin-top: 12px

6. INDICADOR DE PÁGINA (dots)
   - 3 dots horizontais com gap de 8px
   - Dot 1 e 2 (inativos): width 8px, height 8px, bg #FED7AA
   - Dot 3 (ativo): width 24px, height 8px, bg #F97316

7. BOTÃO COMEÇAR (footer)
   - Texto: "Começar"
   - Estilo: h-14, w-full, rounded-2xl, bg #F97316, text-white, font-bold, text-lg
   - Sombra: 0 4px 12px rgba(249, 115, 22, 0.3)
   - Ação: navegar para LoginScreen

NAVEGAÇÃO (IMPORTANTE - LINKAR AS TELAS):
- Botão Voltar (ArrowLeft) → navega para: /onboarding-2 (OnboardingScreen2)
- Botão "Começar" → navega para: /login (LoginScreen)

NOME DO ARQUIVO: OnboardingScreen3.tsx
ROTA: /onboarding-3