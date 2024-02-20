import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

const baseURL = process.env.NEXT_PUBLIC_API_CIELO,
  queryURL = process.env.NEXT_PUBLIC_API_CIELO_QUERY,
  isServer = typeof window === 'undefined'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    MerchantId: process.env.NEXT_PUBLIC_MERCAHNTID,
    MerchantKey: process.env.NEXT_PUBLIC_MERCAHNTKEY
  },
  withCredentials: true
})

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json(`Preconditions`, { status: 422 })
  }

  try {
    const resp = await api.get(`${queryURL}1/sales/${id}`)
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
    const resp = await api.post(`1/sales`, data)
    const headerDate =
      resp.headers && resp.headers.date ? resp.headers.date : 'no response date'
    return NextResponse.json(resp.data, { status: 201 })
  } catch (err) {
    const error = err as Error
    return NextResponse.json(error.message, { status: 500 })
  }
}
