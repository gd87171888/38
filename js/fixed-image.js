// 固定图片效果
document.addEventListener('DOMContentLoaded', function() {
    // 创建固定图片元素
    function createFixedImage() {
        const fixedImage = document.createElement('div');
        fixedImage.className = 'fixed-image';
        fixedImage.style.backgroundImage = `url('images/999988.png')`;
        
        // 设置固定位置 - 在标题前面
        fixedImage.style.left = '20px';
        fixedImage.style.top = '20px';
        fixedImage.style.transform = 'none';
        
        document.body.appendChild(fixedImage);
    }
    
    // 添加固定图片的CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .fixed-image {
            position: fixed;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            border: 2px solid rgba(255, 255, 255, 0.7);
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.9);
            z-index: 11;
            animation: gentle-pulse 4s infinite ease-in-out;
        }
        
        @keyframes gentle-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // 初始化
    createFixedImage();
});