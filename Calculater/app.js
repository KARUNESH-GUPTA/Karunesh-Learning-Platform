// Aapki Calculator - Mobile-First Responsive Calculator
class MobileCalculator {
    constructor() {
        this.currentCalculator = 'basic';
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.waitingForNewNumber = false;
        this.expression = '';
        this.isRadians = false;
        this.isShiftMode = false;
        this.currentBase = 10;
        this.history = this.loadHistory();
        this.lastTouchTime = 0;
        
        // PWA detection
        this.isPWA = window.matchMedia('(display-mode: standalone)').matches;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupTouchGestures();
        this.setupPWA();
        this.loadCalculatorState();
        this.updateDisplay();
        this.renderHistory();
        
        // Initialize with basic calculator
        this.switchCalculator('basic');
        
        // Setup haptic feedback if available
        this.setupHapticFeedback();
    }
    
    setupEventListeners() {
        // Navigation events
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        const navClose = document.getElementById('navClose');
        if (navClose) {
            navClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        
        const navOverlay = document.getElementById('navOverlay');
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        
        // Calculator navigation - both mobile nav and bottom nav
        document.querySelectorAll('[data-calculator]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const calculator = e.currentTarget.dataset.calculator;
                this.switchCalculator(calculator);
                this.closeMobileMenu();
            });
        });
        
        // Button press events - use event delegation for better performance
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn[data-number]')) {
                this.inputNumber(e.target.dataset.number);
                this.triggerHapticFeedback();
            } else if (e.target.matches('.btn[data-action]')) {
                this.performAction(e.target.dataset.action);
                this.triggerHapticFeedback();
            }
        });
        
        // Scientific calculator controls
        const degRadToggle = document.getElementById('degRadToggle');
        if (degRadToggle) {
            degRadToggle.addEventListener('click', () => {
                this.toggleAngleMode();
            });
        }
        
        const shiftToggle = document.getElementById('shiftToggle');
        if (shiftToggle) {
            shiftToggle.addEventListener('click', () => {
                this.toggleShiftMode();
            });
        }
        
        // Programmer calculator tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchBase(parseInt(e.target.dataset.base));
            });
        });
        
        // Financial calculator
        const calculateEMI = document.getElementById('calculateEMI');
        if (calculateEMI) {
            calculateEMI.addEventListener('click', () => {
                this.calculateEMI();
            });
        }
        
        // History management
        const clearHistory = document.getElementById('clearHistory');
        if (clearHistory) {
            clearHistory.addEventListener('click', () => {
                this.clearHistory();
            });
        }
        
        // History item clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.history-item')) {
                const item = e.target.closest('.history-item');
                this.useHistoryItem(item);
            }
            
            if (e.target.matches('.favorite-btn')) {
                e.stopPropagation();
                this.toggleFavorite(e.target.closest('.history-item'));
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
        
        // Prevent zoom on input focus for mobile
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.style.fontSize = '16px';
            });
        });
    }
    
    setupTouchGestures() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let isScrolling = false;
        
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;
        
        mainContent.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });
        
        mainContent.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);
            
            if (diffY > diffX) {
                isScrolling = true;
            }
        }, { passive: true });
        
        mainContent.addEventListener('touchend', (e) => {
            if (isScrolling) return;
            
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const minSwipeDistance = 80;
            
            // Horizontal swipe for calculator switching
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.swipeRight();
                } else {
                    this.swipeLeft();
                }
            }
            
            // Vertical swipe down (pull to refresh/clear)
            if (deltaY > minSwipeDistance && Math.abs(deltaX) < 50) {
                this.pullDown();
            }
        }, { passive: true });
        
        // Long press for context menu
        let longPressTimer;
        document.addEventListener('touchstart', (e) => {
            if (e.target.matches('.btn')) {
                longPressTimer = setTimeout(() => {
                    this.showContextMenu(e.target);
                }, 700);
            }
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        }, { passive: true });
        
        document.addEventListener('touchmove', () => {
            clearTimeout(longPressTimer);
        }, { passive: true });
    }
    
    setupPWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('data:application/javascript,console.log("SW registered")');
        }
        
        // Add to home screen prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.showInstallPrompt(e);
        });
    }
    
    setupHapticFeedback() {
        this.hapticSupported = 'vibrate' in navigator;
    }
    
    triggerHapticFeedback(pattern = [25]) {
        if (this.hapticSupported) {
            navigator.vibrate(pattern);
        }
    }
    
    // Navigation Methods
    toggleMobileMenu() {
        const nav = document.getElementById('mobileNav');
        const toggle = document.getElementById('menuToggle');
        
        if (nav && toggle) {
            nav.classList.toggle('hidden');
            toggle.classList.toggle('active');
        }
    }
    
    closeMobileMenu() {
        const nav = document.getElementById('mobileNav');
        const toggle = document.getElementById('menuToggle');
        
        if (nav && toggle) {
            nav.classList.add('hidden');
            toggle.classList.remove('active');
        }
    }
    
    switchCalculator(type) {
        // Hide all calculator sections
        document.querySelectorAll('.calculator-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target calculator
        const targetSection = document.getElementById(type);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update navigation states
        document.querySelectorAll('[data-calculator]').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll(`[data-calculator="${type}"]`).forEach(btn => {
            btn.classList.add('active');
        });
        
        // Reset calculator state when switching (except for history and financial)
        if (type !== 'history' && type !== 'financial') {
            this.resetCalculator();
        }
        
        this.currentCalculator = type;
        
        // Update display
        this.updateDisplay();
        
        // Special setup for different calculators
        if (type === 'programmer') {
            this.updateProgrammerDisplay();
        } else if (type === 'financial') {
            this.calculateEMI();
        }
        
        this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} calculator`);
    }
    
    // Input Methods
    inputNumber(number) {
        if (this.currentCalculator === 'programmer') {
            if (!this.isValidForBase(number)) return;
        }
        
        if (this.waitingForNewNumber) {
            this.currentValue = number;
            this.waitingForNewNumber = false;
        } else {
            this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
        }
        
        this.updateDisplay();
    }
    
    performAction(action) {
        const currentNum = parseFloat(this.currentValue);
        
        switch (action) {
            case 'clear':
                this.clearAll();
                break;
            case 'clearEntry':
                this.clearEntry();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'sign':
                this.toggleSign();
                break;
            case 'percent':
                this.calculatePercent();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'add':
                this.setOperation('+');
                break;
            case 'subtract':
                this.setOperation('-');
                break;
            case 'multiply':
                this.setOperation('*');
                break;
            case 'divide':
                this.setOperation('/');
                break;
            case 'power':
                this.setOperation('**');
                break;
            case 'sqrt':
                this.performFunction(Math.sqrt, 'sqrt');
                break;
            case 'sin':
                this.performTrigFunction(Math.sin, 'sin');
                break;
            case 'cos':
                this.performTrigFunction(Math.cos, 'cos');
                break;
            case 'tan':
                this.performTrigFunction(Math.tan, 'tan');
                break;
            case 'log':
                this.performFunction(Math.log10, 'log');
                break;
            case 'ln':
                this.performFunction(Math.log, 'ln');
                break;
            case 'pi':
                this.inputConstant(Math.PI);
                break;
            case 'e':
                this.inputConstant(Math.E);
                break;
            case 'openParen':
                this.inputSymbol('(');
                break;
            case 'closeParen':
                this.inputSymbol(')');
                break;
            case 'and':
                this.setBitwiseOperation('&');
                break;
            case 'or':
                this.setBitwiseOperation('|');
                break;
            case 'xor':
                this.setBitwiseOperation('^');
                break;
            case 'not':
                this.performBitwiseFunction(x => ~x, 'NOT');
                break;
        }
    }
    
    // Calculation Methods
    clearAll() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.waitingForNewNumber = false;
        this.expression = '';
        this.updateDisplay();
        this.showToast('Calculator cleared');
    }
    
    clearEntry() {
        this.currentValue = '0';
        this.updateDisplay();
    }
    
    backspace() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }
    
    inputDecimal() {
        if (this.waitingForNewNumber) {
            this.currentValue = '0.';
            this.waitingForNewNumber = false;
        } else if (this.currentValue.indexOf('.') === -1) {
            this.currentValue += '.';
        }
        this.updateDisplay();
    }
    
    toggleSign() {
        if (this.currentValue !== '0') {
            this.currentValue = this.currentValue.charAt(0) === '-' 
                ? this.currentValue.slice(1) 
                : '-' + this.currentValue;
            this.updateDisplay();
        }
    }
    
    calculatePercent() {
        const value = parseFloat(this.currentValue);
        this.currentValue = (value / 100).toString();
        this.waitingForNewNumber = true;
        this.updateDisplay();
    }
    
    setOperation(nextOperation) {
        const currentNum = parseFloat(this.currentValue);
        
        if (this.previousValue === null) {
            this.previousValue = currentNum;
        } else if (this.operation) {
            const result = this.performCalculation();
            this.currentValue = result.toString();
            this.previousValue = result;
        }
        
        this.waitingForNewNumber = true;
        this.operation = nextOperation;
        this.updateExpression();
        this.updateDisplay();
    }
    
    calculate() {
        if (this.operation && this.previousValue !== null) {
            const result = this.performCalculation();
            const expression = `${this.previousValue} ${this.getOperatorSymbol(this.operation)} ${this.currentValue}`;
            
            this.addToHistory(expression, result.toString(), this.currentCalculator);
            
            this.currentValue = result.toString();
            this.previousValue = null;
            this.operation = null;
            this.waitingForNewNumber = true;
            this.expression = '';
            
            this.updateDisplay();
        }
    }
    
    performCalculation() {
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        
        if (isNaN(prev) || isNaN(current)) return current;
        
        switch (this.operation) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            case '*':
                return prev * current;
            case '/':
                if (current === 0) {
                    this.showToast('Cannot divide by zero', 'error');
                    return prev;
                }
                return prev / current;
            case '**':
                return Math.pow(prev, current);
            case '&':
                return prev & current;
            case '|':
                return prev | current;
            case '^':
                return prev ^ current;
            default:
                return current;
        }
    }
    
    performFunction(func, name) {
        const value = parseFloat(this.currentValue);
        const result = func(value);
        
        this.addToHistory(`${name}(${value})`, result.toString(), this.currentCalculator);
        this.currentValue = result.toString();
        this.waitingForNewNumber = true;
        this.updateDisplay();
    }
    
    performTrigFunction(func, name) {
        let value = parseFloat(this.currentValue);
        
        // Convert to radians if in degree mode
        if (!this.isRadians) {
            value = value * (Math.PI / 180);
        }
        
        const result = func(value);
        const angleUnit = this.isRadians ? ' rad' : '°';
        
        this.addToHistory(`${name}(${this.currentValue}${angleUnit})`, result.toString(), this.currentCalculator);
        this.currentValue = result.toString();
        this.waitingForNewNumber = true;
        this.updateDisplay();
    }
    
    performBitwiseFunction(func, name) {
        const value = parseInt(this.currentValue);
        const result = func(value);
        
        this.addToHistory(`${name}(${value})`, result.toString(), this.currentCalculator);
        this.currentValue = result.toString();
        this.waitingForNewNumber = true;
        this.updateDisplay();
    }
    
    inputConstant(constant) {
        this.currentValue = constant.toString();
        this.waitingForNewNumber = true;
        this.updateDisplay();
    }
    
    inputSymbol(symbol) {
        if (this.currentValue === '0') {
            this.currentValue = symbol;
        } else {
            this.currentValue += symbol;
        }
        this.updateDisplay();
    }
    
    setBitwiseOperation(operation) {
        this.setOperation(operation);
    }
    
    // Scientific Calculator Methods
    toggleAngleMode() {
        this.isRadians = !this.isRadians;
        const toggle = document.getElementById('degRadToggle');
        if (toggle) {
            toggle.textContent = this.isRadians ? 'RAD' : 'DEG';
        }
        this.showToast(`${this.isRadians ? 'Radians' : 'Degrees'} mode`);
    }
    
    toggleShiftMode() {
        this.isShiftMode = !this.isShiftMode;
        const toggle = document.getElementById('shiftToggle');
        if (toggle) {
            toggle.classList.toggle('active');
        }
        this.showToast(`2nd functions ${this.isShiftMode ? 'ON' : 'OFF'}`);
    }
    
    // Programmer Calculator Methods
    switchBase(base) {
        const currentValue = parseInt(this.currentValue, this.currentBase);
        this.currentBase = base;
        
        // Update tab active state
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const targetTab = document.querySelector(`[data-base="${base}"]`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        // Convert current value to new base
        if (!isNaN(currentValue)) {
            this.currentValue = currentValue.toString(base).toUpperCase();
        }
        
        this.updateProgrammerDisplay();
        this.updateHexButtons();
        this.updateDisplay();
    }
    
    updateHexButtons() {
        const hexButtons = document.querySelectorAll('.btn-hex');
        hexButtons.forEach(btn => {
            const letter = btn.dataset.number;
            if (letter) {
                const letterValue = parseInt(letter, 16);
                
                if (letterValue < this.currentBase) {
                    btn.classList.remove('disabled');
                    btn.disabled = false;
                } else {
                    btn.classList.add('disabled');
                    btn.disabled = true;
                }
            }
        });
        
        // Also disable number buttons that are invalid for current base
        document.querySelectorAll('.btn-number').forEach(btn => {
            const number = btn.dataset.number;
            if (number && this.currentCalculator === 'programmer') {
                const numValue = parseInt(number);
                if (numValue >= this.currentBase) {
                    btn.classList.add('disabled');
                    btn.disabled = true;
                } else {
                    btn.classList.remove('disabled');
                    btn.disabled = false;
                }
            }
        });
    }
    
    updateProgrammerDisplay() {
        const value = parseInt(this.currentValue, this.currentBase) || 0;
        
        // Update bit display
        const bitDisplay = document.getElementById('bitDisplay');
        if (bitDisplay) {
            const binaryString = value.toString(2).padStart(8, '0');
            const spans = bitDisplay.querySelectorAll('span');
            
            for (let i = 0; i < spans.length && i < binaryString.length; i++) {
                spans[i].textContent = binaryString[binaryString.length - 1 - i] || '0';
            }
        }
        
        // Update secondary display with different base representations
        const secondary = document.getElementById('programmerSecondary');
        if (secondary) {
            const bases = { 2: 'BIN', 8: 'OCT', 10: 'DEC', 16: 'HEX' };
            const otherBases = Object.keys(bases).filter(b => parseInt(b) !== this.currentBase);
            const conversions = otherBases.map(base => 
                `${bases[base]}: ${value.toString(parseInt(base)).toUpperCase()}`
            );
            secondary.textContent = conversions.join(' | ');
        }
    }
    
    isValidForBase(number) {
        if (/[0-9]/.test(number)) {
            return parseInt(number) < this.currentBase;
        }
        if (/[A-F]/.test(number.toUpperCase())) {
            const value = parseInt(number, 16);
            return value < this.currentBase;
        }
        return false;
    }
    
    // Financial Calculator Methods
    calculateEMI() {
        const loanAmountInput = document.getElementById('loanAmount');
        const interestRateInput = document.getElementById('interestRate');
        const loanTenureInput = document.getElementById('loanTenure');
        
        if (!loanAmountInput || !interestRateInput || !loanTenureInput) return;
        
        const principal = parseFloat(loanAmountInput.value) || 500000;
        const annualRate = parseFloat(interestRateInput.value) || 8.5;
        const years = parseFloat(loanTenureInput.value) || 20;
        
        const monthlyRate = annualRate / (12 * 100);
        const totalMonths = years * 12;
        
        if (monthlyRate === 0) {
            const emi = principal / totalMonths;
            this.updateFinancialResults(emi, 0, principal);
        } else {
            const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                       (Math.pow(1 + monthlyRate, totalMonths) - 1);
            const totalAmount = emi * totalMonths;
            const totalInterest = totalAmount - principal;
            
            this.updateFinancialResults(emi, totalInterest, totalAmount);
        }
        
        // Add to history
        this.addToHistory(
            `EMI ₹${this.formatNumber(principal/100000)}L @${annualRate}%`,
            this.formatCurrency(document.getElementById('emiAmount')?.textContent || '0'),
            'financial'
        );
    }
    
    updateFinancialResults(emi, totalInterest, totalAmount) {
        const emiAmountEl = document.getElementById('emiAmount');
        const totalInterestEl = document.getElementById('totalInterest');
        const totalAmountEl = document.getElementById('totalAmount');
        
        if (emiAmountEl) emiAmountEl.textContent = this.formatCurrency(emi);
        if (totalInterestEl) totalInterestEl.textContent = this.formatCurrency(totalInterest);
        if (totalAmountEl) totalAmountEl.textContent = this.formatCurrency(totalAmount);
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    formatNumber(number) {
        return new Intl.NumberFormat('en-IN').format(number);
    }
    
    // Display Methods
    updateDisplay() {
        const displays = {
            basic: document.getElementById('basicDisplay'),
            scientific: document.getElementById('scientificDisplay'),
            programmer: document.getElementById('programmerDisplay')
        };
        
        const secondaryDisplays = {
            basic: document.getElementById('basicSecondary'),
            scientific: document.getElementById('scientificSecondary')
        };
        
        const currentDisplay = displays[this.currentCalculator];
        const currentSecondary = secondaryDisplays[this.currentCalculator];
        
        if (currentDisplay) {
            currentDisplay.textContent = this.formatDisplayValue(this.currentValue);
        }
        
        if (currentSecondary) {
            currentSecondary.textContent = this.expression || '0';
        }
        
        if (this.currentCalculator === 'programmer') {
            this.updateProgrammerDisplay();
        }
    }
    
    formatDisplayValue(value) {
        if (value === '' || value === null || value === undefined) return '0';
        
        const num = parseFloat(value);
        if (isNaN(num)) return value;
        
        if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-6 && num !== 0)) {
            return num.toExponential(6);
        }
        
        return num.toString();
    }
    
    updateExpression() {
        if (this.operation && this.previousValue !== null) {
            this.expression = `${this.previousValue} ${this.getOperatorSymbol(this.operation)}`;
        }
    }
    
    getOperatorSymbol(operator) {
        const symbols = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷',
            '**': '^',
            '&': 'AND',
            '|': 'OR',
            '^': 'XOR'
        };
        return symbols[operator] || operator;
    }
    
    // History Methods
    addToHistory(expression, result, type) {
        const historyItem = {
            id: Date.now(),
            expression,
            result,
            type,
            timestamp: new Date().toISOString(),
            favorite: false
        };
        
        this.history.unshift(historyItem);
        
        // Keep only last 50 items
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.saveHistory();
        this.renderHistory();
    }
    
    renderHistory() {
        const container = document.getElementById('historyList');
        if (!container) return;
        
        if (this.history.length === 0) {
            container.innerHTML = '<div class="no-history">No calculations yet</div>';
            return;
        }
        
        container.innerHTML = this.history.map(item => `
            <div class="history-item ${item.favorite ? 'favorite' : ''}" data-id="${item.id}">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
                <div class="history-type">${item.type}</div>
                <button class="favorite-btn" title="Toggle favorite">
                    ${item.favorite ? '⭐' : '☆'}
                </button>
            </div>
        `).join('');
    }
    
    useHistoryItem(item) {
        const resultElement = item.querySelector('.history-result');
        if (resultElement) {
            const result = resultElement.textContent.replace('= ', '').replace('₹', '').replace(/,/g, '');
            this.currentValue = result;
            this.waitingForNewNumber = true;
            this.updateDisplay();
            this.showToast('Loaded from history');
        }
    }
    
    toggleFavorite(item) {
        const id = parseInt(item.dataset.id);
        const historyItem = this.history.find(h => h.id === id);
        
        if (historyItem) {
            historyItem.favorite = !historyItem.favorite;
            this.saveHistory();
            this.renderHistory();
            this.triggerHapticFeedback();
        }
    }
    
    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.renderHistory();
        this.showToast('History cleared');
    }
    
    loadHistory() {
        try {
            const saved = localStorage.getItem('aapki-calculator-history');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }
    
    saveHistory() {
        try {
            localStorage.setItem('aapki-calculator-history', JSON.stringify(this.history));
        } catch (e) {
            console.warn('Unable to save history');
        }
    }
    
    // Gesture Methods
    swipeLeft() {
        const calculators = ['basic', 'scientific', 'programmer', 'financial'];
        const currentIndex = calculators.indexOf(this.currentCalculator);
        const nextIndex = (currentIndex + 1) % calculators.length;
        this.switchCalculator(calculators[nextIndex]);
    }
    
    swipeRight() {
        const calculators = ['basic', 'scientific', 'programmer', 'financial'];
        const currentIndex = calculators.indexOf(this.currentCalculator);
        const prevIndex = currentIndex === 0 ? calculators.length - 1 : currentIndex - 1;
        this.switchCalculator(calculators[prevIndex]);
    }
    
    pullDown() {
        if (this.currentCalculator !== 'history') {
            this.clearAll();
            this.triggerHapticFeedback([50, 50, 50]);
        }
    }
    
    showContextMenu(button) {
        // Long press context menu for additional options
        const action = button.dataset.action;
        if (action === 'clear') {
            this.clearAll();
            this.showToast('Long press: Calculator cleared');
        } else {
            this.showToast('Long press detected');
        }
        this.triggerHapticFeedback([100]);
    }
    
    // Keyboard Support
    handleKeyboard(e) {
        const key = e.key;
        
        // Prevent default for calculator keys
        if (/[0-9+\-*/.=]/.test(key) || ['Enter', 'Escape', 'Backspace'].includes(key)) {
            e.preventDefault();
        }
        
        if (/[0-9]/.test(key)) {
            this.inputNumber(key);
        } else if (key === '.') {
            this.performAction('decimal');
        } else if (key === '+') {
            this.performAction('add');
        } else if (key === '-') {
            this.performAction('subtract');
        } else if (key === '*') {
            this.performAction('multiply');
        } else if (key === '/') {
            this.performAction('divide');
        } else if (key === 'Enter' || key === '=') {
            this.performAction('equals');
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            this.performAction('clear');
        } else if (key === 'Backspace') {
            this.performAction('backspace');
        }
    }
    
    // Utility Methods
    resetCalculator() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.waitingForNewNumber = false;
        this.expression = '';
    }
    
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }
    
    showInstallPrompt(e) {
        // Show custom install prompt
        this.showToast('Add to home screen for app-like experience!');
        
        setTimeout(() => {
            e.prompt();
        }, 1000);
    }
    
    loadCalculatorState() {
        try {
            const saved = localStorage.getItem('aapki-calculator-state');
            if (saved) {
                const state = JSON.parse(saved);
                this.currentValue = state.currentValue || '0';
                this.currentCalculator = state.currentCalculator || 'basic';
            }
        } catch (e) {
            console.warn('Unable to load calculator state');
        }
    }
    
    saveCalculatorState() {
        try {
            const state = {
                currentValue: this.currentValue,
                currentCalculator: this.currentCalculator
            };
            localStorage.setItem('aapki-calculator-state', JSON.stringify(state));
        } catch (e) {
            console.warn('Unable to save calculator state');
        }
    }
}

// Initialize the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new MobileCalculator();
    
    // Save state on page unload
    window.addEventListener('beforeunload', () => {
        if (window.calculator) {
            window.calculator.saveCalculatorState();
        }
    });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (window.calculator) {
                window.calculator.updateDisplay();
            }
        }, 100);
    });
    
    // Handle visibility changes (for PWA)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && window.calculator) {
            window.calculator.updateDisplay();
        }
    });
});

// Add CSS for additional features
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .no-history {
        text-align: center;
        padding: var(--space-24);
        color: var(--color-text-secondary);
        font-style: italic;
    }
    
    .toast.info {
        background: var(--color-info);
    }
    
    .btn.active {
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
    }
`;
document.head.appendChild(additionalStyles);