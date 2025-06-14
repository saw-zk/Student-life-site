// スクロールイベントのthrottle関数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ヘッダーの背景色をスクロールで変える（パフォーマンス改善）
const handleHeaderScroll = throttle(function() {
    const header = document.querySelector("header");
    if (header) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = "var(--primary-dark)";
        } else {
            header.style.backgroundColor = "var(--primary-color)";
        }
    }
}, 16); // 60fps相当

window.addEventListener("scroll", handleHeaderScroll);

// ナビゲーションメニューのアクティブ表示（改善版）
function initNavigation() {
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 現在のページに対応するリンクをアクティブにする
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
        
        // クリックイベントの追加
        link.addEventListener("click", function(e) {
            // 外部リンクの場合は処理をスキップ
            if (this.getAttribute('target') === '_blank') return;
            
            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });
}

// DOMが読み込まれた後に以下の処理を実行
document.addEventListener("DOMContentLoaded", () => {
    try {
        // ナビゲーション初期化
        initNavigation();
        
        // スクロールアニメーション（パフォーマンス改善）
        const fadeElems = document.querySelectorAll(".fade-in");
        
        const handleScrollAnimation = throttle(() => {
            fadeElems.forEach(el => {
                if (!el.classList.contains("show")) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 100) {
                        el.classList.add("show");
                    }
                }
            });
        }, 16);

        window.addEventListener("scroll", handleScrollAnimation);
        handleScrollAnimation(); // 初回チェック

        // ハンバーガーメニュー切り替え（改善版）
        const menuBtn = document.getElementById("menu-toggle");
        const navMenu = document.querySelector("nav ul");

        if (menuBtn && navMenu) {
            menuBtn.addEventListener("click", (e) => {
                e.preventDefault();
                navMenu.classList.toggle("active");
                
                // アクセシビリティ改善
                const isExpanded = navMenu.classList.contains("active");
                menuBtn.setAttribute("aria-expanded", isExpanded);
                menuBtn.setAttribute("aria-label", isExpanded ? "メニューを閉じる" : "メニューを開く");
            });
            
            // 初期状態の設定
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "メニューを開く");
        }

        // キーボードナビゲーション改善
        document.addEventListener('keydown', (e) => {
            // Escapeキーでメニューを閉じる
            if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuBtn) {
                    menuBtn.setAttribute("aria-expanded", "false");
                    menuBtn.focus();
                }
            }
        });

        // 外部リンクに target="_blank" とrel="noopener"を自動追加
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            if (!link.getAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });

    } catch (error) {
        console.error('JavaScript初期化エラー:', error);
    }
});

// ページの読み込み完了時の処理
window.addEventListener('load', () => {
    // 遅延読み込み画像の処理（将来の画像追加に備えて）
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
