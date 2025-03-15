document.addEventListener('DOMContentLoaded', function() {
    // 获取人生按钮元素
    const lifeInsightBtn = document.getElementById('lifeInsightBtn');
    
    // 创建人生感悟容器
    const lifeInsightContainer = document.createElement('div');
    lifeInsightContainer.className = 'life-insight-container hidden';
    lifeInsightContainer.innerHTML = '<div class="life-insight-title">人生感悟</div>';
    document.body.appendChild(lifeInsightContainer);
    
    // 人生按钮点击事件
    lifeInsightBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // 切换人生感悟容器显示状态
        lifeInsightContainer.classList.toggle('hidden');
        
        // 更新按钮状态
        if (!lifeInsightContainer.classList.contains('hidden')) {
            lifeInsightBtn.classList.add('active');
            
            // 调用social-feed.js中的createInsight函数创建一条新的感悟
            // 由于createInsight函数在social-feed.js中定义，我们需要在全局范围内查找它
            if (typeof createInsight === 'function') {
                createInsight();
            } else {
                // 如果找不到createInsight函数，则直接创建感悟内容
                createLifeInsight();
            }
        } else {
            lifeInsightBtn.classList.remove('active');
        }
    });
    
    // 防止点击容器内部关闭容器
    lifeInsightContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 点击页面其他地方关闭容器
    document.addEventListener('click', function() {
        lifeInsightContainer.classList.add('hidden');
        lifeInsightBtn.classList.remove('active');
    });
    
    // 人生感悟内容数组
    const insightContents = [
        '生活不是等待风暴过去，而是学会在雨中翩翩起舞。',
        '人生最大的挑战不是超越别人，而是超越自己。',
        '成功不是终点，失败也不是终结，勇气才是继续前行的动力。',
        '生命中最重要的不是所处的位置，而是所朝的方向。',
        '不要因为走得太远，而忘记为什么出发。',
        '人生就像骑自行车，要保持平衡就得不断前进。',
        '真正的智慧是知道自己所不知道的东西。',
        '幸福不是拥有的多，而是计较的少。',
        '时间会告诉我们，简单的喜欢最长远。',
        '人生最曼妙的风景，竟是内心的淡定与从容。',
        '生活若剥去了理想、梦想、幻想，那生命便只是一堆空架子。',
        '人生最重要的不是所站的位置，而是所朝的方向。',
        '与其用泪水悔恨昨天，不如用汗水拼搏今天。',
        '生活中最重要的是你必须拥有什么，而不是你已经拥有什么。',
        '人生就像一杯茶，不会苦一辈子，但总会苦一阵子。'
    ];
    
    // 格式化时间函数
    function formatTime(date) {
        return date.toLocaleTimeString('zh-CN', { hour12: false });
    }
    
    // 生成随机感悟
    function generateRandomInsight() {
        const randomIndex = Math.floor(Math.random() * insightContents.length);
        return insightContents[randomIndex];
    }
    
    // 创建人生感悟
    function createLifeInsight() {
        const insight = document.createElement('div');
        insight.className = 'insight';
        insight.textContent = generateRandomInsight();
        
        const timestamp = document.createElement('div');
        timestamp.className = 'insight-timestamp';
        timestamp.textContent = formatTime(new Date());
        insight.appendChild(timestamp);
        
        lifeInsightContainer.insertBefore(insight, lifeInsightContainer.firstChild.nextSibling);
        
        const insights = lifeInsightContainer.querySelectorAll('.insight');
        if (insights.length > 5) {
            const oldestInsight = insights[insights.length - 1];
            oldestInsight.style.animation = 'insightFadeOut 0.5s forwards';
            setTimeout(() => oldestInsight.remove(), 500);
        }
    }
    
    // 创建初始内容
    createLifeInsight();
    
    // 定时创建新内容
    setInterval(createLifeInsight, 30000); // 每30秒创建一条新的感悟
});