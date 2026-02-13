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
    <script src="https://api.bitrix24.com/api/v1/"></script>
    <script>
      BX24.init(function() {
        console.log("Bitrix initialized");
      });
    </script>
    <style>
      body { font-family: Arial; padding: 20px; }
    </style>
  </head>
  <body>
    <h2>Invoiced Sales Loaded Successfully</h2>
  </body>
  </html>
  `);
}
