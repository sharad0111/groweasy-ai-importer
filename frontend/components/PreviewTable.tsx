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

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-500"
          />

          <input
            className="border rounded-lg w-full pl-10 py-2"
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
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <Download size={18} />

          Export CSV
        </button>

      </div>

      <div className="overflow-auto border rounded-xl max-h-[550px]">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-gray-100 z-10">

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
                  className="cursor-pointer border p-3 text-left whitespace-nowrap"
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
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
              >

                {columns.map((col) => (

                  <td
                    key={col}
                    className="border p-2 whitespace-nowrap"
                  >
                    {String(row[col] ?? "")}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-between items-center mt-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>

          Page {page} of {totalPages}

        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}