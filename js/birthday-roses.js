// 生日玫瑰花特效 - 99朵玫瑰花
window.showBirthdayRoses = function() {
    // 获取场景元素
    const scene = document.getElementById('scene');
    
    // 隐藏原有的艺术字显示
    const textDisplay = document.querySelector('.art-text-display');
    if (textDisplay) {
        textDisplay.classList.remove('show');
    }
    
    // 创建玫瑰花海容器
    const rosesContainer = document.createElement('div');
    rosesContainer.className = 'birthday-roses-container';
    rosesContainer.style.position = 'fixed';
    rosesContainer.style.top = '0';
    rosesContainer.style.left = '0';
    rosesContainer.style.width = '100%';
    rosesContainer.style.height = '100%';
    rosesContainer.style.zIndex = '1000';
    rosesContainer.style.overflow = 'hidden';
    
    // 创建标题文字
    const titleElement = document.createElement('div');
    titleElement.textContent = '爱你一生一世';
    titleElement.style.position = 'fixed';
    titleElement.style.top = '10%';
    titleElement.style.left = '50%';
    titleElement.style.transform = 'translateX(-50%)';
    titleElement.style.fontSize = '48px';
    titleElement.style.fontWeight = 'bold';
    titleElement.style.color = '#fff';
    titleElement.style.textShadow = '0 0 10px rgba(233, 30, 99, 0.8), 0 0 20px rgba(156, 39, 176, 0.5)';
    titleElement.style.opacity = '0';
    titleElement.style.transition = 'opacity 2s';
    
    // 创建计数器文字
    const counterElement = document.createElement('div');
    counterElement.textContent = '99朵玫瑰花';
    counterElement.style.position = 'fixed';
    counterElement.style.bottom = '10%';
    counterElement.style.left = '50%';
    counterElement.style.transform = 'translateX(-50%)';
    counterElement.style.fontSize = '36px';
    counterElement.style.fontWeight = 'bold';
    counterElement.style.color = '#fff';
    counterElement.style.textShadow = '0 0 10px rgba(233, 30, 99, 0.8), 0 0 20px rgba(156, 39, 176, 0.5)';
    counterElement.style.opacity = '0';
    counterElement.style.transition = 'opacity 2s';
    
    // 移除日期文字
    
    // 添加到容器
    rosesContainer.appendChild(titleElement);
    rosesContainer.appendChild(counterElement);
    
    // 添加到场景
    scene.appendChild(rosesContainer);
    
    // 创建背景渐变
    rosesContainer.style.background = 'radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)';
    
    // 显示文字
    setTimeout(() => {
        titleElement.style.opacity = '1';
    }, 500);
    
    setTimeout(() => {
        counterElement.style.opacity = '1';
    }, 1000);
    
    // 创建99朵玫瑰花
    createMultipleRoses(rosesContainer, 99);
    
    // 创建心形粒子效果
    createHeartParticles(rosesContainer);
    
    // 10秒后移除
    setTimeout(() => {
        rosesContainer.style.opacity = '0';
        rosesContainer.style.transition = 'opacity 1.5s';
        setTimeout(() => {
            rosesContainer.remove();
        }, 1500);
    }, 10000);
};

// 创建多朵玫瑰花
function createMultipleRoses(container, count) {
    // 创建SVG样式
    const roseStyle = document.createElement('style');
    roseStyle.textContent = `
        @keyframes roseBloom {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes roseFloat {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(5px, 5px) rotate(3deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        .rose-mini {
            position: absolute;
            width: 60px;
            height: 80px;
            transform-origin: center;
            animation: roseBloom 1s forwards, roseFloat 3s infinite ease-in-out;
            opacity: 0;
        }
    `;
    document.head.appendChild(roseStyle);
    
    // 玫瑰花SVG模板
    const roseSvgTemplate = `
        <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <path class="rose-stem" d="M50,120 L50,70" stroke="#388e3c" stroke-width="3" />
            <path class="rose-leaf" d="M50,100 Q40,90 30,100 Q40,110 50,100" fill="#4caf50" />
            <ellipse class="rose-petal-dark" cx="50" cy="70" rx="15" ry="10" fill="#c2185b" />
            <path class="rose-petal" d="M35,65 Q50,45 65,65 Q50,75 35,65" fill="#e91e63" />
            <path class="rose-petal" d="M30,55 Q50,35 70,55 Q50,70 30,55" fill="#e91e63" />
            <path class="rose-petal-light" d="M40,50 Q50,35 60,50 Q50,60 40,50" fill="#f06292" />
            <path class="rose-petal-light" d="M35,45 Q50,30 65,45 Q50,55 35,45" fill="#f06292" />
            <path class="rose-petal" d="M40,40 Q50,30 60,40 Q50,50 40,40" fill="#e91e63" />
            <circle class="rose-petal-dark" cx="50" cy="40" r="5" fill="#c2185b" />
        </svg>
    `;
    
    // 创建玫瑰花
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const roseDiv = document.createElement('div');
            roseDiv.className = 'rose-mini';
            roseDiv.innerHTML = roseSvgTemplate;
            
            // 随机位置
            const x = Math.random() * 90 + 5; // 5% - 95%
            const y = Math.random() * 70 + 25; // 25% - 95%
            roseDiv.style.left = `${x}%`;
            roseDiv.style.top = `${y}%`;
            
            // 随机大小
            const scale = 0.5 + Math.random() * 0.5; // 0.5 - 1.0
            roseDiv.style.transform = `scale(${scale})`;
            
            // 随机旋转
            const rotation = Math.random() * 30 - 15; // -15 - 15度
            roseDiv.style.rotate = `${rotation}deg`;
            
            // 随机动画延迟
            const animDelay = Math.random() * 0.5;
            roseDiv.style.animationDelay = `${animDelay}s, ${animDelay}s`;
            
            // 随机颜色变化 (不同深浅的红色)
            const hue = 340 + Math.random() * 20; // 340-360 (红色色调)
            const saturation = 70 + Math.random() * 30; // 70-100%
            const lightness = 40 + Math.random() * 20; // 40-60%
            
            // 应用颜色变化
            const petals = roseDiv.querySelectorAll('.rose-petal');
            petals.forEach(petal => {
                petal.setAttribute('fill', `hsl(${hue}, ${saturation}%, ${lightness}%)`);
            });
            
            const petalsDark = roseDiv.querySelectorAll('.rose-petal-dark');
            petalsDark.forEach(petal => {
                petal.setAttribute('fill', `hsl(${hue}, ${saturation}%, ${lightness - 15}%)`);
            });
            
            const petalsLight = roseDiv.querySelectorAll('.rose-petal-light');
            petalsLight.forEach(petal => {
                petal.setAttribute('fill', `hsl(${hue}, ${saturation - 10}%, ${lightness + 15}%)`);
            });
            
            // 添加到容器
            container.appendChild(roseDiv);
            
            // 更新计数器
            const counter = container.querySelector('div:nth-child(2)');
            if (counter) {
                counter.textContent = `${i + 1}/99朵玫瑰花`;
            }
            
        }, i * 100); // 每100毫秒创建一朵玫瑰花
    }
}

// 创建心形粒子效果
function createHeartParticles(container) {
    // 添加心形粒子样式
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
        @keyframes heartFloat {
            0% { transform: translate(0, 0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(var(--moveX), var(--moveY)) scale(0.5); opacity: 0; }
        }
        
        .heart-particle {
            position: absolute;
            width: 20px;
            height: 20px;
            background: red;
            transform: rotate(45deg);
            animation: heartFloat var(--duration) forwards;
        }
        
        .heart-particle:before,
        .heart-particle:after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: red;
            border-radius: 50%;
        }
        
        .heart-particle:before {
            top: -10px;
            left: 0;
        }
        
        .heart-particle:after {
            top: 0;
            left: -10px;
        }
    `;
    document.head.appendChild(heartStyle);
    
    // 创建多个心形粒子
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            
            // 随机位置
            const startX = Math.random() * 80 + 10; // 10% - 90%
            const startY = Math.random() * 80 + 10; // 10% - 90%
            heart.style.left = `${startX}%`;
            heart.style.top = `${startY}%`;
            
            // 随机大小
            const size = 10 + Math.random() * 15; // 10px - 25px
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.setProperty('--size', `${size}px`);
            
            // 随机颜色 (红色系)
            const hue = 340 + Math.random() * 20; // 340-360 (红色色调)
            const saturation = 70 + Math.random() * 30; // 70-100%
            const lightness = 40 + Math.random() * 20; // 40-60%
            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            heart.style.background = color;
            
            // 设置伪元素颜色
            const styleTag = document.createElement('style');
            const uniqueId = `heart-${Date.now()}-${i}`;
            heart.classList.add(uniqueId);
            styleTag.textContent = `
                .${uniqueId}:before, .${uniqueId}:after {
                    background: ${color};
                }
            `;
            document.head.appendChild(styleTag);
            
            // 随机移动方向
            const moveX = (Math.random() - 0.5) * 200; // -100px to 100px
            const moveY = (Math.random() - 0.5) * 200; // -100px to 100px
            heart.style.setProperty('--moveX', `${moveX}px`);
            heart.style.setProperty('--moveY', `${moveY}px`);
            
            // 随机动画时间
            const duration = 3 + Math.random() * 3; // 3-6秒
            heart.style.setProperty('--duration', `${duration}s`);
            
            // 添加到容器
            container.appendChild(heart);
            
            // 动画结束后移除
            setTimeout(() => {
                heart.remove();
                styleTag.remove();
            }, duration * 1000);
            
        }, i * 200); // 每200毫秒创建一个心形
    }
}