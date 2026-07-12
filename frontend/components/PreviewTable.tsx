"use client";

import { useMemo, useState } from "react";
import { Search, Download, ArrowUpDown } from "lucide-react";

interface Props {
  data: Record<string, any>[];
}

export default function PreviewTable({ data }: Props) {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(1);

  if (!data.length) return null;

  const columns = Object.keys(data[0]);

  const filteredData = useMemo(() => {
    let rows = [...data];

    if (search.trim()) {
      rows = rows.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sortColumn) {
      rows.sort((a, b) => {
        const x = String(a[sortColumn] ?? "");
        const y = String(b[sortColumn] ?? "");

        return ascending ? x.localeCompare(y) : y.localeCompare(x);
      });
    }

    return rows;
  }, [data, search, sortColumn, ascending]);

  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const currentRows = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  function downloadCSV() {
    const csv = [
      columns.join(","),
      ...filteredData.map((row) =>
        columns.map((c) => `"${row[c] ?? ""}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "crm-data.csv";

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-8">

      <h2 className="text-3xl font-bold mb-6">
        CSV Preview
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-3 top-3 text-muted-foreground"
          />

          <input
            className="w-full rounded-lg border border-border bg-background text-foreground pl-10 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

        </div>

        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
        >
          <Download size={18} />
          Export CSV
        </button>

      </div>

      <div className="overflow-auto rounded-xl border border-border bg-card max-h-[550px] shadow">

        <table className="min-w-full text-sm">

          <thead className="sticky top-0 bg-muted z-10">

            <tr>

              {columns.map((col) => (

                <th
                  key={col}
                  onClick={() => {
                    if (sortColumn === col) {
                      setAscending(!ascending);
                    } else {
                      setSortColumn(col);
                      setAscending(true);
                    }
                  }}
                  className="cursor-pointer border-b border-border px-4 py-3 text-left whitespace-nowrap font-semibold"
                >
                  <div className="flex items-center gap-2">

                    {col}

                    <ArrowUpDown size={15} />

                  </div>

                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {currentRows.map((row, index) => (

              <tr
                key={index}
                className="border-b border-border hover:bg-muted/50 transition"
              >

                {columns.map((col) => (

                  <td
                    key={col}
                    className="px-4 py-3 whitespace-nowrap"
                  >
                    {String(row[col] ?? "")}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-between items-center mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="rounded-lg border border-border bg-card px-4 py-2 disabled:opacity-40 hover:bg-muted transition"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="rounded-lg border border-border bg-card px-4 py-2 disabled:opacity-40 hover:bg-muted transition"
        >
          Next
        </button>

      </div>

    </div>
  );
}