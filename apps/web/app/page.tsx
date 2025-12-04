import { prisma } from "db/client";

export default async function Page() {
  const users = await prisma.user.findMany();
  return <div className="p-4">{JSON.stringify(users)}</div>;
}

export const revalidate = 60; // Revalidate every 60 seconds
// or
// export const dynamic = 'force-dynamic'; // Always fetch fresh data (dynamic-page)
