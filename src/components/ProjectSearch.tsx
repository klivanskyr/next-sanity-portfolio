'use client'
import {useMemo, useState} from 'react'
import {Input} from '@/components/ui/input'
import {motion} from 'framer-motion'

type Project = {
  _id: string; title: string; excerpt?: string; tech?: string[]
}

export default function ProjectSearch({projects}:{projects: Project[]}) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim()
    if (!needle) return projects
    return projects.filter(p => {
      const hay = [p.title, p.excerpt, ...(p.tech || [])].join(' ').toLowerCase()
      return hay.includes(needle)
    })
  }, [q, projects])

  return (
    <motion.div
      initial={{opacity: 0, y: 8}}
      animate={{opacity: 1, y: 0}}
      className="max-w-xl"
    >
      <Input
        placeholder="Search projects by title, summary, or tech…"
        value={q}
        onChange={e => setQ(e.target.value)}
        className="w-full"
      />
      <div className="mt-2 text-sm text-muted-foreground">{filtered.length} result(s)</div>
    </motion.div>
  )
}
