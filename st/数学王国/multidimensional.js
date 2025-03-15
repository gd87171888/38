// 多维空间可视化与交互功能

// 三维空间可视化
function init3DVisualization(containerId) {
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f5ff);
    
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
    
    // 创建3D几何体
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.8,
        wireframe: false
    });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // 添加坐标轴
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    return {
        scene,
        camera,
        renderer,
        controls,
        objects: { cube }
    };
}

// 四维超立方体可视化
function init4DVisualization(containerId) {
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8ff);
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    // 添加轨道控制
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // 创建超立方体（通过投影到3D空间）
    const tesseract = createTesseract();
    scene.add(tesseract);
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // 动画循环
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        updateTesseract(tesseract, time);
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    return {
        scene,
        camera,
        renderer,
        controls
    };
}

// 创建四维超立方体
function createTesseract() {
    const group = new THREE.Group();
    
    // 超立方体的顶点（4D）
    const vertices4D = [
        [-1, -1, -1, -1], [1, -1, -1, -1], [1, 1, -1, -1], [-1, 1, -1, -1],
        [-1, -1, 1, -1], [1, -1, 1, -1], [1, 1, 1, -1], [-1, 1, 1, -1],
        [-1, -1, -1, 1], [1, -1, -1, 1], [1, 1, -1, 1], [-1, 1, -1, 1],
        [-1, -1, 1, 1], [1, -1, 1, 1], [1, 1, 1, 1], [-1, 1, 1, 1]
    ];
    
    // 超立方体的边
    const edges = [
        // 3D立方体1的边
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
        // 3D立方体2的边
        [8, 9], [9, 10], [10, 11], [11, 8],
        [12, 13], [13, 14], [14, 15], [15, 12],
        [8, 12], [9, 13], [10, 14], [11, 15],
        // 连接两个3D立方体的边
        [0, 8], [1, 9], [2, 10], [3, 11],
        [4, 12], [5, 13], [6, 14], [7, 15]
    ];
    
    // 创建边的几何体
    edges.forEach(edge => {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.LineBasicMaterial({ color: 0x6366f1, linewidth: 2 });
        
        // 初始化为空，将在updateTesseract中更新
        geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
        
        const line = new THREE.Line(geometry, material);
        line.userData = {
            vertices4D: [vertices4D[edge[0]], vertices4D[edge[1]]],
            edge: edge
        };
        
        group.add(line);
    });
    
    // 添加顶点可视化
    vertices4D.forEach(vertex => {
        const geometry = new THREE.SphereGeometry(0.1, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xec4899 });
        const sphere = new THREE.Mesh(geometry, material);
        
        sphere.userData = {
            vertex4D: vertex
        };
        
        group.add(sphere);
    });
    
    return group;
}

// 更新超立方体投影
function updateTesseract(tesseract, time) {
    // 4D旋转矩阵（简化版，只在两个平面上旋转）
    const rotateXY = angle => {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return [
            [c, -s, 0, 0],
            [s, c, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    };
    
    const rotateZW = angle => {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, c, -s],
            [0, 0, s, c]
        ];
    };
    
    // 矩阵乘法
    const multiplyMatrix = (m, v) => {
        return [
            m[0][0]*v[0] + m[0][1]*v[1] + m[0][2]*v[2] + m[0][3]*v[3],
            m[1][0]*v[0] + m[1][1]*v[1] + m[1][2]*v[2] + m[1][3]*v[3],
            m[2][0]*v[0] + m[2][1]*v[1] + m[2][2]*v[2] + m[2][3]*v[3],
            m[3][0]*v[0] + m[3][1]*v[1] + m[3][2]*v[2] + m[3][3]*v[3]
        ];
    };
    
    // 透视投影到3D
    const projectTo3D = (v, distance = 2) => {
        const w = 1 / (distance - v[3]);
        return [v[0] * w, v[1] * w, v[2] * w];
    };
    
    // 应用旋转和投影
    const rotationXY = rotateXY(time * 0.5);
    const rotationZW = rotateZW(time * 0.3);
    
    tesseract.children.forEach(child => {
        if (child instanceof THREE.Line) {
            const v1 = multiplyMatrix(rotationXY, child.userData.vertices4D[0]);
            const v2 = multiplyMatrix(rotationXY, child.userData.vertices4D[1]);
            const v1Rotated = multiplyMatrix(rotationZW, v1);
            const v2Rotated = multiplyMatrix(rotationZW, v2);
            
            const v1Projected = projectTo3D(v1Rotated);
            const v2Projected = projectTo3D(v2Rotated);
            
            const positions = new Float32Array([
                v1Projected[0], v1Projected[1], v1Projected[2],
                v2Projected[0], v2Projected[1], v2Projected[2]
            ]);
            
            child.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            child.geometry.attributes.position.needsUpdate = true;
        } else if (child instanceof THREE.Mesh && child.userData.vertex4D) {
            const v = multiplyMatrix(rotationXY, child.userData.vertex4D);
            const vRotated = multiplyMatrix(rotationZW, v);
            const vProjected = projectTo3D(vRotated);
            
            child.position.set(vProjected[0], vProjected[1], vProjected[2]);
        }
    });
}

// 五维空间可视化（概念性）
function init5DVisualization(containerId) {
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // 创建SVG元素
    const svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)");
    
    // 创建五维数据点（使用颜色、大小、形状等视觉属性表示额外维度）
    const numPoints = 100;
    const data = [];
    
    for (let i = 0; i < numPoints; i++) {
        data.push({
            x: Math.random() * width * 0.8 + width * 0.1,  // 第一维
            y: Math.random() * height * 0.8 + height * 0.1, // 第二维
            z: Math.random() * 100,                        // 第三维（用大小表示）
            w: Math.random(),                              // 第四维（用颜色表示）
            v: Math.floor(Math.random() * 5)               // 第五维（用形状表示）
        });
    }
    
    // 颜色比例尺（第四维）
    const colorScale = d3.scaleSequential(d3.interpolateRainbow)
        .domain([0, 1]);
    
    // 大小比例尺（第三维）
    const sizeScale = d3.scaleLinear()
        .domain([0, 100])
        .range([5, 25]);
    
    // 形状生成器（第五维）
    const symbolTypes = [
        d3.symbolCircle,
        d3.symbolCross,
        d3.symbolDiamond,
        d3.symbolSquare,
        d3.symbolStar
    ];
    
    const symbolGenerator = d3.symbol()
        .size(d => sizeScale(d.z) * 20);
    
    // 创建图例
    createLegend(svg, width, height, colorScale, symbolTypes);
    
    // 绘制数据点
    svg.selectAll(".data-point")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "data-point")
        .attr("d", d => {
            symbolGenerator.type(symbolTypes[d.v]);
            return symbolGenerator();
        })
        .attr("transform", d =>