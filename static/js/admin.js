// Funcionalidades do painel administrativo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação
    checkAuthentication();
    
    // Elementos do DOM
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    const navLinks = document.querySelectorAll('.sidebar-nav a, [data-section]');
    const logoutBtn = document.getElementById('logoutBtn');
    const dropdownLogout = document.getElementById('dropdownLogout');
    const previewBtn = document.getElementById('previewBtn');
    const contentHeader = document.querySelector('.content-header .header-title h1');
    
    // Tabs
    const tabs = document.querySelectorAll('.tab');
    
    // Modais
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const addEducationBtn = document.getElementById('addEducationBtn');
    const emptyAddEducationBtn = document.getElementById('emptyAddEducationBtn');
    const addEducationModal = document.getElementById('addEducationModal');
    
    // Alternar sidebar em dispositivos móveis
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Navegação entre seções
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('id') !== 'logoutBtn' && 
                this.getAttribute('id') !== 'dropdownLogout') {
                e.preventDefault();
                
                const targetSection = this.getAttribute('data-section');
                
                // Atualizar navegação ativa
                document.querySelectorAll('.sidebar-nav li').forEach(item => {
                    item.classList.remove('active');
                });
                
                if (this.parentElement.tagName === 'LI') {
                    this.parentElement.classList.add('active');
                }
                
                // Mostrar seção correspondente
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                document.getElementById(targetSection).classList.add('active');
                
                // Atualizar título do cabeçalho
                contentHeader.textContent = document.querySelector(`#${targetSection} .section-header h2`).textContent;
                
                // Fechar sidebar em dispositivos móveis após navegação
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // Alternar entre tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Atualizar tab ativa
            document.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            // Mostrar conteúdo da tab
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Abrir modais
    function openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }
    
    // Fechar modais
    function closeModal(modal) {
        modal.classList.remove('active');
    }
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Fechar modal ao clicar fora
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Abrir modal de adicionar formação
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', function() {
            openModal('addEducationModal');
        });
    }
    
    if (emptyAddEducationBtn) {
        emptyAddEducationBtn.addEventListener('click', function() {
            openModal('addEducationModal');
        });
    }
    
    // Manipular checkbox "Em andamento" na formação
    const currentEducationCheckbox = document.getElementById('currentEducation');
    const endDateInput = document.getElementById('endDate');
    
    if (currentEducationCheckbox && endDateInput) {
        currentEducationCheckbox.addEventListener('change', function() {
            endDateInput.disabled = this.checked;
            if (this.checked) {
                endDateInput.value = '';
            }
        });
    }
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    if (dropdownLogout) {
        dropdownLogout.addEventListener('click', handleLogout);
    }
    
    function handleLogout(e) {
        e.preventDefault();
        
        // Limpar dados de autenticação
        localStorage.removeItem('portfolioCredentials');
        localStorage.removeItem('portfolioAuth');
        
        // Redirecionar para a página de login
        window.location.href = '../index.html';
    }
    
    // Visualizar site
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            // Abrir visualização do site em nova aba
            window.open('../public/index.html', '_blank');
        });
    }
    
    // Verificar autenticação
    function checkAuthentication() {
        const isAuthenticated = localStorage.getItem('portfolioAuth');
        
        if (!isAuthenticated) {
            // Redirecionar para a página de login
            window.location.href = '../index.html';
        }
    }
    
    // Manipular uploads de arquivos
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        const button = input.nextElementSibling;
        const fileNameSpan = button.nextElementSibling;
        
        if (button) {
            button.addEventListener('click', function() {
                input.click();
            });
        }
        
        input.addEventListener('change', function() {
            if (fileNameSpan && this.files.length > 0) {
                fileNameSpan.textContent = this.files[0].name;
            }
        });
    });
    
    // Manipular formulários
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de salvamento
            const formId = this.getAttribute('id');
            
            // Mostrar feedback de salvamento
            showNotification('Alterações salvas com sucesso!', 'success');
            
            // Fechar modal se estiver em um
            const modal = this.closest('.modal');
            if (modal) {
                setTimeout(() => {
                    closeModal(modal);
                }, 1000);
            }
        });
    });
    
    // Sistema de notificações
    function showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getIconForType(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="close-notification">&times;</button>
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Mostrar com animação
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Configurar botão de fechar
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-fechar após 5 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    function getIconForType(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }
});
