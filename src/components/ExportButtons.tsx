import { Button } from "@/components/ui/button";
import { MaintenanceRecord } from "@/types/maintenance";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useRef } from "react";
import { toPDF } from "react-to-pdf";

interface ExportButtonsProps {
  records: MaintenanceRecord[];
}

const ExportButtons = ({ records }: ExportButtonsProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      records.map((record) => ({
        Date: record.date.toLocaleDateString(),
        Kilometers: record.kilometers,
        Category: record.category,
        Notes: record.notes,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Maintenance Records");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "maintenance-records.xlsx");
  };

  const exportToPDF = () => {
    if (targetRef.current) {
      toPDF(targetRef, {
        filename: "maintenance-records.pdf",
      });
    }
  };

  return (
    <div className="space-x-2">
      <Button onClick={exportToExcel} variant="outline">
        Export to Excel
      </Button>
      <Button onClick={exportToPDF} variant="outline">
        Export to PDF
      </Button>
    </div>
  );
};

export default ExportButtons;