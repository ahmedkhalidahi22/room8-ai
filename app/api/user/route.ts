export async function GET() {
  return new Response("SSSSSSSSUP man");
}

export async function POST(request: Request) {
  const user = await request.json();

  console.log(user);

  return new Response("adhelllooo");
}
