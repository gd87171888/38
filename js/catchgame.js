// 水母捕捉游戏 - 点击水母收集祝福语并获得积分
document.addEventListener('DOMContentLoaded', function() {
    // 游戏状态
    let gameActive = false;
    let score = 0;
    let timeLeft = 30;
    let timer;
    let collectedBlessings = [];
    
    // 创建游戏UI
    function createGameUI() {
        // 游戏按钮
        const gameBtn = document.createElement('button');
        gameBtn.id = 'gameBtn';
        gameBtn.textContent = '开始游戏';
        
        // 将按钮添加到标题下方
        const title = document.querySelector('.title');
        if (title) {
            title.insertAdjacentElement('afterend', gameBtn);
        } else {
            document.body.appendChild(gameBtn);
        }
        
        // 游戏面板
        const gamePanel = document.createElement('div');
        gamePanel.id = 'gamePanel';
        gamePanel.innerHTML = `
            <div class="game-header">
                <div class="score-container">得分: <span id="scoreDisplay">0</span></div>
                <div class="time-container">时间: <span id="timeDisplay">30</span>秒</div>
                <button id="closeGameBtn">×</button>
            </div>
            <div class="game-content">
                <div id="gameArea"></div>
                <div id="blessingsCollected" class="blessings-container"></div>
            </div>
        `;
        gamePanel.style.display = 'none';
        document.body.appendChild(gamePanel);
        
        // 游戏结果面板
        const resultPanel = document.createElement('div');
        resultPanel.id = 'resultPanel';
        resultPanel.innerHTML = `
            <div class="result-content">
                <h2>游戏结束</h2>
                <p>您的得分: <span id="finalScore">0</span></p>
                <div id="collectedBlessingsDisplay" class="collected-blessings"></div>
                <button id="playAgainBtn">再玩一次</button>
                <button id="closeResultBtn">关闭</button>
            </div>
        `;
        resultPanel.style.display = 'none';
        document.body.appendChild(resultPanel);
        
        // 添加事件监听器
        gameBtn.addEventListener('click', startGame);
        document.getElementById('closeGameBtn').addEventListener('click', endGame);
        document.getElementById('playAgainBtn').addEventListener('click', startGame);
        document.getElementById('closeResultBtn').addEventListener('click', () => {
            document.getElementById('resultPanel').style.display = 'none';
        });
    }
    
    // 开始游戏
    function startGame() {
        // 重置游戏状态
        gameActive = true;
        score = 0;
        timeLeft = 30;
        collectedBlessings = [];
        
        // 更新UI
        document.getElementById('scoreDisplay').textContent = score;
        document.getElementById('timeDisplay').textContent = timeLeft;
        document.getElementById('gamePanel').style.display = 'block';
        document.getElementById('resultPanel').style.display = 'none';
        document.getElementById('blessingsCollected').innerHTML = '';
        
        // 创建可点击的水母
        createClickableJellyfish();
        
        // 启动计时器
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timeDisplay').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    // 结束游戏
    function endGame() {
        gameActive = false;
        clearInterval(timer);
        
        // 移除所有可点击水母
        const gameArea = document.getElementById('gameArea');
        gameArea.innerHTML = '';
        
        // 隐藏游戏面板
        document.getElementById('gamePanel').style.display = 'none';
        
        // 显示结果
        document.getElementById('finalScore').textContent = score;
        
        // 显示收集到的祝福语
        const blessingsDisplay = document.getElementById('collectedBlessingsDisplay');
        blessingsDisplay.innerHTML = '';
        
        if (collectedBlessings.length > 0) {
            const uniqueBlessings = [...new Set(collectedBlessings)];
            blessingsDisplay.innerHTML = '<h3>收集到的祝福:</h3>';
            uniqueBlessings.forEach(blessing => {
                const blessingEl = document.createElement('div');
                blessingEl.className = 'blessing-item';
                blessingEl.textContent = blessing;
                blessingsDisplay.appendChild(blessingEl);
            });
        } else {
            blessingsDisplay.innerHTML = '<p>没有收集到祝福语</p>';
        }
        
        document.getElementById('resultPanel').style.display = 'block';
    }
    
    // 创建可点击的水母
    function createClickableJellyfish() {
        if (!gameActive) return;
        
        const gameArea = document.getElementById('gameArea');
        
        // 祝福语列表
        const blessings = [
            '快乐', '美丽', '健康', '幸福', '平安', '好运', 
            '成功', '吉祥', '财富', '智慧', '爱情', '和谐',
            '梦想成真', '万事如意', '心想事成', '前程似锦', 
            '鸿运当头', '福寿安康', '喜气洋洋', '事业有成'
        ];
        
        // 随机选择一个祝福语
        const blessing = blessings[Math.floor(Math.random() * blessings.length)];
        
        // 创建水母元素
        const jellyfish = document.createElement('div');
        jellyfish.className = 'game-jellyfish';
        
        // 彩虹色水母颜色
        const colors = [
            '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7',
            '#C7CEEA', '#B5B9FF', '#97A2FF', '#6EB5FF', '#57C4E5',
            '#F6DFEB', '#E4C1F9', '#D4A5A5', '#F0E5D8', '#FCF6BD',
            '#00FFFF', '#00CED1', '#48D1CC', '#20B2AA', '#5F9EA0'
        ];
        
        // 随机选择主色调
        const mainColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 生成彩虹渐变效果
        const gradientColors = [];
        for (let i = 0; i < 3; i++) {
            gradientColors.push(colors[Math.floor(Math.random() * colors.length)]);
        }
        
        // 创建简化版水母SVG
        const jellyfishSVG = `
        <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="jellyfishGame${Date.now()}" cx="50%" cy="30%" r="70%" fx="50%" fy="30%">
                    <stop offset="0%" stop-color="${gradientColors[0]}" stop-opacity="0.9"/>
                    <stop offset="40%" stop-color="${mainColor}" stop-opacity="0.8"/>
                    <stop offset="70%" stop-color="${gradientColors[1]}" stop-opacity="0.7"/>
                    <stop offset="100%" stop-color="${gradientColors[2]}" stop-opacity="0.5"/>
                </radialGradient>
            </defs>
            
            <!-- 水母主体 -->
            <path fill="url(#jellyfishGame${Date.now()})" d="M50,5 C75,5 90,20 90,45 C90,60 80,75 70,85 C60,95 40,95 30,85 C20,75 10,60 10,45 C10,20 25,5 50,5 Z"></path>
            
            <!-- 祝福文字 -->
            <text x="50" y="50" font-size="14" text-anchor="middle" fill="white" font-weight="bold" opacity="0.9">${blessing}</text>
            
            <!-- 简化的触须 -->
            <path fill="${gradientColors[0]}" fill-opacity="0.8" d="M30,85 Q35,100 25,115 Q15,130 25,145"></path>
            <path fill="${gradientColors[1]}" fill-opacity="0.8" d="M50,85 Q55,105 50,125 Q45,140 50,155"></path>
            <path fill="${gradientColors[2]}" fill-opacity="0.8" d="M70,85 Q75,105 70,125 Q65,140 70,155"></path>
        </svg>`;
        
        // 设置水母SVG
        jellyfish.innerHTML = jellyfishSVG;
        
        // 设置水母属性
        jellyfish.dataset.blessing = blessing;
        jellyfish.dataset.points = Math.floor(Math.random() * 5) + 1; // 1-5分
        
        // 随机大小
        const size = Math.random() * 30 + 50; // 50-80px
        jellyfish.style.width = `${size}px`;
        jellyfish.style.height = `${size * 1.5}px`;
        
        // 随机位置
        jellyfish.style.left = Math.random() * 80 + 10 + '%';
        jellyfish.style.top = Math.random() * 70 + 10 + '%';
        
        // 添加点击事件
        jellyfish.addEventListener('click', function() {
            if (!gameActive) return;
            
            // 增加分数
            const points = parseInt(this.dataset.points);
            score += points;
            document.getElementById('scoreDisplay').textContent = score;
            
            // 收集祝福语
            const blessing = this.dataset.blessing;
            collectedBlessings.push(blessing);
            
            // 显示收集到的祝福语
            const blessingEl = document.createElement('div');
            blessingEl.className = 'blessing-bubble';
            blessingEl.textContent = blessing;
            blessingEl.style.backgroundColor = mainColor + '80'; // 半透明
            document.getElementById('blessingsCollected').appendChild(blessingEl);
            
            // 显示得分动画
            const pointsAnim = document.createElement('div');
            pointsAnim.className = 'points-animation';
            pointsAnim.textContent = `+${points}`;
            pointsAnim.style.left = this.style.left;
            pointsAnim.style.top = this.style.top;
            gameArea.appendChild(pointsAnim);
            
            // 移除得分动画
            setTimeout(() => {
                if (pointsAnim.parentNode) {
                    pointsAnim.parentNode.removeChild(pointsAnim);
                }
            }, 1000);
            
            // 移除被点击的水母
            this.classList.add('clicked');
            setTimeout(() => {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
                // 创建新水母
                if (gameActive) {
                    createClickableJellyfish();
                }
            }, 300); // 从500ms减少到300ms，加快消失速度
        });
        
        // 添加到游戏区域
        gameArea.appendChild(jellyfish);
        
        // 随机时间后消失并创建新水母
        const disappearTime = Math.random() * 5000 + 3000; // 3-8秒
        setTimeout(() => {
            if (jellyfish.parentNode && !jellyfish.classList.contains('clicked')) {
                jellyfish.classList.add('disappearing');
                setTimeout(() => {
                    if (jellyfish.parentNode) {
                        jellyfish.parentNode.removeChild(jellyfish);
                    }
                    // 创建新水母
                    if (gameActive) {
                        createClickableJellyfish();
                    }
                }, 300); // 从500ms减少到300ms，加快消失速度
            }
        }, disappearTime);
    }
    
    // 添加游戏样式
    const style = document.createElement('style');
    style.textContent = `
        #gameBtn {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 10;
            background-color: rgba(0, 191, 255, 0.7);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
        }
        
        #gameBtn:hover {
            background-color: rgba(0, 191, 255, 0.9);
            transform: scale(1.05);
        }
        
        #gamePanel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 800px;
            height: 80%;
            max-height: 600px;
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 15px;
            z-index: 100;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 0 30px rgba(0, 191, 255, 0.7);
        }
        
        .game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: rgba(0, 191, 255, 0.3);
            color: white;
            font-size: 18px;
        }
        
        .game-content {
            flex: 1;
            display: flex;
            position: relative;
            overflow: hidden;
        }
        
        #gameArea {
            flex: 1;
            position: relative;
            overflow: hidden;
        }
        
        .blessings-container {
            width: 200px;
            padding: 15px;
            background-color: rgba(0, 191, 255, 0.1);
            overflow-y: auto;
        }
        
        .blessing-bubble {
            margin: 5px;
            padding: 8px;
            border-radius: 15px;
            color: white;
            text-align: center;
            animation: fadeIn 0.5s ease-out;
        }
        
        .game-jellyfish {
            position: absolute;
            cursor: pointer;
            transition: transform 0.3s ease;
            animation: jellyFloat 3s infinite ease-in-out;
        }
        
        .game-jellyfish:hover {
            transform: scale(1.1);
        }
        
        .game-jellyfish.clicked {
            animation: jellyCatch 0.5s ease-out forwards;
        }
        
        .game-jellyfish.disappearing {
            animation: jellyDisappear 0.5s ease-out forwards;
        }
        
        .points-animation {
            position: absolute;
            color: white;
            font-size: 24px;
            font-weight: bold;
            pointer-events: none;
            animation: pointsFloat 1s ease-out forwards;
        }
        
        #resultPanel {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 200;
        }
        
        .result-content {
            background-color: rgba(0, 191, 255, 0.2);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            color: white;
            box-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
        }
        
        .result-content h2 {
            margin-bottom: 20px;
            color: rgba(0, 191, 255, 0.9);
        }
        
        .collected-blessings {
            margin: 20px 0;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .blessing-item {
            display: inline-block;
            margin: 5px;
            padding: 8px 15px;
            background-color: rgba(0, 191, 255, 0.3);
            border-radius: 15px;
            animation: fadeIn 0.5s ease-out;
        }
        
        #closeGameBtn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 5px 10px;
            transition: all 0.3s ease;
        }
        
        #closeGameBtn:hover {
            color: rgba(0, 191, 255, 0.9);
            transform: scale(1.1);
        }
        
        #playAgainBtn, #closeResultBtn {
            margin: 10px;
            padding: 10px 20px;
            background-color: rgba(0, 191, 255, 0.7);
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        #playAgainBtn:hover, #closeResultBtn:hover {
            background-color: rgba(0, 191, 255, 0.9);
            transform: scale(1.05);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes jellyFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes jellyCatch {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes jellyDisappear {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        @keyframes pointsFloat {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-50px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    // 创建游戏UI
    createGameUI();
        
        .game-content {
            flex: 1;
            display: flex;
            position: relative;
            overflow: hidden;
        }
        
        #gameArea {
            flex: 1;
            position: relative;
            overflow: hidden;
        }
        
        .blessings-container {
            width: 200px;
            padding: 15px;
            background-color: rgba(0, 191, 255, 0.1);
            overflow-y: auto;
        }
        
        .blessing-bubble {
            margin: 5px;
            padding: 8px;
            border-radius: 15px;
            color: white;
            text-align: center;
            animation: fadeIn 0.5s ease-out;
        }
        
        .game-jellyfish {
            position: absolute;
            cursor: pointer;
            transition: transform 0.3s ease;
            animation: jellyFloat 3s infinite ease-in-out;
        }
        
        .game-jellyfish:hover {
            transform: scale(1.1);
        }
        
        .game-jellyfish.clicked {
            animation: jellyCatch 0.5s ease-out forwards;
        }
        
        .game-jellyfish.disappearing {
            animation: jellyDisappear 0.5s ease-out forwards;
        }
        
        .points-animation {
            position: absolute;
            color: white;
            font-size: 24px;
            font-weight: bold;
            pointer-events: none;
            animation: pointsFloat 1s ease-out forwards;
        }
        
        #resultPanel {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 200;
        }
        
        .result-content {
            background-color: rgba(0, 191, 255, 0.2);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            color: white;
            box-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
        }
        
        .result-content h2 {
            margin-bottom: 20px;
            color: rgba(0, 191, 255, 0.9);
        }
        
        .collected-blessings {
            margin: 20px 0;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .blessing-item {
            display: inline-block;
            margin: 5px;
            padding: 8px 15px;
            background-color: rgba(0, 191, 255, 0.3);
            border-radius: 15px;
            animation: fadeIn 0.5s ease-out;
        }
        
        #closeGameBtn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 5px 10px;
            transition: all 0.3s ease;
        }
        
        #closeGameBtn:hover {
            color: rgba(0, 191, 255, 0.9);
            transform: scale(1.1);
        }
        
        #playAgainBtn, #closeResultBtn {
            margin: 10px;
            padding: 10px 20px;
            background-color: rgba(0, 191, 255, 0.7);
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        #playAgainBtn:hover, #closeResultBtn:hover {
            background-color: rgba(0, 191, 255, 0.9);
            transform: scale(1.05);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes jellyFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes jellyCatch {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes jellyDisappear {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        @keyframes pointsFloat {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-50px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    // 创建游戏UI
    createGameUI();