// 玫瑰花特效
window.showRose = function() {
    // 获取场景元素
    const scene = document.getElementById('scene');
    
    // 隐藏原有的艺术字显示
    const textDisplay = document.querySelector('.art-text-display');
    if (textDisplay) {
        textDisplay.classList.remove('show');
    }
    
    // 创建玫瑰花容器
    const roseContainer = document.createElement('div');
    roseContainer.className = 'rose-container';
    roseContainer.style.position = 'fixed';
    roseContainer.style.top = '50%';
    roseContainer.style.left = '50%';
    roseContainer.style.transform = 'translate(-50%, -50%)';
    roseContainer.style.zIndex = '1000';
    roseContainer.style.textAlign = 'center';
    
    // 创建SVG容器
    const svgContainer = document.createElement('div');
    svgContainer.style.width = '300px';
    svgContainer.style.height = '400px';
    svgContainer.style.margin = '0 auto';
    svgContainer.style.position = 'relative';
    
    // 玫瑰花SVG
    const svgContent = `
        <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
            <style>
                .rose-petal { fill: #e91e63; }
                .rose-petal-dark { fill: #c2185b; }
                .rose-petal-light { fill: #f06292; }
                .rose-stem { fill: #388e3c; }
                .rose-leaf { fill: #4caf50; }
                .rose-thorn { fill: #2e7d32; }
                
                @keyframes petalBloom {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes stemGrow {
                    0% { transform: scaleY(0); transform-origin: bottom; }
                    100% { transform: scaleY(1); transform-origin: bottom; }
                }
                
                @keyframes leafSway {
                    0% { transform: rotate(-5deg); }
                    50% { transform: rotate(5deg); }
                    100% { transform: rotate(-5deg); }
                }
                
                .animated-petal {
                    opacity: 0;
                    transform: scale(0);
                    animation: petalBloom 1.5s forwards;
                }
                
                .animated-stem {
                    transform: scaleY(0);
                    animation: stemGrow 2s forwards;
                }
                
                .animated-leaf {
                    animation: leafSway 4s infinite ease-in-out;
                }
            </style>
            
            <!-- 茎 -->
            <path class="rose-stem animated-stem" d="M150,400 L150,250" stroke="#388e3c" stroke-width="8" />
            
            <!-- 叶子 -->
            <path class="rose-leaf animated-leaf" d="M150,320 Q120,300 100,320 Q120,340 150,320" style="animation-delay: 0.5s" />
            <path class="rose-leaf animated-leaf" d="M150,350 Q180,330 200,350 Q180,370 150,350" style="animation-delay: 0.8s" />
            
            <!-- 刺 -->
            <path class="rose-thorn" d="M146,300 L135,310 L146,315" />
            <path class="rose-thorn" d="M154,330 L165,340 L154,345" />
            
            <!-- 花朵底部 -->
            <ellipse class="rose-petal-dark animated-petal" cx="150" cy="250" rx="30" ry="20" style="animation-delay: 1s" />
            
            <!-- 花瓣层 - 从下到上，从外到内 -->
            <!-- 第一层花瓣（最外层） -->
            <path class="rose-petal animated-petal" d="M120,240 Q150,200 180,240 Q150,260 120,240" style="animation-delay: 1.2s" />
            <path class="rose-petal animated-petal" d="M110,220 Q150,180 190,220 Q150,250 110,220" style="animation-delay: 1.3s" />
            <path class="rose-petal animated-petal" d="M130,210 Q150,170 170,210 Q150,240 130,210" style="animation-delay: 1.4s" />
            
            <!-- 第二层花瓣 -->
            <path class="rose-petal-light animated-petal" d="M125,200 Q150,170 175,200 Q150,220 125,200" style="animation-delay: 1.5s" />
            <path class="rose-petal-light animated-petal" d="M115,190 Q150,150 185,190 Q150,210 115,190" style="animation-delay: 1.6s" />
            <path class="rose-petal-light animated-petal" d="M135,180 Q150,150 165,180 Q150,200 135,180" style="animation-delay: 1.7s" />
            
            <!-- 第三层花瓣（内层） -->
            <path class="rose-petal animated-petal" d="M130,170 Q150,150 170,170 Q150,190 130,170" style="animation-delay: 1.8s" />
            <path class="rose-petal animated-petal" d="M140,160 Q150,140 160,160 Q150,170 140,160" style="animation-delay: 1.9s" />
            
            <!-- 花蕊 -->
            <circle class="rose-petal-dark animated-petal" cx="150" cy="160" r="10" style="animation-delay: 2s" />
            
            <!-- 装饰性光点 -->
            <circle class="animated-petal" cx="130" cy="200" r="2" fill="white" opacity="0.7" style="animation-delay: 2.2s" />
            <circle class="animated-petal" cx="170" cy="210" r="1.5" fill="white" opacity="0.7" style="animation-delay: 2.3s" />
            <circle class="animated-petal" cx="145" cy="180" r="1" fill="white" opacity="0.7" style="animation-delay: 2.4s" />
        </svg>
    `;
    
    // 设置SVG内容
    svgContainer.innerHTML = svgContent;
    
    // 创建标题文字
    const titleElement = document.createElement('div');
    titleElement.textContent = '绽放玫瑰';
    titleElement.style.fontSize = '36px';
    titleElement.style.fontWeight = 'bold';
    titleElement.style.color = '#fff';
    titleElement.style.textShadow = '0 0 10px rgba(233, 30, 99, 0.8), 0 0 20px rgba(156, 39, 176, 0.5)';
    titleElement.style.marginTop = '20px';
    
    // 添加到容器
    roseContainer.appendChild(svgContainer);
    roseContainer.appendChild(titleElement);
    
    // 添加到场景
    scene.appendChild(roseContainer);
    
    // 创建玫瑰花瓣粒子效果
    createRosePetals(roseContainer);
    
    // 6秒后移除
    setTimeout(() => {
        roseContainer.style.opacity = '0';
        roseContainer.style.transition = 'opacity 1s';
        setTimeout(() => {
            roseContainer.remove();
        }, 1000);
    }, 6000);
};

// 创建玫瑰花瓣粒子效果
function createRosePetals(container) {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.style.position = 'absolute';
            petal.style.width = '10px';
            petal.style.height = '15px';
            petal.style.background = '#e91e63';
            petal.style.borderRadius = '50% 50% 50% 0';
            petal.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
            
            // 随机位置
            const x = Math.random() * 400 - 200;
            const y = Math.random() * 400 - 200;
            petal.style.left = '50%';
            petal.style.top = '50%';
            petal.style.marginLeft = x + 'px';
            petal.style.marginTop = y + 'px';
            
            // 随机透明度
            petal.style.opacity = 0.3 + Math.random() * 0.7;
            
            // 添加到容器
            container.appendChild(petal);
            
            // 设置动画
            petal.style.animation = 'fadeIn 0.5s forwards, float 3s infinite ease-in-out';
            
            // 随机时间后移除
            setTimeout(() => {
                petal.style.opacity = '0';
                petal.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    petal.remove();
                }, 500);
            }, 1000 + Math.random() * 4000);
        }, i * 100);
    }
}

// 添加CSS动画
const styleElement = document.createElement('style');
styleElement.textContent = `
@keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(5px, 5px) rotate(180deg); }
    100% { transform: translate(0, 0) rotate(360deg); }
}

@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
`;
document.head.appendChild(styleElement);