// Application Data
const applicationData = {
  profile: {
    name: "Karunesh Gupta",
    role: "Cybersecurity Enthusiast | B.Tech CSE",
    goal: "Future Hacker & Quantum Security Scientist",
    skills: "Frontend, Python, Cybersecurity Basics",
    links: {
      credly: "https://www.credly.com/users/karunesh-gupta",
      linkedin: "https://www.linkedin.com/in/karunesh-gupta-507b242a9",
      microsoft: "https://learn.microsoft.com/en-us/users/karuneshgupta3838/",
      hackerrank: "https://www.hackerrank.com/profile/karuneshgupta786",
      portfolio: "https://sunilkirana.my.canva.site/karunesh-gupta"
    }
  },
  defenseTools: [
    {
      icon: "🔐",
      name: "Firewall",
      description: "Blocks network intrusions and unauthorized access attempts",
      color: "#00ff99"
    },
    {
      icon: "🛡️",
      name: "Anti-Malware Shield",
      description: "Stops malware injections and malicious software",
      color: "#00ccff"
    },
    {
      icon: "🔑",
      name: "Encryption",
      description: "Secures data transmission and storage",
      color: "#ff0033"
    },
    {
      icon: "👤",
      name: "Identity Guard",
      description: "Prevents phishing attacks and identity theft",
      color: "#00ff99"
    }
  ],
  attackTypes: [
    "Scanning target...",
    "Injecting malware payload...",
    "Attempting SQL Injection...",
    "Phishing attempt in progress...",
    "Brute force attack detected...",
    "DDoS attack incoming..."
  ],
  learningCards: [
    {
      title: "What is SQL Injection?",
      description: "SQL injection is a code injection technique that attackers use to exploit vulnerabilities in web applications by inserting malicious SQL code into input fields."
    },
    {
      title: "How Phishing Works?",
      description: "Phishing is a social engineering attack that tricks users into revealing sensitive information by impersonating trusted entities through fake emails or websites."
    },
    {
      title: "Importance of Firewalls",
      description: "Firewalls act as a barrier between trusted internal networks and untrusted external networks, filtering incoming and outgoing network traffic based on security rules."
    },
    {
      title: "Encryption Explained",
      description: "Encryption converts readable data into coded format using algorithms and keys, ensuring that only authorized parties can access the original information."
    }
  ],
  achievements: [
    {
      name: "Firewall Master",
      description: "Successfully blocked 10 network intrusions",
      icon: "🔥"
    },
    {
      name: "Anti-Malware Hero",
      description: "Prevented 5 malware infections",
      icon: "🦾"
    },
    {
      name: "Encryption Expert",
      description: "Secured all data transmissions",
      icon: "🔒"
    },
    {
      name: "Phishing Defender",
      description: "Identified and blocked phishing attempts",
      icon: "🛡️"
    }
  ]
};

// Global state
const state = {
  currentMode: 'beginner',
  defenseStatus: {
    firewall: false,
    antimalware: false,
    encryption: false,
    identity: false
  },
  achievements: {
    firewallMaster: false,
    antiMalwareHero: false,
    encryptionExpert: false,
    phishingDefender: false
  },
  attackInProgress: false,
  consoleCommands: []
};

// Matrix Rain Effect - Fixed Implementation
class MatrixRain {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.matrixContainer = document.getElementById('matrix-rain');
    
    // Clear container and add canvas
    this.matrixContainer.innerHTML = '';
    this.matrixContainer.appendChild(this.canvas);
    
    this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    
    this.init();
    this.animate();
    
    // Handle resize
    window.addEventListener('resize', () => this.init());
  }
  
  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(1);
    
    // Set canvas style
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
  }
  
  animate() {
    // Create fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 15, 0.04)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set text properties
    this.ctx.fillStyle = '#00ff99';
    this.ctx.font = `${this.fontSize}px 'Share Tech Mono', monospace`;
    
    // Draw characters
    for (let i = 0; i < this.drops.length; i++) {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
      
      // Reset drop when it reaches bottom or randomly
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    
    requestAnimationFrame(() => this.animate());
  }
}

// Typewriter Effect
class Typewriter {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.currentIndex = 0;
  }
  
  type() {
    if (this.currentIndex < this.text.length) {
      this.element.textContent = this.text.substring(0, this.currentIndex + 1);
      this.currentIndex++;
      setTimeout(() => this.type(), this.speed);
    }
  }
  
  start() {
    this.element.textContent = '';
    this.currentIndex = 0;
    this.type();
  }
}

// Terminal Simulator - Fixed Implementation
class Terminal {
  constructor() {
    this.output = document.getElementById('terminal-output');
    this.isRunning = false;
    this.currentLine = 0;
  }
  
  clear() {
    this.output.innerHTML = '<div class="terminal-line"><span class="prompt">root@darkweb:~$</span><span class="cursor">|</span></div>';
    this.currentLine = 0;
  }
  
  addLine(text, delay = 0, className = '') {
    return new Promise(resolve => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        
        if (text.includes('🔍') || text.includes('📡') || text.includes('✅') || text.includes('⚡') || text.includes('🛡️') || text.includes('❌') || text.includes('💀') || text.includes('⚠️') || text.includes('🏁')) {
          line.innerHTML = `<span class="status-text">${text}</span>`;
        } else {
          line.innerHTML = `<span class="text">${text}</span>`;
        }
        
        // Remove cursor from previous lines
        const cursors = this.output.querySelectorAll('.cursor');
        cursors.forEach(cursor => cursor.remove());
        
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
        resolve();
      }, delay);
    });
  }
  
  async typeCommand(command, delay = 1000) {
    return new Promise(async (resolve) => {
      // Remove existing cursor
      const existingCursors = this.output.querySelectorAll('.cursor');
      existingCursors.forEach(cursor => cursor.remove());
      
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = `<span class="prompt">root@darkweb:~$</span> <span class="command"></span><span class="cursor">|</span>`;
      this.output.appendChild(line);
      
      const commandSpan = line.querySelector('.command');
      const cursor = line.querySelector('.cursor');
      
      // Type command character by character
      for (let i = 0; i <= command.length; i++) {
        await new Promise(typeResolve => setTimeout(typeResolve, 50));
        commandSpan.textContent = command.substring(0, i);
      }
      
      // Remove cursor and wait
      cursor.remove();
      this.output.scrollTop = this.output.scrollHeight;
      
      setTimeout(resolve, delay);
    });
  }
  
  async simulateAttack() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.clear();
    
    const commands = [
      "nmap -sS -O target.example.com",
      "sqlmap -u 'http://target.com/login' --dbs", 
      "msfconsole -x 'use exploit/multi/handler'",
      "python phishing_kit.py --target employees@target.com",
      "hydra -l admin -P passwords.txt ssh://target.com"
    ];
    
    const attacks = applicationData.attackTypes;
    
    try {
      // Initialize attack
      await this.typeCommand("./initialize_attack.sh", 800);
      await this.addLine("🔍 Initializing attack sequence...", 500);
      await this.addLine("📡 Establishing secure connection...", 800);
      await this.addLine("✅ Connection established", 600);
      await this.addLine("", 300);
      
      // Execute each attack
      for (let i = 0; i < Math.min(commands.length, attacks.length); i++) {
        await this.typeCommand(commands[i], 600);
        await this.addLine(`⚡ Executing: ${attacks[i]}`, 400);
        
        // Simulate processing with dots
        for (let j = 0; j < 3; j++) {
          await this.addLine(".", 400);
        }
        
        // Check if defenses are active
        const defenseActive = Object.values(state.defenseStatus).some(status => status);
        
        if (defenseActive) {
          await this.addLine("🛡️ BLOCKED BY DEFENSE SYSTEM", 500, 'defense-block');
          await this.addLine("❌ Attack failed", 300, 'attack-failed');
        } else {
          await this.addLine("💀 Vulnerability found!", 500, 'vulnerability-found');
          await this.addLine("⚠️ System compromised", 300, 'system-compromised');
        }
        
        await this.addLine("", 500);
      }
      
      await this.addLine("🏁 Attack sequence completed", 1000);
      
      // Show results
      this.showAttackResults(Object.values(state.defenseStatus).some(status => status));
      
    } catch (error) {
      console.error('Attack simulation error:', error);
      await this.addLine("❌ Error occurred during attack simulation", 500);
    }
    
    this.isRunning = false;
  }
  
  showAttackResults(defended) {
    const resultsContainer = document.getElementById('attack-results');
    resultsContainer.innerHTML = '';
    
    const resultDiv = document.createElement('div');
    resultDiv.className = defended ? 'attack-blocked fade-in' : 'attack-success fade-in';
    
    if (defended) {
      resultDiv.innerHTML = '🛡️ ATTACK BLOCKED! Defense systems operational.';
      this.unlockAchievement('phishingDefender');
    } else {
      resultDiv.innerHTML = '💀 SYSTEM COMPROMISED! Activate defense systems immediately.';
      // Add shake effect to page
      document.body.classList.add('shake');
      setTimeout(() => document.body.classList.remove('shake'), 500);
    }
    
    resultsContainer.appendChild(resultDiv);
  }
  
  unlockAchievement(achievement) {
    const achievementKey = achievement.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
    if (!state.achievements[achievementKey]) {
      state.achievements[achievementKey] = true;
      this.showAchievementNotification(achievement);
      this.updateAchievementsDisplay();
    }
  }
  
  showAchievementNotification(achievement) {
    const achievementData = applicationData.achievements.find(a => 
      a.name.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === achievement.toLowerCase().replace(/\s+/g, '').replace(/-/g, '')
    );
    
    if (achievementData) {
      const notification = document.createElement('div');
      notification.className = 'achievement-notification';
      notification.innerHTML = `
        <div class="achievement-unlock">
          <span class="achievement-icon">${achievementData.icon}</span>
          <div>
            <h4>Achievement Unlocked!</h4>
            <p>${achievementData.name}</p>
          </div>
        </div>
      `;
      
      // Add styles for notification
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--cyber-darker);
        border: 2px solid var(--cyber-green);
        border-radius: 8px;
        padding: 1rem;
        z-index: 3000;
        animation: slideIn 0.5s ease;
        color: var(--cyber-green);
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  }
  
  updateAchievementsDisplay() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    applicationData.achievements.forEach((achievement, index) => {
      const achievementKey = achievement.name.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
      const isUnlocked = state.achievements[achievementKey] || false;
      
      const badge = document.createElement('div');
      badge.className = `achievement-badge ${isUnlocked ? 'unlocked' : ''}`;
      badge.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-desc">${achievement.description}</div>
      `;
      
      grid.appendChild(badge);
    });
  }
}

// Defense System
class DefenseSystem {
  constructor() {
    this.initializeToggles();
  }
  
  initializeToggles() {
    const toggles = document.querySelectorAll('.defense-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const defenseType = e.target.dataset.defense;
        this.toggleDefense(defenseType, e.target.checked);
      });
    });
  }
  
  toggleDefense(type, active) {
    state.defenseStatus[type] = active;
    
    const card = document.querySelector(`[data-defense="${type}"]`);
    const status = document.getElementById(`${type}-status`);
    
    if (active) {
      card.classList.add('active');
      status.textContent = 'ONLINE';
      status.classList.add('online');
      this.showDefenseActivation(type);
      
      // Unlock achievement based on defense type
      if (type === 'firewall') {
        terminal.unlockAchievement('firewallMaster');
      } else if (type === 'antimalware') {
        terminal.unlockAchievement('antiMalwareHero');
      } else if (type === 'encryption') {
        terminal.unlockAchievement('encryptionExpert');
      }
    } else {
      card.classList.remove('active');
      status.textContent = 'OFFLINE';
      status.classList.remove('online');
    }
    
    this.updateMapDefenses();
  }
  
  showDefenseActivation(type) {
    const card = document.querySelector(`[data-defense="${type}"]`);
    
    // Create activation effect
    const effect = document.createElement('div');
    effect.className = 'activation-effect';
    effect.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle, rgba(0,255,153,0.3) 0%, transparent 70%);
      border-radius: 12px;
      animation: activationPulse 1s ease;
      pointer-events: none;
    `;
    
    card.appendChild(effect);
    
    setTimeout(() => {
      effect.remove();
    }, 1000);
  }
  
  updateMapDefenses() {
    const defenseNodes = document.querySelectorAll('.defense-node');
    const activeDefenses = Object.values(state.defenseStatus).filter(status => status).length;
    
    defenseNodes.forEach(node => {
      const shield = node.querySelector('.shield-animation');
      if (activeDefenses > 0) {
        if (!shield) {
          const shieldDiv = document.createElement('div');
          shieldDiv.className = 'shield-animation';
          shieldDiv.style.cssText = `
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            border: 2px solid var(--cyber-green);
            border-radius: 50%;
            animation: shieldPulse 2s infinite;
          `;
          node.appendChild(shieldDiv);
        }
      } else {
        if (shield) {
          shield.remove();
        }
      }
    });
  }
}

// Hacker Console
class HackerConsole {
  constructor() {
    this.modal = document.getElementById('hacker-console');
    this.output = document.getElementById('console-output');
    this.input = document.getElementById('console-input');
    this.isOpen = false;
    
    this.commands = {
      help: 'Available commands: help, clear, status, hack, scan, encrypt, decrypt, exit',
      clear: '',
      status: this.getSystemStatus.bind(this),
      hack: 'Initiating hacking sequence... Access denied. Requires authorization.',
      scan: 'Scanning network... 192.168.1.1 - 192.168.1.255 Range detected.',
      encrypt: 'Encryption module loaded. Ready for secure communications.',
      decrypt: 'Decryption algorithms initialized. Awaiting encrypted input.',
      exit: 'Goodbye, hacker.',
      matrix: this.activateMatrix.bind(this),
      whoami: 'You are: Elite Cyber Security Analyst',
      ls: 'attack_tools.py  defense_systems.sh  encrypted_files.zip  matrix.exe',
      pwd: '/home/hacker/cyber_defense_simulator'
    };
    
    this.initializeEvents();
  }
  
  initializeEvents() {
    document.getElementById('console-btn').addEventListener('click', () => {
      this.open();
    });
    
    document.getElementById('close-console').addEventListener('click', () => {
      this.close();
    });
    
    this.modal.querySelector('.modal-overlay').addEventListener('click', () => {
      this.close();
    });
    
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.executeCommand(this.input.value);
        this.input.value = '';
      }
    });
  }
  
  open() {
    this.modal.classList.remove('hidden');
    this.isOpen = true;
    this.input.focus();
  }
  
  close() {
    this.modal.classList.add('hidden');
    this.isOpen = false;
  }
  
  executeCommand(command) {
    const cmd = command.toLowerCase().trim();
    
    // Add command to output
    this.addLine(`hacker@darkweb:~$ ${command}`);
    
    if (cmd === 'clear') {
      this.output.innerHTML = '';
    } else if (this.commands[cmd]) {
      const response = typeof this.commands[cmd] === 'function' 
        ? this.commands[cmd]() 
        : this.commands[cmd];
      this.addLine(response);
    } else if (cmd === '') {
      // Do nothing for empty command
    } else {
      this.addLine(`Command not found: ${command}. Type 'help' for available commands.`);
    }
  }
  
  addLine(text) {
    const line = document.createElement('div');
    line.className = 'console-line';
    line.textContent = text;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }
  
  getSystemStatus() {
    const activeDefenses = Object.entries(state.defenseStatus)
      .filter(([key, value]) => value)
      .map(([key]) => key.toUpperCase())
      .join(', ');
    
    return `System Status:\nMode: ${state.currentMode.toUpperCase()}\nActive Defenses: ${activeDefenses || 'NONE'}\nThreat Level: ${activeDefenses ? 'LOW' : 'HIGH'}`;
  }
  
  activateMatrix() {
    // Add special matrix effect
    document.body.style.filter = 'hue-rotate(120deg)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 3000);
    
    return 'Matrix mode activated. Reality is now optional.';
  }
}

// Learning System
class LearningSystem {
  constructor() {
    this.modal = document.getElementById('learning-modal');
    this.initializeEvents();
  }
  
  initializeEvents() {
    const learnButtons = document.querySelectorAll('.learn-more-btn');
    learnButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const topic = e.target.dataset.topic;
        this.showLearningModal(topic);
      });
    });
    
    document.getElementById('close-modal').addEventListener('click', () => {
      this.closeModal();
    });
    
    this.modal.querySelector('.modal-overlay').addEventListener('click', () => {
      this.closeModal();
    });
  }
  
  showLearningModal(topic) {
    const topicData = this.getTopicData(topic);
    
    document.getElementById('modal-title').textContent = topicData.title;
    document.getElementById('modal-body').innerHTML = `
      <p>${topicData.description}</p>
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--cyber-green); margin-bottom: 1rem;">Key Points:</h4>
        <ul style="color: var(--cyber-blue); line-height: 2;">
          ${topicData.keyPoints.map(point => `<li>${point}</li>`).join('')}
        </ul>
      </div>
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--cyber-red); margin-bottom: 1rem;">Prevention Tips:</h4>
        <ul style="color: var(--cyber-light); line-height: 2;">
          ${topicData.prevention.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
      </div>
    `;
    
    this.modal.classList.remove('hidden');
  }
  
  closeModal() {
    this.modal.classList.add('hidden');
  }
  
  getTopicData(topic) {
    const topics = {
      'sql-injection': {
        title: 'SQL Injection Attacks',
        description: 'SQL injection is a code injection technique that attackers use to exploit vulnerabilities in web applications by inserting malicious SQL code into input fields.',
        keyPoints: [
          'Targets database-driven web applications',
          'Exploits poor input validation',
          'Can lead to data theft or database manipulation',
          'One of the OWASP Top 10 vulnerabilities'
        ],
        prevention: [
          'Use parameterized queries and prepared statements',
          'Implement input validation and sanitization',
          'Apply principle of least privilege to database accounts',
          'Regular security testing and code reviews'
        ]
      },
      'phishing': {
        title: 'Phishing Attacks',
        description: 'Phishing is a social engineering attack that tricks users into revealing sensitive information by impersonating trusted entities through fake emails or websites.',
        keyPoints: [
          'Uses deceptive communications to steal credentials',
          'Often mimics legitimate organizations',
          'Can be delivered via email, SMS, or fake websites',
          'Success depends on human psychology and urgency'
        ],
        prevention: [
          'Verify sender authenticity before clicking links',
          'Check URLs carefully for suspicious domains',
          'Use multi-factor authentication',
          'Educate users about common phishing tactics'
        ]
      },
      'firewall': {
        title: 'Firewall Protection',
        description: 'Firewalls act as a barrier between trusted internal networks and untrusted external networks, filtering incoming and outgoing network traffic based on security rules.',
        keyPoints: [
          'First line of defense against network attacks',
          'Can be hardware-based or software-based',
          'Uses rules to allow or deny traffic',
          'Monitors and logs network activity'
        ],
        prevention: [
          'Configure firewall rules based on least privilege',
          'Regularly update firewall software',
          'Monitor firewall logs for suspicious activity',
          'Implement both network and host-based firewalls'
        ]
      },
      'encryption': {
        title: 'Data Encryption',
        description: 'Encryption converts readable data into coded format using algorithms and keys, ensuring that only authorized parties can access the original information.',
        keyPoints: [
          'Protects data confidentiality and integrity',
          'Uses mathematical algorithms and keys',
          'Can be applied to data at rest and in transit',
          'Essential for compliance with privacy regulations'
        ],
        prevention: [
          'Use strong encryption algorithms (AES-256)',
          'Implement proper key management practices',
          'Encrypt sensitive data both in transit and at rest',
          'Regular encryption protocols'
        ]
      }
    };
    
    return topics[topic] || {
      title: 'Unknown Topic',
      description: 'Information not available.',
      keyPoints: [],
      prevention: []
    };
  }
}

// Navigation System - Fixed with logo navigation
class Navigation {
  constructor() {
    this.initializeScrolling();
    this.initializeModeToggle();
    this.initializeLogoNavigation();
  }
  
  initializeScrolling() {
    const buttons = document.querySelectorAll('[data-target]');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target.dataset.target || e.target.closest('[data-target]').dataset.target;
        const section = document.getElementById(target);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  
  initializeLogoNavigation() {
    const logo = document.querySelector('.nav-brand');
    if (logo) {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', () => {
        const landingSection = document.getElementById('landing');
        if (landingSection) {
          landingSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
  
  initializeModeToggle() {
    const toggle = document.getElementById('mode-toggle');
    const modeText = document.getElementById('mode-text');
    
    toggle.addEventListener('click', () => {
      state.currentMode = state.currentMode === 'beginner' ? 'advanced' : 'beginner';
      modeText.textContent = state.currentMode.toUpperCase();
      
      // Add visual feedback
      toggle.style.background = state.currentMode === 'advanced' ? 'var(--cyber-red)' : 'transparent';
      
      this.updateModeDisplay();
    });
  }
  
  updateModeDisplay() {
    const body = document.body;
    if (state.currentMode === 'advanced') {
      body.classList.add('advanced-mode');
    } else {
      body.classList.remove('advanced-mode');
    }
  }
}

// Attack Map System
class AttackMap {
  constructor() {
    this.initializeMap();
    this.startAnimations();
  }
  
  initializeMap() {
    const attackNodes = document.querySelectorAll('.attack-node');
    attackNodes.forEach(node => {
      node.addEventListener('click', () => {
        this.showAttackInfo(node.dataset.country);
      });
    });
  }
  
  startAnimations() {
    // Animate attack lines
    setInterval(() => {
      this.animateAttackLines();
    }, 3000);
  }
  
  animateAttackLines() {
    const attackNodes = document.querySelectorAll('.attack-node');
    attackNodes.forEach(node => {
      const line = node.querySelector('.attack-line');
      if (line) {
        // Create animated attack line effect
        line.style.opacity = '1';
        line.style.animation = 'attackLine 2s ease';
        
        setTimeout(() => {
          line.style.opacity = '0.3';
        }, 2000);
      }
    });
  }
  
  showAttackInfo(country) {
    const info = {
      'USA': 'Source: Advanced Persistent Threat Group\nAttack Type: Network Reconnaissance\nThreat Level: Medium',
      'Russia': 'Source: State-sponsored Hackers\nAttack Type: Malware Injection\nThreat Level: High',
      'China': 'Source: Cybercriminal Organization\nAttack Type: Data Exfiltration\nThreat Level: High',
      'India': 'Defense Center: Active\nProtection Level: Maximum\nStatus: All systems operational'
    };
    
    alert(info[country] || 'No information available');
  }
}

// Glitch Effects Manager
class GlitchEffects {
  constructor() {
    this.initializeGlitchEffects();
  }
  
  initializeGlitchEffects() {
    // Add random glitch effects to hero section
    setInterval(() => {
      this.randomGlitch();
    }, 5000);
    
    // Add screen flicker effect
    setInterval(() => {
      this.screenFlicker();
    }, 15000);
  }
  
  randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
    
    if (randomElement) {
      randomElement.style.animation = 'none';
      setTimeout(() => {
        randomElement.style.animation = '';
      }, 100);
    }
  }
  
  screenFlicker() {
    document.body.style.filter = 'brightness(1.2) contrast(1.5)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 200);
  }
}

// Initialize application
let matrixRain, terminal, defenseSystem, hackerConsole, learningSystem, navigation, attackMap, glitchEffects;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize matrix rain background
  matrixRain = new MatrixRain();
  
  // Initialize terminal
  terminal = new Terminal();
  
  // Initialize defense system
  defenseSystem = new DefenseSystem();
  
  // Initialize hacker console
  hackerConsole = new HackerConsole();
  
  // Initialize learning system
  learningSystem = new LearningSystem();
  
  // Initialize navigation
  navigation = new Navigation();
  
  // Initialize attack map
  attackMap = new AttackMap();
  
  // Initialize glitch effects
  glitchEffects = new GlitchEffects();
  
  // Initialize typewriter effect for hero text
  const heroText = document.getElementById('hero-text');
  if (heroText) {
    const typewriter = new Typewriter(
      heroText, 
      'Learn how cyberattacks work and how to defend against them.',
      100
    );
    typewriter.start();
  }
  
  // Initialize attack simulation buttons
  const startAttackBtn = document.getElementById('start-attack');
  const activateDefenseBtn = document.getElementById('activate-defense');
  
  if (startAttackBtn) {
    startAttackBtn.addEventListener('click', () => {
      terminal.simulateAttack();
    });
  }
  
  if (activateDefenseBtn) {
    activateDefenseBtn.addEventListener('click', () => {
      // Activate all defenses
      const toggles = document.querySelectorAll('.defense-toggle');
      toggles.forEach(toggle => {
        if (!toggle.checked) {
          toggle.checked = true;
          toggle.dispatchEvent(new Event('change'));
        }
      });
    });
  }
  
  // Initialize achievements display
  terminal.updateAchievementsDisplay();
  
  // Add CSS animations dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes activationPulse {
      0% { opacity: 0; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.1); }
      100% { opacity: 0; transform: scale(1); }
    }
    
    @keyframes shieldPulse {
      0% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 0.5; }
    }
    
    @keyframes attackLine {
      0% { 
        opacity: 0; 
        transform: scaleX(0); 
      }
      50% { 
        opacity: 1; 
        transform: scaleX(1); 
      }
      100% { 
        opacity: 0.3; 
        transform: scaleX(1); 
      }
    }
    
    .advanced-mode {
      --cyber-green: #ff00ff;
      --cyber-blue: #ffff00;
    }
    
    .advanced-mode .neon-text {
      animation-duration: 1s;
    }
    
    .attack-line {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 2px;
      background: linear-gradient(90deg, var(--cyber-red), transparent);
      transform-origin: left center;
      opacity: 0.3;
      pointer-events: none;
    }
    
    .terminal-line .status-text {
      color: var(--cyber-green);
    }
    
    .terminal-line .defense-block {
      color: var(--cyber-green);
      font-weight: bold;
    }
    
    .terminal-line .attack-failed {
      color: var(--cyber-red);
    }
    
    .terminal-line .vulnerability-found {
      color: var(--cyber-red);
      font-weight: bold;
    }
    
    .terminal-line .system-compromised {
      color: var(--cyber-red);
      animation: blink 1s infinite;
    }
  `;
  document.head.appendChild(style);
  
  console.log('🕶️ Dark Web Attack Simulator initialized');
  console.log('🔍 All systems operational');
  console.log('⚡ Ready for cyber defense training');
});