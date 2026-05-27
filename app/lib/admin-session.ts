import { cookies } from 'next/headers'

export async function assertAdminSession() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sb-access-token')

  if (!accessToken?.value) {
    return { ok: false as const, error: 'Unauthorized' }
  }

  return { ok: true as const }
}

export function parseJsonStringArray(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== 'string') {
    return []
  }

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

export function parseJsonNumberArray(value: FormDataEntryValue | null): number[] {
  if (!value || typeof value !== 'string') {
    return []
  }

  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.map(Number).filter((id) => !Number.isNaN(id) && id > 0)
  } catch {
    return []
  }
}
