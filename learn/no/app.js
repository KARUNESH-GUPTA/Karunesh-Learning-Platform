class VirtualLabApp {
    constructor() {
        this.currentView = 'dashboard';
        this.currentSubject = null;
        this.currentExperiment = null;
        this.userProgress = {};
        this.searchTimeout = null;
        
        // Application data
        this.data = {
            subjects: [
                {
                    id: "physics",
                    name: "Physics",
                    description: "Explore the fundamental laws governing matter, energy, and motion",
                    color: "#00ffff",
                    icon: "⚛️",
                    experiments: [
                        {
                            id: "newtons-cannon",
                            name: "Newton's Cannon",
                            description: "Simulate projectile motion and orbital mechanics",
                            difficulty: "Intermediate",
                            duration: "30 min",
                            topics: ["projectile motion", "gravity", "orbits"]
                        },
                        {
                            id: "pendulum-motion",
                            name: "Pendulum Motion",
                            description: "Study simple harmonic motion and chaotic dynamics",
                            difficulty: "Beginner",
                            duration: "25 min",
                            topics: ["oscillations", "period", "amplitude"]
                        },
                        {
                            id: "wave-interference",
                            name: "Wave Interference",
                            description: "Visualize constructive and destructive wave patterns",
                            difficulty: "Intermediate",
                            duration: "35 min",
                            topics: ["waves", "interference", "superposition"]
                        },
                        {
                            id: "circuit-builder",
                            name: "Electric Circuit Builder",
                            description: "Build and analyze electrical circuits",
                            difficulty: "Advanced",
                            duration: "45 min",
                            topics: ["current", "voltage", "resistance"]
                        },
                        {
                            id: "optics-rays",
                            name: "Optics Ray Tracing",
                            description: "Trace light rays through lenses and mirrors",
                            difficulty: "Intermediate",
                            duration: "40 min",
                            topics: ["reflection", "refraction", "focal length"]
                        },
                        {
                            id: "magnetic-fields",
                            name: "Magnetic Field Visualization",
                            description: "Explore magnetic field lines and forces",
                            difficulty: "Intermediate",
                            duration: "30 min",
                            topics: ["magnetism", "field lines", "force"]
                        }
                    ]
                },
                {
                    id: "chemistry",
                    name: "Chemistry",
                    description: "Investigate molecular interactions and chemical reactions",
                    color: "#8a2be2",
                    icon: "🧪",
                    experiments: [
                        {
                            id: "molecular-viewer",
                            name: "Molecular Structure Viewer",
                            description: "Explore 3D molecular structures and bonding",
                            difficulty: "Beginner",
                            duration: "20 min",
                            topics: ["molecular structure", "bonding", "geometry"]
                        },
                        {
                            id: "ph-meter-lab",
                            name: "pH Meter Lab",
                            description: "Perform acid-base titrations and pH measurements",
                            difficulty: "Intermediate",
                            duration: "40 min",
                            topics: ["acids", "bases", "titration", "pH"]
                        },
                        {
                            id: "equation-balancer",
                            name: "Chemical Equation Balancer",
                            description: "Balance chemical equations interactively",
                            difficulty: "Beginner",
                            duration: "15 min",
                            topics: ["stoichiometry", "conservation", "reactions"]
                        },
                        {
                            id: "periodic-explorer",
                            name: "Periodic Table Explorer",
                            description: "Discover element properties and periodic trends",
                            difficulty: "Beginner",
                            duration: "25 min",
                            topics: ["elements", "periodic trends", "properties"]
                        },
                        {
                            id: "reaction-rates",
                            name: "Reaction Rate Studies",
                            description: "Investigate factors affecting reaction rates",
                            difficulty: "Advanced",
                            duration: "50 min",
                            topics: ["kinetics", "concentration", "temperature"]
                        },
                        {
                            id: "electrochemistry",
                            name: "Electrochemistry Cell",
                            description: "Build galvanic and electrolytic cells",
                            difficulty: "Advanced",
                            duration: "45 min",
                            topics: ["redox", "electrodes", "cell potential"]
                        }
                    ]
                },
                {
                    id: "biology",
                    name: "Biology",
                    description: "Discover the mechanisms of life and living systems",
                    color: "#00ff41",
                    icon: "🧬",
                    experiments: [
                        {
                            id: "cell-structure",
                            name: "Cell Structure Explorer",
                            description: "Explore organelles and cellular components",
                            difficulty: "Beginner",
                            duration: "30 min",
                            topics: ["cell biology", "organelles", "structure"]
                        },
                        {
                            id: "dna-transcription",
                            name: "DNA Transcription & Translation",
                            description: "Follow the central dogma of molecular biology",
                            difficulty: "Intermediate",
                            duration: "40 min",
                            topics: ["DNA", "RNA", "proteins", "gene expression"]
                        },
                        {
                            id: "enzyme-kinetics",
                            name: "Enzyme Kinetics",
                            description: "Study enzyme activity and Michaelis-Menten kinetics",
                            difficulty: "Advanced",
                            duration: "45 min",
                            topics: ["enzymes", "kinetics", "inhibition"]
                        },
                        {
                            id: "photosynthesis",
                            name: "Photosynthesis Process",
                            description: "Investigate light and dark reactions in plants",
                            difficulty: "Intermediate",
                            duration: "35 min",
                            topics: ["photosynthesis", "chlorophyll", "ATP"]
                        },
                        {
                            id: "population-dynamics",
                            name: "Population Dynamics",
                            description: "Model predator-prey relationships and population growth",
                            difficulty: "Advanced",
                            duration: "40 min",
                            topics: ["ecology", "population", "predator-prey"]
                        },
                        {
                            id: "microscopy-lab",
                            name: "Microscopy Lab",
                            description: "Use virtual microscopes to examine biological samples",
                            difficulty: "Beginner",
                            duration: "25 min",
                            topics: ["microscopy", "magnification", "specimens"]
                        }
                    ]
                }
            ],
            userStats: {
                totalExperiments: 18,
                completedExperiments: 0,
                totalTime: "0 hours",
                achievements: []
            },
            recentActivities: [
                "Welcome to Virtual Lab Hub!",
                "Choose your first experiment to begin"
            ]
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderDashboard();
        this.updateStats();
        this.renderRecentActivities();
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('dashboardBtn').addEventListener('click', () => this.showDashboard());
        document.getElementById('progressBtn').addEventListener('click', () => this.showToast('Progress tracking coming soon!'));
        document.getElementById('helpBtn').addEventListener('click', () => this.showToast('Help system coming soon!'));

        // Breadcrumb navigation
        document.getElementById('backToDashboard').addEventListener('click', () => this.showDashboard());
        document.getElementById('backToSubject').addEventListener('click', () => this.showSubject(this.currentSubject.id));

        // Search
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(e.target.value);
            }
        });

        searchBtn.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });

        // Experiment controls
        document.getElementById('startExperiment').addEventListener('click', () => this.startExperiment());
        document.getElementById('resetExperiment').addEventListener('click', () => this.resetExperiment());
    }

    showView(viewName) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('view--active');
        });
        document.getElementById(viewName + 'View').classList.add('view--active');
        this.currentView = viewName;
    }

    showDashboard() {
        this.showView('dashboard');
        this.currentSubject = null;
        this.currentExperiment = null;
        this.renderSubjects();
    }

    showSubject(subjectId) {
        const subject = this.data.subjects.find(s => s.id === subjectId);
        if (!subject) return;

        this.currentSubject = subject;
        this.showView('subject');
        this.renderSubjectView(subject);
    }

    showExperiment(subjectId, experimentId) {
        const subject = this.data.subjects.find(s => s.id === subjectId);
        const experiment = subject?.experiments.find(e => e.id === experimentId);
        
        if (!subject || !experiment) return;

        this.currentSubject = subject;
        this.currentExperiment = experiment;
        this.showView('experiment');
        this.renderExperimentView(subject, experiment);
    }

    renderDashboard() {
        this.renderSubjects();
        this.renderRecentActivities();
    }

    renderSubjects() {
        const subjectsGrid = document.getElementById('subjectsGrid');
        subjectsGrid.innerHTML = '';

        this.data.subjects.forEach(subject => {
            const subjectCard = this.createSubjectCard(subject);
            subjectsGrid.appendChild(subjectCard);
        });
    }

    createSubjectCard(subject) {
        const card = document.createElement('div');
        card.className = `subject-card subject-card--${subject.id}`;
        card.style.borderColor = subject.color + '20';
        
        card.innerHTML = `
            <div class="subject-card__header">
                <div class="subject-card__icon" style="color: ${subject.color}">${subject.icon}</div>
                <h3 class="subject-card__title" style="color: ${subject.color}">${subject.name}</h3>
            </div>
            <p class="subject-card__description">${subject.description}</p>
            <div class="subject-card__stats">
                <span>${subject.experiments.length} experiments</span>
                <span>0 completed</span>
            </div>
        `;

        card.addEventListener('click', () => {
            this.showLoadingOverlay();
            setTimeout(() => {
                this.hideLoadingOverlay();
                this.showSubject(subject.id);
            }, 800);
        });

        return card;
    }

    renderSubjectView(subject) {
        document.getElementById('currentSubject').textContent = subject.name;
        document.getElementById('subjectIcon').textContent = subject.icon;
        document.getElementById('subjectIcon').style.color = subject.color;
        document.getElementById('subjectTitle').textContent = subject.name;
        document.getElementById('subjectTitle').style.color = subject.color;
        document.getElementById('subjectDescription').textContent = subject.description;

        const experimentsGrid = document.getElementById('experimentsGrid');
        experimentsGrid.innerHTML = '';

        subject.experiments.forEach(experiment => {
            const experimentCard = this.createExperimentCard(subject, experiment);
            experimentsGrid.appendChild(experimentCard);
        });
    }

    createExperimentCard(subject, experiment) {
        const card = document.createElement('div');
        card.className = 'experiment-card';
        
        card.innerHTML = `
            <h4 class="experiment-card__title">${experiment.name}</h4>
            <p class="experiment-card__description">${experiment.description}</p>
            <div class="experiment-card__meta">
                <span class="meta-tag">📊 ${experiment.difficulty}</span>
                <span class="meta-tag">⏱️ ${experiment.duration}</span>
            </div>
            <div class="experiment-card__topics">
                ${experiment.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
            </div>
        `;

        card.addEventListener('click', () => {
            this.showLoadingOverlay();
            setTimeout(() => {
                this.hideLoadingOverlay();
                this.showExperiment(subject.id, experiment.id);
            }, 1000);
        });

        return card;
    }

    renderExperimentView(subject, experiment) {
        // Update breadcrumb
        document.getElementById('backToSubject').textContent = subject.name;
        document.getElementById('currentExperiment').textContent = experiment.name;

        // Update experiment header
        document.getElementById('experimentTitle').textContent = experiment.name;
        document.getElementById('experimentDifficulty').textContent = `📊 ${experiment.difficulty}`;
        document.getElementById('experimentDuration').textContent = `⏱️ ${experiment.duration}`;

        // Update sidebar
        document.getElementById('experimentDescription').textContent = experiment.description;
        
        const topicsList = document.getElementById('topicsList');
        topicsList.innerHTML = experiment.topics.map(topic => 
            `<span class="topic-tag">${topic}</span>`
        ).join('');

        // Reset progress
        this.updateExperimentProgress(0);

        // Setup simulation based on experiment type
        this.setupSimulation(experiment);
    }

    setupSimulation(experiment) {
        const simulationCanvas = document.getElementById('simulationCanvas');
        const simulationControls = document.getElementById('simulationControls');

        // Clear existing content
        simulationCanvas.innerHTML = '';
        simulationControls.innerHTML = '<h3>Controls</h3>';

        // Create simulation based on experiment type
        switch (experiment.id) {
            case 'newtons-cannon':
                this.setupNewtonsCannonSimulation(simulationCanvas, simulationControls);
                break;
            case 'pendulum-motion':
                this.setupPendulumSimulation(simulationCanvas, simulationControls);
                break;
            case 'ph-meter-lab':
                this.setupPHMeterSimulation(simulationCanvas, simulationControls);
                break;
            case 'cell-structure':
                this.setupCellStructureSimulation(simulationCanvas, simulationControls);
                break;
            default:
                this.setupGenericSimulation(simulationCanvas, simulationControls, experiment);
        }
    }

    setupNewtonsCannonSimulation(canvas, controls) {
        canvas.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%; background: linear-gradient(to bottom, #001122 0%, #003366 50%, #00ff41 100%);">
                <div id="cannon" style="position: absolute; bottom: 20px; left: 50px; font-size: 2rem;">🔫</div>
                <div id="projectile" style="position: absolute; bottom: 40px; left: 80px; font-size: 1rem; display: none;">⚫</div>
                <canvas id="trajectoryCanvas" width="100%" height="100%" style="position: absolute; top: 0; left: 0;"></canvas>
            </div>
        `;

        controls.innerHTML += `
            <div class="form-group">
                <label class="form-label">Launch Angle (degrees)</label>
                <input type="range" id="angleSlider" min="0" max="90" value="45" class="form-control">
                <span id="angleValue">45°</span>
            </div>
            <div class="form-group">
                <label class="form-label">Initial Velocity (m/s)</label>
                <input type="range" id="velocitySlider" min="10" max="100" value="50" class="form-control">
                <span id="velocityValue">50 m/s</span>
            </div>
            <div class="form-group">
                <button class="btn btn--primary" id="fireButton">Fire Cannon! 🔥</button>
                <button class="btn btn--secondary" id="clearButton">Clear</button>
            </div>
        `;

        // Add event listeners for controls
        this.setupNewtonsCannonControls();
    }

    setupNewtonsCannonControls() {
        const angleSlider = document.getElementById('angleSlider');
        const velocitySlider = document.getElementById('velocitySlider');
        const angleValue = document.getElementById('angleValue');
        const velocityValue = document.getElementById('velocityValue');
        const fireButton = document.getElementById('fireButton');
        const clearButton = document.getElementById('clearButton');

        angleSlider.addEventListener('input', (e) => {
            angleValue.textContent = e.target.value + '°';
        });

        velocitySlider.addEventListener('input', (e) => {
            velocityValue.textContent = e.target.value + ' m/s';
        });

        fireButton.addEventListener('click', () => {
            this.animateProjectile(parseFloat(angleSlider.value), parseFloat(velocitySlider.value));
        });

        clearButton.addEventListener('click', () => {
            const canvas = document.getElementById('trajectoryCanvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
    }

    animateProjectile(angle, velocity) {
        const projectile = document.getElementById('projectile');
        const canvas = document.getElementById('trajectoryCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        projectile.style.display = 'block';
        
        const g = 9.81; // gravity
        const angleRad = angle * Math.PI / 180;
        const vx = velocity * Math.cos(angleRad);
        const vy = velocity * Math.sin(angleRad);
        
        let t = 0;
        let x0 = 80;
        let y0 = canvas.height - 40;
        
        const animate = () => {
            t += 0.05;
            const x = x0 + vx * t;
            const y = y0 - (vy * t - 0.5 * g * t * t);
            
            if (y < canvas.height && x < canvas.width) {
                projectile.style.left = x + 'px';
                projectile.style.bottom = (canvas.height - y) + 'px';
                
                // Draw trajectory
                ctx.fillStyle = '#00ffff';
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, 2 * Math.PI);
                ctx.fill();
                
                requestAnimationFrame(animate);
            } else {
                projectile.style.display = 'none';
                this.updateExperimentProgress(50);
            }
        };
        
        animate();
    }

    setupPendulumSimulation(canvas, controls) {
        canvas.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%; background: linear-gradient(135deg, #001122, #003366);">
                <svg width="100%" height="100%" id="pendulumSVG">
                    <line id="pendulumString" x1="50%" y1="50" x2="50%" y2="200" stroke="#00ffff" stroke-width="2"/>
                    <circle id="pendulumBob" cx="50%" cy="200" r="15" fill="#00ff41" style="filter: drop-shadow(0 0 10px #00ff41);"/>
                </svg>
            </div>
        `;

        controls.innerHTML += `
            <div class="form-group">
                <label class="form-label">Pendulum Length</label>
                <input type="range" id="lengthSlider" min="100" max="250" value="150" class="form-control">
                <span id="lengthValue">150px</span>
            </div>
            <div class="form-group">
                <label class="form-label">Initial Angle</label>
                <input type="range" id="pendulumAngleSlider" min="10" max="80" value="30" class="form-control">
                <span id="pendulumAngleValue">30°</span>
            </div>
            <div class="form-group">
                <button class="btn btn--primary" id="startPendulum">Start Oscillation</button>
                <button class="btn btn--secondary" id="stopPendulum">Stop</button>
            </div>
        `;

        this.setupPendulumControls();
    }

    setupPendulumControls() {
        const lengthSlider = document.getElementById('lengthSlider');
        const angleSlider = document.getElementById('pendulumAngleSlider');
        const lengthValue = document.getElementById('lengthValue');
        const angleValue = document.getElementById('pendulumAngleValue');
        const startButton = document.getElementById('startPendulum');
        const stopButton = document.getElementById('stopPendulum');

        lengthSlider.addEventListener('input', (e) => {
            lengthValue.textContent = e.target.value + 'px';
            this.updatePendulumLength(parseFloat(e.target.value));
        });

        angleSlider.addEventListener('input', (e) => {
            angleValue.textContent = e.target.value + '°';
        });

        startButton.addEventListener('click', () => {
            this.startPendulumAnimation(parseFloat(lengthSlider.value), parseFloat(angleSlider.value));
        });

        stopButton.addEventListener('click', () => {
            this.stopPendulumAnimation();
        });
    }

    updatePendulumLength(length) {
        const string = document.getElementById('pendulumString');
        const bob = document.getElementById('pendulumBob');
        if (string && bob) {
            string.setAttribute('y2', 50 + length);
            bob.setAttribute('cy', 50 + length);
        }
    }

    startPendulumAnimation(length, initialAngle) {
        let angle = initialAngle * Math.PI / 180;
        let angularVelocity = 0;
        const gravity = 9.81;
        const dt = 0.02;
        
        const animate = () => {
            if (!this.pendulumAnimating) return;
            
            const angularAcceleration = -(gravity / length) * Math.sin(angle);
            angularVelocity += angularAcceleration * dt;
            angle += angularVelocity * dt;
            
            const svg = document.getElementById('pendulumSVG');
            const centerX = svg.clientWidth / 2;
            const centerY = 50;
            
            const bobX = centerX + length * Math.sin(angle);
            const bobY = centerY + length * Math.cos(angle);
            
            const string = document.getElementById('pendulumString');
            const bob = document.getElementById('pendulumBob');
            
            if (string && bob) {
                string.setAttribute('x2', bobX);
                string.setAttribute('y2', bobY);
                bob.setAttribute('cx', bobX);
                bob.setAttribute('cy', bobY);
            }
            
            requestAnimationFrame(animate);
        };
        
        this.pendulumAnimating = true;
        animate();
        this.updateExperimentProgress(75);
    }

    stopPendulumAnimation() {
        this.pendulumAnimating = false;
    }

    setupPHMeterSimulation(canvas, controls) {
        canvas.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%; background: linear-gradient(135deg, #001122, #003366); display: flex; align-items: center; justify-content: space-around;">
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; color: #00ffff; margin-bottom: 10px;">Acid Solution</div>
                    <div id="acidBeaker" style="width: 80px; height: 100px; background: linear-gradient(to bottom, transparent 20%, #ff4444 20%); border: 3px solid #fff; border-radius: 0 0 20px 20px; position: relative;">
                        <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); color: #fff; font-size: 0.8rem;">HCl</div>
                    </div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; color: #8a2be2; margin-bottom: 10px;">pH Meter</div>
                    <div id="phMeter" style="background: #333; border: 2px solid #666; border-radius: 10px; padding: 15px; color: #00ff41;">
                        <div style="font-size: 2rem; font-weight: bold;" id="phValue">7.0</div>
                        <div style="font-size: 0.8rem;">pH Level</div>
                    </div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; color: #00ff41; margin-bottom: 10px;">Base Solution</div>
                    <div id="baseBeaker" style="width: 80px; height: 100px; background: linear-gradient(to bottom, transparent 20%, #4444ff 20%); border: 3px solid #fff; border-radius: 0 0 20px 20px; position: relative;">
                        <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); color: #fff; font-size: 0.8rem;">NaOH</div>
                    </div>
                </div>
            </div>
        `;

        controls.innerHTML += `
            <div class="form-group">
                <label class="form-label">Solution Type</label>
                <select id="solutionSelect" class="form-control">
                    <option value="7">Pure Water (pH 7)</option>
                    <option value="1">Strong Acid (pH 1)</option>
                    <option value="3">Weak Acid (pH 3)</option>
                    <option value="11">Weak Base (pH 11)</option>
                    <option value="13">Strong Base (pH 13)</option>
                </select>
            </div>
            <div class="form-group">
                <button class="btn btn--primary" id="measurePH">Measure pH</button>
                <button class="btn btn--secondary" id="addIndicator">Add Indicator</button>
            </div>
        `;

        this.setupPHMeterControls();
    }

    setupPHMeterControls() {
        const solutionSelect = document.getElementById('solutionSelect');
        const measureButton = document.getElementById('measurePH');
        const indicatorButton = document.getElementById('addIndicator');

        measureButton.addEventListener('click', () => {
            const ph = parseFloat(solutionSelect.value);
            this.updatePHMeter(ph);
        });

        indicatorButton.addEventListener('click', () => {
            const ph = parseFloat(solutionSelect.value);
            this.addColorIndicator(ph);
        });
    }

    updatePHMeter(ph) {
        const phValue = document.getElementById('phValue');
        const phMeter = document.getElementById('phMeter');
        
        phValue.textContent = ph.toFixed(1);
        
        if (ph < 7) {
            phMeter.style.borderColor = '#ff4444';
            phValue.style.color = '#ff4444';
        } else if (ph > 7) {
            phMeter.style.borderColor = '#4444ff';
            phValue.style.color = '#4444ff';
        } else {
            phMeter.style.borderColor = '#00ff41';
            phValue.style.color = '#00ff41';
        }
        
        this.updateExperimentProgress(60);
    }

    addColorIndicator(ph) {
        const acidBeaker = document.getElementById('acidBeaker');
        const baseBeaker = document.getElementById('baseBeaker');
        
        let color;
        if (ph < 4) color = '#ff0000';
        else if (ph < 6) color = '#ff8800';
        else if (ph < 8) color = '#00ff00';
        else if (ph < 10) color = '#0088ff';
        else color = '#8800ff';
        
        if (ph < 7) {
            acidBeaker.style.background = `linear-gradient(to bottom, transparent 20%, ${color} 20%)`;
        } else {
            baseBeaker.style.background = `linear-gradient(to bottom, transparent 20%, ${color} 20%)`;
        }
        
        this.updateExperimentProgress(90);
    }

    setupCellStructureSimulation(canvas, controls) {
        canvas.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%; background: radial-gradient(circle, #003366 0%, #001122 100%); display: flex; align-items: center; justify-content: center;">
                <svg width="300" height="300" id="cellSVG" viewBox="0 0 300 300">
                    <!-- Cell membrane -->
                    <ellipse cx="150" cy="150" rx="140" ry="120" fill="none" stroke="#00ffff" stroke-width="3" style="filter: drop-shadow(0 0 10px #00ffff);"/>
                    
                    <!-- Nucleus -->
                    <ellipse cx="150" cy="150" rx="50" ry="40" fill="rgba(138, 43, 226, 0.3)" stroke="#8a2be2" stroke-width="2" style="filter: drop-shadow(0 0 10px #8a2be2);" id="nucleus"/>
                    
                    <!-- Mitochondria -->
                    <ellipse cx="100" cy="100" rx="25" ry="15" fill="rgba(0, 255, 65, 0.3)" stroke="#00ff41" stroke-width="2" style="filter: drop-shadow(0 0 5px #00ff41);" id="mitochondria1"/>
                    <ellipse cx="200" cy="200" rx="20" ry="12" fill="rgba(0, 255, 65, 0.3)" stroke="#00ff41" stroke-width="2" style="filter: drop-shadow(0 0 5px #00ff41);" id="mitochondria2"/>
                    
                    <!-- Ribosomes -->
                    <circle cx="80" cy="180" r="5" fill="#ff8800" style="filter: drop-shadow(0 0 5px #ff8800);" id="ribosome1"/>
                    <circle cx="220" cy="120" r="5" fill="#ff8800" style="filter: drop-shadow(0 0 5px #ff8800);" id="ribosome2"/>
                    <circle cx="180" cy="80" r="5" fill="#ff8800" style="filter: drop-shadow(0 0 5px #ff8800);" id="ribosome3"/>
                </svg>
            </div>
        `;

        controls.innerHTML += `
            <div class="form-group">
                <label class="form-label">Select Organelle</label>
                <select id="organelleSelect" class="form-control">
                    <option value="">Choose organelle...</option>
                    <option value="nucleus">Nucleus</option>
                    <option value="mitochondria">Mitochondria</option>
                    <option value="ribosomes">Ribosomes</option>
                </select>
            </div>
            <div id="organelleInfo" style="margin-top: 15px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px; display: none;">
                <h4 id="organelleTitle" style="color: #00ffff; margin: 0 0 10px 0;"></h4>
                <p id="organelleDescription" style="color: #b0b0b0; margin: 0;"></p>
            </div>
        `;

        this.setupCellStructureControls();
    }

    setupCellStructureControls() {
        const organelleSelect = document.getElementById('organelleSelect');
        const organelleInfo = document.getElementById('organelleInfo');
        const organelleTitle = document.getElementById('organelleTitle');
        const organelleDescription = document.getElementById('organelleDescription');

        const organelleData = {
            nucleus: {
                title: "Nucleus",
                description: "Controls cell activities and contains the cell's DNA. Often called the 'control center' of the cell."
            },
            mitochondria: {
                title: "Mitochondria",
                description: "The powerhouse of the cell. Generates ATP through cellular respiration to provide energy for cellular processes."
            },
            ribosomes: {
                title: "Ribosomes",
                description: "Protein synthesis factories. These small structures translate mRNA into proteins essential for cell function."
            }
        };

        organelleSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            
            if (selected && organelleData[selected]) {
                organelleInfo.style.display = 'block';
                organelleTitle.textContent = organelleData[selected].title;
                organelleDescription.textContent = organelleData[selected].description;
                this.highlightOrganelle(selected);
                this.updateExperimentProgress(33);
            } else {
                organelleInfo.style.display = 'none';
                this.clearOrganelleHighlight();
            }
        });
    }

    highlightOrganelle(organelleType) {
        // Reset all highlights
        this.clearOrganelleHighlight();
        
        const svg = document.getElementById('cellSVG');
        if (!svg) return;
        
        switch (organelleType) {
            case 'nucleus':
                const nucleus = svg.querySelector('#nucleus');
                if (nucleus) nucleus.style.stroke = '#ffff00';
                break;
            case 'mitochondria':
                const mito1 = svg.querySelector('#mitochondria1');
                const mito2 = svg.querySelector('#mitochondria2');
                if (mito1) mito1.style.stroke = '#ffff00';
                if (mito2) mito2.style.stroke = '#ffff00';
                break;
            case 'ribosomes':
                const ribo1 = svg.querySelector('#ribosome1');
                const ribo2 = svg.querySelector('#ribosome2');
                const ribo3 = svg.querySelector('#ribosome3');
                if (ribo1) ribo1.style.fill = '#ffff00';
                if (ribo2) ribo2.style.fill = '#ffff00';
                if (ribo3) ribo3.style.fill = '#ffff00';
                break;
        }
    }

    clearOrganelleHighlight() {
        const svg = document.getElementById('cellSVG');
        if (!svg) return;
        
        const nucleus = svg.querySelector('#nucleus');
        if (nucleus) nucleus.style.stroke = '#8a2be2';
        
        const mito1 = svg.querySelector('#mitochondria1');
        const mito2 = svg.querySelector('#mitochondria2');
        if (mito1) mito1.style.stroke = '#00ff41';
        if (mito2) mito2.style.stroke = '#00ff41';
        
        const ribo1 = svg.querySelector('#ribosome1');
        const ribo2 = svg.querySelector('#ribosome2');
        const ribo3 = svg.querySelector('#ribosome3');
        if (ribo1) ribo1.style.fill = '#ff8800';
        if (ribo2) ribo2.style.fill = '#ff8800';
        if (ribo3) ribo3.style.fill = '#ff8800';
    }

    setupGenericSimulation(canvas, controls, experiment) {
        canvas.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(138,43,226,0.1));">
                <div style="font-size: 4rem; margin-bottom: 20px; filter: drop-shadow(0 0 20px currentColor);">⚗️</div>
                <h3 style="color: #00ffff; margin-bottom: 15px;">${experiment.name}</h3>
                <p style="color: #b0b0b0; max-width: 300px;">Interactive simulation for ${experiment.name.toLowerCase()}. Click 'Start Experiment' to begin the virtual lab experience.</p>
                <div style="margin-top: 20px;">
                    <div class="loading-spinner" style="width: 30px; height: 30px; border: 2px solid rgba(0,255,255,0.3); border-top: 2px solid #00ffff;"></div>
                </div>
            </div>
        `;

        controls.innerHTML += `
            <div class="form-group">
                <label class="form-label">Simulation Parameter 1</label>
                <input type="range" min="0" max="100" value="50" class="form-control" id="param1">
                <span>50</span>
            </div>
            <div class="form-group">
                <label class="form-label">Simulation Parameter 2</label>
                <input type="range" min="0" max="100" value="30" class="form-control" id="param2">
                <span>30</span>
            </div>
            <div class="form-group">
                <button class="btn btn--primary" onclick="app.updateExperimentProgress(80)">Run Simulation</button>
            </div>
        `;
    }

    startExperiment() {
        const startBtn = document.getElementById('startExperiment');
        const resetBtn = document.getElementById('resetExperiment');
        
        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
        
        this.updateExperimentProgress(25);
        this.showToast('Experiment started! Use the controls to interact with the simulation.');
    }

    resetExperiment() {
        const startBtn = document.getElementById('startExperiment');
        const resetBtn = document.getElementById('resetExperiment');
        
        startBtn.style.display = 'block';
        resetBtn.style.display = 'none';
        
        this.updateExperimentProgress(0);
        this.showToast('Experiment reset. Click "Start Experiment" to begin again.');
        
        // Reset simulation if applicable
        if (this.pendulumAnimating) {
            this.stopPendulumAnimation();
        }
    }

    updateExperimentProgress(percentage) {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        if (progressBar && progressText) {
            progressBar.style.width = percentage + '%';
            progressText.textContent = percentage + '% Complete';
            
            if (percentage === 100) {
                this.completeExperiment();
            }
        }
    }

    completeExperiment() {
        this.data.userStats.completedExperiments++;
        this.updateStats();
        this.addRecentActivity(`Completed: ${this.currentExperiment.name}`);
        this.showToast('🎉 Experiment completed! Great work!');
    }

    performSearch(query) {
        if (!query.trim()) {
            this.renderSubjects();
            return;
        }

        const results = [];
        this.data.subjects.forEach(subject => {
            subject.experiments.forEach(experiment => {
                if (experiment.name.toLowerCase().includes(query.toLowerCase()) ||
                    experiment.description.toLowerCase().includes(query.toLowerCase()) ||
                    experiment.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase()))) {
                    results.push({ subject, experiment });
                }
            });
        });

        if (results.length > 0) {
            this.renderSearchResults(results, query);
        } else {
            this.showToast('No experiments found matching your search.');
        }
    }

    renderSearchResults(results, query) {
        const subjectsGrid = document.getElementById('subjectsGrid');
        subjectsGrid.innerHTML = `<div class="search-results-header"><h3>Search Results for "${query}"</h3></div>`;

        results.forEach(({ subject, experiment }) => {
            const resultCard = document.createElement('div');
            resultCard.className = 'experiment-card';
            resultCard.innerHTML = `
                <h4 class="experiment-card__title">${experiment.name}</h4>
                <p style="color: ${subject.color}; font-weight: bold; margin-bottom: 8px;">${subject.name}</p>
                <p class="experiment-card__description">${experiment.description}</p>
                <div class="experiment-card__meta">
                    <span class="meta-tag">📊 ${experiment.difficulty}</span>
                    <span class="meta-tag">⏱️ ${experiment.duration}</span>
                </div>
                <div class="experiment-card__topics">
                    ${experiment.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                </div>
            `;

            resultCard.addEventListener('click', () => {
                this.showLoadingOverlay();
                setTimeout(() => {
                    this.hideLoadingOverlay();
                    this.showExperiment(subject.id, experiment.id);
                }, 800);
            });

            subjectsGrid.appendChild(resultCard);
        });
    }

    updateStats() {
        document.getElementById('totalExperiments').textContent = this.data.userStats.totalExperiments;
        document.getElementById('completedExperiments').textContent = this.data.userStats.completedExperiments;
        document.getElementById('totalTime').textContent = this.data.userStats.totalTime;
        document.getElementById('achievements').textContent = this.data.userStats.achievements.length;
    }

    renderRecentActivities() {
        const activitiesList = document.getElementById('activitiesList');
        activitiesList.innerHTML = '';

        this.data.recentActivities.forEach((activity, index) => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-item__icon">📌</div>
                <div>${activity}</div>
            `;
            activitiesList.appendChild(activityItem);
        });
    }

    addRecentActivity(activity) {
        this.data.recentActivities.unshift(activity);
        if (this.data.recentActivities.length > 5) {
            this.data.recentActivities.pop();
        }
        if (this.currentView === 'dashboard') {
            this.renderRecentActivities();
        }
    }

    showLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.remove('hidden');
    }

    hideLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastContent = document.getElementById('toastContent');
        
        toastContent.textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }, 3000);
    }
}

// Initialize the application
const app = new VirtualLabApp();

// Add some global utility functions for better user experience
window.addEventListener('load', () => {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (app.currentView !== 'dashboard') {
                app.showDashboard();
            }
        }
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
    });
});

// Add resize handler for responsive behavior
window.addEventListener('resize', () => {
    // Update any canvas or SVG elements that need resizing
    if (app.currentView === 'experiment') {
        // Recalculate simulation canvas dimensions if needed
        const canvas = document.getElementById('trajectoryCanvas');
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    }
});