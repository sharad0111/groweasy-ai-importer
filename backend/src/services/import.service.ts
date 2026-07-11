import { chunkArray } from "../utils/batch";
import { extractCRM } from "./gemini.service";
import { CRMRecordSchema } from "../types/crm";
async function retryBatch(batch: any[], retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await extractCRM(batch);
    } catch (err) {
      console.log(`Retry ${i + 1} failed`);
    }
  }

  throw new Error("Batch failed after retries");
}

type CSVRow = Record<string, string>;

export async function processImport(rows: CSVRow[]) {
  const batches = chunkArray(rows, 25);

  const imported: any[] = [];
  const skipped: any[] = [];

  for (const batch of batches) {
    try {
      const result = await retryBatch(batch);

      imported.push(...result);
    } catch (err) {
      skipped.push(...batch);
    }
  }

  return {
    imported,
    skipped,
    totalImported: imported.length,
    totalSkipped: skipped.length,
  };
}