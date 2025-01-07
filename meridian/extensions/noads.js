document.addEventListener('DOMContentLoaded', function() {
    // 定义一个函数来隐藏谷歌广告
    function hideGoogleAds() {
        // 查找所有谷歌广告元素
        const adSelectors = [
            'ins[data-ad-client]', // 谷歌广告单元
            'div[data-ad-slot]', // 谷歌广告单元
            'div[id^="google_ads_iframe_"]', // 谷歌广告iframe
            'iframe[src*="pagead2.googlesyndication.com"]', // 谷歌广告iframe
            'div[class*="adsbygoogle"]', // 谷歌广告容器
        ];

        adSelectors.forEach(selector => {
            const ads = document.querySelectorAll(selector);
            ads.forEach(ad => {
                ad.style.display = 'none'; // 隐藏广告元素
            });
        });
    }

    // 页面加载完成后立即隐藏广告
    hideGoogleAds();

    // 使用MutationObserver来监听DOM变化，以便动态加载的广告也能被隐藏
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                hideGoogleAds();
            }
        });
    });

    // 配置MutationObserver以监视整个文档树的变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
