document.addEventListener('DOMContentLoaded', function() {
    // 创建导航栏容器
    const navBarContainer = document.createElement('div');
    navBarContainer.className = 'nav-bar-container';
    
    // 创建导航栏切换按钮
    const navBarToggle = document.createElement('div');
    navBarToggle.className = 'nav-bar-toggle';
    
    // 创建科技感太极SVG图标
    const taijiSvg = `
        <svg class="taiji-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- 外部电流环 -->
            <circle class="electric-circle" cx="50" cy="50" r="48" fill="none" stroke="#00ffff" stroke-width="2" />
            
            <!-- 电流效果 -->
            <circle class="electric-particle particle1" cx="50" cy="2" r="2" fill="#00ffff" />
            <circle class="electric-particle particle2" cx="85" cy="25" r="2" fill="#00ffff" />
            <circle class="electric-particle particle3" cx="85" cy="75" r="2" fill="#00ffff" />
            <circle class="electric-particle particle4" cx="50" cy="98" r="2" fill="#00ffff" />
            <circle class="electric-particle particle5" cx="15" cy="75" r="2" fill="#00ffff" />
            <circle class="electric-particle particle6" cx="15" cy="25" r="2" fill="#00ffff" />
            
            <!-- 闪电效果 -->
            <path class="lightning lightning1" d="M50,2 L55,10 L45,15 L55,25" stroke="#00ffff" stroke-width="1.5" fill="none" />
            <path class="lightning lightning2" d="M85,25 L75,30 L80,40 L70,45" stroke="#00ffff" stroke-width="1.5" fill="none" />
            <path class="lightning lightning3" d="M85,75 L75,70 L80,60 L70,55" stroke="#00ffff" stroke-width="1.5" fill="none" />
            <path class="lightning lightning4" d="M50,98 L45,90 L55,85 L45,75" stroke="#00ffff" stroke-width="1.5" fill="none" />
            <path class="lightning lightning5" d="M15,75 L25,70 L20,60 L30,55" stroke="#00ffff" stroke-width="1.5" fill="none" />
            <path class="lightning lightning6" d="M15,25 L25,30 L20,40 L30,45" stroke="#00ffff" stroke-width="1.5" fill="none" />
            
            <!-- 太极基础 -->
            <circle cx="50" cy="50" r="40" fill="black" stroke="#00ffff" stroke-width="1" />
            <path d="M50,10 A40,40 0 0 1 50,90 A40,40 0 0 0 50,10" fill="white" />
            
            <!-- 太极眼 -->
            <circle cx="50" cy="30" r="8" fill="white" stroke="#00ffff" stroke-width="0.5" />
            <circle cx="50" cy="30" r="4" fill="black" />
            <circle cx="50" cy="70" r="8" fill="black" stroke="#00ffff" stroke-width="0.5" />
            <circle cx="50" cy="70" r="4" fill="white" />
        </svg>
    `;
    
    navBarToggle.innerHTML = taijiSvg;
    
    // 创建导航菜单项容器
    const navBarItems = document.createElement('div');
    navBarItems.className = 'nav-bar-items';
    
    // 添加导航菜单项（按字数从少到多排序）
    const navItems = [
        { icon: '🔢', text: '数字空间', url: 'st/数字空间/数字空间.html' },
        { icon: '🌌', text: '三体宇宙', url: 'st/三体宇宙.html' },
        { icon: '👑', text: '数学王国', url: 'st/数学王国/数学王国.html' },
        { icon: '⚛️', text: '物理互动', url: 'st/物理互动/物理互动.html' },
        { icon: '💡', text: '第一性原理', url: 'st/第一性原理.html' },
        { icon: '📱', text: '短刷脑危害', url: 'st/短刷脑危害.html' },
        { icon: '🧠', text: '思考，快与慢', url: 'st/思考，快与慢.html' }
    ];
    
    // 创建菜单项
    navItems.forEach(item => {
        const navItem = document.createElement('a');
        navItem.className = 'nav-bar-item';
        navItem.href = item.url;
        navItem.innerHTML = `<span class="icon">${item.icon}</span> ${item.text}`;
        navBarItems.appendChild(navItem);
    });
    
    // 组装导航栏
    navBarContainer.appendChild(navBarToggle);
    navBarContainer.appendChild(navBarItems);
    document.body.appendChild(navBarContainer);
    
    // 添加导航栏切换功能
    navBarToggle.addEventListener('click', function() {
        navBarItems.classList.toggle('active');
    });
    
    // 点击页面其他区域关闭导航菜单
    document.addEventListener('click', function(event) {
        if (!navBarContainer.contains(event.target)) {
            navBarItems.classList.remove('active');
        }
    });
    
    // 优化移动端导航栏位置
    function adjustNavBarForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // 移动端布局
            navBarContainer.style.top = '10px';
        } else {
            // 桌面端布局
            navBarContainer.style.top = '10px';
        }
    }
    
    // 初始调整
    adjustNavBarForMobile();
    
    // 窗口大小改变时重新调整
    window.addEventListener('resize', adjustNavBarForMobile);
});