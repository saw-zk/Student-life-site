// Firebase SDKの読み込み（モジュール方式）
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Firebase構成（自分のFirebaseプロジェクト情報を使用）
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

// フォーム送信処理
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const result = document.getElementById("postResult");

  try {
    await addDoc(collection(db, "posts"), {
      title,
      content,
      createdAt: new Date()
    });
    result.innerText = "✅ 投稿に成功しました！";
    document.getElementById("postForm").reset();
  } catch (error) {
    console.error("投稿失敗:", error);
    result.innerText = "❌ 投稿に失敗しました。";
  }
});
