import { prisma } from "db/client";

export default async function Page() {
  const users = await prisma.user.findMany();
  return <div className="p-4">{JSON.stringify(users)}</div>;
}
