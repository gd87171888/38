// 烟花特效
window.createFirework = function(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    document.body.appendChild(firework);

    // 创建烟花爆炸粒子
    const particleCount = 50; // 粒子数量
    const colors = [
        '#FFD700', // 金色
        '#FF0000', // 红色
        '#FF69B4', // 粉红
        '#4169E1', // 皇家蓝
        '#7B68EE', // 中等紫罗兰色
        '#00FF00', // 酸橙绿
        '#FF4500', // 橙红色
        '#FF1493', // 深粉色
        '#00FFFF', // 青色
        '#FF00FF'  // 洋红
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // 随机颜色
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        // 随机大小
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机角度和距离
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 8 + 8;
        const velocityX = Math.cos(angle) * velocity;
        const velocityY = Math.sin(angle) * velocity;
        
        // 设置动画
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${velocityX * 20}px, ${velocityY * 20}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 1000 + 1000,
            easing: 'cubic-bezier(0,0,0.2,1)'
        });
        
        firework.appendChild(particle);
    }

    // 移除烟花
    setTimeout(() => {
        if (firework.parentNode) {
            firework.parentNode.removeChild(firework);
        }
    }, 2000);
}

// 创建多个烟花的函数
window.createFireworks = function() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // 创建多个烟花
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * (screenWidth * 0.8) + (screenWidth * 0.1);
            const y = Math.random() * (screenHeight * 0.6) + (screenHeight * 0.2);
            window.createFirework(x, y);
        }, i * 300);
    }
};