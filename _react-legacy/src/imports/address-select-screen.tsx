TAREFA: Criar a tela AddressSelectScreen

CONTEXTO:
Tela para o usuário escolher um endereço de entrega salvo ou adicionar um novo. Vem após o carrinho.

DESIGN SYSTEM (obrigatório):
- Fundo: #FFF7ED
- Cor primária: #F97316
- Texto principal: #7C2D12
- Texto secundário: #9A3412
- Bordas: #FED7AA
- Cards: #FFFFFF
- Ícones: Lucide React

RESPONSIVIDADE: w-full min-h-screen, sem scrollbars visíveis

ESTRUTURA DA TELA:

1. HEADER
   - Container: pt-12 px-6 pb-4
   - Layout: flex row, items-center, gap-4
   
   - Botão voltar: ArrowLeft (24x24), color #7C2D12
   - Título: "Endereço de entrega"
     - Estilo: text-xl, font-bold, color #7C2D12

2. LISTA DE ENDEREÇOS SALVOS
   - Container: px-6, mt-4
   
   Cada endereço (bg-white, rounded-xl, p-4, mb-3, shadow-sm, border-2):
   
   - Se SELECIONADO: border-#F97316, bg-#FFF7ED
   - Se NÃO selecionado: border-transparent
   
   - Layout: flex row, gap-4
   
   - ÍCONE (esquerda):
     - Container: w-12 h-12, rounded-full, bg-#FFF7ED, flex items-center justify-center
     - Ícone: Home ou Building ou Briefcase (24x24), color #F97316
   
   - INFO (centro, flex-1):
     - Label: "Casa" ou "Trabalho" ou "Outro"
       - Estilo: text-base, font-bold, color #7C2D12
     - Endereço: "Rua das Flores, 123"
       - Estilo: text-sm, color #9A3412, mt-1
     - Complemento: "Apto 45, Bloco B"
       - Estilo: text-sm, color #9A3412
     - CEP/Bairro: "01234-567 • Jardim Primavera"
       - Estilo: text-xs, color #9A3412, mt-1
   
   - RADIO (direita):
     - Se selecionado: círculo preenchido #F97316
     - Se não: círculo vazio, border #FED7AA
   
   ENDEREÇOS EXEMPLO:
   
   1. Casa (selecionado)
      - Rua das Flores, 123
      - Apto 45, Bloco B
      - 01234-567 • Jardim Primavera
      - Ícone: Home
   
   2. Trabalho
      - Av. Paulista, 1000
      - Sala 1501, 15º andar
      - 01310-100 • Bela Vista
      - Ícone: Briefcase

3. BOTÃO ADICIONAR NOVO ENDEREÇO
   - Container: mx-6, mt-4
   - Layout: flex row, items-center, justify-center, gap-2
   - Estilo: w-full, h-14, rounded-xl, border-2 border-dashed border-#F97316
   
   - Ícone: Plus (20x20), color #F97316
   - Texto: "Adicionar novo endereço"
     - Estilo: font-medium, color #F97316
   
   - Ação: navigate('/add-address')

4. FOOTER FIXO
   - Posição: fixed, bottom-0, left-0, right-0
   - Background: white
   - Padding: p-6
   - Border-top: 1px solid #FED7AA
   
   - Botão confirmar:
     - Altura: h-14, w-full
     - Fundo: #F97316
     - Border-radius: rounded-2xl
     - Texto: "Confirmar endereço"
       - Estilo: font-bold, text-lg, color white
     - Ação: navigate('/payment')

ESTADO DO COMPONENTE:
- addresses: array de endereços salvos
- selectedAddressId: string (id do endereço selecionado)

NAVEGAÇÃO:
- Botão voltar → /cart
- Adicionar novo → /add-address
- Confirmar → /payment

NOME DO ARQUIVO: AddressSelectScreen.tsx
ROTA: /address-select