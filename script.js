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

/* 投稿フォーム用スタイル */
form#postForm {
    max-width: 600px;
    margin: 30px auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  #postForm input,
  #postForm textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  #postForm button {
    padding: 10px 20px;
    font-size: 16px;
    background: #0073e6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  #postForm button:hover {
    background: #005bb5;
  }
  
  #postResult {
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
  }