import { db } from "./firebase-config.js";

import {
    collection,
    onSnapshot,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =====================
// 管理者パスワード
// =====================
const ADMIN_PASSWORD = "heiseikai";

// =====================
// 要素取得
// =====================
const loginBtn = document.getElementById("loginBtn");
const password = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

const loginArea = document.getElementById("loginArea");
const adminArea = document.getElementById("adminArea");

const voteTable = document.getElementById("voteTable");
const resultTable = document.getElementById("resultTable");

const downloadBtn = document.getElementById("downloadBtn");
const refreshBtn = document.getElementById("refreshBtn");

// =====================
// ログイン
// =====================
loginBtn.onclick = () => {

    if(password.value !== ADMIN_PASSWORD){

        loginMessage.textContent = "パスワードが違います";
        loginMessage.className = "error";
        return;

    }

    loginArea.style.display="none";
    adminArea.style.display="block";

    loadVotes();

};

// =====================
// 投票読込
// =====================
function loadVotes(){

    onSnapshot(collection(db,"votes"),(snapshot)=>{

        voteTable.innerHTML="";
        resultTable.innerHTML="";

        let csv=[];

        csv.push(["名前","投票馬"]);

        let count={};

        snapshot.forEach((doc)=>{

            const data=doc.data();

            csv.push([
                data.name,
                data.horse
            ]);

            voteTable.innerHTML+=`
            <tr>
                <td>${data.name}</td>
                <td>${data.horse}</td>
            </tr>
            `;

            if(count[data.horse]){

                count[data.horse]++;

            }else{

                count[data.horse]=1;

            }

        });

        Object.keys(count)
        .sort()
        .forEach((horse)=>{

            resultTable.innerHTML+=`
            <tr>
                <td>${horse}</td>
                <td>${count[horse]}</td>
            </tr>
            `;

        });

        downloadBtn.onclick=()=>{

            let csvText="";

            csv.forEach((row)=>{

                csvText+=row.join(",")+"\n";

            });

            const blob=new Blob(
                [csvText],
                {
                    type:"text/csv;charset=utf-8;"
                }
            );

            const url=URL.createObjectURL(blob);

            const a=document.createElement("a");

            a.href=url;

            a.download="heiseikai_vote.csv";

            a.click();

            URL.revokeObjectURL(url);

        };

    });

}

// =====================
// 手動更新
// =====================
refreshBtn.onclick=async()=>{

    const snapshot=await getDocs(collection(db,"votes"));

    console.log(snapshot.size+"件");

    alert("最新データを取得しました。");

};
