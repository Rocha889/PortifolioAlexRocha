// Funcionalidades do site público
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a, .footer-links a');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const tabs = document.querySelectorAll('.tab');
    const contactForm = document.getElementById('contactForm');
    const header = document.querySelector('.site-header');
    
    // Menu móvel
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Navegação suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verificar se o link é interno
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Fechar menu móvel se estiver aberto
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                    }
                    
                    // Rolar até a seção
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Filtros de portfólio
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Atualizar botão ativo
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtrar itens
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Tabs
    if (tabs.length > 0) {
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
    }
    
    // Formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                // Mostrar mensagem de sucesso
                this.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Mensagem Enviada!</h3>
                        <p>Obrigado pelo contato! Retornarei em breve.</p>
                    </div>
                `;
            }, 1500);
        });
    }
    
    // Header com scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Navegação ativa baseada na seção visível
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.main-nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavigation);
    updateActiveNavigation();
});
