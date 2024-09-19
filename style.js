const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load('./img/master.JPG')

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({map: brickTexture});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;
camera.position.z = 2;
const pointLight = new THREE.PointLight(0xfffff, 1, 100)
pointLight.position.set(10, 10, 10);
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)


function animate(){
    requestAnimationFrame(animate);
    cube.rotation.z += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera)
}
animate()

let moveSpeed = 0.1
let rotationSpeed = 0.02
let keys = {}

function updateCameraMovement(){
    if(keys['ArrowUp'] || keys['w']) camera.position.z -= moveSpeed
    if(keys['ArrowDown'] || keys['s']) camera.position.z += moveSpeed

    if(keys['ArrowLeft'] || keys['a']) camera.position.y -= moveSpeed
    if(keys['ArrowRight'] || keys['d']) camera.position.y += moveSpeed
}

function update(){
    updateCameraMovement();
    requestAnimationFrame(update);
}
update();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})