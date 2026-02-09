type ApiError = {
  status: false
  message: string
}

export async function GET(): Promise<Response> {
    try {
        const res = await fetch('https://tascen.site/api/content', {
            cache: 'no-cache',
            // next: { revalidate: 60 },
        })

        if (!res.ok) {
            return Response.json(
                { status: false, message: `HTTP ${res.status}` } satisfies ApiError,
                { status: res.status }
            )
        }

        return Response.json(await res.json())
    } catch (e) {
        return Response.json(
        { status: false, message: e instanceof Error ? e.message : 'Fetch error' },
        { status: 500 }
        )
    }
}