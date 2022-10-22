# 俺の映画リスト

俺の映画リストは動画配信サービスで大量に映画鑑賞する人のためのタスク管理ツールです。

## 機能

ログインしたユーザーのGoogle ToDo リストに保存されたリストとタスク一覧を表示します。

<img width="1919" alt="俺の映画リスト (5)" src="https://user-images.githubusercontent.com/53898556/197345328-48f0bf3f-0f9c-4b6d-99b2-21bbc044cd76.png">

### 映画作品の検索

「このリストに作品を登録する」を押すと、検索画面に遷移します。

日本語タイトルで映画を検索することができます。

検索結果の映画をクリックすることで、Google Todo リストにその作品がタスクとして保存されます。

<img width="1919" alt="俺の映画リスト (3)" src="https://user-images.githubusercontent.com/53898556/197343596-cff3ffe6-059c-4200-8787-457453c1cfa9.png">

### タスクの編集・削除

保存されたタスクに期限を追加したり、完了状態に更新したり、またはタスク自体を削除することができます。

<img width="1919" alt="俺の映画リスト (4)" src="https://user-images.githubusercontent.com/53898556/197343598-11c4e38f-f60c-48aa-85fe-067592bdd000.png">

## 使用技術

### フロントエンド

- React
- Next.js
- TypeScript
- Chakra UI

### インフラ

- Vercel

### 外部API連携

- Google Tasks API
- TMDb API

## 環境構築

1. リポジトリのClone

```
git clone https://github.com/isshi-hasegawa/my-film-todo.git
```

2.環境変数の設定

`.env.local.template`を参考に`.env.local`を作成する

3. 依存パッケージインストール

```
npm install
```

4. サーバー起動

```
npm run dev
```

- ユニットテスト

```
npm run test
```

- E2Eテスト

E2Eテストには、Google Todo リストに操作が加えられても問題のないGoogleアカウントを使用してください。

```
npm run test:e2e
```
