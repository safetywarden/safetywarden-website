export default function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed'
    });
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    ok: true,
    service: 'safetywarden-website',
    timestamp: new Date().toISOString()
  });
}
