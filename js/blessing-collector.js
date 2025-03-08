// 祝福语收集器 - 点击水母收集祝福语并显示进度条
document.addEventListener('DOMContentLoaded', function() {
    // 祝福语收集状态
    let collectedBlessings = [];
    const maxBlessings = 6; // 最大收集数量，从12个减少到6个
    
    // 创建祝福语收集UI
    function createBlessingCollectorUI() {
        // 创建祝福语收集面板
        const blessingPanel = document.createElement('div');
        blessingPanel.id = 'blessingPanel';
        
        // 创建图标和内容容器
        const blessingIcon = document.createElement('div');
        blessingIcon.id = 'blessingIcon';
        blessingIcon.innerHTML = '✨';
        
        const blessingContent = document.createElement('div');
        blessingContent.id = 'blessingContent';
        blessingContent.innerHTML = `
            <div class="blessing-header">
                <h3>收集到的祝福</h3>
            </div>
            <div class="blessing-progress-container">
                <div id="blessingProgress" class="blessing-progress"></div>
                <div id="blessingCount" class="blessing-count">0/${maxBlessings}</div>
            </div>
            <div id="blessingList" class="blessing-list"></div>
        `;
        
        // 添加图标和内容到面板
        blessingPanel.appendChild(blessingIcon);
        blessingPanel.appendChild(blessingContent);
        
        // 添加点击事件，切换展开/收起状态
        blessingPanel.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
        
        // 直接添加面板到页面
        document.body.appendChild(blessingPanel);
        
        // 更新进度条
        updateBlessingProgress(0);
    }
    
    // 更新祝福语进度条
    function updateBlessingProgress(count) {
        const progressBar = document.getElementById('blessingProgress');
        const countDisplay = document.getElementById('blessingCount');
        
        if (progressBar && countDisplay) {
            const percentage = Math.min((count / maxBlessings) * 100, 100);
            progressBar.style.width = `${percentage}%`;
            countDisplay.textContent = `${count}/${maxBlessings}`;
            
            // 根据进度改变颜色
            if (percentage < 30) {
                progressBar.style.backgroundColor = 'rgba(0, 191, 255, 0.7)';
            } else if (percentage < 60) {
                progressBar.style.backgroundColor = 'rgba(0, 255, 191, 0.7)';
            } else if (percentage < 90) {
                progressBar.style.backgroundColor = 'rgba(191, 255, 0, 0.7)';
            } else {
                progressBar.style.backgroundColor = 'rgba(255, 215, 0, 0.9)';
                
                // 如果达到100%，添加闪烁效果
                if (percentage >= 100) {
                    progressBar.classList.add('blessing-progress-complete');
                }
            }
        }
    }
    
    // 添加祝福语到列表
    function addBlessingToList(blessing, color) {
        const blessingList = document.getElementById('blessingList');
        
        if (blessingList) {
            const blessingItem = document.createElement('div');
            blessingItem.className = 'blessing-item';
            blessingItem.textContent = blessing;
            blessingItem.style.backgroundColor = color + '80'; // 半透明
            blessingItem.style.animation = 'fadeIn 0.5s ease-out';
            
            blessingList.appendChild(blessingItem);
            
            // 滚动到底部
            blessingList.scrollTop = blessingList.scrollHeight;
        }
    }
    
    // 使普通水母可点击
    function makeJellyfishClickable() {
        // 监听新添加的水母
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.classList && node.classList.contains('jellyfish-container')) {
                        const jellyfish = node.querySelector('.jellyfish');
                        if (jellyfish && !jellyfish.dataset.clickable) {
                            // 标记为可点击
                            jellyfish.dataset.clickable = 'true';
                            jellyfish.style.cursor = 'pointer';
                            
                            // 添加点击事件
                            jellyfish.addEventListener('click', function(e) {
                                e.stopPropagation(); // 防止冒泡
                                
                                // 获取祝福语
                                const svgText = this.querySelector('text');
                                if (svgText) {
                                    const blessing = svgText.textContent;
                                    
                                    // 如果祝福语不在列表中，添加它
                                    if (!collectedBlessings.includes(blessing)) {
                                        collectedBlessings.push(blessing);
                                        
                                        // 获取水母颜色
                                        const mainColor = getComputedStyle(this.querySelector('path')).fill;
                                        
                                        // 添加到列表
                                        addBlessingToList(blessing, mainColor || '#00BFFF');
                                        
                                        // 更新进度
                                        updateBlessingProgress(collectedBlessings.length);
                                        
                                        // 显示收集动画
                                        showCollectAnimation(e.clientX, e.clientY, blessing);
                                        
                                        // 播放祝福语音频
                                        if (window.playBlessingAudio) {
                                            window.playBlessingAudio(blessing);
                                        }
                                        
                                        // 不再需要显示和隐藏面板的逻辑
                                        // showBlessingPanel();
                                        // setTimeout(hideBlessingPanel, 3000);
                                    }
                                }
                            });
                        }
                    }
                });
            });
        });
        
        // 开始观察
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // 显示收集动画
    function showCollectAnimation(x, y, blessing) {
        // 创建动画元素
        const animation = document.createElement('div');
        animation.className = 'collect-animation';
        animation.textContent = blessing;
        animation.style.left = `${x}px`;
        animation.style.top = `${y}px`;
        
        document.body.appendChild(animation);
        
        // 移除动画
        setTimeout(() => {
            if (animation.parentNode) {
                animation.parentNode.removeChild(animation);
            }
        }, 1000);
    }
    
    // 检查是否收集完所有祝福语
    function checkCompletion() {
        if (collectedBlessings.length >= maxBlessings) {
            // 显示完成动画
            showCompletionAnimation();
        }
    }
    
    // 这些函数不再需要，因为面板始终可见
    // 显示和隐藏面板的功能已被移除
    
    // 显示完成动画
    function showCompletionAnimation() {
        // 创建完成动画元素
        const completionAnim = document.createElement('div');
        completionAnim.className = 'completion-animation';
        completionAnim.innerHTML = `
            <div class="completion-content">
                <h2>恭喜!</h2>
                <p>您已收集了所有祝福语!</p>
                <div class="collected-blessings">
                    ${collectedBlessings.map(b => `<span>${b}</span>`).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(completionAnim);
        
        // 添加点击事件关闭
        completionAnim.addEventListener('click', function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        });
    }
    
    // 初始化
    createBlessingCollectorUI();
    makeJellyfishClickable();
    
    // 添加点击水母后检查完成状态
    document.addEventListener('click', function(e) {
        if (e.target.closest('.jellyfish')) {
            // 延迟检查，确保祝福已添加到列表
            setTimeout(checkCompletion, 100);
        }
    });
});