// 清空当前页面的所有内容
document.body.innerHTML = '';

// 创建一个新的 h1 元素
var h1 = document.createElement('h1');

// 设置 h1 元素的文本内容
h1.textContent = '测试';

// 将 h1 元素添加到页面的 body 中
document.body.appendChild(h1);
