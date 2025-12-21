import React from 'react'
import { motion } from "framer-motion";

function StatCard({ title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 border rounded-xl bg-white shadow-sm text-center"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </motion.div>
  );
}

export default StatCard