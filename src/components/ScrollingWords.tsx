"use client"

import { motion } from 'framer-motion'

export default function ScrollingWords({words, className, speed}: {words: string[]; className?: string; speed: number}) {
  // Duplicate the words for seamless looping
  const allWords = [...words, ...words];
  const wordClass = className ? className + " inline-block mx-3" : "inline-block mx-3";
  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <motion.div
        className="inline-flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        style={{ width: 'max-content' }}
      >
        {allWords.map((word, idx) => (
          <span key={idx} className={wordClass}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}