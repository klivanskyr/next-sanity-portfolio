'use client'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'

export default function ContactForm(){
  const [pending,setPending]=useState(false)
  const [ok,setOk]=useState<boolean|null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setPending(true);
    const fd = new FormData(form);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(fd))
    });
    setOk(res.ok);
    setPending(false);
    if (res.ok) form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <Input name="name" placeholder="Your name" required />
      <Input type="email" name="email" placeholder="you@example.com" required />
      <Textarea name="message" placeholder="How can I help?" required />
      <Button type="submit" disabled={pending}>{pending?'Sending…':'Send'}</Button>
      {ok===true && <p className="text-green-600 text-sm">Thanks! I’ll reply soon.</p>}
      {ok===false && <p className="text-red-600 text-sm">Something went wrong. Try again.</p>}
    </form>
  )
}
