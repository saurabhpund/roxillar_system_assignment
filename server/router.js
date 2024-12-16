const express = require("express");
const router = express.Router();
const {
  getAllData,
  getDataByMonth,
  getDataBySearch,
  getStats,
  getPriceRangeStats,
  getCategoryData,
  combineServices
} = require("./services/service");

router.get("/", async function (req, res) {
  try {
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);
    

    let data = await getAllData(offset, limit);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"});
  }
});

router.get("/getDataByMonth", async function (req, res) {
  try {
    let month = req.query.month;
    let data = await getDataByMonth(month);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"});
  }
});

router.get("/search", async function (req, res) {
  try {
    let search = req.query.s;
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);
    let data = await getDataBySearch(search, offset, limit);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"});
  }
});


router.get("/stats", async function (req, res) {
  try {
    let month = req.query.month;
    let data = await getStats(month);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"});
  }
});

router.get("/priceRangeStats", async function (req, res) {
  try {
    let data = await getPriceRangeStats();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"});
  }
});

router.get("/categoryData", async function (req, res) {
  try {
    let month = req.query.month;
    let data = await getCategoryData(month);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"});
  }
});

router.get("/combineServices", async function (req, res) {
 try {
    let month = req.query.month;
     let data = await combineServices(month);
     res.status(200).json(data);
 } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error"});
 }
});



module.exports = router;
