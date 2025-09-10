import net from 'net';

export async function GET() {
  return new Promise<Response>((resolve) => {
    const s = net.connect(5432, 'postgres');
    const ok = () => (s.destroy(), resolve(new Response(JSON.stringify({ ok: true }), { status: 200 })));
    const fail = (e:any) => resolve(new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500 }));
    s.once('connect', ok);
    s.once('error', fail);
    setTimeout(() => fail('timeout'), 1500);
  });
}
