// Funcionalidades do login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    
    // Verificar se há credenciais salvas
    checkSavedCredentials();
    
    // Alternar visibilidade da senha
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Alternar ícone
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Processar envio do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value.trim();
        
        // Validação básica
        if (!username || !password) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        // Simulação de autenticação (será substituída por backend real)
        authenticateUser(username, password);
    });
    
    // Função para autenticar usuário
    function authenticateUser(username, password) {
        // Mostrar mensagem de carregamento
        showMessage('Autenticando...', '');
        
        // Simular delay de rede
        setTimeout(() => {
            // Credenciais temporárias para demonstração
            // Em produção, isso seria validado no servidor
            if (username === 'admin' && password === 'admin123') {
                // Salvar credenciais se "lembrar-me" estiver marcado
                if (rememberCheckbox.checked) {
                    saveCredentials(username, password);
                } else {
                    clearSavedCredentials();
                }
                
                showMessage('Login bem-sucedido! Redirecionando...', 'success');
                
                // Redirecionar para o painel administrativo após login
                setTimeout(() => {
                    window.location.href = 'admin/dashboard.html';
                }, 1000);
            } else {
                showMessage('Usuário ou senha incorretos. Tente novamente.', 'error');
            }
        }, 800);
    }
    
    // Função para exibir mensagens
    function showMessage(message, type) {
        loginMessage.textContent = message;
        loginMessage.className = 'login-message';
        
        if (type) {
            loginMessage.classList.add(type);
        }
    }
    
    // Função para salvar credenciais no localStorage
    function saveCredentials(username, password) {
        // Em produção, nunca armazene senhas em texto simples
        // Isso é apenas para demonstração
        const credentials = {
            username: username,
            // Em um sistema real, armazenaríamos apenas um token, não a senha
            password: btoa(password) // Codificação básica, não segura para produção
        };
        
        localStorage.setItem('portfolioCredentials', JSON.stringify(credentials));
    }
    
    // Função para verificar credenciais salvas
    function checkSavedCredentials() {
        const savedCredentials = localStorage.getItem('portfolioCredentials');
        
        if (savedCredentials) {
            try {
                const credentials = JSON.parse(savedCredentials);
                document.getElementById('username').value = credentials.username;
                // Em um sistema real, não recuperaríamos a senha, apenas um token
                passwordInput.value = atob(credentials.password);
                rememberCheckbox.checked = true;
            } catch (e) {
                console.error('Erro ao recuperar credenciais:', e);
                clearSavedCredentials();
            }
        }
    }
    
    // Função para limpar credenciais salvas
    function clearSavedCredentials() {
        localStorage.removeItem('portfolioCredentials');
    }
});
