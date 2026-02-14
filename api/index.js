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
<title>Sales Data</title>

<script src="https://api.bitrix24.com/api/v1/"></script>

<style>
body { font-family: Arial; padding:20px; background:#f9fafb; }
table { width:100%; border-collapse: collapse; background:white; margin-bottom:40px;}
th, td { border:1px solid #ccc; padding:8px; text-align:right; }
th:first-child, td:first-child { text-align:left; }
th { background:#f2f2f2; }
.total-row { font-weight:bold; background:#f5f5f5; }
h2 { margin-top:40px; }
</style>
</head>
<body>

<h2>Invoiced Sales for Entire Sales Group</h2>
<table id="chart1">
<thead>
<tr>
<th>Category</th>
<th>YTD</th>
<th>Last Year</th>
<th>2 Years Ago</th>
<th>3 Years Ago</th>
</tr>
</thead>
<tbody></tbody>
</table>

<h2>Marketing Code Sales for Entire Sales Group</h2>
<table id="chart2">
<thead>
<tr>
<th>Category</th>
<th>YTD</th>
<th>Last Year</th>
<th>2 Years Ago</th>
<th>3 Years Ago</th>
</tr>
</thead>
<tbody></tbody>
</table>

<script>

function formatCurrency(value) {
  if (!value) return "$0.00";
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(parseFloat(value));
}

const categories = [
  "Arts & Crafts",
  "Elementary Math",
  "Early Years",
  "Healthcare",
  "Literacy",
  "Physical Education",
  "Science",
  "Special Education",
  "SI Manufacturing",
  "Technology"
];

BX24.init(function() {

  BX24.placement.info(function(data) {

    const companyId = data.options.ID;

    fetch('/api/company?id=' + companyId)
      .then(res => res.json())
      .then(company => {

        const chart1Body = document.querySelector("#chart1 tbody");
        const chart2Body = document.querySelector("#chart2 tbody");

        categories.forEach(cat => {

          const row1 = document.createElement("tr");
          const row2 = document.createElement("tr");

          row1.innerHTML = \`
            <td>\${cat}</td>
            <td>$0.00</td>
            <td>$0.00</td>
            <td>$0.00</td>
            <td>$0.00</td>
          \`;

          row2.innerHTML = \`
            <td>\${cat}</td>
            <td>$0.00</td>
            <td>$0.00</td>
            <td>$0.00</td>
            <td>$0.00</td>
          \`;

          chart1Body.appendChild(row1);
          chart2Body.appendChild(row2);

        });

      });

  });

});

</script>

</body>
</html>
`);
}
