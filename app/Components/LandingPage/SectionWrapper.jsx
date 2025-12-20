"use client";

import { motion } from "framer-motion";

export default function SectionWrapper({ children, className }) {
  return (
    <motion.section
      className={`w-full py-16 ${className || ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </motion.section>
  );
}
