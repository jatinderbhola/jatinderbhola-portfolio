/**
 * Cosmos Neural Background with Three.js
 * Creates an animated 3D background with particles, neural networks, and cosmic effects
 */

class CosmosBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.neuralNetwork = null;
        this.cosmicRings = [];
        this.brainWaves = [];
        
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        this.isAnimating = true;
        this.theme = 'cosmos';
        
        // Performance settings
        this.particleCount = 3000;
        this.neuralNodeCount = 50;
        this.ringCount = 5;
        this.waveCount = 3;
        
        // Bind methods
        this.animate = this.animate.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    /**
     * Initialize the 3D background
     */
    async init() {
        try {
            this.setupScene();
            this.setupCamera();
            this.setupRenderer();
            this.createParticleField();
            this.createNeuralNetwork();
            this.createCosmicRings();
            this.createBrainWaves();
            this.setupEventListeners();
            this.animate();
            
            console.log('🌌 Cosmos background initialized');
        } catch (error) {
            console.error('❌ Failed to initialize cosmos background:', error);
        }
    }

    /**
     * Setup Three.js scene
     */
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0B1426, 1, 2000);
    }

    /**
     * Setup camera
     */
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            3000
        );
        this.camera.position.set(0, 0, 1000);
    }

    /**
     * Setup renderer
     */
    setupRenderer() {
        const canvas = document.getElementById('cosmos-background');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            alpha: true,
            antialias: window.devicePixelRatio === 1
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0B1426, 0.8);
    }

    /**
     * Create particle field
     */
    createParticleField() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);

        // Color palette for cosmos theme
        const colorPalette = [
            new THREE.Color(0x00F5FF), // Neural cyan
            new THREE.Color(0xFF6B9D), // Neural pink
            new THREE.Color(0x8B5FBF), // Neural purple
            new THREE.Color(0xFFD700), // Cosmic gold
            new THREE.Color(0x39FF83)  // Neural green
        ];

        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Position particles in a cosmic distribution
            const radius = Math.random() * 2000 + 200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Assign colors
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Assign sizes
            sizes[i] = Math.random() * 3 + 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Particle material with glow effect
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: window.devicePixelRatio }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                uniform float pixelRatio;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Add floating animation
                    mvPosition.y += sin(time * 0.5 + position.x * 0.01) * 20.0;
                    mvPosition.x += cos(time * 0.3 + position.z * 0.01) * 15.0;
                    
                    gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                    
                    // Add glow effect
                    alpha = pow(alpha, 0.8);
                    
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexColors: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    /**
     * Create neural network connections
     */
    createNeuralNetwork() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.neuralNodeCount * 6); // 2 points per connection
        const colors = new Float32Array(this.neuralNodeCount * 6);
        const pulsePositions = new Float32Array(this.neuralNodeCount * 3); // For electric pulses

        // Create nodes with more organic distribution
        const nodes = [];
        for (let i = 0; i < this.neuralNodeCount; i++) {
            // Create a more brain-like distribution
            const radius = Math.random() * 800 + 200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            nodes.push({
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.sin(phi) * Math.sin(theta),
                z: radius * Math.cos(phi),
                pulse: 0,
                pulseSpeed: 0.02 + Math.random() * 0.03
            });
        }

        // Create connections between nearby nodes
        let connectionIndex = 0;
        for (let i = 0; i < nodes.length && connectionIndex < this.neuralNodeCount; i++) {
            for (let j = i + 1; j < nodes.length && connectionIndex < this.neuralNodeCount; j++) {
                const distance = Math.sqrt(
                    Math.pow(nodes[i].x - nodes[j].x, 2) +
                    Math.pow(nodes[i].y - nodes[j].y, 2) +
                    Math.pow(nodes[i].z - nodes[j].z, 2)
                );

                if (distance < 300) {
                    const i6 = connectionIndex * 6;
                    
                    // First point
                    positions[i6] = nodes[i].x;
                    positions[i6 + 1] = nodes[i].y;
                    positions[i6 + 2] = nodes[i].z;
                    
                    // Second point
                    positions[i6 + 3] = nodes[j].x;
                    positions[i6 + 4] = nodes[j].y;
                    positions[i6 + 5] = nodes[j].z;

                    // Colors (cyan for neural connections)
                    colors[i6] = colors[i6 + 3] = 0;      // R
                    colors[i6 + 1] = colors[i6 + 4] = 0.96; // G
                    colors[i6 + 2] = colors[i6 + 5] = 1;    // B

                    connectionIndex++;
                }
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create electric pulse material
        const pulseMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x00F5FF) }
            },
            vertexShader: `
                attribute float pulse;
                varying float vPulse;
                
                void main() {
                    vPulse = pulse;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying float vPulse;
                
                void main() {
                    float intensity = pow(vPulse, 2.0);
                    gl_FragColor = vec4(color, intensity * 0.8);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        const material = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });

        this.neuralNetwork = new THREE.LineSegments(geometry, material);
        this.scene.add(this.neuralNetwork);

        // Store nodes for animation
        this.neuralNodes = nodes;
    }

    /**
     * Create cosmic rings
     */
    createCosmicRings() {
        for (let i = 0; i < this.ringCount; i++) {
            const geometry = new THREE.RingGeometry(100 + i * 150, 120 + i * 150, 64);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.6 + i * 0.1, 0.8, 0.5),
                transparent: true,
                opacity: 0.1,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending
            });

            const ring = new THREE.Mesh(geometry, material);
            ring.position.set(
                (Math.random() - 0.5) * 1000,
                (Math.random() - 0.5) * 1000,
                (Math.random() - 0.5) * 1000
            );
            ring.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            this.cosmicRings.push(ring);
            this.scene.add(ring);
        }
    }

    /**
     * Create brain wave patterns
     */
    createBrainWaves() {
        for (let w = 0; w < this.waveCount; w++) {
            const curve = new THREE.EllipseCurve(
                0, 0,
                200 + w * 100, 200 + w * 100,
                0, 2 * Math.PI,
                false,
                0
            );

            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const material = new THREE.LineBasicMaterial({
                color: new THREE.Color(0xFF6B9D),
                transparent: true,
                opacity: 0.4,
                blending: THREE.AdditiveBlending
            });

            const wave = new THREE.Line(geometry, material);
            wave.position.set(0, 0, -500 - w * 200);
            
            this.brainWaves.push(wave);
            this.scene.add(wave);
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('resize', this.handleResize);
    }

    /**
     * Handle mouse movement
     */
    handleMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    /**
     * Handle window resize
     */
    handleResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Animation loop
     */
    animate() {
        if (!this.isAnimating) return;

        requestAnimationFrame(this.animate);
        this.time += 0.01;

        // Update particles
        if (this.particles && this.particles.material.uniforms) {
            this.particles.material.uniforms.time.value = this.time;
            this.particles.rotation.y += 0.001;
            this.particles.rotation.x += 0.0005;
        }

        // Update neural network with electric pulses
        if (this.neuralNetwork && this.neuralNodes) {
            this.neuralNetwork.rotation.y += 0.002;
            this.neuralNetwork.rotation.x += 0.001;
            
            // Update pulse animations
            this.neuralNodes.forEach((node, index) => {
                node.pulse += node.pulseSpeed;
                if (node.pulse > 1) {
                    node.pulse = 0;
                    // Randomly trigger pulses in connected nodes
                    this.neuralNodes.forEach(otherNode => {
                        if (Math.random() < 0.3) {
                            otherNode.pulse = 0;
                        }
                    });
                }
            });

            // Update neural network opacity based on pulses
            const pulseIntensity = Math.sin(this.time * 2) * 0.1 + 0.9;
            this.neuralNetwork.material.opacity = pulseIntensity * 0.3;
        }

        // Update cosmic rings
        this.cosmicRings.forEach((ring, index) => {
            ring.rotation.z += 0.001 * (index + 1);
            ring.rotation.x += 0.0005 * (index + 1);
            
            // Breathing effect
            const scale = Math.sin(this.time + index) * 0.1 + 1;
            ring.scale.setScalar(scale);
        });

        // Update brain waves
        this.brainWaves.forEach((wave, index) => {
            wave.rotation.z += 0.002 * (index + 1);
            
            // Wave animation
            const waveScale = Math.sin(this.time * 2 + index) * 0.2 + 1;
            wave.scale.setScalar(waveScale);
        });

        // Mouse interaction
        if (this.particles) {
            this.particles.rotation.x += (this.mouse.y - this.particles.rotation.x) * 0.01;
            this.particles.rotation.y += (this.mouse.x - this.particles.rotation.y) * 0.01;
        }

        // Camera sway
        this.camera.position.x += (this.mouse.x * 50 - this.camera.position.x) * 0.02;
        this.camera.position.y += (-this.mouse.y * 50 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Update scroll-based effects
     * @param {number} scrollProgress - Scroll progress (0-1)
     */
    updateScroll(scrollProgress) {
        if (!this.camera) return;

        // Move camera based on scroll
        this.camera.position.z = 1000 - scrollProgress * 200;
        
        // Rotate entire scene
        if (this.scene) {
            this.scene.rotation.y = scrollProgress * 0.5;
        }
    }

    /**
     * Set theme
     * @param {string} theme - Theme name ('cosmos' or 'neural')
     */
    setTheme(theme) {
        this.theme = theme;
        
        if (theme === 'neural') {
            // Neural theme: more pink/purple tones
            this.scene.fog.color.setHex(0x1A0B26);
            this.renderer.setClearColor(0x1A0B26, 0.8);
            
            // Update particle colors to more neural tones
            if (this.particles) {
                const colors = this.particles.geometry.attributes.color.array;
                const neuralColors = [
                    new THREE.Color(0xFF6B9D), // Neural pink
                    new THREE.Color(0x8B5FBF), // Neural purple
                    new THREE.Color(0x00F5FF), // Neural cyan
                    new THREE.Color(0x9D4EDD), // Electric purple
                    new THREE.Color(0xFF1493)  // Deep pink
                ];
                
                for (let i = 0; i < colors.length; i += 3) {
                    const color = neuralColors[Math.floor(Math.random() * neuralColors.length)];
                    colors[i] = color.r;
                    colors[i + 1] = color.g;
                    colors[i + 2] = color.b;
                }
                
                this.particles.geometry.attributes.color.needsUpdate = true;
            }
        } else {
            // Cosmos theme: more blue/cyan tones
            this.scene.fog.color.setHex(0x0B1426);
            this.renderer.setClearColor(0x0B1426, 0.8);
            
            // Restore original cosmic colors
            if (this.particles) {
                const colors = this.particles.geometry.attributes.color.array;
                const cosmicColors = [
                    new THREE.Color(0x00F5FF), // Neural cyan
                    new THREE.Color(0xFF6B9D), // Neural pink
                    new THREE.Color(0x8B5FBF), // Neural purple
                    new THREE.Color(0xFFD700), // Cosmic gold
                    new THREE.Color(0x39FF83)  // Neural green
                ];
                
                for (let i = 0; i < colors.length; i += 3) {
                    const color = cosmicColors[Math.floor(Math.random() * cosmicColors.length)];
                    colors[i] = color.r;
                    colors[i + 1] = color.g;
                    colors[i + 2] = color.b;
                }
                
                this.particles.geometry.attributes.color.needsUpdate = true;
            }
        }
    }

    /**
     * Pause animations
     */
    pause() {
        this.isAnimating = false;
    }

    /**
     * Resume animations
     */
    resume() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    /**
     * Add special effects for section transitions
     * @param {string} section - Section being viewed
     */
    onSectionChange(section) {
        switch (section) {
            case 'ai':
                // Intensify neural network for AI section
                if (this.neuralNetwork) {
                    this.neuralNetwork.material.opacity = 0.6;
                }
                break;
                
            case 'skills':
                // Make cosmic rings more prominent
                this.cosmicRings.forEach(ring => {
                    ring.material.opacity = 0.3;
                });
                break;
                
            case 'experience':
                // Add timeline effect
                this.addTimelineEffect();
                break;
                
            default:
                // Reset to default states
                if (this.neuralNetwork) {
                    this.neuralNetwork.material.opacity = 0.3;
                }
                this.cosmicRings.forEach(ring => {
                    ring.material.opacity = 0.1;
                });
                break;
        }
    }

    /**
     * Add timeline effect for experience section
     */
    addTimelineEffect() {
        // Create a timeline beam
        const geometry = new THREE.CylinderGeometry(2, 2, 1000, 8);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00F5FF,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        
        const timeline = new THREE.Mesh(geometry, material);
        timeline.position.set(0, 0, -200);
        timeline.rotation.z = Math.PI / 2;
        
        this.scene.add(timeline);
        
        // Animate timeline appearance
        let opacity = 0;
        const animateTimeline = () => {
            opacity += 0.02;
            timeline.material.opacity = Math.sin(opacity) * 0.3;
            
            if (opacity < Math.PI * 2) {
                requestAnimationFrame(animateTimeline);
            } else {
                // Remove timeline after animation
                setTimeout(() => {
                    this.scene.remove(timeline);
                    timeline.geometry.dispose();
                    timeline.material.dispose();
                }, 3000);
            }
        };
        
        animateTimeline();
    }

    /**
     * Create particle burst effect
     * @param {Object} position - {x, y, z} position for burst
     * @param {string} color - Hex color for particles
     */
    createParticleBurst(position, color = 0x00F5FF) {
        const burstCount = 50;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(burstCount * 3);
        const velocities = [];

        for (let i = 0; i < burstCount; i++) {
            const i3 = i * 3;
            positions[i3] = position.x;
            positions[i3 + 1] = position.y;
            positions[i3 + 2] = position.z;

            // Random velocities
            velocities.push({
                x: (Math.random() - 0.5) * 20,
                y: (Math.random() - 0.5) * 20,
                z: (Math.random() - 0.5) * 20
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: color,
            size: 3,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending
        });

        const burst = new THREE.Points(geometry, material);
        this.scene.add(burst);

        // Animate burst
        let life = 0;
        const animateBurst = () => {
            life += 0.02;
            const positions = burst.geometry.attributes.position.array;

            for (let i = 0; i < burstCount; i++) {
                const i3 = i * 3;
                positions[i3] += velocities[i].x;
                positions[i3 + 1] += velocities[i].y;
                positions[i3 + 2] += velocities[i].z;

                // Apply gravity
                velocities[i].y -= 0.5;
            }

            burst.geometry.attributes.position.needsUpdate = true;
            material.opacity = 1 - life;

            if (life < 1) {
                requestAnimationFrame(animateBurst);
            } else {
                this.scene.remove(burst);
                burst.geometry.dispose();
                material.dispose();
            }
        };

        animateBurst();
    }

    /**
     * Get performance stats
     * @returns {Object} Performance statistics
     */
    getStats() {
        return {
            particles: this.particleCount,
            neuralConnections: this.neuralNodeCount,
            cosmicRings: this.ringCount,
            brainWaves: this.waveCount,
            isAnimating: this.isAnimating,
            theme: this.theme,
            renderer: {
                drawCalls: this.renderer.info.render.calls,
                triangles: this.renderer.info.render.triangles,
                points: this.renderer.info.render.points
            }
        };
    }

    /**
     * Optimize performance based on device capabilities
     */
    optimizePerformance() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency < 4;

        if (isMobile || isLowEnd) {
            // Reduce particle count for mobile/low-end devices
            this.particleCount = Math.floor(this.particleCount * 0.5);
            this.neuralNodeCount = Math.floor(this.neuralNodeCount * 0.7);
            this.ringCount = Math.floor(this.ringCount * 0.6);
            
            // Disable some effects
            this.renderer.setPixelRatio(1);
            
            console.log('🔧 Performance optimized for mobile/low-end device');
        }
    }

    /**
     * Dispose of resources
     */
    dispose() {
        this.isAnimating = false;
        
        // Remove event listeners
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('resize', this.handleResize);

        // Dispose geometries and materials
        if (this.particles) {
            this.particles.geometry.dispose();
            this.particles.material.dispose();
        }

        if (this.neuralNetwork) {
            this.neuralNetwork.geometry.dispose();
            this.neuralNetwork.material.dispose();
        }

        this.cosmicRings.forEach(ring => {
            ring.geometry.dispose();
            ring.material.dispose();
        });

        this.brainWaves.forEach(wave => {
            wave.geometry.dispose();
            wave.material.dispose();
        });

        // Dispose renderer
        if (this.renderer) {
            this.renderer.dispose();
        }

        console.log('🧹 Cosmos background disposed');
    }
}

// Export to global scope
window.CosmosBackground = CosmosBackground;