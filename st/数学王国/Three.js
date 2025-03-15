function initTopologyVisualization() {
    // 使用Three.js创建3D拓扑变换可视化
    const container = document.getElementById("topology-visualization");
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    // 添加轨道控制
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // 创建初始几何体
    let geometry;
    const shapeType = document.getElementById("shape-type").value;
    
    switch(shapeType) {
        case "sphere":
            geometry = new THREE.SphereGeometry(1.5, 32, 32);
            break;
        case "torus":
            geometry = new THREE.TorusGeometry(1, 0.4, 16, 50);
            break;
        case "mobius":
            geometry = createMobiusStrip();
            break;
        case "klein":
            geometry = createKleinBottle();
            break;
    }
    
    // 创建材质
    const material = new THREE.MeshNormalMaterial();
    
    // 创建网格
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    // 监听形状变化
    document.getElementById("shape-type").addEventListener("change", function() {
        scene.remove(mesh);
        
        const newShapeType = this.value;
        switch(newShapeType) {
            case "sphere":
                geometry = new THREE.SphereGeometry(1.5, 32, 32);
                break;
            case "torus":
                geometry = new THREE.TorusGeometry(1, 0.4, 16, 50);
                break;
            case "mobius":
                geometry = createMobiusStrip();
                break;
            case "klein":
                geometry = createKleinBottle();
                break;
        }
        
        const newMesh = new THREE.Mesh(geometry, material);
        scene.add(newMesh);
        
        // 更新拓扑不变量显示
        updateTopologicalInvariants(newShapeType);
    });
    
    // 初始化拓扑不变量显示
    updateTopologicalInvariants(shapeType);
}

function createMobiusStrip() {
    // 创建莫比乌斯带几何体
    const geometry = new THREE.ParametricGeometry(
        (u, v, target) => {
            u = u * Math.PI * 2;
            v = v * 2 - 1;
            
            const r = 1.5;
            const halfWidth = 0.5;
            
            const x = (r + halfWidth * v * Math.cos(u / 2)) * Math.cos(u);
            const y = (r + halfWidth * v * Math.cos(u / 2)) * Math.sin(u);
            const z = halfWidth * v * Math.sin(u / 2);
            
            target.set(x, y, z);
        },
        50, 20
    );
    
    return geometry;
}

function createKleinBottle() {
    // 创建克莱因瓶几何体（参数化表示）
    const geometry = new THREE.ParametricGeometry(
        (u, v, target) => {
            u = u * Math.PI * 2;
            v = v * Math.PI * 2;
            
            const a = 1.5;
            const n = 4;
            const m = 1;
            
            let x, y, z;
            
            if (u < Math.PI) {
                x = a * Math.cos(u) * (1 + Math.sin(u));
                y = a * Math.sin(u);
                z = a * Math.cos(u) * Math.cos(v) * (1 + Math.sin(u));
            } else {
                x = a * Math.cos(u) * (1 + Math.sin(u)) + m * Math.cos(n * v);
                y = a * Math.sin(u);
                z = a * Math.cos(u) * Math.cos(v) * (1 + Math.sin(u)) + m * Math.sin(n * v);
            }
            
            target.set(x, y, z);
        },
        50, 50
    );
    
    return geometry;
}

function updateTopologicalInvariants(shapeType) {
    const invariantsContainer = document.getElementById("topological-invariants");
    
    // 根据形状类型显示相应的拓扑不变量
    let eulerChar, genus, orientable;
    
    switch(shapeType) {
        case "sphere":
            eulerChar = 2;
            genus = 0;
            orientable = true;
            break;
        case "torus":
            eulerChar = 0;
            genus = 1;
            orientable = true;
            break;
        case "mobius":
            eulerChar = 0;
            genus = 1;
            orientable = false;
            break;
        case "klein":
            eulerChar = 0;
            genus = 2;
            orientable = false;
            break;
    }
    
    // 更新显示
    invariantsContainer.innerHTML = `
        <div class="grid grid-cols-3 gap-4 text-center">
            <div class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-300">${eulerChar}</div>
                <div class="text-sm text-blue-800 dark:text-blue-200">欧拉示性数</div>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-300">${genus}</div>
                <div class="text-sm text-blue-800 dark:text-blue-200">亏格</div>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-300">${orientable ? '是' : '否'}</div>
                <div class="text-sm text-blue-800 dark:text-blue-200">可定向性</div>
            </div>
        </div>
        <div class="mt-4 text-sm">
            <p><strong>欧拉公式</strong>: V - E + F = ${eulerChar}</p>
            <p>其中V是顶点数，E是边数，F是面数</p>
        </div>
    `;
}