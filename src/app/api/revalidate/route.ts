import {NextResponse} from 'next/server'
import {revalidateTag} from 'next/cache'

export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ok:false}, {status:401})
  }
  // keep it simple: always revalidate the main tag used above
  revalidateTag('projects')
  return NextResponse.json({revalidated:true, now: Date.now()})
}
