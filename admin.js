<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>平成会 勝ち馬投票 管理画面</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

<div class="container">

    <h1>🏇 管理画面</h1>

    <!-- ログイン -->
    <div class="card" id="loginArea">

        <label>管理者パスワード</label>

        <input
            type="password"
            id="password"
            placeholder="パスワード">

        <button id="loginBtn">
            ログイン
        </button>

        <p id="loginMessage"></p>

    </div>

    <!-- 管理画面 -->
    <div
        id="adminArea"
        style="display:none;">

        <div class="card">

            <h2>投票一覧</h2>

            <div class="admin-buttons">

                <button id="downloadBtn">
                    CSVダウンロード
                </button>

                <button id="refreshBtn">
                    更新
                </button>

            </div>

            <table>

                <thead>

                    <tr>
                        <th>名前</th>
                        <th>投票馬</th>
                    </tr>

                </thead>

                <tbody id="voteTable">

                </tbody>

            </table>

        </div>

        <br>

        <div class="card">

            <h2>リアルタイム集計</h2>

            <table>

                <thead>

                    <tr>
                        <th>馬名</th>
                        <th>票数</th>
                    </tr>

                </thead>

                <tbody id="resultTable">

                </tbody>

            </table>

        </div>

    </div>

</div>

<script type="module" src="firebase-config.js"></script>
<script type="module" src="admin.js"></script>

</body>
</html>
