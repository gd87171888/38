document.addEventListener('DOMContentLoaded', function() {
    // 初始化音频
    const bgMusic = document.getElementById('bgMusic');
    const audioToggle = document.getElementById('audioToggle');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    let audioPlaying = false;

    // 音频控制 - 主开关
    audioToggle.addEventListener('click', function() {
        if (audioPlaying) {
            bgMusic.pause();
            audioToggle.querySelector('.audio-icon').textContent = '♪';
        } else {
            bgMusic.play();
            audioToggle.querySelector('.audio-icon').textContent = '♫';
        }
        audioPlaying = !audioPlaying;
    });
    
    // 播放按钮
    playBtn.addEventListener('click', function() {
        bgMusic.play();
        audioToggle.querySelector('.audio-icon').textContent = '♫';
        audioPlaying = true;
    });
    
    // 暂停按钮
    pauseBtn.addEventListener('click', function() {
        bgMusic.pause();
        audioToggle.querySelector('.audio-icon').textContent = '♪';
        audioPlaying = false;
    });

    // 图片上传预览
    const imageUpload = document.getElementById('imageUpload');
    const previewContainer = document.getElementById('previewContainer');

    imageUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // 直接将上传的图片添加到场景中，不显示预览
                addUserImageToScene(e.target.result);
            };
            
            reader.readAsDataURL(file);
        }
    });

    // 送花按钮
    const flowerBtn = document.getElementById('flowerBtn');
    flowerBtn.addEventListener('click', function() {
        createFlowers();
        
        // 添加按钮动画效果
        flowerBtn.classList.add('active');
        setTimeout(() => {
            flowerBtn.classList.remove('active');
        }, 300);
    });
    
    // 发财按钮
    const fortuneBtn = document.getElementById('fortuneBtn');
    fortuneBtn.addEventListener('click', function() {
        createFortune();
        
        // 添加按钮动画效果
        fortuneBtn.classList.add('active');
        setTimeout(() => {
            fortuneBtn.classList.remove('active');
        }, 300);
    });
    
    // 添加浮动图片的CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .floating-image {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            border: 3px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
            z-index: 5;
            animation: float 10s infinite ease-in-out;
        }
        
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(20px, -15px) rotate(5deg); }
            50% { transform: translate(0, -30px) rotate(0deg); }
            75% { transform: translate(-20px, -15px) rotate(-5deg); }
        }
    `;
    document.head.appendChild(style);
});