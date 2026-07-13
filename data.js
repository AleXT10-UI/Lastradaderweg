// Cloudflare Pages Function: /api/data
// Richiede un KV namespace collegato con binding "GESTIONALE_KV"

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const user = url.searchParams.get("user");
  if (!user) {
    return new Response("missing user", { status: 400 });
  }
  const value = await context.env.GESTIONALE_KV.get("data_" + user);
  if (value === null) {
    return new Response("", { status: 200 });
  }
  return new Response(value, {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost(context) {
  const url = new URL(context.request.url);
  const user = url.searchParams.get("user");
  if (!user) {
    return new Response("missing user", { status: 400 });
  }
  const body = await context.request.text();
  await context.env.GESTIONALE_KV.put("data_" + user, body);
  return new Response("ok", { status: 200 });
}
