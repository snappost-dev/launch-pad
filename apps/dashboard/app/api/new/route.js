import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET() {
  return new Response(JSON.stringify({ ok:true, route:"/api/new", method:"GET" }), {
    status: 200, headers: { "content-type":"application/json" }
  });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = (body?.name || 'myapp').toString().replace(/[^a-z0-9-_]/gi,'');
    const base = process.env.GENERATED_DIR || path.join(process.cwd(), '.generated');
    const ts = new Date().toISOString().replace(/[:.]/g,'-');
    const target = path.join(base, `${name}-${ts}`);
    await fs.mkdir(target, { recursive: true });
    await fs.writeFile(path.join(target, 'README.txt'),
      `Created ${new Date().toISOString()} by Launchpad\n`);
    return new Response(JSON.stringify({ ok:true, dir: target }), {
      status: 200, headers: { "content-type":"application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok:false, error:String(e) }), {
      status: 500, headers: { "content-type":"application/json" }
    });
  }
}
