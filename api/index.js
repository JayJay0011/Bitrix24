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


import Bitrix24 from 'bitrix24-js'

const bx = new Bitrix24()

document.addEventListener("DOMContentLoaded", async () => {
  await bx.init()

  const companyId = bx.placement.options.ID

  const company = await bx.callMethod('crm.company.get', {
    id: companyId
  })

  const data = company.data()

  const map = {
    "Arts & Crafts": {
      ytd: "UF_CRM_1770346519029",
      last: "UF_CRM_1770346601362",
      two: "UF_CRM_1770346643167",
      three: "UF_CRM_1770346666348",
      total: "UF_CRM_1770555237026"
    },
    "Elementary Math": {
      ytd: "UF_CRM_1770346926448",
      last: "UF_CRM_1770346992533",
      two: "UF_CRM_1770347026066",
      three: "UF_CRM_1770347079857",
      total: "UF_CRM_1770555272698"
    },
    "Early Years": {
      ytd: "UF_CRM_1770360667616",
      last: "UF_CRM_1770360695368",
      two: "UF_CRM_1770360720872",
      three: "UF_CRM_1770360751650",
      total: "UF_CRM_1770555294583"
    },
    "Healthcare": {
      ytd: "UF_CRM_1770360789212",
      last: "UF_CRM_1770360812010",
      two: "UF_CRM_1770361799968",
      three: "UF_CRM_1770361841245",
      total: "UF_CRM_1770555319378"
    },
    "Literacy": {
      ytd: "UF_CRM_1770361936776",
      last: "UF_CRM_1770361960160",
      two: "UF_CRM_1770361981561",
      three: "UF_CRM_1770362137775",
      total: "UF_CRM_1770555341126"
    },
    "Physical Education": {
      ytd: "UF_CRM_1770362174363",
      last: "UF_CRM_1770362192096",
      two: "UF_CRM_1770362213135",
      three: "UF_CRM_1770362230995",
      total: "UF_CRM_1770555375191"
    },
    "Science": {
      ytd: "UF_CRM_1770362325383",
      last: "UF_CRM_1770386723470",
      two: "UF_CRM_1770386746335",
      three: "UF_CRM_1770386765185",
      total: "UF_CRM_1770555402808"
    },
    "Special Education": {
      ytd: "UF_CRM_1770386875393",
      last: "UF_CRM_1770386899802",
      two: "UF_CRM_1770387029159",
      three: "UF_CRM_1770386958233",
      total: "UF_CRM_1770555843862"
    },
    "SI Manufacturing": {
      ytd: "UF_CRM_1770387074621",
      last: "UF_CRM_1770387092521",
      two: "UF_CRM_1770387116755",
      three: "UF_CRM_1770387141172",
      total: "UF_CRM_1770555425096"
    },
    "Technology": {
      ytd: "UF_CRM_1770387187354",
      last: "UF_CRM_1770387208104",
      two: "UF_CRM_1770387227913",
      three: "UF_CRM_1770387261150",
      total: "UF_CRM_1770555447973"
    }
  }

  const container = document.getElementById("app")

  let html = `
    <h2>Invoiced Sales for Entire Sales Group</h2>
    <table border="1" width="100%" cellpadding="8">
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
  `

  Object.keys(map).forEach(category => {
    const f = map[category]

    html += `
      <tr>
        <td>${category}</td>
        <td>${data[f.ytd] || ''}</td>
        <td>${data[f.last] || ''}</td>
        <td>${data[f.two] || ''}</td>
        <td>${data[f.three] || ''}</td>
      </tr>
      <tr style="font-weight:bold; background:#f4f4f4">
        <td>${category} Total</td>
        <td colspan="4">${data[f.total] || ''}</td>
      </tr>
    `
  })

  html += `</tbody></table>`

  container.innerHTML = html
})
