import api from '@/app/utils/api'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json(`Preconditions`, { status: 422 })
  }

  try {
    const resp = await api.get(`subscriptions/${id}`)
    const headerDate =
      resp.headers && resp.headers.date ? resp.headers.date : 'no response date'
    return NextResponse.json(resp.data, { status: 200 })
  } catch (err) {
    const error = err as Error
    return NextResponse.json(error.message, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    const resp = await api.post('subscriptions', data)
    const headerDate =
      resp.headers && resp.headers.date ? resp.headers.date : 'no response date'
    return NextResponse.json(resp.data, { status: 200 })
  } catch (err) {
    const error = err as any
    return NextResponse.json(error.response.data.errors[0].description, {
      status: error.response.status
    })
  }
}
