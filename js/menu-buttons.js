document.addEventListener('DOMContentLoaded', function() {
    // 添加三体宇宙按钮
    const threeBodyButton = document.createElement('button');
    threeBodyButton.className = 'three-body-toggle menu-toggle';
    threeBodyButton.innerHTML = '<span class="icon">🌌</span> 三体宇宙';
    document.body.appendChild(threeBodyButton);
    
    // 添加点击事件
    threeBodyButton.addEventListener('click', function() {
        window.location.href = 'st/index.html';
    });
    
    // 优化移动端按钮位置
    function adjustButtonsForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        // 获取所有按钮
        // 已移除人生感悟按钮的引用
        const threeBodyToggle = document.querySelector('.three-body-toggle');
        
        if (isMobile) {
            // 移动端布局 - 将按钮移到左侧，避免遮挡
            if (threeBodyToggle) {
                threeBodyToggle.style.left = '10px';
                threeBodyToggle.style.right = 'auto';
                threeBodyToggle.style.top = '150px';
                threeBodyToggle.style.transform = 'none';
            }
        } else {
            // 桌面端布局 - 恢复原始位置
            if (threeBodyToggle) {
                threeBodyToggle.style.right = '20px';
                threeBodyToggle.style.left = 'auto';
                threeBodyToggle.style.top = '20px';
                threeBodyToggle.style.transform = 'none';
            }
        }
    }
    
    // 初始调整
    adjustButtonsForMobile();
    
    // 窗口大小改变时重新调整
    window.addEventListener('resize', adjustButtonsForMobile);
});