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
import AllProjects from '@/components/AllProjects/AllProjects'

export const revalidate = 300; // ISR every 5 min

type Project = {
  _id: string
  title: string
  description?: string
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

export type ProjectWithTechNames = Project & { tech?: string[] }

async function getProjects(): Promise<Project[]> {
  const q = groq`*[_type == "project"]|order(publishedAt desc){
    _id, title, description, "image": image.asset->url, url, github, featured, technologies
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

async function getTechnologies(): Promise<Technology[]> {
  const q = groq`*[_type == "technology"]{
    _id, name, icon
  }`
  return sanityClient.fetch(q, {}, {next: {tags: ['technologies']}})
}

// async function getProjectsWithTech(): Promise<ProjectWithTechNames[]> {
//   const projects = await getProjects()
//   const technologies = await getTechnologies()
//   const techMap = new Map(technologies.map(t => [t._id, t.name]))
//   return projects.map(p => ({
//     ...p,
//     tech: p.tech?.map(tid => techMap.get(tid)).filter(Boolean) as string[] | undefined,
//   }))
// }

async function getProjectsWithTech(): Promise<ProjectWithTechNames[]> {
  const q = groq`*[_type == "project"]|order(publishedAt desc){
    _id, title, description, "image": image.asset->url, url, github, featured,
    technologies[]->{
      _id, name
    }
  }`

  const projects = await sanityClient.fetch(q, {}, {next: {tags: ['projects']}})
  return projects.map((p: any) => ({
    ...p,
    tech: p.technologies?.map((t: Technology) => t.name).filter(Boolean) as string[] | undefined,
  }))
}

export default async function Home() {
  const profile = await getProfile()
  const projectsWithTech = await getProjectsWithTech();

  return (
    <main className="container mx-auto px-4 py-10 space-y-8">
      <section className="w-full h-[95vh] flex flex-col justify-center items-center">
        <div className='w-[40vw] flex flex-col gap-4 justify-center items-center'>
          <PrettyString str={profile.name} />
          <ScrollingWords className="text-xl italic font-bold text-black/30" words={profile.adjectives!} speed={25} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 space-y-6">
        <AllProjects baseProjects={projectsWithTech} />
      </section>

      <section className="container mx-auto px-4 py-10 space-y-6">
        <ContactForm />
      </section>
    </main>
  )
}