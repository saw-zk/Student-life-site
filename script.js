// ヘッダーの背景色をスクロールで変える
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.backgroundColor = "#005bb5";
    } else {
        header.style.backgroundColor = "#0073e6";
    }
});

// ナビゲーションメニューのアクティブ表示
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function () {
        document.querySelectorAll("nav ul li a").forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// DOMが読み込まれた後に以下の処理を実行
document.addEventListener("DOMContentLoaded", () => {
    // スクロールアニメーション
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
    onScroll(); // 初回チェック

    // ハンバーガーメニュー切り替え
    const menuBtn = document.getElementById("menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});
