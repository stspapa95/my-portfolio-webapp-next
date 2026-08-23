import type { ReactNode } from "react";

export const ogSize = { width: 1200, height: 630 };

export function OgCard({
	kicker,
	title,
	footer,
}: {
	kicker: string;
	title: string;
	footer: string;
}): ReactNode {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				background: "#0D0D0F",
				padding: 72,
				color: "#EDEDEF",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
				<div
					style={{
						width: 14,
						height: 14,
						borderRadius: 999,
						background: "#B4FF39",
					}}
				/>
				<div style={{ display: "flex", fontSize: 26, letterSpacing: -0.4 }}>
					{kicker}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 18,
					maxWidth: 980,
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 68,
						fontWeight: 600,
						letterSpacing: -2.4,
						lineHeight: 1.05,
					}}
				>
					{title}
				</div>
				<div style={{ display: "flex", fontSize: 26, color: "#8B8B95" }}>
					{footer}
				</div>
			</div>
		</div>
	);
}
