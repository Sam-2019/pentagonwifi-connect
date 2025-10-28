"use client";

import React, { ReactNode } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion, useDragControls } from "motion/react";

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

  const dragControls = useDragControls();

  function startDrag(event: React.PointerEvent<Element> | PointerEvent) {
    dragControls.start(event);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.ul
        key="list"
        drag
        variants={list}
        initial="hidden"
        dragListener={false}
        whileDrag={{ pointerEvents: "none" }}
        dragControls={dragControls}
        animate={isOpen ? "visible" : "hidden"}
        dragConstraints={{ left: -850, right: 50, top: -450, bottom: 550 }}
      >
        {children}
      </motion.ul>

      <motion.div
        drag
        key="button"
        variants={btn}
        dragPropagation
        onPointerDown={startDrag}
        onClick={() => setIsOpen(!isOpen)}
        whileDrag={{ pointerEvents: "none" }}
        animate={isOpen ? "visible" : "hidden"}
        dragConstraints={{ left: -850, right: 50, top: -450, bottom: 550 }}
      >
        {triggerContent}
      </motion.div>
    </div>
  );
}

function FloatingButtonItem({ children }: FloatingButtonItemProps) {
  return <motion.li variants={item}>{children}</motion.li>;
}

export { FloatingButton, FloatingButtonItem };
