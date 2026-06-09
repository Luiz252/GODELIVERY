#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera o Guia Passo a Passo em PDF para GODELIVERY + Firebase
"""

from fpdf import FPDF
import os

class GuidePDF(FPDF):
    def __init__(self):
        super().__init__()
        # Use system Arial (widely available on Windows and supports Portuguese)
        self.add_font("Main", "", "C:/Windows/Fonts/arial.ttf")
        self.add_font("Main", "B", "C:/Windows/Fonts/arialbd.ttf")
        self.add_font("Main", "I", "C:/Windows/Fonts/ariali.ttf")
        self.add_font("Code", "", "C:/Windows/Fonts/consola.ttf")  # if not exist will fallback
        
    def header(self):
        if self.page_no() > 1:
            self.set_font("Main", "I", 9)
            self.set_text_color(154, 52, 18)
            self.cell(0, 10, "Guia Passo a Passo • GODELIVERY + Firebase", align="R")
            self.ln(12)

    def footer(self):
        self.set_y(-15)
        self.set_font("Main", "I", 8)
        self.set_text_color(124, 45, 18)
        self.cell(0, 10, f"Projeto Blueberry • Página {self.page_no()}", align="C")

    def chapter_title(self, title):
        self.set_font("Main", "B", 16)
        self.set_text_color(124, 45, 18)
        self.set_fill_color(254, 215, 170)
        self.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT", fill=True)
        self.ln(4)

    def section_title(self, title):
        self.set_font("Main", "B", 12)
        self.set_text_color(194, 65, 12)
        self.ln(3)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body(self, text):
        self.set_font("Main", "", 10)
        self.set_text_color(55, 65, 81)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def bullet(self, text):
        self.set_font("Main", "", 10)
        self.set_text_color(55, 65, 81)
        self.set_x(15)
        self.multi_cell(0, 5.5, "• " + text)

    def numbered(self, num, text):
        self.set_font("Main", "", 10)
        self.set_text_color(55, 65, 81)
        self.set_x(15)
        self.multi_cell(0, 5.5, f"{num}. {text}")

    def code_block(self, code):
        self.set_fill_color(31, 41, 55)
        self.set_text_color(248, 250, 252)
        self.set_font("Courier", "", 9)
        # Simple code block
        lines = code.strip().split("\n")
        for line in lines:
            self.set_x(15)
            self.cell(0, 5, line[:95], fill=True, new_x="LMARGIN", new_y="NEXT")
        self.set_text_color(55, 65, 81)
        self.ln(3)

    def warning_box(self, text):
        self.set_fill_color(254, 226, 226)
        self.set_draw_color(239, 68, 68)
        self.set_font("Main", "B", 10)
        self.set_text_color(185, 28, 28)
        self.set_x(12)
        self.multi_cell(0, 6, "⚠ " + text, border=1, fill=True)
        self.ln(3)
        self.set_text_color(55, 65, 81)

    def success_box(self, text):
        self.set_fill_color(220, 252, 231)
        self.set_font("Main", "B", 11)
        self.set_text_color(22, 101, 52)
        self.set_x(12)
        self.multi_cell(0, 7, "✓ " + text, fill=True)
        self.ln(4)
        self.set_text_color(55, 65, 81)


def create_guide():
    pdf = GuidePDF()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()

    # ========== CAPA ==========
    pdf.set_font("Main", "B", 32)
    pdf.set_text_color(249, 115, 22)
    pdf.ln(30)
    pdf.cell(0, 18, "GODELIVERY", align="C", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("Main", "B", 18)
    pdf.set_text_color(124, 45, 18)
    pdf.cell(0, 12, "Passo a Passo: Migração para Firebase", align="C", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("Main", "I", 12)
    pdf.set_text_color(154, 52, 18)
    pdf.ln(4)
    pdf.cell(0, 8, "Angular 19 + Firebase Authentication + Firestore", align="C", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("Main", "", 11)
    pdf.set_text_color(55, 65, 81)
    pdf.ln(10)
    pdf.multi_cell(0, 6, "Guia completo para configurar e rodar o app com backend real no Firebase", align="C")
    
    pdf.ln(25)
    pdf.set_font("Main", "I", 9)
    pdf.set_text_color(154, 52, 18)
    pdf.cell(0, 6, "Projeto Blueberry • Junho 2026", align="C")

    # ========== 1. INTRODUÇÃO ==========
    pdf.add_page()
    pdf.chapter_title("1. Introdução")
    pdf.body("Este guia explica como configurar o projeto GODELIVERY (versão Angular) para utilizar o Firebase como backend. A migração já foi aplicada no código-fonte. Agora você só precisa criar o projeto no Firebase Console e inserir as credenciais.")

    pdf.set_font("Main", "B", 10)
    pdf.set_text_color(124, 45, 18)
    pdf.cell(0, 7, "O que foi migrado:", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)
    
    items = [
        "Autenticação real (login, cadastro, logout, reset de senha via Firebase Auth)",
        "Dados de restaurantes e produtos vindos do Firestore",
        "Favoritos salvos por usuário (subcoleção)",
        "Pedidos criados e listados a partir do Firestore",
        "Seed automático de dados na primeira execução da Home"
    ]
    for item in items:
        pdf.bullet(item)

    # ========== 2. PRÉ-REQUISITOS ==========
    pdf.chapter_title("2. Pré-requisitos")
    reqs = [
        "Node.js 18 ou superior instalado",
        "Conta Google (para acessar o Firebase Console)",
        "O projeto já deve estar na pasta: C:\\Users\\luiz_kuhn\\Downloads\\GODELIVERY (1)",
        "npm install já executado (firebase já está instalado)"
    ]
    for r in reqs:
        pdf.bullet(r)

    # ========== 3. CRIAR PROJETO FIREBASE ==========
    pdf.chapter_title("3. Criar e Configurar o Projeto no Firebase")

    pdf.section_title("3.1 Acessar o Console")
    pdf.numbered(1, "Abra o navegador e acesse: https://console.firebase.google.com/")
    pdf.numbered(2, "Faça login com sua conta Google.")

    pdf.section_title("3.2 Criar novo projeto")
    pdf.numbered(1, 'Clique em "Criar um projeto" (ou "Add project").')
    pdf.numbered(2, 'Dê um nome (ex: godelivery-seunome).')
    pdf.numbered(3, "Aceite os termos e clique em Continuar.")
    pdf.numbered(4, "Desative o Google Analytics por enquanto.")
    pdf.numbered(5, 'Clique em "Criar projeto" e aguarde (≈ 1 minuto).')

    pdf.section_title("3.3 Ativar Authentication (Email/Senha)")
    pdf.numbered(1, "No menu lateral esquerdo, clique em Authentication.")
    pdf.numbered(2, 'Clique em "Começar" / "Get started".')
    pdf.numbered(3, 'Vá na aba "Sign-in method".')
    pdf.numbered(4, 'Clique em Email/Password → Ative a opção e clique em "Salvar".')

    pdf.section_title("3.4 Ativar Firestore Database")
    pdf.numbered(1, "No menu lateral, clique em Firestore Database.")
    pdf.numbered(2, 'Clique em "Criar banco de dados".')
    pdf.numbered(3, 'Escolha "Iniciar em modo de teste" (para desenvolvimento).')
    pdf.numbered(4, "Selecione uma localização próxima (ex: southamerica-east1 - São Paulo).")
    pdf.numbered(5, "Clique em Ativar.")
    pdf.warning_box("O modo de teste expira em 30 dias. Depois configure regras de segurança (seção 7).")

    pdf.section_title("3.5 Obter as credenciais do app Web")
    pdf.numbered(1, 'No canto superior (engrenagem), clique em "Configurações do projeto".')
    pdf.numbered(2, 'Role até "Seus apps" e clique no ícone da Web (</>).')
    pdf.numbered(3, 'Dê um apelido e clique em "Registrar app".')
    pdf.numbered(4, "COPIE todo o objeto firebaseConfig que aparece.")
    pdf.numbered(5, "Clique em Continuar.")

    # ========== 4. INSERIR CREDENCIAIS ==========
    pdf.add_page()
    pdf.chapter_title("4. Inserir as Credenciais no Projeto Angular")

    pdf.section_title("4.1 Editar o arquivo de ambiente")
    pdf.body("Abra o arquivo:")
    pdf.code_block("C:\\Users\\luiz_kuhn\\Downloads\\GODELIVERY (1)\\src\\environments\\environment.ts")

    pdf.body("Substitua pelo exemplo abaixo usando os valores reais do seu projeto Firebase:")
    pdf.code_block("""export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA...sua-chave-real...",
    authDomain: "seu-projeto-id.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto-id.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def4567890"
  }
};""")

    pdf.body("Repita o mesmo processo no arquivo environment.prod.ts.")

    # ========== 5. EXECUTAR ==========
    pdf.chapter_title("5. Executar o Projeto")
    pdf.numbered(1, "Abra o terminal na pasta do projeto:")
    pdf.code_block('cd "C:\\Users\\luiz_kuhn\\Downloads\\GODELIVERY (1)"')
    pdf.numbered(2, "Se necessário: npm install")
    pdf.numbered(3, "Inicie o servidor:")
    pdf.code_block("npm start")
    pdf.numbered(4, "O app abrirá automaticamente em http://localhost:4200")

    pdf.success_box("Na primeira visita à tela /home (após login), os dados são seedados automaticamente no Firestore se as coleções estiverem vazias.")

    # ========== 6. TESTES ==========
    pdf.chapter_title("6. Testando os Fluxos Principais")
    tests = [
        ("Cadastro", "/signup → cria usuário no Auth + perfil no Firestore."),
        ("Login", "Usa credenciais reais do Firebase Auth."),
        ("Home", "Restaurantes do Firestore + toggle de favoritos persistente."),
        ("Restaurante/Produto", "Carregamento dinâmico pelo ID do Firestore."),
        ("Checkout", "Salva o pedido na coleção orders."),
        ("Meus Pedidos (/orders)", "Lista os pedidos reais do usuário logado."),
        ("Perfil + Sair", "Mostra dados do Firestore + logout real.")
    ]
    for title, desc in tests:
        pdf.set_font("Main", "B", 10)
        pdf.set_text_color(124, 45, 18)
        pdf.cell(0, 6, "• " + title + ":", new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Main", "", 10)
        pdf.set_text_color(55, 65, 81)
        pdf.set_x(18)
        pdf.multi_cell(0, 5.2, desc)

    # ========== 7. REGRAS DE SEGURANÇA ==========
    pdf.add_page()
    pdf.chapter_title("7. Regras de Segurança do Firestore (Importante!)")

    pdf.body("Enquanto estiver em modo de teste, qualquer pessoa pode ler seus dados. Configure regras decentes:")

    pdf.section_title("Passos:")
    pdf.numbered(1, "Firebase Console → Firestore Database → aba Regras")
    pdf.numbered(2, "Cole o conteúdo abaixo e clique em Publicar:")

    pdf.code_block("""rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/favorites/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    match /restaurants/{docId} { allow read: if true; }
    match /products/{docId} { allow read: if true; }
  }
}""")

    # ========== 8. TROUBLESHOOTING ==========
    pdf.chapter_title("8. Problemas Comuns e Soluções")

    problems = [
        ("auth/invalid-api-key", "Verifique se colou as chaves corretamente no environment.ts. O projectId deve bater exatamente."),
        ("permission-denied", "Você está logado? As regras estão permitindo? Abra o Console do navegador (F12) para ver o erro exato."),
        ("Dados não aparecem", "Abra o Firestore no console. Se vazio, delete as coleções e recarregue /home para rodar o seed novamente."),
        ("Usuário criado mas perfil não carrega", "O listener de auth pode demorar alguns segundos. Recarregue a página ou faça logout/login.")
    ]
    for title, solution in problems:
        pdf.set_font("Main", "B", 10)
        pdf.set_text_color(185, 28, 28)
        pdf.cell(0, 6, "• " + title, new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Main", "", 10)
        pdf.set_text_color(55, 65, 81)
        pdf.set_x(15)
        pdf.multi_cell(0, 5.2, solution)
        pdf.ln(1)

    # ========== 9. DEPLOY ==========
    pdf.chapter_title("9. Deploy no Firebase Hosting (Bônus)")

    pdf.numbered(1, "Instale o CLI (uma vez):")
    pdf.code_block("npm install -g firebase-tools")
    pdf.numbered(2, "Login:")
    pdf.code_block("firebase login")
    pdf.numbered(3, "Inicialize:")
    pdf.code_block("firebase init hosting")
    pdf.body("Escolha seu projeto, public directory = dist/godelivery, SPA rewrites = Yes")
    pdf.numbered(4, "Build:")
    pdf.code_block("npm run build")
    pdf.numbered(5, "Deploy:")
    pdf.code_block("firebase deploy --only hosting")
    pdf.body("Seu app ficará em: https://SEU-PROJETO-ID.web.app")

    # ========== 10. RESUMO ==========
    pdf.add_page()
    pdf.chapter_title("10. Resumo Rápido")

    # Simple table
    pdf.set_font("Main", "B", 10)
    pdf.set_fill_color(124, 45, 18)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(18, 8, "Passo", border=1, fill=True, align="C")
    pdf.cell(0, 8, "Ação", border=1, fill=True, new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("Main", "", 10)
    pdf.set_text_color(55, 65, 81)
    steps = [
        ("1", "Criar projeto no Firebase Console"),
        ("2", "Habilitar Authentication (Email/Password)"),
        ("3", "Habilitar Firestore Database"),
        ("4", "Colar config no environment.ts + .prod.ts"),
        ("5", "npm start"),
        ("6", "Cadastrar usuário e testar os fluxos"),
        ("7", "(Opcional) Configurar regras de segurança + Deploy Hosting"),
    ]
    for num, action in steps:
        pdf.cell(18, 7, num, border=1, align="C")
        pdf.cell(0, 7, action, border=1, new_x="LMARGIN", new_y="NEXT")

    pdf.ln(8)
    pdf.success_box("Parabéns! Seu GODELIVERY agora está 100% integrado com Firebase.")

    pdf.ln(6)
    pdf.set_font("Main", "I", 9)
    pdf.set_text_color(154, 52, 18)
    pdf.multi_cell(0, 5, "Qualquer dúvida, consulte também o arquivo README.md atualizado na raiz do projeto.")

    # Save
    output_path = os.path.join(os.getcwd(), "Guia_Passo_a_Passo_Firebase_GODELIVERY.pdf")
    pdf.output(output_path)
    print(f"✅ PDF criado com sucesso: {output_path}")
    return output_path


if __name__ == "__main__":
    create_guide()