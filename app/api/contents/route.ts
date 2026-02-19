type ApiError = {
    status: false
    message: string
}

export async function GET(): Promise<Response> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_APP}/api/content`;
    console.log('Fetching from:', url);
    try {
        const res = await fetch(
            url,
            {
                cache: 'no-store',
            }
        )

        if (!res.ok) {
            console.error('Fetch failed with status:', res.status);
            return Response.json(
                { status: false, message: `HTTP ${res.status}` } satisfies ApiError,
                { status: res.status }
            )
        }

        const data = await res.json();
        return Response.json(data)
    } catch (e) {
        console.error('Fetch error details:', e);
        return Response.json(
            { status: false, message: e instanceof Error ? e.message : 'Fetch error' },
            { status: 500 }
        )
    }
}
