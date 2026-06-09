# GODELIVERY (Angular + Firebase)

App de delivery em **Angular 19** (standalone components, Router, Tailwind, Lucide icons) com integração **Firebase** (Auth + Firestore).

Design original: [Figma – GODELIVERY](https://www.figma.com/design/ONSFEu42EYwHtQEsSvL01D/GODELIVERY)

## Requisitos

- Node.js 18+
- npm

## Instalação

```bash
npm install
```

## Configuração do Firebase (obrigatório para rodar com backend real)

1. Acesse https://console.firebase.google.com/ e crie um novo projeto (ou use existente).
2. No projeto:
   - Ative **Authentication** > Sign-in method > Email/Password (ative).
   - Ative **Firestore Database** (crie em modo de produção ou teste, escolha região).
3. Adicione um app Web (</>):
   - Copie as credenciais (apiKey, authDomain, projectId, appId etc).
4. Edite o arquivo:
   - `src/environments/environment.ts` (e o .prod.ts)
   - Substitua os valores `SUA_API_KEY` etc pelos do seu projeto Firebase.
5. (Opcional para produção) Configure regras de segurança do Firestore (ex: permitir reads para usuários autenticados).

## Desenvolvimento

```bash
npm start
```

Abre em `http://localhost:4200/`.

**Primeiro acesso após configurar Firebase:**
- Crie uma conta em /signup (será salva no Auth + Firestore users).
- Os dados de restaurantes e produtos são "seedados" automaticamente na primeira carga do /home (se a coleção estiver vazia).

## Build de produção

```bash
npm run build
```

Saída em `dist/godelivery/`.

## Rotas

| Rota | Tela |
|------|------|
| `/` | Splash (redireciona para home se logado) |
| `/onboarding-1` … `/onboarding-3` | Onboarding |
| `/login`, `/signup` | Autenticação (real com Firebase) |
| `/forgot-password`, `/otp-verification`, `/reset-password` | Recuperação (usa sendPasswordResetEmail do Firebase; OTP é demo) |
| `/home` | Início (restaurantes do Firestore + favoritos por usuário) |
| `/search`, `/notifications` | Busca e notificações |
| `/restaurant/:id`, `/product/:id` | Restaurante e produto (dados dinâmicos do Firestore) |
| `/orders`, `/favorites`, `/profile` | Pedidos (reais do Firestore), favoritos, perfil |
| `/cart`, `/address-select`, `/add-address` | Carrinho e endereço |
| `/checkout`, `/pix-payment`, `/order-confirmation` | Pagamento (pedidos salvos no Firestore) |

## Estrutura

- `src/app/pages/` — telas do app
- `src/app/services/firebase.service.ts` — Auth + Firestore + seed
- `src/environments/environment.ts` — config Firebase
- `src/app/shared/` — componentes reutilizáveis
- Código React original preservado em `_react-legacy/`

## Observações do Curso (Projeto Blueberry)

Este projeto é a versão Angular do sistema de delivery ensinado no módulo de HTML/CSS/JS + Firebase. A migração substitui todos os mocks por chamadas reais ao Firebase Authentication e Firestore.

- Usuários, restaurantes, produtos, favoritos e pedidos agora persistem no Firebase.
- Faça login/cadastro reais.
- Alterne favoritos (salva por usuário).
- Faça pedidos (salva na coleção orders).

Boa codificação e bons estudos!

# GODELIVERY
Projeto GODELIVERY AULA THIAGO (versão anterior)
