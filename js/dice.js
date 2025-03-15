// 骰子特效 - 显示三个骰子的随机点数
window.showDice = function() {
    // 获取场景元素
    const scene = document.getElementById('scene');
    
    // 隐藏原有的艺术字显示
    const textDisplay = document.querySelector('.art-text-display');
    if (textDisplay) {
        textDisplay.classList.remove('show');
    }
    
    // 创建骰子容器
    const diceContainer = document.createElement('div');
    diceContainer.className = 'dice-container';
    diceContainer.style.position = 'fixed';
    diceContainer.style.top = '50%';
    diceContainer.style.left = '50%';
    diceContainer.style.transform = 'translate(-50%, -50%)';
    diceContainer.style.zIndex = '1000';
    diceContainer.style.display = 'flex';
    diceContainer.style.gap = '30px';
    diceContainer.style.perspective = '1000px';
    
    // 创建三个骰子
    const diceResults = [];
    for (let i = 0; i < 3; i++) {
        // 随机点数 1-6
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        diceResults.push(randomNumber);
        
        // 创建骰子
        const dice = createDice(randomNumber);
        diceContainer.appendChild(dice);
    }
    
    // 创建结果显示
    const resultElement = document.createElement('div');
    resultElement.className = 'dice-result';
    resultElement.textContent = `点数: ${diceResults.join(' + ')} = ${diceResults.reduce((a, b) => a + b, 0)}`;
    resultElement.style.position = 'absolute';
    resultElement.style.bottom = '-80px';
    resultElement.style.left = '0';
    resultElement.style.right = '0';
    resultElement.style.textAlign = 'center';
    resultElement.style.fontSize = '28px';
    resultElement.style.fontWeight = 'bold';
    resultElement.style.color = '#fff';
    resultElement.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5)';
    diceContainer.appendChild(resultElement);
    
    // 添加到场景
    scene.appendChild(diceContainer);
    
    // 创建骰子粒子效果
    createDiceParticles(diceContainer);
    
    // 6秒后移除
    setTimeout(() => {
        diceContainer.style.opacity = '0';
        diceContainer.style.transition = 'opacity 1s';
        setTimeout(() => {
            diceContainer.remove();
        }, 1000);
    }, 6000);
};

// 创建单个骰子
function createDice(number) {
    const dice = document.createElement('div');
    dice.className = 'dice';
    dice.style.width = '80px';
    dice.style.height = '80px';
    dice.style.position = 'relative';
    dice.style.transformStyle = 'preserve-3d';
    dice.style.transition = 'transform 1.5s ease-out';
    dice.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
    
    // 创建骰子的六个面
    const faces = [
        { transform: 'rotateY(0deg) translateZ(40px)', dots: 1 },   // 正面 1
        { transform: 'rotateY(180deg) translateZ(40px)', dots: 6 },  // 背面 6
        { transform: 'rotateY(90deg) translateZ(40px)', dots: 3 },   // 右面 3
        { transform: 'rotateY(-90deg) translateZ(40px)', dots: 4 },  // 左面 4
        { transform: 'rotateX(90deg) translateZ(40px)', dots: 2 },   // 上面 2
        { transform: 'rotateX(-90deg) translateZ(40px)', dots: 5 }   // 下面 5
    ];
    
    // 创建骰子面
    faces.forEach(face => {
        const faceElement = document.createElement('div');
        faceElement.className = 'dice-face';
        faceElement.style.position = 'absolute';
        faceElement.style.width = '100%';
        faceElement.style.height = '100%';
        faceElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        faceElement.style.border = '2px solid rgba(0, 0, 0, 0.2)';
        faceElement.style.borderRadius = '10px';
        faceElement.style.display = 'flex';
        faceElement.style.justifyContent = 'center';
        faceElement.style.alignItems = 'center';
        faceElement.style.transform = face.transform;
        faceElement.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.2)';
        
        // 创建骰子点数
        createDots(faceElement, face.dots);
        
        dice.appendChild(faceElement);
    });
    
    // 根据点数设置骰子旋转角度
    setTimeout(() => {
        switch(number) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;
            case 2:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;
            case 3:
                dice.style.transform = 'rotateY(90deg)';
                break;
            case 4:
                dice.style.transform = 'rotateY(-90deg)';
                break;
            case 5:
                dice.style.transform = 'rotateX(-90deg)';
                break;
            case 6:
                dice.style.transform = 'rotateY(180deg)';
                break;
        }
    }, 50);
    
    // 初始随机旋转
    dice.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) rotateZ(${Math.random() * 360}deg)`;
    
    return dice;
}

// 创建骰子点数
function createDots(face, numDots) {
    // 点数布局配置
    const layouts = {
        1: [{top: '50%', left: '50%'}],
        2: [{top: '25%', left: '25%'}, {top: '75%', left: '75%'}],
        3: [{top: '25%', left: '25%'}, {top: '50%', left: '50%'}, {top: '75%', left: '75%'}],
        4: [{top: '25%', left: '25%'}, {top: '25%', left: '75%'}, {top: '75%', left: '25%'}, {top: '75%', left: '75%'}],
        5: [{top: '25%', left: '25%'}, {top: '25%', left: '75%'}, {top: '50%', left: '50%'}, {top: '75%', left: '25%'}, {top: '75%', left: '75%'}],
        6: [{top: '25%', left: '25%'}, {top: '25%', left: '75%'}, {top: '50%', left: '25%'}, {top: '50%', left: '75%'}, {top: '75%', left: '25%'}, {top: '75%', left: '75%'}]
    };
    
    // 创建点数
    layouts[numDots].forEach(position => {
        const dot = document.createElement('div');
        dot.className = 'dice-dot';
        dot.style.position = 'absolute';
        dot.style.width = '16px';
        dot.style.height = '16px';
        dot.style.backgroundColor = '#000';
        dot.style.borderRadius = '50%';
        dot.style.top = position.top;
        dot.style.left = position.left;
        dot.style.transform = 'translate(-50%, -50%)';
        face.appendChild(dot);
    });
}

// 创建骰子粒子效果
function createDiceParticles(container) {
    // 添加CSS样式
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes diceParticleFloat {
            0% { transform: translate(0, 0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 0.8; }
            100% { transform: translate(var(--moveX), var(--moveY)) scale(0.5); opacity: 0; }
        }
        
        .dice-particle {
            position: absolute;
            width: 8px;
            height: 8px;
            background: gold;
            border-radius: 50%;
            box-shadow: 0 0 10px gold;
            animation: diceParticleFloat var(--duration) forwards;
        }
    `;
    document.head.appendChild(styleElement);
    
    // 创建多个粒子
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'dice-particle';
            
            // 随机位置
            const startX = Math.random() * 300 - 150;
            const startY = Math.random() * 200 - 100;
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.marginLeft = `${startX}px`;
            particle.style.marginTop = `${startY}px`;
            
            // 随机移动方向
            const moveX = (Math.random() - 0.5) * 200;
            const moveY = (Math.random() - 0.5) * 200;
            particle.style.setProperty('--moveX', `${moveX}px`);
            particle.style.setProperty('--moveY', `${moveY}px`);
            
            // 随机动画时间
            const duration = 2 + Math.random() * 3;
            particle.style.setProperty('--duration', `${duration}s`);
            
            // 添加到容器
            container.appendChild(particle);
            
            // 动画结束后移除
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
            
        }, i * 100);
    }
}

// 添加CSS样式
const diceStyles = document.createElement('style');
diceStyles.textContent = `
    .dice-container {
        animation: diceAppear 0.5s forwards;
    }
    
    @keyframes diceAppear {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    .dice {
        animation: diceShake 1s ease-out;
    }
    
    @keyframes diceShake {
        0%, 100% { transform: rotate3d(0, 0, 0, 0deg); }
        20% { transform: rotate3d(1, 0.5, 0.5, 30deg); }
        40% { transform: rotate3d(0.5, 1, 0.5, -30deg); }
        60% { transform: rotate3d(1, 0.5, 1, 45deg); }
        80% { transform: rotate3d(0.5, 1, 0.5, -45deg); }
    }
`;
document.head.appendChild(diceStyles);