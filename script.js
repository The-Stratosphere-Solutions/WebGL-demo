
        let scene, camera, renderer;
        let torus;
        let mouseX = 0, mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        function init() {

            scene = new THREE.Scene();
            scene.background = null; 

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
            camera.position.z = 50;

            renderer = new THREE.WebGLRenderer({ 
                antialias: true, 
                alpha: true 
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            document.getElementById('canvas-container').appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            const geometry = new THREE.TorusGeometry(15, 5, 16, 100);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0xffffff, 
                metalness: 0.5,
                roughness: 0.2,
                wireframe: false 
            });

            torus = new THREE.Mesh(geometry, material);
            scene.add(torus);

            document.addEventListener('mousemove', onDocumentMouseMove);
            window.addEventListener('resize', onWindowResize);

            animate();
        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) * 0.2;
            mouseY = (event.clientY - windowHalfY) * 0.2;
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);

            if (torus) {
                torus.rotation.x += 0.005;
                torus.rotation.y += 0.008;
            }

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        init();