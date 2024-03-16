import api from '@/app/utils/api'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const type = req.nextUrl.searchParams.get('type')
  const id = params.id

  if (!id) {
    return NextResponse.json(`Preconditions`, { status: 422 })
  }

  if (type === 'boleto') {
    try {
      const resp = await api.get(`payments/${id}/identificationField`)
      const respx = await api.get(`payments/${id}/pixQrCode`)

      return NextResponse.json(
        {
          ...resp.data,
          encodedImage: respx.data.encodedImage,
          payload: respx.data.payload
        },
        { status: 200 }
      )
    } catch (err) {
      const error = err as Error
      return NextResponse.json(error.message, { status: 500 })
    }
  } else {
    try {
      const resp = await api.get(`payments/${id}/pixQrCode`)
      const headerDate =
        resp.headers && resp.headers.date
          ? resp.headers.date
          : 'no response date'
      return NextResponse.json(resp.data, { status: 200 })
    } catch (err) {
      const error = err as Error
      return NextResponse.json(error.message, { status: 500 })
    }
  }
}
