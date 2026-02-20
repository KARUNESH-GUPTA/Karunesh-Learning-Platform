// Smart Notepad Application
class SmartNotepad {
    constructor() {
        // In-memory storage (session-based)
        this.storage = {
            notes: [],
            settings: {
                theme: 'light',
                fontFamily: 'Arial',
                textColor: '#333333',
                backgroundColor: '#ffffff'
            },
            gallery: [],
            user: { username: '', isLoggedIn: false }
        };

        this.currentNoteId = null;
        this.currentImageIndex = 0;
        this.noteIdCounter = 1;
        this.imageIdCounter = 1;

        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.checkLoginStatus();
        this.updateStats();
    }

    // Storage methods (in-memory simulation)
    loadFromStorage() {
        // Simulate loading from storage - in real app this would use localStorage
        // For demo purposes, add some sample data
        if (this.storage.notes.length === 0) {
            this.storage.notes = [
                {
                    id: 1,
                    title: 'Welcome to Smart Notepad',
                    content: 'This is your first note! You can edit, format, and organize your notes here.',
                    date: new Date().toLocaleDateString(),
                    pinned: true
                }
            ];
            this.noteIdCounter = 2;
        }
    }

    saveToStorage() {
        // In a real application, this would save to localStorage
        // For now, data persists only during the session
        console.log('Data saved to memory:', this.storage);
    }

    // Authentication
    checkLoginStatus() {
        if (this.storage.user.isLoggedIn) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('dashboard').classList.add('hidden');
    }

    showDashboard() {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        this.renderNotes();
        this.renderGallery();
        this.updateStats();
    }

    login(username, password) {
        // Dummy validation - accept any non-empty credentials
        if (username.trim() && password.trim()) {
            this.storage.user = { username, isLoggedIn: true };
            this.saveToStorage();
            this.showDashboard();
            return true;
        }
        return false;
    }

    logout() {
        this.storage.user = { username: '', isLoggedIn: false };
        this.saveToStorage();
        this.showLogin();
    }

    // Navigation
    switchSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show selected section
        document.getElementById(`${sectionName}Section`).classList.add('active');
        
        // Add active class to selected nav link
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Close sidebar on mobile
        this.closeSidebar();
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open');
    }

    // Notes Management
    renderNotes() {
        const grid = document.getElementById('notesGrid');
        const notes = this.getFilteredNotes();
        
        if (notes.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-sticky-note"></i>
                    <h3>No notes found</h3>
                    <p>Create your first note to get started!</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = notes.map(note => `
            <div class="note-card ${note.pinned ? 'pinned' : ''}" data-id="${note.id}">
                <div class="note-header">
                    <h3 class="note-title">${this.escapeHtml(note.title)}</h3>
                    <div class="note-actions">
                        <button class="note-btn pin-btn ${note.pinned ? 'pinned' : ''}" data-id="${note.id}" title="${note.pinned ? 'Unpin' : 'Pin'}">
                            <i class="fas fa-thumbtack"></i>
                        </button>
                        <button class="note-btn edit-btn" data-id="${note.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="note-btn export-btn" data-id="${note.id}" title="Export">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="note-btn delete-btn" data-id="${note.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="note-content">${this.stripHtml(note.content)}</div>
                <div class="note-date">${note.date}</div>
            </div>
        `).join('');

        this.attachNoteEventListeners();
    }

    getFilteredNotes() {
        const searchTerm = document.getElementById('searchNotes').value.toLowerCase();
        let filtered = this.storage.notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) || 
            note.content.toLowerCase().includes(searchTerm)
        );

        // Sort: pinned notes first, then by date
        return filtered.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.date) - new Date(a.date);
        });
    }

    attachNoteEventListeners() {
        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editNote(parseInt(btn.dataset.id));
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.confirmDeleteNote(parseInt(btn.dataset.id));
            });
        });

        // Pin buttons
        document.querySelectorAll('.pin-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePin(parseInt(btn.dataset.id));
            });
        });

        // Export buttons
        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.exportNote(parseInt(btn.dataset.id));
            });
        });

        // Note cards (click to edit)
        document.querySelectorAll('.note-card').forEach(card => {
            card.addEventListener('click', () => {
                this.editNote(parseInt(card.dataset.id));
            });
        });
    }

    addNote() {
        this.currentNoteId = null;
        document.getElementById('noteModalTitle').textContent = 'Add New Note';
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteEditor').innerHTML = '';
        this.showModal('noteModal');
    }

    editNote(id) {
        const note = this.storage.notes.find(n => n.id === id);
        if (!note) return;

        this.currentNoteId = id;
        document.getElementById('noteModalTitle').textContent = 'Edit Note';
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteEditor').innerHTML = note.content;
        this.showModal('noteModal');
    }

    saveNote() {
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteEditor').innerHTML.trim();

        if (!title) {
            alert('Please enter a note title');
            return;
        }

        const noteData = {
            title,
            content: content || '',
            date: new Date().toLocaleDateString()
        };

        if (this.currentNoteId) {
            // Update existing note
            const index = this.storage.notes.findIndex(n => n.id === this.currentNoteId);
            if (index !== -1) {
                this.storage.notes[index] = { ...this.storage.notes[index], ...noteData };
            }
        } else {
            // Create new note
            noteData.id = this.noteIdCounter++;
            noteData.pinned = false;
            this.storage.notes.push(noteData);
        }

        this.saveToStorage();
        this.renderNotes();
        this.hideModal('noteModal');
        this.updateStats();
    }

    confirmDeleteNote(id) {
        const note = this.storage.notes.find(n => n.id === id);
        if (!note) return;

        document.getElementById('confirmMessage').textContent = 
            `Are you sure you want to delete "${note.title}"?`;
        
        this.showModal('confirmModal');
        
        document.getElementById('confirmYes').onclick = () => {
            this.deleteNote(id);
            this.hideModal('confirmModal');
        };
    }

    deleteNote(id) {
        this.storage.notes = this.storage.notes.filter(n => n.id !== id);
        this.saveToStorage();
        this.renderNotes();
        this.updateStats();
    }

    togglePin(id) {
        const note = this.storage.notes.find(n => n.id === id);
        if (note) {
            note.pinned = !note.pinned;
            this.saveToStorage();
            this.renderNotes();
        }
    }

    exportNote(id) {
        const note = this.storage.notes.find(n => n.id === id);
        if (!note) return;

        const content = `${note.title}\n\n${this.stripHtml(note.content)}\n\nCreated: ${note.date}`;
        this.downloadFile(`${note.title}.txt`, content);
    }

    // Gallery Management
    renderGallery() {
        const grid = document.getElementById('galleryGrid');
        
        if (this.storage.gallery.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-images"></i>
                    <h3>No images uploaded</h3>
                    <p>Upload your first image to get started!</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.storage.gallery.map((image, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${image.data}" alt="${image.name}" />
                <div class="gallery-actions">
                    <button class="gallery-btn view-btn" data-index="${index}" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="gallery-btn delete-img-btn" data-index="${index}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        this.attachGalleryEventListeners();
    }

    attachGalleryEventListeners() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.viewImage(parseInt(btn.dataset.index));
            });
        });

        document.querySelectorAll('.delete-img-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.confirmDeleteImage(parseInt(btn.dataset.index));
            });
        });

        document.querySelectorAll('.gallery-item img').forEach((img, index) => {
            img.addEventListener('click', () => this.viewImage(index));
        });
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageData = {
                        id: this.imageIdCounter++,
                        name: file.name,
                        data: e.target.result,
                        uploadDate: new Date().toLocaleDateString()
                    };
                    this.storage.gallery.push(imageData);
                    this.saveToStorage();
                    this.renderGallery();
                    this.updateStats();
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file (JPG, PNG, GIF)');
            }
        });
    }

    triggerFileUpload() {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    viewImage(index) {
        this.currentImageIndex = index;
        const image = this.storage.gallery[index];
        document.getElementById('modalImage').src = image.data;
        this.showModal('imageModal');
    }

    prevImage() {
        if (this.storage.gallery.length === 0) return;
        this.currentImageIndex = (this.currentImageIndex - 1 + this.storage.gallery.length) % this.storage.gallery.length;
        this.viewImage(this.currentImageIndex);
    }

    nextImage() {
        if (this.storage.gallery.length === 0) return;
        this.currentImageIndex = (this.currentImageIndex + 1) % this.storage.gallery.length;
        this.viewImage(this.currentImageIndex);
    }

    confirmDeleteImage(index) {
        const image = this.storage.gallery[index];
        document.getElementById('confirmMessage').textContent = 
            `Are you sure you want to delete "${image.name}"?`;
        
        this.showModal('confirmModal');
        
        document.getElementById('confirmYes').onclick = () => {
            this.deleteImage(index);
            this.hideModal('confirmModal');
        };
    }

    deleteImage(index) {
        this.storage.gallery.splice(index, 1);
        this.saveToStorage();
        this.renderGallery();
        this.updateStats();
    }

    // Customization
    applyTheme(themeName) {
        document.body.className = `theme-${themeName}`;
        this.storage.settings.theme = themeName;
        this.saveToStorage();
        this.updateThemeUI();
        this.updateStats();
    }

    updateThemeUI() {
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        const activeTheme = document.querySelector(`[data-theme="${this.storage.settings.theme}"]`);
        if (activeTheme) {
            activeTheme.classList.add('active');
        }
    }

    applySettings() {
        const fontFamily = document.getElementById('fontFamily').value;
        const textColor = document.getElementById('textColor').value;
        const backgroundColor = document.getElementById('backgroundColor').value;

        this.storage.settings.fontFamily = fontFamily;
        this.storage.settings.textColor = textColor;
        this.storage.settings.backgroundColor = backgroundColor;

        // Apply font family to notes
        document.documentElement.style.setProperty('--custom-font-family', fontFamily);
        
        this.saveToStorage();
        alert('Settings applied successfully!');
    }

    resetSettings() {
        this.storage.settings = {
            theme: 'light',
            fontFamily: 'Arial',
            textColor: '#333333',
            backgroundColor: '#ffffff'
        };

        document.getElementById('fontFamily').value = this.storage.settings.fontFamily;
        document.getElementById('textColor').value = this.storage.settings.textColor;
        document.getElementById('backgroundColor').value = this.storage.settings.backgroundColor;

        this.applyTheme('light');
        this.saveToStorage();
        alert('Settings reset to default!');
    }

    // Rich Text Editor
    setupEditor() {
        const editor = document.getElementById('noteEditor');
        const toolbar = document.querySelector('.editor-toolbar');

        // Toolbar button handlers
        toolbar.addEventListener('click', (e) => {
            if (e.target.matches('.toolbar-btn') || e.target.parentElement.matches('.toolbar-btn')) {
                e.preventDefault();
                const button = e.target.matches('.toolbar-btn') ? e.target : e.target.parentElement;
                const command = button.dataset.command;
                document.execCommand(command, false, null);
                this.updateToolbarState();
                editor.focus();
            }
        });

        // Font size handler
        document.getElementById('fontSize').addEventListener('change', (e) => {
            document.execCommand('fontSize', false, '7');
            const fontElements = document.querySelectorAll('font[size="7"]');
            fontElements.forEach(el => {
                el.removeAttribute('size');
                el.style.fontSize = e.target.value;
            });
            editor.focus();
        });

        // Text color handler
        document.getElementById('textColorPicker').addEventListener('change', (e) => {
            document.execCommand('foreColor', false, e.target.value);
            editor.focus();
        });

        // Update toolbar state when selection changes
        editor.addEventListener('mouseup', () => this.updateToolbarState());
        editor.addEventListener('keyup', () => this.updateToolbarState());
        editor.addEventListener('focus', () => this.updateToolbarState());
    }

    updateToolbarState() {
        const commands = ['bold', 'italic', 'underline'];
        commands.forEach(command => {
            const button = document.querySelector(`[data-command="${command}"]`);
            if (button) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input if available
        const firstInput = modal.querySelector('input, textarea, [contenteditable]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Utility Functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    stripHtml(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    updateStats() {
        document.getElementById('totalNotes').textContent = this.storage.notes.length;
        document.getElementById('totalImages').textContent = this.storage.gallery.length;
        document.getElementById('currentTheme').textContent = 
            this.storage.settings.theme.charAt(0).toUpperCase() + this.storage.settings.theme.slice(1);
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (this.login(username, password)) {
                // Login successful
            } else {
                alert('Please enter valid credentials');
            }
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.dataset.section);
            });
        });

        // Mobile menu toggle
        document.getElementById('menuToggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Notes
        document.getElementById('addNoteBtn').addEventListener('click', () => {
            this.addNote();
        });

        document.getElementById('searchNotes').addEventListener('input', () => {
            this.renderNotes();
        });

        document.getElementById('saveNote').addEventListener('click', () => {
            this.saveNote();
        });

        document.getElementById('cancelNote').addEventListener('click', () => {
            this.hideModal('noteModal');
        });

        // Gallery - Fixed file upload handlers
        document.getElementById('uploadImageBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerFileUpload();
        });

        document.getElementById('imageInput').addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                this.handleFileUpload(e.target.files);
                e.target.value = ''; // Reset input to allow same file upload again
            }
        });

        // Drag and drop - Fixed event handling
        const uploadArea = document.getElementById('uploadArea');
        
        uploadArea.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerFileUpload();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadArea.classList.remove('drag-over');
            
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                this.handleFileUpload(e.dataTransfer.files);
            }
        });

        // Image modal navigation
        document.getElementById('prevImage').addEventListener('click', () => {
            this.prevImage();
        });

        document.getElementById('nextImage').addEventListener('click', () => {
            this.nextImage();
        });

        // Customization
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                this.applyTheme(option.dataset.theme);
            });
        });

        document.getElementById('applySettings').addEventListener('click', () => {
            this.applySettings();
        });

        document.getElementById('resetSettings').addEventListener('click', () => {
            this.resetSettings();
        });

        // Theme toggle in header
        document.getElementById('themeToggle').addEventListener('click', () => {
            const currentTheme = this.storage.settings.theme;
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                this.hideModal(modal.id);
            });
        });

        document.getElementById('confirmNo').addEventListener('click', () => {
            this.hideModal('confirmModal');
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
        });

        // Setup rich text editor
        this.setupEditor();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                if (!document.getElementById('noteModal').classList.contains('hidden')) {
                    this.saveNote();
                }
            }
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                if (document.querySelector('.content-section.active').id === 'notesSection') {
                    this.addNote();
                }
            }
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
                    this.hideModal(modal.id);
                });
            }
        });

        // Auto-save (every 30 seconds)
        setInterval(() => {
            if (!document.getElementById('noteModal').classList.contains('hidden')) {
                this.saveToStorage();
            }
        }, 30000);

        // Initialize theme UI
        setTimeout(() => {
            this.updateThemeUI();
        }, 100);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.smartNotepad = new SmartNotepad();
});