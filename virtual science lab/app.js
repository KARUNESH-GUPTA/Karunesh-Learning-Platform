// Virtual Science Lab - Interactive Learning Platform
class VirtualScienceLab {
    constructor() {
        this.currentSection = 'dashboard';
        this.currentUser = {
            id: 1,
            name: "Alex Student",
            class: "Class 8",
            age: 14,
            points: 1250,
            level: 3,
            avatar: "👨‍🎓",
            experiments_completed: 15,
            badges: ["First Experiment", "Chemistry Beginner", "Perfect Score"]
        };
        
        this.chemicalMixture = [];
        this.currentReaction = null;
        this.pendulumAnimation = null;
        this.currentPhysicsMode = 'circuit';
        this.currentBiologyMode = 'body';
        
        this.data = {
            users: [
                {
                    id: 1,
                    name: "Alex Student",
                    class: "Class 8",
                    age: 14,
                    points: 1250,
                    level: 3,
                    avatar: "student1",
                    experiments_completed: 15,
                    badges: ["First Experiment", "Chemistry Beginner", "Perfect Score"]
                },
                {
                    id: 2,
                    name: "Sarah Khan",
                    class: "Class 10",
                    age: 16,
                    points: 2100,
                    level: 5,
                    avatar: "student2",
                    experiments_completed: 28,
                    badges: ["Lab Expert", "Physics Master", "Biology Explorer", "Top Performer"]
                }
            ],
            chemistry_experiments: [
                {
                    id: 1,
                    name: "Acid-Base Reaction",
                    description: "Mix vinegar and baking soda to observe fizzing reaction",
                    chemicals: ["vinegar", "baking_soda"],
                    expected_result: "fizzing",
                    points: 50,
                    safety_level: "safe"
                },
                {
                    id: 2,
                    name: "Color Change Reaction",
                    description: "Mix copper sulfate with sodium hydroxide",
                    chemicals: ["copper_sulfate", "sodium_hydroxide"],
                    expected_result: "blue_precipitate",
                    points: 75,
                    safety_level: "moderate"
                }
            ],
            physics_experiments: [
                {
                    id: 1,
                    name: "Simple Circuit",
                    description: "Build a basic circuit with battery, resistor, and LED",
                    components: ["battery", "resistor", "led", "wire"],
                    points: 60,
                    difficulty: "beginner"
                },
                {
                    id: 2,
                    name: "Pendulum Motion",
                    description: "Study pendulum motion with different lengths and masses",
                    variables: ["length", "mass", "angle"],
                    points: 80,
                    difficulty: "intermediate"
                }
            ],
            biology_content: [
                {
                    organ: "heart",
                    function: "Pumps blood throughout the body",
                    facts: ["The heart beats about 100,000 times per day", "It has four chambers"],
                    diseases: ["Heart attack", "Arrhythmia"],
                    points: 40
                },
                {
                    organ: "lungs",
                    function: "Exchange oxygen and carbon dioxide",
                    facts: ["You have two lungs", "They contain millions of tiny air sacs called alveoli"],
                    diseases: ["Asthma", "Pneumonia"],
                    points: 40
                },
                {
                    organ: "brain",
                    function: "Controls all body functions and thoughts",
                    facts: ["The brain uses 20% of your body's energy", "It contains billions of neurons"],
                    diseases: ["Stroke", "Alzheimer's"],
                    points: 50
                }
            ],
            achievements: [
                {
                    name: "First Experiment",
                    description: "Complete your first lab experiment",
                    icon: "🧪",
                    points_required: 0
                },
                {
                    name: "Chemistry Beginner",
                    description: "Complete 5 chemistry experiments",
                    icon: "⚗️",
                    points_required: 250
                },
                {
                    name: "Physics Master",
                    description: "Complete 10 physics experiments",
                    icon: "⚡",
                    points_required: 600
                },
                {
                    name: "Biology Explorer",
                    description: "Explore all major organ systems",
                    icon: "🧬",
                    points_required: 400
                },
                {
                    name: "Lab Expert",
                    description: "Reach Level 5",
                    icon: "🏆",
                    points_required: 2000
                }
            ],
            daily_challenges: [
                {
                    date: "2025-10-02",
                    title: "Mix It Up!",
                    description: "Complete 2 chemistry experiments today",
                    reward: 100,
                    completed: false
                }
            ],
            leaderboard: [
                {"rank": 1, "name": "Sarah Khan", "points": 2100, "level": 5},
                {"rank": 2, "name": "Mike Chen", "points": 1850, "level": 4},
                {"rank": 3, "name": "Emma Wilson", "points": 1650, "level": 4},
                {"rank": 4, "name": "Alex Student", "points": 1250, "level": 3},
                {"rank": 5, "name": "David Brown", "points": 980, "level": 2}
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateUserDisplay();
        this.renderDashboard();
        this.renderChemistryLab();
        this.renderPhysicsLab();
        this.renderBiologyLab();
        this.renderProfile();
        this.renderLeaderboard();
        this.setupDragAndDrop();
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.navigateToSection(section);
            });
        });
        
        // Lab cards navigation
        document.querySelectorAll('.lab-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const lab = e.currentTarget.dataset.lab;
                this.navigateToSection(lab);
            });
        });
        
        // Physics mode switching
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.closest('#physics')) {
                    this.switchPhysicsMode(e.target.dataset.mode);
                } else if (e.target.closest('#biology')) {
                    this.switchBiologyMode(e.target.dataset.mode);
                }
            });
        });
        
        // Chemistry lab controls
        document.getElementById('mix-chemicals')?.addEventListener('click', () => this.mixChemicals());
        document.getElementById('clear-beaker')?.addEventListener('click', () => this.clearBeaker());
        document.getElementById('reset-chemistry')?.addEventListener('click', () => this.resetChemistryLab());
        
        // Physics controls
        document.getElementById('start-pendulum')?.addEventListener('click', () => this.startPendulum());
        document.getElementById('stop-pendulum')?.addEventListener('click', () => this.stopPendulum());
        
        // Pendulum controls
        ['pendulum-length', 'pendulum-mass', 'pendulum-angle'].forEach(id => {
            const control = document.getElementById(id);
            if (control) {
                control.addEventListener('input', (e) => this.updatePendulumSettings(e.target));
            }
        });
        
        // Biology organ clicks
        document.querySelectorAll('.organ').forEach(organ => {
            organ.addEventListener('click', (e) => {
                this.showOrganInfo(e.target.dataset.organ);
            });
        });
        
        // Microscope samples
        document.querySelectorAll('.sample-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showMicroscopeSample(e.target.dataset.sample);
            });
        });
        
        // Modal controls
        document.getElementById('close-achievement')?.addEventListener('click', () => {
            this.hideModal('achievement-modal');
        });
        
        document.getElementById('close-organ-modal')?.addEventListener('click', () => {
            this.hideModal('organ-modal');
        });
        
        // Theme selector
        document.getElementById('theme-selector')?.addEventListener('change', (e) => {
            this.setTheme(e.target.value);
        });
        
        // Daily challenge
        document.getElementById('start-challenge')?.addEventListener('click', () => {
            this.startDailyChallenge();
        });
        
        // Leaderboard filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterLeaderboard(e.target.dataset.period);
            });
        });
    }
    
    navigateToSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
        }
        
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
    
    updateUserDisplay() {
        document.getElementById('user-points').textContent = `${this.currentUser.points} pts`;
        document.getElementById('user-level').textContent = `Level ${this.currentUser.level}`;
        document.getElementById('user-name').textContent = this.currentUser.name;
        
        // Update profile
        document.getElementById('profile-name').textContent = this.currentUser.name;
        document.getElementById('profile-class').textContent = `${this.currentUser.class} • Age ${this.currentUser.age}`;
        document.getElementById('profile-points').textContent = this.currentUser.points;
        document.getElementById('profile-level').textContent = this.currentUser.level;
        document.getElementById('profile-experiments').textContent = this.currentUser.experiments_completed;
        document.getElementById('user-avatar').textContent = this.currentUser.avatar;
    }
    
    renderDashboard() {
        this.renderProgressChart();
        this.renderRecentAchievements();
        this.renderDailyChallenge();
    }
    
    renderProgressChart() {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Chemistry', 'Physics', 'Biology'],
                datasets: [{
                    data: [5, 4, 6],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    title: {
                        display: true,
                        text: 'Experiments Completed by Lab'
                    }
                }
            }
        });
    }
    
    renderRecentAchievements() {
        const container = document.getElementById('recent-badges');
        if (!container) return;
        
        container.innerHTML = this.currentUser.badges.map(badge => {
            const achievement = this.data.achievements.find(a => a.name === badge);
            return `
                <div class="achievement-badge">
                    <span class="achievement-icon">${achievement?.icon || '🏆'}</span>
                    <span>${badge}</span>
                </div>
            `;
        }).join('');
    }
    
    renderDailyChallenge() {
        const challenge = this.data.daily_challenges[0];
        document.getElementById('challenge-title').textContent = challenge.title;
        document.getElementById('challenge-description').textContent = challenge.description;
        document.getElementById('challenge-points').textContent = challenge.reward;
    }
    
    renderChemistryLab() {
        const container = document.getElementById('chemistry-experiments');
        if (!container) return;
        
        container.innerHTML = this.data.chemistry_experiments.map(exp => `
            <div class="experiment-card" onclick="app.loadExperiment(${exp.id})">
                <h4>${exp.name}</h4>
                <p>${exp.description}</p>
                <div class="experiment-points">${exp.points} points</div>
            </div>
        `).join('');
    }
    
    renderPhysicsLab() {
        this.updatePendulumDisplay();
        this.updateCircuitReadings();
    }
    
    renderBiologyLab() {
        // Biology lab is rendered via HTML, interactive functionality handled by event listeners
    }
    
    renderProfile() {
        this.renderUserBadges();
        this.renderActivityTimeline();
    }
    
    renderUserBadges() {
        const container = document.getElementById('user-badges');
        if (!container) return;
        
        container.innerHTML = this.currentUser.badges.map(badgeName => {
            const achievement = this.data.achievements.find(a => a.name === badgeName);
            return `
                <div class="badge-card">
                    <div class="badge-icon">${achievement?.icon || '🏆'}</div>
                    <div class="badge-name">${badgeName}</div>
                    <div class="badge-description">${achievement?.description || ''}</div>
                </div>
            `;
        }).join('');
    }
    
    renderActivityTimeline() {
        const container = document.getElementById('activity-timeline');
        if (!container) return;
        
        const activities = [
            { icon: '🧪', title: 'Completed Acid-Base Reaction', date: 'Oct 1, 2025' },
            { icon: '⚡', title: 'Built Simple Circuit', date: 'Sep 30, 2025' },
            { icon: '🧬', title: 'Explored Heart Functions', date: 'Sep 29, 2025' },
            { icon: '🏆', title: 'Earned Chemistry Beginner Badge', date: 'Sep 28, 2025' }
        ];
        
        container.innerHTML = activities.map(activity => `
            <div class="timeline-item">
                <div class="timeline-icon">${activity.icon}</div>
                <div class="timeline-content">
                    <div class="timeline-title">${activity.title}</div>
                    <div class="timeline-date">${activity.date}</div>
                </div>
            </div>
        `).join('');
    }
    
    renderLeaderboard() {
        const container = document.getElementById('leaderboard-list');
        if (!container) return;
        
        container.innerHTML = this.data.leaderboard.map(entry => {
            const isCurrentUser = entry.name === this.currentUser.name;
            const rankClass = entry.rank === 1 ? 'first' : entry.rank === 2 ? 'second' : entry.rank === 3 ? 'third' : '';
            
            return `
                <div class="leaderboard-row ${isCurrentUser ? 'current-user' : ''}">
                    <div class="rank ${rankClass}">#${entry.rank}</div>
                    <div class="name">${entry.name}</div>
                    <div class="points">${entry.points} pts</div>
                    <div class="level">Lvl ${entry.level}</div>
                </div>
            `;
        }).join('');
    }
    
    setupDragAndDrop() {
        // Chemistry drag and drop
        document.querySelectorAll('.chemical-bottle').forEach(bottle => {
            bottle.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.chemical);
                e.target.classList.add('dragging');
            });
            
            bottle.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });
        
        // Physics components drag and drop
        document.querySelectorAll('.component').forEach(component => {
            component.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.component);
                e.target.classList.add('dragging');
            });
            
            component.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });
        
        // Drop zones
        const beaker = document.getElementById('main-beaker');
        const circuitBoard = document.getElementById('circuit-workspace');
        
        [beaker, circuitBoard].forEach(dropZone => {
            if (!dropZone) return;
            
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });
            
            dropZone.addEventListener('dragleave', (e) => {
                if (!dropZone.contains(e.relatedTarget)) {
                    dropZone.classList.remove('drag-over');
                }
            });
            
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                
                const data = e.dataTransfer.getData('text/plain');
                
                if (dropZone.id === 'main-beaker') {
                    this.addChemicalToBeaker(data);
                } else if (dropZone.id === 'circuit-workspace') {
                    this.addComponentToCircuit(data, e.offsetX, e.offsetY);
                }
            });
        });
    }
    
    addChemicalToBeaker(chemical) {
        if (!this.chemicalMixture.includes(chemical)) {
            this.chemicalMixture.push(chemical);
            this.updateBeakerDisplay();
            this.checkSafety();
        }
    }
    
    updateBeakerDisplay() {
        const beakerContent = document.getElementById('beaker-content');
        if (!beakerContent) return;
        
        const height = Math.min(this.chemicalMixture.length * 30, 120);
        const colors = {
            vinegar: '#ffeb3b',
            baking_soda: '#ffffff',
            copper_sulfate: '#2196f3',
            sodium_hydroxide: '#f5f5f5'
        };
        
        const mixedColor = this.chemicalMixture.length > 0 ? colors[this.chemicalMixture[0]] : 'transparent';
        
        beakerContent.style.height = height + 'px';
        beakerContent.style.backgroundColor = mixedColor;
    }
    
    checkSafety() {
        const safetyStatus = document.getElementById('safety-status');
        const dangerousCombinations = [
            ['copper_sulfate', 'sodium_hydroxide']
        ];
        
        const isDangerous = dangerousCombinations.some(combination => 
            combination.every(chemical => this.chemicalMixture.includes(chemical))
        );
        
        if (isDangerous) {
            safetyStatus.classList.remove('safe');
            safetyStatus.classList.add('danger');
            safetyStatus.parentElement.querySelector('span').textContent = 'Lab Status: Caution';
        } else {
            safetyStatus.classList.remove('danger');
            safetyStatus.classList.add('safe');
            safetyStatus.parentElement.querySelector('span').textContent = 'Lab Status: Safe';
        }
    }
    
    mixChemicals() {
        if (this.chemicalMixture.length < 2) {
            alert('Add at least 2 chemicals to mix!');
            return;
        }
        
        const reaction = this.findReaction(this.chemicalMixture);
        if (reaction) {
            this.performReaction(reaction);
            this.awardPoints(reaction.points);
            this.checkAchievements();
        } else {
            this.showGenericReaction();
        }
    }
    
    findReaction(chemicals) {
        return this.data.chemistry_experiments.find(exp => 
            exp.chemicals.every(chemical => chemicals.includes(chemical))
        );
    }
    
    performReaction(reaction) {
        const effectsContainer = document.getElementById('reaction-effects');
        
        if (reaction.expected_result === 'fizzing') {
            effectsContainer.innerHTML = '<div class="fizz-effect">💨💨💨</div>';
            setTimeout(() => {
                effectsContainer.innerHTML = '';
            }, 2000);
        } else if (reaction.expected_result === 'blue_precipitate') {
            const beakerContent = document.getElementById('beaker-content');
            beakerContent.style.backgroundColor = '#1976d2';
            effectsContainer.innerHTML = '<div class="fizz-effect">⚡⚡⚡</div>';
            setTimeout(() => {
                effectsContainer.innerHTML = '';
            }, 2000);
        }
        
        this.showNotification(`Reaction complete! +${reaction.points} points`);
    }
    
    showGenericReaction() {
        const effectsContainer = document.getElementById('reaction-effects');
        effectsContainer.innerHTML = '<div class="fizz-effect">✨✨✨</div>';
        setTimeout(() => {
            effectsContainer.innerHTML = '';
        }, 2000);
        
        this.showNotification('Interesting reaction! +10 points');
        this.awardPoints(10);
    }
    
    clearBeaker() {
        this.chemicalMixture = [];
        const beakerContent = document.getElementById('beaker-content');
        const effectsContainer = document.getElementById('reaction-effects');
        
        beakerContent.style.height = '0';
        beakerContent.style.backgroundColor = 'transparent';
        effectsContainer.innerHTML = '';
        
        this.checkSafety();
    }
    
    resetChemistryLab() {
        this.clearBeaker();
        this.showNotification('Chemistry lab reset');
    }
    
    switchPhysicsMode(mode) {
        document.querySelectorAll('.physics-mode').forEach(m => m.classList.remove('active'));
        document.getElementById(`${mode}-mode`).classList.add('active');
        
        document.querySelectorAll('#physics .mode-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`#physics [data-mode="${mode}"]`).classList.add('active');
        
        this.currentPhysicsMode = mode;
    }
    
    startPendulum() {
        const length = parseFloat(document.getElementById('pendulum-length').value);
        const mass = parseFloat(document.getElementById('pendulum-mass').value);
        const angle = parseFloat(document.getElementById('pendulum-angle').value);
        
        // Calculate period using T = 2π√(L/g)
        const period = 2 * Math.PI * Math.sqrt(length / 9.81);
        const frequency = 1 / period;
        
        document.getElementById('pendulum-period').textContent = period.toFixed(2) + 's';
        document.getElementById('pendulum-frequency').textContent = frequency.toFixed(2) + 'Hz';
        
        this.animatePendulum(angle, period);
    }
    
    animatePendulum(maxAngle, period) {
        const pendulumString = document.getElementById('pendulum-string');
        const pendulumBob = document.getElementById('pendulum-bob');
        const length = parseFloat(document.getElementById('pendulum-length').value);
        
        // Set string length
        const stringLength = length * 100; // Convert to pixels
        pendulumString.style.height = stringLength + 'px';
        pendulumBob.style.top = (20 + stringLength) + 'px';
        
        let startTime = null;
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000; // Convert to seconds
            
            const currentAngle = maxAngle * Math.cos(2 * Math.PI * elapsed / period);
            
            pendulumString.style.transform = `rotate(${currentAngle}deg)`;
            pendulumBob.style.transform = `translateX(-50%) rotate(${-currentAngle}deg)`;
            
            if (this.pendulumAnimation) {
                this.pendulumAnimation = requestAnimationFrame(animate);
            }
        };
        
        this.pendulumAnimation = requestAnimationFrame(animate);
    }
    
    stopPendulum() {
        if (this.pendulumAnimation) {
            cancelAnimationFrame(this.pendulumAnimation);
            this.pendulumAnimation = null;
        }
        
        const pendulumString = document.getElementById('pendulum-string');
        const pendulumBob = document.getElementById('pendulum-bob');
        
        pendulumString.style.transform = 'rotate(0deg)';
        pendulumBob.style.transform = 'translateX(-50%) rotate(0deg)';
    }
    
    updatePendulumSettings(control) {
        const id = control.id;
        const value = control.value;
        
        if (id === 'pendulum-length') {
            document.getElementById('length-value').textContent = value + 'm';
        } else if (id === 'pendulum-mass') {
            document.getElementById('mass-value').textContent = value + 'kg';
        } else if (id === 'pendulum-angle') {
            document.getElementById('angle-value').textContent = value + '°';
        }
        
        this.updatePendulumDisplay();
    }
    
    updatePendulumDisplay() {
        // Visual update of pendulum based on current settings
        const length = document.getElementById('pendulum-length')?.value || 1;
        const stringLength = length * 100;
        
        const pendulumString = document.getElementById('pendulum-string');
        const pendulumBob = document.getElementById('pendulum-bob');
        
        if (pendulumString && pendulumBob) {
            pendulumString.style.height = stringLength + 'px';
            pendulumBob.style.top = (20 + stringLength) + 'px';
        }
    }
    
    addComponentToCircuit(component, x, y) {
        // Simulate adding component to circuit board
        this.updateCircuitReadings();
        this.showNotification(`${component} added to circuit`);
    }
    
    updateCircuitReadings() {
        // Simulate circuit calculations
        const voltage = (Math.random() * 9 + 1).toFixed(1);
        const current = (Math.random() * 0.5 + 0.1).toFixed(2);
        
        document.getElementById('voltage-reading').textContent = voltage + 'V';
        document.getElementById('current-reading').textContent = current + 'A';
    }
    
    switchBiologyMode(mode) {
        document.querySelectorAll('.biology-mode').forEach(m => m.classList.remove('active'));
        document.getElementById(`${mode}-mode`).classList.add('active');
        
        document.querySelectorAll('#biology .mode-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`#biology [data-mode="${mode}"]`).classList.add('active');
        
        this.currentBiologyMode = mode;
    }
    
    showOrganInfo(organName) {
        const organData = this.data.biology_content.find(organ => organ.organ === organName);
        if (!organData) return;
        
        const modal = document.getElementById('organ-modal');
        const detail = document.getElementById('organ-detail');
        
        detail.innerHTML = `
            <h3>${organName.charAt(0).toUpperCase() + organName.slice(1)}</h3>
            <p><strong>Function:</strong> ${organData.function}</p>
            
            <div class="organ-facts">
                <h4>Interesting Facts</h4>
                <ul>
                    ${organData.facts.map(fact => `<li>${fact}</li>`).join('')}
                </ul>
            </div>
            
            <div class="organ-diseases">
                <h4>Common Conditions</h4>
                <ul>
                    ${organData.diseases.map(disease => `<li>${disease}</li>`).join('')}
                </ul>
            </div>
            
            <div class="organ-points">
                <strong>Learning Points: +${organData.points}</strong>
            </div>
        `;
        
        this.showModal('organ-modal');
        this.awardPoints(organData.points);
    }
    
    showMicroscopeSample(sample) {
        const sampleView = document.getElementById('sample-view');
        
        document.querySelectorAll('.sample-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-sample="${sample}"]`).classList.add('active');
        
        const sampleData = {
            'plant-cell': 'Viewing plant cell: Cell wall, chloroplasts, and nucleus visible 🌱',
            'animal-cell': 'Viewing animal cell: Nucleus, mitochondria, and cell membrane visible 🐾',
            'bacteria': 'Viewing bacteria: Single-celled organisms with no nucleus 🦠'
        };
        
        sampleView.innerHTML = `
            <div class="sample-display">
                <h4>${sample.replace('-', ' ').toUpperCase()}</h4>
                <p>${sampleData[sample]}</p>
                <div class="microscope-image">🔬</div>
            </div>
        `;
        
        this.awardPoints(20);
        this.showNotification('Sample examined! +20 points');
    }
    
    loadExperiment(experimentId) {
        const experiment = this.data.chemistry_experiments.find(exp => exp.id === experimentId);
        if (!experiment) return;
        
        this.clearBeaker();
        experiment.chemicals.forEach(chemical => {
            this.addChemicalToBeaker(chemical);
        });
        
        this.showNotification(`Loaded experiment: ${experiment.name}`);
    }
    
    startDailyChallenge() {
        this.showNotification('Daily challenge started! Complete 2 chemistry experiments.');
        this.navigateToSection('chemistry');
    }
    
    filterLeaderboard(period) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-period="${period}"]`).classList.add('active');
        
        // In a real app, this would filter the data
        this.showNotification(`Showing ${period} leaderboard`);
    }
    
    awardPoints(points) {
        this.currentUser.points += points;
        const newLevel = Math.floor(this.currentUser.points / 500) + 1;
        
        if (newLevel > this.currentUser.level) {
            this.currentUser.level = newLevel;
            this.showAchievement({
                name: `Level ${newLevel} Reached!`,
                description: `You've reached level ${newLevel}`,
                icon: '🎉'
            });
        }
        
        this.updateUserDisplay();
    }
    
    checkAchievements() {
        // Check for new achievements based on current progress
        this.data.achievements.forEach(achievement => {
            if (this.currentUser.points >= achievement.points_required && 
                !this.currentUser.badges.includes(achievement.name)) {
                this.currentUser.badges.push(achievement.name);
                this.showAchievement(achievement);
            }
        });
    }
    
    showAchievement(achievement) {
        const modal = document.getElementById('achievement-modal');
        document.getElementById('modal-achievement-icon').textContent = achievement.icon;
        document.getElementById('modal-achievement-name').textContent = achievement.name;
        document.getElementById('modal-achievement-description').textContent = achievement.description;
        
        this.showModal('achievement-modal');
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('hidden');
    }
    
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('hidden');
    }
    
    setTheme(theme) {
        if (theme === 'auto') {
            document.documentElement.removeAttribute('data-color-scheme');
        } else {
            document.documentElement.setAttribute('data-color-scheme', theme);
        }
    }
    
    showNotification(message) {
        // Create and show a notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: var(--color-primary);
            color: var(--color-btn-primary-text);
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new VirtualScienceLab();
});