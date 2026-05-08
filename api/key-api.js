export default async function handler(req, res) {

  // 🔥 CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    const { term, key } = req.query;

    // 🔐 Frontend key
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

    // 🔥 Backend API
    const url = `https://atof.onrender.com/full-search?aadhaar=${term}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "user-agent": "Mozilla/5.0"
      }
    });

    // 🔥 Raw text
    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        status: false,
        message: "Invalid JSON From Backend",
        raw: text
      });
    }

    // 🔥 Remove credits
    delete data.dev_credit;
    delete data.credit;
    delete data.BUY_API;
    delete data.SUPPORT;

    // 🔥 Final response
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
