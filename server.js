let express = require('express');
let cors = require('cors');
let bodyParer = require('body-parser');

let { getAuth, getSheetData } = require("./lib/sheet");

const app = express();
app.use(cors());
app.use(bodyParer.json({ limit: '5000mb' }));

/*
  auth with google,
  then get the sheet data with google api
  if success, return the data
  if fail, return 400
*/
app.get("/sheets/", async (req, res) => {
  getAuth((auth) => {

    let sheeId = "1FY-__7iWeDMXxDXVpwJNaGlTKt2nIc9Fsojw4-rJmC4";
    let range = "A1:B";

    getSheetData(sheeId, range, auth, (rows) => {
      if (rows == null) {
        return res.status(400).json({
          message: "error"
        })
      }
      return res.status(200).json(rows);
    })

  })

})

let PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`HTTP server is running at port ${PORT}`);
});