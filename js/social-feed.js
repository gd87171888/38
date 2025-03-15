document.addEventListener('DOMContentLoaded', function() {
    // 创建人生感悟推文容器
    const socialFeedContainer = document.createElement('div');
    socialFeedContainer.className = 'social-feed-container';
    socialFeedContainer.innerHTML = '<div class="social-feed-title">人生感悟推文</div>';
    document.body.appendChild(socialFeedContainer);

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
        '人生就像一杯茶，不会苦一辈子，但总会苦一阵子。',
        '不要等待机会，而要创造机会。',
        '态度决定一切，习惯成就未来。',
        '生命太过短暂，今天放弃了明天不一定能得到。',
        '没有人陪你走一辈子，所以你要适应孤独，没有人会帮你一辈子，所以你要奋斗一生。',
        '生活不是单行道，一条路走不通，你可以转弯。'
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

    // 创建人生感悟推文
    function createInsight() {
        const insight = document.createElement('div');
        insight.className = 'social-feed-item';
        insight.textContent = generateRandomInsight();

        const timestamp = document.createElement('div');
        timestamp.className = 'social-feed-timestamp';
        timestamp.textContent = formatTime(new Date());
        insight.appendChild(timestamp);

        socialFeedContainer.insertBefore(insight, socialFeedContainer.firstChild.nextSibling);

        const insights = socialFeedContainer.querySelectorAll('.social-feed-item');
        if (insights.length > 5) {
            const oldestInsight = insights[insights.length - 1];
            oldestInsight.style.animation = 'feedFadeOut 0.5s forwards';
            setTimeout(() => oldestInsight.remove(), 500);
        }
    }

    // 创建第一条感悟
    createInsight();
    
    // 每30秒创建一条新的感悟
    setInterval(createInsight, 30000);
});