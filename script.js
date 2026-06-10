/* ==========================================================================
   1. CAPTURA DE ELEMENTOS DO DOM (document.querySelector)
   ========================================================================== */
// Elementos do Termômetro de Risco
const formularioClima = document.querySelector('#formulario-clima');
const inputTemperatura = document.querySelector('#input-temperatura');
const inputUmidade = document.querySelector('#input-umidade');
const painelResultado = document.querySelector('#painel-resultado');
const mensagemAlerta = document.querySelector('#mensagem-alerta');

// Elementos do Chatbot de Emergência
const botoesOpcao = document.querySelectorAll('.btn-opcao');
const historicoChat = document.querySelector('#historico-chat');

/* ==========================================================================
   2. PROGRAMAÇÃO DA LÓGICA DO TERMÔMETRO E VALIDAÇÃO ESTRITA
   ========================================================================== */
formularioClima.addEventListener('submit', function(event) {
    // Impede o recarregamento padrão da página ao enviar o formulário
    event.preventDefault();

    // Captura os valores e converte explicitamente para números flutuantes
    const
      
