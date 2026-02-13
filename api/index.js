export default async function handler(req, res) {

  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors https://*.bitrix24.com https://*.bitrix24.eu https://*.bitrix24.de https://*.bitrix24.in;"
  );

  try {

    // Get company ID from Bitrix placement
    const companyId = req.query.ID || 1; // fallback to 1 for testing

    const response = await fetch(
      `${process.env.BITRIX_WEBHOOK}/crm.company.get.json?id=${companyId}`
    );

    const data = await response.json();

    res.status(200).send(`
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Debug Output</title>
          <style>
            body { font-family: monospace; padding:20px; background:#f7f7f7; }
            pre { white-space: pre-wrap; word-break: break-word; }
          </style>
        </head>
        <body>
          <h2>Company Debug Data</h2>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </body>
      </html>
    `);

  } catch (error) {

    res.status(500).send("Error: " + error.message);

  }
}
