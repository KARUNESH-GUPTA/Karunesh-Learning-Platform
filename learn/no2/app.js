// CyberMastery Hub - Interactive Cybersecurity Learning Platform

// Application data
const appData = {
  "platform": {
    "name": "CyberMastery Hub",
    "tagline": "From Zero to Cyber Hero - Master All Cybersecurity Domains",
    "mission": "Complete Cybersecurity Learning Ecosystem"
  },
  "domains": [
    {
      "id": "network-security",
      "name": "Network Security",
      "description": "Master network defense, firewalls, IDS/IPS, and wireless security",
      "difficulty": "Beginner to Advanced",
      "duration": "8-12 weeks",
      "courses": 15,
      "labs": 25,
      "icon": "🛡️",
      "color": "#00ffff",
      "progress": 65
    },
    {
      "id": "ethical-hacking",
      "name": "Ethical Hacking & Penetration Testing",
      "description": "Learn reconnaissance, exploitation, and vulnerability assessment",
      "difficulty": "Intermediate to Expert",
      "duration": "12-16 weeks",
      "courses": 20,
      "labs": 40,
      "icon": "🔍",
      "color": "#ff6b6b",
      "progress": 45
    },
    {
      "id": "digital-forensics",
      "name": "Digital Forensics & Incident Response",
      "description": "Investigate cybercrimes and respond to security incidents",
      "difficulty": "Intermediate to Advanced",
      "duration": "10-14 weeks",
      "courses": 12,
      "labs": 20,
      "icon": "🕵️",
      "color": "#4ecdc4",
      "progress": 30
    },
    {
      "id": "soc-analysis",
      "name": "SOC Analysis",
      "description": "Monitor security operations and analyze threats with SIEM tools",
      "difficulty": "Beginner to Advanced",
      "duration": "8-12 weeks",
      "courses": 18,
      "labs": 30,
      "icon": "📊",
      "color": "#45b7d1",
      "progress": 20
    },
    {
      "id": "cloud-security",
      "name": "Cloud Security",
      "description": "Secure AWS, Azure, and GCP environments",
      "difficulty": "Intermediate",
      "duration": "6-10 weeks",
      "courses": 10,
      "labs": 15,
      "icon": "☁️",
      "color": "#96ceb4",
      "progress": 10
    },
    {
      "id": "app-security",
      "name": "Application Security (DevSecOps)",
      "description": "Integrate security into development lifecycle",
      "difficulty": "Intermediate to Advanced",
      "duration": "8-12 weeks",
      "courses": 14,
      "labs": 25,
      "icon": "🔧",
      "color": "#ffeaa7",
      "progress": 15
    }
  ],
  "certifications": [
    {
      "provider": "CompTIA",
      "certs": ["Security+", "PenTest+", "CySA+", "CASP+"],
      "difficulty": "Beginner to Advanced",
      "passRate": "85%"
    },
    {
      "provider": "EC-Council",
      "certs": ["CEH", "ECSA", "CHFI", "ECIH"],
      "difficulty": "Intermediate to Expert",
      "passRate": "90%"
    },
    {
      "provider": "ISC2",
      "certs": ["CISSP", "CCSP", "CISSP-ISSAP"],
      "difficulty": "Advanced to Expert",
      "passRate": "92%"
    },
    {
      "provider": "Offensive Security",
      "certs": ["OSCP", "OSCE", "OSWE", "OSWP"],
      "difficulty": "Advanced to Expert",
      "passRate": "78%"
    },
    {
      "provider": "SANS/GIAC",
      "certs": ["GSEC", "GCIH", "GPEN", "GCFA"],
      "difficulty": "Intermediate to Expert",
      "passRate": "88%"
    },
    {
      "provider": "Cisco",
      "certs": ["CCNA Security", "CCIE Security"],
      "difficulty": "Intermediate to Expert",
      "passRate": "82%"
    }
  ],
  "labs": [
    {
      "category": "penetration-testing",
      "name": "Web Application Testing",
      "description": "Learn to identify and exploit web application vulnerabilities using industry-standard tools",
      "difficulty": "intermediate",
      "duration": "2-3 hours",
      "completions": 1250
    },
    {
      "category": "penetration-testing",
      "name": "Network Penetration",
      "description": "Practice network reconnaissance and exploitation techniques in a controlled environment",
      "difficulty": "advanced",
      "duration": "3-4 hours",
      "completions": 890
    },
    {
      "category": "digital-forensics",
      "name": "Disk Image Analysis",
      "description": "Analyze disk images to recover deleted files and investigate security incidents",
      "difficulty": "beginner",
      "duration": "1-2 hours",
      "completions": 1580
    },
    {
      "category": "digital-forensics",
      "name": "Memory Forensics",
      "description": "Extract artifacts from memory dumps using Volatility framework",
      "difficulty": "intermediate",
      "duration": "2-3 hours",
      "completions": 720
    },
    {
      "category": "network-security",
      "name": "Firewall Configuration",
      "description": "Configure and manage enterprise firewalls for network protection",
      "difficulty": "beginner",
      "duration": "1-2 hours",
      "completions": 1920
    },
    {
      "category": "network-security",
      "name": "IDS/IPS Setup",
      "description": "Deploy and configure intrusion detection and prevention systems",
      "difficulty": "intermediate",
      "duration": "2-3 hours",
      "completions": 1140
    },
    {
      "category": "siem-operations",
      "name": "Splunk Security Monitoring",
      "description": "Create dashboards and alerts using Splunk for security monitoring",
      "difficulty": "intermediate",
      "duration": "2-3 hours",
      "completions": 980
    },
    {
      "category": "siem-operations",
      "name": "Threat Hunting",
      "description": "Proactively hunt for threats using SIEM data and threat intelligence",
      "difficulty": "advanced",
      "duration": "3-4 hours",
      "completions": 640
    }
  ],
  "achievements": [
    {"name": "First Steps", "description": "Complete your first cybersecurity course", "icon": "🎯", "earned": true},
    {"name": "Lab Master", "description": "Complete 10 hands-on labs", "icon": "🧪", "earned": true},
    {"name": "Certified Professional", "description": "Pass your first certification exam", "icon": "🏆", "earned": false},
    {"name": "Community Helper", "description": "Help 5 students in forums", "icon": "🤝", "earned": false},
    {"name": "Threat Hunter", "description": "Complete advanced threat hunting lab", "icon": "🕵️", "earned": false},
    {"name": "Security Expert", "description": "Master all cybersecurity domains", "icon": "🛡️", "earned": false}
  ]
};

// Global variables
let currentTypeIndex = 0;
let currentCharIndex = 0;
let isTyping = true;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenWords = 2000;

const cyberRoles = [
  "Security Analyst",
  "Ethical Hacker", 
  "Forensics Expert",
  "SOC Specialist",
  "Cloud Security Engineer",
  "Penetration Tester"
];

let currentLabFilter = 'all';
let currentDifficultyFilter = 'all';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    createParticleSystem();
    setupTypingAnimation();
    populateDomains();
    populateLabs();
    populateCertifications();
    populateAchievements();
    setupLabFilters();
    setupScrollAnimations();
    setupCounterAnimations();
    setupProgressBars();
    setupInteractiveElements();
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Active section highlighting and navbar scroll effect
    function updateNavigation() {
        let currentSection = '';
        const scrollPos = window.pageYOffset + 100;
        
        // Update active section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
        
        // Navbar scroll effect
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', throttle(updateNavigation, 10));
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Particle System
function createParticleSystem() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        // Random size and opacity
        const size = 2 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.opacity = 0.3 + Math.random() * 0.7;
        
        particlesContainer.appendChild(particle);
    }
}

// Typing Animation
function setupTypingAnimation() {
    const typedTextElement = document.getElementById('typedText');
    
    function typeText() {
        if (isTyping) {
            if (currentCharIndex < cyberRoles[currentTypeIndex].length) {
                typedTextElement.textContent += cyberRoles[currentTypeIndex].charAt(currentCharIndex);
                currentCharIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                setTimeout(() => {
                    isTyping = false;
                    eraseText();
                }, delayBetweenWords);
            }
        }
    }
    
    function eraseText() {
        if (!isTyping) {
            if (currentCharIndex > 0) {
                typedTextElement.textContent = cyberRoles[currentTypeIndex].substring(0, currentCharIndex - 1);
                currentCharIndex--;
                setTimeout(eraseText, erasingSpeed);
            } else {
                currentTypeIndex = (currentTypeIndex + 1) % cyberRoles.length;
                isTyping = true;
                setTimeout(typeText, typingSpeed);
            }
        }
    }
    
    // Start typing animation
    setTimeout(typeText, 1000);
}

// Populate Domains
function populateDomains() {
    const domainsGrid = document.getElementById('domainsGrid');
    
    appData.domains.forEach(domain => {
        const domainCard = document.createElement('div');
        domainCard.className = 'domain-card glass-card';
        domainCard.style.borderTopColor = domain.color;
        
        domainCard.innerHTML = `
            <div class="domain-header">
                <div class="domain-icon" style="color: ${domain.color}">${domain.icon}</div>
                <div class="domain-title">${domain.name}</div>
            </div>
            <div class="domain-description">${domain.description}</div>
            <div class="domain-meta">
                <div class="meta-item">
                    <span class="meta-label">Difficulty:</span>
                    <span class="meta-value">${domain.difficulty}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Duration:</span>
                    <span class="meta-value">${domain.duration}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Courses:</span>
                    <span class="meta-value">${domain.courses}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Labs:</span>
                    <span class="meta-value">${domain.labs}</span>
                </div>
            </div>
            <div class="domain-progress">
                <div class="progress-label">
                    <span>Progress</span>
                    <span>${domain.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" data-progress="${domain.progress}" style="background: linear-gradient(90deg, ${domain.color}, #4ecdc4)"></div>
                </div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="startDomainLearning('${domain.id}')">
                Start Learning
            </button>
        `;
        
        domainsGrid.appendChild(domainCard);
    });
}

// Populate Labs
function populateLabs() {
    const labsGrid = document.getElementById('labsGrid');
    
    function renderLabs() {
        labsGrid.innerHTML = '';
        
        const filteredLabs = appData.labs.filter(lab => {
            const categoryMatch = currentLabFilter === 'all' || lab.category === currentLabFilter;
            const difficultyMatch = currentDifficultyFilter === 'all' || lab.difficulty === currentDifficultyFilter;
            return categoryMatch && difficultyMatch;
        });
        
        filteredLabs.forEach(lab => {
            const labCard = document.createElement('div');
            labCard.className = 'lab-card glass-card';
            
            labCard.innerHTML = `
                <div class="lab-header">
                    <div>
                        <div class="lab-title">${lab.name}</div>
                        <div class="difficulty-badge difficulty-${lab.difficulty}">${lab.difficulty}</div>
                    </div>
                </div>
                <div class="lab-description">${lab.description}</div>
                <div class="lab-stats">
                    <div class="lab-stat">Duration: <strong>${lab.duration}</strong></div>
                    <div class="lab-stat">Completed: <strong>${lab.completions.toLocaleString()}</strong></div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="startLab('${lab.name}')">
                    Start Lab
                </button>
            `;
            
            labsGrid.appendChild(labCard);
        });
    }
    
    renderLabs();
    window.renderLabs = renderLabs; // Make available globally
}

// Lab Filters
function setupLabFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentLabFilter = this.getAttribute('data-category');
            window.renderLabs();
        });
    });
    
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDifficultyFilter = this.getAttribute('data-difficulty');
            window.renderLabs();
        });
    });
}

// Populate Certifications
function populateCertifications() {
    const certificationsGrid = document.getElementById('certificationsGrid');
    
    appData.certifications.forEach(cert => {
        const certCard = document.createElement('div');
        certCard.className = 'cert-card glass-card';
        
        const certItemsHTML = cert.certs.map(certName => 
            `<div class="cert-item">${certName}</div>`
        ).join('');
        
        certCard.innerHTML = `
            <div class="cert-header">
                <div class="cert-provider">${cert.provider}</div>
                <div class="cert-pass-rate">${cert.passRate} Pass Rate</div>
            </div>
            <div class="cert-list">
                ${certItemsHTML}
            </div>
            <div class="cert-difficulty">Difficulty: ${cert.difficulty}</div>
            <button class="btn btn-outline btn-sm" onclick="startCertPrep('${cert.provider}')">
                Start Preparation
            </button>
        `;
        
        certificationsGrid.appendChild(certCard);
    });
}

// Populate Achievements
function populateAchievements() {
    const achievementsGrid = document.getElementById('achievementsGrid');
    
    appData.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = `achievement-card glass-card ${achievement.earned ? 'earned' : ''}`;
        
        achievementCard.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-title">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            ${achievement.earned ? '<div class="achievement-status">✅ Earned</div>' : '<div class="achievement-status">🔒 Locked</div>'}
        `;
        
        achievementsGrid.appendChild(achievementCard);
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Specific animations
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('progress-fill')) {
                    animateProgressBar(entry.target);
                }
                
                if (entry.target.classList.contains('domain-card')) {
                    animateDomainCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(`
        .domain-card, .lab-card, .cert-card, .achievement-card,
        .community-card, .feature-card, .tools-category,
        .stat-item, .progress-fill
    `);
    
    animatedElements.forEach(el => observer.observe(el));
}

// Counter Animations
function setupCounterAnimations() {
    // Will be triggered by intersection observer
}

function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement || numberElement.classList.contains('animated')) return;
    
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        numberElement.textContent = Math.floor(current);
    }, 16);
    
    numberElement.classList.add('animated');
}

// Progress Bar Animations
function setupProgressBars() {
    // Will be triggered by intersection observer
}

function animateProgressBar(element) {
    if (element.classList.contains('animated')) return;
    
    const progress = element.getAttribute('data-progress');
    setTimeout(() => {
        element.style.width = progress + '%';
        element.classList.add('animated');
    }, 300);
}

function animateDomainCard(element) {
    if (element.classList.contains('animated')) return;
    
    const progressFill = element.querySelector('.progress-fill');
    if (progressFill) {
        animateProgressBar(progressFill);
    }
    
    element.classList.add('animated');
}

// Interactive Elements
function setupInteractiveElements() {
    // Magnetic button effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Card tilt effect
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Interactive Functions (called by buttons)
function startDomainLearning(domainId) {
    showNotification(`Starting ${domainId} learning path!`, 'success');
    // Here you would typically navigate to the course content
}

function startLab(labName) {
    showNotification(`Initializing ${labName} lab environment...`, 'info');
    // Here you would typically open the lab interface
}

function startCertPrep(provider) {
    showNotification(`Starting ${provider} certification preparation!`, 'success');
    // Here you would typically navigate to cert prep materials
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const colors = {
        success: '#6bcf7f',
        error: '#ff4757',
        warning: '#ffd93d',
        info: '#00ffff'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: rgba(0, 0, 0, 0.9);
        color: ${colors[type] || colors.info};
        border: 1px solid ${colors[type] || colors.info};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px ${colors[type] || colors.info}40;
        backdrop-filter: blur(20px);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        font-size: 0.9rem;
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: ${colors[type] || colors.info}; 
                           font-size: 1.2rem; cursor: pointer; padding: 0; width: 20px; height: 20px;">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Additional CSS animations via JavaScript
const additionalCSS = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .achievement-status {
        margin-top: 1rem;
        font-size: 0.85rem;
        font-weight: 600;
    }
    
    .achievement-card.earned {
        background: var(--glass-bg-hover);
        border-color: var(--cyber-success);
        box-shadow: 0 0 20px rgba(107, 207, 127, 0.2);
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
    
    // Quick navigation with number keys
    if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const sections = ['home', 'domains', 'labs', 'certifications', 'community', 'resources'];
        const sectionIndex = parseInt(e.key) - 1;
        if (sections[sectionIndex]) {
            scrollToSection(sections[sectionIndex]);
        }
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('🔒 CyberMastery Hub loaded successfully!');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Console easter egg for cyber enthusiasts
console.log(`
🛡️  CYBERMASTERY HUB - SECURITY LEARNING PLATFORM
===================================================
🔍 System Status: SECURE
🎯 Mission: Transform Zero to Cyber Hero  
📊 Active Learners: 12,500+
🏆 Job Placement Rate: 85%
🔐 Security Level: MAXIMUM

⚡ Quick Commands:
   Ctrl + 1-6: Navigate sections
   ESC: Close notifications
   
🚨 Remember: With great power comes great responsibility!
   Use your skills ethically and protect the digital world.

Built with ❤️ for the cybersecurity community
`);

// Export for potential future use
window.cyberApp = {
    scrollToSection,
    showNotification,
    animateCounter,
    animateProgressBar,
    startDomainLearning,
    startLab,
    startCertPrep
};