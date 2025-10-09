"use client";

import React, { ReactNode } from "react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";

type FloatingButtonProps = {
	className?: string;
	children: ReactNode;
	triggerContent: ReactNode;
};

type FloatingButtonItemProps = {
	children: ReactNode;
};

const list = {
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			staggerDirection: -1,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			when: "afterChildren",
			staggerChildren: 0.1,
		},
	},
};

const item = {
	visible: { opacity: 1, y: 0 },
	hidden: { opacity: 0, y: 5 },
};

const btn = {
	visible: { rotate: "45deg" },
	hidden: { rotate: 0 },
};

function FloatingButton({ children, triggerContent }: FloatingButtonProps) {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = React.useState(false);

	useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false),
	);

	const controls = useDragControls();

	console.log({ controls: controls.start });

	const [dragState, dragSetState] = React.useState({
		x: null,
		y: null,
	});
	function onDrag(event, info) {
		console.log(info.point.x, info.point.y);

		dragSetState({
			x: info.point.x,
			y: info.point.y,
		});

		console.log({ dragState });
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<AnimatePresence>
				<motion.div
					drag
					dragControls={controls}
					whileDrag={{
						pointerEvents: "none",
					}}
					dragPropagation
					key="button"
					variants={btn}
					animate={isOpen ? "visible" : "hidden"}
					// ref={ref}
					onClick={() => setIsOpen(!isOpen)}
					// className="cursor-pointer"
				>
					{triggerContent}
				</motion.div>
				<div>
					<motion.ul
						key="list"
						className="flex flex-col items-center gap-3"
						initial="hidden"
						animate={isOpen ? "visible" : "hidden"}
						variants={list}
						onPointerDown={(e) => {
							controls.start(e);
						}}
					>
						{children}
					</motion.ul>
				</div>
			</AnimatePresence>
		</div>
	);
}

function FloatingButtonItem({ children }: FloatingButtonItemProps) {
	return <motion.li variants={item}>{children}</motion.li>;
}

export { FloatingButton, FloatingButtonItem };
