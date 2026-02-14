export default function handler(req, res) {
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors https://*.bitrix24.com https://*.bitrix24.eu https://*.bitrix24.de https://*.bitrix24.in;"
  );

  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Invoiced Sales</title>
<style>
body { font-family: Arial; padding: 20px; background:#f9fafb; }
table { width:100%; border-collapse: collapse; background:white; }
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
<th>Total</th>
</tr>
</thead>
<tbody>

<tr><td>Arts & Crafts</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Elementary Math</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Early Years</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Healthcare</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Literacy</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Physical Education</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Science</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Special Education</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>SI Manufacturing</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Technology</td><td></td><td></td><td></td><td></td><td></td></tr>

<tr class="total-row">
<td>Total</td>
<td></td>
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
}
