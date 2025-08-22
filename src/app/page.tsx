/* eslint-disable @typescript-eslint/no-explicit-any */
import {sanityClient} from '@/lib/sanity.client'
import {groq} from 'next-sanity'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity.image'
import ProjectSearch from '@/components/ProjectSearch'
import ContactForm from '@/components/ContactForm'
import {Card, CardContent} from '@/components/ui/card'
import PrettyString from '@/components/PrettyString'
import ScrollingWords from '@/components/ScrollingWords'

export const revalidate = 300; // ISR every 5 min

type Project = {
  _id: string
  title: string
  desciption?: string
  image?: any
  url: string
  github?: string
  featured?: boolean
}

type Profile = {
  name: string
  role: string
  adjectives?: string[]
  shortBio?: string
  bio?: string
  profileImage?: any
  email?: string
  resume?: { asset: { url: string } }
  linkedIn?: string
  github?: string
}

// type WorkExperience = {
//   _id: string
//   jobTitle: string
//   company: string
//   startDate: string
//   endDate?: string
//   location?: string
//   isCurrent?: boolean
//   url?: string
//   logo?: any
//   highlights?: string[]
//   description?: string
// }

// type Education = {
//   _id: string
//   institution: string
//   degree: string
//   startDate: string
//   endDate?: string
//   url?: string
//   highlights?: string[]
// }

// type ResearchExperience = {
//   _id: string
//   title: string
//   institution: string
//   startDate: string
//   endDate?: string
//   url?: string
//   highlights?: string[]
// }

type Technology = {
  _id: string
  name: string
  icon?: any
}

type ProjectWithTechNames = Project & { tech?: string[] }

async function getProjects(): Promise<Project[]> {
  const q = groq`*[_type == "project"]|order(publishedAt desc){
    _id, title, slug, excerpt, heroImage, tech, publishedAt
  }`
  // tag: 'projects' lets us trigger revalidateTag('projects') from a webhook
  return sanityClient.fetch(q, {}, {next: {tags: ['projects']}})
}

// async function getWorkExperiences(): Promise<WorkExperience[]> {
//   const q = groq`*[_type == "workExperience"]|order(startDate desc){
//     _id, jobTitle, company, startDate, endDate, location, isCurrent, url, logo, highlights, description
//   }`
//   return sanityClient.fetch(q, {}, {next: {tags: ['workExperiences']}})
// }

// async function getEducation(): Promise<Education[]> {
//   const q = groq`*[_type == "education"]|order(startDate desc){
//     _id, institution, degree, startDate, endDate, url, highlights
//   }`
//   return sanityClient.fetch(q, {}, {next: {tags: ['education']}})
// }

// async function getResearchExperiences(): Promise<ResearchExperience[]> {
//   const q = groq`*[_type == "researchExperience"]|order(startDate desc){
//     _id, title, institution, startDate, endDate, url, highlights
//   }`
//   return sanityClient.fetch(q, {}, {next: {tags: ['researchExperiences']}})
// }

async function getProfile(): Promise<Profile> {
  const q = groq`*[_type == "profile"][0]{
    name, role, adjectives, shortBio, bio, profileImage, email, resume, linkedIn, github
  }`
  return sanityClient.fetch(q, {}, {next: {tags: ['profile']}})
}

// async function getTechnologies(): Promise<Technology[]> {
//   const q = groq`*[_type == "technology"]{
//     _id, name, icon
//   }`
//   return sanityClient.fetch(q, {}, {next: {tags: ['technologies']}})
// }

// async function getProjectsWithTech(): Promise<ProjectWithTechNames[]> {
//   const projects = await getProjects()
//   const technologies = await getTechnologies()
//   const techMap = new Map(technologies.map(t => [t._id, t.name]))
//   return projects.map(p => ({
//     ...p,
//     tech: p.tech?.map(tid => techMap.get(tid)).filter(Boolean) as string[] | undefined,
//   }))
// }

export default async function Home() {
  const projects = await getProjects()
  const profile = await getProfile()

  return (
    <main className="container mx-auto px-4 py-10 space-y-8">
      <section className="w-full h-[95vh] flex flex-col justify-center items-center">
        <div className='w-[40vw] flex flex-col gap-4 justify-center items-center'>
          <PrettyString str={profile.name} />
          <ScrollingWords className="text-xl italic font-bold text-black/30" words={profile.adjectives!} speed={25} />
        </div>
      </section>

      <section className="space-y-2" id="projects">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">Recent work and case studies</p>
      </section>

      <ProjectSearch projects={projects} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => (
          <Card key={p._id} className="overflow-hidden">
            <CardContent className="p-0">
              {p.heroImage && (
                <Image
                  src={urlFor(p.heroImage).width(1200).height(800).fit('crop').url()}
                  alt={p.title}
                  width={1200}
                  height={800}
                  className="h-48 w-full object-cover"
                  priority={false}
                />
              )}
              <div className="p-4 space-y-2">
                <h2 className="font-semibold">{p.title}</h2>
                {p.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>}
                {p.tech?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => <span key={t} className="text-xs bg-muted px-2 py-1 rounded">{t}</span>)}
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ContactForm />
    </main>
  )
}