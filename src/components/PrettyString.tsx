"use client"

import { motion } from "framer-motion";

export default function PrettyString({ str }: { str: string }) {
    return (
        <h1 className="font-bold">
            {str.split(" ").map((word, idx) => (
                <span key={idx} className="inline-block">
                    {word.split("").map((char, cidx) => (
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 + cidx * 0.05 }}
                            key={cidx}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                    &nbsp;
                </span>
            ))}
        </h1>
    )
}