import React from "react";
import styles from "./Header.module.css"; // スタイルを適用するためのCSSファイル

const NAVS = [
  { key: "suggest", label: "レシピ提案" },
  { key: "add", label: "レシピ追加" },
  { key: "list", label: "レシピ一覧" },
  { key: "about", label: "このアプリについて" },
];

type HeaderProps = {
  nav: string;
  setNav: (nav: string) => void;
};

const Header: React.FC<HeaderProps> = ({ nav, setNav }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        {/* サイトロゴ */}
        <div className={styles.logo}>
          <button
            onClick={() => setNav("suggest")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <h1>レシピ提案アプリ</h1>
          </button>
        </div>
      </div>
      {/* ナビゲーションメニュー */}
      <nav>
        <ul
          className={styles.navMenu}
          style={{
            display: "flex",
            gap: "24px",
            listStyle: "none",
            padding: 0,
          }}
        >
          {NAVS.map((n) => (
            <li key={n.key}>
              <button
                onClick={() => setNav(n.key)}
                style={{
                  textDecoration: nav === n.key ? "underline" : "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: nav === n.key ? "bold" : "normal",
                  color: "inherit",
                  fontSize: "1em",
                }}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
