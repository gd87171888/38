// 发财效果
// 定义全局函数，使其在任何地方都可访问
window.createCoin = function() {
    const coin = document.createElement('div');
    coin.className = 'coin';
    
    // 随机金币类型
    const coinTypes = [
        // 基础金币
        () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#FFD700" stroke="#FFA500" stroke-width="5"/><text x="50" y="65" font-size="40" text-anchor="middle" fill="#B8860B" font-weight="bold">¥</text></svg>`,
        // 元宝
        () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10,60 C10,40 90,40 90,60 L80,80 L20,80 Z" fill="#FFD700" stroke="#B8860B" stroke-width="2"/><path d="M30,60 C30,50 70,50 70,60 L65,70 L35,70 Z" fill="#B8860B" stroke="#B8860B" stroke-width="1"/></svg>`,
        // 红包
        () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="70" rx="5" fill="#FF0000" stroke="#B8860B" stroke-width="2"/><rect x="35" y="10" width="30" height="20" rx="5" fill="#FF0000" stroke="#B8860B" stroke-width="2"/><circle cx="50" cy="50" r="15" fill="#FFD700"/><text x="50" y="55" font-size="20" text-anchor="middle" fill="#B8860B" font-weight="bold">福</text></svg>`,
        // 财神
        () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#FFD700"/><circle cx="50" cy="40" r="20" fill="#FFEBCD"/><path d="M30,60 C30,80 70,80 70,60" fill="none" stroke="#B8860B" stroke-width="2"/><circle cx="40" cy="35" r="3" fill="#000"/><circle cx="60" cy="35" r="3" fill="#000"/><path d="M40,70 L60,70" stroke="#B8860B" stroke-width="2"/><path d="M30,30 L40,25 M70,30 L60,25" stroke="#000" stroke-width="2"/></svg>`
    ];
    
    // 随机选择金币类型并设置SVG
    const coinType = coinTypes[Math.floor(Math.random() * coinTypes.length)];
    coin.style.backgroundImage = `url('data:image/svg+xml;utf8,${coinType()}')`;
    
    // 随机大小
    const size = Math.random() * 20 + 30; // 30-50px
    coin.style.width = `${size}px`;
    coin.style.height = `${size}px`;
    
    // 随机位置
    coin.style.left = Math.random() * 90 + 5 + '%';
    coin.style.top = -50 + 'px';
    
    // 随机旋转
    const rotation = Math.random() * 360;
    coin.style.transform = `rotate(${rotation}deg)`;
    
    // 添加动画
    const fallDuration = Math.random() * 3 + 2;
    const swayAmount = Math.random() * 100 - 50;
    
    // 设置CSS变量用于摇摆效果
    coin.style.setProperty('--sway-amount', `${swayAmount}px`);
    
    // 设置下落动画
    coin.style.animation = `fallCoin ${fallDuration}s linear forwards`;
    
    document.body.appendChild(coin);
    
    // 随机移除金币
    setTimeout(() => {
        if (coin.parentNode) {
            coin.parentNode.removeChild(coin);
        }
    }, fallDuration * 1000);
}

// 创建多个金币的全局函数
window.createFortune = function() {
    // 创建烟花特效
    window.createFireworks();
    
    // 同时也保留一些金币效果
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            window.createCoin();
        }, i * 100);
    }
};