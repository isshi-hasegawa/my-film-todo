import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#b91d47" />
          <meta name="theme-color" content="#ffffff" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="俺の映画リスト" />
          <meta property="og:url" content="https://my-film-todo.com/" />
          <meta
            property="og:description"
            content="俺の映画リストは動画配信サービスで大量に映画を鑑賞する人のためのタスク管理ツールです。Google Todoリストを使い、動画配信サービスを横断して「次に何を観るか」を決めることができます。"
          />
          <meta property="og:site_name" content="俺の映画リスト" />
          <meta property="og:image" content="https://my-film-todo.com/og.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@isshi_hasegawa" />
          <meta name="twitter:domain" content="www.my-film-todo.com" />
          <meta
            name="twitter:image"
            content="https://my-film-todo.com/og.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
