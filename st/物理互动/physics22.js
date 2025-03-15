// 全局变量
let currentSection = 'classical-mechanics';
let mechanicsSimulation = null;
let emVisualization = null;
let thermoSimulation = null;
let quantumVisualization = null;
let relativityVisualization = null;
let fluidSimulation = null;

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
    
    // 设置各种控件的事件监听器
    setupEventListeners();
    
    // 初始化各部分可视化
    initMechanicsVisualization();
    // 其他部分在切换到相应部分时初始化
});

// 设置事件监听器
function setupEventListeners() {
    // 经典力学部分
    const gravityRange = document.getElementById('gravity-range');
    if(gravityRange) {
        gravityRange.addEventListener('input', function() {
            const gravityValue = document.getElementById('gravity-value');
            if(gravityValue) {
                gravityValue.textContent = this.value;
            }
            updateMechanicsSimulation();
        });
    }
    
    const dampingRange = document.getElementById('damping-range');
    if(dampingRange) {
        dampingRange.addEventListener('input', function() {
            const dampingValue = document.getElementById('damping-value');
            if(dampingValue) {
                dampingValue.textContent = this.value;
            }
            updateMechanicsSimulation();
        });
    }
    
    const mechanicsType = document.getElementById('mechanics-type');
    if(mechanicsType) {
        mechanicsType.addEventListener('change', function() {
            initMechanicsVisualization();
        });
    }
    
    const resetMechanics = document.getElementById('reset-mechanics');
    if(resetMechanics) {
        resetMechanics.addEventListener('click', function() {
            initMechanicsVisualization();
        });
    }
    
    // 电磁学部分
    const fieldType = document.getElementById('field-type');
    if(fieldType) {
        fieldType.addEventListener('change', function() {
            initEMVisualization();
        });
    }
    
    const chargeRange = document.getElementById('charge-range');
    if(chargeRange) {
        chargeRange.addEventListener('input', function() {
            const chargeValue = document.getElementById('charge-value');
            if(chargeValue) {
                chargeValue.textContent = this.value;
            }
            updateEMVisualization();
        });
    }
    
    const showFieldLines = document.getElementById('show-field-lines');
    if(showFieldLines) {
        showFieldLines.addEventListener('change', function() {
            updateEMVisualization();
        });
    }
    
    const addCharge = document.getElementById('add-charge');
    if(addCharge) {
        addCharge.addEventListener('click', function() {
            addChargeToEM();
        });
    }
    
    // 热力学部分
    // 设置热力学相关控件的事件监听器
    
    // 量子力学部分
    const quantumSystem = document.getElementById('quantum-system');
    if(quantumSystem) {
        quantumSystem.addEventListener('change', function() {
            initQuantumVisualization();
        });
    }
    
    const energyLevelRange = document.getElementById('energy-level-range');
    if(energyLevelRange) {
        energyLevelRange.addEventListener('input', function() {
            const energyLevelValue = document.getElementById('energy-level-value');
            if(energyLevelValue) {
                energyLevelValue.textContent = this.value;
            }
            updateQuantumVisualization();
        });
    }
    
    // 相对论部分
    const relativityEffect = document.getElementById('relativity-effect');
    if(relativityEffect) {
        relativityEffect.addEventListener('change', function() {
            initRelativityVisualization();
        });
    }
    
    const velocityRange = document.getElementById('velocity-range');
    if(velocityRange) {
        velocityRange.addEventListener('input', function() {
            const velocityValue = document.getElementById('velocity-value');
            if(velocityValue) {
                velocityValue.textContent = this.value;
            }
            updateRelativityVisualization();
        });
    }
    
    const massRange = document.getElementById('mass-range');
    if(massRange) {
        massRange.addEventListener('input', function() {
            const massValue = document.getElementById('mass-value');
            if(massValue) {
                massValue.textContent = this.value;
            }
            updateRelativityVisualization();
        });
    }
    
    // 流体动力学部分
    const fluidType = document.getElementById('fluid-type');
    if(fluidType) {
        fluidType.addEventListener('change', function() {
            initFluidVisualization();
        });
    }
    
    const flowSpeedRange = document.getElementById('flow-speed-range');
    if(flowSpeedRange) {
        flowSpeedRange.addEventListener('input', function() {
            const flowSpeedValue = document.getElementById('flow-speed-value');
            if(flowSpeedValue) {
                flowSpeedValue.textContent = this.value;
            }
            updateFluidVisualization();
        });
    }
    
    const viscosityRange = document.getElementById('viscosity-range');
    if(viscosityRange) {
        viscosityRange.addEventListener('input', function() {
            const viscosityValue = document.getElementById('viscosity-value');
            if(viscosityValue) {
                viscosityValue.textContent = this.value;
            }
            updateFluidVisualization();
        });
    }
}

// 切换物理学分支部分
function switchSection(sectionId) {
    console.log("切换到部分:", sectionId);
    
    // 更新当前部分
    currentSection = sectionId;
    
    // 隐藏所有部分
    document.querySelectorAll('.physics-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // 显示选中的部分
    const selectedSection = document.getElementById(sectionId);
    if(selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    
    // 更新导航高亮
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-blue-700');
        link.classList.add('hover:bg-blue-600');
        
        if(link.getAttribute('data-section') === sectionId) {
            link.classList.add('bg-blue-700');
            link.classList.remove('hover:bg-blue-600');
        }
    });
    
    // 根据当前部分初始化可视化
    if(sectionId === 'classical-mechanics') {
        initMechanicsVisualization();
    } else if(sectionId === 'electromagnetism') {
        initEMVisualization();
    } else if(sectionId === 'thermodynamics') {
        initThermoVisualization();
    } else if(sectionId === 'quantum-mechanics') {
        initQuantumVisualization();
    } else if(sectionId === 'relativity') {
        initRelativityVisualization();
    } else if(sectionId === 'fluid-dynamics') {
        initFluidVisualization();
    }
}

// 经典力学可视化
function initMechanicsVisualization() {
    console.log("初始化经典力学可视化");
    
    const container = document.getElementById('mechanics-visualization');
    if(!container) {
        console.log("未找到经典力学可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 获取模拟类型和参数
    const mechanicsType = document.getElementById('mechanics-type')?.value || 'pendulum';
    const gravity = parseFloat(document.getElementById('gravity-range')?.value || '9.8');
    const damping = parseFloat(document.getElementById('damping-range')?.value || '0.1');
    
    // 创建SVG
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    // 根据模拟类型创建不同的可视化
    if(mechanicsType === 'pendulum') {
        // 单摆模拟
        const pendulumLength = height * 0.6;
        const pendulumOriginX = width / 2;
        const pendulumOriginY = height * 0.2;
        
        // 绘制支点
        svg.append('circle')
            .attr('cx', pendulumOriginX)
            .attr('cy', pendulumOriginY)
            .attr('r', 5)
            .attr('fill', '#4b5563');
        
        // 初始角度（弧度）
        let angle = Math.PI / 4;
        let angleVelocity = 0;
        
        // 计算摆球位置
        const pendulumX = pendulumOriginX + pendulumLength * Math.sin(angle);
        const pendulumY = pendulumOriginY + pendulumLength * Math.cos(angle);
        
        // 绘制摆线
        const pendulumLine = svg.append('line')
            .attr('x1', pendulumOriginX)
            .attr('y1', pendulumOriginY)
            .attr('x2', pendulumX)
            .attr('y2', pendulumY)
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 2);
        
        // 绘制摆球
        const pendulumBob = svg.append('circle')
            .attr('cx', pendulumX)
            .attr('cy', pendulumY)
            .attr('r', 15)
            .attr('fill', '#3b82f6');
        
        // 动画函数
        function animatePendulum() {
            // 计算角加速度
            const angleAcceleration = -gravity / pendulumLength * Math.sin(angle) - damping * angleVelocity;
            
            // 更新角速度和角度
            angleVelocity += angleAcceleration * 0.05;
            angle += angleVelocity * 0.05;
            
            // 更新摆球位置
            const newX = pendulumOriginX + pendulumLength * Math.sin(angle);
            const newY = pendulumOriginY + pendulumLength * Math.cos(angle);
            
            // 更新绘图
            pendulumLine
                .attr('x2', newX)
                .attr('y2', newY);
                
            pendulumBob
                .attr('cx', newX)
                .attr('cy', newY);
            
            // 继续动画
            requestAnimationFrame(animatePendulum);
        }
        
        // 启动动画
        animatePendulum();
        
    } else if(mechanicsType === 'spring') {
        // 弹簧振子模拟
        const springOriginX = width * 0.2;
        const springOriginY = height / 2;
        const springRestLength = width * 0.4;
        
        // 绘制固定点
        svg.append('rect')
            .attr('x', springOriginX - 10)
            .attr('y', springOriginY - 20)
            .attr('width', 20)
            .attr('height', 40)
            .attr('fill', '#4b5563');
        
        // 初始位置和速度
        let position = springRestLength + 50; // 初始拉伸
        let velocity = 0;
        
        // 弹簧常数
        const springConstant = 0.5;
        
        // 绘制弹簧（简化为锯齿线）
        const spring = svg.append('path')
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
        
        // 绘制质量块
        const mass = svg.append('rect')
            .attr('x', springOriginX + position - 15)
            .attr('y', springOriginY - 15)
            .attr('width', 30)
            .attr('height', 30)
            .attr('fill', '#3b82f6');
        
        // 更新弹簧路径
        function updateSpringPath(length) {
            const segments = 10;
            const segmentLength = length / segments;
            const amplitude = 10;
            
            let pathData = `M ${springOriginX},${springOriginY}`;
            
            for(let i = 1; i <= segments; i++) {
                const x = springOriginX + i * segmentLength;
                const y = springOriginY + (i % 2 === 0 ? amplitude : -amplitude);
                pathData += ` L ${x},${y}`;
            }
            
            pathData += ` L ${springOriginX + length},${springOriginY}`;
            
            spring.attr('d', pathData);
        }
        
        // 动画函数
        function animateSpring() {
            // 计算弹力
            const springForce = -springConstant * (position - springRestLength);
            
            // 计算加速度（F = ma，假设m=1）
            const acceleration = springForce - damping * velocity;
            
            // 更新速度和位置
            velocity += acceleration * 0.1;
            position += velocity * 0.1;
            
            // 更新绘图
            updateSpringPath(position);
            
            mass
                .attr('x', springOriginX + position - 15);
            
            // 继续动画
            requestAnimationFrame(animateSpring);
        }
        
        // 初始化弹簧路径
        updateSpringPath(position);
        
        // 启动动画
        animateSpring();
        
    } else if(mechanicsType === 'projectile') {
        // 抛体运动模拟
        const groundY = height * 0.8;
        
        // 绘制地面
        svg.append('line')
            .attr('x1', 0)
            .attr('y1', groundY)
            .attr('x2', width)
            .attr('y2', groundY)
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 2);
        
        // 初始位置和速度
        const startX = width * 0.1;
        const startY = groundY - 10;
        let x = startX;
        let y = startY;
        const initialVelocityX = 4;
        const initialVelocityY = -12;
        let velocityX = initialVelocityX;
        let velocityY = initialVelocityY;
        
        // 绘制抛射物
        const projectile = svg.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', 10)
            .attr('fill', '#3b82f6');
        
        // 绘制轨迹
        const trajectory = svg.append('path')
            .attr('stroke', '#93c5fd')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', `M ${x},${y}`);
        
        // 动画函数
        function animateProjectile() {
            // 更新速度
            velocityY += gravity * 0.1;
            
            // 更新位置
            x += velocityX * 0.1;
            y += velocityY * 0.1;
            
            // 检查是否碰到地面
            if(y > groundY - 10) {
                y = groundY - 10;
                velocityY = -velocityY * 0.7; // 反弹，能量损失
                
                // 如果速度很小，停止运动
                if(Math.abs(velocityY) < 0.5) {
                    velocityY = 0;
                    velocityX *= 0.95; // 地面摩擦
                }
            }
            
            // 检查是否碰到边界
            if(x < 10 || x > width - 10) {
                velocityX = -velocityX * 0.7;
                x = x < 10 ? 10 : width - 10;
            }
            
            // 更新绘图
            projectile
                .attr('cx', x)
                .attr('cy', y);
            
            // 更新轨迹
            const currentPath = trajectory.attr('d');
            trajectory.attr('d', `${currentPath} L ${x},${y}`);
            
            // 如果运动几乎停止，重置模拟
            if(Math.abs(velocityX) < 0.1 && Math.abs(velocityY) < 0.1 && Math.abs(y - (groundY - 10)) < 0.1) {
                setTimeout(() => {
                    x = startX;
                    y = startY;
                    velocityX = initialVelocityX;
                    velocityY = initialVelocityY;
                    trajectory.attr('d', `M ${x},${y}`);
                }, 1000);
            }
            
            // 继续动画
            requestAnimationFrame(animateProjectile);
        }
        
        // 启动动画
        animateProjectile();
    }
}

// 更新经典力学模拟
function updateMechanicsSimulation() {
    // 由于我们的实现方式，更新参数会直接影响下一帧的计算
    // 所以这里不需要特别的更新逻辑
}

// 电磁学可视化
function initEMVisualization() {
    console.log("初始化电磁学可视化");
    
    const container = document.getElementById('em-visualization');
    if(!container) {
        console.log("未找到电磁学可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 获取场类型和参数
    const fieldType = document.getElementById('field-type')?.value || 'electric';
    const chargeValue = parseFloat(document.getElementById('charge-range')?.value || '1');
    const showFieldLines = document.getElementById('show-field-lines')?.checked || true;
    
    // 创建SVG
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    // 电荷/电流位置
    const charges = [{
        x: width / 2,
        y: height / 2,
        value: chargeValue
    }];
    
    // 绘制背景网格
    const gridSize = 20;
    for(let x = 0; x < width; x += gridSize) {
        svg.append('line')
            .attr('x1', x)
            .attr('y1', 0)
            .attr('x2', x)
            .attr('y2', height)
            .attr('stroke', '#e5e7eb')
            .attr('stroke-width', 1);
    }
    
    for(let y = 0; y < height; y += gridSize) {
        svg.append('line')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)
            .attr('stroke', '#e5e7eb')
            .attr('stroke-width', 1);
    }
    
    // 根据场类型绘制不同的可视化
    if(fieldType === 'electric') {
        // 电场可视化
        
        // 绘制电荷
        charges.forEach(charge => {
            const color = charge.value > 0 ? '#ef4444' : '#3b82f6';
            
            svg.append('circle')
                .attr('cx', charge.x)
                .attr('cy', charge.y)
                .attr('r', 10 * Math.abs(charge.value))
                .attr('fill', color)
                .attr('stroke', '#000')
                .attr('stroke-width', 1);
                
            svg.append('text')
                .attr('x', charge.x)
                .attr('y', charge.y)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', 'white')
                .attr('font-size', '12px')
                .text(charge.value > 0 ? '+' : '-');
        });
        
        // 绘制电场线
        if(showFieldLines) {
            // 简化：从电荷向四周辐射线条
            const numLines = 16;
            charges.forEach(charge => {
                for(let i = 0; i < numLines; i++) {
                    const angle = (i / numLines) * 2 * Math.PI;
                    const length = 100 * Math.abs(charge.value);
                    const endX = charge.x + length * Math.cos(angle);
                    const endY = charge.y + length * Math.sin(angle);
                    
                    // 如果是负电荷，方向相反
                    const startX = charge.value > 0 ? charge.x : endX;
                    const startY = charge.value > 0 ? charge.y : endY;
                    const finalX = charge.value > 0 ? endX : charge.x;
                    const finalY = charge.value > 0 ? endY : charge.y;
                    
                    svg.append('line')
                        .attr('x1', startX)
                        .attr('y1', startY)
                        .attr('x2', finalX)
                        .attr('y2', finalY)
                        .attr('stroke', '#9ca3af')
                        .attr('stroke-width', 1)
                        .attr('marker-end', 'url(#arrow)');
                }
            });
            
            // 添加箭头标记
            svg.append('defs').append('marker')
                .attr('id', 'arrow')
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 8)
                .attr('refY', 0)
                .attr('markerWidth', 6)
                .attr('markerHeight', 6)
                .attr('orient', 'auto')
                .append('path')
                .attr('d', 'M0,-5L10,0L0,5')
                .attr('fill', '#9ca3af');
        }
        
    } else if(fieldType === 'magnetic') {
        // 磁场可视化
        
        // 绘制电流（简化为一个圆圈和一个方向箭头）
        charges.forEach(charge => {
            const color = '#3b82f6';
            
            svg.append('circle')
                .attr('cx', charge.x)
                .attr('cy', charge.y)
                .attr('r', 15)
                .attr('fill', color)
                .attr('stroke', '#000')
                .attr('stroke-width', 1);
                
            // 表示电流方向的符号（点或叉）
            const symbol = charge.value > 0 ? '⊙' : '⊗';
            
            svg.append('text')
                .attr('x', charge.x)
                .attr('y', charge.y)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', 'white')
                .attr('font-size', '16px')
                .text(symbol);
        });
        
        // 绘制磁场线
        if(showFieldLines) {
            // 简化：绘制同心圆表示磁场线
            charges.forEach(charge => {
                for(let radius = 30; radius <= 100; radius += 20) {
                    svg.append('circle')
                        .attr('cx', charge.x)
                        .attr('cy', charge.y)
                        .attr('r', radius)
                        .attr('fill', 'none')
                        .attr('stroke', '#9ca3af')
                        .attr('stroke-width', 1)
                        .attr('stroke-dasharray', '5,5');
                    
                    // 添加方向箭头
                    const arrowAngle = charge.value > 0 ? 0 : Math.PI;
                    const arrowX = charge.x + radius * Math.cos(arrowAngle);
                    const arrowY = charge.y + radius * Math.sin(arrowAngle);
                    
                    svg.append('circle')
                        .attr('cx', arrowX)
                        .attr('cy', arrowY)
                        .attr('r', 3)
                        .attr('fill', '#9ca3af');
                }
            });
        }
        
    } else if(fieldType === 'electromagnetic') {
        // 电磁波可视化
        
        // 绘制电磁波（简化为正弦波）
        const waveCenter = height / 2;
        const amplitude = 50;
        const wavelength = 100;
        const numWaves = width / wavelength * 2;
        
        // 电场分量（蓝色）
        let electricPath = `M 0,${waveCenter}`;
        for(let x = 0; x <= width; x += 5) {
            const y = waveCenter + amplitude * Math.sin(x / wavelength * 2 * Math.PI);
            electricPath += ` L ${x},${y}`;
        }
        
        svg.append('path')
            .attr('d', electricPath)
            .attr('stroke', '#3b82f6')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
            
        // 磁场分量（红色，相位差90度）
        let magneticPath = `M 0,${waveCenter}`;
        for(let x = 0; x <= width; x += 5) {
            const y = waveCenter + amplitude * Math.cos(x / wavelength * 2 * Math.PI);
            magneticPath += ` L ${x},${y}`;
        }
        
        svg.append('path')
            .attr('d', magneticPath)
            .attr('stroke', '#ef4444')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
            
        // 添加标签
        svg.append('text')
            .attr('x', 20)
            .attr('y', waveCenter - amplitude - 10)
            .attr('fill', '#3b82f6')
            .attr('font-size', '12px')
            .text('电场 (E)');
            
        svg.append('text')
            .attr('x', 20)
            .attr('y', waveCenter + amplitude + 20)
            .attr('fill', '#ef4444')
            .attr('font-size', '12px')
            .text('磁场 (B)');
            
        // 添加传播方向箭头
        svg.append('defs').append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 8)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#9ca3af');
            
        svg.append('line')
            .attr('x1', width / 2 - 50)
            .attr('y1', waveCenter + amplitude + 40)
            .attr('x2', width / 2 + 50)
            .attr('y2', waveCenter + amplitude + 40)
			            .attr('stroke', '#9ca3af')
            .attr('stroke-width', 2)
            .attr('marker-end', 'url(#arrow)');
    }
}

// 更新电磁学可视化
function updateEMVisualization() {
    // 重新初始化可视化
    initEMVisualization();
}

// 添加电荷到电磁场
function addChargeToEM() {
    // 在界面中央添加一个新电荷
    initEMVisualization();
}

// 热力学可视化
function initThermoVisualization() {
    console.log("初始化热力学可视化");
    
    const container = document.getElementById('thermo-visualization');
    if (!container) {
        console.log("未找到热力学可视化容器");
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
    
    // 绘制容器
    const containerWidth = width * 0.8;
    const containerHeight = height * 0.6;
    
    svg.append('rect')
        .attr('x', (width - containerWidth) / 2)
        .attr('y', (height - containerHeight) / 2)
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .attr('fill', '#e5e7eb')
        .attr('stroke', '#4b5563')
        .attr('stroke-width', 2);
    
    // 更新气体分子
    function updateMolecules() {
        const temperature = parseFloat(document.getElementById('temperature-range').value);
        const volume = parseFloat(document.getElementById('volume-range').value);
        const numMolecules = Math.floor(volume * 100); // 根据体积计算分子数量
        
        // 清空之前的分子
        svg.selectAll('circle').remove();
        
        // 生成新的气体分子
        for (let i = 0; i < numMolecules; i++) {
            const x = Math.random() * containerWidth + (width - containerWidth) / 2;
            const y = Math.random() * containerHeight + (height - containerHeight) / 2;
            
            svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 3)
                .attr('fill', '#3b82f6');
        }
    }
    
    // 动画函数
    function animateMolecules() {
        svg.selectAll('circle').each(function() {
            const molecule = d3.select(this);
            const dx = (Math.random() - 0.5) * 2; // 随机水平移动
            const dy = (Math.random() - 0.5) * 2; // 随机垂直移动
            
            const currentX = parseFloat(molecule.attr('cx'));
            const currentY = parseFloat(molecule.attr('cy'));
            
            // 更新位置
            molecule.attr('cx', currentX + dx)
                    .attr('cy', currentY + dy);
            
            // 边界检测
            if (currentX < (width - containerWidth) / 2 || currentX > (width + containerWidth) / 2) {
                molecule.attr('cx', currentX - dx); // 反弹
            }
            if (currentY < (height - containerHeight) / 2 || currentY > (height + containerHeight) / 2) {
                molecule.attr('cy', currentY - dy); // 反弹
            }
        });
        
        requestAnimationFrame(animateMolecules); // 继续动画
    }
    
    // 启动动画
    animateMolecules();
    
    // 设置输入控件的事件监听器
    document.getElementById('temperature-range').addEventListener('input', updateMolecules);
    document.getElementById('volume-range').addEventListener('input', updateMolecules);
    
    // 初始化分子
    updateMolecules();
}
        

// 更新热力学可视化
function updateThermoVisualization() {
    // 重新初始化可视化
    initThermoVisualization();
}

// 量子力学可视化
function initQuantumVisualization() {
    console.log("初始化量子力学可视化");
    
    const container = document.getElementById('quantum-visualization');
    if(!container) {
        console.log("未找到量子力学可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 获取量子系统类型和参数
    const quantumSystem = document.getElementById('quantum-system')?.value || 'particle-in-box';
    const energyLevel = parseInt(document.getElementById('energy-level-range')?.value || '1');
    const showProbability = document.getElementById('show-probability')?.checked || true;
    
    // 创建SVG
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    // 根据量子系统类型创建不同的可视化
    if(quantumSystem === 'particle-in-box') {
        // 一维无限深势阱中的粒子
        
        // 绘制势阱
        const wellWidth = width * 0.8;
        const wellHeight = height * 0.6;
        const wellX = (width - wellWidth) / 2;
        const wellY = (height - wellHeight) / 2;
        
        svg.append('rect')
            .attr('x', wellX)
            .attr('y', wellY)
            .attr('width', wellWidth)
            .attr('height', wellHeight)
            .attr('fill', 'none')
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 2);
        
        // 绘制波函数
        const waveFunction = [];
        const probabilityDensity = [];
        
        for(let x = 0; x < wellWidth; x++) {
            const xNorm = x / wellWidth;
            // 波函数 ψ_n(x) = sqrt(2/L) * sin(n*π*x/L)
            const psi = Math.sqrt(2) * Math.sin(energyLevel * Math.PI * xNorm);
            waveFunction.push({
                x: wellX + x,
                y: wellY + wellHeight / 2 - psi * wellHeight / 4
            });
            
            // 概率密度 |ψ|²
            probabilityDensity.push({
                x: wellX + x,
                y: wellY + wellHeight - psi * psi * wellHeight / 2
            });
        }
        
        // 绘制波函数
        const waveLine = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveCardinal);
            
        svg.append('path')
            .attr('d', waveLine(waveFunction))
            .attr('stroke', '#3b82f6')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
            
        // 绘制概率密度
        if(showProbability) {
            const probabilityLine = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveCardinal);
                
            svg.append('path')
                .attr('d', probabilityLine(probabilityDensity))
                .attr('stroke', '#ef4444')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
                
            // 填充概率密度区域
            svg.append('path')
                .datum(probabilityDensity)
                .attr('d', d3.area()
                    .x(d => d.x)
                    .y0(wellY + wellHeight)
                    .y1(d => d.y)
                    .curve(d3.curveCardinal)
                )
                .attr('fill', 'rgba(239, 68, 68, 0.2)');
        }
        
        // 添加标签
        svg.append('text')
            .attr('x', wellX + 10)
            .attr('y', wellY + 20)
            .attr('fill', '#3b82f6')
            .attr('font-size', '12px')
            .text('波函数 ψ');
            
        if(showProbability) {
            svg.append('text')
                .attr('x', wellX + 10)
                .attr('y', wellY + 40)
                .attr('fill', '#ef4444')
                .attr('font-size', '12px')
                .text('概率密度 |ψ|²');
        }
        
        // 添加能级标签
        svg.append('text')
            .attr('x', wellX + wellWidth / 2)
            .attr('y', wellY - 10)
            .attr('text-anchor', 'middle')
            .attr('fill', '#000')
            .attr('font-size', '14px')
            .text(`能级 n = ${energyLevel}`);
            
        // 计算能量
        const energy = energyLevel * energyLevel * Math.PI * Math.PI / (2 * wellWidth * wellWidth);
        document.getElementById('energy-value').textContent = energy.toFixed(2);
        
    } else if(quantumSystem === 'hydrogen-atom') {
        // 氢原子轨道
        
        // 绘制原子核
        const centerX = width / 2;
        const centerY = height / 2;
        
        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', 5)
            .attr('fill', '#ef4444');
            
        // 根据能级和角量子数确定轨道类型
        const n = energyLevel; // 主量子数
        const l = Math.min(n - 1, 2); // 角量子数（简化为最大2，即d轨道）
        
        // 轨道标签
        const orbitalLabels = ['s', 'p', 'd'];
        const orbitalLabel = `${n}${orbitalLabels[l]}`;
        
        // 绘制电子云（概率密度）
        if(l === 0) {
            // s轨道 - 球形
            const radius = n * 30;
            
            svg.append('circle')
                .attr('cx', centerX)
                .attr('cy', centerY)
                .attr('r', radius)
                .attr('fill', 'rgba(59, 130, 246, 0.2)')
                .attr('stroke', '#3b82f6')
                .attr('stroke-width', 1);
                
        } else if(l === 1) {
            // p轨道 - 哑铃形
            const radius = n * 20;
            
            // 绘制两个椭圆表示p轨道
            svg.append('ellipse')
                .attr('cx', centerX)
                .attr('cy', centerY - radius / 2)
                .attr('rx', radius / 2)
                .attr('ry', radius)
                .attr('fill', 'rgba(59, 130, 246, 0.2)')
                .attr('stroke', '#3b82f6')
                .attr('stroke-width', 1);
                
            svg.append('ellipse')
                .attr('cx', centerX)
                .attr('cy', centerY + radius / 2)
                .attr('rx', radius / 2)
                .attr('ry', radius)
                .attr('fill', 'rgba(59, 130, 246, 0.2)')
                .attr('stroke', '#3b82f6')
                .attr('stroke-width', 1);
                
        } else if(l === 2) {
            // d轨道 - 复杂形状，简化为四叶草形
            const radius = n * 15;
            
            // 绘制四个椭圆表示d轨道
            for(let i = 0; i < 4; i++) {
                const angle = (i / 4) * 2 * Math.PI;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                
                svg.append('ellipse')
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('rx', radius / 2)
                    .attr('ry', radius / 2)
                    .attr('transform', `rotate(${angle * 180 / Math.PI + 45}, ${x}, ${y})`)
                    .attr('fill', 'rgba(59, 130, 246, 0.2)')
                    .attr('stroke', '#3b82f6')
                    .attr('stroke-width', 1);
            }
        }
        
        // 添加轨道标签
        svg.append('text')
            .attr('x', centerX)
            .attr('y', centerY - 50)
            .attr('text-anchor', 'middle')
            .attr('fill', '#000')
            .attr('font-size', '16px')
            .text(`${orbitalLabel} 轨道`);
            
        // 计算能量（简化的玻尔模型）
        const energy = -13.6 / (n * n);
        document.getElementById('energy-value').textContent = energy.toFixed(2);
    }
}

// 更新量子力学可视化
function updateQuantumVisualization() {
    // 重新初始化可视化
    initQuantumVisualization();
}

// 相对论可视化
function initRelativityVisualization() {
    console.log("初始化相对论可视化");
    
    const container = document.getElementById('relativity-visualization');
    if(!container) {
        console.log("未找到相对论可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 获取速度和质量
    const velocity = parseFloat(document.getElementById('velocity-range')?.value || '0.5');
    const mass = parseFloat(document.getElementById('mass-range')?.value || '1');
    
    // 创建SVG
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    // 绘制运动物体
    const objectX = width / 2;
    const objectY = height / 2;
    
    svg.append('rect')
        .attr('x', objectX - 15)
        .attr('y', objectY - 15)
        .attr('width', 30)
        .attr('height', 30)
        .attr('fill', '#3b82f6');
    
    // 添加速度和质量标签
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height * 0.1)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('fill', '#000')
        .text(`速度: ${velocity}c, 质量: ${mass}kg`);
}

// 更新相对论可视化
function updateRelativityVisualization() {
    // 重新初始化可视化
    initRelativityVisualization();
}

// 流体动力学可视化
function initFluidVisualization() {
    console.log("初始化流体动力学可视化");
    
    const container = document.getElementById('fluid-visualization');
    if(!container) {
        console.log("未找到流体动力学可视化容器");
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 获取流体类型和参数
    const fluidType = document.getElementById('fluid-type')?.value || 'water';
    const flowSpeed = parseFloat(document.getElementById('flow-speed-range')?.value || '1');
    const viscosity = parseFloat(document.getElementById('viscosity-range')?.value || '1');
    
    // 创建SVG
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
    
    // 绘制流体流动
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 绘制流体流动路径
    const pathData = `M ${centerX - 50},${centerY} C ${centerX - 25},${centerY - 50} ${centerX + 25},${centerY + 50} ${centerX + 50},${centerY}`;
    
    svg.append('path')
        .attr('d', pathData)
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    
    // 添加流速和粘度标签
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height * 0.1)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('fill', '#000')
        .text(`流速: ${flowSpeed} m/s, 粘度: ${viscosity}`);
}

// 更新流体动力学可视化
function updateFluidVisualization() {
    // 重新初始化可视化
    initFluidVisualization();
}