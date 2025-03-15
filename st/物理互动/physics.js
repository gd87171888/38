// 全局变量
let currentSection = 'classical-mechanics';
let scene, camera, renderer;

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("页面加载完成，初始化物理可视化...");
    
    // 设置导航切换事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    
    // 初始显示第一个部分
    switchSection('classical-mechanics');
});

// 切换物理学分支部分
function switchSection(sectionId) {
    console.log("切换到部分:", sectionId);
    currentSection = sectionId;
    document.querySelectorAll('.physics-section').forEach(section => {
        section.classList.add('hidden');
    });
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        initVisualization(sectionId);
    }
}

// 初始化可视化
function initVisualization(sectionId) {
    if (scene) {
        scene.clear();
    } else {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById(sectionId + '-visualization').appendChild(renderer.domElement);
    }

    switch (sectionId) {
        case 'classical-mechanics':
            initMechanicsVisualization();
            break;
        case 'electromagnetism':
            initEMVisualization();
            break;
        case 'thermodynamics':
            initThermoVisualization();
            break;
        case 'quantum-mechanics':
            initQuantumVisualization();
            break;
        case 'relativity':
            initRelativityVisualization();
            break;
        case 'fluid-dynamics':
            initFluidVisualization();
            break;
        case 'wave-physics':
            initWaveVisualization();
            break;
        case 'nuclear-physics':
            initNuclearVisualization();
            break;
    }
}

// 经典力学可视化
function initMechanicsVisualization() {
    console.log("初始化经典力学可视化");
    // 这里可以添加经典力学的 3D 可视化逻辑
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// 电磁学可视化
function initEMVisualization() {
    console.log("初始化电磁学可视化");
    // 这里可以添加电磁学的 3D 可视化逻辑
}

// 热力学可视化
function initThermoVisualization() {
    console.log("初始化热力学可视化");
    // 这里可以添加热力学的 3D 可视化逻辑
}

// 量子力学可视化
function initQuantumVisualization() {
    console.log("初始化量子力学可视化");
    // 这里可以添加量子力学的 3D 可视化逻辑
}

// 相对论可视化
function initRelativityVisualization() {
    console.log("初始化相对论可视化");
    // 这里可以添加相对论的 3D 可视化逻辑
}

// 流体动力学可视化
function initFluidVisualization() {
    console.log("初始化流体动力学可视化");
    // 这里可以添加流体动力学的 3D 可视化逻辑
}

// 波动物理可视化
function initWaveVisualization() {
    console.log("初始化波动物理可视化");
    // 这里可以添加波动物理的 3D 可视化逻辑
}

// 核物理可视化
function initNuclearVisualization() {
    console.log("初始化核物理可视化");
    // 这里可以添加核物理的 3D 可视化逻辑
}