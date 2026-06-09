TAREFA: Corrigir alinhamento e responsividade da RestaurantScreen

PROBLEMAS A CORRIGIR:

1. IMAGEM DE CAPA E BOTÕES
   - Botão voltar: position absolute, top: 48px, left: 24px (mais acima)
   - Botão favorito: position absolute, top: 48px, right: 24px (mais acima)
   - Ambos devem ter: w-10 h-10, rounded-full, bg-white/90, backdrop-blur-sm
   - Devem ficar BEM no topo da imagem, não no meio

2. LOGO DO RESTAURANTE
   - Deve estar DENTRO do card branco, não sobrepondo a imagem
   - Posição: ao lado esquerdo do nome do restaurante
   - Tamanho: w-16 h-16, rounded-xl
   - Borda: 2px solid #FED7AA
   - Deve estar 100% visível, não cortada

3. CARD BRANCO DE INFORMAÇÕES
   - margin-top: -24px (sobe suavemente sobre a imagem)
   - border-radius: rounded-t-3xl (só no topo)
   - padding: p-6
   - background: white
   - O card NÃO deve cortar a logo

4. LAYOUT DO HEADER DO CARD
   Estrutura correta:
   
   <div className="flex items-start gap-4">
     <!-- Logo -->
     <img className="w-16 h-16 rounded-xl border-2 border-orange-200 object-cover" />
     
     <!-- Info -->
     <div className="flex-1">
       <h1 className="text-xl font-bold text-amber-900">Pasta & Vino</h1>
       <p className="text-sm text-amber-800">Italiana • Massas • Pizza</p>
       <div className="flex items-center gap-1 mt-1">
         <span className="w-2 h-2 rounded-full bg-green-500"></span>
         <span className="text-sm text-green-600">Aberto agora</span>
       </div>
     </div>
   </div>

5. MÉTRICAS (avaliação, tempo, entrega)
   - Layout: flex row, justify-between (distribuídas igualmente)
   - Cada métrica centralizada em sua coluna
   - Usar flex-1 para cada coluna ocupar espaço igual
   - Borda: border-t e border-b com #FED7AA
   - Padding: py-4, mt-4

6. RESPONSIVIDADE - MUITO IMPORTANTE
   Substituir TODOS os valores fixos por relativos:
   
   ❌ ERRADO (fixo):
   - width: 390px
   - height: 844px
   - width: 350px
   
   ✅ CORRETO (responsivo):
   - width: 100% ou w-full
   - height: 100vh ou h-full
   - max-width: 100%
   
   Container principal deve ser:
   <div className="w-full min-h-screen bg-orange-50">
   
   NÃO usar larguras fixas em pixels para containers.
   Imagens: w-full, object-cover
   Cards: w-full com padding horizontal

7. LISTA DE PRODUTOS
   - Cada item deve ter: w-full, flex row
   - Imagem do produto: w-24 h-24 (fixo está ok)
   - Info do produto: flex-1 (ocupa resto do espaço)

APLICAR RESPONSIVIDADE EM TODO O COMPONENTE.
O app deve funcionar bem em:
- 390px (iPhone 14)
- 375px (iPhone SE)
- 414px (iPhone Plus)
- 360px (Android comum)

Por favor, corrija esses problemas e me mostre o resultado.