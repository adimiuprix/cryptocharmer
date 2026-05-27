'use server'

import { prisma } from '@/app/lib/prisma'
import { assertAdminSession, parseJsonStringArray, parseJsonNumberArray } from '@/app/lib/admin-session'
import { revalidatePath } from 'next/cache'

export async function createContent(formData: FormData) {
  const session = await assertAdminSession()
  if (!session.ok) {
    return { success: false, error: session.error }
  }

  try {
    const name = formData.get('name') as string
    const headline = formData.get('headline') as string
    const categoryId = Number(formData.get('categoryId'))
    const walletIdRaw = formData.get('walletId')
    const walletId =
      walletIdRaw && String(walletIdRaw) !== ''
        ? Number(walletIdRaw)
        : null
    const highlight = formData.get('highlight') as string
    const link = formData.get('link') as string
    const logoUrl = formData.get('logoUrl') as string
    const badges = parseJsonStringArray(formData.get('badges'))
    const features = parseJsonStringArray(formData.get('features'))
    const currencyIds = parseJsonNumberArray(formData.get('currencyIds'))

    if (!name || !categoryId || Number.isNaN(categoryId)) {
      return { success: false, error: 'Name and Category are required.' }
    }

    if (walletId !== null && Number.isNaN(walletId)) {
      return { success: false, error: 'Invalid wallet.' }
    }

    const newContent = await prisma.$transaction(async (tx) => {
      const content = await tx.content.create({
        data: {
          name,
          headline,
          categoryId,
          walletId,
          highlight,
          link,
          logo: logoUrl || null,
          badges,
          features,
        },
      })

      if (currencyIds.length > 0) {
        await tx.contentCurrency.createMany({
          data: currencyIds.map((currencyId) => ({
            contentId: content.id,
            currencyId,
          })),
          skipDuplicates: true,
        })
      }

      return content
    })

    revalidatePath('/admin/content')
    revalidatePath('/admin')
    revalidatePath('/')
    
    return { success: true, data: newContent }
  } catch (error: any) {
    console.error('Error creating content:', error)
    return { success: false, error: error.message || 'Failed to create content' }
  }
}

export async function updateContent(id: number, formData: FormData) {
  const session = await assertAdminSession()
  if (!session.ok) {
    return { success: false, error: session.error }
  }

  try {
    const name = formData.get('name') as string
    const headline = formData.get('headline') as string
    const categoryId = Number(formData.get('categoryId'))
    const walletIdRaw = formData.get('walletId')
    const walletId =
      walletIdRaw && String(walletIdRaw) !== ''
        ? Number(walletIdRaw)
        : null
    const highlight = formData.get('highlight') as string
    const link = formData.get('link') as string
    const logoUrl = formData.get('logoUrl') as string
    const badges = parseJsonStringArray(formData.get('badges'))
    const features = parseJsonStringArray(formData.get('features'))
    const currencyIds = parseJsonNumberArray(formData.get('currencyIds'))

    if (!id || !name || !categoryId || Number.isNaN(categoryId)) {
      return { success: false, error: 'Name and Category are required.' }
    }

    if (walletId !== null && Number.isNaN(walletId)) {
      return { success: false, error: 'Invalid wallet.' }
    }

    const updatedContent = await prisma.$transaction(async (tx) => {
      const content = await tx.content.update({
        where: { id },
        data: {
          name,
          headline,
          categoryId,
          walletId,
          highlight,
          link,
          ...(logoUrl && { logo: logoUrl }), // Only update logo if provided
          badges,
          features,
        },
      })

      await tx.contentCurrency.deleteMany({ where: { contentId: id } })

      if (currencyIds.length > 0) {
        await tx.contentCurrency.createMany({
          data: currencyIds.map((currencyId) => ({
            contentId: id,
            currencyId,
          })),
          skipDuplicates: true,
        })
      }

      return content
    })

    revalidatePath('/admin/content')
    revalidatePath('/admin')
    revalidatePath('/')
    
    return { success: true, data: updatedContent }
  } catch (error: any) {
    console.error('Error updating content:', error)
    return { success: false, error: error.message || 'Failed to update content' }
  }
}

export async function deleteContent(id: number) {
  const session = await assertAdminSession()
  if (!session.ok) {
    return { success: false, error: session.error }
  }

  try {
    if (!id) {
      return { success: false, error: 'Content ID is required.' }
    }

    await prisma.content.delete({
      where: { id }
    })

    revalidatePath('/admin/content')
    revalidatePath('/admin')
    revalidatePath('/')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting content:', error)
    return { success: false, error: error.message || 'Failed to delete content' }
  }
}
