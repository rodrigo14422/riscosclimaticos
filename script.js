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
    const temperatura = parseFloat(inputTemperatura.value);
    const umidade = parseFloat(inputUmidade.value);

    // Torna o painel de resultados visível removendo a classe CSS utilitária
    painelResultado.classList.remove('escondido');

    /* --- VALIDAÇÃO ESTRITA CONTRA BUGS --- */
    // 1. Validação de Campos Vazios ou Não Numéricos (NaN)
    if (isNaN(temperatura) || isNaN(umidade)) {
        exibirMensagemErro("Preenchimento Obrigatório: Por favor, insira valores numéricos válidos em ambos os campos.");
        return; // Interrompe a execução imediatamente
    }

    // 2. Validação de Valores Negativos (Incoerência para cenário crítico de incêndio rural)
    if (temperatura < 0 || umidade < 0) {
        exibirMensagemErro("Dados Incoerentes: O monitoramento de incêndios não processa temperaturas ou umidades negativas nesta simulação.");
        return; 
    }

    // 3. Validação de Limites Físicos Reais (Umidade do ar não passa de 100%)
    if (umidade > 100) {
        exibirMensagemErro("Erro de Medição: A umidade relativa do ar não pode ser maior que 100%.");
        return;
    }

    /* --- PROCESSAMENTO DOS DADOS (Cálculo do Risco Climático) --- */
    let nívelRisco = "";
    let classeEstilo = "";
    let recomendacao = "";

    // Lógica baseada no cruzamento de alta temperatura e baixa umidade (Clima propício a fogo no campo)
    if (temperatura >= 35 && umidade <= 20) {
        nívelRisco = "CRÍTICO (Risco Muito Alto de Incêndios)";
        classeEstilo = "erro-validacao"; // Reutiliza a estilização de destaque avermelhado
        recomendacao = "⚠️ Alerta Máximo! Condições extremas de seca (estilo La Niña). Suspenda qualquer queima controlada, evite ligar colhedoras nas horas mais quentes e ative o monitoramento por drones.";
    } else if (temperatura >= 28 || umidade <= 40) {
        nívelRisco = "MÉDIO / ATENÇÃO";
        classeEstilo = "alerta-sucesso"; // Amarelado/Verde de transição
        recomendacao = "📢 Fique Atento! O clima está ficando propício para propagação de faíscas. Certifique-se de que os aceiros da propriedade estão limpos e as máquinas lubrificadas.";
    } else {
        nívelRisco = "BAIXO / SEGURO";
        classeEstilo = "alerta-sucesso"; // Estilização esverdeada segura
        recomendacao = "✅ Condições Estáveis! O risco de incêndios florestais e rurais está controlado no momento. Continue seguindo o guia de prevenção preventiva diária.";
    }

    /* --- RENDERIZAÇÃO ELEGANTE DIRETAMENTE NA TELA --- */
    mensagemAlerta.className = classeEstilo; // Aplica a classe de estilo correspondente
    mensagemAlerta.innerHTML = `
        <strong>Nível de Risco:</strong> ${nívelRisco}<br><br>
        <strong>Orientação Técnica:</strong> ${recomendacao}
    `;
});

/**
 * Função Auxiliar para renderizar caixas de erro amigáveis na tela
 */
function exibirMensagemErro(textoErro) {
    mensagemAlerta.className = "erro-validacao";
    mensagemAlerta.innerHTML = `⚠️ <strong>Ops! Encontramos um problema:</strong><br>${textoErro}`;
}

/* ==========================================================================
   3. INTERATIVIDADE DO CHATBOT DE EMERGÊNCIA
   ========================================================================== */
botoesOpcao.forEach(botao => {
    botao.addEventListener('click', function() {
        const perguntaUsuario = this.textContent;
        const respostaBot = this.getAttribute('data-resposta');

        // 1. Renderiza a mensagem do usuário no chat
        const divUsuario = document.createElement('p');
        divUsuario.className = 'msg-usuario';
        divUsuario.textContent = perguntaUsuario;
        historicoChat.appendChild(divUsuario);

        // 2. Renderiza a resposta automática do Bot (Simulando IA/Diretrizes do Agrinho)
        const divBot = document.createElement('p');
        divBot.className = 'msg-bot';
        divBot.textContent = respostaBot;
        historicoChat.appendChild(divBot);

        // Rola automaticamente o chat para a última mensagem enviada
        historicoChat.scrollTop = historicoChat.scrollHeight;
    });
});
