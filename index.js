// Made Tomorrow - JavaScript משודרג עם אפקטים מתקדמים

document.addEventListener('DOMContentLoaded', function () {
    // 1. אפקט כותרת בגלילה
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. הוספת אפקט זכוכית (Glass Morphism) לחלקים מסוימים
    const glassElements = document.querySelectorAll('.contact-form, .service-card');

    glassElements.forEach(element => {
        element.classList.add('glass');
    });

    // 3. אפקט הופעה בגלילה
    const revealElements = document.querySelectorAll('.services-grid > *, .process-steps > *, .contact-container > *, .section-header');

    // הוספת קלאס לאלמנטים שיופיעו בגלילה
    revealElements.forEach(element => {
        element.classList.add('scroll-reveal');
    });

    // בדיקה אם האלמנט גלוי
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('revealed');
            }
        });
    }

    // בדיקה ראשונית כשהדף נטען
    checkReveal();

    // בדיקה בגלילה
    window.addEventListener('scroll', checkReveal);

    // 4. אפקט ריחוף לאייקונים
    const floatElements = document.querySelectorAll('.service-icon, .step-number');

    floatElements.forEach(element => {
        element.classList.add('float');
    });

    // 5. אפקט פולס לכרטיסיות
    const pulseElements = document.querySelectorAll('.service-card, .contact-item');

    pulseElements.forEach((element, index) => {
        // דילוי שונה לכל אלמנט כדי שהאפקט לא יהיה סנכרוני
        setTimeout(() => {
            element.classList.add('pulse');
        }, index * 1000);
    });

    // 6. אפקט טקסט גרדיאנט
    const gradientTextElements = document.querySelectorAll('h3');

    gradientTextElements.forEach(element => {
        element.classList.add('gradient-text');
    });

    // 7. אפקט טייפינג בכותרת הראשית
    const mainTitle = document.querySelector('.hero h1 span');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';

        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                mainTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }

    // 8. וולידציה משופרת לטופס
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const serviceSelect = document.getElementById('service');

            // בדיקת שם
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'נא להזין שם מלא');
                isValid = false;
            } else {
                removeError(nameInput);
                showSuccess(nameInput);
            }

            // בדיקת אימייל
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
            if (!emailPattern.test(emailInput.value)) {
                showError(emailInput, 'נא להזין כתובת אימייל חוקית');
                isValid = false;
            } else {
                removeError(emailInput);
                showSuccess(emailInput);
            }

            // בדיקת בחירת שירות
            if (serviceSelect.value === '') {
                showError(serviceSelect, 'נא לבחור סוג שירות');
                isValid = false;
            } else {
                removeError(serviceSelect);
                showSuccess(serviceSelect);
            }

            if (!isValid) {
                e.preventDefault();
                // הוספת אפקט רעידה לטופס כאשר יש שגיאה
                contactForm.classList.add('shake');
                setTimeout(() => {
                    contactForm.classList.remove('shake');
                }, 500);
            } else {
                // אפקט הצלחה כאשר הטופס תקין
                contactForm.classList.add('success-pulse');
                setTimeout(() => {
                    contactForm.classList.remove('success-pulse');
                }, 1000);
            }
        });

        // מעקב אחר הקלדה בשדות הטופס
        const formInputs = contactForm.querySelectorAll('input, textarea, select');

        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                if (input.value.trim() !== '') {
                    input.classList.add('has-content');
                } else {
                    input.classList.remove('has-content');
                }
            });
        });
    }

    // פונקציות עזר להצגת שגיאות והסרתן
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        input.classList.add('input-error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            formGroup.removeChild(errorElement);
        }

        input.classList.remove('input-error');
    }

    function showSuccess(input) {
        input.classList.add('input-success');
        setTimeout(() => {
            input.classList.remove('input-success');
        }, 2000);
    }

    // 9. אפקט פרללקס בסקציית הגיבור
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', function () {
        const scrollValue = window.scrollY;
        if (hero) {
            hero.style.backgroundPosition = `center ${scrollValue * 0.5}px`;
        }
    });

    // 10. אפקט המבורגר לתפריט במובייל
    const addMobileMenu = function () {
        const nav = document.querySelector('nav');
        const navUl = document.querySelector('nav ul');

        if (window.innerWidth <= 768 && nav && !document.querySelector('.mobile-menu-toggle')) {
            // יצירת כפתור המבורגר
            const mobileToggle = document.createElement('div');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '<span></span><span></span><span></span>';

            nav.insertBefore(mobileToggle, navUl);

            navUl.classList.add('mobile-hidden');

            mobileToggle.addEventListener('click', function () {
                mobileToggle.classList.toggle('active');
                navUl.classList.toggle('mobile-hidden');
                navUl.classList.toggle('mobile-visible');
            });
        }
    };

    // הוספת כפתור צף לתיק העבודות
    document.addEventListener('DOMContentLoaded', function () {
        // בדיקה אם אנחנו נמצאים בעמוד תיק העבודות כדי לא להציג את הכפתור שם
        if (window.location.href.indexOf('portfolio.html') === -1) {
            // יצירת כפתור צף
            const floatingButton = document.createElement('a');
            floatingButton.className = 'floating-portfolio-btn';
            floatingButton.href = 'portfolio.html';
            floatingButton.setAttribute('title', 'צפה בתיק העבודות');

            // הוספת אייקון לכפתור
            floatingButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
        `;

            // הוספת תגית עם טיפ
            const badge = document.createElement('span');
            badge.className = 'portfolio-badge';
            badge.textContent = 'צפה';
            floatingButton.appendChild(badge);

            // הוספת הכפתור לגוף העמוד
            document.body.appendChild(floatingButton);

            // אפקט הופעה של הכפתור אחרי גלילה מסוימת
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > 300) {
                    floatingButton.style.opacity = '1';
                    floatingButton.style.transform = 'translateY(0)';
                } else {
                    floatingButton.style.opacity = '0';
                    floatingButton.style.transform = 'translateY(20px)';
                }
            });

            // אפקט הבהוב כל כמה זמן כדי למשוך תשומת לב
            setInterval(function () {
                badge.classList.add('pulse-effect');

                setTimeout(function () {
                    badge.classList.remove('pulse-effect');
                }, 1000);
            }, 5000);

            // הוספת CSS נוסף עבור הכפתור
            const style = document.createElement('style');
            style.textContent = `
            .floating-portfolio-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: var(--vibrant-gradient);
                background-size: 300% 300%;
                animation: gradientShift 8s ease infinite;
                color: white;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: var(--shadow-md);
                z-index: 999;
                transition: var(--transition);
                opacity: 0;
                transform: translateY(20px);
            }
            
            .floating-portfolio-btn:hover {
                transform: scale(1.1) translateY(0) !important;
                box-shadow: var(--glow-purple);
            }
            
            .portfolio-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                background: var(--accent);
                color: white;
                font-size: 0.7rem;
                font-weight: bold;
                padding: 2px 8px;
                border-radius: 20px;
                box-shadow: var(--shadow-sm);
            }
            
            .pulse-effect {
                animation: badgePulse 1s ease-in-out;
            }
            
            @keyframes badgePulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.3); }
                100% { transform: scale(1); }
            }
        `;
            document.head.appendChild(style);
        }

        // הוספת אפקט מעבר חלק לקישורים
        const addSmoothScrolling = function () {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');

                    if (targetId !== '#') {
                        e.preventDefault();

                        const targetElement = document.querySelector(targetId);

                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 100,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        };

        addSmoothScrolling();

        // הדגשת הקישור הנוכחי בתפריט בהתאם למיקום בדף
        const highlightActiveSection = function () {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a[href^="#"]');

            window.addEventListener('scroll', function () {
                let current = '';
                const scrollPosition = window.pageYOffset;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    const sectionHeight = section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        current = '#' + section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === current) {
                        link.classList.add('active');
                    }
                });
            });
        };

        highlightActiveSection();
    });

    // הוספת עיצוב CSS נוסף עבור תפריט מובייל
    const addMobileStyles = function () {
        if (!document.getElementById('mobile-menu-styles')) {
            const mobileStyles = document.createElement('style');
            mobileStyles.id = 'mobile-menu-styles';
            mobileStyles.textContent = `
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        width: 30px;
                        height: 20px;
                        cursor: pointer;
                        z-index: 1000;
                        position: absolute;
                        top: 20px;
                        right: 20px;
                    }
                    
                    .mobile-menu-toggle span {
                        display: block;
                        width: 100%;
                        height: 3px;
                        background: var(--primary);
                        border-radius: 3px;
                        transition: var(--transition);
                    }
                    
                    .mobile-menu-toggle.active span:nth-child(1) {
                        transform: translateY(8px) rotate(45deg);
                    }
                    
                    .mobile-menu-toggle.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-menu-toggle.active span:nth-child(3) {
                        transform: translateY(-8px) rotate(-45deg);
                    }
                    
                    .mobile-hidden {
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(-20px);
                        transition: var(--transition);
                    }
                    
                    .mobile-visible {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }
                    
                    .header-container {
                        position: relative;
                    }
                    
                    nav ul {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: white;
                        box-shadow: var(--shadow-md);
                        border-radius: 0 0 10px 10px;
                        padding: 20px 0;
                        z-index: 999;
                    }
                    
                    .shake {
                        animation: shake 0.5s ease-in-out;
                    }
                    
                    .success-pulse {
                        animation: successPulse 1s ease-in-out;
                    }
                    
                    .input-success {
                        border-color: #10b981 !important;
                        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1) !important;
                    }
                    
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        20%, 60% { transform: translateX(-10px); }
                        40%, 80% { transform: translateX(10px); }
                    }
                    
                    @keyframes successPulse {
                        0%, 100% { box-shadow: 0 0 0 rgba(16, 185, 129, 0); }
                        50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
                    }
                }
            `;
            document.head.appendChild(mobileStyles);
        }
    };

    addMobileStyles();
    addMobileMenu();

    // עדכון בשינוי גודל חלון
    window.addEventListener('resize', addMobileMenu);

    // 11. אפקט לצבעוניות בסקרול העמוד
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // שינוי קלאסים בהתאם לכיוון הגלילה
        if (scrollTop > lastScrollTop) {
            // גלילה למטה
            document.body.classList.add('scroll-down');
            document.body.classList.remove('scroll-up');
        } else {
            // גלילה למעלה
            document.body.classList.add('scroll-up');
            document.body.classList.remove('scroll-down');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});