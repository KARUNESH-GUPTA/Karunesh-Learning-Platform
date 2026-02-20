// Cybersecurity Application JavaScript - Fixed Version
class CyberSecurityApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.initializeApp();
        this.setupEventListeners();
        this.startAnimations();
        this.initializeCounters();
        this.setupSounds();
    }

    // Initialize the application
    initializeApp() {
        // Hide loading screen after 2 seconds
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                }, 500);
            }
        }, 2000);

        // Initialize sections - ensure dashboard is visible
        this.showSection('dashboard');
        
        // Initialize terminal
        this.initializeTerminal();
        
        // Initialize chatbot
        this.chatbotMessages = [
            "Hello! I'm your cybersecurity AI assistant. How can I help you today? 🛡️",
            "I can help you understand threats, explain security concepts, or guide you through the scanner.",
            "Type 'help' for available commands or ask me anything about cybersecurity!"
        ];
        this.currentMessageIndex = 0;
        
        // Show tips section by default since it's not in navigation
        document.getElementById('tips').style.display = 'block';
    }

    // Setup sound effects
    setupSounds() {
        // Create audio context for sound effects
        this.audioContext = null;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    // Play futuristic click sound
    playClickSound() {
        if (!this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (e) {
            // Silently fail if audio doesn't work
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Enable audio context on first user interaction
        document.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        }, { once: true });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.playClickSound();
                
                // Extract section from onclick attribute or href
                const onclick = link.getAttribute('onclick');
                if (onclick) {
                    const match = onclick.match(/showSection\('([^']+)'\)/);
                    if (match) {
                        this.showSection(match[1]);
                    }
                }
            });
        });

        // Action buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playClickSound();
                
                const onclick = btn.getAttribute('onclick');
                if (onclick) {
                    // Handle showSection calls
                    const sectionMatch = onclick.match(/showSection\('([^']+)'\)/);
                    if (sectionMatch) {
                        e.preventDefault();
                        this.showSection(sectionMatch[1]);
                        return;
                    }
                    
                    // Handle startScan calls
                    if (onclick.includes('startScan')) {
                        e.preventDefault();
                        this.startScan();
                        return;
                    }
                }
            });
        });

        // File upload area
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', (e) => {
                e.preventDefault();
                this.playClickSound();
                fileInput.click();
            });

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--cyber-green)';
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = 'var(--cyber-blue)';
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--cyber-blue)';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileUpload(files[0]);
                }
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileUpload(e.target.files[0]);
                }
            });
        }

        // Chat input
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Chatbot toggle
        const chatbotToggle = document.querySelector('.chatbot-toggle');
        if (chatbotToggle) {
            chatbotToggle.addEventListener('click', () => {
                this.toggleChatbot();
            });
        }
    }

    // Show specific section - FIXED VERSION
    showSection(sectionId) {
        console.log(`Switching to section: ${sectionId}`);
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            this.currentSection = sectionId;
        } else {
            console.error(`Section ${sectionId} not found`);
            return;
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Find and activate the correct nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            const onclick = link.getAttribute('onclick');
            if (onclick && onclick.includes(`'${sectionId}'`)) {
                link.classList.add('active');
            }
        });

        // Trigger section-specific animations
        setTimeout(() => {
            this.triggerSectionAnimations(sectionId);
        }, 100);
    }

    // Trigger animations for specific sections
    triggerSectionAnimations(sectionId) {
        switch (sectionId) {
            case 'dashboard':
                this.animateCounters();
                break;
            case 'monitor':
                this.startNetworkAnimation();
                break;
            case 'profile':
                this.startMatrixRain();
                break;
            case 'scan':
                // Initialize scanner if needed
                const scanner = document.getElementById('scanner');
                if (scanner) {
                    scanner.style.display = 'block';
                }
                break;
        }
    }

    // Initialize counters
    initializeCounters() {
        this.counters = {
            totalScans: { element: document.getElementById('total-scans'), target: 1247, current: 0 },
            threatsFound: { element: document.getElementById('threats-found'), target: 23, current: 0 },
            systemsProtected: { element: document.getElementById('systems-protected'), target: 1247, current: 0 },
            activeConnections: { element: document.getElementById('active-connections'), target: 1247, current: 0 },
            attackAttempts: { element: document.getElementById('attack-attempts'), target: 23, current: 0 },
            blockedIps: { element: document.getElementById('blocked-ips'), target: 8, current: 0 }
        };
    }

    // Animate counters
    animateCounters() {
        Object.values(this.counters).forEach(counter => {
            if (counter.element) {
                this.animateCounter(counter);
            }
        });
    }

    // Animate individual counter
    animateCounter(counter) {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = counter.current;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            counter.current = Math.floor(startValue + (counter.target - startValue) * easeOutQuart);
            
            if (counter.element) {
                counter.element.textContent = counter.current.toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Handle file upload
    handleFileUpload(file) {
        const uploadContent = document.querySelector('.upload-content');
        if (uploadContent) {
            uploadContent.innerHTML = `
                <div class="upload-icon">📁</div>
                <p>File selected: ${file.name}</p>
                <p class="upload-hint">Click "Analyze File" to start scanning</p>
                <button class="btn btn-primary" onclick="app.startScan('${file.name}')">
                    <span>Analyze File</span>
                </button>
            `;
        }
    }

    // Start scanning simulation - FIXED VERSION
    startScan(fileName = null) {
        console.log('Starting scan...');
        
        const codeText = document.getElementById('code-textarea')?.value;
        const scanResults = document.getElementById('scan-results');
        const resultsPanel = document.getElementById('results-panel');
        const scanner = document.getElementById('scanner');

        if (!fileName && !codeText && !this.mockScanMode) {
            this.addTerminalLine('ERROR: No file or code provided for scanning');
            // For demo purposes, start a mock scan anyway
            fileName = 'demo_file.exe';
            this.mockScanMode = true;
        }

        // Show scanner animation
        if (scanner) {
            scanner.style.display = 'block';
        }
        if (resultsPanel) {
            resultsPanel.style.display = 'none';
        }

        // Add terminal messages
        this.addTerminalLine(`Starting scan of ${fileName || 'code snippet'}...`);
        this.addTerminalLine('Initializing threat detection engines...');
        this.addTerminalLine('Loading malware signatures database...');
        
        // Simulate scanning process
        setTimeout(() => {
            this.addTerminalLine('Performing deep analysis...');
        }, 1000);

        setTimeout(() => {
            this.addTerminalLine('Checking against known threat patterns...');
        }, 2000);

        setTimeout(() => {
            this.addTerminalLine('Scanning complete. Generating report...');
            this.showScanResults(fileName || 'code_snippet.txt');
        }, 3500);
    }

    // Show scan results
    showScanResults(fileName) {
        const scanner = document.getElementById('scanner');
        const resultsPanel = document.getElementById('results-panel');
        const threatIndicator = document.getElementById('threat-indicator');
        const threatIcon = document.getElementById('threat-icon');
        const threatText = document.getElementById('threat-text');
        const threatProgress = document.getElementById('threat-progress');
        const threatLevel = document.getElementById('threat-level');
        const malwareType = document.getElementById('malware-type');

        // Mock threat data based on filename
        const mockResults = this.generateMockThreatResult(fileName);

        // Hide scanner, show results
        if (scanner) scanner.style.display = 'none';
        if (resultsPanel) resultsPanel.style.display = 'block';

        // Update threat status
        if (threatIcon) threatIcon.textContent = mockResults.detected ? '⚠️' : '✅';
        if (threatText) threatText.textContent = mockResults.detected ? 'THREAT DETECTED' : 'NO THREATS DETECTED';
        
        if (threatIndicator) {
            if (mockResults.detected) {
                threatIndicator.style.background = 'rgba(255, 51, 102, 0.1)';
                threatIndicator.style.borderColor = 'var(--cyber-red)';
                threatIndicator.style.color = 'var(--cyber-red)';
            } else {
                threatIndicator.style.background = 'rgba(0, 255, 153, 0.1)';
                threatIndicator.style.borderColor = 'var(--cyber-green)';
                threatIndicator.style.color = 'var(--cyber-green)';
            }
        }

        // Update threat level
        if (threatLevel) threatLevel.textContent = mockResults.level;
        if (threatProgress) {
            threatProgress.style.width = mockResults.progressWidth;
            
            // Set progress bar color based on threat level
            const progressColors = {
                'Low': 'var(--cyber-green)',
                'Medium': 'var(--cyber-yellow)',
                'High': 'var(--cyber-red)',
                'Critical': 'var(--cyber-red)'
            };
            threatProgress.style.background = progressColors[mockResults.level] || 'var(--cyber-green)';
        }
        
        if (malwareType) malwareType.textContent = mockResults.malwareType;

        // Add final terminal message
        this.addTerminalLine(`SCAN COMPLETE: ${mockResults.detected ? 'THREAT DETECTED' : 'CLEAN'}`);
        if (mockResults.detected) {
            this.addTerminalLine(`Threat Level: ${mockResults.level}`);
            this.addTerminalLine(`Malware Type: ${mockResults.malwareType}`);
            this.addTerminalLine('Recommend immediate quarantine');
        }
    }

    // Generate mock threat result
    generateMockThreatResult(fileName) {
        const threats = [
            { 
                detected: true, 
                level: 'High', 
                progressWidth: '80%', 
                malwareType: 'Trojan.Win32.Generic',
                files: ['suspicious', 'malware', 'virus', 'trojan', 'demo']
            },
            { 
                detected: true, 
                level: 'Critical', 
                progressWidth: '95%', 
                malwareType: 'Ransomware.Crypto.Locky',
                files: ['ransom', 'crypto', 'encrypt']
            },
            { 
                detected: true, 
                level: 'Medium', 
                progressWidth: '60%', 
                malwareType: 'Adware.Generic',
                files: ['adware', 'popup', 'ad']
            },
            { 
                detected: false, 
                level: 'Low', 
                progressWidth: '10%', 
                malwareType: 'None',
                files: ['clean', 'safe', 'document', 'image', 'pdf']
            }
        ];

        // Determine threat based on filename
        const lowerFileName = fileName ? fileName.toLowerCase() : '';
        
        for (const threat of threats) {
            if (threat.files.some(keyword => lowerFileName.includes(keyword))) {
                return threat;
            }
        }

        // Default to clean
        return threats[threats.length - 1];
    }

    // Initialize terminal
    initializeTerminal() {
        this.terminalLines = [];
        this.addTerminalLine('CyberGuard Security System v2.1.0', false);
        this.addTerminalLine('System initialized successfully', false);
        this.addTerminalLine('Waiting for commands...', false);
        this.addTerminalLine('', false);
    }

    // Add line to terminal with typing effect
    addTerminalLine(text, isCommand = false) {
        const terminal = document.getElementById('terminal');
        if (!terminal) return;

        const newLine = document.createElement('div');
        newLine.className = 'terminal-line';
        
        if (isCommand) {
            newLine.innerHTML = `cyberguard@scanner:~$ <span class="typing-text"></span>`;
        } else {
            newLine.innerHTML = `<span class="typing-text"></span>`;
        }
        
        terminal.appendChild(newLine);
        
        // Type out the text
        const typingElement = newLine.querySelector('.typing-text');
        this.typeText(typingElement, text);
        
        // Scroll to bottom
        setTimeout(() => {
            terminal.scrollTop = terminal.scrollHeight;
        }, 50);
    }

    // Type text with animation
    typeText(element, text, speed = 30) {
        let index = 0;
        const typeChar = () => {
            if (index < text.length && element) {
                element.textContent += text[index];
                index++;
                setTimeout(typeChar, speed);
            }
        };
        typeChar();
    }

    // Start network animation
    startNetworkAnimation() {
        // Animate network nodes
        const nodes = document.querySelectorAll('.network-node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = 'pulse 2s ease-in-out infinite';
                node.style.animationDelay = `${index * 0.2}s`;
            }, index * 200);
        });

        // Animate connection lines
        const lines = document.querySelectorAll('.connection-line');
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.strokeDasharray = '5,5';
                line.style.animation = 'dataFlow 3s linear infinite';
                line.style.animationDelay = `${index * 0.1}s`;
            }, 500);
        });

        // Animate attack counter
        this.animateAttackCounter();
    }

    // Animate attack counter with blinking effect
    animateAttackCounter() {
        const counter = document.getElementById('attack-attempts');
        if (!counter) return;

        setInterval(() => {
            if (this.currentSection === 'monitor') {
                const currentValue = parseInt(counter.textContent) || 23;
                const newValue = currentValue + Math.floor(Math.random() * 3);
                counter.textContent = newValue;
                
                // Flash effect
                counter.style.color = 'var(--cyber-red)';
                setTimeout(() => {
                    counter.style.color = 'var(--cyber-red)';
                }, 200);
            }
        }, 5000);
    }

    // Block IP address
    blockIP(button) {
        const ipItem = button.closest('.ip-item');
        const ipAddress = ipItem.querySelector('.ip-address').textContent;
        
        this.playClickSound();
        
        // Visual feedback
        button.textContent = 'Blocked';
        button.disabled = true;
        button.style.background = 'var(--cyber-green)';
        
        // Add terminal message
        this.addTerminalLine(`IP ${ipAddress} has been blocked successfully`);
        
        // Update blocked IPs counter
        const blockedCounter = document.getElementById('blocked-ips');
        if (blockedCounter) {
            const current = parseInt(blockedCounter.textContent) || 0;
            blockedCounter.textContent = current + 1;
        }
        
        // Remove from suspicious list after animation
        setTimeout(() => {
            ipItem.style.opacity = '0';
            ipItem.style.transform = 'translateX(100%)';
            setTimeout(() => ipItem.remove(), 300);
        }, 1000);
    }

    // Expand table row
    expandRow(row) {
        const detailsRow = row.nextElementSibling;
        if (detailsRow && detailsRow.classList.contains('row-details')) {
            const isVisible = detailsRow.style.display !== 'none';
            detailsRow.style.display = isVisible ? 'none' : 'table-row';
            
            if (!isVisible) {
                detailsRow.style.animation = 'fadeIn 0.3s ease';
            }
        }
    }

    // Download report
    downloadReport(reportId) {
        this.playClickSound();
        
        // Mock report data
        const reportData = {
            1: { name: 'suspicious_file_report.pdf', content: 'Trojan Detection Report' },
            2: { name: 'clean_file_report.pdf', content: 'Clean File Report' },
            3: { name: 'ransomware_report.pdf', content: 'Ransomware Detection Report' }
        };
        
        const report = reportData[reportId];
        if (report) {
            // Create mock download
            const blob = new Blob([`Security Report: ${report.content}\nGenerated: ${new Date().toISOString()}`], 
                { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = report.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.addTerminalLine(`Report downloaded: ${report.name}`);
        }
    }

    // Start matrix rain effect
    startMatrixRain() {
        const matrixRain = document.getElementById('matrix-rain');
        if (!matrixRain) return;

        // Clear existing drops
        matrixRain.innerHTML = '';

        // Create matrix drops
        const drops = 15;
        for (let i = 0; i < drops; i++) {
            setTimeout(() => {
                this.createMatrixDrop(matrixRain);
            }, i * 200);
        }

        // Continue creating drops
        const rainInterval = setInterval(() => {
            if (this.currentSection === 'profile') {
                this.createMatrixDrop(matrixRain);
            } else {
                clearInterval(rainInterval);
            }
        }, 1500);
    }

    // Create single matrix drop
    createMatrixDrop(container) {
        const chars = '01ハゼツ田森カキ零';
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.color = 'var(--cyber-green)';
        drop.style.fontFamily = 'var(--font-mono)';
        drop.style.fontSize = Math.random() * 10 + 12 + 'px';
        drop.style.opacity = '0.7';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.top = '-20px';
        drop.style.pointerEvents = 'none';
        drop.textContent = chars[Math.floor(Math.random() * chars.length)];
        
        container.appendChild(drop);
        
        // Animate drop
        let position = -20;
        const speed = 2 + Math.random() * 3;
        
        const animate = () => {
            position += speed;
            drop.style.top = position + 'px';
            
            if (position > container.offsetHeight + 20 || !drop.parentNode) {
                if (drop.parentNode) drop.remove();
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Toggle chatbot
    toggleChatbot() {
        const chatbot = document.getElementById('chatbot');
        if (chatbot) {
            chatbot.classList.toggle('active');
            this.playClickSound();
            
            if (chatbot.classList.contains('active')) {
                // Auto-send welcome message if first time opening
                if (this.currentMessageIndex === 0) {
                    setTimeout(() => {
                        this.addBotMessage(this.chatbotMessages[0]);
                        this.currentMessageIndex++;
                    }, 500);
                }
            }
        }
    }

    // Send chat message
    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput?.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        chatInput.value = '';
        
        // Generate bot response
        setTimeout(() => {
            const response = this.generateBotResponse(message);
            this.addBotMessage(response);
        }, 1000);
    }

    // Add user message to chat
    addUserMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'user-message';
            messageDiv.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Add bot message to chat
    addBotMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'bot-message';
            messageDiv.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Generate bot response
    generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('help')) {
            return "Available commands:\n• 'scan' - Learn about threat scanning\n• 'security' - Get security tips\n• 'threats' - Learn about malware types\n• 'network' - Network monitoring info";
        } else if (message.includes('scan')) {
            return "Our scanner uses advanced heuristic analysis and signature-based detection to identify threats. It can analyze files, code, and network traffic for malicious patterns. 🔍";
        } else if (message.includes('security')) {
            return "Key security practices:\n• Keep software updated\n• Use strong passwords\n• Enable 2FA\n• Regular backups\n• Be cautious with downloads 🛡️";
        } else if (message.includes('threat') || message.includes('malware')) {
            return "Common malware types:\n• Trojans - Disguised malicious software\n• Ransomware - Encrypts files for ransom\n• Worms - Self-replicating network threats\n• Spyware - Steals sensitive information ⚠️";
        } else if (message.includes('network')) {
            return "Network monitoring tracks connections, identifies suspicious IPs, and detects attack patterns. Our system provides real-time visualization of network traffic and threat detection. 🌐";
        } else if (message.includes('hello') || message.includes('hi')) {
            return "Hello! I'm here to help with your cybersecurity questions. What would you like to know? 👋";
        } else {
            return "I understand you're asking about cybersecurity. Try asking about 'scan', 'security', 'threats', or 'network' for specific information. Type 'help' for commands. 🤖";
        }
    }

    // Start background animations
    startAnimations() {
        // Animate background elements
        this.animateBackgroundElements();
        
        // Update attack counter periodically
        setInterval(() => {
            const attackCounter = document.getElementById('attack-attempts');
            if (attackCounter && this.currentSection === 'monitor') {
                const current = parseInt(attackCounter.textContent) || 23;
                attackCounter.textContent = current + Math.floor(Math.random() * 2);
            }
        }, 8000);
    }

    // Animate background elements
    animateBackgroundElements() {
        // Add floating particles effect
        this.createFloatingParticles();
    }

    // Create floating particles
    createFloatingParticles() {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 100);
        }
        
        // Continue creating particles
        setInterval(() => {
            this.createParticle();
        }, 3000);
    }

    // Create single particle
    createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = `var(--cyber-${['green', 'blue', 'purple'][Math.floor(Math.random() * 3)]})`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        particle.style.opacity = '0.3';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '100vh';
        
        document.body.appendChild(particle);
        
        // Animate particle
        let position = window.innerHeight;
        const speed = 0.5 + Math.random() * 1;
        
        const animate = () => {
            position -= speed;
            particle.style.top = position + 'px';
            
            if (position < -10) {
                if (particle.parentNode) {
                    particle.remove();
                }
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Global functions for HTML onclick events
function showSection(sectionId) {
    if (window.app) {
        window.app.showSection(sectionId);
    }
}

function startScan(fileName = null) {
    if (window.app) {
        window.app.startScan(fileName);
    }
}

function blockIP(button) {
    if (window.app) {
        window.app.blockIP(button);
    }
}

function expandRow(row) {
    if (window.app) {
        window.app.expandRow(row);
    }
}

function downloadReport(reportId) {
    if (window.app) {
        window.app.downloadReport(reportId);
    }
}

function toggleChatbot() {
    if (window.app) {
        window.app.toggleChatbot();
    }
}

function sendMessage() {
    if (window.app) {
        window.app.sendMessage();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.app = new CyberSecurityApp();
    
    // Debug: Log available sections
    const sections = document.querySelectorAll('.section');
    console.log('Available sections:', Array.from(sections).map(s => s.id));
});

// Add fade-in animation for elements
const addFadeInAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        .typing-text {
            border-right: 1px solid var(--cyber-green);
            animation: blink 1s infinite;
        }
    `;
    document.head.appendChild(style);
};

// Call animation setup
addFadeInAnimation();