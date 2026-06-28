import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const voteBtn = document.getElementById("voteBtn");
const nameInput = document.getElementById("name");
const horseSelect = document.getElementById("horse");
const message = document.getElementById("message");

voteBtn.addEventListener("click", vote);

async function vote() {

    const name = nameInput.value.trim();
    const horse = horseSelect.value;

    message.className = "";
    message.textContent = "";

    if (name === "") {
        message.classList.add("error");
        message.textContent = "名前を入力してください";
        return;
    }

    if (horse === "") {
        message.classList.add("error");
        message.textContent = "馬を選択してください";
        return;
    }

    voteBtn.disabled = true;

    try {

        // 同じ名前で投票済みか確認
        const q = query(
            collection(db, "votes"),
            where("name", "==", name)
        );

        const result = await getDocs(q);

        if (!result.empty) {
            message.classList.add("error");
            message.textContent = "この名前では既に投票済みです。";
            voteBtn.disabled = false;
            return;
        }

        // Firestoreへ保存
        await addDoc(collection(db, "votes"), {
            name: name,
            horse: horse,
            createdAt: serverTimestamp()
        });

        message.classList.add("success");
        message.textContent = "投票ありがとうございました！";

        nameInput.value = "";
        horseSelect.selectedIndex = 0;

    } catch (error) {

        console.error(error);

        message.classList.add("error");
        message.textContent = "エラーが発生しました。";

    }

    voteBtn.disabled = false;

}
