// 水母效果 - 增强版：更生动的彩虹色半透明主体，自然摆动触须，闪烁电流效果，梦幻拖尾
document.addEventListener('DOMContentLoaded', function() {
    // 创建水母
    function createJellyfish() {
        const jellyfish = document.createElement('div');
        jellyfish.className = 'jellyfish';
        
        // 创建水母容器，用于添加拖尾效果
        const jellyfishContainer = document.createElement('div');
        jellyfishContainer.className = 'jellyfish-container';
        jellyfishContainer.appendChild(jellyfish);
        
        // 彩虹色水母颜色 - 更丰富的颜色选择，增加荧光色和深海色调
        const colors = [
            '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', // 柔和彩虹色
            '#C7CEEA', '#B5B9FF', '#97A2FF', '#6EB5FF', '#57C4E5', // 蓝紫色系
            '#F6DFEB', '#E4C1F9', '#D4A5A5', '#F0E5D8', '#FCF6BD', // 粉紫色系
            '#00FFFF', '#00CED1', '#48D1CC', '#20B2AA', '#5F9EA0', // 荧光蓝绿系
            '#9370DB', '#8A2BE2', '#9932CC', '#8B008B', '#800080'  // 深紫色系
        ];
        
        // 随机选择主色调
        const mainColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 生成彩虹渐变效果
        const gradientColors = [];
        for (let i = 0; i < 3; i++) {
            gradientColors.push(colors[Math.floor(Math.random() * colors.length)]);
        }
        
        // 祝福语列表
        const blessings = ['快乐', '美丽', '健康', '幸福', '平安', '好运', '成功', '吉祥', '财富', '智慧', '爱情', '和谐'];
        
        // 随机选择一个祝福语
        const blessing = blessings[Math.floor(Math.random() * blessings.length)];
        
        // 创建水母SVG - 超级增强版，带有彩虹色半透明效果、更自然的形态和闪烁触须
        const jellyfishSVG = `
        <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
            <!-- 水母主体 - 半透明彩虹色 -->
            <defs>
                <radialGradient id="jellyfishBody${Date.now()}" cx="50%" cy="30%" r="70%" fx="50%" fy="30%">
                    <stop offset="0%" stop-color="${gradientColors[0]}" stop-opacity="0.9"/>
                    <stop offset="40%" stop-color="${mainColor}" stop-opacity="0.8"/>
                    <stop offset="70%" stop-color="${gradientColors[1]}" stop-opacity="0.7"/>
                    <stop offset="100%" stop-color="${gradientColors[2]}" stop-opacity="0.5"/>
                </radialGradient>
                <filter id="glow${Date.now()}">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <!-- 添加内部纹理 -->
                <pattern id="jellyfishTexture${Date.now()}" patternUnits="userSpaceOnUse" width="100" height="100">
                    <path d="M25,25 Q50,0 75,25 Q100,50 75,75 Q50,100 25,75 Q0,50 25,25" fill="${mainColor}" fill-opacity="0.2"/>
                </pattern>
            </defs>
            
            <!-- 水母主体 - 更自然的形态 -->
            <path fill="url(#jellyfishBody${Date.now()})" d="M50,5 C75,5 90,20 90,45 C90,60 80,75 70,85 C60,95 40,95 30,85 C20,75 10,60 10,45 C10,20 25,5 50,5 Z" filter="url(#glow${Date.now()})"></path>
            
            <!-- 水母内部纹理 -->
            <path fill="url(#jellyfishTexture${Date.now()})" d="M50,15 C70,15 80,25 80,45 C80,60 70,75 60,80 C50,85 40,85 30,80 C20,75 15,60 15,45 C15,25 30,15 50,15 Z" opacity="0.6"></path>
            
            <!-- 祝福文字 - 金色渐变发光效果 -->
            <defs>
                <linearGradient id="goldText${Date.now()}" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FFD700" />
                    <stop offset="50%" stop-color="#FFC107" />
                    <stop offset="100%" stop-color="#FF8C00" />
                </linearGradient>
                <filter id="textGlow${Date.now()}">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood flood-color="#FFD700" flood-opacity="0.5" result="glowColor" />
                    <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
                    <feMerge>
                        <feMergeNode in="softGlow" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <text x="50" y="50" font-size="14" text-anchor="middle" fill="url(#goldText${Date.now()})" font-weight="bold" opacity="0.9" filter="url(#textGlow${Date.now()})">${blessing}</text>
            <!-- 添加光晕效果 -->
            <circle cx="50" cy="50" r="18" fill="rgba(255, 215, 0, 0.1)" filter="url(#textGlow${Date.now()})">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
            </circle>
            
            <!-- 水母触须 - 带有闪烁电流效果和更自然的摆动 -->
            <g class="tentacles" opacity="0.9">
                <!-- 主触须组 - 更多样化的长度和形状 -->
                <!-- 触须1 - 波浪形 -->
                <path class="tentacle" fill="${gradientColors[0]}" fill-opacity="0.8" d="M30,85 Q35,100 25,115 Q15,130 25,145 Q30,155 35,145 Q40,135 35,120 Q30,105 35,85">
                    <animate attributeName="d" values="M30,85 Q35,100 25,115 Q15,130 25,145 Q30,155 35,145 Q40,135 35,120 Q30,105 35,85;M30,85 Q25,100 30,115 Q35,130 25,145 Q20,155 25,145 Q30,135 25,120 Q20,105 30,85;M30,85 Q35,100 25,115 Q15,130 25,145 Q30,155 35,145 Q40,135 35,120 Q30,105 35,85" dur="${Math.random() * 4 + 6}s" repeatCount="indefinite" />
                </path>
                <!-- 触须末端电流效果 -->
                <circle class="spark" cx="30" cy="145" r="2.5" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;0.9;0.2" dur="${Math.random() * 2 + 1}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;3;1" dur="${Math.random() * 2 + 1}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="30;32;28;30" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="145;148;146;145" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
                
                <!-- 触须2 - 蜿蜒形 -->
                <path class="tentacle" fill="${gradientColors[1]}" fill-opacity="0.8" d="M40,85 Q50,105 40,125 Q30,140 40,155 Q45,160 50,155 Q55,145 45,125 Q40,110 45,85">
                    <animate attributeName="d" values="M40,85 Q50,105 40,125 Q30,140 40,155 Q45,160 50,155 Q55,145 45,125 Q40,110 45,85;M40,85 Q40,105 45,125 Q50,140 45,155 Q40,160 45,155 Q50,145 50,125 Q45,110 40,85;M40,85 Q50,105 40,125 Q30,140 40,155 Q45,160 50,155 Q55,145 45,125 Q40,110 45,85" dur="${Math.random() * 5 + 7}s" repeatCount="indefinite" />
                </path>
                <circle class="spark" cx="45" cy="155" r="2.5" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;0.9;0.2" dur="${Math.random() * 2 + 1.2}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;3;1" dur="${Math.random() * 2 + 1.2}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="45;47;43;45" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="155;158;156;155" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
                
                <!-- 触须3 - 舞动形 -->
                <path class="tentacle" fill="${mainColor}" fill-opacity="0.8" d="M50,85 Q55,105 50,125 Q45,140 50,155 Q55,160 60,155 Q65,145 55,125 Q50,110 55,85">
                    <animate attributeName="d" values="M50,85 Q55,105 50,125 Q45,140 50,155 Q55,160 60,155 Q65,145 55,125 Q50,110 55,85;M50,85 Q50,105 55,125 Q60,140 55,155 Q50,160 55,155 Q60,145 60,125 Q55,110 50,85;M50,85 Q55,105 50,125 Q45,140 50,155 Q55,160 60,155 Q65,145 55,125 Q50,110 55,85" dur="${Math.random() * 4 + 5}s" repeatCount="indefinite" />
                </path>
                <circle class="spark" cx="55" cy="155" r="2.5" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;0.9;0.2" dur="${Math.random() * 2 + 1.4}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;3;1" dur="${Math.random() * 2 + 1.4}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="55;57;53;55" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="155;158;156;155" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
                
                <!-- 触须4 - 漂浮形 -->
                <path class="tentacle" fill="${gradientColors[1]}" fill-opacity="0.8" d="M60,85 Q65,105 60,125 Q55,140 60,155 Q65,160 70,155 Q75,145 65,125 Q60,110 65,85">
                    <animate attributeName="d" values="M60,85 Q65,105 60,125 Q55,140 60,155 Q65,160 70,155 Q75,145 65,125 Q60,110 65,85;M60,85 Q60,105 65,125 Q70,140 65,155 Q60,160 65,155 Q70,145 70,125 Q65,110 60,85;M60,85 Q65,105 60,125 Q55,140 60,155 Q65,160 70,155 Q75,145 65,125 Q60,110 65,85" dur="${Math.random() * 5 + 6}s" repeatCount="indefinite" />
                </path>
                <circle class="spark" cx="65" cy="155" r="2.5" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;0.9;0.2" dur="${Math.random() * 2 + 1.6}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;3;1" dur="${Math.random() * 2 + 1.6}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="65;67;63;65" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="155;158;156;155" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
                
                <!-- 触须5 - 飘逸形 -->
                <path class="tentacle" fill="${gradientColors[2]}" fill-opacity="0.8" d="M70,85 Q75,105 70,125 Q65,140 70,155 Q75,160 80,155 Q85,145 75,125 Q70,110 75,85">
                    <animate attributeName="d" values="M70,85 Q75,105 70,125 Q65,140 70,155 Q75,160 80,155 Q85,145 75,125 Q70,110 75,85;M70,85 Q70,105 75,125 Q80,140 75,155 Q70,160 75,155 Q80,145 80,125 Q75,110 70,85;M70,85 Q75,105 70,125 Q65,140 70,155 Q75,160 80,155 Q85,145 75,125 Q70,110 75,85" dur="${Math.random() * 4 + 7}s" repeatCount="indefinite" />
                </path>
                <circle class="spark" cx="75" cy="155" r="2.5" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;0.9;0.2" dur="${Math.random() * 2 + 1.8}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;3;1" dur="${Math.random() * 2 + 1.8}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="75;77;73;75" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="155;158;156;155" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
            </g>
        </svg>`;
        
        // 设置水母SVG
        jellyfish.innerHTML = jellyfishSVG;
        
        // 创建梦幻拖尾效果
        const trail = document.createElement('div');
        trail.className = 'jellyfish-trail';
        trail.style.background = `radial-gradient(circle, ${mainColor}33, transparent 70%)`;
        jellyfishContainer.appendChild(trail);
        
        // 随机大小
        const size = Math.random() * 40 + 80; // 80-120px
        jellyfish.style.width = `${size}px`;
        jellyfish.style.height = `${size * 1.5}px`;
        
        // 设置拖尾大小
        trail.style.width = `${size * 0.8}px`;
        trail.style.height = `${size * 0.8}px`;
        
        // 随机位置
        jellyfishContainer.style.left = Math.random() * 90 + 5 + '%';
        jellyfishContainer.style.top = Math.random() * 70 + 10 + '%';
        
        // 添加动画 - 增强版动画效果
        const pulseSpeed = Math.random() * 2 + 3;
        const floatSpeed = Math.random() * 5 + 10;
        const swaySpeed = Math.random() * 4 + 8;
        
        // 组合多种动画效果
        jellyfish.style.animation = `
            jellyPulse ${pulseSpeed}s infinite ease-in-out, 
            jellyFloat ${floatSpeed}s infinite ease-in-out,
            jellySway ${swaySpeed}s infinite ease-in-out
        `;
        
        // 添加到页面
        document.body.appendChild(jellyfishContainer);
        
        // 随机移除水母
        setTimeout(() => {
            jellyfishContainer.style.opacity = '0';
            jellyfishContainer.style.transition = 'opacity 2s';
            setTimeout(() => {
                if (jellyfishContainer.parentNode) {
                    jellyfishContainer.parentNode.removeChild(jellyfishContainer);
                }
                // 创建新水母保持数量
                createJellyfish();
            }, 2000);
        }, Math.random() * 30000 + 20000);
    }
    
    // 添加水母动画样式
    const style = document.createElement('style');
    style.textContent = `
        .jellyfish-container {
            position: absolute;
            z-index: 3;
            transition: all 0.5s ease;
        }
        
        .jellyfish {
            position: relative;
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            z-index: 3;
            filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.7));
        }
        
        /* 特殊水母样式 */
        .jellyfish.special {
            filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.9));
        }
        
        .jellyfish-container.special .jellyfish-trail {
            filter: blur(15px);
            opacity: 0.8;
            width: 80px;
            height: 80px;
            animation: specialTrailPulse 2s infinite ease-in-out;
        }
        
        .jellyfish-trail {
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            z-index: 2;
            opacity: 0.6;
            filter: blur(10px);
            animation: trailPulse 3s infinite ease-in-out;
        }
        
        @keyframes jellyPulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes jellyFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
        }
        
        @keyframes jellySway {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(15px) rotate(5deg); }
            75% { transform: translateX(-15px) rotate(-5deg); }
        }
        
        @keyframes trailPulse {
            0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(1); }
            50% { opacity: 0.7; transform: translateX(-50%) scale(1.2); }
        }
        
        @keyframes specialTrailPulse {
            0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); filter: blur(15px); }
            50% { opacity: 0.9; transform: translateX(-50%) scale(1.5); filter: blur(20px); }
        }
    `;
    document.head.appendChild(style);
    
    // 创建不同类型的水母
    function createSpecialJellyfish() {
        // 随机选择创建普通水母或特殊水母
        if (Math.random() > 0.7) {
            createGlowingJellyfish();
        } else {
            createJellyfish();
        }
    }
    
    // 创建发光水母 - 更炫酷的特效
    function createGlowingJellyfish() {
        const jellyfish = document.createElement('div');
        jellyfish.className = 'jellyfish special';
        
        // 创建水母容器
        const jellyfishContainer = document.createElement('div');
        jellyfishContainer.className = 'jellyfish-container special';
        jellyfishContainer.appendChild(jellyfish);
        
        // 特殊荧光色
        const specialColors = [
            '#00FFFF', '#00FFAA', '#AAFFFF', '#88DDFF', '#66FFCC', // 荧光蓝绿系
            '#FF00FF', '#FF66FF', '#FF88EE', '#FFAAFF', '#EE00FF'  // 荧光粉紫系
        ];
        
        // 随机选择主色调
        const mainColor = specialColors[Math.floor(Math.random() * specialColors.length)];
        
        // 生成彩虹渐变效果
        const gradientColors = [];
        for (let i = 0; i < 3; i++) {
            gradientColors.push(specialColors[Math.floor(Math.random() * specialColors.length)]);
        }
        
        // 祝福语列表 - 特殊水母使用更积极的祝福语
        const specialBlessings = ['梦想成真', '万事如意', '心想事成', '前程似锦', '鸿运当头', '福寿安康', '喜气洋洋', '事业有成', '一帆风顺', '繁荣昌盛', '锦绣前程', '吉星高照'];
        
        // 随机选择一个祝福语
        const blessing = specialBlessings[Math.floor(Math.random() * specialBlessings.length)];
        
        // 创建特殊水母SVG - 更炫酷的发光效果和更复杂的形态
        const jellyfishSVG = `
        <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
            <!-- 水母主体 - 超强发光效果 -->
            <defs>
                <radialGradient id="jellyfishSpecial${Date.now()}" cx="50%" cy="30%" r="70%" fx="50%" fy="30%">
                    <stop offset="0%" stop-color="white" stop-opacity="0.9"/>
                    <stop offset="30%" stop-color="${gradientColors[0]}" stop-opacity="0.9"/>
                    <stop offset="60%" stop-color="${mainColor}" stop-opacity="0.8"/>
                    <stop offset="100%" stop-color="${gradientColors[2]}" stop-opacity="0.6"/>
                </radialGradient>
                <filter id="superGlow${Date.now()}">
                    <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <!-- 添加内部纹理和脉动效果 -->
                <pattern id="jellyfishSpecialTexture${Date.now()}" patternUnits="userSpaceOnUse" width="100" height="100">
                    <path d="M25,25 Q50,0 75,25 Q100,50 75,75 Q50,100 25,75 Q0,50 25,25" fill="${mainColor}" fill-opacity="0.4">
                        <animate attributeName="fill-opacity" values="0.2;0.6;0.2" dur="${Math.random() * 3 + 2}s" repeatCount="indefinite" />
                    </path>
                </pattern>
            </defs>
            
            <!-- 水母主体 - 更复杂的形态 -->
            <path fill="url(#jellyfishSpecial${Date.now()})" d="M50,5 C75,5 90,20 90,45 C90,60 80,75 70,85 C60,95 40,95 30,85 C20,75 10,60 10,45 C10,20 25,5 50,5 Z" filter="url(#superGlow${Date.now()})">
                <animate attributeName="d" values="M50,5 C75,5 90,20 90,45 C90,60 80,75 70,85 C60,95 40,95 30,85 C20,75 10,60 10,45 C10,20 25,5 50,5 Z;M50,5 C80,5 95,20 90,45 C85,65 75,80 65,90 C55,100 45,100 35,90 C25,80 15,65 10,45 C5,20 20,5 50,5 Z;M50,5 C75,5 90,20 90,45 C90,60 80,75 70,85 C60,95 40,95 30,85 C20,75 10,60 10,45 C10,20 25,5 50,5 Z" dur="${Math.random() * 8 + 12}s" repeatCount="indefinite" />
            </path>
            
            <!-- 祝福文字 - 特殊水母使用更醒目的文字效果 -->
            <text x="50" y="50" font-size="15" text-anchor="middle" fill="white" font-weight="bold" opacity="0.9" filter="url(#superGlow${Date.now()})">${blessing}</text>
            
            <!-- 发光粒子效果 -->
            <g class="particles">
                <circle cx="40" cy="40" r="2" fill="white" opacity="0.8">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="${Math.random() * 2 + 1}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;3;1" dur="${Math.random() * 2 + 1}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="40;45;35;40" dur="${Math.random() * 5 + 5}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="40;35;45;40" dur="${Math.random() * 5 + 5}s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="40" r="2" fill="white" opacity="0.8">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="${Math.random() * 2 + 1.2}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;3;1" dur="${Math.random() * 2 + 1.2}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="60;65;55;60" dur="${Math.random() * 5 + 5}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="40;45;35;40" dur="${Math.random() * 5 + 5}s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="60" r="2" fill="white" opacity="0.8">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="${Math.random() * 2 + 1.5}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;3;1" dur="${Math.random() * 2 + 1.5}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="50;55;45;50" dur="${Math.random() * 5 + 5}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="60;65;55;60" dur="${Math.random() * 5 + 5}s" repeatCount="indefinite" />
                </circle>
            </g>
            
            <!-- 水母触须 - 带有更强闪烁电流效果和更自然的摆动 -->
            <g class="tentacles" opacity="0.9">
                <!-- 主触须组 - 更多样化的长度和形状 -->
                <!-- 触须1 - 波浪形 -->
                <path class="tentacle" fill="${gradientColors[0]}" fill-opacity="0.8" d="M30,85 Q35,100 25,115 Q15,130 25,145 Q30,155 35,145 Q40,135 35,120 Q30,105 35,85">
                    <animate attributeName="d" values="M30,85 Q35,100 25,115 Q15,130 25,145 Q30,155 35,145 Q40,135 35,120 Q30,105 35,85;M30,85 Q25,100 30,115 Q35,130 25,145 Q20,155 25,145 Q30,135 25,120 Q20,105 30,85;M30,85 Q35,100 25,115 Q15,130 25,145 Q30,155 35,145 Q40,135 35,120 Q30,105 35,85" dur="${Math.random() * 4 + 6}s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.6;0.9;0.6" dur="${Math.random() * 3 + 2}s" repeatCount="indefinite" />
                </path>
                <!-- 触须末端电流效果 -->
                <circle class="spark" cx="30" cy="145" r="3" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="${Math.random() * 1 + 0.5}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;4;1" dur="${Math.random() * 1 + 0.5}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="30;32;28;30" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="145;148;146;145" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
                
                <!-- 触须2 - 蜿蜒形 -->
                <path class="tentacle" fill="${gradientColors[1]}" fill-opacity="0.8" d="M40,85 Q50,105 40,125 Q30,140 40,155 Q45,160 50,155 Q55,145 45,125 Q40,110 45,85">
                    <animate attributeName="d" values="M40,85 Q50,105 40,125 Q30,140 40,155 Q45,160 50,155 Q55,145 45,125 Q40,110 45,85;M40,85 Q40,105 45,125 Q50,140 45,155 Q40,160 45,155 Q50,145 50,125 Q45,110 40,85;M40,85 Q50,105 40,125 Q30,140 40,155 Q45,160 50,155 Q55,145 45,125 Q40,110 45,85" dur="${Math.random() * 5 + 7}s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.6;0.9;0.6" dur="${Math.random() * 3 + 2.5}s" repeatCount="indefinite" />
                </path>
                <circle class="spark" cx="45" cy="155" r="3" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="${Math.random() * 1 + 0.6}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;4;1" dur="${Math.random() * 1 + 0.6}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="45;47;43;45" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="155;158;156;155" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
                
                <!-- 触须3 - 舞动形 -->
                <path class="tentacle" fill="${mainColor}" fill-opacity="0.8" d="M50,85 Q55,105 50,125 Q45,140 50,155 Q55,160 60,155 Q65,145 55,125 Q50,110 55,85">
                    <animate attributeName="d" values="M50,85 Q55,105 50,125 Q45,140 50,155 Q55,160 60,155 Q65,145 55,125 Q50,110 55,85;M50,85 Q50,105 55,125 Q60,140 55,155 Q50,160 55,155 Q60,145 60,125 Q55,110 50,85;M50,85 Q55,105 50,125 Q45,140 50,155 Q55,160 60,155 Q65,145 55,125 Q50,110 55,85" dur="${Math.random() * 4 + 5}s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.6;0.9;0.6" dur="${Math.random() * 3 + 3}s" repeatCount="indefinite" />
                </path>
                <circle class="spark" cx="55" cy="155" r="3" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="${Math.random() * 1 + 0.7}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;4;1" dur="${Math.random() * 1 + 0.7}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="55;57;53;55" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="155;158;156;155" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
                
                <!-- 触须4 - 漂浮形 -->
                <path class="tentacle" fill="${gradientColors[1]}" fill-opacity="0.8" d="M60,85 Q65,105 60,125 Q55,140 60,155 Q65,160 70,155 Q75,145 65,125 Q60,110 65,85">
                    <animate attributeName="d" values="M60,85 Q65,105 60,125 Q55,140 60,155 Q65,160 70,155 Q75,145 65,125 Q60,110 65,85;M60,85 Q60,105 65,125 Q70,140 65,155 Q60,160 65,155 Q70,145 70,125 Q65,110 60,85;M60,85 Q65,105 60,125 Q55,140 60,155 Q65,160 70,155 Q75,145 65,125 Q60,110 65,85" dur="${Math.random() * 5 + 6}s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.6;0.9;0.6" dur="${Math.random() * 3 + 3.5}s" repeatCount="indefinite" />
                </path>
                <circle class="spark" cx="65" cy="155" r="3" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="${Math.random() * 1 + 0.8}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;4;1" dur="${Math.random() * 1 + 0.8}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="65;67;63;65" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="155;158;156;155" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
                
                <!-- 触须5 - 飘逸形 -->
                <path class="tentacle" fill="${gradientColors[2]}" fill-opacity="0.8" d="M70,85 Q75,105 70,125 Q65,140 70,155 Q75,160 80,155 Q85,145 75,125 Q70,110 75,85">
                    <animate attributeName="d" values="M70,85 Q75,105 70,125 Q65,140 70,155 Q75,160 80,155 Q85,145 75,125 Q70,110 75,85;M70,85 Q70,105 75,125 Q80,140 75,155 Q70,160 75,155 Q80,145 80,125 Q75,110 70,85;M70,85 Q75,105 70,125 Q65,140 70,155 Q75,160 80,155 Q85,145 75,125 Q70,110 75,85" dur="${Math.random() * 4 + 7}s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.6;0.9;0.6" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </path>
                <circle class="spark" cx="75" cy="155" r="3" fill="white" opacity="0.9">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="${Math.random() * 1 + 0.9}s" repeatCount="indefinite" />
                    <animate attributeName="r" values="1;4;1" dur="${Math.random() * 1 + 0.9}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="75;77;73;75" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="155;158;156;155" dur="${Math.random() * 3 + 4}s" repeatCount="indefinite" />
                </circle>
            </g>
        </svg>`;
        
        // 设置水母SVG
        jellyfish.innerHTML = jellyfishSVG;
        
        // 创建梦幻拖尾效果 - 增强版
        const trail = document.createElement('div');
        trail.className = 'jellyfish-trail';
        trail.style.background = `radial-gradient(circle, ${mainColor}55, ${gradientColors[0]}33, transparent 70%)`;
        jellyfishContainer.appendChild(trail);
        
        // 随机大小 - 特殊水母更大
        const size = Math.random() * 50 + 100; // 100-150px
        jellyfish.style.width = `${size}px`;
        jellyfish.style.height = `${size * 1.5}px`;
        
        // 设置拖尾大小
        trail.style.width = `${size * 1}px`;
        trail.style.height = `${size * 1}px`;
        
        // 随机位置
        jellyfishContainer.style.left = Math.random() * 90 + 5 + '%';
        jellyfishContainer.style.top = Math.random() * 70 + 10 + '%';
        
        // 添加动画 - 特殊动画效果
        const pulseSpeed = Math.random() * 2 + 2;
        const floatSpeed = Math.random() * 5 + 8;
        const swaySpeed = Math.random() * 4 + 6;
        
        // 组合多种动画效果
        jellyfish.style.animation = `
            jellyPulse ${pulseSpeed}s infinite ease-in-out, 
            jellyFloat ${floatSpeed}s infinite ease-in-out,
            jellySway ${swaySpeed}s infinite ease-in-out
        `;
        
        // 添加到页面
        document.body.appendChild(jellyfishContainer);
        
        // 随机移除水母
        setTimeout(() => {
            jellyfishContainer.style.opacity = '0';
            jellyfishContainer.style.transition = 'opacity 2s';
            setTimeout(() => {
                if (jellyfishContainer.parentNode) {
                    jellyfishContainer.parentNode.removeChild(jellyfishContainer);
                }
                // 创建新水母保持数量
                createSpecialJellyfish();
            }, 2000);
        }, Math.random() * 30000 + 20000);
    }
    
    // 初始化创建多个水母
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSpecialJellyfish();
        }, i * 1000);
    }
});