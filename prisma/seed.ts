import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...\n");

  // ─── 1. Admin ──────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin", 12);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: { password: hashedPassword },
    create: { username: "admin", password: hashedPassword },
  });
  console.log("✅ Admin seeded (username: admin / password: admin)");

  // ─── 2. Categories ─────────────────────────────────────────
  const category = await prisma.category.upsert({
    where: { name: "Faucet & PTC" },
    update: {},
    create: { name: "Faucet & PTC" },
  });
  console.log(`✅ Category seeded: ${category.name}`);

  // ─── 3. Wallets ────────────────────────────────────────────
  const walletsData = [
    { provider: "Binance", isSupported: true },
    { provider: "FaucetPay", isSupported: true },
  ];
  for (const data of walletsData) {
    await prisma.wallet.upsert({
      where: { provider: data.provider },
      update: { isSupported: data.isSupported },
      create: data,
    });
  }
  const wallet = await prisma.wallet.findFirst();
  console.log(`✅ Wallets seeded: ${walletsData.map((w) => w.provider).join(", ")}`);

  // ─── 4. Currencies ─────────────────────────────────────────
  const currenciesData = [
    { code: "BTC", name: "Bitcoin", icon: "btc.svg", network: "Bitcoin" },
    { code: "LTC", name: "Litecoin", icon: "ltc.svg", network: "Litecoin" },
    { code: "TRX", name: "Tron", icon: "trx.svg", network: "TRC20" },
    { code: "BNB", name: "Binance Coin", icon: "bnb.svg", network: "BEP20" },
    { code: "DOGE", name: "Dogecoin", icon: "doge.svg", network: "Dogecoin" },
  ];
  const currencies = [];
  for (const data of currenciesData) {
    const currency = await prisma.currency.upsert({
      where: { code: data.code },
      update: { name: data.name, icon: data.icon, network: data.network },
      create: data,
    });
    currencies.push(currency);
  }
  console.log(`✅ Currencies seeded: ${currencies.map((c) => c.code).join(", ")}`);

  // ─── 5. Contents (with pivot ContentCurrency) ──────────────
  if (wallet) {
    // Upsert content by name (cari dulu, lalu buat atau update)
    let content = await prisma.content.findFirst({
      where: { name: "Earnbitmoon" },
    });

    if (!content) {
      content = await prisma.content.create({
        data: {
          name: "Earnbitmoon",
          logo: "32196.png",
          headline: "💸 Free crypto - Instant withdraw!",
          categoryId: category.id,
          badges: ["TOP"],
          highlight: "Claim up to $2 every 5 minutes",
          features: [
            "Level up & increase your reward",
            "View PTC ads & earn free crypto",
            "Surveys and Offerwalls",
            "Earn more with account upgrade",
            "Min. withdraw: $0.20 (Instant)",
            "FaucetPay and Payeer supported, You must complete at least 30",
            "faucet claims, before being able to withdraw your funds!",
          ],
          walletId: wallet.id,
          link: "https://earnbitmoon.club/?ref=423418",
        },
      });
    } else {
      content = await prisma.content.update({
        where: { id: content.id },
        data: {
          logo: "32196.png",
          headline: "💸 Free crypto - Instant withdraw!",
          categoryId: category.id,
          badges: ["TOP"],
          highlight: "Claim up to $2 every 5 minutes",
          features: [
            "Level up & increase your reward",
            "View PTC ads & earn free crypto",
            "Surveys and Offerwalls",
            "Earn more with account upgrade",
            "Min. withdraw: $0.20 (Instant)",
            "FaucetPay and Payeer supported, You must complete at least 30",
            "faucet claims, before being able to withdraw your funds!",
          ],
          walletId: wallet.id,
          link: "https://earnbitmoon.club/?ref=423418",
        },
      });
    }

    // Sync currencies ke pivot table (mirip ->sync() di Laravel)
    await prisma.contentCurrency.deleteMany({
      where: { contentId: content.id },
    });
    await prisma.contentCurrency.createMany({
      data: currencies.map((c) => ({
        contentId: content!.id,
        currencyId: c.id,
      })),
      skipDuplicates: true,
    });

    console.log(
      `✅ Content seeded: "${content.name}" ` +
        `(linked to ${currencies.length} currencies)`
    );
  }

  console.log("\n🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
