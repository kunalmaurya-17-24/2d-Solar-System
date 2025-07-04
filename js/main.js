class SolarSystem {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        // Scene setup
        this.canvasContainer = document.getElementById('canvas-container');
        this.width = this.canvasContainer.clientWidth;
        this.height = this.canvasContainer.clientHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.canvasContainer.appendChild(this.renderer.domElement);

        // Animation controls
        this.clock = new THREE.Clock();
        this.isPaused = false;
        this.isDarkMode = true;
        this.cameraControls = {
            mouseX: 0,
            mouseY: 0,
            isMouseDown: false,
            targetX: 0,
            targetY: 0,
            radius: 80,
            theta: 0,
            phi: 0
        };

        // Planet data with realistic orbital periods (adjusted for visualization)
        this.planetData = [
            { 
                name: 'mercury', 
                color: 0x8C7853, 
                distance: 12, 
                size: 0.4, 
                baseSpeed: 0.05, 
                speedMultiplier: 1,
                rotationSpeed: 0.01,
                info: 'Mercury: Closest planet to the Sun. Orbital period: 88 Earth days.'
            },
            { 
                name: 'venus', 
                color: 0xFFC649, 
                distance: 16, 
                size: 0.7, 
                baseSpeed: 0.035, 
                speedMultiplier: 1,
                rotationSpeed: 0.008,
                info: 'Venus: Hottest planet in our solar system. Orbital period: 225 Earth days.'
            },
            { 
                name: 'earth', 
                color: 0x6B93D6, 
                distance: 20, 
                size: 0.8, 
                baseSpeed: 0.03, 
                speedMultiplier: 1,
                rotationSpeed: 0.02,
                info: 'Earth: Our home planet. Orbital period: 365 Earth days.'
            },
            { 
                name: 'mars', 
                color: 0xC1440E, 
                distance: 25, 
                size: 0.6, 
                baseSpeed: 0.024, 
                speedMultiplier: 1,
                rotationSpeed: 0.018,
                info: 'Mars: The Red Planet. Orbital period: 687 Earth days.'
            },
            { 
                name: 'jupiter', 
                color: 0xD8CA9D, 
                distance: 32, 
                size: 1.5, 
                baseSpeed: 0.013, 
                speedMultiplier: 1,
                rotationSpeed: 0.04,
                info: 'Jupiter: Largest planet in our solar system. Orbital period: 12 Earth years.'
            },
            { 
                name: 'saturn', 
                color: 0xFAD5A5, 
                distance: 40, 
                size: 1.2, 
                baseSpeed: 0.009, 
                speedMultiplier: 1,
                rotationSpeed: 0.038,
                info: 'Saturn: Known for its beautiful rings. Orbital period: 29 Earth years.'
            },
            { 
                name: 'uranus', 
                color: 0x4FD0E7, 
                distance: 48, 
                size: 1.0, 
                baseSpeed: 0.006, 
                speedMultiplier: 1,
                rotationSpeed: 0.03,
                info: 'Uranus: Tilted sideways. Orbital period: 84 Earth years.'
            },
            { 
                name: 'neptune', 
                color: 0x4B70DD, 
                distance: 56, 
                size: 0.9, 
                baseSpeed: 0.004, 
                speedMultiplier: 1,
                rotationSpeed: 0.032,
                info: 'Neptune: Windiest planet in our solar system. Orbital period: 165 Earth years.'
            }
        ];

        this.planets = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredPlanet = null;

        this.createStarfield();
        this.createSun();
        this.createPlanets();
        this.setupLighting();
        this.setupCamera();
        this.setupOrbitLines();
    }

    createStarfield() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 1000;
        const positions = new Float32Array(starCount * 3);
        
        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 500;
            positions[i + 1] = (Math.random() - 0.5) * 500;
            positions[i + 2] = (Math.random() - 0.5) * 500;
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starMaterial = new THREE.PointsMaterial({ 
            color: 0xffffff, 
            size: 0.5,
            transparent: true,
            opacity: 0.8
        });
        
        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);
    }

    createSun() {
        const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffff00,
            emissive: 0xffff00,
            emissiveIntensity: 0.3
        });
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.name = 'sun';
        this.sun.castShadow = false;
        this.sun.receiveShadow = false;
        this.scene.add(this.sun);

        // Add sun glow effect
        const glowGeometry = new THREE.SphereGeometry(5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.1
        });
        const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.scene.add(sunGlow);
    }

    createPlanets() {
        this.planetData.forEach((data, index) => {
            const geometry = new THREE.SphereGeometry(data.size, 32, 32);
            const material = new THREE.MeshLambertMaterial({ 
                color: data.color,
                transparent: true,
                opacity: 0.9
            });
            const planet = new THREE.Mesh(geometry, material);
            planet.name = data.name;
            planet.position.x = data.distance;
            planet.castShadow = true;
            planet.receiveShadow = true;
            this.scene.add(planet);

            this.planets.push({
                mesh: planet,
                data: data,
                angle: Math.random() * Math.PI * 2, // Random starting position
                rotationAngle: 0
            });
        });
    }

    setupOrbitLines() {
        this.planetData.forEach(data => {
            const curve = new THREE.EllipseCurve(
                0, 0,
                data.distance, data.distance,
                0, 2 * Math.PI,
                false,
                0
            );
            const points = curve.getPoints(100);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ 
                color: 0x333333,
                transparent: true,
                opacity: 0.3
            });
            const ellipse = new THREE.Line(geometry, material);
            ellipse.rotation.x = Math.PI / 2;
            this.scene.add(ellipse);
        });
    }

    setupLighting() {
        // Ambient light
        this.ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(this.ambientLight);

        // Point light from the sun
        this.sunLight = new THREE.PointLight(0xffffff, 1, 200);
        this.sunLight.position.set(0, 0, 0);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 2048;
        this.sunLight.shadow.mapSize.height = 2048;
        this.scene.add(this.sunLight);

        // Directional light for better visibility
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(10, 10, 10);
        this.scene.add(this.directionalLight);
    }

    setupCamera() {
        this.camera.position.set(0, 30, 80);
        this.camera.lookAt(0, 0, 0);
        this.cameraControls.radius = 80;
    }

    setupEventListeners() {
        // Speed control sliders
        document.querySelectorAll('.planet-slider').forEach(slider => {
            slider.addEventListener('input', (event) => {
                const planetName = event.target.dataset.planet;
                const planet = this.planets.find(p => p.mesh.name === planetName);
                if (planet) {
                    planet.data.speedMultiplier = parseFloat(event.target.value);
                    event.target.nextElementSibling.textContent = `${event.target.value}x`;
                }
            });
        });

        // Pause/Resume button
        document.getElementById('pause-btn').addEventListener('click', () => {
            this.isPaused = !this.isPaused;
            document.getElementById('pause-btn').textContent = this.isPaused ? 'Resume' : 'Pause';
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetSimulation();
        });

        // Theme toggle
        document.getElementById('theme-btn').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Mouse controls for camera
        this.renderer.domElement.addEventListener('mousedown', (event) => {
            this.cameraControls.isMouseDown = true;
            this.cameraControls.mouseX = event.clientX;
            this.cameraControls.mouseY = event.clientY;
        });

        this.renderer.domElement.addEventListener('mouseup', () => {
            this.cameraControls.isMouseDown = false;
        });

        this.renderer.domElement.addEventListener('mousemove', (event) => {
            if (this.cameraControls.isMouseDown) {
                const deltaX = event.clientX - this.cameraControls.mouseX;
                const deltaY = event.clientY - this.cameraControls.mouseY;
                
                this.cameraControls.theta += deltaX * 0.01;
                this.cameraControls.phi += deltaY * 0.01;
                
                this.cameraControls.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.cameraControls.phi));
                
                this.cameraControls.mouseX = event.clientX;
                this.cameraControls.mouseY = event.clientY;
            }

            // Update mouse position for raycasting
            this.mouse.x = (event.clientX / this.width) * 2 - 1;
            this.mouse.y = -(event.clientY / this.height) * 2 + 1;
            
            this.checkHover();
        });

        // Mouse wheel for zoom
        this.renderer.domElement.addEventListener('wheel', (event) => {
            this.cameraControls.radius += event.deltaY * 0.01;
            this.cameraControls.radius = Math.max(20, Math.min(200, this.cameraControls.radius));
            event.preventDefault();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }

    checkHover() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.planets.map(p => p.mesh));
        
        if (intersects.length > 0) {
            const planet = intersects[0].object;
            if (this.hoveredPlanet !== planet) {
                this.hoveredPlanet = planet;
                this.showPlanetInfo(planet);
            }
        } else {
            if (this.hoveredPlanet) {
                this.hoveredPlanet = null;
                this.hidePlanetInfo();
            }
        }
    }

    showPlanetInfo(planet) {
        const planetData = this.planetData.find(p => p.name === planet.name);
        if (planetData) {
            document.getElementById('info-title').textContent = planet.name.charAt(0).toUpperCase() + planet.name.slice(1);
            document.getElementById('info-content').textContent = planetData.info;
            document.getElementById('info-panel').style.display = 'block';
        }
    }

    hidePlanetInfo() {
        document.getElementById('info-panel').style.display = 'none';
    }

    resetSimulation() {
        // Reset all planet positions and speeds
        this.planets.forEach((planet, index) => {
            planet.angle = Math.random() * Math.PI * 2;
            planet.data.speedMultiplier = 1;
            planet.rotationAngle = 0;
        });
        
        // Reset sliders
        document.querySelectorAll('.planet-slider').forEach(slider => {
            slider.value = 1;
            slider.nextElementSibling.textContent = '1.0x';
        });
        
        // Reset camera
        this.cameraControls.theta = 0;
        this.cameraControls.phi = Math.PI / 2;
        this.cameraControls.radius = 80;
        
        // Resume if paused
        if (this.isPaused) {
            this.isPaused = false;
            document.getElementById('pause-btn').textContent = 'Pause';
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        const themeBtn = document.getElementById('theme-btn');
        
        if (this.isDarkMode) {
            document.body.style.background = '#000';
            this.renderer.setClearColor(0x000000);
            this.ambientLight.intensity = 0.4;
            themeBtn.textContent = 'Light Mode';
        } else {
            document.body.style.background = '#1a1a2e';
            this.renderer.setClearColor(0x1a1a2e);
            this.ambientLight.intensity = 0.6;
            themeBtn.textContent = 'Dark Mode';
        }
    }

    updateCamera() {
        const x = this.cameraControls.radius * Math.sin(this.cameraControls.phi) * Math.cos(this.cameraControls.theta);
        const y = this.cameraControls.radius * Math.cos(this.cameraControls.phi);
        const z = this.cameraControls.radius * Math.sin(this.cameraControls.phi) * Math.sin(this.cameraControls.theta);
        
        this.camera.position.set(x, y, z);
        this.camera.lookAt(0, 0, 0);
    }

    onWindowResize() {
        this.width = this.canvasContainer.clientWidth;
        this.height = this.canvasContainer.clientHeight;
        
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(this.width, this.height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (!this.isPaused) {
            const delta = this.clock.getDelta();
            
            // Rotate sun
            this.sun.rotation.y += 0.005;
            
            // Animate planets
            this.planets.forEach(planet => {
                // Orbital motion
                planet.angle += planet.data.baseSpeed * planet.data.speedMultiplier * delta;
                planet.mesh.position.x = Math.cos(planet.angle) * planet.data.distance;
                planet.mesh.position.z = Math.sin(planet.angle) * planet.data.distance;
                
                // Planet rotation
                planet.rotationAngle += planet.data.rotationSpeed * delta;
                planet.mesh.rotation.y = planet.rotationAngle;
            });
            
            // Animate stars
            this.stars.rotation.y += 0.0001;
        }
        
        this.updateCamera();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the solar system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SolarSystem();
});
