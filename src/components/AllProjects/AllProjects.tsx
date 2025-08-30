"use client";

import { ProjectWithTechNames } from "@/app/page";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { LayoutGridIcon, Rows3Icon } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type ViewMode = 'grid' | 'list';

export default function AllProjects({baseProjects}: {baseProjects: ProjectWithTechNames[]}) {
    const [shownProjects, setShownProjects] = useState<ProjectWithTechNames[]>(baseProjects);
    const [query, setQuery] = useState<string>('');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<ProjectWithTechNames | null>(null);

    useEffect(() => {
        if (!query || query.trim() === '') {
            setShownProjects(baseProjects);
            return;
        }

        const q = query.toLowerCase().trim();
        const filtered = baseProjects.filter(
            p => 
                p.title.toLowerCase().includes(q) || 
                (p.desciption && p.desciption.toLowerCase().includes(q)) || 
                (p.tech && p.tech.some(t => t.toLowerCase().includes(q)))
        );
        setShownProjects(filtered);
    }, [query, baseProjects]);

    return (
        <div>
            <div className="space-y-2 relative">
                <h1 className="text-3xl font-bold">Projects</h1>
                <p className="text-muted-foreground">Recent work and case studies</p>
                <Input
                    placeholder="Search projects by title, summary, or tech…"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="w-full max-w-md mb-4"
                />
                <div className="absolute right-0">
                    <ModeSwitch mode={viewMode} setMode={setViewMode} />
                </div>
            </div>

            <div className="mt-6">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {shownProjects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-card rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-4 flex flex-col gap-2 border border-border hover:border-primary"
                                onClick={() => { setSelectedProject(project); setOpenDialog(true); }}
                            >
                                <h2 className="text-xl font-semibold">{project.title}</h2>
                                <p className="text-muted-foreground line-clamp-2">{project.desciption}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {project.tech?.map((t) => (
                                        <span key={t} className="bg-muted px-2 py-0.5 rounded text-xs">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {shownProjects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-card rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-4 flex flex-row items-center gap-4 border border-border hover:border-primary"
                                onClick={() => { setSelectedProject(project); setOpenDialog(true); }}
                            >
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold">{project.title}</h2>
                                    <p className="text-muted-foreground line-clamp-1">{project.desciption}</p>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {project.tech?.map((t) => (
                                        <span key={t} className="bg-muted px-2 py-0.5 rounded text-xs">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-lg">
                    {selectedProject && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedProject.title}</DialogTitle>
                                <DialogDescription>
                                    <div className="mt-2 text-base text-foreground">
                                        {selectedProject.desciption}
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                <div className="font-semibold mb-1">Tech Stack:</div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tech?.map((t) => (
                                        <span key={t} className="bg-muted px-2 py-0.5 rounded text-xs">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

function ModeSwitch({ mode, setMode }: { mode: ViewMode, setMode: (mode: ViewMode) => void }) {
    return (
        <div className="relative flex flex-row gap-2 w-full items-center justify-start h-12 max-w-[96px] bg-muted rounded-full p-1">
            <div className="relative z-10">
                {mode === 'grid' && (
                    <motion.div
                        layoutId="mode-switch-bubble"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="absolute top-0 left-0 w-10 h-10 rounded-full bg-black/20 z-0"
                    />
                )}
                <button
                    className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${mode === 'grid' ? 'text-primary' : 'text-muted-foreground'}`}
                    onClick={() => setMode('grid')}
                    aria-label="Grid view"
                >
                    <LayoutGridIcon />
                </button>
            </div>
            <div className="relative z-10">
                {mode === 'list' && (
                    <motion.div
                        layoutId="mode-switch-bubble"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="absolute top-0 left-0 w-10 h-10 rounded-full bg-black/20 z-0"
                    />
                )}
                <button
                    className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${mode === 'list' ? 'text-primary' : 'text-muted-foreground'}`}
                    onClick={() => setMode('list')}
                    aria-label="List view"
                >
                    <Rows3Icon />
                </button>
            </div>
        </div>
    )
}