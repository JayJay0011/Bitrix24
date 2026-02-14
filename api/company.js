export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Company ID missing" });
    }

    const response = await fetch(
      `${process.env.BITRIX_WEBHOOK}/crm.company.get.json?id=${id}`
    );

    const data = await response.json();

    res.status(200).json(data.result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
