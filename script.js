// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create animated background particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 80;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    transparent: true,
    color: '#6ea8fe',
    blending: THREE.AdditiveBlending,
    opacity: 0.6
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add floating geometric shapes
const shapes = [];
const geometries = [
    new THREE.TorusGeometry(2, 0.5, 16, 100),
    new THREE.OctahedronGeometry(1.5),
    new THREE.TetrahedronGeometry(1.5),
];

for (let i = 0; i < 3; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshBasicMaterial({
        color: '#6ea8fe',
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const shape = new THREE.Mesh(geometry, material);
    
    shape.position.x = (Math.random() - 0.5) * 40;
    shape.position.y = (Math.random() - 0.5) * 40;
    shape.position.z = (Math.random() - 0.5) * 40;
    
    shape.rotation.x = Math.random() * Math.PI;
    shape.rotation.y = Math.random() * Math.PI;
    
    shapes.push(shape);
    scene.add(shape);
}

// Mouse interaction with logos
const logos = document.querySelectorAll('.floating-logos img');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    // Add subtle movement to logos based on mouse position
    logos.forEach((logo, index) => {
        const speed = 0.05;
        const xOffset = mouseX * (20 + index * 2) * speed;
        const yOffset = mouseY * (20 + index * 2) * speed;
        
        gsap.to(logo, {
            x: xOffset,
            y: yOffset,
            duration: 1,
            ease: "power2.out"
        });
    });
});

// Add hover effect to logos
logos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
            scale: 1.2,
            filter: 'grayscale(0) brightness(1.2)',
            duration: 0.3
        });
    });

    logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
            scale: 1,
            filter: 'grayscale(0.5) brightness(1.5)',
            duration: 0.3
        });
    });
});

// Animation Loop with slower movements
function animate() {
    requestAnimationFrame(animate);

    shapes.forEach((shape, i) => {
        shape.rotation.x += 0.001;
        shape.rotation.y += 0.002;
        shape.position.y += Math.sin(Date.now() * 0.0005 + i) * 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        this.el.innerText = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize text scramble
const phrases = [
    '.NET Developer',
    'Full Stack Developer',
    'C# Developer',
    'ASP.NET Developer',
    'Database Engineer',
    'AI Enthusiast'
];

const el = document.querySelector('.text-scramble');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 2000);
    });
    counter = (counter + 1) % phrases.length;
};

next();

// Enhanced Scroll Animations
const revealSections = document.querySelectorAll('.reveal-section');
revealSections.forEach(section => {
    gsap.set(section, {
        opacity: 0,
        y: 50
    });

    ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
            gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            });
        }
    });
});

// Staggered animations for lists and grids
const staggerElements = document.querySelectorAll('.reveal-stagger');
staggerElements.forEach(element => {
    const items = element.children;
    gsap.set(items, { opacity: 0, y: 30 });

    ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => {
            gsap.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }
    });
});

// Reveal text animation
const revealText = document.querySelectorAll('.reveal-text');
revealText.forEach(text => {
    gsap.set(text, {
        opacity: 0,
        y: 20
    });

    ScrollTrigger.create({
        trigger: text,
        start: "top 90%",
        onEnter: () => {
            gsap.to(text, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            });
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 50
                },
                ease: "power3.inOut"
            });
        }
    });
});

// Enhanced form animations
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    gsap.to(contactForm, {
        scale: 0.98,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });
    
    console.log('Form submitted:', formProps);
    alert('Message sent successfully!');
    contactForm.reset();
}); 