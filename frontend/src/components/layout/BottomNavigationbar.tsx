
import React from "react";

export default function BottomNavigationbar(props: { current: string; onChange: (key: string) => void }) {
	const NAV_ITEMS = [
		{ key: "home", label: "ホーム", icon: <span>🏠</span> },
		{ key: "suggest", label: "提案", icon: <span>🔍</span> },
		{ key: "add", label: "レシピ追加", icon: <span>🍳</span> },
	];

	return (
		<nav
			className="fixed bottom-0 w-full max-w-[430px] h-[60px] bg-orange-50 border-t border-orange-200 flex justify-around items-center z-50 left-1/2 -translate-x-1/2 shadow-md"
			style={{ left: "50%", transform: "translateX(-50%)" }}
		>
			{NAV_ITEMS.map((item) => (
				<button
					key={item.key}
					className={
						`bg-orange-200 flex-1 flex flex-col items-center justify-center text-xs py-1 transition-colors duration-150 ` +
						(props.current === item.key
							? "text-orange-500 font-bold"
							: "text-gray-700 font-normal hover:text-orange-400")
					}
					onClick={() => props.onChange(item.key)}
				>
					<div className="text-2xl mb-0.5">{item.icon}</div>
					<div className="text-sm leading-none">{item.label}</div>
				</button>
			))}
		</nav>
	);
}
