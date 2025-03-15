# 炫酷网页特效集合

这是一个包含多种炫酷网页特效的项目，提供了丰富的视觉和交互体验。项目包括艺术字效果、生日特效、骰子动画、玫瑰花特效等多种元素，以及导航栏、社交推文等功能组件。

## 文件结构

```
├── css/                    # CSS样式文件目录
│   ├── art-text.css        # 艺术字样式
│   ├── crystal-stone.css   # 水晶石效果样式
│   ├── exam-cheer.css      # 考试加油特效样式
│   ├── life-insight-button.css # 人生感悟按钮样式
│   ├── logo.css            # Logo样式
│   ├── menu-buttons.css    # 菜单按钮样式
│   ├── nav-bar.css         # 导航栏样式
│   ├── news-container.css  # 新闻容器样式
│   ├── news-life-button.css # 新闻/人生按钮样式
│   ├── responsive.css      # 响应式设计样式
│   ├── social-feed-button.css # 社交推文按钮样式
│   ├── social-feed.css     # 社交推文样式
│   ├── styles.css          # 全局样式
│   ├── thought-feed.css    # 思考推文样式
│   └── thought-poetry-button.css # 思考诗歌按钮样式
├── js/                     # JavaScript脚本文件目录
│   ├── art-text.js         # 艺术字功能
│   ├── birthday-cake.js    # 生日蛋糕特效
│   ├── birthday-roses.js   # 生日玫瑰特效
│   ├── dice.js             # 骰子特效
│   ├── exam-cheer.js       # 考试加油特效
│   ├── life-insight-button.js # 人生感悟按钮功能
│   ├── menu-buttons.js     # 菜单按钮功能
│   ├── nature-sounds.js    # 自然声音功能
│   ├── nav-bar.js          # 导航栏功能
│   ├── news-life.js        # 新闻/人生功能
│   ├── nine-roses.js       # 九朵玫瑰特效
│   ├── portrait.js         # 素描人像效果
│   ├── rose.js             # 玫瑰花特效
│   ├── script.js           # 主脚本
│   ├── social-feed.js      # 社交推文功能
│   └── thought-poetry.js   # 思考诗歌功能
├── sounds/                 # 音频文件目录
│   ├── 1.mp3               # 音频文件1
│   ├── 2.mp3               # 音频文件2
│   └── 3.mp3               # 音频文件3
├── st/                     # 特殊内容目录
│   ├── 数字空间.html        # 数字空间页面
│   ├── 数字空间/            # 数字空间相关文件
│   ├── 三体宇宙.html        # 三体宇宙页面
│   ├── 数学王国/            # 数学王国相关文件
│   ├── 第一性原理.html      # 第一性原理页面
│   ├── 短刷脑危害.html      # 短刷脑危害页面
│   └── 思考，快与慢.html    # 思考，快与慢页面
├── index.html             # 主页
└── redesigned-index.html  # 重新设计的主页
```

## 功能特性

- **艺术字效果**：允许用户输入文字并以艺术字形式展示
- **生日特效**：包括生日蛋糕和玫瑰花特效
- **骰子动画**：随机显示骰子点数的动画效果
- **玫瑰花特效**：多种玫瑰花动画效果
- **导航菜单**：提供页面导航功能
- **社交推文**：展示人生感悟和思考内容
- **新闻/人生切换**：在新闻和人生感悟之间切换
- **响应式设计**：适配不同设备屏幕大小

## 使用说明

1. 打开`index.html`或`redesigned-index.html`查看主页
2. 通过导航菜单访问不同的内容页面
3. 点击各种按钮体验不同的特效和功能
4. 在艺术字输入框中输入文字并发送，查看艺术字效果
5. 点击水晶石等元素触发特殊动画效果

## 技术栈

- HTML5
- CSS3 (动画、过渡效果、弹性布局)
- JavaScript (原生JS，无框架依赖)
- 外部库：Three.js (用于3D效果)、D3.js (用于数据可视化)

## 注意事项

- `st`目录下的文件为特殊内容，不需要进行整理
- 所有CSS文件已整理到`css`目录
- 所有JavaScript文件已整理到`js`目录