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
    <header className="flex justify-between items-center p-4 bg-orange-400 shadow-md">
      <div className="font-bold text-2xl ml-2">
        {HEADER_SECTION.find((section) => section.key === props.nav)?.label}
      </div>
      <div className="flex items-center cursor-pointer font-bold text-2xl mr-3"  onClick={() => props.setNav("home")}>
        <img src="/app_icon.png" alt="アプリアイコン" className="w-11 h-11 mr-3" />
        
        <p>アプリ名</p>
      </div>
    </header>
  )
}
