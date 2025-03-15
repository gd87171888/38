// 中考高考加油特效
document.addEventListener('DOMContentLoaded', function() {
    // 将函数暴露到全局作用域，以便从art-text.js中调用
    window.showExamCheer = showExamCheer;
    
    // 主函数：显示考试加油特效
    function showExamCheer(examType) {
        const scene = document.getElementById('scene');
        
        // 创建特效容器
        const cheerContainer = document.createElement('div');
        cheerContainer.className = 'exam-cheer-container';
        cheerContainer.style.position = 'fixed';
        cheerContainer.style.top = '50%';
        cheerContainer.style.left = '50%';
        cheerContainer.style.transform = 'translate(-50%, -50%)';
        cheerContainer.style.zIndex = '1000';
        cheerContainer.style.textAlign = 'center';
        cheerContainer.style.width = '100%';
        cheerContainer.style.height = '100%';
        cheerContainer.style.display = 'flex';
        cheerContainer.style.flexDirection = 'column';
        cheerContainer.style.justifyContent = 'center';
        cheerContainer.style.alignItems = 'center';
        cheerContainer.style.perspective = '1000px';
        
        // 创建标题
        const title = document.createElement('div');
        title.className = 'exam-cheer-title';
        title.textContent = examType === 'zhongkao' ? '中考加油！' : '高考加油！';
        
        // 创建励志语
        const messages = [
            examType === 'zhongkao' ? 
                ['相信自己', '中考必胜', '梦想起航', '前程似锦', '沉着应考'] :
                ['金榜题名', '高考必胜', '未来可期', '一举高中', '前程似锦']
        ];
        
        // 创建动态元素容器
        const elementsContainer = document.createElement('div');
        elementsContainer.className = 'exam-elements-container';
        
        // 添加书本、笔和奖杯等元素
        const elements = createElements();
        elementsContainer.appendChild(elements);
        
        // 创建励志短语容器
        const messageContainer = document.createElement('div');
        messageContainer.className = 'exam-message-container';
        
        // 添加所有元素到容器
        cheerContainer.appendChild(title);
        cheerContainer.appendChild(elementsContainer);
        cheerContainer.appendChild(messageContainer);
        
        // 添加到场景
        scene.appendChild(cheerContainer);
        
        // 创建并显示粒子效果
        createParticles(cheerContainer);
        
        // 显示励志短语
        showMessages(messages[0], messageContainer);
        
        // 8秒后移除特效
        setTimeout(() => {
            cheerContainer.style.opacity = '0';
            cheerContainer.style.transition = 'opacity 1s';
            setTimeout(() => {
                cheerContainer.remove();
            }, 1000);
        }, 8000);
    }
    
    // 创建动态元素（书本、笔和奖杯）
    function createElements() {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.gap = '40px';
        container.style.margin = '20px 0';
        
        // 创建书本
        const book = document.createElement('div');
        book.className = 'exam-element book';
        book.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="60" height="60" rx="2" fill="#4285f4" />
                <rect x="15" y="15" width="50" height="50" rx="1" fill="#ffffff" />
                <line x1="20" y1="25" x2="60" y2="25" stroke="#333" stroke-width="2" />
                <line x1="20" y1="35" x2="60" y2="35" stroke="#333" stroke-width="2" />
                <line x1="20" y1="45" x2="60" y2="45" stroke="#333" stroke-width="2" />
                <line x1="20" y1="55" x2="40" y2="55" stroke="#333" stroke-width="2" />
            </svg>
        `;
        
        // 创建笔
        const pen = document.createElement('div');
        pen.className = 'exam-element pen';
        pen.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="60" x2="60" y2="20" stroke="#ea4335" stroke-width="4" />
                <polygon points="62,18 60,26 54,20" fill="#fbbc05" />
                <rect x="18" y="58" width="6" height="6" fill="#34a853" />
            </svg>
        `;
        
        // 创建奖杯
        const trophy = document.createElement('div');
        trophy.className = 'exam-element trophy';
        trophy.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <path d="M30,20 L50,20 L50,50 C50,55 40,60 40,60 C40,60 30,55 30,50 Z" fill="#fbbc05" />
                <rect x="35" y="60" width="10" height="10" fill="#fbbc05" />
                <rect x="30" y="70" width="20" height="5" fill="#fbbc05" />
                <path d="M50,25 C55,25 60,25 60,30 C60,35 55,40 50,40" fill="none" stroke="#fbbc05" stroke-width="2" />
                <path d="M30,25 C25,25 20,25 20,30 C20,35 25,40 30,40" fill="none" stroke="#fbbc05" stroke-width="2" />
            </svg>
        `;
        
        // 添加到容器
        container.appendChild(book);
        container.appendChild(pen);
        container.appendChild(trophy);
        
        return container;
    }
    
    // 创建粒子效果
    function createParticles(container) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'exam-particle';
            
            // 随机位置
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // 随机颜色
            const colors = ['#4285f4', '#ea4335', '#fbbc05', '#34a853'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.position = 'absolute';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.opacity = '0';
            
            container.appendChild(particle);
            
            // 设置动画
            setTimeout(() => {
                particle.style.transition = 'all 2s ease-out';
                particle.style.opacity = Math.random() * 0.5 + 0.5;
                
                // 随机移动
                const newX = x + (Math.random() - 0.5) * 20;
                const newY = y + (Math.random() - 0.5) * 20;
                particle.style.left = `${newX}%`;
                particle.style.top = `${newY}%`;
            }, i * 50);
        }
    }
    
    // 显示励志短语
    function showMessages(messages, container) {
        let index = 0;
        
        function showNextMessage() {
            if (index < messages.length) {
                // 创建消息元素
                const message = document.createElement('div');
                message.className = 'exam-message';
                message.textContent = messages[index];
                message.style.opacity = '0';
                message.style.transform = 'scale(0.5)';
                message.style.transition = 'all 0.5s ease';
                
                // 添加到容器
                container.innerHTML = '';
                container.appendChild(message);
                
                // 显示动画
                setTimeout(() => {
                    message.style.opacity = '1';
                    message.style.transform = 'scale(1)';
                }, 100);
                
                // 准备显示下一条
                index++;
                setTimeout(showNextMessage, 1500);
            }
        }
        
        // 开始显示第一条
        showNextMessage();
    }
});