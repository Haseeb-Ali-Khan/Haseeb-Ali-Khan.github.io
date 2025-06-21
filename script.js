document.addEventListener('DOMContentLoaded', () => {

    // --- Data for Project Modals ---
    const projectData = {
        'mr-assistant': {
            title: 'Mixed Reality Color Blind Assistant',
            tech: ['Unity', 'C#', 'XR', 'Accessibility'],
            description: 'This project introduces an innovative Augmented and Virtual Reality (AR/VR) based assistant designed to help individuals with color vision deficiency (CVD). Developed as part of the ICCTARVR project in collaboration with ETH Zürich, this solution focuses on enhancing accessibility in digital and real-world environments for CVD users.',
            media: [
                { type: 'image', src: 'images/ColorBlindData/ColoBlind1.jpg' },
                { type: 'image', src: 'images/ColorBlindData/ColoBlind2.jpg' },
                { type: 'image', src: 'images/ColorBlindData/ColoBlind3.jpg' }
            ]
        },
        'koco-app': {
            title: 'KoCo App - Cultural Bridge',
            tech: ['Unity 3D', 'CNN', 'Python API', 'Emotion Detection'],
            description: 'The KoCo (Korea & Companion) application is a 3D desktop tool designed to bridge the cultural gap for foreigners residing in South Korea. It utilizes a Convolutional Neural Network (CNN) for real-time facial emotion recognition, helping users understand and respond to non-verbal cues in a Korean context.',
            media: [
                { type: 'image', src: 'images/3DAppData/3DAppImg1.jpg' },
                { type: 'image', src: 'images/3DAppData/3DAppImg2.jpg' },
                { type: 'image', src: 'images/3DAppData/3DAppImg3.jpg' },
                { type: 'image', src: 'images/3DAppData/3DAppImg4.jpg' },
                { type: 'image', src: 'images/3DAppData/3DAppImg5.jpg' }
            ]
        },
        'vr-doctor': {
            title: 'Virtual Doctor Assistant',
            tech: ['Unity VR', 'C#', 'Healthcare'],
            description: 'Presented at the World IT Show Coex 2024, the Virtual Doctor Assistant is a proof-of-concept VR application for healthcare. It provides a safe and immersive environment for patients to interact with a virtual medical professional for consultations, training, and therapy.',
            media: [
                { type: 'image', src: 'images/VirtualDoctorData/DrImg1.png' },
                { type: 'image', src: 'images/VirtualDoctorData/DrImg2.png' },
                { type: 'image', src: 'images/VirtualDoctorData/DrImg3.png' },
                { type: 'image', src: 'images/VirtualDoctorData/DrImg4.png' }
            ]
        },
        'ar-fire': {
            title: 'AR Fire Safety Prototype',
            tech: ['Unity', 'AR', 'Vuforia', 'Mobile'],
            description: 'A prototype mobile application using Augmented Reality to simulate a fire emergency. The app\'s purpose is to augment a fire in the real world and then allow the user to extinguish it with a virtual fire extinguisher, providing a safe and interactive training experience.',
            media: [
                { type: 'image', src: 'images/ARFireExtinguisherAppData/ARApp1.jpg' },
                { type: 'image', src: 'images/ARFireExtinguisherAppData/ARApp2.jpg' },
                { type: 'image', src: 'images/ARFireExtinguisherAppData/ARApp3.jpg' },
                { type: 'image', src: 'images/ARFireExtinguisherAppData/ARApp4.jpg' }
            ]
        }
    };

    // --- Burger Menu Logic ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    if (modal) {
        const projectButtons = document.querySelectorAll('.project-button');
        const closeModalButton = document.querySelector('.close-button');

        projectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectKey = button.closest('.project-card').dataset.project;
                openModalWithProject(projectKey);
            });
        });

        if (closeModalButton) {
            closeModalButton.addEventListener('click', closeProjectModal);
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeProjectModal();
            }
        });
    }

    function openModalWithProject(projectKey) {
        const data = projectData[projectKey];
        if (!data) return;

        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-description').textContent = data.description;

        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = '';
        data.tech.forEach(techName => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = techName;
            techContainer.appendChild(techTag);
        });
        
        const mediaContainer = document.querySelector('.modal-media');
        mediaContainer.innerHTML = '';

        const mainMediaContainer = document.createElement('div');
        mainMediaContainer.className = 'modal-main-media';
        
        const navContainer = document.createElement('div');
        navContainer.className = 'modal-media-nav';

        if (data.media && data.media.length > 0) {
            data.media.forEach((mediaItem, index) => {
                const thumb = document.createElement('img');
                thumb.src = mediaItem.src;
                thumb.alt = `Thumbnail for ${data.title}`;
                thumb.loading = 'lazy';
                thumb.dataset.mediaSrc = mediaItem.src;
                thumb.dataset.mediaType = mediaItem.type;
                if (index === 0) {
                    thumb.classList.add('active');
                }
                
                thumb.addEventListener('click', (e) => {
                    if (e.currentTarget.classList.contains('active')) return;
                    
                    navContainer.querySelectorAll('img').forEach(i => i.classList.remove('active'));
                    e.currentTarget.classList.add('active');

                    const newMediaSrc = e.currentTarget.dataset.mediaSrc;
                    const newMediaType = e.currentTarget.dataset.mediaType;
                    const newMediaElement = createMediaElement(newMediaType, newMediaSrc);
                    
                    mainMediaContainer.innerHTML = '';
                    mainMediaContainer.appendChild(newMediaElement);
                });
                navContainer.appendChild(thumb);
            });
            
            const initialMedia = createMediaElement(data.media[0].type, data.media[0].src);
            mainMediaContainer.appendChild(initialMedia);

            mediaContainer.appendChild(mainMediaContainer);
            mediaContainer.appendChild(navContainer);
        }
        
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }

    function closeProjectModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    function createMediaElement(type, src) {
        const img = document.createElement('img');
        img.src = src;
        img.loading = 'lazy';
        return img;
    }

    // --- General Animations ---
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(element => {
        fadeInObserver.observe(element);
    });
});

// Added a style for no-scroll on body when mobile menu is open or modal is active
const globalStyles = document.createElement('style');
globalStyles.innerHTML = `
    body.no-scroll, body.modal-open {
        overflow: hidden;
    }
`;
document.head.appendChild(globalStyles);