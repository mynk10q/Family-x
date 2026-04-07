export default async function handler(req, res) {
  
  // 🔥 CORS headers (IMPORTANT)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // 🔥 OPTIONS request handle (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    const { term, key } = req.query;

    if (!term || !key) {
      return res.status(400).json({
        status: false,
        message: "Missing parameters"
      });
    }

    const url =
      `https://familyyyy-info.vercel.app/key-api?key=${key}&term=${term}`;

    const r = await fetch(url);
    const data = await r.json();

    // 🔥 unwanted fields remove
    delete data.dev_credit;
    delete data.credit;

    return res.status(200).json({
      ...data,
      dev_credit: "@mynk_mynk_mynk",
      credit: "@mynk_mynk_mynk"
    });

  } catch (e) {

    return res.status(500).json({
      status: false,
      message: "API Down",
      error: String(e)
    });

  }
}
