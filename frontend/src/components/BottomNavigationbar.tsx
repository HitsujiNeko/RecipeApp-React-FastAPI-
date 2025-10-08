import React from 'react'
import styles from "./BottomNavigationbar.module.css";

//  レシピアイコンは後で変更予定


export default function BottomNavigationbar(props: { current: string; onChange: (key: string) => void }) {
	const NAV_ITEMS = [
		{ key: "home", label: "ホーム", icon: <span>🏠</span> },
		{ key: "suggest", label: "提案", icon: <span>🔍</span> },
		{ key: "add", label: "レシピ追加", icon: <span>🍳</span> }, 
	];

	return (
		<nav className={styles.bottomNav}>
			{NAV_ITEMS.map((item) => (
				<button 
					key={item.key} 
					className={props.current === item.key ? styles.active : ''}
					onClick={() => props.onChange(item.key)}
				>
					<div className={styles.icon}>{item.icon}</div>
					<div className={styles.label}>{item.label}</div>
				</button>
			))}
		</nav>
	);
}
