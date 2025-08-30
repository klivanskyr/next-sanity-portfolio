"use client";

import { ProjectWithTechNames } from "@/app/page";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { LayoutGridIcon, Rows3Icon } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

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
                (p.description && p.description.toLowerCase().includes(q)) || 
                (p.tech && p.tech.some(t => t.toLowerCase().includes(q)))
        );
        setShownProjects(filtered);
        console.log('Filtered projects:', filtered);
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
                <div className="absolute top-0 right-0">
                    <ModeSwitch mode={viewMode} setMode={setViewMode} />
                </div>
            </div>

            <div className="mt-6">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {shownProjects.map((project) => (
                            <Card
                                key={project._id}
                                className="hover:shadow-lg transition-shadow cursor-pointer border hover:border-primary"
                                onClick={() => { setSelectedProject(project); setOpenDialog(true); }}
                            >
                                <CardHeader>
                                    {project.image && (
                                        <div className="mb-2">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={600}
                                                height={400}
                                                className="rounded"
                                            />
                                        </div>
                                    )}
                                    <CardTitle className="text-xl">{project.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="h-full" />
                                <CardFooter className="flex flex-wrap gap-1 mt-2">
                                    {project.tech?.map((t) => (
                                        <span key={t} className="bg-muted px-2 py-0.5 rounded text-xs">{t}</span>
                                    ))}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {shownProjects.map((project) => (
                            <Card
                                key={project._id}
                                className="hover:shadow-lg transition-shadow cursor-pointer border hover:border-primary flex flex-row items-center gap-4 p-8"
                                onClick={() => { setSelectedProject(project); setOpenDialog(true); }}
                            >
                                <div className="flex-1">
                                    <CardHeader className="p-0">
                                        {project.image && (
                                            <div className="mb-2">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    width={600}
                                                    height={400}
                                                    className="rounded"
                                                />
                                            </div>
                                        )}
                                        <CardTitle className="text-lg">{project.title}</CardTitle>
                                        <CardDescription className="line-clamp-1">{project.description}</CardDescription>
                                    </CardHeader>
                                </div>
                                <CardContent className="flex-1" />
                                <CardFooter className="flex flex-wrap gap-1">
                                    {project.tech?.map((t) => (
                                        <span key={t} className="bg-muted px-2 py-0.5 rounded text-xs">{t}</span>
                                    ))}
                                </CardFooter>
                            </Card>
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
                                    <span className="mt-2 text-base text-foreground block">
                                        {selectedProject.description}
                                    </span>
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