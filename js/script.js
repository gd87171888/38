document.addEventListener('DOMContentLoaded', function() {
    // 获取场景元素
    const scene = document.getElementById('scene');
    
    // 创建水晶石
    function createCrystalStone() {
        const stone = document.createElement('div');
        stone.className = 'crystal-stone';
        
        // 随机位置
        const posX = Math.random() * (window.innerWidth - 100);
        const posY = Math.random() * (window.innerHeight - 100);
        stone.style.left = `${posX}px`;
        stone.style.top = `${posY}px`;
        
        // 创建水晶石主体
        const body = document.createElement('div');
        body.className = 'crystal-stone-body';
        stone.appendChild(body);
        
        // 创建晶面
        for (let i = 0; i < 3; i++) {
            const facet = document.createElement('div');
            facet.className = 'crystal-facet';
            stone.appendChild(facet);
        }
        
        // 创建光晕
        const glow = document.createElement('div');
        glow.className = 'crystal-glow';
        stone.appendChild(glow);
        
        // 添加悬浮动画
        stone.style.animation = 'stoneFloat 5s infinite';
        
        // 添加点击事件
        stone.addEventListener('click', function(e) {
            // 创建爆炸效果
            createCrystalExplosion(e.clientX, e.clientY);
            // 显示随机祝福语
            const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
            const blessingText = document.createElement('div');
            blessingText.className = 'jellyfish-blessing';
            blessingText.textContent = randomBlessing;
            blessingText.style.left = `${e.clientX}px`;
            blessingText.style.top = `${e.clientY}px`;
            scene.appendChild(blessingText);
            // 动画结束后移除祝福语
            setTimeout(() => {
                blessingText.remove();
            }, 2000);
            // 移除水晶石
            stone.remove();
        });
        
        scene.appendChild(stone);
    }
    
    // 创建水晶爆炸效果
    function createCrystalExplosion(x, y) {
        // 创建更多的火花效果
        for (let i = 0; i < 30; i++) {
            const spark = document.createElement('div');
            spark.className = 'crystal-spark';
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            
            // 随机移动方向和距离
            const angle = (Math.random() * Math.PI * 2);
            const distance = 50 + Math.random() * 100;
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            spark.style.setProperty('--moveX', `${moveX}px`);
            spark.style.setProperty('--moveY', `${moveY}px`);
            
            scene.appendChild(spark);
            
            // 动画结束后移除元素
            setTimeout(() => {
                spark.remove();
            }, 800);
        }
    }
    
    // 音频控制
    const bgMusic = document.getElementById('bgMusic');
    const toggleAudio = document.getElementById('toggleAudio');
    const volumeControl = document.getElementById('volumeControl');
    const soundSelector = document.getElementById('soundSelector');
    
    // 初始化音量
    bgMusic.volume = volumeControl.value;
    
    // 音频播放控制
    toggleAudio.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            toggleAudio.textContent = '❚❚';
        } else {
            bgMusic.pause();
            toggleAudio.textContent = '▶';
        }
    });
    
    // 音量控制
    volumeControl.addEventListener('input', function() {
        bgMusic.volume = this.value;
    });
    
    // 创建声音选择器
    natureSounds.forEach(sound => {
        const soundBtn = document.createElement('div');
        soundBtn.className = 'sound-btn';
        soundBtn.innerHTML = sound.icon;
        soundBtn.title = sound.name;
        soundBtn.addEventListener('click', function() {
            // 移除其他按钮的active类
            document.querySelectorAll('.sound-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 添加active类到当前按钮
            this.classList.add('active');
            
            // 设置音频源
            bgMusic.src = sound.src;
            
            // 如果之前是播放状态，则继续播放
            if (toggleAudio.textContent === '❚❚') {
                bgMusic.play();
            }
        });
        
        soundSelector.appendChild(soundBtn);
    });
    
    // 默认选择第一个声音
    if (natureSounds.length > 0) {
        bgMusic.src = natureSounds[0].src;
        document.querySelector('.sound-btn').classList.add('active');
    }
    
    // 上传图片功能
    // 创建文件上传输入元素
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.id = 'upload';
    upload.accept = 'image/*';
    upload.style.display = 'none';
    document.body.appendChild(upload);
    
    // 恢复上传图片按钮功能
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            upload.click();
        });
    }
    
    upload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // 预加载图片以获取尺寸
                const img = new Image();
                img.onload = function() {
                    // 创建圆形图片元素
                    const imageCircle = document.createElement('div');
                    imageCircle.className = 'image-circle';
                    
                    // 计算合适的缩放比例
                    const maxSize = 120; // 增加最大尺寸到120px
                    const scale = Math.min(maxSize / img.width, maxSize / img.height);
                    const width = img.width * scale;
                    const height = img.height * scale;
                    
                    // 设置图片样式
                    imageCircle.style.backgroundImage = `url(${e.target.result})`;
                    imageCircle.style.width = `${width}px`;
                    imageCircle.style.height = `${height}px`;
                    
                    // 随机位置
                    const posX = Math.random() * (window.innerWidth - width);
                    const posY = Math.random() * (window.innerHeight - height);
                    imageCircle.style.left = `${posX}px`;
                    imageCircle.style.top = `${posY}px`;
                    
                    // 设置随机移动方向和距离
                    const moveX = (Math.random() - 0.5) * 300;
                    const moveY = (Math.random() - 0.5) * 200;
                    imageCircle.style.setProperty('--moveX', `${moveX}px`);
                    imageCircle.style.setProperty('--moveY', `${moveY}px`);
                    
                    scene.appendChild(imageCircle);
                    
                    // 5分钟后移除元素
                    setTimeout(() => {
                        imageCircle.remove();
                    }, 300000);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 送花按钮功能
    const flowerBtn = document.getElementById('flowerBtn');
    
    flowerBtn.addEventListener('click', function(e) {
        // 创建花朵效果
        for (let i = 0; i < 20; i++) {
            createFlower();
        }
        
        // 创建点击特效
        createClickEffect(e.clientX, e.clientY);
    });
    
    // 创建花朵效果
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // 随机位置
        const posX = Math.random() * window.innerWidth;
        const posY = window.innerHeight;
        
        flower.style.left = `${posX}px`;
        flower.style.top = `${posY}px`;
        
        // 随机大小
        const size = 10 + Math.random() * 20;
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;
        
        // 随机动画时间
        const duration = 2 + Math.random() * 3;
        flower.style.animation = `floatUp ${duration}s linear forwards, fade ${duration}s linear forwards`;
        
        scene.appendChild(flower);
        
        // 动画结束后移除元素
        setTimeout(() => {
            flower.remove();
        }, duration * 1000);
    }
    
    // 创建点击特效
    function createClickEffect(x, y) {
        // 创建火花效果
        for (let i = 0; i < 20; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            
            // 随机移动方向和距离
            const moveX = (Math.random() - 0.5) * 100;
            const moveY = (Math.random() - 0.5) * 100;
            spark.style.setProperty('--moveX', `${moveX}px`);
            spark.style.setProperty('--moveY', `${moveY}px`);
            
            scene.appendChild(spark);
            
            // 动画结束后移除元素
            setTimeout(() => {
                spark.remove();
            }, 500);
        }
    }
    
    // 创建背景粒子
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 随机位置
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            
            // 随机大小
            const size = 1 + Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机移动方向和距离
            const moveX = (Math.random() - 0.5) * 200;
            const moveY = (Math.random() - 0.5) * 200;
            particle.style.setProperty('--moveX', `${moveX}px`);
            particle.style.setProperty('--moveY', `${moveY}px`);
            
            // 随机动画时间
            const duration = 10 + Math.random() * 20;
            particle.style.animationDuration = `${duration}s`;
            
            scene.appendChild(particle);
        }
    }
    
    // 创建背景粒子
    createParticles();
    
    // 祝福语数组
    const blessings = [
        "快乐",
        "幸福",
        "健康",
        "美丽",
        "优雅",
        "智慧",
        "自信",
        "成功"
    ];

    // 跟踪当前水母数量
    let jellyfishCount = 0;
    const maxJellyfishCount = 4; // 最多显示4个水母

    // 创建水母
    function createJellyfish() {
        // 移除现有的水母
        const existingJellyfish = document.querySelectorAll('.jellyfish');
        existingJellyfish.forEach(jellyfish => jellyfish.remove());
        
        // 重置水母计数
        jellyfishCount = 1;
        
        const jellyfish = document.createElement('div');
        jellyfish.className = 'jellyfish';
        
        // 随机位置
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * (window.innerHeight * 0.7);
        jellyfish.style.left = `${posX}px`;
        jellyfish.style.top = `${posY}px`;
        
        // 创建水母身体
        const body = document.createElement('div');
        body.className = 'jellyfish-body';
        jellyfish.appendChild(body);
        
        // 创建触须
        for (let i = 0; i < 8; i++) {
            const tentacle = document.createElement('div');
            tentacle.className = 'tentacle';
            // 调整触须的水平位置，使其均匀分布在水母底部
            tentacle.style.left = `${5 + i * 9}px`;
            tentacle.style.animationDelay = `${Math.random() * 2}s`;
            // 调整触须的旋转角度，使中间的触须更垂直，两侧的触须更倾斜
            const angle = i < 4 ? -15 + i * 5 : -5 + (i-4) * 5;
            tentacle.style.transform = `rotate(${angle}deg)`;
            jellyfish.appendChild(tentacle);
        }
        
        // 将水母添加到场景中
        scene.appendChild(jellyfish);
        
        // 添加更生动的动画
        const duration = 15 + Math.random() * 10; // 随机动画时间
        const moveX = (Math.random() - 0.5) * 300; // 增加移动范围
        const moveY = (Math.random() - 0.5) * 200;
        // 移除旋转效果
        // const rotateAngle = (Math.random() - 0.5) * 30; // 添加旋转
        
        jellyfish.style.animation = `float ${duration}s infinite ease-in-out`;
        jellyfish.style.setProperty('--moveX', `${moveX}px`);
        jellyfish.style.setProperty('--moveY', `${moveY}px`);
        // 移除旋转角度设置
        // jellyfish.style.setProperty('--rotateAngle', `${rotateAngle}deg`);
        
        // 添加点击事件
        jellyfish.addEventListener('click', function() {
            // 显示随机祝福语
            const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
            const blessingText = document.createElement('div');
            blessingText.className = 'jellyfish-blessing';
            blessingText.textContent = randomBlessing;
            blessingText.style.left = `${parseFloat(jellyfish.style.left) + 40}px`;
            blessingText.style.top = `${parseFloat(jellyfish.style.top) - 20}px`;
            scene.appendChild(blessingText);
            
            // 动画结束后移除祝福语
            setTimeout(() => {
                blessingText.remove();
            }, 2000);
        });
    }
    
    // 创建多个水母
    for (let i = 0; i < maxJellyfishCount; i++) {
        createJellyfish();
    }
    
    // 创建水晶石
    for (let i = 0; i < 3; i++) {
        createCrystalStone();
    }
    
    // 创建蘑菇
    for (let i = 0; i < 5; i++) {
        createMushroom();
    }
    
    // 创建多个水母
    for (let i = 0; i < maxJellyfishCount; i++) {
        createJellyfish();
    }
    
    // 创建水晶石
    for (let i = 0; i < 3; i++) {
        createCrystalStone();
    }
    
    // 创建蘑菇
    for (let i = 0; i < 5; i++) {
        createMushroom();
    }
});

function createMoveEffect(x, y) {
    const spark = document.createElement('div');
    spark.className = 'move-spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    
    // 随机大小
    const size = 2 + Math.random() * 3;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    
    // 随机颜色
    const hue = Math.random() * 360;
    spark.style.background = `hsl(${hue}, 100%, 70%)`;
    spark.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, 100%, 70%)`;
    
    // 随机移动方向和距离
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 30;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    
    spark.style.setProperty('--moveX', `${moveX}px`);
    spark.style.setProperty('--moveY', `${moveY}px`);
    
    scene.appendChild(spark);
    
    // 动画结束后移除元素
    setTimeout(() => {
        spark.remove();
    }, 500);
}

// 添加移动事件监听器
let lastMoveTime = 0;
const moveThrottle = 150; // 增加节流时间间隔（从50毫秒改为150毫秒）

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    if (currentTime - lastMoveTime > moveThrottle) {
        createMoveEffect(e.clientX, e.clientY);
        lastMoveTime = currentTime;
    }
});

document.addEventListener('touchmove', (e) => {
    const currentTime = Date.now();
    if (currentTime - lastMoveTime > moveThrottle) {
        const touch = e.touches[0];
        createMoveEffect(touch.clientX, touch.clientY);
        lastMoveTime = currentTime;
    }
});