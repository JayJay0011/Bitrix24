export default async function handler(req, res) {
  const DOMAIN = process.env.BITRIX_DOMAIN;
  const TOKEN = process.env.BITRIX_TOKEN;

  const response = await fetch(
    `https://${DOMAIN}/rest/${TOKEN}/crm.company.fields.json`
  );

  const data = await response.json();

  res.status(200).json(data);
}
