import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { jsPDF } from 'jspdf';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class GuidePDF {
  constructor() {
    this.pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    this.margin = 18;
    this.pageWidth = 210;
    this.contentWidth = this.pageWidth - this.margin * 2;
    this.y = this.margin;
    this.page = 1;
  }

  checkPage(needed = 20) {
    if (this.y + needed > 280) {
      this.footer();
      this.pdf.addPage();
      this.page += 1;
      this.y = this.margin;
      if (this.page > 1) this.header();
    }
  }

  header() {
    this.pdf.setFont('helvetica', 'italic');
    this.pdf.setFontSize(9);
    this.pdf.setTextColor(154, 52, 18);
    this.pdf.text('GODELIVERY • Novas Implementações', this.pageWidth - this.margin, 12, { align: 'right' });
    this.y = 22;
  }

  footer() {
    this.pdf.setFont('helvetica', 'italic');
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(124, 45, 18);
    this.pdf.text(`Projeto GoDelivery • Página ${this.page}`, this.pageWidth / 2, 290, { align: 'center' });
  }

  chapterTitle(title) {
    this.checkPage(16);
    this.pdf.setFillColor(254, 215, 170);
    this.pdf.setDrawColor(254, 215, 170);
    this.pdf.rect(this.margin, this.y, this.contentWidth, 10, 'F');
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setFontSize(14);
    this.pdf.setTextColor(124, 45, 18);
    this.pdf.text(title, this.margin + 2, this.y + 7);
    this.y += 14;
  }

  sectionTitle(title) {
    this.checkPage(12);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setFontSize(11);
    this.pdf.setTextColor(194, 65, 12);
    this.pdf.text(title, this.margin, this.y);
    this.y += 7;
  }

  body(text) {
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(55, 65, 81);
    const lines = this.pdf.splitTextToSize(text, this.contentWidth);
    for (const line of lines) {
      this.checkPage(6);
      this.pdf.text(line, this.margin, this.y);
      this.y += 5.5;
    }
    this.y += 2;
  }

  bullet(text) {
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(55, 65, 81);
    const lines = this.pdf.splitTextToSize('• ' + text, this.contentWidth - 4);
    for (const line of lines) {
      this.checkPage(6);
      this.pdf.text(line, this.margin + 2, this.y);
      this.y += 5.5;
    }
  }

  table(headers, rows) {
    const colWidths = [42, 48, 82];
    const startX = this.margin;
    this.checkPage(12 + rows.length * 7);

    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setFontSize(9);
    this.pdf.setFillColor(124, 45, 18);
    this.pdf.setTextColor(255, 255, 255);
    let x = startX;
    headers.forEach((h, i) => {
      this.pdf.rect(x, this.y, colWidths[i], 8, 'F');
      this.pdf.text(h, x + 2, this.y + 5.5);
      x += colWidths[i];
    });
    this.y += 8;

    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setTextColor(55, 65, 81);
    rows.forEach((row, idx) => {
      const rowHeight = 7;
      x = startX;
      row.forEach((cell, i) => {
        this.pdf.setDrawColor(254, 215, 170);
        this.pdf.rect(x, this.y, colWidths[i], rowHeight);
        const lines = this.pdf.splitTextToSize(String(cell), colWidths[i] - 3);
        this.pdf.text(lines[0] || '', x + 2, this.y + 4.8);
        x += colWidths[i];
      });
      this.y += rowHeight;
      if (idx % 8 === 7) this.checkPage(20);
    });
    this.y += 4;
  }

  codeBlock(code) {
    this.pdf.setFont('courier', 'normal');
    this.pdf.setFontSize(8.5);
    const lines = code.trim().split('\n');
    for (const line of lines) {
      this.checkPage(6);
      this.pdf.setFillColor(31, 41, 55);
      this.pdf.rect(this.margin, this.y - 3.5, this.contentWidth, 5.5, 'F');
      this.pdf.setTextColor(248, 250, 252);
      this.pdf.text(line.slice(0, 95), this.margin + 2, this.y);
      this.y += 5.5;
    }
    this.y += 3;
    this.pdf.setTextColor(55, 65, 81);
  }

  successBox(text) {
    this.checkPage(12);
    this.pdf.setFillColor(220, 252, 231);
    this.pdf.setDrawColor(34, 197, 94);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(22, 101, 52);
    const lines = this.pdf.splitTextToSize('OK: ' + text, this.contentWidth - 6);
    const h = lines.length * 5.5 + 4;
    this.pdf.rect(this.margin, this.y, this.contentWidth, h, 'FD');
    lines.forEach((line, i) => this.pdf.text(line, this.margin + 3, this.y + 6 + i * 5.5));
    this.y += h + 4;
  }

  build() {
    // Capa
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setFontSize(30);
    this.pdf.setTextColor(249, 115, 22);
    this.pdf.text('GODELIVERY', this.pageWidth / 2, 55, { align: 'center' });

    this.pdf.setFontSize(16);
    this.pdf.setTextColor(124, 45, 18);
    this.pdf.text('Relatório de Novas Implementações', this.pageWidth / 2, 68, { align: 'center' });

    this.pdf.setFont('helvetica', 'italic');
    this.pdf.setFontSize(11);
    this.pdf.setTextColor(154, 52, 18);
    this.pdf.text('Angular 19 + Firebase + Telas Completas', this.pageWidth / 2, 78, { align: 'center' });

    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(55, 65, 81);
    const intro = this.pdf.splitTextToSize(
      'Documento descrevendo as telas e funcionalidades implementadas após análise do repositório Luiz252/GODELIVERY. Build validado com sucesso em junho de 2026.',
      this.contentWidth
    );
    intro.forEach((line, i) => this.pdf.text(line, this.pageWidth / 2, 95 + i * 6, { align: 'center' }));

    this.pdf.setFont('helvetica', 'italic');
    this.pdf.setFontSize(9);
    this.pdf.text('Repositório: github.com/Luiz252/GODELIVERY', this.pageWidth / 2, 125, { align: 'center' });
    this.pdf.text('Pasta local: C:\\Users\\Luiz_kuhn\\Downloads\\GODELIVERY', this.pageWidth / 2, 132, { align: 'center' });

    this.footer();
    this.pdf.addPage();
    this.page += 1;
    this.y = this.margin;
    this.header();

    this.chapterTitle('1. Resumo executivo');
    this.body(
      'O app GoDelivery passou de telas com placeholders, console.log e navegação incompleta para um fluxo funcional de busca, perfil, pedidos, carrinho e autenticação. Foram adicionadas 6 novas rotas/telas, um serviço de carrinho compartilhado e integrações com Firebase.'
    );
    this.successBox('Build Angular concluído sem erros. Saída em dist/godelivery.');

    this.chapterTitle('2. Novas telas criadas');
    this.table(
      ['Tela', 'Rota', 'Arquivo'],
      [
        ['Editar perfil', '/edit-profile', 'edit-profile-screen.component.ts'],
        ['Ajuda e suporte', '/help', 'help-screen.component.ts'],
        ['Configurações', '/settings', 'settings-screen.component.ts'],
        ['Detalhe do pedido', '/order/:id', 'order-detail-screen.component.ts'],
        ['Resultados categoria', '/category/:slug', 'category-results-screen.component.ts'],
        ['Detalhe promoção', '/promo/:id', 'promo-detail-screen.component.ts'],
      ]
    );

    this.chapterTitle('3. Telas aprimoradas');
    this.sectionTitle('3.1 Busca (/search)');
    this.bullet('Resultados em tempo real de restaurantes e pratos via Firebase.');
    this.bullet('Filtros: entrega grátis, tempo, melhor avaliados.');
    this.bullet('Buscas recentes persistidas em localStorage.');
    this.bullet('Categorias navegam para /category/:slug.');

    this.sectionTitle('3.2 Restaurante (/restaurant/:id)');
    this.bullet('Aba Avaliações com reviews por restaurante (antes: placeholder).');
    this.bullet('Barra do carrinho dinâmica com quantidade e subtotal do restaurante.');

    this.sectionTitle('3.3 Produto e carrinho');
    this.bullet('CartService centraliza itens com persistência em localStorage.');
    this.bullet('Adicionar ao carrinho no product-screen grava itens reais.');
    this.bullet('cart-screen consome o serviço (remove mock fixo).');

    this.sectionTitle('3.4 Perfil, pedidos e home');
    this.bullet('profile-screen navega para editar perfil, ajuda e configurações.');
    this.bullet('orders-screen abre detalhe do pedido com state.order.');
    this.bullet('home-screen: banners -> /promo/:id, categorias -> /category/:id.');

    this.sectionTitle('3.5 Reset de senha');
    this.bullet('Integrado ao Firebase confirmPasswordReset via oobCode na URL do e-mail.');
    this.bullet('Validação de senha, força e mensagens de erro.');

    this.chapterTitle('4. Arquivos novos e alterados');
    this.sectionTitle('Novos');
    this.bullet('src/app/services/cart.service.ts');
    this.bullet('src/app/pages/edit-profile-screen.component.ts');
    this.bullet('src/app/pages/help-screen.component.ts');
    this.bullet('src/app/pages/settings-screen.component.ts');
    this.bullet('src/app/pages/order-detail-screen.component.ts');
    this.bullet('src/app/pages/category-results-screen.component.ts');
    this.bullet('src/app/pages/promo-detail-screen.component.ts');

    this.sectionTitle('Alterados');
    this.bullet('src/app/app.routes.ts — 6 novas rotas registradas.');
    this.bullet('src/app/services/firebase.service.ts — getOrderById, getAllProducts, confirmPasswordReset.');
    this.bullet('search-screen, restaurant-screen, product-screen, cart-screen, reset-password-screen.');
    this.bullet('home-screen, profile-screen, orders-screen.');

    this.chapterTitle('5. Rotas completas do app');
    this.body('O aplicativo possui 30 rotas funcionais, incluindo onboarding, auth, home, busca, restaurante, produto, carrinho, checkout, pedidos, favoritos e perfil.');
    this.codeBlock(`Splash → Onboarding → Login/Signup
Home → Search / Restaurant / Product / Cart
Profile → Edit Profile / Help / Settings
Orders → Order Detail
Category Results / Promo Detail
Checkout → Order Confirmation / PIX / Payment`);

    this.chapterTitle('6. Como executar e validar');
    this.numbered = (n, text) => {
      this.pdf.setFont('helvetica', 'normal');
      this.pdf.setFontSize(10);
      const lines = this.pdf.splitTextToSize(`${n}. ${text}`, this.contentWidth - 4);
      lines.forEach((line) => {
        this.checkPage(6);
        this.pdf.text(line, this.margin + 2, this.y);
        this.y += 5.5;
      });
    };
    this.numbered(1, 'cd C:\\Users\\Luiz_kuhn\\Downloads\\GODELIVERY');
    this.numbered(2, 'npm install (se necessário)');
    this.numbered(3, 'npm start — abre em http://localhost:4200');
    this.numbered(4, 'npm run build — valida compilação TypeScript/Angular');

    this.chapterTitle('7. Pendências opcionais (futuro)');
    this.bullet('OTP ainda simulado — não gera oobCode real do Firebase.');
    this.bullet('Endereços e pagamentos parcialmente mock em checkout.');
    this.bullet('Modo escuro em Configurações marcado como "Em breve".');
    this.bullet('Persistência de endereços/pagamentos no Firestore por usuário.');

    this.chapterTitle('8. Git e deploy');
    this.body('As alterações foram commitadas e enviadas para o repositório GitHub Luiz252/GODELIVERY na branch main. Para atualizar localmente após clone:');
    this.codeBlock('git clone https://github.com/Luiz252/GODELIVERY.git\ncd GODELIVERY\nnpm install\nnpm start');

    this.footer();

    const output = path.join(__dirname, 'Novas_Implementacoes_GODELIVERY.pdf');
    const buffer = Buffer.from(this.pdf.output('arraybuffer'));
    fs.writeFileSync(output, buffer);
    const downloadsCopy = path.join('C:\\Users\\Luiz_kuhn\\Downloads', 'Novas_Implementacoes_GODELIVERY.pdf');
    fs.copyFileSync(output, downloadsCopy);
    console.log('PDF criado:', output);
    console.log('Copia em Downloads:', downloadsCopy);
    return output;
  }
}

new GuidePDF().build();