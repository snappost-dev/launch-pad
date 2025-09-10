import type { NextApiRequest, NextApiResponse } from 'next'
import net from 'node:net'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const s = net.connect(5432, 'postgres')
  const ok = () => { try { s.destroy() } catch {} ; res.status(200).json({ ok: true }) }
  const fail = (e: any) => { try { s.destroy() } catch {} ; res.status(500).json({ ok: false, error: String(e) }) }
  s.once('connect', ok)
  s.once('error', fail)
  setTimeout(() => fail('timeout'), 1500)
}
