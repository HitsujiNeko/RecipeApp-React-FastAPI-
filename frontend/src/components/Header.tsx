import React from "react";

const Header = () => {
  return (
    <header className="headerLayout">
      <div className="headerTop">
        {/* サイトロゴ */}
        <div className="logo">
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>レシピ提案アプリ</h1>
          </a>
        </div>
      </div>
      {/* ナビゲーションメニュー */}
      <nav>
        <ul
          className="navMenu"
          style={{
            display: "flex",
            gap: "24px",
            listStyle: "none",
            padding: 0,
          }}
        >
          <li>
            <a href="/" style={{ textDecoration: "none" }}>
              レシピ提案
            </a>
          </li>
          <li>
            <a href="/add" style={{ textDecoration: "none" }}>
              レシピ追加
            </a>
          </li>
          <li>
            <a href="/recipes" style={{ textDecoration: "none" }}>
              レシピ一覧
            </a>
          </li>
          <li>
            <a href="/about" style={{ textDecoration: "none" }}>
              このアプリについて
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
