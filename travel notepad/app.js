// VoyageLog - Travel Journal Application
class VoyageLog {
    constructor() {
        this.currentPage = 'dashboard';
        this.currentEntry = null;
        this.editingEntryId = null;
        this.autoSaveTimer = null;
        this.lightboxIndex = 0;
        this.lightboxImages = [];
        
        // Sample images data
        this.sampleImages = [
            {
                id: 'sample_1',
                name: 'Taj Mahal Romance',
                dataURL: 'https://i0.wp.com/globetrottingsu.com/wp-content/uploads/2020/10/Love-Taj-Mahal.jpg?resize=819%2C1024&ssl=1',
                source: 'demo',
                description: 'Romantic sunset view of the iconic Taj Mahal'
            },
            {
                id: 'sample_2',
                name: 'Tropical Paradise',
                dataURL: 'https://pplx-res.cloudinary.com/image/upload/v1759354055/pplx_project_search_images/d571320ac17eca1a326fed15113d726b633e4b71.png',
                source: 'demo',
                description: 'Serene tropical beach at sunset with hanging chair'
            },
            {
                id: 'sample_3',
                name: 'Himalayan Serenity',
                dataURL: 'https://i0.wp.com/www.beyondmyborder.com/wp-content/uploads/2017/11/DSC_8208.jpg?resize=1000%2C667&ssl=1',
                source: 'demo',
                description: 'Breathtaking Himalayan mountains reflected in pristine lake'
            },
            {
                id: 'sample_4',
                name: 'European Charm',
                dataURL: 'https://pplx-res.cloudinary.com/image/upload/v1759354055/pplx_project_search_images/cbad77b346cca4479d45c61df91ab1ca114c909b.png',
                source: 'demo',
                description: 'Charming cobblestone street in historic European town'
            },
            {
                id: 'sample_5',
                name: 'Cherry Blossom Path',
                dataURL: 'https://pplx-res.cloudinary.com/image/upload/v1759354054/pplx_project_search_images/85c64a164484772988254bea5cb2b35acfc6ac3e.png',
                source: 'demo',
                description: 'Beautiful cherry blossom lined pathway in Japan'
            }
        ];
        
        this.init();
    }

    init() {
        this.initializeStorage();
        this.loadSettings();
        this.bindEvents();
        this.loadPage(this.currentPage);
        this.updateStats();
        this.setupAutoSave();
    }

    // Storage Management
    initializeStorage() {
        if (!localStorage.getItem('voyagelog_version')) {
            // First time setup - add sample data
            this.addSampleData();
            localStorage.setItem('voyagelog_version', '1.0.0');
        }
    }

    addSampleData() {
        const sampleEntries = [
            {
                id: 'entry_' + Date.now() + '_1',
                title: 'Magical Evening at the Taj Mahal',
                date: '2024-03-15',
                location: 'Agra, India',
                tags: ['india', 'architecture', 'sunset', 'romantic'],
                mood: '😍',
                content: '<p>Witnessing the Taj Mahal at sunset was absolutely breathtaking. The way the marble seemed to glow in the golden light was pure magic. The intricate carvings and the love story behind this monument made it even more special.</p><p>Standing in that archway, watching couples from around the world share this moment, reminded me why travel is so important - it connects us to history, beauty, and each other.</p>',
                images: [this.sampleImages[0]],
                pinned: true,
                createdAt: new Date('2024-03-15').toISOString(),
                updatedAt: new Date('2024-03-15').toISOString()
            },
            {
                id: 'entry_' + Date.now() + '_2',
                title: 'Paradise Found in the Maldives',
                date: '2024-02-08',
                location: 'Maldives',
                tags: ['beach', 'tropical', 'relaxation', 'paradise'],
                mood: '🏝️',
                content: '<p>The crystal clear waters and pristine beaches of the Maldives exceeded all expectations. Spending time in that hanging chair under the palm tree watching the sunset painted the sky in amazing colors.</p><p>This place truly feels like paradise on earth. The tranquility and natural beauty here is unmatched.</p>',
                images: [this.sampleImages[1]],
                pinned: false,
                createdAt: new Date('2024-02-08').toISOString(),
                updatedAt: new Date('2024-02-08').toISOString()
            },
            {
                id: 'entry_' + Date.now() + '_3',
                title: 'Himalayan Adventure Trek',
                date: '2024-01-20',
                location: 'Himalayas, Nepal',
                tags: ['mountains', 'trekking', 'adventure', 'nature'],
                mood: '🏔️',
                content: '<p>The trek through the Himalayas was challenging but incredibly rewarding. The reflection of snow-capped peaks in the alpine lake created a mirror-like perfection that photos can barely capture.</p><p>Every step of this journey tested my limits but filled my soul with peace and accomplishment.</p>',
                images: [this.sampleImages[2]],
                pinned: true,
                createdAt: new Date('2024-01-20').toISOString(),
                updatedAt: new Date('2024-01-20').toISOString()
            }
        ];

        // Save entries and ensure images are in gallery
        localStorage.setItem('voyagelog_entries', JSON.stringify(sampleEntries));
        
        // Initialize gallery with all sample images
        localStorage.setItem('voyagelog_images', JSON.stringify(this.sampleImages));
    }

    getEntries() {
        return JSON.parse(localStorage.getItem('voyagelog_entries') || '[]');
    }

    saveEntries(entries) {
        localStorage.setItem('voyagelog_entries', JSON.stringify(entries));
    }

    getImages() {
        return JSON.parse(localStorage.getItem('voyagelog_images') || '[]');
    }

    saveImages(images) {
        localStorage.setItem('voyagelog_images', JSON.stringify(images));
    }

    getSettings() {
        return JSON.parse(localStorage.getItem('voyagelog_settings') || '{}');
    }

    saveSettings(settings) {
        localStorage.setItem('voyagelog_settings', JSON.stringify(settings));
    }

    // Settings Management
    loadSettings() {
        const settings = this.getSettings();
        
        // Apply theme
        if (settings.theme) {
            document.documentElement.setAttribute('data-theme', settings.theme);
        }
        
        // Apply font
        if (settings.font) {
            document.documentElement.setAttribute('data-font', settings.font);
        }
        
        // Apply accessibility settings
        if (settings.reducedMotion) {
            document.documentElement.setAttribute('data-reduced-motion', 'true');
        }
        
        if (settings.compactSpacing) {
            document.documentElement.setAttribute('data-compact', 'true');
        }
    }

    // Event Binding
    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-link, .mobile-nav-btn').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.loadPage(page);
            });
        });

        // Sidebar toggle
        document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });

        // New entry button
        document.getElementById('new-entry-btn')?.addEventListener('click', () => {
            this.loadPage('new-entry');
        });

        // Entry form events
        this.bindEntryFormEvents();
        
        // Gallery events
        this.bindGalleryEvents();
        
        // Theme events
        this.bindThemeEvents();
        
        // Export events
        this.bindExportEvents();
        
        // Modal events
        this.bindModalEvents();
        
        // Search and filter events
        this.bindSearchEvents();
    }

    bindEntryFormEvents() {
        // Save entry
        document.getElementById('save-entry')?.addEventListener('click', () => {
            this.saveEntry();
        });

        // Cancel entry
        document.getElementById('cancel-entry')?.addEventListener('click', () => {
            this.cancelEntry();
        });

        // Rich text editor
        document.querySelectorAll('.editor-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.getAttribute('data-command');
                document.execCommand(command, false, null);
            });
        });

        // Image upload
        const dropZone = document.getElementById('image-drop-zone');
        const fileInput = document.getElementById('image-input');

        dropZone?.addEventListener('click', () => fileInput?.click());

        dropZone?.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone?.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone?.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            this.handleImageUpload(e.dataTransfer.files);
        });

        fileInput?.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files);
        });

        // Auto-fill current date
        const dateInput = document.getElementById('entry-date');
        if (dateInput && !dateInput.value) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }

    bindGalleryEvents() {
        document.getElementById('gallery-upload-btn')?.addEventListener('click', () => {
            document.getElementById('gallery-file-input')?.click();
        });

        document.getElementById('gallery-file-input')?.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files, true);
        });

        document.getElementById('sample-images-btn')?.addEventListener('click', () => {
            this.addSampleImagesToGallery();
        });
    }

    bindThemeEvents() {
        // Theme selection
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                this.applyTheme(theme);
            });
        });

        // Font selection
        document.getElementById('font-selector')?.addEventListener('change', (e) => {
            this.applyFont(e.target.value);
        });

        // Accessibility toggles
        document.getElementById('reduced-motion')?.addEventListener('change', (e) => {
            this.toggleReducedMotion(e.target.checked);
        });

        document.getElementById('compact-spacing')?.addEventListener('change', (e) => {
            this.toggleCompactSpacing(e.target.checked);
        });
    }

    bindExportEvents() {
        document.getElementById('export-json')?.addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('export-markdown')?.addEventListener('click', () => {
            this.exportMarkdown();
        });

        document.getElementById('import-data')?.addEventListener('click', () => {
            document.getElementById('import-file')?.click();
        });

        document.getElementById('import-file')?.addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });

        document.getElementById('clear-all-data')?.addEventListener('click', () => {
            this.confirmClearData();
        });
    }

    bindModalEvents() {
        // Entry modal
        document.getElementById('close-modal')?.addEventListener('click', () => {
            this.closeModal('entry-modal');
        });

        document.getElementById('modal-backdrop')?.addEventListener('click', () => {
            this.closeModal('entry-modal');
        });

        document.getElementById('edit-entry-btn')?.addEventListener('click', () => {
            this.editCurrentEntry();
        });

        document.getElementById('pin-entry-btn')?.addEventListener('click', () => {
            this.togglePinEntry();
        });

        // Lightbox
        document.getElementById('lightbox-close')?.addEventListener('click', () => {
            this.closeLightbox();
        });

        document.getElementById('lightbox-backdrop')?.addEventListener('click', () => {
            this.closeLightbox();
        });

        document.getElementById('lightbox-prev')?.addEventListener('click', () => {
            this.navigateLightbox(-1);
        });

        document.getElementById('lightbox-next')?.addEventListener('click', () => {
            this.navigateLightbox(1);
        });

        // Confirmation modal
        document.getElementById('confirm-cancel')?.addEventListener('click', () => {
            this.closeModal('confirm-modal');
        });

        document.getElementById('confirm-ok')?.addEventListener('click', () => {
            this.confirmAction();
        });
    }

    bindSearchEvents() {
        document.getElementById('entries-search')?.addEventListener('input', (e) => {
            this.searchEntries(e.target.value);
        });

        document.getElementById('entries-filter-tags')?.addEventListener('change', (e) => {
            this.filterEntries(e.target.value);
        });

        document.getElementById('entries-sort')?.addEventListener('change', (e) => {
            this.sortEntries(e.target.value);
        });

        document.getElementById('view-toggle')?.addEventListener('click', () => {
            this.toggleViewMode();
        });
    }

    // Page Navigation
    loadPage(pageName) {
        // Update navigation
        document.querySelectorAll('.nav-link, .mobile-nav-btn').forEach(link => {
            link.classList.remove('active');
        });
        
        document.querySelectorAll(`[data-page="${pageName}"]`).forEach(link => {
            link.classList.add('active');
        });

        // Show page
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        document.getElementById(`${pageName}-page`)?.classList.add('active');
        
        this.currentPage = pageName;

        // Load page-specific content
        switch (pageName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'new-entry':
                this.loadNewEntry();
                break;
            case 'entries':
                this.loadEntries();
                break;
            case 'gallery':
                this.loadGallery();
                break;
            case 'themes':
                this.loadThemes();
                break;
            case 'export':
                this.loadExport();
                break;
            case 'about':
                this.loadAbout();
                break;
        }
    }

    // Dashboard
    loadDashboard() {
        this.updateStats();
        this.loadRecentEntries();
        this.loadPinnedEntries();
    }

    updateStats() {
        const entries = this.getEntries();
        const images = this.getImages();
        const pinnedCount = entries.filter(entry => entry.pinned).length;

        document.getElementById('total-entries').textContent = entries.length;
        document.getElementById('total-photos').textContent = images.length;
        document.getElementById('pinned-entries').textContent = pinnedCount;
    }

    loadRecentEntries() {
        const entries = this.getEntries().slice(-6).reverse();
        const container = document.getElementById('recent-entries');
        container.innerHTML = '';

        entries.forEach(entry => {
            container.appendChild(this.createEntryCard(entry));
        });
    }

    loadPinnedEntries() {
        const pinnedEntries = this.getEntries().filter(entry => entry.pinned);
        const container = document.getElementById('pinned-entries-grid');
        const section = document.getElementById('pinned-section');
        
        if (pinnedEntries.length === 0) {
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
            container.innerHTML = '';
            pinnedEntries.forEach(entry => {
                container.appendChild(this.createEntryCard(entry));
            });
        }
    }

    createEntryCard(entry) {
        const card = document.createElement('div');
        card.className = 'entry-card';
        card.style.position = 'relative';

        const imageUrl = entry.images && entry.images.length > 0 
            ? entry.images[0].dataURL 
            : `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="#f0f0f0"/><text x="150" y="100" text-anchor="middle" fill="#666" font-family="Arial" font-size="16">📷 No Image</text></svg>')}`;

        const excerpt = this.extractTextFromHTML(entry.content).substring(0, 120) + '...';

        card.innerHTML = `
            ${entry.pinned ? '<div class="pin-indicator">📌 Pinned</div>' : ''}
            <img src="${imageUrl}" alt="${entry.title}" class="entry-card-image" loading="lazy">
            <div class="entry-card-content">
                <h3 class="entry-card-title">${entry.title}</h3>
                <div class="entry-card-meta">
                    <span>📅 ${this.formatDate(entry.date)}</span>
                    ${entry.location ? `<span>📍 ${entry.location}</span>` : ''}
                    <span>${entry.mood}</span>
                </div>
                <p class="entry-card-excerpt">${excerpt}</p>
                <div class="entry-card-tags">
                    ${entry.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            this.openEntryModal(entry);
        });

        return card;
    }

    // New Entry
    loadNewEntry() {
        if (!this.editingEntryId) {
            this.clearEntryForm();
            document.getElementById('entry-form-title').textContent = 'Create New Entry';
        }
    }

    clearEntryForm() {
        document.getElementById('entry-title').value = '';
        document.getElementById('entry-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('entry-location').value = '';
        document.getElementById('entry-tags').value = '';
        document.getElementById('entry-mood').value = '😊';
        document.getElementById('entry-content').innerHTML = '';
        document.getElementById('image-preview').innerHTML = '';
        this.editingEntryId = null;
    }

    loadEntryForEdit(entryId) {
        const entry = this.getEntries().find(e => e.id === entryId);
        if (!entry) return;

        this.editingEntryId = entryId;
        document.getElementById('entry-form-title').textContent = 'Edit Entry';
        document.getElementById('entry-title').value = entry.title;
        document.getElementById('entry-date').value = entry.date;
        document.getElementById('entry-location').value = entry.location || '';
        document.getElementById('entry-tags').value = entry.tags.join(', ');
        document.getElementById('entry-mood').value = entry.mood;
        document.getElementById('entry-content').innerHTML = entry.content;

        // Load images
        const imagePreview = document.getElementById('image-preview');
        imagePreview.innerHTML = '';
        entry.images.forEach(image => {
            this.addImagePreview(image);
        });
    }

    saveEntry() {
        const title = document.getElementById('entry-title').value.trim();
        const date = document.getElementById('entry-date').value;
        const location = document.getElementById('entry-location').value.trim();
        const tags = document.getElementById('entry-tags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);
        const mood = document.getElementById('entry-mood').value;
        const content = document.getElementById('entry-content').innerHTML;

        if (!title) {
            alert('Please enter a title for your entry.');
            return;
        }

        // Collect images
        const images = Array.from(document.querySelectorAll('#image-preview .image-preview-item'))
            .map(item => ({
                id: 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                name: item.dataset.name || 'Untitled',
                dataURL: item.querySelector('img').src,
                source: item.dataset.source || 'uploaded'
            }));

        const entry = {
            id: this.editingEntryId || 'entry_' + Date.now(),
            title,
            date,
            location,
            tags,
            mood,
            content,
            images,
            pinned: false,
            createdAt: this.editingEntryId ? 
                this.getEntries().find(e => e.id === this.editingEntryId)?.createdAt || new Date().toISOString() :
                new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save entry
        const entries = this.getEntries();
        if (this.editingEntryId) {
            const index = entries.findIndex(e => e.id === this.editingEntryId);
            if (index !== -1) {
                entry.pinned = entries[index].pinned; // Preserve pinned status
                entries[index] = entry;
            }
        } else {
            entries.push(entry);
        }
        this.saveEntries(entries);

        // Save images to gallery
        const allImages = this.getImages();
        images.forEach(image => {
            if (!allImages.find(img => img.id === image.id)) {
                allImages.push(image);
            }
        });
        this.saveImages(allImages);

        this.showAutoSaveIndicator('Entry saved successfully!');
        this.loadPage('dashboard');
    }

    cancelEntry() {
        if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            this.loadPage('dashboard');
        }
    }

    // Auto-save functionality
    setupAutoSave() {
        const content = document.getElementById('entry-content');
        if (content) {
            content.addEventListener('input', () => {
                this.scheduleAutoSave();
            });
        }
    }

    scheduleAutoSave() {
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }
        
        this.autoSaveTimer = setTimeout(() => {
            this.autoSave();
        }, 15000); // Auto-save after 15 seconds of inactivity
    }

    autoSave() {
        const title = document.getElementById('entry-title')?.value.trim();
        if (!title) return; // Don't auto-save without a title

        // Save as draft
        const draft = {
            title: title,
            date: document.getElementById('entry-date')?.value,
            location: document.getElementById('entry-location')?.value.trim(),
            tags: document.getElementById('entry-tags')?.value,
            mood: document.getElementById('entry-mood')?.value,
            content: document.getElementById('entry-content')?.innerHTML,
            timestamp: Date.now()
        };

        localStorage.setItem('voyagelog_draft', JSON.stringify(draft));
        this.showAutoSaveIndicator();
    }

    showAutoSaveIndicator(message = '💾 Auto-saved') {
        const indicator = document.getElementById('autosave-indicator');
        if (indicator) {
            indicator.querySelector('span').textContent = message;
            indicator.classList.add('show');
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 2000);
        }
    }

    // Image handling
    async handleImageUpload(files, addToGallery = false) {
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                try {
                    const compressedImage = await this.compressImage(file);
                    if (addToGallery) {
                        this.addImageToGallery(compressedImage);
                    } else {
                        this.addImagePreview(compressedImage);
                    }
                } catch (error) {
                    console.error('Error processing image:', error);
                }
            }
        }
    }

    compressImage(file) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                const maxWidth = 2048;
                const scale = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
                
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                const dataURL = canvas.toDataURL('image/jpeg', 0.8);
                resolve({
                    id: 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    dataURL: dataURL,
                    source: 'uploaded'
                });
            };

            img.src = URL.createObjectURL(file);
        });
    }

    addImagePreview(image) {
        const preview = document.getElementById('image-preview');
        const item = document.createElement('div');
        item.className = 'image-preview-item';
        item.dataset.name = image.name;
        item.dataset.source = image.source;

        item.innerHTML = `
            <img src="${image.dataURL}" alt="${image.name}">
            <button type="button" class="image-remove" onclick="this.parentElement.remove()">×</button>
        `;

        preview.appendChild(item);
    }

    addImageToGallery(image) {
        const images = this.getImages();
        images.push(image);
        this.saveImages(images);
        this.loadGallery();
    }

    addSampleImagesToGallery() {
        const images = this.getImages();
        let addedCount = 0;

        this.sampleImages.forEach(sampleImage => {
            if (!images.find(img => img.id === sampleImage.id)) {
                images.push(sampleImage);
                addedCount++;
            }
        });

        if (addedCount > 0) {
            this.saveImages(images);
            this.loadGallery();
            alert(`Added ${addedCount} sample images to your gallery!`);
        } else {
            alert('Sample images are already in your gallery!');
        }
    }

    // Entries page
    loadEntries() {
        this.populateTagFilter();
        this.displayEntries();
    }

    populateTagFilter() {
        const entries = this.getEntries();
        const allTags = [...new Set(entries.flatMap(entry => entry.tags))];
        const select = document.getElementById('entries-filter-tags');
        
        select.innerHTML = '<option value="">All Tags</option>';
        allTags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            select.appendChild(option);
        });
    }

    displayEntries(filteredEntries = null) {
        const entries = filteredEntries || this.getEntries();
        const container = document.getElementById('entries-list');
        container.innerHTML = '';

        if (entries.length === 0) {
            container.innerHTML = '<p>No entries found. Start your travel journal by creating your first entry!</p>';
            return;
        }

        entries.forEach(entry => {
            container.appendChild(this.createEntryCard(entry));
        });
    }

    searchEntries(query) {
        if (!query.trim()) {
            this.displayEntries();
            return;
        }

        const entries = this.getEntries();
        const filtered = entries.filter(entry => {
            const searchText = (entry.title + ' ' + entry.location + ' ' + entry.tags.join(' ') + ' ' + this.extractTextFromHTML(entry.content)).toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        this.displayEntries(filtered);
    }

    filterEntries(tag) {
        if (!tag) {
            this.displayEntries();
            return;
        }

        const entries = this.getEntries();
        const filtered = entries.filter(entry => entry.tags.includes(tag));
        this.displayEntries(filtered);
    }

    sortEntries(sortBy) {
        const entries = this.getEntries();
        
        switch (sortBy) {
            case 'newest':
                entries.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                entries.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'title':
                entries.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        this.displayEntries(entries);
    }

    toggleViewMode() {
        const container = document.getElementById('entries-list');
        const button = document.getElementById('view-toggle');
        
        if (container.classList.contains('entries-grid')) {
            container.className = 'entries-list-view';
            button.textContent = '📋 Grid View';
        } else {
            container.className = 'entries-grid';
            button.textContent = '📋 List View';
        }
    }

    // Gallery
    loadGallery() {
        console.log('Loading gallery...'); // Debug log
        const images = this.getImages();
        console.log('Images found:', images.length); // Debug log
        
        const container = document.getElementById('gallery-grid');
        const countEl = document.getElementById('gallery-count');
        
        if (!container) {
            console.error('Gallery container not found');
            return;
        }
        
        countEl.textContent = `${images.length} photos in your collection`;
        container.innerHTML = '';

        if (images.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--theme-text-secondary);"><p>No photos yet. Upload some images or add sample photos to get started!</p></div>';
            return;
        }

        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.minHeight = '200px'; // Ensure minimum height
            
            const img = document.createElement('img');
            img.src = image.dataURL;
            img.alt = image.name;
            img.loading = 'lazy';
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            
            // Handle image load errors
            img.onerror = () => {
                console.error('Failed to load image:', image.name);
                img.src = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="#f0f0f0"/><text x="150" y="100" text-anchor="middle" fill="#666" font-family="Arial" font-size="16">📷 Failed to Load</text></svg>')}`;
            };
            
            const overlay = document.createElement('div');
            overlay.className = 'gallery-item-overlay';
            overlay.innerHTML = `
                <h4>${image.name}</h4>
                <p>${image.description || 'No description'}</p>
            `;
            
            item.appendChild(img);
            item.appendChild(overlay);

            item.addEventListener('click', () => {
                this.openLightbox(images, index);
            });

            container.appendChild(item);
        });
        
        console.log('Gallery loaded with', images.length, 'images'); // Debug log
    }

    // Themes
    loadThemes() {
        const settings = this.getSettings();
        
        // Update theme selection
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-theme') === (settings.theme || 'light')) {
                option.classList.add('active');
            }
        });

        // Update font selection
        const fontSelect = document.getElementById('font-selector');
        if (fontSelect) {
            fontSelect.value = settings.font || 'Inter';
        }

        // Update accessibility settings
        const reducedMotionEl = document.getElementById('reduced-motion');
        const compactSpacingEl = document.getElementById('compact-spacing');
        
        if (reducedMotionEl) reducedMotionEl.checked = settings.reducedMotion || false;
        if (compactSpacingEl) compactSpacingEl.checked = settings.compactSpacing || false;
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        const settings = this.getSettings();
        settings.theme = theme;
        this.saveSettings(settings);

        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    }

    applyFont(font) {
        document.documentElement.setAttribute('data-font', font);
        
        const settings = this.getSettings();
        settings.font = font;
        this.saveSettings(settings);
    }

    toggleReducedMotion(enabled) {
        document.documentElement.setAttribute('data-reduced-motion', enabled ? 'true' : 'false');
        
        const settings = this.getSettings();
        settings.reducedMotion = enabled;
        this.saveSettings(settings);
    }

    toggleCompactSpacing(enabled) {
        document.documentElement.setAttribute('data-compact', enabled ? 'true' : 'false');
        
        const settings = this.getSettings();
        settings.compactSpacing = enabled;
        this.saveSettings(settings);
    }

    // Export/Import
    loadExport() {
        // Page loads automatically
    }

    exportData() {
        const data = {
            entries: this.getEntries(),
            images: this.getImages(),
            settings: this.getSettings(),
            version: '1.0.0',
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `voyagelog_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    exportMarkdown() {
        const entries = this.getEntries();
        let markdown = '# VoyageLog Travel Journal\n\n';
        markdown += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

        entries.forEach(entry => {
            markdown += `## ${entry.title}\n\n`;
            markdown += `**Date:** ${this.formatDate(entry.date)}\n`;
            if (entry.location) markdown += `**Location:** ${entry.location}\n`;
            markdown += `**Mood:** ${entry.mood}\n`;
            if (entry.tags.length > 0) markdown += `**Tags:** ${entry.tags.join(', ')}\n`;
            markdown += '\n';
            markdown += this.extractTextFromHTML(entry.content);
            markdown += '\n\n---\n\n';
        });

        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `voyagelog_entries_${new Date().toISOString().split('T')[0]}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importData(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.entries && data.images) {
                    if (confirm('This will replace all current data. Are you sure?')) {
                        localStorage.setItem('voyagelog_entries', JSON.stringify(data.entries));
                        localStorage.setItem('voyagelog_images', JSON.stringify(data.images));
                        if (data.settings) {
                            localStorage.setItem('voyagelog_settings', JSON.stringify(data.settings));
                        }
                        
                        alert('Data imported successfully!');
                        location.reload();
                    }
                } else {
                    alert('Invalid backup file format.');
                }
            } catch (error) {
                alert('Error reading backup file.');
            }
        };
        reader.readAsText(file);
    }

    confirmClearData() {
        this.showConfirmModal(
            'Clear All Data',
            'This will permanently delete all your entries, photos, and settings. This action cannot be undone.',
            () => this.clearAllData()
        );
    }

    clearAllData() {
        localStorage.removeItem('voyagelog_entries');
        localStorage.removeItem('voyagelog_images');
        localStorage.removeItem('voyagelog_settings');
        localStorage.removeItem('voyagelog_draft');
        localStorage.removeItem('voyagelog_version');
        
        alert('All data has been cleared.');
        location.reload();
    }

    // About
    loadAbout() {
        // Static content, loads automatically
    }

    // Modals
    openEntryModal(entry) {
        this.currentEntry = entry;
        const modal = document.getElementById('entry-modal');
        
        document.getElementById('modal-entry-title').textContent = entry.title;
        document.getElementById('modal-entry-date').textContent = this.formatDate(entry.date);
        document.getElementById('modal-entry-location').textContent = entry.location || 'Location not specified';
        document.getElementById('modal-entry-mood').textContent = entry.mood;
        
        // Tags
        const tagsContainer = document.getElementById('modal-entry-tags');
        tagsContainer.innerHTML = entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        // Images
        const imagesContainer = document.getElementById('modal-entry-images');
        imagesContainer.innerHTML = '';
        entry.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.dataURL;
            img.alt = image.name;
            img.addEventListener('click', () => {
                this.openLightbox(entry.images, entry.images.indexOf(image));
            });
            imagesContainer.appendChild(img);
        });
        
        // Content
        document.getElementById('modal-entry-content').innerHTML = entry.content;
        
        // Update pin button
        const pinBtn = document.getElementById('pin-entry-btn');
        pinBtn.textContent = entry.pinned ? '📌 Unpin' : '📌 Pin';
        
        this.showModal('entry-modal');
    }

    editCurrentEntry() {
        if (this.currentEntry) {
            this.closeModal('entry-modal');
            this.loadEntryForEdit(this.currentEntry.id);
            this.loadPage('new-entry');
        }
    }

    togglePinEntry() {
        if (!this.currentEntry) return;

        const entries = this.getEntries();
        const index = entries.findIndex(e => e.id === this.currentEntry.id);
        
        if (index !== -1) {
            entries[index].pinned = !entries[index].pinned;
            this.currentEntry.pinned = entries[index].pinned;
            this.saveEntries(entries);
            
            // Update button text
            const pinBtn = document.getElementById('pin-entry-btn');
            pinBtn.textContent = entries[index].pinned ? '📌 Unpin' : '📌 Pin';
            
            this.updateStats();
        }
    }

    openLightbox(images, startIndex = 0) {
        this.lightboxImages = images;
        this.lightboxIndex = startIndex;
        this.updateLightbox();
        this.showModal('lightbox');
    }

    updateLightbox() {
        const image = this.lightboxImages[this.lightboxIndex];
        document.getElementById('lightbox-image').src = image.dataURL;
        document.getElementById('lightbox-caption').textContent = image.name;
    }

    navigateLightbox(direction) {
        this.lightboxIndex += direction;
        
        if (this.lightboxIndex < 0) {
            this.lightboxIndex = this.lightboxImages.length - 1;
        } else if (this.lightboxIndex >= this.lightboxImages.length) {
            this.lightboxIndex = 0;
        }
        
        this.updateLightbox();
    }

    closeLightbox() {
        this.closeModal('lightbox');
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
        document.body.style.overflow = '';
    }

    showConfirmModal(title, message, onConfirm) {
        document.getElementById('confirm-title').textContent = title;
        document.getElementById('confirm-message').textContent = message;
        this.confirmCallback = onConfirm;
        this.showModal('confirm-modal');
    }

    confirmAction() {
        if (this.confirmCallback) {
            this.confirmCallback();
            this.confirmCallback = null;
        }
        this.closeModal('confirm-modal');
    }

    // Utility functions
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    extractTextFromHTML(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VoyageLog();
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.style.overflow = '';
    }
    
    // Ctrl/Cmd + S to save entry
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const saveBtn = document.getElementById('save-entry');
        if (saveBtn && !saveBtn.disabled) {
            saveBtn.click();
        }
    }
});