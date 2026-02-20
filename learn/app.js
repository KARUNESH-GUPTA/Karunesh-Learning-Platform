class LearnHubApp {
    constructor() {
        this.currentView = 'dashboard';
        this.currentCourse = null;
        this.currentLesson = null;
        this.isPlaying = false;
        this.searchTimeout = null;
        this.videoProgress = 0;
        this.quizShown = false;
        
        // Application data from the provided JSON
        this.userData = {
            name: "Alex Johnson",
            level: 7,
            totalXP: 2450,
            streak: 12,
            joinDate: "2025-01-15",
            avatar: "https://via.placeholder.com/100/4F46E5/FFFFFF?text=AJ",
            currentCourses: 3,
            completedCourses: 8,
            totalWatchTime: "47 hours"
        };

        this.subjects = [
            {
                id: "mathematics",
                name: "Mathematics",
                description: "Master mathematical concepts from basic algebra to advanced calculus",
                icon: "📊",
                color: "#3B82F6",
                courses: 24,
                totalLessons: 180,
                categories: [
                    {
                        id: "algebra",
                        name: "Algebra & Pre-Calculus",
                        lessons: 45,
                        difficulty: "Beginner to Intermediate",
                        duration: "8-12 hours"
                    },
                    {
                        id: "calculus",
                        name: "Calculus & Advanced Math",
                        lessons: 52,
                        difficulty: "Advanced",
                        duration: "15-20 hours"
                    },
                    {
                        id: "statistics",
                        name: "Statistics & Probability",
                        lessons: 38,
                        difficulty: "Intermediate",
                        duration: "10-14 hours"
                    },
                    {
                        id: "geometry",
                        name: "Geometry & Trigonometry",
                        lessons: 45,
                        difficulty: "Beginner to Intermediate",
                        duration: "12-16 hours"
                    }
                ]
            },
            {
                id: "science",
                name: "Science",
                description: "Explore the natural world through physics, chemistry, and biology",
                icon: "🔬",
                color: "#10B981",
                courses: 32,
                totalLessons: 240,
                categories: [
                    {
                        id: "physics",
                        name: "Physics & Mechanics",
                        lessons: 58,
                        difficulty: "Intermediate to Advanced",
                        duration: "18-25 hours"
                    },
                    {
                        id: "chemistry",
                        name: "Chemistry & Molecular Science",
                        lessons: 62,
                        difficulty: "Beginner to Advanced",
                        duration: "20-28 hours"
                    },
                    {
                        id: "biology",
                        name: "Biology & Life Sciences",
                        lessons: 68,
                        difficulty: "Beginner to Intermediate",
                        duration: "22-30 hours"
                    },
                    {
                        id: "earth-science",
                        name: "Earth & Environmental Science",
                        lessons: 52,
                        difficulty: "Beginner to Intermediate",
                        duration: "16-22 hours"
                    }
                ]
            },
            {
                id: "technology",
                name: "Technology",
                description: "Learn programming, web development, and emerging technologies",
                icon: "💻",
                color: "#8B5CF6",
                courses: 28,
                totalLessons: 195,
                categories: [
                    {
                        id: "programming",
                        name: "Programming & Computer Science",
                        lessons: 75,
                        difficulty: "Beginner to Advanced",
                        duration: "30-45 hours"
                    },
                    {
                        id: "web-dev",
                        name: "Web Development",
                        lessons: 48,
                        difficulty: "Beginner to Intermediate",
                        duration: "20-28 hours"
                    },
                    {
                        id: "data-science",
                        name: "Data Science & Analytics",
                        lessons: 42,
                        difficulty: "Intermediate to Advanced",
                        duration: "18-24 hours"
                    },
                    {
                        id: "ai-basics",
                        name: "Artificial Intelligence Basics",
                        lessons: 30,
                        difficulty: "Intermediate",
                        duration: "12-18 hours"
                    }
                ]
            },
            {
                id: "languages",
                name: "Languages",
                description: "Master communication in multiple languages with interactive lessons",
                icon: "🌍",
                color: "#F59E0B",
                courses: 16,
                totalLessons: 320,
                categories: [
                    {
                        id: "english",
                        name: "English Communication",
                        lessons: 85,
                        difficulty: "All Levels",
                        duration: "25-35 hours"
                    },
                    {
                        id: "spanish",
                        name: "Spanish for Beginners",
                        lessons: 78,
                        difficulty: "Beginner",
                        duration: "20-28 hours"
                    },
                    {
                        id: "french",
                        name: "French Fundamentals",
                        lessons: 82,
                        difficulty: "Beginner to Intermediate",
                        duration: "22-30 hours"
                    },
                    {
                        id: "mandarin",
                        name: "Mandarin Chinese Basics",
                        lessons: 75,
                        difficulty: "Beginner",
                        duration: "25-32 hours"
                    }
                ]
            },
            {
                id: "business",
                name: "Business & Economics",
                description: "Develop business acumen and understand economic principles",
                icon: "📈",
                color: "#EF4444",
                courses: 18,
                totalLessons: 145,
                categories: [
                    {
                        id: "business-strategy",
                        name: "Business Strategy",
                        lessons: 38,
                        difficulty: "Intermediate",
                        duration: "15-20 hours"
                    },
                    {
                        id: "economics",
                        name: "Economics & Finance",
                        lessons: 42,
                        difficulty: "Beginner to Intermediate",
                        duration: "16-22 hours"
                    },
                    {
                        id: "marketing",
                        name: "Marketing Fundamentals",
                        lessons: 35,
                        difficulty: "Beginner",
                        duration: "12-18 hours"
                    },
                    {
                        id: "entrepreneurship",
                        name: "Entrepreneurship",
                        lessons: 30,
                        difficulty: "Intermediate",
                        duration: "10-15 hours"
                    }
                ]
            }
        ];

        this.currentCourses = [
            {
                id: "calculus-101",
                title: "Introduction to Calculus",
                subject: "Mathematics",
                progress: 65,
                lastWatched: "2025-10-02",
                nextLesson: "Derivatives and Rate of Change",
                instructor: "Dr. Sarah Martinez",
                totalLessons: 24,
                completedLessons: 16
            },
            {
                id: "web-dev-basics",
                title: "Web Development Fundamentals",
                subject: "Technology",
                progress: 30,
                lastWatched: "2025-09-30",
                nextLesson: "CSS Flexbox and Grid",
                instructor: "Mark Thompson",
                totalLessons: 32,
                completedLessons: 10
            },
            {
                id: "spanish-beginners",
                title: "Spanish for Beginners",
                subject: "Languages",
                progress: 80,
                lastWatched: "2025-10-03",
                nextLesson: "Past Tense Conjugation",
                instructor: "Maria Rodriguez",
                totalLessons: 28,
                completedLessons: 22
            }
        ];

        this.achievements = [
            {
                id: "first-course",
                name: "First Steps",
                description: "Complete your first lesson",
                earned: true,
                icon: "🎯",
                date: "2025-01-20"
            },
            {
                id: "streak-7",
                name: "Week Warrior",
                description: "Maintain a 7-day learning streak",
                earned: true,
                icon: "🔥",
                date: "2025-02-15"
            },
            {
                id: "math-master",
                name: "Math Master",
                description: "Complete 5 mathematics courses",
                earned: true,
                icon: "📐",
                date: "2025-08-10"
            },
            {
                id: "quiz-champion",
                name: "Quiz Champion",
                description: "Score 100% on 10 quizzes",
                earned: true,
                icon: "🏆",
                date: "2025-09-05"
            },
            {
                id: "helpful-peer",
                name: "Helpful Peer",
                description: "Help 5 fellow learners",
                earned: false,
                icon: "🤝",
                progress: 60
            },
            {
                id: "course-creator",
                name: "Course Creator",
                description: "Complete 10 courses",
                earned: false,
                icon: "🎓",
                progress: 80
            }
        ];

        this.featuredCourses = [
            {
                id: "python-programming",
                title: "Python Programming Masterclass",
                instructor: "Dr. James Wilson",
                rating: 4.9,
                students: 15420,
                duration: "24 hours",
                level: "Beginner to Advanced",
                price: "Free",
                tags: ["Programming", "Python", "Beginner-Friendly"],
                subject: "Technology"
            },
            {
                id: "organic-chemistry",
                title: "Organic Chemistry Essentials",
                instructor: "Prof. Lisa Chen",
                rating: 4.8,
                students: 8750,
                duration: "18 hours",
                level: "Intermediate",
                price: "Free",
                tags: ["Chemistry", "Organic", "Lab Work"],
                subject: "Science"
            },
            {
                id: "business-analysis",
                title: "Business Analysis & Strategy",
                instructor: "Michael Davis",
                rating: 4.7,
                students: 12300,
                duration: "16 hours",
                level: "Intermediate",
                price: "Free",
                tags: ["Business", "Strategy", "Analysis"],
                subject: "Business & Economics"
            }
        ];

        this.weeklyGoal = {
            target: 10,
            completed: 7,
            remaining: 3
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderDashboard();
        this.setupThemeToggle();
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('dashboardBtn').addEventListener('click', () => this.showView('dashboard'));
        document.getElementById('coursesBtn').addEventListener('click', () => this.showView('courses'));
        document.getElementById('progressBtn').addEventListener('click', () => this.showView('progress'));
        document.getElementById('profileBtn').addEventListener('click', () => this.showView('profile'));

        // Search
        document.getElementById('searchToggle').addEventListener('click', () => this.toggleSearch());
        document.getElementById('searchBtn').addEventListener('click', () => this.performSearch());
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });

        // Course navigation
        const backToCourses = document.getElementById('backToCourses');
        if (backToCourses) {
            backToCourses.addEventListener('click', () => this.showView('courses'));
        }

        // Video controls
        this.setupVideoControls();

        // Quiz modal
        this.setupQuizModal();

        // Toast close
        document.getElementById('toastClose').addEventListener('click', () => this.hideToast());

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
    }

    setupVideoControls() {
        const playButton = document.getElementById('playButton');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const speedBtn = document.getElementById('speedBtn');
        const qualityBtn = document.getElementById('qualityBtn');
        const captionsBtn = document.getElementById('captionsBtn');
        const nextLessonBtn = document.getElementById('nextLessonBtn');
        const prevLessonBtn = document.getElementById('prevLessonBtn');
        const saveNotesBtn = document.getElementById('saveNotesBtn');

        if (playButton) {
            playButton.addEventListener('click', () => this.toggleVideoPlay());
        }

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => this.toggleVideoPlay());
        }

        if (speedBtn) {
            speedBtn.addEventListener('click', () => this.cyclePlaybackSpeed());
        }

        if (qualityBtn) {
            qualityBtn.addEventListener('click', () => this.cycleQuality());
        }

        if (captionsBtn) {
            captionsBtn.addEventListener('click', () => this.toggleCaptions());
        }

        if (nextLessonBtn) {
            nextLessonBtn.addEventListener('click', () => this.nextLesson());
        }

        if (prevLessonBtn) {
            prevLessonBtn.addEventListener('click', () => this.prevLesson());
        }

        if (saveNotesBtn) {
            saveNotesBtn.addEventListener('click', () => this.saveNotes());
        }
    }

    setupQuizModal() {
        const closeQuizModal = document.getElementById('closeQuizModal');
        const submitQuizBtn = document.getElementById('submitQuizBtn');
        const modalBackdrop = document.querySelector('.modal__backdrop');

        if (closeQuizModal) {
            closeQuizModal.addEventListener('click', () => this.hideQuizModal());
        }

        if (submitQuizBtn) {
            submitQuizBtn.addEventListener('click', () => this.submitQuiz());
        }

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', () => this.hideQuizModal());
        }
    }

    showView(viewName) {
        // Remove active class from all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('view--active');
        });

        // Remove active class from all nav buttons
        document.querySelectorAll('.nav__btn').forEach(btn => {
            btn.classList.remove('nav__btn--active');
        });

        // Show the selected view
        document.getElementById(viewName + 'View').classList.add('view--active');
        
        // Add active class to corresponding nav button
        const navBtn = document.getElementById(viewName + 'Btn');
        if (navBtn) navBtn.classList.add('nav__btn--active');

        this.currentView = viewName;

        // Render view-specific content
        switch (viewName) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'courses':
                this.renderCourses();
                break;
            case 'progress':
                this.renderProgress();
                break;
            case 'profile':
                this.renderProfile();
                break;
        }
    }

    renderDashboard() {
        this.renderUserStats();
        this.renderContinueLearning();
        this.renderWeeklyGoal();
        this.renderSubjects();
        this.renderAchievements();
    }

    renderUserStats() {
        document.getElementById('userName').textContent = this.userData.name.split(' ')[0];
        document.getElementById('userLevel').textContent = this.userData.level;
        document.getElementById('userXP').textContent = this.userData.totalXP.toLocaleString();
        document.getElementById('userStreak').textContent = this.userData.streak;
        document.getElementById('currentCourses').textContent = this.userData.currentCourses;
        document.getElementById('completedCourses').textContent = this.userData.completedCourses;
        document.getElementById('totalWatchTime').textContent = this.userData.totalWatchTime;
        document.getElementById('achievementsCount').textContent = this.achievements.filter(a => a.earned).length;
    }

    renderContinueLearning() {
        const container = document.getElementById('continueLearning');
        if (!container) return;

        container.innerHTML = '';
        
        this.currentCourses.forEach(course => {
            const courseCard = this.createContinueCourseCard(course);
            container.appendChild(courseCard);
        });
    }

    createContinueCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        
        card.innerHTML = `
            <div class="course-card__header">
                <div>
                    <h3 class="course-card__title">${course.title}</h3>
                    <p class="course-card__instructor">by ${course.instructor}</p>
                </div>
                <span class="course-card__subject">${course.subject}</span>
            </div>
            <div class="course-card__progress">
                <div class="course-card__progress-text">${course.completedLessons}/${course.totalLessons} lessons completed</div>
                <div class="progress-bar">
                    <div class="progress-bar__fill" style="width: ${course.progress}%"></div>
                </div>
            </div>
            <div class="course-card__next">Next: ${course.nextLesson}</div>
        `;

        card.addEventListener('click', () => {
            this.currentCourse = course;
            this.showCourseDetail(course);
        });

        return card;
    }

    renderWeeklyGoal() {
        const progressBar = document.getElementById('weeklyProgress');
        const completed = document.getElementById('goalCompleted');
        const target = document.getElementById('goalTarget');

        if (progressBar) {
            const percentage = (this.weeklyGoal.completed / this.weeklyGoal.target) * 100;
            progressBar.style.width = percentage + '%';
        }

        if (completed) completed.textContent = this.weeklyGoal.completed;
        if (target) target.textContent = this.weeklyGoal.target;
    }

    renderSubjects() {
        const container = document.getElementById('subjectsGrid');
        if (!container) return;

        container.innerHTML = '';
        
        this.subjects.forEach(subject => {
            const subjectCard = this.createSubjectCard(subject);
            container.appendChild(subjectCard);
        });
    }

    createSubjectCard(subject) {
        const card = document.createElement('div');
        card.className = 'subject-card';
        
        card.innerHTML = `
            <div class="subject-card__header">
                <div class="subject-card__icon">${subject.icon}</div>
                <h3 class="subject-card__title">${subject.name}</h3>
            </div>
            <p class="subject-card__description">${subject.description}</p>
            <div class="subject-card__stats">
                <span>${subject.courses} courses</span>
                <span>${subject.totalLessons} lessons</span>
            </div>
        `;

        card.addEventListener('click', () => {
            this.showSubjectCourses(subject);
        });

        return card;
    }

    renderAchievements() {
        const container = document.getElementById('achievementsList');
        if (!container) return;

        container.innerHTML = '';
        
        // Show only recent earned achievements
        const recentAchievements = this.achievements.filter(a => a.earned).slice(0, 4);
        
        recentAchievements.forEach(achievement => {
            const achievementCard = this.createAchievementCard(achievement);
            container.appendChild(achievementCard);
        });
    }

    createAchievementCard(achievement) {
        const card = document.createElement('div');
        card.className = `achievement-card ${achievement.earned ? 'achievement-card--earned' : ''}`;
        
        card.innerHTML = `
            <div class="achievement-card__icon">${achievement.icon}</div>
            <div class="achievement-card__content">
                <div class="achievement-card__name">${achievement.name}</div>
                <div class="achievement-card__description">${achievement.description}</div>
                ${achievement.earned ? `<div class="achievement-card__date">Earned ${achievement.date}</div>` : ''}
            </div>
        `;

        return card;
    }

    renderCourses() {
        const container = document.getElementById('coursesGrid');
        if (!container) return;

        container.innerHTML = '';
        
        // Combine current courses and featured courses
        const allCourses = [...this.currentCourses, ...this.featuredCourses];
        
        allCourses.forEach(course => {
            const courseCard = this.createCourseCard(course);
            container.appendChild(courseCard);
        });

        this.setupCourseFilters();
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        
        const rating = course.rating ? '★'.repeat(Math.floor(course.rating)) : '';
        const studentsText = course.students ? `${course.students.toLocaleString()} students` : '';
        
        card.innerHTML = `
            <div class="course-card__header">
                <div>
                    <h3 class="course-card__title">${course.title}</h3>
                    <p class="course-card__instructor">by ${course.instructor}</p>
                </div>
                <span class="course-card__subject">${course.subject}</span>
            </div>
            ${course.progress ? `
                <div class="course-card__progress">
                    <div class="course-card__progress-text">${course.completedLessons}/${course.totalLessons} lessons completed</div>
                    <div class="progress-bar">
                        <div class="progress-bar__fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>
            ` : `
                <div class="course-card__meta">
                    <span class="meta-tag">${course.duration}</span>
                    <span class="meta-tag">${course.level}</span>
                    ${course.rating ? `
                        <div class="rating">
                            <span class="rating__stars">${rating}</span>
                            <span class="rating__count">(${studentsText})</span>
                        </div>
                    ` : ''}
                </div>
            `}
            <div class="course-card__next">
                ${course.nextLesson ? `Next: ${course.nextLesson}` : 'Start Learning'}
            </div>
        `;

        card.addEventListener('click', () => {
            this.currentCourse = course;
            this.showCourseDetail(course);
        });

        return card;
    }

    setupCourseFilters() {
        const subjectFilter = document.getElementById('subjectFilter');
        const levelFilter = document.getElementById('levelFilter');

        if (subjectFilter) {
            subjectFilter.innerHTML = '<option value="">All Subjects</option>';
            this.subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.name;
                option.textContent = subject.name;
                subjectFilter.appendChild(option);
            });

            subjectFilter.addEventListener('change', () => this.filterCourses());
        }

        if (levelFilter) {
            levelFilter.addEventListener('change', () => this.filterCourses());
        }
    }

    filterCourses() {
        // Basic filter implementation
        this.showToast('Course filtering applied!');
    }

    showCourseDetail(course) {
        this.showView('courseDetail');
        
        document.getElementById('currentCourseName').textContent = course.title;
        document.getElementById('courseTitle').textContent = course.title;
        document.getElementById('courseInstructor').textContent = course.instructor;
        document.getElementById('courseDuration').textContent = course.duration || '20+ hours';
        document.getElementById('courseLevel').textContent = course.level || 'All Levels';
        
        if (course.rating) {
            document.getElementById('courseRating').textContent = '★'.repeat(Math.floor(course.rating));
            document.getElementById('courseStudents').textContent = `(${course.students?.toLocaleString()} students)`;
        }

        const startBtn = document.getElementById('startCourseBtn');
        if (course.progress) {
            startBtn.textContent = 'Continue Learning';
            this.showCourseProgress(course);
        } else {
            startBtn.textContent = 'Start Course';
        }

        startBtn.addEventListener('click', () => this.startCourse(course));

        this.renderCourseLessons(course);
    }

    showCourseProgress(course) {
        const progressSection = document.getElementById('courseProgress');
        const progressBar = document.getElementById('courseProgressBar');
        const progressText = document.getElementById('courseProgressText');

        if (progressSection) progressSection.style.display = 'block';
        if (progressBar) progressBar.style.width = course.progress + '%';
        if (progressText) progressText.textContent = `${course.progress}% Complete • ${course.completedLessons}/${course.totalLessons} lessons`;
    }

    renderCourseLessons(course) {
        const container = document.getElementById('courseLessons');
        if (!container) return;

        // Generate sample lessons based on course
        const lessons = this.generateSampleLessons(course);
        
        container.innerHTML = '<h2>Course Content</h2>';
        
        lessons.forEach((lesson, index) => {
            const lessonCard = document.createElement('div');
            lessonCard.className = 'lesson-card';
            lessonCard.innerHTML = `
                <div class="lesson-card__content">
                    <h4>${lesson.title}</h4>
                    <p>${lesson.description}</p>
                    <span class="lesson-card__duration">${lesson.duration}</span>
                </div>
                <div class="lesson-card__status">
                    ${index < (course.completedLessons || 0) ? '✅' : '▶️'}
                </div>
            `;
            
            lessonCard.addEventListener('click', () => this.startLesson(lesson));
            container.appendChild(lessonCard);
        });
    }

    generateSampleLessons(course) {
        const baseTitle = course.title.split(' ')[0];
        return [
            { title: `Introduction to ${baseTitle}`, description: 'Get started with the fundamentals', duration: '12 min' },
            { title: `Basic ${baseTitle} Concepts`, description: 'Learn the core principles', duration: '18 min' },
            { title: `Practical ${baseTitle} Examples`, description: 'See real-world applications', duration: '25 min' },
            { title: `Advanced ${baseTitle} Techniques`, description: 'Master advanced concepts', duration: '32 min' },
            { title: `${baseTitle} Project`, description: 'Apply your knowledge in a project', duration: '45 min' }
        ];
    }

    startCourse(course) {
        const firstLesson = { 
            title: `Introduction to ${course.title}`, 
            description: 'Welcome to this comprehensive course!' 
        };
        this.startLesson(firstLesson);
    }

    startLesson(lesson) {
        this.currentLesson = lesson;
        this.videoProgress = 0;
        this.quizShown = false;
        this.showView('videoPlayer');
        
        document.getElementById('lessonTitle').textContent = lesson.title;
        document.getElementById('lessonDescription').textContent = lesson.description;
        document.getElementById('videoTitle').textContent = lesson.title;

        // Reset video progress bar
        const videoProgressBar = document.getElementById('videoProgressBar');
        if (videoProgressBar) {
            videoProgressBar.style.width = '0%';
        }
    }

    toggleVideoPlay() {
        this.isPlaying = !this.isPlaying;
        
        const playButton = document.getElementById('playButton');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (this.isPlaying) {
            if (playButton) playButton.textContent = '⏸️';
            if (playPauseBtn) playPauseBtn.textContent = '⏸️';
            this.simulateVideoProgress();
        } else {
            if (playButton) playButton.textContent = '▶️';
            if (playPauseBtn) playPauseBtn.textContent = '▶️';
        }
    }

    simulateVideoProgress() {
        if (!this.isPlaying) return;
        
        const progressBar = document.getElementById('videoProgressBar');
        if (progressBar) {
            this.videoProgress += 1;
            progressBar.style.width = Math.min(this.videoProgress, 100) + '%';
            
            // Show quiz at 30% progress (much sooner for testing)
            if (this.videoProgress >= 30 && !this.quizShown) {
                this.quizShown = true;
                setTimeout(() => {
                    this.showQuizModal();
                }, 500);
            }
            
            if (this.videoProgress < 100) {
                setTimeout(() => this.simulateVideoProgress(), 200);
            } else {
                // Video completed
                this.isPlaying = false;
                const playButton = document.getElementById('playButton');
                const playPauseBtn = document.getElementById('playPauseBtn');
                if (playButton) playButton.textContent = '▶️';
                if (playPauseBtn) playPauseBtn.textContent = '▶️';
                this.showToast('🎉 Lesson completed! +25 XP earned!');
                this.userData.totalXP += 25;
                this.renderUserStats();
            }
        }
    }

    cyclePlaybackSpeed() {
        const speeds = ['0.5x', '1x', '1.5x', '2x'];
        const speedBtn = document.getElementById('speedBtn');
        const currentSpeed = speedBtn.textContent;
        const currentIndex = speeds.indexOf(currentSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        speedBtn.textContent = speeds[nextIndex];
        this.showToast(`Playback speed: ${speeds[nextIndex]}`);
    }

    cycleQuality() {
        const qualities = ['480p', '720p', '1080p', 'Auto'];
        const qualityBtn = document.getElementById('qualityBtn');
        const currentQuality = qualityBtn.textContent;
        const currentIndex = qualities.indexOf(currentQuality);
        const nextIndex = (currentIndex + 1) % qualities.length;
        qualityBtn.textContent = qualities[nextIndex];
        this.showToast(`Video quality: ${qualities[nextIndex]}`);
    }

    toggleCaptions() {
        const captionsBtn = document.getElementById('captionsBtn');
        const isOn = captionsBtn.textContent === 'CC';
        captionsBtn.textContent = isOn ? 'CC Off' : 'CC';
        this.showToast(isOn ? 'Captions disabled' : 'Captions enabled');
    }

    nextLesson() {
        this.showToast('Moving to next lesson...');
        // Simulate moving to next lesson
        const nextLesson = { 
            title: 'Advanced Concepts', 
            description: 'Diving deeper into the subject matter' 
        };
        this.startLesson(nextLesson);
    }

    prevLesson() {
        this.showToast('Going to previous lesson...');
        // Simulate moving to previous lesson
        const prevLesson = { 
            title: 'Review Lesson', 
            description: 'Let\'s review what we\'ve learned so far' 
        };
        this.startLesson(prevLesson);
    }

    saveNotes() {
        const notesTextarea = document.getElementById('notesTextarea');
        if (notesTextarea && notesTextarea.value.trim()) {
            this.showToast('📝 Notes saved successfully!');
        } else {
            this.showToast('Please enter some notes first.');
        }
    }

    renderProgress() {
        this.renderProgressChart();
        this.renderSubjectProgress();
    }

    renderProgressChart() {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;

        // Sample data for the chart
        const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Hours Studied',
                data: [2.5, 3.2, 1.8, 2.8, 3.5, 1.5, 2.2],
                backgroundColor: '#1FB8CD',
                borderColor: '#1FB8CD',
                borderWidth: 2,
                fill: true
            }]
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 4
                    }
                }
            }
        });
    }

    renderSubjectProgress() {
        const container = document.getElementById('subjectProgress');
        if (!container) return;

        container.innerHTML = '<h2>Progress by Subject</h2>';
        
        this.subjects.forEach(subject => {
            const progress = Math.floor(Math.random() * 100); // Random progress for demo
            const progressCard = document.createElement('div');
            progressCard.className = 'subject-progress-card';
            progressCard.innerHTML = `
                <div class="subject-progress-header">
                    <span class="subject-icon">${subject.icon}</span>
                    <span class="subject-name">${subject.name}</span>
                    <span class="subject-percentage">${progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar__fill" style="width: ${progress}%"></div>
                </div>
            `;
            container.appendChild(progressCard);
        });
    }

    renderProfile() {
        document.getElementById('profileName').textContent = this.userData.name;
        document.getElementById('profileLevel').textContent = this.userData.level;
        document.getElementById('profileJoinDate').textContent = new Date(this.userData.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        document.getElementById('profileXP').textContent = this.userData.totalXP.toLocaleString();
        document.getElementById('profileStreak').textContent = this.userData.streak;
        document.getElementById('profileAvatar').src = this.userData.avatar;

        this.renderAllAchievements();
    }

    renderAllAchievements() {
        const container = document.getElementById('allAchievements');
        if (!container) return;

        container.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementCard = this.createAchievementCard(achievement);
            container.appendChild(achievementCard);
        });
    }

    toggleSearch() {
        const searchBar = document.getElementById('searchBar');
        const searchInput = document.getElementById('searchInput');
        
        if (searchBar.classList.contains('hidden')) {
            searchBar.classList.remove('hidden');
            searchInput.focus();
        } else {
            searchBar.classList.add('hidden');
        }
    }

    performSearch() {
        const query = document.getElementById('searchInput').value.trim();
        if (!query) return;

        this.showToast(`Searching for "${query}"...`);
        
        // Simple search implementation - would be more sophisticated in real app
        setTimeout(() => {
            this.showToast(`Found ${Math.floor(Math.random() * 20) + 1} results for "${query}"`);
        }, 1000);
    }

    showQuizModal() {
        const modal = document.getElementById('quizModal');
        modal.classList.remove('hidden');
        
        // Generate a random quiz question based on current lesson
        this.generateQuizQuestion();
    }

    generateQuizQuestion() {
        const questions = [
            {
                question: "What is the derivative of x²?",
                options: ["2x", "x²", "x", "2"],
                correct: 0
            },
            {
                question: "Which HTML tag is used for the largest heading?",
                options: ["<h6>", "<h1>", "<header>", "<head>"],
                correct: 1
            },
            {
                question: "What does CSS stand for?",
                options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
                correct: 1
            },
            {
                question: "In Spanish, how do you say 'Hello'?",
                options: ["Hola", "Bonjour", "Guten Tag", "Ciao"],
                correct: 0
            }
        ];

        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        
        document.getElementById('questionText').textContent = randomQuestion.question;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        randomQuestion.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.className = 'quiz-option';
            label.innerHTML = `
                <input type="radio" name="answer" value="${index}">
                <span>${option}</span>
            `;
            optionsContainer.appendChild(label);
        });

        // Store correct answer for checking
        this.currentQuizCorrect = randomQuestion.correct;
    }

    hideQuizModal() {
        document.getElementById('quizModal').classList.add('hidden');
    }

    submitQuiz() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            this.showToast('Please select an answer!');
            return;
        }

        const isCorrect = parseInt(selectedAnswer.value) === this.currentQuizCorrect;
        this.hideQuizModal();
        
        if (isCorrect) {
            this.showToast('🎉 Correct! +10 XP earned!');
            this.userData.totalXP += 10;
            this.renderUserStats();
        } else {
            this.showToast('❌ Incorrect. Keep learning and try again!');
        }
    }

    setupThemeToggle() {
        // Note: Removed localStorage usage as per strict instructions
        const themeToggle = document.getElementById('themeToggle');
        // Default to light theme
        themeToggle.textContent = '🌙';
    }

    toggleTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = document.body.getAttribute('data-color-scheme');
        
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-color-scheme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            document.body.setAttribute('data-color-scheme', 'dark');
            themeToggle.textContent = '☀️';
        }
        
        this.showToast('Theme changed!');
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastContent = document.getElementById('toastContent');
        
        toastContent.textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('show');
        
        setTimeout(() => {
            this.hideToast();
        }, 3000);
    }

    hideToast() {
        const toast = document.getElementById('toast');
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }

    showSubjectCourses(subject) {
        this.showView('courses');
        this.showToast(`Showing ${subject.name} courses`);
        // In a real app, this would filter courses by subject
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.learnHubApp = new LearnHubApp();
});

// Add some utility functions for enhanced UX
document.addEventListener('keydown', (e) => {
    // Keyboard shortcuts
    if (e.key === 'Escape') {
        // Close modals
        const quizModal = document.getElementById('quizModal');
        if (!quizModal.classList.contains('hidden')) {
            quizModal.classList.add('hidden');
        }
        
        // Close search
        const searchBar = document.getElementById('searchBar');
        if (!searchBar.classList.contains('hidden')) {
            searchBar.classList.add('hidden');
        }
    }
    
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        window.learnHubApp.toggleSearch();
    }
    
    // Video controls
    if (window.learnHubApp && window.learnHubApp.currentView === 'videoPlayer') {
        if (e.key === ' ') {
            e.preventDefault();
            window.learnHubApp.toggleVideoPlay();
        }
    }
});

// Add smooth scrolling for better UX
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add loading states for better perceived performance
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});