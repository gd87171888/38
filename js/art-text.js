document.addEventListener('DOMContentLoaded', function() {
    const scene = document.getElementById('scene');
    
    // 创建艺术字输入容器
    const inputContainer = document.createElement('div');
    inputContainer.className = 'art-text-input-container';
    
    // 创建输入框
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.className = 'art-text-input';
    textInput.placeholder = '输入艺术字...';
    textInput.maxLength = 20; // 限制输入长度
    
    // 创建发送按钮
    const sendBtn = document.createElement('button');
    sendBtn.className = 'art-text-send-btn';
    sendBtn.textContent = '发送';
    
    // 将输入框和按钮添加到容器中
    inputContainer.appendChild(textInput);
    inputContainer.appendChild(sendBtn);
    
    // 创建艺术字显示区域
    const textDisplay = document.createElement('div');
    textDisplay.className = 'art-text-display';
    
    // 创建艺术字内容元素
    const textContent = document.createElement('div');
    textContent.className = 'art-text-content';
    textDisplay.appendChild(textContent);
    
    // 将容器和显示区域添加到场景中
    scene.appendChild(inputContainer);
    scene.appendChild(textDisplay);
    
    // 发送按钮点击事件
    sendBtn.addEventListener('click', displayArtText);
    
    // 输入框回车事件
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            displayArtText();
        }
    });
    
    // 显示艺术字效果
    function displayArtText() {
        const text = textInput.value.trim();
        if (!text) return; // 如果输入为空，不执行任何操作
        
        // 清空输入框
        textInput.value = '';
        
        // 检查特殊关键词
        if (checkSpecialKeywords(text)) {
            // 如果是特殊关键词，直接返回，由特殊效果函数处理
            return;
        }
        
        // 创建艺术字容器
        textContent.textContent = '';
        textContent.style.animation = '';
        textContent.style.backgroundImage = 'linear-gradient(45deg, #00ffff, #ff00ff)';
        textContent.style.webkitBackgroundClip = 'text';
        textContent.style.backgroundClip = 'text';
        
        // 显示艺术字容器
        textDisplay.classList.add('show');
        
        // 创建粒子效果
        createParticles();
        
        // 逐字显示文本
        let currentIndex = 0;
        const textLength = text.length;
        const charDelay = 150; // 每个字符的延迟时间(毫秒)
        
        function showNextChar() {
            if (currentIndex < textLength) {
                // 添加下一个字符
                textContent.textContent += text[currentIndex];
                currentIndex++;
                
                // 随机添加轻微抖动效果
                if (Math.random() > 0.7) {
                    textContent.style.animation = 'handDrawnShake 0.3s';
                    setTimeout(() => {
                        textContent.style.animation = '';
                    }, 300);
                }
                
                // 继续显示下一个字符
                setTimeout(showNextChar, charDelay + Math.random() * 100);
            } else {
                // 所有字符显示完毕，添加最终效果
                applyFinalEffect();
            }
        }
        
        // 开始显示第一个字符
        setTimeout(showNextChar, 300);
        
        // 应用最终效果
        function applyFinalEffect() {
            // 随机选择一种效果
            const effects = ['glow', 'handwriting', 'colorShift', 'float', 'inkSpread'];
            const effect = effects[Math.floor(Math.random() * effects.length)];
            
            switch(effect) {
                case 'glow':
                    textContent.style.animation = 'textGlow 2s infinite';
                    break;
                case 'handwriting':
                    textContent.style.animation = 'handDrawnShake 0.5s infinite';
                    break;
                case 'colorShift':
                    textContent.style.animation = 'textColorShift 8s infinite';
                    break;
                case 'float':
                    textContent.style.animation = 'textFloat 4s infinite, textGlow 2s infinite';
                    break;
                case 'inkSpread':
                    textContent.style.animation = 'inkSpread 2s forwards, textGlow 2s infinite';
                    break;
            }
        }
        
        // 6秒后隐藏艺术字
        setTimeout(() => {
            textDisplay.style.animation = 'textFadeOut 1s forwards';
            setTimeout(() => {
                textDisplay.classList.remove('show');
                textDisplay.style.animation = '';
            }, 1000);
        }, 6000);
    }
    
    // 创建粒子效果
    function createParticles() {
        // 清除现有粒子
        const existingParticles = document.querySelectorAll('.art-text-particle');
        existingParticles.forEach(p => p.remove());
        
        // 创建新粒子
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'art-text-particle';
            
            // 随机位置
            const x = Math.random() * 100 - 50;
            const y = Math.random() * 100 - 50;
            
            // 随机颜色
            const colors = ['#00ffff', '#ff00ff', '#ffff00'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = `translate(${x}px, ${y}px)`;
            
            // 添加到显示区域
            textDisplay.appendChild(particle);
            
            // 设置动画
            setTimeout(() => {
                particle.style.animation = 'particleBurst 1.5s forwards';
            }, i * 50);
        }
    }
    
    // 检查特殊关键词
    function checkSpecialKeywords(text) {
        // 转换为小写并移除空格进行比较
        const normalizedText = text.toLowerCase().replace(/\s+/g, '');
        
        if (normalizedText.includes('生日') || normalizedText.includes('birthday')) {
            setTimeout(() => {
                showBirthdayCake();
            }, 1000);
            return true;
        } else if (normalizedText.includes('老虎') || normalizedText.includes('tiger')) {
            setTimeout(() => {
                showAnimal('tiger');
            }, 1000);
            return true;
        } else if (normalizedText.includes('白雪')) {
            setTimeout(() => {
                if (window.showRose) {
                    window.showRose();
                } else {
                    console.log('玫瑰花特效未加载');
                }
            }, 1000);
            return true;
        } else if (normalizedText.includes('大小') || normalizedText.includes('骰子')) {
            setTimeout(() => {
                if (window.showDice) {
                    window.showDice();
                } else {
                    console.log('骰子特效未加载');
                }
            }, 1000);
            return true;
        } else if (normalizedText.includes('九朵玫瑰') || normalizedText.includes('幻彩玫瑰')) {
            console.log('检测到九朵玫瑰关键词，准备显示幻彩玫瑰');
            setTimeout(() => {
                if (window.showNineRoses) {
                    window.showNineRoses();
                    console.log('显示九朵幻彩玫瑰特效');
                } else {
                    console.log('九朵幻彩玫瑰特效未加载');
                }
            }, 1000);
            return true;
        } else if (normalizedText === '822' || normalizedText === 822) {
            console.log('检测到822关键词，准备显示生日玫瑰花');
            setTimeout(() => {
                if (window.showBirthdayRoses) {
                    window.showBirthdayRoses();
                    console.log('显示生日玫瑰花特效');
                } else {
                    console.log('生日玫瑰花特效未加载');
                }
            }, 1000);
            return true;
        } else if (normalizedText.includes('中考')) {
            console.log('检测到中考关键词，准备显示中考加油特效');
            setTimeout(() => {
                if (window.showExamCheer) {
                    window.showExamCheer('zhongkao');
                    console.log('显示中考加油特效');
                } else {
                    console.log('中考加油特效未加载');
                }
            }, 1000);
            return true;
        } else if (normalizedText.includes('高考')) {
            console.log('检测到高考关键词，准备显示高考加油特效');
            setTimeout(() => {
                if (window.showExamCheer) {
                    window.showExamCheer('gaokao');
                    console.log('显示高考加油特效');
                } else {
                    console.log('高考加油特效未加载');
                }
            }, 1000);
            return true;
        }
        // 没有匹配到特殊关键词
        return false;
    }
    
    // 显示动物特效
    function showAnimal(type) {
        // 隐藏原有的艺术字显示
        textDisplay.classList.remove('show');
        
        // 创建动物容器
        const animalContainer = document.createElement('div');
        animalContainer.className = 'animal-container';
        animalContainer.style.position = 'fixed';
        animalContainer.style.top = '50%';
        animalContainer.style.left = '50%';
        animalContainer.style.transform = 'translate(-50%, -50%)';
        animalContainer.style.zIndex = '1000';
        animalContainer.style.textAlign = 'center';
        
        // 创建SVG容器
        const svgContainer = document.createElement('div');
        svgContainer.style.width = '300px';
        svgContainer.style.height = '300px';
        svgContainer.style.margin = '0 auto';
        svgContainer.style.position = 'relative';
        
        // 根据类型创建不同的动物
        let svgContent = '';
        let animalName = '';
        
        if (type === 'tiger') {
            animalName = '老虎';
            // 简化的老虎SVG
            svgContent = `
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <!-- 老虎身体 -->
                    <ellipse cx="100" cy="110" rx="70" ry="50" fill="#FF9800" />
                    <!-- 老虎头部 -->
                    <circle cx="100" cy="70" r="40" fill="#FF9800" />
                    <!-- 老虎条纹 -->
                    <path d="M60 90 L80 90" stroke="#000" stroke-width="5" />
                    <path d="M70 110 L90 110" stroke="#000" stroke-width="5" />
                    <path d="M80 130 L100 130" stroke="#000" stroke-width="5" />
                    <path d="M120 90 L140 90" stroke="#000" stroke-width="5" />
                    <path d="M110 110 L130 110" stroke="#000" stroke-width="5" />
                    <path d="M100 130 L120 130" stroke="#000" stroke-width="5" />
                    <!-- 老虎眼睛 -->
                    <circle cx="85" cy="65" r="5" fill="#000" />
                    <circle cx="115" cy="65" r="5" fill="#000" />
                    <!-- 老虎鼻子 -->
                    <circle cx="100" cy="80" r="5" fill="#000" />
                    <!-- 老虎嘴巴 -->
                    <path d="M90 85 Q100 95 110 85" stroke="#000" stroke-width="2" fill="none" />
                    <!-- 老虎耳朵 -->
                    <circle cx="75" cy="45" r="10" fill="#FF9800" />
                    <circle cx="125" cy="45" r="10" fill="#FF9800" />
                </svg>
            `;
        }
        
        // 设置SVG内容
        svgContainer.innerHTML = svgContent;
        
        // 创建动物名称
        const nameElement = document.createElement('div');
        nameElement.textContent = animalName;
        nameElement.style.fontSize = '36px';
        nameElement.style.fontWeight = 'bold';
        nameElement.style.color = '#fff';
        nameElement.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.5)';
        nameElement.style.marginTop = '20px';
        
        // 添加到容器
        animalContainer.appendChild(svgContainer);
        animalContainer.appendChild(nameElement);
        
        // 添加到场景
        scene.appendChild(animalContainer);
        
        // 5秒后移除
        setTimeout(() => {
            animalContainer.style.opacity = '0';
            animalContainer.style.transition = 'opacity 1s';
            setTimeout(() => {
                animalContainer.remove();
            }, 1000);
        }, 5000);
    }
    
    // 显示生日蛋糕
    function showBirthdayCake() {
        // 调用birthday-cake.js中定义的全局函数
        if (window.showBirthdayCake) {
            window.showBirthdayCake();
        } else {
            console.log('生日快乐！');
        }
    }
});