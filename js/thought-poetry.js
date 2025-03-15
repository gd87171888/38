document.addEventListener('DOMContentLoaded', function() {
    // 创建人生感悟按钮和容器
    const thoughtFeedToggle = document.createElement('div');
    thoughtFeedToggle.className = 'thought-feed-toggle';
    thoughtFeedToggle.innerHTML = '<span class="icon">💭</span>';
    document.body.appendChild(thoughtFeedToggle);

    // 确保按钮位置正确
    thoughtFeedToggle.style.top = '170px';
    thoughtFeedToggle.style.right = '20px';
    thoughtFeedToggle.style.left = 'auto';
    thoughtFeedToggle.style.transform = 'none';

    const thoughtFeedContainer = document.createElement('div');
    thoughtFeedContainer.className = 'thought-feed-container hidden';
    thoughtFeedContainer.innerHTML = '<div class="social-feed-title">思考推文</div>';
    document.body.appendChild(thoughtFeedContainer);

    // 思考内容数组
    const thoughtContents = [
        '人工智能的发展是否会改变人类的思维方式？',
        '在数字时代，如何保持独立思考的能力？',
        '科技进步与人文关怀如何平衡？',
        '未来教育应该如何适应AI时代的变革？',
        '在信息爆炸的时代，如何提升信息筛选能力？',
        '虚拟现实技术会如何影响人类的社交方式？',
        '区块链技术能否重构社会信任机制？',
        '人机协作将如何重塑未来工作模式？',
        '数字化转型对传统文化的传承有何影响？',
        '如何在科技快速发展中保持人性化？'
    ];

    // 格式化时间函数
    function formatTime(date) {
        return date.toLocaleTimeString('zh-CN', { hour12: false });
    }

    // 生成随机思考
    function generateRandomThought() {
        const randomIndex = Math.floor(Math.random() * thoughtContents.length);
        return thoughtContents[randomIndex];
    }

    // 创建思考推文
    function createThought() {
        const thought = document.createElement('div');
        thought.className = 'tweet';
        thought.textContent = generateRandomThought();

        const timestamp = document.createElement('div');
        timestamp.className = 'tweet-timestamp';
        timestamp.textContent = formatTime(new Date());
        thought.appendChild(timestamp);

        thoughtFeedContainer.insertBefore(thought, thoughtFeedContainer.firstChild.nextSibling);

        const thoughts = thoughtFeedContainer.querySelectorAll('.tweet');
        if (thoughts.length > 10) {
            const oldestThought = thoughts[thoughts.length - 1];
            oldestThought.style.animation = 'tweetFadeOut 0.5s forwards';
            setTimeout(() => oldestThought.remove(), 500);
        }
    }

    // 按钮点击事件
    thoughtFeedToggle.addEventListener('click', (e) => {
        // 防止事件冒泡到document
        e.stopPropagation();
        thoughtFeedContainer.classList.toggle('hidden');
        // 修复：确保每次点击按钮时都创建一条新的思考推文
        if (!thoughtFeedContainer.classList.contains('hidden')) {
            createThought();
        }
    });
    
    // 防止点击容器内部关闭容器
    thoughtFeedContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 创建第一条思考推文
    createThought();
    
    // 每40秒创建一条新的思考推文
    setInterval(createThought, 40000);

    // 移除拖拽功能代码
});