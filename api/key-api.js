import axios from "axios";

export default async function handler(req, res) {
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

    const response = await axios.get(url);

    const data = { ...response.data };

    delete data.dev_credit;
    delete data.credit;

    return res.status(200).json({
      ...data,
      dev_credit: "@mynk_mynk_mynk",
      credit: "@mynk_mynk_mynk"
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "API Down"
    });
  }
}
