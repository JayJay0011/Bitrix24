exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Sales Table</title>
      </head>
      <body>
        <h3>Invoiced Sales (Preview)</h3>
        <table border="1" cellpadding="8" cellspacing="0">
          <tr>
            <th>Category</th>
            <th>YTD</th>
            <th>Last Year</th>
            <th>2 Years Ago</th>
            <th>3 Years Ago</th>
          </tr>
          <tr>
            <td>Arts & Crafts</td>
            <td>1000</td>
            <td>57869.46</td>
            <td>48580.71</td>
            <td>80755.64</td>
          </tr>
        </table>
      </body>
      </html>
    `
  };
};
