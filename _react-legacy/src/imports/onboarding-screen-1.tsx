TAREFA: Criar a tela OnboardingScreen1

POSIÇÃO NO FLUXO:
- Tela anterior: SplashScreen (após os 3 segundos, SE for primeiro acesso)
- Próxima tela: OnboardingScreen2 (botão "Próximo")
- Alternativa: LoginScreen (botão "Pular")

ESPECIFICAÇÕES DA TELA:

1. CONTAINER PRINCIPAL
   - Dimensões: 390x844
   - Fundo: #FFF7ED
   - Padding horizontal: 32px (px-8)
   - Estrutura: flex column, justify-between

2. BOTÃO PULAR (topo direito)
   - Posição: absolute, top: 48px, right: 32px
   - Texto: "Pular"
   - Cor: #9A3412
   - Fonte: text-sm, font-medium
   - Ação: navegar para LoginScreen

3. ÁREA DE ILUSTRAÇÃO (centro-topo)
   - Posição: centralizada, margin-top: 100px
   - Tamanho: 280x280px
   - Conteúdo: ilustração de uma pessoa recebendo delivery na porta
   - Estilo: ilustração flat/minimalista em tons de laranja (#F97316, #FED7AA) e marrom (#7C2D12)

4. ÁREA DE TEXTO (centro)
   - Título: "Peça sua comida favorita"
   - Estilo título: text-2xl, font-bold, color #7C2D12, text-center
   - Subtítulo: "Escolha entre centenas de restaurantes perto de você"
   - Estilo subtítulo: text-base, color #9A3412, text-center, margin-top: 12px, max-width: 280px

5. INDICADOR DE PÁGINA (dots)
   - Posição: centralizado, margin-bottom: 24px acima do botão
   - 3 dots horizontais com gap de 8px
   - Dot 1 (ativo): width 24px, height 8px, bg #F97316, rounded-full
   - Dot 2 e 3 (inativos): width 8px, height 8px, bg #FED7AA, rounded-full

6. BOTÃO PRÓXIMO (footer)
   - Posição: bottom: 48px, largura total com padding 32px
   - Texto: "Próximo"
   - Estilo: h-14, w-full, rounded-2xl, bg #F97316, text-white, font-bold, text-lg
   - Sombra: 0 4px 12px rgba(249, 115, 22, 0.3)
   - Ação: navegar para OnboardingScreen2

NAVEGAÇÃO (IMPORTANTE - LINKAR AS TELAS):
- Botão "Pular" → navega para: /login (LoginScreen)
- Botão "Próximo" → navega para: /onboarding-2 (OnboardingScreen2)

NOME DO ARQUIVO: OnboardingScreen1.tsx
ROTA: /onboarding-1