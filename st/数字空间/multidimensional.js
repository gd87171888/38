// 多维空间互动功能

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 加载必要的脚本
    loadScripts([
        'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js',
        'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js',
        'https://cdn.jsdelivr.net/npm/d3@7.0.0/dist/d3.min.js'
    ], initMultidimensionalExperience);
});

// 加载脚本函数
function loadScripts(urls, callback) {
    let loadedCount = 0;
    
    urls.forEach(url => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            loadedCount++;
            if (loadedCount === urls.length) {
                callback();
            }
        };
        document.head.appendChild(script);
    });
}

// 添加必要的样式
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .dimension-content.hidden,
        .dimension-visualization.hidden,
        .dimension-controls.hidden {
            display: none;
        }
        
        .dimension-content.active,
        .dimension-visualization.active,
        .dimension-controls.active {
            display: block;
        }
        
        .dimension-btn.active {
            font-weight: bold;
        }
        
        .visualization-container {
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            overflow: hidden;
            background-color: #f8fafc;
        }
        
        .dark .visualization-container {
            background-color: #1e293b;
            border-color: #334155;
        }
    `;
    document.head.appendChild(style);
}

// 初始化多维空间体验
function initMultidimensionalExperience() {
    // 添加样式
    addStyles();
    
    // 初始化可视化
    const vis3D = init3DVisualization('3d-visualization');
    const vis4D = init4DVisualization('4d-visualization');
    const vis5D = init5DVisualization('5d-visualization');
    
    // 设置维度切换
    setupDimensionSwitching(vis3D, vis4D, vis5D);
    
    // 设置控制器
    setupControls(vis3D, vis4D, vis5D);
}

// 设置维度切换
function setupDimensionSwitching(vis3D, vis4D, vis5D) {
    const dimensionButtons = document.querySelectorAll('.dimension-btn');
    
    dimensionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dimension = this.getAttribute('data-dimension');
            
            // 更新按钮状态
            dimensionButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            document.querySelectorAll('.dimension-content').forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            document.getElementById(`${dimension}-description`).classList.remove('hidden');
            document.getElementById(`${dimension}-description`).classList.add('active');
            
            // 更新可视化显示
            document.querySelectorAll('.dimension-visualization').forEach(vis => {
                vis.classList.add('hidden');
                vis.classList.remove('active');
            });
            
            document.getElementById(`${dimension}-visualization`).classList.remove('hidden');
            document.getElementById(`${dimension}-visualization`).classList.add('active');
            
            // 更新控制器显示
            document.querySelectorAll('.dimension-controls').forEach(control => {
                control.classList.add('hidden');
                control.classList.remove('active');
            });
            
            document.getElementById(`${dimension}-controls`).classList.remove('hidden');
            document.getElementById(`${dimension}-controls`).classList.add('active');
        });
    });
}

// 设置控制器
function setupControls(vis3D, vis4D, vis5D) {
    // 3D控制器
    if (document.getElementById('shape-3d')) {
        document.getElementById('shape-3d').addEventListener('change', function() {
            const shapeType = this.value;
            updateShape3D(vis3D, shapeType);
        });
    }
    
    if (document.getElementById('rotation-speed-3d')) {
        document.getElementById('rotation-speed-3d').addEventListener('input', function() {
            const speed = parseInt(this.value) / 50;
            vis3D.rotationSpeed = speed;
        });
    }
    
    if (document.getElementById('opacity-3d')) {
        document.getElementById('opacity-3d').addEventListener('input', function() {
            const opacity = parseInt(this.value) / 100;
            updateOpacity3D(vis3D, opacity);
        });
    }
    
    // 4D控制器
    if (document.getElementById('rotation-xy-4d')) {
        document.getElementById('rotation-xy-4d').addEventListener('input', function() {
            const speed = parseInt(this.value) / 100;
            vis4D.rotationSpeedXY = speed;
        });
    }
    
    if (document.getElementById('rotation-zw-4d')) {
        document.getElementById('rotation-zw-4d').addEventListener('input', function() {
            const speed = parseInt(this.value) / 100;
            vis4D.rotationSpeedZW = speed;
        });
    }
    
    if (document.getElementById('reset-rotation-4d')) {
        document.getElementById('reset-rotation-4d').addEventListener('click', function() {
            vis4D.resetRotation();
        });
    }
    
    // 5D控制器
    if (document.getElementById('points-count-5d')) {
        document.getElementById('points-count-5d').addEventListener('input', function() {
            const count = parseInt(this.value);
            updatePointsCount5D(vis5D, count);
        });
    }
    
    if (document.getElementById('randomize-5d')) {
        document.getElementById('randomize-5d').addEventListener('click', function() {
            randomizeData5D(vis5D);
        });
    }
}

// 更新3D形状
function updateShape3D(vis3D, shapeType) {
    if (!vis3D || !vis3D.scene) return;
    
    // 移除当前几何体
    if (vis3D.objects && vis3D.objects.cube) {
        vis3D.scene.remove(vis3D.objects.cube);
    }
    
    // 创建新几何体
    let geometry;
    switch(shapeType) {
        case 'cube':
            geometry = new THREE.BoxGeometry(2, 2, 2);
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(1.5, 32, 32);
            break;
        case 'torus':
            geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 50);
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry(1.5, 3, 32);
            break;
        default:
            geometry = new THREE.BoxGeometry(2, 2, 2);
    }
    
    const material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.8,
        wireframe: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    vis3D.scene.add(mesh);
    vis3D.objects = { cube: mesh };
}

// 更新3D透明度
function updateOpacity3D(vis3D, opacity) {
    if (!vis3D || !vis3D.objects || !vis3D.objects.cube) return;
    
    vis3D.objects.cube.material.opacity = opacity;
}

// 更新5D点数量
function updatePointsCount5D(vis5D, count) {
    if (!vis5D || !vis5D.svg) return;
    
    // 重新生成数据
    const data = generateData5D(count, vis5D.width, vis5D.height);
    
    // 更新可视化
    updateVisualization5D(vis5D, data);
}

// 随机化5D数据
function randomizeData5D(vis5D) {
    if (!vis5D || !vis5D.svg) return;
    
    const count = vis5D.data ? vis5D.data.length : 100;
    updatePointsCount5D(vis5D, count);
}

// 生成5D数据
function generateData5D(count, width, height) {
    const data = [];
    
    for (let i = 0; i < count; i++) {
        data.push({
            x: Math.random() * width * 0.8 + width * 0.1,  // 第一维
            y: Math.random() * height * 0.8 + height * 0.1, // 第二维
            z: Math.random() * 100,                        // 第三维（用大小表示）
            w: Math.random(),                              // 第四维（用颜色表示）
            v: Math.floor(Math.random() * 5)               // 第五维（用形状表示）
        });
    }
    
    return data;
}

// 更新5D可视化
function updateVisualization5D(vis5D, data) {
    if (!vis5D || !vis5D.svg) return;
    
    // 保存数据
    vis5D.data = data;
    
    // 清除现有点
    vis5D.svg.selectAll('.data-point').remove();
    
    // 重新绘制
    vis5D.svg.selectAll('.data-point')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'data-point')
        .attr('d', d => {
            vis5D.symbolGenerator.type(vis5D.symbolTypes[d.v]);
            return vis5D.symbolGenerator.size(vis5D.sizeScale(d.z) * 20)();
        })
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .attr('fill', d => vis5D.colorScale(d.w))
        .attr('stroke', '#333')
        .attr('stroke-width', 1)
        .on('mouseover', function(event, d) {
            // 显示提示信息
            const tooltip = vis5D.svg.append('g')
                .attr('class', 'tooltip')
                .attr('transform', `translate(${d.x + 15}, ${d.y - 15})`);
            
            tooltip.append('rect')
                .attr('width', 180)
                .attr('height', 100)
                .attr('rx', 5)
                .attr('ry', 5)
                .attr('fill', 'rgba(0, 0, 0, 0.7)');
            
            tooltip.append('text')
                .attr('x', 10)
                .attr('y', 20)
                .attr('fill', 'white')
                .text(`第一维 (X): ${Math.round(d.x)}`);
            
            tooltip.append('text')
                .attr('x', 10)
                .attr('y', 40)
                .attr('fill', 'white')
                .text(`第二维 (Y): ${Math.round(d.y)}`);
            
            tooltip.append('text')
                .attr('x', 10)
                .attr('y', 60)
                .attr('fill', 'white')
                .text(`第三维 (大小): ${Math.round(d.z)}`);
            
            tooltip.append('text')
                .attr('x', 10)
                .attr('y', 80)
                .attr('fill', 'white')
                .text(`第四维 (颜色): ${Math.round(d.w * 100) / 100}`);
            
            // 高亮当前点
            d3.select(this)
                .attr('stroke', '#fff')
                .attr('stroke-width', 2);
        })
        .on('mouseout', function() {
            // 移除提示信息
            vis5D.svg.selectAll('.tooltip').remove();
            
            // 恢复点的样式
            d3.select(this)
                .attr('stroke', '#333')
                .attr('stroke-width', 1);
        });
}

// 创建5D图例
function createLegend(svg, width, height, colorScale, symbolTypes) {
    const legendGroup = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width - 120}, 20)`);
    
    // 颜色图例（第四维）
    const colorLegend = legendGroup.append('g')
        .attr('transform', 'translate(0, 0)');
    
    colorLegend.append('text')
        .attr('x', 0)
        .attr('y', -5)
        .attr('text-anchor', 'start')
        .attr('font-size', '12px')
        .text('第四维（颜色）');
    
    const colorGradient = colorLegend.append('defs')
        .append('linearGradient')
        .attr('id', 'color-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
    
    // 添加颜色渐变
    const colorStops = [0, 0.2, 0.4, 0.6, 0.8, 1];
    colorStops.forEach(stop => {
        colorGradient.append('stop')
            .attr('offset', `${stop * 100}%`)
            .attr('stop-color', colorScale(stop));
    });
    
    colorLegend.append('rect')
        .attr('width', 100)
        .attr('height', 15)
        .attr('fill', 'url(#color-gradient)');
    
    // 形状图例（第五维）
    const shapeLegend = legendGroup.append('g')
        .attr('transform', 'translate(0, 50)');
    
    shapeLegend.append('text')
        .attr('x', 0)
        .attr('y', -5)
        .attr('text-anchor', 'start')
        .attr('font-size', '12px')
        .text('第五维（形状）');
    
    const symbolGenerator = d3.symbol().size(100);
    
    symbolTypes.forEach((symbol, i) => {
        const g = shapeLegend.append('g')
            .attr('transform', `translate(${i * 20 + 10}, 10)`);
        
        g.append('path')
            .attr('d', symbolGenerator.type(symbol)())
            .attr('fill', '#666');
    });
}

// 三维空间可视化
function init3DVisualization(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    const width = container.clientWidth;
    const height = container.clientHeight || 400;
    
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
    
    // 设置旋转速度
    const rotationSpeed = 0.01;
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += rotationSpeed;
        cube.rotation.y += rotationSpeed;
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    return {
        scene,
        camera,
        renderer,
        controls,
        objects: { cube },
        rotationSpeed
    };
}

// 四维超立方体可视化
function init4DVisualization(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    const width = container.clientWidth;
    const height = container.clientHeight || 400;
    
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
    
    // 设置旋转速度
    let rotationSpeedXY = 0.5;
    let rotationSpeedZW = 0.3;
    let time = 0;
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        updateTesseract(tesseract, time, rotationSpeedXY, rotationSpeedZW);
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    // 重置旋转
    function resetRotation() {
        time = 0;
    }
    
    return {
        scene,
        camera,
        renderer,
        controls,
        rotationSpeedXY,
        rotationSpeedZW,
        resetRotation
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
function updateTesseract(tesseract, time, speedXY = 0.5, speedZW = 0.3) {
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
    const rotationXY = rotateXY(time * speedXY);
    const rotationZW = rotateZW(time * speedZW);
    
    tesseract.children.forEach(child => {
        if (child instanceof THREE.Line) {
            const v1 = multiplyMatrix(rotationXY, child.userData.vertices4D[0]);
            const v2 = multiplyMatrix(rotationXY, child.userData.vertices4D[1]);
            const v1Rotated = multiplyMatrix(rotationZW, v1);
            const v2Rotated = multiplyMatrix(rotationZW, v2);
            
            const v1Projected = projectTo3D(v1Rotated);
            const v2Projected = projectTo3D(v2Rotated);
            
            const positions = new Float32Array([
                v1Projected[0], v1