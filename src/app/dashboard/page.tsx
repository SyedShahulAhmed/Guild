import { getUser } from "@/lib/getUser";


export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome {user?.name}
      </h1>

      <p className="text-muted-foreground mt-2">
        Guild Dashboard
      </p>
    </div>
  );
}