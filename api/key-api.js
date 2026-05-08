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

    // 🔥 Frontend key check
    if (key !== "mynk") {
      return res.status(403).json({
        status: false,
        message: "Invalid API Key"
      });
    }

    if (!term) {
      return res.status(400).json({
        status: false,
        message: "Missing term"
      });
    }

    // 🔥 New Backend API
    const url = `https://atof.onrender.com/full-search?aadhaar=${term}`;

    const r = await fetch(url);

    // 🔥 Check response
    if (!r.ok) {
      return res.status(500).json({
        status: false,
        message: "Backend API Failed"
      });
    }

    const data = await r.json();

    // 🔥 Remove unwanted fields
    delete data.dev_credit;
    delete data.credit;
    delete data.BUY_API;
    delete data.SUPPORT;

    // 🔥 Final clean response
    return res.status(200).json({
      status: true,
      result: data,
      BUY_API: "@mynk_mynk_mynk",
      SUPPORT: "@mynk_mynk_mynk"
    });

  } catch (e) {

    return res.status(500).json({
      status: false,
      message: "API Down",
      error: String(e)
    });

  }
}
