// 全局变量
let currentSection = 'abstract-algebra';

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("页面加载完成，初始化...");
    
    // 设置导航切换事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    
    // 初始显示第一个部分
    switchSection('abstract-algebra');
    
    // 设置素数范围显示
    const primeRange = document.getElementById('prime-range');
    if(primeRange) {
        primeRange.addEventListener('input', function() {
            const rangeValue = document.getElementById('prime-range-value');
            if(rangeValue) {
                rangeValue.textContent = this.value;
            }
            // 更新素数可视化
            initPrimeVisualization(parseInt(this.value));
        });
    }
    
    // 设置群类型和大小的更新事件
    const updateGroupButton = document.getElementById('update-group');
    if(updateGroupButton) {
        updateGroupButton.addEventListener('click', function() {
            initGroupVisualization();
        });
    }
    
    // 设置素数测试按钮事件
    const testPrimeButton = document.getElementById('test-prime');
    if(testPrimeButton) {
        testPrimeButton.addEventListener('click', function() {
            testPrimeNumber();
        });
    }
    
    // 为素数测试输入框添加回车键事件
    const primeTestInput = document.getElementById('prime-test-input');
    if(primeTestInput) {
        primeTestInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                testPrimeNumber();
            }
        });
    }
    
    // 设置函数参数更新事件
    const funcParam = document.getElementById('func-param');
    if(funcParam) {
        funcParam.addEventListener('input', function() {
            const paramValue = document.getElementById('func-param-value');
            if(paramValue) {
                paramValue.textContent = this.value;
            }
            initFunctionVisualization();
        });
    }
    
    // 设置应用算子按钮事件
    const applyOperatorButton = document.getElementById('apply-operator');
    if(applyOperatorButton) {
        applyOperatorButton.addEventListener('click', function() {
            initFunctionVisualization(true);
        });
    }
    
    // 设置曲面类型更新事件
    const surfaceType = document.getElementById('surface-type');
    if(surfaceType) {
        surfaceType.addEventListener('change', function() {
            initSurfaceVisualization();
        });
    }
    
    // 设置曲率显示更新事件
    const curvatureDisplay = document.getElementById('curvature-display');
    if(curvatureDisplay) {
        curvatureDisplay.addEventListener('change', function() {
            initSurfaceVisualization();
        });
    }
    
    // 设置拓扑形状更新事件
    const shapeType = document.getElementById('shape-type');
    if(shapeType) {
        shapeType.addEventListener('change', function() {
            initTopologyVisualization();
        });
    }
    
    // 设置素数显示模式更新事件
    const primeDisplayMode = document.getElementById('prime-display-mode');
    if(primeDisplayMode) {
        primeDisplayMode.addEventListener('change', function() {
            const primeRange = document.getElementById('prime-range');
            if(primeRange) {
                initPrimeVisualization(parseInt(primeRange.value));
            } else {
                initPrimeVisualization();
            }
        });
    }
    
    // 设置函数族更新事件
    const functionFamily = document.getElementById('function-family');
    if(functionFamily) {
        functionFamily.addEventListener('change', function() {
            initFunctionVisualization();
        });
    }
    
    // 初始化各部分可视化
    initGroupVisualization();
    initPrimeVisualization();
    initTopologyVisualization();
    initSurfaceVisualization();
    initFunctionVisualization();
});

// 切换数学分支部分
function switchSection(sectionId) {
    console.log("切换到部分:", sectionId);
    
    // 更新当前部分
    currentSection = sectionId;
    
    // 隐藏所有部分
    document.querySelectorAll('.math-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // 显示选中的部分
    const selectedSection = document.getElementById(sectionId);
    if(selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    
    // 更新导航高亮
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-indigo-700');
        link.classList.add('hover:bg-indigo-600');
        
        if(link.getAttribute('data-section') === sectionId) {
            link.classList.add('bg-indigo-700');
            link.classList.remove('hover:bg-indigo-600');
        }
    });
    
    // 根据当前部分初始化可视化
    if(sectionId === 'abstract-algebra') {
        initGroupVisualization();
    } else if(sectionId === 'number-theory') {
        initPrimeVisualization();
    } else if(sectionId === 'topology') {
        initTopologyVisualization();
        } else if(sectionId === 'differential-geometry') {
        initSurfaceVisualization();
    } else if(sectionId === 'functional-analysis') {
        initFunctionVisualization();
    }
}

// 抽象代数可视化
function initGroupVisualization() {
    console.log("初始化群可视化");
    
    const container = document.getElementById('group-visualization');
    if(!container) {
        console.log("未找到群可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 获取群类型和大小
    const groupType = document.getElementById('group-type')?.value || 'cyclic';
    const groupSize = parseInt(document.getElementById('group-size')?.value || '4');
    
    console.log("群类型:", groupType, "群大小:", groupSize);
    
    // 创建SVG
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    // 计算圆的半径和中心
    const radius = Math.min(width, height) / 2 - 40;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 绘制群元素
    if(groupType === 'cyclic') {
        // 循环群可视化
        
        // 绘制圆
        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', radius)
            .attr('fill', 'none')
            .attr('stroke', '#d1d5db')
            .attr('stroke-width', 2);
        
        // 绘制群元素
        for(let i = 0; i < groupSize; i++) {
            const angle = (i / groupSize) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            // 绘制节点
            svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 20)
                .attr('fill', '#4f46e5')
                .attr('stroke', '#4338ca')
                .attr('stroke-width', 2)
                .attr('class', 'group-element')
                .attr('data-element', i);
            
            // 绘制标签
            svg.append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', 'white')
                .attr('font-size', '12px')
                .text(`g${i}`);
        }
        
        // 绘制生成关系
        for(let i = 0; i < groupSize; i++) {
            const angle1 = (i / groupSize) * 2 * Math.PI;
            const x1 = centerX + radius * Math.cos(angle1);
            const y1 = centerY + radius * Math.sin(angle1);
            
            const nextElement = (i + 1) % groupSize;
            const angle2 = (nextElement / groupSize) * 2 * Math.PI;
            const x2 = centerX + radius * Math.cos(angle2);
            const y2 = centerY + radius * Math.sin(angle2);
            
            // 绘制箭头
            svg.append('line')
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2)
                .attr('stroke', '#6366f1')
                .attr('stroke-width', 2)
                .attr('marker-end', 'url(#arrow)');
        }
        
    } else if(groupType === 'dihedral') {
        // 二面体群可视化
        
        // 计算正多边形的顶点数
        const n = groupSize / 2;
        
        // 绘制正多边形
        const points = [];
        for(let i = 0; i < n; i++) {
            const angle = (i / n) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            points.push([x, y]);
        }
        
        // 绘制多边形边
        for(let i = 0; i < n; i++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[(i + 1) % n];
            
            svg.append('line')
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2)
                .attr('stroke', '#d1d5db')
                .attr('stroke-width', 2);
        }
        
        // 绘制旋转元素
        for(let i = 0; i < n; i++) {
            const [x, y] = points[i];
            
            // 绘制节点
            svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 20)
                .attr('fill', '#4f46e5')
                .attr('stroke', '#4338ca')
                .attr('stroke-width', 2)
                .attr('class', 'group-element')
                .attr('data-element', i);
            
            // 绘制标签
            svg.append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', 'white')
                .attr('font-size', '12px')
                .text(`r${i}`);
        }
        
        // 绘制反射元素
        for(let i = 0; i < n; i++) {
            const angle = ((i + 0.5) / n) * 2 * Math.PI;
            const x = centerX + (radius * 0.7) * Math.cos(angle);
            const y = centerY + (radius * 0.7) * Math.sin(angle);
            
            // 绘制节点
            svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 20)
                .attr('fill', '#ef4444')
                .attr('stroke', '#b91c1c')
                .attr('stroke-width', 2)
                .attr('class', 'group-element')
                .attr('data-element', i + n);
            
            // 绘制标签
            svg.append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', 'white')
                .attr('font-size', '12px')
                .text(`s${i}`);
            
            // 绘制反射轴
            const x1 = centerX + radius * Math.cos(angle);
            const y1 = centerY + radius * Math.sin(angle);
            
            svg.append('line')
                .attr('x1', centerX)
                .attr('y1', centerY)
                .attr('x2', x1)
                .attr('y2', y1)
                .attr('stroke', '#ef4444')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '4');
        }
    }
    
    // 创建凯莱表
    createCayleyTable(groupType, groupSize);
}

// 创建凯莱表
function createCayleyTable(groupType, groupSize, selectedElementId = -1) {
    console.log("创建凯莱表，群类型:", groupType, "群大小:", groupSize);
    
    const tableContainer = document.getElementById('cayley-table');
    if(!tableContainer) {
        console.log("未找到凯莱表容器");
        return;
    }
    
    // 清空容器
    tableContainer.innerHTML = '';
    
    // 创建表格
    const table = document.createElement('table');
    table.className = 'min-w-full divide-y divide-gray-200 dark:divide-gray-700';
    
    // 创建表头
    const thead = document.createElement('thead');
    thead.className = 'bg-gray-50 dark:bg-gray-700';
    
    const headerRow = document.createElement('tr');
    
    // 空单元格（左上角）
    const emptyTh = document.createElement('th');
    emptyTh.className = 'px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider';
    emptyTh.textContent = '∘';
    headerRow.appendChild(emptyTh);
    
    // 列标题
    for(let i = 0; i < groupSize; i++) {
        const th = document.createElement('th');
        th.className = 'px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider';
        th.textContent = groupType === 'cyclic' ? `g${i}` : (i < groupSize/2 ? `r${i}` : `s${i-groupSize/2}`);
        headerRow.appendChild(th);
    }
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 创建表体
    const tbody = document.createElement('tbody');
    tbody.className = 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800';
    
    // 行
    for(let i = 0; i < groupSize; i++) {
        const row = document.createElement('tr');
        row.className = i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800';
        
        // 行标题
        const th = document.createElement('th');
        th.className = 'px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider';
        th.textContent = groupType === 'cyclic' ? `g${i}` : (i < groupSize/2 ? `r${i}` : `s${i-groupSize/2}`);
        row.appendChild(th);
        
        // 单元格（群操作结果）
        for(let j = 0; j < groupSize; j++) {
            const td = document.createElement('td');
            td.className = 'px-3 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400';
            
            // 计算群操作结果
            let result;
            if(groupType === 'cyclic') {
                // 循环群：加法模n
                result = `g${(i + j) % groupSize}`;
            } else if(groupType === 'dihedral') {
                // 二面体群：旋转和反射的组合
                const n = groupSize / 2;
                if(i < n && j < n) {
                    // 旋转 * 旋转
                    result = `r${(i + j) % n}`;
                } else if(i >= n && j >= n) {
                    // 反射 * 反射
                    result = `r${(2 * n - (i - n) - (j - n)) % n}`;
                } else if(i < n && j >= n) {
                    // 旋转 * 反射
                    result = `s${(i + j - n) % n}`;
                } else {
                    // 反射 * 旋转
                    result = `s${(i - j + n) % n}`;
                }
            }
            
            td.textContent = result;
            
            // 高亮显示与选中元素相关的单元格
            if(i === selectedElementId || j === selectedElementId) {
                td.className += ' bg-indigo-50 dark:bg-indigo-900/30';
            }
            
            // 高亮显示结果等于选中元素的单元格
            const resultId = parseInt(result.substring(1));
            if((result.startsWith('g') && resultId === selectedElementId) ||
               (result.startsWith('r') && resultId === selectedElementId) ||
               (result.startsWith('s') && resultId + groupSize/2 === selectedElementId)) {
                td.className += ' font-bold text-indigo-600 dark:text-indigo-400';
            }
            
            row.appendChild(td);
        }
        
        tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

// 数论可视化
function initPrimeVisualization(maxNum = 100) {
    console.log("初始化素数可视化，范围:", maxNum);
    
    const container = document.getElementById('prime-visualization');
    if(!container) {
        console.log("未找到素数可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建SVG
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    // 生成素数
    const primes = [];
    for(let i = 2; i <= maxNum; i++) {
        if(isPrime(i)) {
            primes.push(i);
        }
    }
    
    console.log(`找到${primes.length}个素数，范围1-${maxNum}`);
    
    // 获取显示模式
    const displayMode = document.getElementById('prime-display-mode')?.value || 'distribution';
    
    if(displayMode === 'distribution') {
        // 素数分布可视化
        
        // 设置网格
        const gridWidth = Math.ceil(Math.sqrt(maxNum));
        const cellSize = Math.min(width / gridWidth, height / Math.ceil(maxNum / gridWidth));
        
        // 绘制数字网格
        for(let i = 1; i <= maxNum; i++) {
            const row = Math.floor((i - 1) / gridWidth);
            const col = (i - 1) % gridWidth;
            
            const x = col * cellSize;
            const y = row * cellSize;
            
            const isPrimeNumber = primes.includes(i);
            
            svg.append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', cellSize)
                .attr('height', cellSize)
                .attr('fill', isPrimeNumber ? '#ef4444' : '#f3f4f6')
                .attr('stroke', '#d1d5db')
                .attr('stroke-width', 1);
            
            svg.append('text')
                .attr('x', x + cellSize / 2)
                .attr('y', y + cellSize / 2)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', isPrimeNumber ? 'white' : '#4b5563')
                .attr('font-size', cellSize * 0.4)
                .text(i);
        }
        
        // 添加文字说明
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', '#4b5563')
            .attr('font-size', '12px')
            .text(`1-${maxNum}中的素数分布 (红色为素数)`);
            
    } else if(displayMode === 'pi-function') {
        // 素数计数函数π(x)可视化
        
        // 创建比例尺
        const xScale = d3.scaleLinear()
            .domain([0, maxNum])
            .range([50, width - 20]);
            
        const yScale = d3.scaleLinear()
            .domain([0, primes.length])
            .range([height - 30, 20]);
            
        // 绘制坐标轴
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        
        svg.append('g')
            .attr('transform', `translate(0, ${height - 30})`)
            .call(xAxis);
            
        svg.append('g')
            .attr('transform', 'translate(50, 0)')
            .call(yAxis);
            
        // 绘制π(x)函数
        const piData = [];
        let count = 0;
        
        for(let i = 0; i <= maxNum; i++) {
            if(primes.includes(i)) {
                count++;
            }
            if(i % 5 === 0 || primes.includes(i)) {
                piData.push({x: i, y: count});
            }
        }
        
        // 绘制线
        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));
            
        svg.append('path')
            .datum(piData)
            .attr('fill', 'none')
            .attr('stroke', '#ef4444')
            .attr('stroke-width', 2)
            .attr('d', line);
            
        // 添加标签
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', '#4b5563')
            .attr('font-size', '12px')
            .text('素数计数函数 π(x)');
            
        svg.append('text')
            .attr('x', width - 100)
            .attr('y', 20)
            .attr('text-anchor', 'end')
            .attr('fill', '#ef4444')
            .attr('font-size', '14px')
            .text(`π(${maxNum}) = ${count}`);
    }
}

// 测试一个数是否为素数
function testPrimeNumber() {
    console.log("测试素数");
    
    const input = document.getElementById('prime-test-input');
    const result = document.getElementById('prime-test-result');
    
    if(!input || !result) {
        console.log("未找到输入框或结果显示区域");
        return;
    }
    
    const num = parseInt(input.value);
    console.log("测试数字:", num);
    
    if(isNaN(num) || num < 2) {
        result.textContent = "请输入大于1的整数";
        result.className = "mt-2 text-sm text-yellow-600";
        return;
    }
    
    if(isPrime(num)) {
        result.textContent = num + " 是素数";
        result.className = "mt-2 text-sm text-green-600";
    } else {
        result.textContent = num + " 不是素数";
        result.className = "mt-2 text-sm text-red-600";
    }
}

// 判断一个数是否为素数
function isPrime(num) {
    if(num < 2) return false;
    if(num === 2) return true;
    if(num % 2 === 0) return false;
    
    const sqrt = Math.sqrt(num);
    for(let i = 3; i <= sqrt; i += 2) {
        if(num % i === 0) return false;
    }
    
    return true;
}

// 拓扑学可视化
function initTopologyVisualization() {
    console.log("初始化拓扑学可视化");
    
    const container = document.getElementById('topology-visualization');
    if(!container) {
        console.log("未找到拓扑学可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 检查Three.js是否可用
    if(typeof THREE === 'undefined') {
        container.innerHTML = '<div class="flex items-center justify-center h-full text-red-500">Three.js库未加载，无法显示3D可视化</div>';
        console.log("Three.js未定义");
        return;
    }
    
    try {
        // 获取容器尺寸
        const width = container.clientWidth || 400;
        const height = container.clientHeight || 300;
        
        // 创建场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);
        
        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 3;
        
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
        
        // 添加光源
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // 获取形状类型
        const shapeType = document.getElementById('shape-type')?.value || 'sphere';
        
        // 创建基本形状
        let geometry;
        let material = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            metalness: 0.2,
            roughness: 0.5
        });
        
        // 根据选择创建不同的几何体
        if(shapeType === 'sphere') {
            geometry = new THREE.SphereGeometry(1, 32, 32);
        } else if(shapeType === 'torus') {
            geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        } else if(shapeType === 'double-torus') {
            // 双环面（简化为两个相交的环面）
            const torus1 = new THREE.TorusGeometry(0.8, 0.2, 16, 100);
            const torus2 = new THREE.TorusGeometry(0.8, 0.2, 16, 100);
            
            const mesh1 = new THREE.Mesh(torus1, material);
            const mesh2 = new THREE.Mesh(torus2, material);
            
            mesh2.rotation.x = Math.PI / 2;
            mesh2.position.y = 0.5;
            
            scene.add(mesh1);
            scene.add(mesh2);
            
            // 简单动画
            function animate() {
                requestAnimationFrame(animate);
                
                mesh1.rotation.x += 0.01;
                mesh1.rotation.y += 0.01;
                mesh2.rotation.y += 0.01;
                mesh2.rotation.z += 0.01;
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // 更新拓扑不变量显示
            updateTopologyInvariants(shapeType);
            
            return;
        } else if(shapeType === 'mobius') {
            // 莫比乌斯带
            geometry = new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16, 1, 3);
        } else if(shapeType === 'klein-bottle') {
            // 克莱因瓶（简化为一个特殊的环面）
            geometry = new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16, 2, 3);
        } else {
            // 默认使用球体
            geometry = new THREE.SphereGeometry(1, 32, 32);
        }
        
        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);
        
        // 简单动画
        function animate() {
            requestAnimationFrame(animate);
            
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // 更新拓扑不变量显示
        updateTopologyInvariants(shapeType);
        
    } catch(error) {
        console.error("拓扑学可视化错误:", error);
        container.innerHTML = `<div class="flex items-center justify-center h-full text-red-500">
            可视化错误: ${error.message}
        </div>`;
    }
}

// 更新拓扑不变量显示
function updateTopologyInvariants(shapeType) {
    const invariantsContainer = document.getElementById('topology-invariants');
    if(!invariantsContainer) return;
    
    let eulerChar, genus, orientable;
    
    switch(shapeType) {
        case 'sphere':
            eulerChar = 2;
            genus = 0;
            orientable = true;
            break;
        case 'torus':
            eulerChar = 0;
            genus = 1;
            orientable = true;
            break;
        case 'double-torus':
            eulerChar = -2;
            genus = 2;
            orientable = true;
            break;
        case 'mobius':
            eulerChar = 0;
            genus = 1;
            orientable = false;
            break;
        case 'klein-bottle':
            eulerChar = 0;
            genus = 2;
            orientable = false;
            break;
        default:
            eulerChar = '?';
            genus = '?';
            orientable = '?';
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

// 微分几何可视化
function initSurfaceVisualization() {
    console.log("初始化曲面可视化");
    
    const container = document.getElementById('surface-visualization');
    if(!container) {
        console.log("未找到曲面可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 检查Three.js是否可用
    if(typeof THREE === 'undefined') {
        container.innerHTML = '<div class="flex items-center justify-center h-full text-red-500">Three.js库未加载，无法显示3D可视化</div>';
        console.log("Three.js未定义");
        return;
    }
    
    try {
        // 获取容器尺寸
        const width = container.clientWidth || 400;
        const height = container.clientHeight || 300;
        
        // 创建场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);
        
        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 3;
        
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
        
        // 添加光源
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene
		
		        scene.add(directionalLight);
        
        // 获取曲面类型
        const surfaceType = document.getElementById('surface-type')?.value || 'sphere';
        
        // 创建基本形状
        let geometry;
        let material = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            metalness: 0.2,
            roughness: 0.5
        });
        
        // 根据选择创建不同的几何体
        if(surfaceType === 'sphere') {
            geometry = new THREE.SphereGeometry(1, 32, 32);
        } else if(surfaceType === 'torus') {
            geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        } else if(surfaceType === 'klein-bottle') {
            // 克莱因瓶（简化为一个特殊的环面）
            geometry = new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16, 2, 3);
        } else {
            // 默认使用球体
            geometry = new THREE.SphereGeometry(1, 32, 32);
        }
        
        const surface = new THREE.Mesh(geometry, material);
        scene.add(surface);
        
        // 简单动画
        function animate() {
            requestAnimationFrame(animate);
            
            surface.rotation.x += 0.01;
            surface.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
    } catch(error) {
        console.error("曲面可视化错误:", error);
        container.innerHTML = `<div class="flex items-center justify-center h-full text-red-500">
            可视化错误: ${error.message}
        </div>`;
    }
}

// 泛函分析可视化
function initFunctionVisualization(applyOperator = false) {
    console.log("初始化函数空间可视化");
    
    const container = document.getElementById('function-visualization');
    if(!container) {
        console.log("未找到函数空间可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建SVG
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    // 获取函数族和参数
    const functionFamily = document.getElementById('function-family')?.value || 'polynomial';
    const paramValue = parseFloat(document.getElementById('func-param')?.value || '1');
    
    // 获取算子类型
    const operatorType = document.getElementById('operator-type')?.value || 'identity';
    
    // 定义坐标轴范围
    const xMin = -5;
    const xMax = 5;
    const yMin = -5;
    const yMax = 5;
    
    // 创建比例尺
    const xScale = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([50, width - 20]);
        
    const yScale = d3.scaleLinear()
        .domain([yMax, yMin])  // 注意y轴方向反转
        .range([20, height - 50]);
    
    // 绘制坐标轴
    // X轴
    svg.append('line')
        .attr('x1', xScale(xMin))
        .attr('y1', yScale(0))
        .attr('x2', xScale(xMax))
        .attr('y2', yScale(0))
        .attr('stroke', '#4b5563')
        .attr('stroke-width', 1);
        
    // Y轴
    svg.append('line')
        .attr('x1', xScale(0))
        .attr('y1', yScale(yMin))
        .attr('x2', xScale(0))
        .attr('y2', yScale(yMax))
        .attr('stroke', '#4b5563')
        .attr('stroke-width', 1);
    
    // 添加刻度
    for(let i = xMin; i <= xMax; i++) {
        if(i === 0) continue;
        
        svg.append('line')
            .attr('x1', xScale(i))
            .attr('y1', yScale(0) - 5)
            .attr('x2', xScale(i))
            .attr('y2', yScale(0) + 5)
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 1);
            
        svg.append('text')
            .attr('x', xScale(i))
            .attr('y', yScale(0) + 20)
            .attr('text-anchor', 'middle')
            .attr('fill', '#4b5563')
            .attr('font-size', '10px')
            .text(i);
    }
    
    for(let i = yMin; i <= yMax; i++) {
        if(i === 0) continue;
        
        svg.append('line')
            .attr('x1', xScale(0) - 5)
            .attr('y1', yScale(i))
            .attr('x2', xScale(0) + 5)
            .attr('y2', yScale(i))
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 1);
            
        svg.append('text')
            .attr('x', xScale(0) - 15)
            .attr('y', yScale(i) + 5)
            .attr('text-anchor', 'end')
            .attr('fill', '#4b5563')
            .attr('font-size', '10px')
            .text(i);
    }
    
    // 添加坐标轴标签
    svg.append('text')
        .attr('x', xScale(xMax) + 10)
        .attr('y', yScale(0) + 5)
        .attr('fill', '#4b5563')
        .attr('font-size', '12px')
        .text('x');
        
    svg.append('text')
        .attr('x', xScale(0) - 5)
        .attr('y', yScale(yMax) - 10)
        .attr('fill', '#4b5563')
        .attr('font-size', '12px')
        .text('y');
    
    // 定义函数
    let func, funcDerivative, funcIntegral, funcText;
    
    if(functionFamily === 'polynomial') {
        func = x => paramValue * x * x;
        funcDerivative = x => 2 * paramValue * x;
        funcIntegral = x => (paramValue * x * x * x) / 3;
        funcText = `f(x) = ${paramValue}x²`;
    } else if(functionFamily === 'trigonometric') {
        func = x => paramValue * Math.sin(x);
        funcDerivative = x => paramValue * Math.cos(x);
        funcIntegral = x => -paramValue * Math.cos(x);
        funcText = `f(x) = ${paramValue}sin(x)`;
    } else if(functionFamily === 'exponential') {
        func = x => paramValue * Math.exp(x);
        funcDerivative = x => paramValue * Math.exp(x);
        funcIntegral = x => paramValue * Math.exp(x);
        funcText = `f(x) = ${paramValue}e^x`;
    }
    
    // 更新函数方程显示
    const functionEquation = document.getElementById('function-equation');
    if(functionEquation) {
        functionEquation.textContent = funcText;
    }
    
    // 绘制函数图像
    const lineGenerator = d3.line()
        .x(d => xScale(d))
        .y(d => yScale(func(d)))
        .curve(d3.curveMonotoneX);
    
    const points = d3.range(xMin, xMax, 0.1);
    
    svg.append('path')
        .attr('d', lineGenerator(points))
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2);
    
    // 如果应用算子，绘制算子结果
    if(applyOperator) {
        let operatorFunc;
        
        if(operatorType === 'derivative') {
            operatorFunc = funcDerivative;
        } else if(operatorType === 'integral') {
            operatorFunc = funcIntegral;
        } else {
            operatorFunc = func;  // 恒等算子
        }
        
        const operatorLineGenerator = d3.line()
            .x(d => xScale(d))
            .y(d => yScale(operatorFunc(d)))
            .curve(d3.curveMonotoneX);
        
        svg.append('path')
            .attr('d', operatorLineGenerator(points))
            .attr('fill', 'none')
            .attr('stroke', '#ef4444')
            .attr('stroke-width', 2);
    }
    
    // 添加图例
    svg.append('line')
        .attr('x1', width - 110)
        .attr('y1', 35)
        .attr('x2', width - 90)
        .attr('y2', 35)
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2);
        
    svg.append('text')
        .attr('x', width - 85)
        .attr('y', 40)
        .attr('fill', '#4b5563')
        .attr('font-size', '12px')
        .text('f(x)');
        
    if(applyOperator) {
        svg.append('line')
            .attr('x1', width - 110)
            .attr('y1', 55)
            .attr('x2', width - 90)
            .attr('y2', 55)
            .attr('stroke', '#ef4444')
            .attr('stroke-width', 2);
            
        svg.append('text')
            .attr('x', width - 85)
            .attr('y', 60)
            .attr('fill', '#4b5563')
            .attr('font-size', '12px')
            .text(operatorType === 'identity' ? 'f(x)' : (operatorType === 'derivative' ? 'f\'(x)' : '∫f(x)dx'));
    }
}

// 数论可视化
function initPrimeVisualization(maxNum = 100) {
    console.log("初始化素数可视化，范围:", maxNum);
    
    const container = document.getElementById('prime-visualization');
    if(!container) {
        console.log("未找到素数可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建SVG
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    // 生成素数
    const primes = [];
    for(let i = 2; i <= maxNum; i++) {
        if(isPrime(i)) {
            primes.push(i);
        }
    }
    
    // 获取显示模式
    const displayMode = document.getElementById('prime-display-mode')?.value || 'distribution';
    
    if(displayMode === 'distribution') {
        // 素数分布可视化
        
        // 设置网格
        const gridWidth = Math.ceil(Math.sqrt(maxNum));
        const cellSize = Math.min(width / gridWidth, height / Math.ceil(maxNum / gridWidth));
        
        // 绘制数字网格
        for(let i = 1; i <= maxNum; i++) {
            const row = Math.floor((i - 1) / gridWidth);
            const col = (i - 1) % gridWidth;
            
            const x = col * cellSize;
            const y = row * cellSize;
            
            const isPrimeNumber = primes.includes(i);
            
            svg.append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', cellSize)
                .attr('height', cellSize)
                .attr('fill', isPrimeNumber ? '#ef4444' : '#f3f4f6')
                .attr('stroke', '#d1d5db')
                .attr('stroke-width', 1);
            
            svg.append('text')
                .attr('x', x + cellSize / 2)
                .attr('y', y + cellSize / 2)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', isPrimeNumber ? 'white' : '#4b5563')
                .attr('font-size', cellSize * 0.4)
                .text(i);
        }
        
        // 添加文字说明
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', '#4b5563')
            .attr('font-size', '12px')
            .text(`1-${maxNum}中的素数分布 (红色为素数)`);
            
    } else if(displayMode === 'pi-function') {
        // 素数计数函数π(x)可视化
        
        // 创建比例尺
        const xScale = d3.scaleLinear()
            .domain([0, maxNum])
            .range([50, width - 20]);
            
        const yScale = d3.scaleLinear()
            .domain([0, primes.length])
            .range([height - 50, 20]);
        
        // 绘制坐标轴
        // X轴
        svg.append('line')
            .attr('x1', xScale(0))
            .attr('y1', yScale(0))
            .attr('x2', xScale(maxNum))
            .attr('y2', yScale(0))
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 1);
            
        // Y轴
        svg.append('line')
            .attr('x1', xScale(0))
            .attr('y1', yScale(0))
            .attr('x2', xScale(0))
            .attr('y2', yScale(primes.length))
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 1);
        
        // 添加坐标轴标签
        svg.append('text')
            .attr('x', xScale(maxNum) + 10)
            .attr('y', yScale(0) + 5)
            .attr('fill', '#4b5563')
            .attr('font-size', '12px')
            .text('x');
            
        svg.append('text')
            .attr('x', xScale(0) - 5)
            .attr('y', yScale(primes.length) - 10)
            .attr('fill', '#4b5563')
            .attr('font-size', '12px')
            .text('π(x)');
        
        // 计算素数计数函数
        const piData = [];
        let count = 0;
        
        for(let i = 0; i <= maxNum; i++) {
            if(primes.includes(i)) {
                count++;
            }
            piData.push({ x: i, y: count });
        }
        
        // 绘制素数计数函数
        const lineGenerator = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
            .curve(d3.curveStepAfter);
        
        svg.append('path')
            .attr('d', lineGenerator(piData))
            .attr('fill', 'none')
            .attr('stroke', '#ef4444')
            .attr('stroke-width', 2);
        
        // 添加文字说明
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', '#4b5563')
            .attr('font-size', '12px')
            .text(`素数计数函数π(x)：不超过x的素数个数`);
    }
}

// 测试一个数是否为素数
function testPrimeNumber() {
    console.log("测试素数");
    
    const input = document.getElementById('prime-test-input');
    const result = document.getElementById('prime-test-result');
    
    if(!input || !result) {
        console.log("未找到输入框或结果显示区域");
        return;
    }
    
    const num = parseInt(input.value);
    console.log("测试数字:", num);
    
    if(isNaN(num) || num < 2) {
        result.textContent = "请输入大于1的整数";
        result.className = "mt-2 text-sm text-yellow-600";
        return;
    }
    
    if(isPrime(num)) {
        result.textContent = num + " 是素数";
        result.className = "mt-2 text-sm text-green-600";
    } else {
        result.textContent = num + " 不是素数";
        result.className = "mt-2 text-sm text-red-600";
    }
}

// 判断一个数是否为素数
function isPrime(num) {
    if(num < 2) return false;
    if(num === 2) return true;
    if(num % 2 === 0) return false;
    
    const sqrt = Math.sqrt(num);
    for(let i = 3; i <= sqrt; i += 2) {
        if(num % i === 0) {
            return false;
        }
    }
    
    return true;
}

// 创建凯莱表
function createCayleyTable(groupType, groupSize, selectedElementId = -1) {
    console.log("创建凯莱表");
    
    const tableContainer = document.getElementById('cayley-table');
    if(!tableContainer) {
        console.log("未找到凯莱表容器");
        return;
    }
    
    // 清空容器
    tableContainer.innerHTML = '';
    
    // 创建表格
    const table = document.createElement('table');
    table.className = 'min-w-full divide-y divide-gray-200 dark:divide-gray-700';
    
    // 创建表头
    const thead = document.createElement('thead');
    thead.className = 'bg-gray-50 dark:bg-gray-800';
    
    const headerRow = document.createElement('tr');
    
    // 空单元格（左上角）
    const emptyTh = document.createElement('th');
    emptyTh.className = 'px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider';
    emptyTh.textContent = '*';
    headerRow.appendChild(emptyTh);
    
    // 列标题
    for(let i = 0; i < groupSize; i++) {
        const th = document.createElement('th');
        th.className = 'px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider';
        th.textContent = groupType === 'cyclic' ? `g${i}` : (i < groupSize/2 ? `r${i}` : `s${i-groupSize/2}`);
        headerRow.appendChild(th);
    }
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 创建表体
    const tbody = document.createElement('tbody');
    tbody.className = 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800';
    
    // 行
    for(let i = 0; i < groupSize; i++) {
        const row = document.createElement('tr');
        row.className = i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800';
        
        // 行标题
        const th = document.createElement('th');
        th.className = 'px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider';
        th.textContent = groupType === 'cyclic' ? `g${i}` : (i < groupSize/2 ? `r${i}` : `s${i-groupSize/2}`);
        row.appendChild(th);
        
        // 单元格（群操作结果）
        for(let j = 0; j < groupSize; j++) {
            const td = document.createElement('td');
            td.className = 'px-3 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400';
            
            // 计算群操作结果
            let result;
            if(groupType === 'cyclic') {
                // 循环群：加法模n
                result = `g${(i + j) % groupSize}`;
            } else if(groupType === 'dihedral') {
                // 二面体群：旋转和反射的组合
                const n = groupSize / 2;
                if(i < n && j < n) {
                    // 旋转 * 旋转
                    result = `r${(i + j) % n}`;
                } else if(i >= n && j >= n) {
                    // 反射 * 反射
                    result = `r${(i - j + n) % n}`;
                } else if(i < n && j >= n) {
                    // 旋转 * 反射
                    result = `s${(i + j - n) % n}`;
                } else {
                    // 反射 * 旋转
                    result = `s${(i - j + n) % n}`;
                }
            }
            
            td.textContent = result;
            
            // 高亮显示与选中元素相关的单元格
            if(i === selectedElementId || j === selectedElementId) {
                td.className += ' bg-indigo-50 dark:bg-indigo-900/30';
            }
            
            // 高亮显示结果等于选中元素的单元格
            const resultId = result.substring(1);
            if((result.startsWith('g') && parseInt(resultId) === selectedElementId) ||
               (result.startsWith('r') && parseInt(resultId) === selectedElementId) ||
               (result.startsWith('s') && parseInt(resultId) + groupSize/2 === selectedElementId)) {
                td.className += ' font-bold text-indigo-600 dark:text-indigo-400';
            }
            
            row.appendChild(td);
        }
        
        tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}


       