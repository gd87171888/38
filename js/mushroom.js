// 蘑菇效果
document.addEventListener('DOMContentLoaded', function() {
    // 创建蘑菇
    function createMushroom() {
        const mushroom = document.createElement('div');
        mushroom.className = 'mushroom';
        
        // 随机蘑菇颜色 - 更多海底发光色系
        const colors = ['#ff00ff', '#cc00cc', '#ff33cc', '#cc33ff', '#9900cc', '#00ffcc', '#33ccff', '#66ffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // 生成随机的辉光颜色（与主色相近但略有变化）
        const glowColor = color.replace('cc', 'ff').replace('00', '33');
        
        // 设置蘑菇SVG - 添加发光效果
        mushroom.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mushroomGlow${Date.now()}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="10%" stop-color="white" stop-opacity="0.7"/><stop offset="30%" stop-color="${glowColor}" stop-opacity="0.6"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient><filter id="blur${Date.now()}"><feGaussianBlur stdDeviation="2" /></filter></defs><ellipse cx="50" cy="50" rx="35" ry="20" fill="url(#mushroomGlow${Date.now()})" filter="url(#blur${Date.now()})" opacity="0.7"/><path fill="${color}" d="M30,60 C30,40 70,40 70,60 L65,100 L35,100 Z"></path><path fill="white" fill-opacity="0.7" d="M40,55 C40,50 45,50 45,55 M55,55 C55,50 60,50 60,55 M47,45 C47,40 53,40 53,45"></path><path fill="white" fill-opacity="0.5" d="M30,60 C30,40 70,40 70,60 L70,65 C70,70 30,70 30,65 Z"></path><circle cx="43" cy="53" r="2" fill="white" opacity="0.9"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" /></circle><circle cx="57" cy="53" r="2" fill="white" opacity="0.9"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" /></circle><circle cx="50" cy="43" r="2" fill="white" opacity="0.9"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" /></circle></svg>')`;
        
        // 随机位置
        mushroom.style.left = Math.random() * 90 + 5 + '%';
        mushroom.style.top = Math.random() * 90 + 5 + '%';
        
        // 添加动画
        mushroom.style.animation = `pulse ${Math.random() * 3 + 2}s infinite ease-in-out, sway ${Math.random() * 6 + 4}s infinite ease-in-out, glow ${Math.random() * 4 + 3}s infinite ease-in-out`;
        
        document.body.appendChild(mushroom);
        
        // 随机移除蘑菇
        setTimeout(() => {
            mushroom.style.opacity = '0';
            mushroom.style.transition = 'opacity 2s';
            setTimeout(() => {
                if (mushroom.parentNode) {
                    mushroom.parentNode.removeChild(mushroom);
                }
                // 创建新蘑菇保持数量
                createMushroom();
            }, 2000);
        }, Math.random() * 25000 + 15000);
    }
    
    // 初始化创建多个蘑菇
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createMushroom();
        }, i * 1000);
    }
    
    // 添加用户图片到场景中的函数
    window.addUserImageToScene = function(imageSrc) {
        const floatingImage = document.createElement('div');
        floatingImage.className = 'floating-image';
        floatingImage.style.backgroundImage = `url(${imageSrc})`;
        document.body.appendChild(floatingImage);
    };
});