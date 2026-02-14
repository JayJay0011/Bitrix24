export default async function handler(req, res) {
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors https://*.bitrix24.com https://*.bitrix24.eu https://*.bitrix24.de https://*.bitrix24.in;"
  );

  try {
const companyId = req.query.ID || req.query.COMPANY_ID;

if (!companyId) {
  return res.status(400).send("Company ID not provided by Bitrix.");
}

    const response = await fetch(
      `${process.env.BITRIX_WEBHOOK}/crm.company.get.json?id=${companyId}`
    );

    const json = await response.json();

if (!json.result) {
  return res.status(500).send("Bitrix did not return company data. Check webhook or company ID.");
}

const c = json.result;

    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Sales Data</title>
        <style>
          body { font-family: Arial; padding:20px; background:#f9fafb; }
          table { width:100%; border-collapse:collapse; background:white; margin-bottom:40px; }
          th, td { border:1px solid #ccc; padding:8px; text-align:right; }
          th:first-child, td:first-child { text-align:left; }
          th { background:#f2f2f2; }
          .total-row { font-weight:bold; background:#f5f5f5; }
          h2 { margin-bottom:15px; }
        </style>
      </head>
      <body>

        ${buildInvoicedTable(c)}
        ${buildMarketingTable(c)}

      </body>
      </html>
    `);

  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

/* ---------- FORMATTER ---------- */

function money(val) {
  if (!val) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(Number(val));
}

/* ---------- TABLE 1 ---------- */

function buildInvoicedTable(c) {
  return `
  <h2>Invoiced Sales for Entire Sales Group</h2>
  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>YTD</th>
        <th>Last Year</th>
        <th>2 Years Ago</th>
        <th>3 Years Ago</th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <td>Arts & Crafts</td>
        <td>${money(c.UF_CRM_1770346519029)}</td>
        <td>${money(c.UF_CRM_1770346601362)}</td>
        <td>${money(c.UF_CRM_1770346643167)}</td>
        <td>${money(c.UF_CRM_1770346666348)}</td>
      </tr>

      <tr class="total-row">
        <td>Total</td>
        <td>${money(c.UF_CRM_1770555237026)}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>

    </tbody>
  </table>
  `;
}

/* ---------- TABLE 2 ---------- */

function buildMarketingTable(c) {
  return `
  <h2>Marketing Code Sales</h2>
  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>YTD</th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <td>Arts & Crafts</td>
        <td>${money(c.UF_CRM_1770387505317)}</td>
      </tr>

      <tr class="total-row">
        <td>Total</td>
        <td>${money(c.UF_CRM_1770749305699)}</td>
      </tr>

    </tbody>
  </table>
  `;
}
