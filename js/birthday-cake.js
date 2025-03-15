document.addEventListener('DOMContentLoaded', function() {
    // 获取场景元素
    const scene = document.getElementById('scene');
    
    // 导出生日蛋糕显示函数供art-text.js调用
    window.showBirthdayCake = function() {
        // 隐藏原有的艺术字显示
        const textDisplay = document.querySelector('.art-text-display');
        if (textDisplay) {
            textDisplay.classList.remove('show');
        }
        
        // 创建生日蛋糕容器
        const cakeContainer = document.createElement('div');
        cakeContainer.className = 'birthday-cake-container';
        cakeContainer.style.position = 'fixed';
        cakeContainer.style.top = '50%';
        cakeContainer.style.left = '50%';
        cakeContainer.style.transform = 'translate(-50%, -50%)';
        cakeContainer.style.zIndex = '1000';
        cakeContainer.style.textAlign = 'center';
        
        // 创建SVG容器
        const svgContainer = document.createElement('div');
        svgContainer.style.width = '300px';
        svgContainer.style.height = '300px';
        svgContainer.style.margin = '0 auto';
        svgContainer.style.position = 'relative';
        
        // 生日蛋糕SVG
        const svgContent = `
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <!-- 蛋糕底座 -->
                <rect x="40" y="140" width="120" height="20" rx="5" fill="#8B4513" />
                
                <!-- 蛋糕层 -->
                <rect x="50" y="110" width="100" height="30" rx="5" fill="#FF9980" />
                <rect x="60" y="80" width="80" height="30" rx="5" fill="#FFD700" />
                <rect x="70" y="50" width="60" height="30" rx="5" fill="#FF69B4" />
                
                <!-- 蛋糕装饰 -->
                <circle cx="80" y="110" r="3" fill="#FF0000" />
                <circle cx="100" y="110" r="3" fill="#00FF00" />
                <circle cx="120" y="110" r="3" fill="#0000FF" />
                
                <circle cx="90" y="80" r="3" fill="#FF00FF" />
                <circle cx="110" y="80" r="3" fill="#FFFF00" />
                
                <circle cx="100" y="50" r="3" fill="#00FFFF" />
                
                <!-- 蜡烛 -->
                <rect x="85" y="30" width="5" height="20" fill="#FFFFFF" />
                <rect x="95" y="25" width="5" height="25" fill="#FFFFFF" />
                <rect x="105" y="35" width="5" height="15" fill="#FFFFFF" />
                
                <!-- 火焰 -->
                <ellipse cx="87.5" cy="25" rx="3" ry="5" fill="#FFFF00">
                    <animate attributeName="ry" values="5;6;5" dur="1s" repeatCount="indefinite" />
                </ellipse>
                
                <ellipse cx="97.5" cy="20" rx="3" ry="5" fill="#FFFF00">
                    <animate attributeName="ry" values="5;6;5" dur="0.8s" repeatCount="indefinite" />
                </ellipse>
                
                <ellipse cx="107.5" cy="30" rx="3" ry="5" fill="#FFFF00">
                    <animate attributeName="ry" values="5;6;5" dur="1.2s" repeatCount="indefinite" />
                </ellipse>
            </svg>
        `;
        
        // 设置SVG内容
        svgContainer.innerHTML = svgContent;
        
        // 创建生日祝福文字
        const wishElement = document.createElement('div');
        wishElement.textContent = '生日快乐！';
        wishElement.style.fontSize = '36px';
        wishElement.style.fontWeight = 'bold';
        wishElement.style.color = '#fff';
        wishElement.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.5)';
        wishElement.style.marginTop = '20px';
        
        // 添加到容器
        cakeContainer.appendChild(svgContainer);
        cakeContainer.appendChild(wishElement);
        
        // 添加到场景
        scene.appendChild(cakeContainer);
        
        // 创建粒子效果
        createBirthdayParticles(cakeContainer);
        
        // 5秒后移除
        setTimeout(() => {
            cakeContainer.style.opacity = '0';
            cakeContainer.style.transition = 'opacity 1s';
            setTimeout(() => {
                cakeContainer.remove();
            }, 1000);
        }, 5000);
    };
    
    // 创建生日粒子效果
    function createBirthdayParticles(container) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'birthday-particle';
            
            // 随机位置
            const x = Math.random() * 300 - 150;
            const y = Math.random() * 300 - 150;
            
            // 随机颜色
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.position = 'absolute';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = '0';
            
            // 添加到容器
            container.appendChild(particle);
            
            // 设置动画
            setTimeout(() => {
                particle.style.transition = 'all 1.5s ease-out';
                particle.style.opacity = '1';
                
                // 随机移动方向
                const newX = x + (Math.random() * 100 - 50);
                const newY = y + (Math.random() * 100 - 50);
                particle.style.transform = `translate(${newX}px, ${newY}px)`;
                
                // 逐渐消失
                setTimeout(() => {
                    particle.style.opacity = '0';
                }, 1000);
            }, i * 50);
        }
    }
    
    // 添加生日粒子样式
    const style = document.createElement('style');
    style.textContent = `
        .birthday-particle {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});