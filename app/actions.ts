"use server";

import { prisma } from "./lib/prisma";
import { assertAdminSession } from "./lib/admin-session";
import { revalidatePath } from "next/cache";
import { storageClient, BUCKET_NAME, UPLOAD_FOLDER } from "./lib/storage";

export async function getContents() {
  try {
    const contents = await prisma.content.findMany({
      include: {
        category: true,
        wallet: true,
        currencies: {
          include: {
            currency: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: contents };
  } catch (error) {
    console.error("Failed to fetch contents:", error);
    return { success: false, error: "Gagal mengambil data konten." };
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return { success: false, error: "Gagal mengambil data kategori." };
  }
}

export async function getWallets() {
  try {
    const wallets = await prisma.wallet.findMany({
      orderBy: { provider: "asc" },
    });
    return { success: true, data: wallets };
  } catch (error) {
    console.error("Failed to fetch wallets:", error);
    return { success: false, error: "Gagal mengambil data dompet." };
  }
}

export async function createContent(formData: {
  name: string;
  logo?: string;
  headline?: string;
  categoryId: number;
  badges?: string[];
  highlight?: string;
  features?: string[];
  walletId?: number;
  link?: string;
}) {
  const session = await assertAdminSession();
  if (!session.ok) {
    return { success: false, error: session.error };
  }

  try {
    const { name, logo, headline, categoryId, badges, highlight, features, walletId, link } = formData;
    if (!name || !categoryId) {
      return { success: false, error: "Nama dan Kategori diperlukan." };
    }

    const newContent = await prisma.content.create({
      data: {
        name,
        logo: logo || null,
        headline: headline || null,
        categoryId,
        badges: badges || undefined,
        highlight: highlight || null,
        features: features || undefined,
        walletId: walletId || null,
        link: link || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/earn-crypto");
    return { success: true, data: newContent };
  } catch (error) {
    console.error("Failed to create content:", error);
    return { success: false, error: "Gagal membuat konten baru." };
  }
}

export async function updateContent(
  id: number,
  formData: {
    name: string;
    logo?: string;
    headline?: string;
    categoryId: number;
    badges?: string[];
    highlight?: string;
    features?: string[];
    walletId?: number;
    link?: string;
  }
) {
  const session = await assertAdminSession();
  if (!session.ok) {
    return { success: false, error: session.error };
  }

  try {
    const { name, logo, headline, categoryId, badges, highlight, features, walletId, link } = formData;
    if (!id || !name || !categoryId) {
      return { success: false, error: "Input data tidak valid." };
    }

    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        name,
        logo: logo || null,
        headline: headline || null,
        categoryId,
        badges: badges || undefined,
        highlight: highlight || null,
        features: features || undefined,
        walletId: walletId || null,
        link: link || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/earn-crypto");
    return { success: true, data: updatedContent };
  } catch (error) {
    console.error("Failed to update content:", error);
    return { success: false, error: "Gagal memperbarui konten." };
  }
}

export async function deleteContent(id: number) {
  const session = await assertAdminSession();
  if (!session.ok) {
    return { success: false, error: session.error };
  }

  try {
    if (!id) {
      return { success: false, error: "ID konten diperlukan." };
    }

    await prisma.content.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/earn-crypto");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete content:", error);
    return { success: false, error: "Gagal menghapus konten." };
  }
}

export async function uploadLogo(formData: FormData) {
  const session = await assertAdminSession();
  if (!session.ok) {
    return { success: false, error: session.error };
  }

  try {
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: "Tidak ada berkas yang diunggah." };
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split('.').pop();
    const fileName = `${UPLOAD_FOLDER}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;

    const { data, error } = await storageClient
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        duplex: 'half',
      } as any);

    if (error) {
      console.error("Supabase upload error:", error);
      return { success: false, error: `Gagal mengunggah ke Supabase: ${error.message}` };
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://daenabjkvmvbwcumjllq.supabase.co';
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Gagal memproses unggahan gambar." };
  }
}
