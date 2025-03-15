document.addEventListener('DOMContentLoaded', function() {
    // 创建新闻/人生按钮
    const newsLifeToggle = document.createElement('div');
    newsLifeToggle.className = 'news-life-toggle';
    newsLifeToggle.innerHTML = '<div class="news-side">新闻</div><div class="life-side">人生</div>';
    document.body.appendChild(newsLifeToggle);

    // 创建新闻容器
    const newsContainer = document.createElement('div');
    newsContainer.className = 'news-container hidden';
    newsContainer.innerHTML = '<div class="news-title">AI新闻</div>';
    document.body.appendChild(newsContainer);

    // 创建人生感悟容器
    const thoughtContainer = document.createElement('div');
    thoughtContainer.className = 'thought-feed-container hidden';
    thoughtContainer.innerHTML = '<div class="social-feed-title">人生感悟</div>';
    document.body.appendChild(thoughtContainer);

    // 新闻内容数组
    const newsContents = [
        'AI模型在医疗诊断领域取得突破性进展',
        '量子计算研究团队成功实现128量子比特处理器',
        '新型神经网络架构在图像识别任务中超越人类表现',
        '自动驾驶技术在极端天气条件下测试成功',
        '人工智能辅助药物研发缩短新药上市周期',
        '脑机接口技术取得重大突破，可直接解码思维',
        '新一代大型语言模型展示出前所未有的推理能力',
        '量子通信网络在城市间成功部署',
        '人工智能系统首次通过完整的图灵测试',
        '可穿戴设备结合AI算法实现全天候健康监测'
    ];

    // 人生感悟内容数组
    const thoughtContents = [
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
        '与其用泪水悔恨昨天，不如用汗水拼搏今天。',
        '态度决定一切，习惯成就未来。',
        '没有人陪你走一辈子，所以你要适应孤独，没有人会帮你一辈子，所以你要奋斗一生。',
        '生活不是单行道，一条路走不通，你可以转弯。'
    ];

    // 格式化时间函数
    function formatTime(date) {
        return date.toLocaleTimeString('zh-CN', { hour12: false });
    }

    // 生成随机新闻
    function generateRandomNews() {
        const randomIndex = Math.floor(Math.random() * newsContents.length);
        return newsContents[randomIndex];
    }

    // 生成随机人生感悟
    function generateRandomThought() {
        const randomIndex = Math.floor(Math.random() * thoughtContents.length);
        return thoughtContents[randomIndex];
    }

    // 创建新闻
    function createNews() {
        const news = document.createElement('div');
        news.className = 'news-item';
        news.textContent = generateRandomNews();

        const timestamp = document.createElement('div');
        timestamp.className = 'news-timestamp';
        timestamp.textContent = formatTime(new Date());
        news.appendChild(timestamp);

        newsContainer.insertBefore(news, newsContainer.firstChild.nextSibling);

        const newsItems = newsContainer.querySelectorAll('.news-item');
        if (newsItems.length > 10) {
            const oldestNews = newsItems[newsItems.length - 1];
            oldestNews.style.animation = 'newsFadeOut 0.5s forwards';
            setTimeout(() => oldestNews.remove(), 500);
        }
    }

    // 创建人生感悟推文
    function createThought() {
        const thought = document.createElement('div');
        thought.className = 'tweet';
        thought.textContent = generateRandomThought();

        const timestamp = document.createElement('div');
        timestamp.className = 'tweet-timestamp';
        timestamp.textContent = formatTime(new Date());
        thought.appendChild(timestamp);

        thoughtContainer.insertBefore(thought, thoughtContainer.firstChild.nextSibling);

        const thoughts = thoughtContainer.querySelectorAll('.tweet');
        if (thoughts.length > 10) {
            const oldestThought = thoughts[thoughts.length - 1];
            oldestThought.style.animation = 'tweetFadeOut 0.5s forwards';
            setTimeout(() => oldestThought.remove(), 500);
        }
    }

    // 新闻按钮点击事件
    newsLifeToggle.querySelector('.news-side').addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 切换新闻容器显示状态
        newsContainer.classList.toggle('hidden');
        
        // 隐藏思考容器
        thoughtContainer.classList.add('hidden');
        
        // 更新按钮状态
        if (!newsContainer.classList.contains('hidden')) {
            newsLifeToggle.classList.add('active-news');
            newsLifeToggle.classList.remove('active-life');
            createNews(); // 创建一条新的新闻
        } else {
            newsLifeToggle.classList.remove('active-news');
        }
    });

    // 人生按钮点击事件
    newsLifeToggle.querySelector('.life-side').addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 切换思考容器显示状态
        thoughtContainer.classList.toggle('hidden');
        
        // 隐藏新闻容器
        newsContainer.classList.add('hidden');
        
        // 更新按钮状态
        if (!thoughtContainer.classList.contains('hidden')) {
            newsLifeToggle.classList.add('active-life');
            newsLifeToggle.classList.remove('active-news');
            createThought(); // 创建一条新的人生感悟
        } else {
            newsLifeToggle.classList.remove('active-life');
        }
    });
    
    // 防止点击容器内部关闭容器
    newsContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    thoughtContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 点击页面其他地方关闭容器
    document.addEventListener('click', function() {
        newsContainer.classList.add('hidden');
        thoughtContainer.classList.add('hidden');
        newsLifeToggle.classList.remove('active-news');
        newsLifeToggle.classList.remove('active-life');
    });

    // 创建初始内容
    createNews();
    createThought();
    
    // 定时创建新内容
    setInterval(createNews, 45000); // 每45秒创建一条新闻
    setInterval(createThought, 40000); // 每40秒创建一条思考
});