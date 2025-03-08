// 祝福语音频管理器
document.addEventListener('DOMContentLoaded', function() {
    // 创建音频上下文和音频缓存
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioCache = {};
    
    // 使用语音合成API播放祝福语
    function playBlessingAudio(blessing) {
        // 检查浏览器是否支持语音合成
        if ('speechSynthesis' in window) {
            // 创建语音合成实例
            const utterance = new SpeechSynthesisUtterance(blessing);
            
            // 设置语音参数
            utterance.lang = 'zh-CN'; // 设置中文
            utterance.volume = 0.8;    // 音量 (0 到 1)
            utterance.rate = 1.0;      // 语速 (0.1 到 10)
            utterance.pitch = 1.2;     // 音调 (0 到 2)
            
            // 播放语音
            speechSynthesis.speak(utterance);
            
            // 返回播放状态
            return true;
        }
        
        // 如果不支持语音合成，返回失败
        console.warn('浏览器不支持语音合成API');
        return false;
    }
    
    // 使用音频文件播放祝福语（备用方案）
    function playBlessingAudioFile(blessing) {
        // 创建音频元素
        const audio = new Audio();
        audio.volume = 0.8;
        
        // 根据祝福语设置音频文件路径
        // 注意：这里假设有对应的音频文件，如果没有则使用语音合成
        const audioPath = `mp3/blessings/${blessing}.mp3`;
        
        // 尝试加载音频文件
        audio.src = audioPath;
        audio.onerror = function() {
            console.warn(`音频文件 ${audioPath} 不存在，使用语音合成`);
            playBlessingAudio(blessing);
        };
        
        // 播放音频
        audio.play().catch(error => {
            console.warn('音频播放失败:', error);
            playBlessingAudio(blessing);
        });
    }
    
    // 播放祝福语音频（主函数）
    function playBlessing(blessing) {
        // 优先使用语音合成API
        return playBlessingAudio(blessing);
    }
    
    // 将播放函数暴露给全局
    window.playBlessingAudio = playBlessing;
});