// 花朵效果
// 定义全局函数，使其在任何地方都可访问
window.createFlower = function() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    
    // 随机花朵类型
    const flowerTypes = [
        // 基础花朵
        (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="20" fill="${color}"/><circle cx="30" cy="50" r="15" fill="${color}"/><circle cx="70" cy="50" r="15" fill="${color}"/><circle cx="50" cy="30" r="15" fill="${color}"/><circle cx="50" cy="70" r="15" fill="${color}"/><circle cx="50" cy="50" r="10" fill="yellow"/></svg>`,
        // 玫瑰花
        (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,30 C60,10 80,20 70,40 C90,35 90,60 70,55 C80,75 60,85 50,70 C40,85 20,75 30,55 C10,60 10,35 30,40 C20,20 40,10 50,30" fill="${color}"/><circle cx="50" cy="50" r="10" fill="#ffcc00"/></svg>`,
        // 郁金香
        (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,20 C65,20 75,35 75,50 C75,65 65,80 50,80 C35,80 25,65 25,50 C25,35 35,20 50,20" fill="${color}"/><path d="M50,80 L55,100 L45,100 Z" fill="#00aa00"/><path d="M50,30 L60,40 L50,50 L40,40 Z" fill="#ffff00" fill-opacity="0.7"/></svg>`,
        // 向日葵
        (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="20" fill="#ffcc00"/><g fill="${color}"><path d="M50,10 L55,30 L45,30 Z"/><path d="M50,90 L55,70 L45,70 Z"/><path d="M10,50 L30,55 L30,45 Z"/><path d="M90,50 L70,55 L70,45 Z"/><path d="M24,24 L39,39 L34,44 Z"/><path d="M76,76 L61,61 L66,56 Z"/><path d="M24,76 L39,61 L34,56 Z"/><path d="M76,24 L61,39 L66,44 Z"/></g><circle cx="50" cy="50" r="15" fill="#996600"/></svg>`,
        // 樱花
        (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="${color}"><circle cx="50" cy="30" r="15"/><circle cx="30" cy="50" r="15"/><circle cx="70" cy="50" r="15"/><circle cx="40" cy="70" r="15"/><circle cx="60" cy="70" r="15"/></g><circle cx="50" cy="50" r="10" fill="#ffcc00"/></svg>`
    ];
    
    // 随机花朵颜色
    const colors = [
        '#ff66cc', '#ff99cc', '#ff3399', '#ff0066', '#ff99ff', // 粉色系
        '#ff3366', '#ff6699', '#ff0099', '#ff33cc', '#ff66ff', // 红粉系
        '#cc99ff', '#cc66ff', '#cc33ff', '#9966ff', '#9933ff', // 紫色系
        '#ff9966', '#ff6633', '#ff9933', '#ffcc66', '#ffcc33'  // 橙色系
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 随机选择花朵类型并设置SVG
    const flowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    flower.style.backgroundImage = `url('data:image/svg+xml;utf8,${flowerType(color)}')`;    
    
    // 随机大小
    const size = Math.random() * 30 + 40; // 40-70px
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    
    // 随机位置
    flower.style.left = Math.random() * 90 + 5 + '%';
    flower.style.top = Math.random() * 90 + 5 + '%';
    
    // 随机旋转
    const rotation = Math.random() * 360;
    flower.style.transform = `rotate(${rotation}deg)`;
    
    // 添加动画
    const pulseSpeed = Math.random() * 2 + 2;
    const swaySpeed = Math.random() * 5 + 5;
    const floatSpeed = Math.random() * 8 + 7;
    
    // 组合多种动画效果
    flower.style.animation = `
        pulse ${pulseSpeed}s infinite ease-in-out, 
        sway ${swaySpeed}s infinite ease-in-out, 
        float ${floatSpeed}s infinite ease-in-out
    `;
    
    // 添加出场动画
    flower.style.opacity = '0';
    flower.style.transform = `rotate(${rotation}deg) scale(0.5)`;
    flower.style.transition = 'opacity 0.5s, transform 0.5s';
    
    document.body.appendChild(flower);
    
    // 延迟显示花朵，产生飘入效果
    setTimeout(() => {
        flower.style.opacity = '1';
        flower.style.transform = `rotate(${rotation}deg) scale(1)`;
    }, 10);
    
    // 随机移除花朵
    setTimeout(() => {
        flower.style.opacity = '0';
        flower.style.transform = `rotate(${rotation}deg) scale(0.5)`;
        setTimeout(() => {
            if (flower.parentNode) {
                flower.parentNode.removeChild(flower);
            }
        }, 1000);
    }, Math.random() * 20000 + 10000);
}

// 创建多个花朵的全局函数
window.createFlowers = function() {
    // 创建花朵簇
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            window.createFlower();
        }, i * 150);
    }
    
    // 添加花瓣效果
    createFlowerPetals();
};

// 创建花瓣效果
function createFlowerPetals() {
    const colors = ['#ff66cc', '#ff99cc', '#ff3399', '#ff0066', '#ff99ff'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'flower-petal';
            
            // 随机颜色
            const color = colors[Math.floor(Math.random() * colors.length)];
            petal.style.backgroundColor = color;
            
            // 随机大小
            const size = Math.random() * 15 + 5;
            petal.style.width = `${size}px`;
            petal.style.height = `${size * 1.5}px`;
            
            // 随机位置
            petal.style.left = Math.random() * 100 + '%';
            petal.style.top = -20 + 'px';
            
            // 随机旋转
            const rotation = Math.random() * 360;
            petal.style.transform = `rotate(${rotation}deg)`;
            
            // 随机下落速度
            const fallDuration = Math.random() * 5 + 5;
            petal.style.animation = `fallPetal ${fallDuration}s linear forwards`;
            
            document.body.appendChild(petal);
            
            // 移除花瓣
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                }
            }, fallDuration * 1000);
        }, i * 100);
    }
}

// 添加花瓣CSS样式
document.addEventListener('DOMContentLoaded', function() {
    // 添加花瓣样式
    const style = document.createElement('style');
    style.textContent = `
        .flower-petal {
            position: absolute;
            background-color: #ff66cc;
            border-radius: 50% 50% 0 50%;
            z-index: 4;
            filter: drop-shadow(0 0 3px rgba(255, 105, 180, 0.7));
            opacity: 0.8;
        }
        
        @keyframes fallPetal {
            0% { 
                transform: translateY(0) rotate(0deg); 
                opacity: 0.8; 
            }
            50% { 
                transform: translateY(40vh) translateX(100px) rotate(180deg); 
                opacity: 0.9; 
            }
            100% { 
                transform: translateY(100vh) translateX(-100px) rotate(360deg); 
                opacity: 0; 
            }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
});