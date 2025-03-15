document.addEventListener('DOMContentLoaded', function() {
    // 创建导航栏容器
    const navBarContainer = document.createElement('div');
    navBarContainer.className = 'nav-bar-container';
    
    // 创建导航栏切换按钮
    const navBarToggle = document.createElement('div');
    navBarToggle.className = 'nav-bar-toggle';
    navBarToggle.innerHTML = '<span class="icon">🔗</span> 菜';
    
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