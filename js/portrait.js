// 素描人像效果
window.showPortrait = function() {
    // 获取场景元素
    const scene = document.getElementById('scene');
    
    // 隐藏原有的艺术字显示
    const textDisplay = document.querySelector('.art-text-display');
    if (textDisplay) {
        textDisplay.classList.remove('show');
    }
    
    // 创建人像容器
    const portraitContainer = document.createElement('div');
    portraitContainer.className = 'portrait-container';
    portraitContainer.style.position = 'fixed';
    portraitContainer.style.top = '50%';
    portraitContainer.style.left = '50%';
    portraitContainer.style.transform = 'translate(-50%, -50%)';
    portraitContainer.style.zIndex = '1000';
    portraitContainer.style.textAlign = 'center';
    
    // 创建SVG容器
    const svgContainer = document.createElement('div');
    svgContainer.style.width = '300px';
    svgContainer.style.height = '400px';
    svgContainer.style.margin = '0 auto';
    svgContainer.style.position = 'relative';
    
    // 素描风格的美女人像SVG
    const svgContent = `
        <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
            <style>
                .sketch-line { stroke: #333; fill: none; stroke-width: 1; }
                .sketch-fill { fill: #eee; stroke: #333; stroke-width: 0.5; }
                .sketch-shade { fill: #999; opacity: 0.3; }
                .sketch-detail { stroke: #555; fill: none; stroke-width: 0.7; }
                .beauty-mark { fill: #000; }
                
                @keyframes drawLine {
                    0% { stroke-dashoffset: 1000; }
                    100% { stroke-dashoffset: 0; }
                }
                
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                
                .animated-line {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: drawLine 2s forwards;
                }
                
                .animated-fill {
                    opacity: 0;
                    animation: fadeIn 2s forwards 1s;
                }
            </style>
            
            <!-- 脸部轮廓 - 更加精致的椭圆形 -->
            <path class="sketch-line animated-line" d="M150,80 Q190,75 210,110 Q230,160 225,230 Q215,280 180,320 Q160,340 150,340 Q140,340 120,320 Q85,280 75,230 Q70,160 90,110 Q110,75 150,80" />
            
            <!-- 长发 - 更加飘逸优雅 -->
            <path class="sketch-line animated-line" d="M90,110 Q60,90 70,50 Q90,15 150,10 Q210,15 230,50 Q240,90 210,110" style="animation-delay: 0.2s" />
            <path class="sketch-line animated-line" d="M90,110 Q70,150 60,200 Q55,250 65,300" style="animation-delay: 0.4s" />
            <path class="sketch-line animated-line" d="M210,110 Q230,150 240,200 Q245,250 235,300" style="animation-delay: 0.4s" />
            
            <!-- 额外的长发细节 -->
            <path class="sketch-detail animated-line" d="M65,200 Q75,230 70,260" style="animation-delay: 0.5s" />
            <path class="sketch-detail animated-line" d="M235,200 Q225,230 230,260" style="animation-delay: 0.5s" />
            <path class="sketch-detail animated-line" d="M100,40 Q120,30 150,25" style="animation-delay: 0.5s" />
            <path class="sketch-detail animated-line" d="M200,40 Q180,30 150,25" style="animation-delay: 0.5s" />
            
            <!-- 眉毛 - 更加修长优雅 -->
            <path class="sketch-line animated-line" d="M110,135 Q125,128 145,132" style="animation-delay: 0.6s" />
            <path class="sketch-line animated-line" d="M190,135 Q175,128 155,132" style="animation-delay: 0.6s" />
            
            <!-- 眉毛上的黑痣 - 位置更自然 -->
            <circle class="beauty-mark animated-fill" cx="170" cy="125" r="1.5" style="animation-delay: 1.2s" />
            
            <!-- 眼睛 - 更大更有神 -->
            <ellipse class="sketch-line animated-line" cx="120" cy="160" rx="20" ry="12" style="animation-delay: 0.8s" />
            <ellipse class="sketch-line animated-line" cx="180" cy="160" rx="20" ry="12" style="animation-delay: 0.8s" />
            
            <!-- 睫毛 - 更加浓密 -->
            <path class="sketch-detail animated-line" d="M100,155 Q105,150 110,152" style="animation-delay: 0.9s" />
            <path class="sketch-detail animated-line" d="M110,150 Q115,145 120,147" style="animation-delay: 0.9s" />
            <path class="sketch-detail animated-line" d="M120,148 Q125,143 130,145" style="animation-delay: 0.9s" />
            <path class="sketch-detail animated-line" d="M130,150 Q135,145 140,147" style="animation-delay: 0.9s" />
            
            <path class="sketch-detail animated-line" d="M160,152 Q165,147 170,150" style="animation-delay: 0.9s" />
            <path class="sketch-detail animated-line" d="M170,147 Q175,142 180,145" style="animation-delay: 0.9s" />
            <path class="sketch-detail animated-line" d="M180,145 Q185,140 190,143" style="animation-delay: 0.9s" />
            <path class="sketch-detail animated-line" d="M190,147 Q195,142 200,145" style="animation-delay: 0.9s" />
            
            <!-- 眼珠 - 更大明亮 -->
            <circle class="sketch-fill animated-fill" cx="120" cy="160" r="6" style="animation-delay: 1s" />
            <circle class="sketch-fill animated-fill" cx="180" cy="160" r="6" style="animation-delay: 1s" />
            <circle class="beauty-mark animated-fill" cx="122" cy="158" r="2" style="animation-delay: 1s" />
            <circle class="beauty-mark animated-fill" cx="182" cy="158" r="2" style="animation-delay: 1s" />
            
            <!-- 鼻子 - 更加小巧精致 -->
            <path class="sketch-line animated-line" d="M150,170 Q152,180 150,190 Q148,180 150,170" style="animation-delay: 1.2s" />
            
            <!-- 嘴巴 - 更加丰满性感 -->
            <path class="sketch-line animated-line" d="M130,230 Q150,245 170,230" style="animation-delay: 1.4s" />
            <path class="sketch-detail animated-line" d="M140,235 Q150,240 160,235" style="animation-delay: 1.5s" />
            
            <!-- 脸部阴影 - 更加自然 -->
            <path class="sketch-shade animated-fill" d="M100,180 Q120,200 100,230" style="animation-delay: 1.6s" />
            <path class="sketch-shade animated-fill" d="M200,180 Q180,200 200,230" style="animation-delay: 1.6s" />
            <path class="sketch-shade animated-fill" d="M130,210 Q150,215 170,210" style="animation-delay: 1.6s" />
            
            <!-- 素描细节线条 - 增加更多细节 -->
            <path class="sketch-detail animated-line" d="M100,100 Q120,90 140,100" style="animation-delay: 1.8s" />
            <path class="sketch-detail animated-line" d="M160,100 Q180,90 200,100" style="animation-delay: 1.8s" />
            <path class="sketch-detail animated-line" d="M110,280 Q150,300 190,280" style="animation-delay: 2s" />
            <path class="sketch-detail animated-line" d="M130,260 Q150,270 170,260" style="animation-delay: 2s" />
            
            <!-- 头发细节 - 更加丰富 -->
            <path class="sketch-detail animated-line" d="M70,60 Q90,40 120,30" style="animation-delay: 2.2s" />
            <path class="sketch-detail animated-line" d="M180,30 Q210,40 230,60" style="animation-delay: 2.2s" />
            <path class="sketch-detail animated-line" d="M80,80 Q100,60 130,50" style="animation-delay: 2.4s" />
            <path class="sketch-detail animated-line" d="M170,50 Q200,60 220,80" style="animation-delay: 2.4s" />
            <path class="sketch-detail animated-line" d="M90,70 Q110,50 140,40" style="animation-delay: 2.4s" />
            <path class="sketch-detail animated-line" d="M160,40 Q190,50 210,70" style="animation-delay: 2.4s" />
            
            <!-- 额外的发丝细节 -->
            <path class="sketch-detail animated-line" d="M75,150 Q85,140 95,145" style="animation-delay: 2.6s" />
            <path class="sketch-detail animated-line" d="M225,150 Q215,140 205,145" style="animation-delay: 2.6s" />
            <path class="sketch-detail animated-line" d="M85,170 Q95,160 105,165" style="animation-delay: 2.6s" />
            <path class="sketch-detail animated-line" d="M215,170 Q205,160 195,165" style="animation-delay: 2.6s" />
            
            <!-- 脸颊腮红效果 -->
            <path class="sketch-shade animated-fill" d="M110,200 Q120,210 110,220" style="animation-delay: 1.7s; opacity: 0.2;" />
            <path class="sketch-shade animated-fill" d="M190,200 Q180,210 190,220" style="animation-delay: 1.7s; opacity: 0.2;" />
        </svg>
    `;
    
    // 设置SVG内容
    svgContainer.innerHTML = svgContent;
    
    // 创建标题文字
    const titleElement = document.createElement('div');
    titleElement.textContent = '优雅素描';
    titleElement.style.fontSize = '36px';
    titleElement.style.fontWeight = 'bold';
    titleElement.style.color = '#fff';
    titleElement.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.5)';
    titleElement.style.marginTop = '20px';
    
    // 添加到容器
    portraitContainer.appendChild(svgContainer);
    portraitContainer.appendChild(titleElement);
    
    // 添加到场景
    scene.appendChild(portraitContainer);
    
    // 创建素描效果的粒子
    createSketchParticles(portraitContainer);
    
    // 6秒后移除
    setTimeout(() => {
        portraitContainer.style.opacity = '0';
        portraitContainer.style.transition = 'opacity 1s';
        setTimeout(() => {
            portraitContainer.remove();
        }, 1000);
    }, 6000);
};

// 创建素描风格的粒子效果
function createSketchParticles(container) {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#333';
            particle.style.borderRadius = '50%';
            
            // 随机位置
            const x = Math.random() * 300 - 150;
            const y = Math.random() * 400 - 200;
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = `translate(${x}px, ${y}px)`;
            
            // 随机透明度
            particle.style.opacity = 0.3 + Math.random() * 0.7;
            
            // 添加到容器
            container.appendChild(particle);
            
            // 设置动画
            particle.style.animation = 'fadeIn 0.5s forwards';
            
            // 随机时间后移除
            setTimeout(() => {
                particle.style.opacity = '0';
                particle.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    particle.remove();
                }, 500);
            }, 1000 + Math.random() * 4000);
        }, i * 100);
    }
}