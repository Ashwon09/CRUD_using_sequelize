import { Router } from "express";
const router = Router();
import pdfTable from "pdfkit-table";
import fs from "fs";

const doc = new pdfTable();

router.use("/generatereport", async () => {
  doc.pipe(fs.createWriteStream("./public/pdfReports/report.pdf"));

  const table = {
    title: "",
  };

  doc.end();
});

export default router;
