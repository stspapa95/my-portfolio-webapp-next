"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const TYPE_MS = 34;
const DELETE_MS = TYPE_MS;
const HOLD_MS = 1100;
const GAP_MS = 320;

function subscribeReducedMotion(onChange: () => void) {
	const media = window.matchMedia("(prefers-reduced-motion: reduce)");
	media.addEventListener("change", onChange);
	return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Typed({
	lines,
	play = true,
}: {
	lines: readonly string[];
	play?: boolean;
}) {
	const last = lines[lines.length - 1] ?? "";
	const reduceMotion = useSyncExternalStore(
		subscribeReducedMotion,
		getReducedMotion,
		() => false,
	);
	const [index, setIndex] = useState(0);
	const [n, setN] = useState(0);
	const [phase, setPhase] = useState<"typing" | "deleting">("typing");

	const text = reduceMotion ? last : (lines[index] ?? "");
	const count = reduceMotion ? last.length : n;
	const isLast = index >= lines.length - 1;

	useEffect(() => {
		if (reduceMotion || !play) {
			return;
		}

		if (phase === "typing") {
			if (n < text.length) {
				const id = window.setTimeout(() => setN(n + 1), TYPE_MS);
				return () => window.clearTimeout(id);
			}

			if (isLast) {
				return;
			}

			const id = window.setTimeout(() => setPhase("deleting"), HOLD_MS);
			return () => window.clearTimeout(id);
		}

		if (n > 0) {
			const id = window.setTimeout(() => setN(n - 1), DELETE_MS);
			return () => window.clearTimeout(id);
		}

		const id = window.setTimeout(() => {
			setIndex((value) => value + 1);
			setPhase("typing");
		}, GAP_MS);

		return () => window.clearTimeout(id);
	}, [isLast, n, phase, play, reduceMotion, text]);

	return (
		<p className="font-mono text-[15px] leading-[2.2em] text-fg-dim min-[480px]:text-[16.5px]">
			<span className="sr-only">{last}</span>
			<span aria-hidden>
				<span className="text-accent">$&nbsp;</span>
				{text.slice(0, count)}
				<span className="caret" />
			</span>
		</p>
	);
}
