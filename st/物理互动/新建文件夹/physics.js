// Three.js 3D场景初始化
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 400);
document.getElementById('three-container').appendChild(renderer.domElement);

// 创建一个旋转的立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// 窗口大小调整
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / 400;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 400);
});

class VisualizationManager {
    constructor() {
        this.currentSection = null;
    }

    init(sectionId) {
        this.currentSection = sectionId;
        switch(sectionId) {
            case 'classical-mechanics': this.initMechanics(); break;
            case 'electromagnetism': this.initEM(); break;
            // 其他部分类似
        }
    }

    update() {
        switch(this.currentSection) {
            case 'classical-mechanics': this.updateMechanics(); break;
            case 'electromagnetism': this.updateEM(); break;
            // 其他部分类似
        }
    }

    initMechanics() {
        initMechanicsVisualization(); // 调用现有的初始化函数
    }

    updateMechanics() {
        updateMechanicsSimulation(); // 调用现有的更新函数
    }

    // 为其他部分添加类似方法
}

const vizManager = new VisualizationManager();

// 修改 switchSection 函数
function switchSection(sectionId) {
    console.log("切换到部分:", sectionId);
    currentSection = sectionId;
    document.querySelectorAll('.physics-section').forEach(section => {
        section.classList.add('hidden');
    });
    const selectedSection = document.getElementById(sectionId);
    if(selectedSection) selectedSection.classList.remove('hidden');
    vizManager.init(sectionId);
}

function initMechanicsVisualization() {
    // ... 已有代码 ...

    if(mechanicsType === 'pendulum') {
        let angle = Math.PI / 4;
        let angleVelocity = 0;

        const pendulumBob = svg.append('circle')
            .attr('cx', pendulumX)
            .attr('cy', pendulumY)
            .attr('r', 15)
            .attr('fill', '#3b82f6');

        // 添加拖动功能
        pendulumBob.call(d3.drag()
            .on('drag', function(event) {
                const dx = event.x - pendulumOriginX;
                const dy = event.y - pendulumOriginY;
                angle = Math.atan2(dx, dy);
                angleVelocity = 0; // 停止运动
                updatePendulumPosition();
            })
        );

        function updatePendulumPosition() {
            const newX = pendulumOriginX + pendulumLength * Math.sin(angle);
            const newY = pendulumOriginY + pendulumLength * Math.cos(angle);
            pendulumLine.attr('x2', newX).attr('y2', newY);
            pendulumBob.attr('cx', newX).attr('cy', newY);
        }

        function animatePendulum() {
            const angleAcceleration = -gravity / pendulumLength * Math.sin(angle) - damping * angleVelocity;
            angleVelocity += angleAcceleration * 0.05;
            angle += angleVelocity * 0.05;
            updatePendulumPosition();
            requestAnimationFrame(animatePendulum);
        }

        animatePendulum();
    }
}

function initEMVisualization() {
    // ... 已有代码 ...

    const charges = [{ x: width / 2, y: height / 2, value: chargeValue }];

    function drawCharges() {
        svg.selectAll('.charge').remove();
        charges.forEach((charge, index) => {
            const chargeGroup = svg.append('g').attr('class', 'charge');
            chargeGroup.append('circle')
                .attr('cx', charge.x)
                .attr('cy', charge.y)
                .attr('r', 10 * Math.abs(charge.value))
                .attr('fill', charge.value > 0 ? '#ef4444' : '#3b82f6')
                .call(d3.drag()
                    .on('drag', function(event) {
                        charge.x = event.x;
                        charge.y = event.y;
                        drawCharges();
                        drawFieldLines();
                    })
                );
            // 添加符号等 ...
        });
    }

    svg.on('click', function(event) {
        charges.push({ x: event.offsetX, y: event.offsetY, value: chargeValue });
        drawCharges();
        drawFieldLines();
    });

    function drawFieldLines() {
        // ... 绘制场线的代码 ...
    }

    drawCharges();
    drawFieldLines();
}

function initThermoVisualization() {
    // ... 已有代码 ...

    function animateMolecules() {
        const temperature = parseFloat(document.getElementById('temperature-range')?.value || 300);
        const speedFactor = temperature / 300; // 温度影响速度
        svg.selectAll('circle').each(function() {
            const molecule = d3.select(this);
            const dx = (Math.random() - 0.5) * 2 * speedFactor;
            const dy = (Math.random() - 0.5) * 2 * speedFactor;
            let x = parseFloat(molecule.attr('cx')) + dx;
            let y = parseFloat(molecule.attr('cy')) + dy;

            // 边界反弹
            if (x < wellX || x > wellX + containerWidth) dx = -dx;
            if (y < wellY || y > wellY + containerHeight) dy = -dy;
            molecule.attr('cx', x).attr('cy', y);
        });
        requestAnimationFrame(animateMolecules);
    }

    animateMolecules();
}

