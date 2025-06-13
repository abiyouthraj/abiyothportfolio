// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create particle geometry
const particleCount = 500;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

// Initialize particles with random positions and colors
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = Math.random() * 2 - 1;
  positions[i * 3 + 1] = Math.random() * 2 - 1;
  positions[i * 3 + 2] = Math.random() * 2 - 1;

  colors[i * 3] = Math.random();
  colors[i * 3 + 1] = Math.random();
  colors[i * 3 + 2] = Math.random();
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Create particle material
const material = new THREE.PointsMaterial({
  size: 0.05,
  vertexColors: true,
  sizeAttenuation: true
});

// Create particle system
const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);

// Set camera position
camera.position.z = 2;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate particles
  particleSystem.rotation.x += 0.001;
  particleSystem.rotation.y += 0.001;

  renderer.render(scene, camera);
}
animate();
