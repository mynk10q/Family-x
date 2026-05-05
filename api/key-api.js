export default async function handler(req, res) {

  // 🔥 CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // 🔥 Preflight
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

    // 🔥 Zephrex API
    const url = `https://www.zephrexdigital.site/api?key=${key}&type=RATION&term=${term}`;

    const r = await fetch(url);
    const data = await r.json();

    // 🔥 Remove unwanted fields safely
    if (data.dev_credit) delete data.dev_credit;
    if (data.credit) delete data.credit;

    // 🔥 Replace branding everywhere
    if (data.BUY_API) data.BUY_API = "@mynk_mynk_mynk";
    if (data.SUPPORT) data.SUPPORT = "@mynk_mynk_mynk";

    // 🔥 Final response
    return res.status(200).json({
      ...data,
      BUY_API: "@mynk_mynk_mynk",
      SUPPORT: "@mynk_mynk_mynk",
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
