export default async function handler(req, res) {
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors https://*.bitrix24.com https://*.bitrix24.eu https://*.bitrix24.de https://*.bitrix24.in;"
  );

  // 1️⃣ Get company ID from Bitrix
  const placement = req.query.PLACEMENT_OPTIONS
    ? JSON.parse(req.query.PLACEMENT_OPTIONS)
    : null;

  if (!placement || !placement.ID) {
    return res.status(400).send("Company ID not provided by Bitrix.");
  }

  const companyId = placement.ID;

  // 2️⃣ Fetch company data from Bitrix
  const response = await fetch(
    `${process.env.BITRIX_WEBHOOK}/crm.company.get.json?id=${companyId}`
  );

  const result = await response.json();
  const company = result.result;

  // 3️⃣ NOW send HTML
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Sales Data</title>

<style>
body { font-family: Arial; padding:20px; background:#f9fafb; }
table { width:100%; border-collapse: collapse; background:white; margin-bottom:40px; }
th, td { border:1px solid #ccc; padding:8px; text-align:right; }
th:first-child, td:first-child { text-align:left; }
th { background:#f2f2f2; }
.total-row { font-weight:bold; background:#f5f5f5; }
</style>

</head>
<body>

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
<td>${format(company.UF_CRM_1770346519029)}</td>
<td>${format(company.UF_CRM_1770346601362)}</td>
<td>${format(company.UF_CRM_1770346643167)}</td>
<td>${format(company.UF_CRM_1770346666348)}</td>
</tr>

<tr class="total-row">
<td>Total</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>

</tbody>
</table>

<h2>Marketing Code Sales for Entire Sales Group</h2>

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
<td></td>
<td></td>
<td></td>
<td></td>
</tr>

<tr class="total-row">
<td>Total</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>

</tbody>
</table>

</body>
</html>
`);

  // 4️⃣ helper formatter
  function format(value) {
    if (!value) return "";
    return "$" + Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
