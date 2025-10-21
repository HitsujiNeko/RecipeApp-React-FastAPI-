import styles from "./Header.module.css";

const HEADER_SECTION = [
  { key: "suggest", label: "レシピ提案" },
  { key: "add", label: "レシピ追加" },
  { key: "list", label: "レシピ一覧" },
  { key: "home", label: "HOME" },
  { key: "detail", label: "レシピを見る" },
];

type HeaderSectionProps = {
  nav: string;
  setNav: (key: string) => void;
};

export default function Header(props: HeaderSectionProps) {
  return (
    //左に現在表示しているセクション名、右にアプリ名を表示
    <header className={styles.header}>
      <div className={styles.left}>
        {HEADER_SECTION.find((section) => section.key === props.nav)?.label}
      </div>
      <div className={styles.right}>
        <img src="/app_icon.png" alt="アプリアイコン" className={styles.icon} />
        
        <p>アプリ名</p>
      </div>
    </header>
  )
}
