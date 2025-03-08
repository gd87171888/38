// 海洋背景效果
document.addEventListener('DOMContentLoaded', function() {
    // 创建海洋背景元素
    const ocean = document.createElement('div');
    ocean.id = 'ocean';
    document.body.appendChild(ocean);
    
    // 创建气泡效果
    function createBubbles() {
        for (let i = 0; i < 20; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.width = Math.random() * 20 + 10 + 'px';
            bubble.style.height = bubble.style.width;
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.animationDuration = Math.random() * 10 + 5 + 's';
            bubble.style.animationDelay = Math.random() * 5 + 's';
            ocean.appendChild(bubble);
        }
    }
    
    // 添加气泡样式
    const style = document.createElement('style');
    style.textContent = `
        .bubble {
            position: absolute;
            bottom: -50px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            z-index: 2;
            animation: rise linear infinite;
        }
        
        @keyframes rise {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 创建波浪效果
    function createWaves() {
        const waveContainer = document.createElement('div');
        waveContainer.className = 'wave-container';
        ocean.appendChild(waveContainer);
        
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'wave';
            wave.style.animationDelay = i * 0.5 + 's';
            wave.style.opacity = 0.5 - i * 0.1;
            waveContainer.appendChild(wave);
        }
    }
    
    // 添加波浪样式
    const waveStyle = document.createElement('style');
    waveStyle.textContent = `
        .wave-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 200px;
            overflow: hidden;
        }
        
        .wave {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 100px;
            background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%2300ffff" fill-opacity="0.2" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
            background-size: 100% 100%;
            animation: wave 20s linear infinite;
        }
        
        @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
    `;
    document.head.appendChild(waveStyle);
    
    // 初始化
    createBubbles();
    createWaves();
});