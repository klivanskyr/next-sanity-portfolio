import { defineField, defineType, type SchemaTypeDefinition } from 'sanity'
import { DEFAULT_CIPHERS } from 'tls'

const workExperience = defineType({
  name: "workExperience",
  title: "Work Experience",
  type: "document",
  fields: [
    defineField({ name: "jobTitle", type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "isCurrent", type: "boolean", initialValue: false }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "description", type: "text" })
  ]
})

const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "institution", type: "string" }),
    defineField({ name: "degree", type: "string" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date" }),
  ]
})

const researchExperience = defineType({
  name: "researchExperience",
  title: "Research Experience",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "institution", type: "string" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
  ]
})

const technology = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "icon", type: "image", options: { hotspot: true } }),
  ]
})

const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "github", type: "url" }),
    defineField({
      name: "technologies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
  ]
})

const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "adjectives", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "shortBio", type: "string" }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "profileImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "resume", type: "file", options: { accept: '.pdf', storeOriginalFilename: true } }),
    defineField({ name: "linkedIn", type: "url" }),
    defineField({ name: "github", type: "url" }),
  ]
})

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [technology, project, workExperience, education, researchExperience, profile],
}