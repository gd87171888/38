// 九朵幻彩玫瑰特效
window.showNineRoses = function() {
    // 获取场景元素
    const scene = document.getElementById('scene');
    
    // 隐藏原有的艺术字显示
    const textDisplay = document.querySelector('.art-text-display');
    if (textDisplay) {
        textDisplay.classList.remove('show');
    }
    
    // 创建玫瑰花容器
    const rosesContainer = document.createElement('div');
    rosesContainer.className = 'nine-roses-container';
    rosesContainer.style.position = 'fixed';
    rosesContainer.style.top = '0';
    rosesContainer.style.left = '0';
    rosesContainer.style.width = '100%';
    rosesContainer.style.height = '100%';
    rosesContainer.style.zIndex = '1000';
    rosesContainer.style.overflow = 'hidden';
    
    // 创建标题文字
    const titleElement = document.createElement('div');
    titleElement.textContent = '九朵幻彩玫瑰';
    titleElement.style.position = 'fixed';
    titleElement.style.top = '10%';
    titleElement.style.left = '50%';
    titleElement.style.transform = 'translateX(-50%)';
    titleElement.style.fontSize = '48px';
    titleElement.style.fontWeight = 'bold';
    titleElement.style.color = '#fff';
    titleElement.style.textShadow = '0 0 10px rgba(233, 30, 99, 0.8), 0 0 20px rgba(156, 39, 176, 0.5)';
    titleElement.style.opacity = '0';
    titleElement.style.transition = 'opacity 1s';
    
    // 添加到容器
    rosesContainer.appendChild(titleElement);
    
    // 添加到场景
    scene.appendChild(rosesContainer);
    
    // 创建背景渐变
    rosesContainer.style.background = 'radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)';
    
    // 显示文字
    setTimeout(() => {
        titleElement.style.opacity = '1';
    }, 500);
    
    // 创建9朵玫瑰花
    createColorfulRoses(rosesContainer, 9);
    
    // 创建彩色粒子效果
    createColorParticles(rosesContainer);
    
    // 8秒后移除
    setTimeout(() => {
        rosesContainer.style.opacity = '0';
        rosesContainer.style.transition = 'opacity 1.5s';
        setTimeout(() => {
            rosesContainer.remove();
        }, 1500);
    }, 8000);
};

// 创建多朵彩色玫瑰花
function createColorfulRoses(container, count) {
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
        
        .rose-colorful {
            position: absolute;
            width: 80px;
            height: 100px;
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
    
    // 彩色玫瑰的颜色数组
    const colorSchemes = [
        { hue: 0, name: '红色' },    // 红色
        { hue: 35, name: '橙色' },   // 橙色
        { hue: 60, name: '黄色' },   // 黄色
        { hue: 120, name: '绿色' },  // 绿色
        { hue: 180, name: '青色' },  // 青色
        { hue: 210, name: '蓝色' },  // 蓝色
        { hue: 270, name: '紫色' },  // 紫色
        { hue: 300, name: '粉色' },  // 粉色
        { hue: 330, name: '玫红' }   // 玫红
    ];
    
    // 创建玫瑰花
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const roseDiv = document.createElement('div');
            roseDiv.className = 'rose-colorful';
            roseDiv.innerHTML = roseSvgTemplate;
            
            // 计算位置 - 围绕中心排列
            const angle = (i / count) * 2 * Math.PI;
            const radius = window.innerHeight * 0.25; // 半径为视窗高度的25%
            const centerX = 50; // 中心点在50%
            const centerY = 50; // 中心点在50%
            
            const x = centerX + Math.cos(angle) * radius / window.innerWidth * 100;
            const y = centerY + Math.sin(angle) * radius / window.innerHeight * 100;
            
            roseDiv.style.left = `${x}%`;
            roseDiv.style.top = `${y}%`;
            
            // 随机大小
            const scale = 0.8 + Math.random() * 0.4; // 0.8 - 1.2
            roseDiv.style.transform = `scale(${scale})`;
            
            // 随机旋转
            const rotation = Math.random() * 30 - 15; // -15 - 15度
            roseDiv.style.rotate = `${rotation}deg`;
            
            // 随机动画延迟
            const animDelay = Math.random() * 0.5;
            roseDiv.style.animationDelay = `${animDelay}s, ${animDelay}s`;
            
            // 使用彩色方案
            const colorScheme = colorSchemes[i % colorSchemes.length];
            const hue = colorScheme.hue;
            const saturation = 70 + Math.random() * 30; // 70-100%
            const lightness = 40 + Math.random() * 20; // 40-60%
            
            // 创建标签
            const labelElement = document.createElement('div');
            labelElement.textContent = colorScheme.name;
            labelElement.style.position = 'absolute';
            labelElement.style.bottom = '-30px';
            labelElement.style.left = '50%';
            labelElement.style.transform = 'translateX(-50%)';
            labelElement.style.fontSize = '16px';
            labelElement.style.fontWeight = 'bold';
            labelElement.style.color = '#fff';
            labelElement.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.8)';
            roseDiv.appendChild(labelElement);
            
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
            
        }, i * 200); // 每200毫秒创建一朵玫瑰花
    }
}

// 创建彩色粒子效果
function createColorParticles(container) {
    // 添加粒子样式
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% { transform: translate(0, 0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(var(--moveX), var(--moveY)) scale(0.5); opacity: 0; }
        }
        
        .color-particle {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--color);
            box-shadow: 0 0 10px var(--color);
            animation: particleFloat var(--duration) forwards;
        }
    `;
    document.head.appendChild(particleStyle);
    
    // 创建多个彩色粒子
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'color-particle';
            
            // 随机位置
            const startX = Math.random() * 80 + 10; // 10% - 90%
            const startY = Math.random() * 80 + 10; // 10% - 90%
            particle.style.left = `${startX}%`;
            particle.style.top = `${startY}%`;
            
            // 随机大小
            const size = 5 + Math.random() * 10; // 5px - 15px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机彩色
            const hue = Math.random() * 360; // 0-360 (全色谱)
            const saturation = 70 + Math.random() * 30; // 70-100%
            const lightness = 40 + Math.random() * 20; // 40-60%
            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            particle.style.setProperty('--color', color);
            
            // 随机移动方向
            const moveX = (Math.random() - 0.5) * 200; // -100px to 100px
            const moveY = (Math.random() - 0.5) * 200; // -100px to 100px
            particle.style.setProperty('--moveX', `${moveX}px`);
            particle.style.setProperty('--moveY', `${moveY}px`);
            
            // 随机动画时间
            const duration = 2 + Math.random() * 3; // 2-5秒
            particle.style.setProperty('--duration', `${duration}s`);
            
            // 添加到容器
            container.appendChild(particle);
            
            // 动画结束后移除
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
            
        }, Math.random() * 5000); // 5秒内随机时间创建粒子
    }
}