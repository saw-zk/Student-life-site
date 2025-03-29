// スクロール時にヘッダーの背景色を変更
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    if (window.scrollY > 50) { /* 画面を50px以上スクロールしたら背景色を変更 */
        header.style.backgroundColor = "#005bb5"; // 濃い青に変化
    } else {
        header.style.backgroundColor = "#0073e6"; // 元の色に戻す
    }
});

// ナビゲーションメニューのアクティブ表示
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function () {
        document.querySelectorAll("nav ul li a").forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// スクロールアニメーション
document.addEventListener("DOMContentLoaded", () => {
    const fadeElems = document.querySelectorAll(".fade-in");

    const onScroll = () => {
        fadeElems.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add("show");
            }
        });
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // ページ読み込み時にもチェック
});

// ハンバーガーメニュー切り替え
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-toggle");
    const navMenu = document.querySelector("nav ul");

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});
