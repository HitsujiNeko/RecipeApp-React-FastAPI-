import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>© 2025 Takumid0419</p>
        <p>
          <a
            href="https://github.com/HitsujiNeko?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          |
          <a
            href="https://takumid0419.pythonanywhere.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ポートフォリオサイト
          </a>
        </p>
        <p>使用技術: React, FastAPI, Docker, GitHub, GitHub Copilot</p>
        <p>
          お問い合わせ:{" "}
          <a href="mailto:takumid0419@outlook.com">takumid0419@outlook.com</a>
        </p>
        <p>このサイトはポートフォリオとして作成したものです。</p>
      </div>
    </footer>
  );
};

export default Footer;
