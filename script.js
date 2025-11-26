
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .adblock-banner {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100%;
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 15px 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            font-family: Arial, sans-serif;
            display: none;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        .adblock-banner-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }
        .adblock-banner-text {
            flex: 1;
            text-align: left;
            margin-right: 20px;
        }
        .adblock-banner h3 {
            margin: 0 0 5px 0;
            font-size: 18px;
        }
        .adblock-banner p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .adblock-banner-actions {
            display: flex;
            gap: 10px;
        }
        .adblock-banner-button {
            background: white;
            color: #ee5a24;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        .adblock-banner-button:hover {
            background: #f8f9fa;
            transform: translateY(-1px);
        }
        .adblock-banner-close {
            background: transparent;
            color: white;
            border: 1px solid white;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .adblock-banner-close:hover {
            background: rgba(255,255,255,0.1);
        }
        @media (max-width: 768px) {
            .adblock-banner-content {
                flex-direction: column;
                text-align: center;
            }
            .adblock-banner-text {
                margin-right: 0;
                margin-bottom: 10px;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.id = 'adblockBanner';
    banner.className = 'adblock-banner';
    banner.innerHTML = `
        <div class="adblock-banner-content">
            <div class="adblock-banner-text">
                <h3>🔒 AdBlock Detected</h3>
                <p>Our website relies on advertising to provide free content. Please consider disabling your ad blocker or whitelisting our site to support us.</p>
            </div>
            <div class="adblock-banner-actions">
                <button class="adblock-banner-button">Disable AdBlock</button>
                <button class="adblock-banner-close">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    const fakeAd = document.createElement('div');
    fakeAd.id = 'fakeAdBanner';
    fakeAd.style.cssText = 'width: 728px; height: 90px; position: absolute; left: -9999px; top: -9999px;';
    fakeAd.innerHTML = `
        <ins class="adsbygoogle"
             style="display:inline-block;width:728px;height:90px"
             data-ad-client="ca-pub-1234567890123456"
             data-ad-slot="1234567890"></ins>
    `;
    document.body.appendChild(fakeAd);

    class AdBlockDetector {
        constructor() {
            this.banner = document.getElementById('adblockBanner');
            this.detectionMethods = [
                this.detectByFakeAd,
                this.detectByAdScript,
                this.detectByNetworkRequest,
                this.detectByAdClassNames
            ];
            this.isDetected = false;
            this.checkInterval = null;
            this.init();
        }

        init() {
            this.detectAdBlock();
            this.startContinuousMonitoring();
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    setTimeout(() => this.detectAdBlock(), 1000);
                }
            });
            this.attachEventListeners();
        }

        attachEventListeners() {
            const disableBtn = this.banner.querySelector('.adblock-banner-button');
            const closeBtn = this.banner.querySelector('.adblock-banner-close');
            
            disableBtn.addEventListener('click', () => {
                window.open('https://help.getadblock.com/support/solutions/articles/6000087322-how-to-disable-adblock-on-a-specific-website', '_blank');
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'adblock_disable_clicked', {
                        'event_category': 'adblock',
                        'event_label': 'disable_guide'
                    });
                }
            });

            closeBtn.addEventListener('click', () => {
                this.hideBanner();
            });
        }

        detectByFakeAd() {
            return new Promise((resolve) => {
                const fakeAd = document.getElementById('fakeAdBanner');
                const adIns = fakeAd.querySelector('.adsbygoogle');
                
                if (!window.adsbygoogle) {
                    resolve(true);
                    return;
                }

                const style = window.getComputedStyle(adIns);
                if (style.display === 'none' || 
                    style.visibility === 'hidden' || 
                    style.height === '0px' || 
                    adIns.offsetHeight === 0) {
                    resolve(true);
                    return;
                }

                resolve(false);
            });
        }

        detectByAdScript() {
            return new Promise((resolve) => {
                const scripts = document.getElementsByTagName('script');
                let adScriptBlocked = false;

                for (let script of scripts) {
                    if (script.src.includes('googlesyndication.com') || 
                        script.src.includes('googleadservices.com') ||
                        script.src.includes('doubleclick.net')) {
                        if (script.getAttribute('data-adblock') === 'true') {
                            adScriptBlocked = true;
                            break;
                        }
                    }
                }

                resolve(adScriptBlocked);
            });
        }

        detectByNetworkRequest() {
            return new Promise((resolve) => {
                const testUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                const xhr = new XMLHttpRequest();
                
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        resolve(xhr.status === 0 || xhr.status === 404);
                    }
                };
                
                xhr.onerror = () => {
                    resolve(true);
                };
                
                try {
                    xhr.open('HEAD', testUrl, true);
                    xhr.setRequestHeader('Cache-Control', 'no-cache');
                    xhr.timeout = 5000;
                    xhr.ontimeout = () => resolve(true);
                    xhr.send();
                } catch (e) {
                    resolve(true);
                }
            });
        }

        detectByAdClassNames() {
            return new Promise((resolve) => {
                const adClassNames = [
                    'adsbygoogle', 'ad-container', 'ad-banner', 
                    'advertisement', 'ad-unit', 'ad-space'
                ];
                
                let adElementsHidden = false;
                
                adClassNames.forEach(className => {
                    const elements = document.getElementsByClassName(className);
                    for (let element of elements) {
                        const style = window.getComputedStyle(element);
                        if (style.display === 'none' || style.visibility === 'hidden') {
                            adElementsHidden = true;
                            break;
                        }
                    }
                });
                
                resolve(adElementsHidden);
            });
        }

        async detectAdBlock() {
            try {
                const results = await Promise.allSettled(
                    this.detectionMethods.map(method => method.call(this))
                );

                const detected = results.some(result => 
                    result.status === 'fulfilled' && result.value === true
                );

                if (detected && !this.isDetected) {
                    this.showBanner();
                    this.isDetected = true;
                    this.trackDetection();
                } else if (!detected && this.isDetected) {
                    this.hideBanner();
                    this.isDetected = false;
                }

                return detected;
            } catch (error) {
                return false;
            }
        }

        showBanner() {
            this.banner.style.display = 'block';
            
            setTimeout(() => {
                this.banner.style.transform = 'translateY(0)';
                this.banner.style.opacity = '1';
            }, 100);

            setTimeout(() => {
                if (this.isDetected) {
                    this.hideBanner();
                }
            }, 5000);
        }

        hideBanner() {
            this.banner.style.transform = 'translateY(-100%)';
            this.banner.style.opacity = '0';
            
            setTimeout(() => {
                this.banner.style.display = 'none';
            }, 300);
        }

        startContinuousMonitoring() {
            this.checkInterval = setInterval(() => {
                this.detectAdBlock();
            }, 10000);
        }

        stopContinuousMonitoring() {
            if (this.checkInterval) {
                clearInterval(this.checkInterval);
            }
        }

        trackDetection() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'adblock_detected', {
                    'event_category': 'adblock',
                    'event_label': 'detection'
                });
            }
            
            window.dispatchEvent(new CustomEvent('adblockDetected'));
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.adBlockDetector = new AdBlockDetector();
        });
    } else {
        window.adBlockDetector = new AdBlockDetector();
    }
})();
