import { Request, Response } from "express";
import csv from "csv-parser";
import { Readable } from "stream";
import { processImport } from "../services/import.service";

export const importCSV = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "CSV file required",
      });
    }

    type CSVRow = Record<string, string>;

    const rows: CSVRow[] = [];

    const stream = Readable.from(req.file.buffer);

    stream
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", async () => {
        try {
          // Process CSV using AI
          const result = await processImport(rows);

          return res.status(200).json(result);
        } catch (error) {
          console.error("Import processing failed:", error);

          return res.status(500).json({
            message: "Failed to process CSV",
          });
        }
      })
      .on("error", (error) => {
        console.error("CSV parsing failed:", error);

        return res.status(500).json({
          message: "Failed to parse CSV",
        });
      });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};