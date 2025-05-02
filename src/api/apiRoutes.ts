interface IApiRoutesData {
  component: string;
  [key: string]: unknown;
}
export async function apiRoutes() {
  const res = await fetch("/api/routes");
  const data = (await res.json()) as IApiRoutesData[];
  return data;
}
