// 创建浮窗
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'heygpt-overlay';
    overlay.style.position = 'fixed';
    overlay.style.bottom = '20px';
    overlay.style.right = '20px';
    overlay.style.backgroundColor = '#fff';
    overlay.style.border = '1px solid #ccc';
    overlay.style.borderRadius = '5px';
    overlay.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    overlay.style.padding = '10px';
    overlay.style.width = '300px';
    overlay.style.zIndex = '10000';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';

    const title = document.createElement('h3');
    title.textContent = 'HeyGPT';
    overlay.appendChild(title);

    const summarizeButton = document.createElement('button');
    summarizeButton.textContent = '总结';
    summarizeButton.style.marginBottom = '10px';
    summarizeButton.onclick = summarizePage;
    overlay.appendChild(summarizeButton);

    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.placeholder = '请输入你的问题';
    questionInput.style.width = '100%';
    questionInput.style.marginBottom = '10px';
    overlay.appendChild(questionInput);

    const sendButton = document.createElement('button');
    sendButton.textContent = '发送';
    sendButton.onclick = () => askQuestion(questionInput.value);
    overlay.appendChild(sendButton);

    const responseDiv = document.createElement('div');
    responseDiv.id = 'heygpt-response';
    responseDiv.style.marginTop = '10px';
    responseDiv.style.maxHeight = '200px';
    responseDiv.style.overflowY = 'auto';
    overlay.appendChild(responseDiv);

    const toggleButton = document.createElement('div');
    toggleButton.id = 'heygpt-toggle';
    toggleButton.style.position = 'absolute';
    toggleButton.style.bottom = '-10px';
    toggleButton.style.right = '-10px';
    toggleButton.style.width = '20px';
    toggleButton.style.height = '20px';
    toggleButton.style.backgroundColor = '#ccc';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.display = 'flex';
    toggleButton.style.alignItems = 'center';
    toggleButton.style.justifyContent = 'center';
    toggleButton.textContent = '↓';
    toggleButton.onclick = () => toggleOverlay(overlay);
    overlay.appendChild(toggleButton);

    document.body.appendChild(overlay);
}

// 切换浮窗显示状态
function toggleOverlay(overlay) {
    if (overlay.style.height === '50px') {
        overlay.style.height = 'auto';
        overlay.style.width = '300px';
        overlay.querySelector('#heygpt-toggle').textContent = '↓';
    } else {
        overlay.style.height = '50px';
        overlay.style.width = '50px';
        overlay.style.padding = '0';
        overlay.style.borderRadius = '50%';
        overlay.querySelector('#heygpt-toggle').textContent = '↑';
        overlay.querySelector('h3').style.display = 'none';
        overlay.querySelector('button').style.display = 'none';
        overlay.querySelector('input').style.display = 'none';
        overlay.querySelector('#heygpt-response').style.display = 'none';
    }
}

// 提取页面内容
function extractPageContent() {
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, li, dt, dd, blockquote, pre, code, table, th, td, caption');
    let content = '';
    elements.forEach(element => {
        content += element.textContent.trim() + '\n';
    });
    return content.trim();
}

// 发送请求到AI
async function sendToAI(data, task) {
    const chatBox = document.getElementById('heygpt-response');
    chatBox.innerHTML = '<div class="message assistant-message"><div class="message-content loading">加载中...</div></div>';

    const response = await fetch('https://42.194.245.207/api/send_message', {
        method: 'POST',
        headers: {
            'Authorization': 'your_api_key_here', // 替换为你的API密钥
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "messages": [
                { role: "user", content: task },
                { role: "user", content: data }
            ]
        })
    });

    if (!response.ok) {
        chatBox.innerHTML = `<div class="message assistant-message"><div class="message-content error">错误: ${response.statusText}</div></div>`;
        return;
    }

    const result = await response.json();
    chatBox.innerHTML = `<div class="message assistant-message"><div class="message-content">${result.response}</div></div>`;
}

// 总结页面
function summarizePage() {
    const content = extractPageContent();
    const task = '请总结以下网页内容：';
    sendToAI(content, task);
}

// 提问
function askQuestion(question) {
    if (!question.trim()) {
        alert('请输入你的问题。');
        return;
    }
    const content = extractPageContent();
    const task = `请根据以下网页内容回答问题：${question}`;
    sendToAI(content, task);
}

// 监听ALT+X
document.addEventListener('keydown', (event) => {
    if (event.altKey && event.key === 'x') {
        if (document.getElementById('heygpt-overlay')) {
            document.getElementById('heygpt-overlay').remove();
        } else {
            createOverlay();
        }
    }
});