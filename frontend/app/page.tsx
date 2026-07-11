"use client";

import { useState } from "react";
import Header from "@/components/Header";
import UploadBox from "@/components/UploadBox";
import PreviewTable from "@/components/PreviewTable";
import StatsCards from "@/components/StatsCards";
import LoadingOverlay from "@/components/LoadingOverlay";
// import { parseCSV } from "@/lib/csv";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { CRMRecord } from "@/types/crm";
import { parseCSV, CSVRow } from "@/lib/csv";

export default function Home() {
  type CSVRow = Record<string, string>;

  const [rows, setRows] = useState<CSVRow[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [imported, setImported] = useState<CRMRecord[]>([]);
  const [skipped, setSkipped] = useState<Record<string, string>[]>([]);

  const [totalImported, setTotalImported] = useState(0);
  const [totalSkipped, setTotalSkipped] = useState(0);

  const handleUpload = async (selectedFile: File) => {
    setFile(selectedFile);

    const data = await parseCSV(selectedFile);

    setRows(data);

    // Reset previous results
    setImported([]);
    setSkipped([]);
    setTotalImported(0);
    setTotalSkipped(0);
  };

  const [progress, setProgress] = useState(0);

  const confirmImport = async () => {
    if (!file) return;
  
    try {
      setLoading(true);
  
      setProgress(10);
  
      const formData = new FormData();
  
      formData.append("file", file);
  
      setProgress(40);
  
      const response = await api.post("/import", formData);
  
      setProgress(80);
  
      setImported(response.data.imported || []);
      setSkipped(response.data.skipped || []);
  
      setTotalImported(response.data.totalImported || 0);
      setTotalSkipped(response.data.totalSkipped || 0);
  
      setProgress(100);
  
      toast.success("CSV Imported Successfully!");
  
    } catch (error) {
      console.error(error);
      toast.error("Import Failed");
    } finally {
      setLoading(false);
  
      setTimeout(() => {
        setProgress(0);
      }, 500);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-8">

      {/* Header */}
      <Header />

      {/* Upload */}
      <UploadBox onFileUpload={handleUpload} />

      {/* CSV Preview */}
      {rows.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            CSV Preview
          </h2>

          <PreviewTable data={rows} />

          <button
            onClick={confirmImport}
            disabled={loading}
            className="mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition"
          >
            {loading ? "⏳ Processing..." : "🚀 Confirm Import"}
          </button>

          <LoadingOverlay loading={loading} 
          progress={progress}/>
        </>
      )}

      {/* AI Result */}
      {imported.length > 0 && (
        <>
          <StatsCards
            imported={totalImported}
            skipped={totalSkipped}
          />

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            AI Extracted CRM Records
          </h2>

          <PreviewTable data={imported} />
        </>
      )}
    </main>
  );
}