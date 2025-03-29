// Firebase SDKの読み込み
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Firebase構成
const firebaseConfig = {
  apiKey: "AIzaSyDY7fyVsqQtNtyEGYzkkgGFeMCwpgYRlmA",
  authDomain: "student-life-site.firebaseapp.com",
  projectId: "student-life-site",
  storageBucket: "student-life-site.firebasestorage.app",
  messagingSenderId: "959537079158",
  appId: "1:959537079158:web:651b1c8984dc56a4545057",
  measurementId: "G-T4JF9TXVLR"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 記事一覧を取得して表示
const postList = document.getElementById("postList");

async function loadPosts() {
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      postList.innerHTML = "<p>まだ投稿はありません。</p>";
      return;
    }

    let html = "";
    querySnapshot.forEach(doc => {
      const post = doc.data();
      const created = post.createdAt?.toDate?.().toLocaleString() || "日付不明";

      html += `
        <div class="post-item fade-in">
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <small>投稿日: ${created}</small>
          <hr />
        </div>
      `;
    });

    postList.innerHTML = html;
  } catch (error) {
    console.error("読み込みエラー:", error);
    postList.innerHTML = "<p>読み込みに失敗しました。</p>";
  }
}

loadPosts();
