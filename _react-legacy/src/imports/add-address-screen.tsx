TAREFA: Criar a tela AddAddressScreen

CONTEXTO:
Tela para adicionar um novo endereço de entrega. O usuário preenche os dados do endereço e salva.

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
     - Ação: navigate('/address-select')
   - Título: "Novo endereço"
     - Estilo: text-xl, font-bold, color #7C2D12

2. FORMULÁRIO
   - Container: px-6, mt-4, flex-1, overflow-y-auto
   - ESCONDER scrollbar
   - Padding-bottom: pb-32
   
   2.1 TIPO DE ENDEREÇO (label)
   - Título: "Tipo de endereço"
     - Estilo: text-sm, font-medium, color #7C2D12, mb-2
   
   - Chips (flex row, gap-2):
     - Chip ativo: px-4 py-2, rounded-full, bg-#F97316, text-white, font-medium
     - Chip inativo: px-4 py-2, rounded-full, bg-white, border #FED7AA, text #7C2D12
     
     - Opções: "Casa" (ícone Home) | "Trabalho" (ícone Briefcase) | "Outro" (ícone MapPin)

   2.2 CAMPO CEP
   - Label: "CEP"
     - Estilo: text-sm, font-medium, color #7C2D12, mb-2, mt-6
   - Input:
     - Altura: h-14
     - Placeholder: "00000-000"
     - Estilo: w-full, rounded-xl, border-2 border-[#FED7AA], px-4, bg-white
     - Máscara: #####-###
   - Botão buscar CEP (dentro do input, à direita):
     - Ícone: Search (20x20), color #F97316
     - Ação: buscar endereço pelo CEP

   2.3 CAMPO RUA
   - Label: "Rua"
   - Input:
     - Placeholder: "Nome da rua"
     - Mesmo estilo do CEP

   2.4 CAMPOS NÚMERO E COMPLEMENTO (lado a lado)
   - Layout: flex row, gap-4
   
   - Número (flex-1):
     - Label: "Número"
     - Input: placeholder "123"
   
   - Complemento (flex-2):
     - Label: "Complemento"
     - Input: placeholder "Apto, bloco..."

   2.5 CAMPO BAIRRO
   - Label: "Bairro"
   - Input: placeholder "Nome do bairro"

   2.6 CAMPOS CIDADE E ESTADO (lado a lado)
   - Layout: flex row, gap-4
   
   - Cidade (flex-2):
     - Label: "Cidade"
     - Input: placeholder "São Paulo"
   
   - Estado (flex-1):
     - Label: "UF"
     - Input ou Select: placeholder "SP"

   2.7 CAMPO REFERÊNCIA (opcional)
   - Label: "Ponto de referência (opcional)"
   - Input: placeholder "Próximo ao mercado..."

3. FOOTER FIXO
   - Posição: fixed, bottom-0, left-0, right-0
   - Background: white
   - Padding: p-6
   - Border-top: 1px solid #FED7AA
   
   - Botão salvar:
     - Altura: h-14, w-full
     - Fundo: #F97316
     - Border-radius: rounded-2xl
     - Sombra: shadow-lg, shadow-orange-500/30
     - Texto: "Salvar endereço"
       - Estilo: font-bold, text-lg, color white
     - Ação: salvar e navigate('/address-select')

ESTADO DO COMPONENTE:
- addressType: 'home' | 'work' | 'other'
- formData: { cep, street, number, complement, neighborhood, city, state, reference }

NAVEGAÇÃO:
- Botão voltar → /address-select
- Salvar → /address-select (com novo endereço)

NOME DO ARQUIVO: AddAddressScreen.tsx
ROTA: /add-address