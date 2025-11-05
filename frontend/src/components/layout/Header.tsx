const HEADER_SECTION = [
  { key: "suggest", label: "Recipe Search" },
  { key: "add", label: "Recipe Add" },
  { key: "list", label: "RecipeList" },
  { key: "home", label: "HOME" },
  { key: "detail", label: "Recipe Card" },
  { key: "admin", label: "Admin" },
  { key: "playlist", label: "Recipe Add" },
  { key: "update", label: "Recipe Update" },
];

type HeaderSectionProps = {
  nav: string;
  setNav: (key: string) => void;
};

export default function Header(props: HeaderSectionProps) {
  return (
    <header className="flex justify-between items-center p-3 bg-orange-400 shadow-md">
      <div className="font-bold ">
          <span
            className="font-bold text-2xl  px-3 py-1 rounded-full bg-white/80 text-orange-500 drop-shadow  border-2 border-dashed border-orange-300 animate-bounce-slow"
            style={{ fontFamily: '"Zen Maru Gothic", "Comic Sans MS", "cursive", sans-serif' }}
          >
            {HEADER_SECTION.find((section) => section.key === props.nav)?.label}
          </span>
      </div>
      <div
        className="flex items-center cursor-pointer font-bold select-none min-w-0"
        onClick={() => props.setNav("home")}
        style={{ maxWidth: '220px' }}
      >
        <span className="inline-block bg-white/90 rounded-full border-2 border-orange-200 shadow p-0.5 animate-bounce-slow">
          <img
            src="/app_icon.png"
            alt="アプリアイコン"
            className="w-10 h-10 object-contain drop-shadow"
            style={{ filter: 'drop-shadow(0 2px 6px #fbbf24)' }}
          />
        </span>
        <span
          className="ml-1 px-1.5 py-0.5 rounded-full bg-white/80 text-orange-500 border border-dashed border-pink-200 shadow text-xs truncate"
          style={{ fontFamily: '"Zen Maru Gothic", "Comic Sans MS", "cursive", sans-serif', letterSpacing: '0.06em', maxWidth: '120px' }}
        >
          もこもこきっちん
        </span>
      </div>
    </header>
  )
}
