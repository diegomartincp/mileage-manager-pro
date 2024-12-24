import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MaintenanceRecord } from "@/types/maintenance";
import { FileIcon } from "lucide-react";
import { Button } from "./ui/button";

interface MaintenanceTableProps {
  records: MaintenanceRecord[];
}

const MaintenanceTable = ({ records }: MaintenanceTableProps) => {
  const handleFileDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Kilometers</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Files</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                {record.date ? record.date.toLocaleDateString() : "-"}
              </TableCell>
              <TableCell>{record.kilometers.toLocaleString()}</TableCell>
              <TableCell>{record.category}</TableCell>
              <TableCell>${record.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
              <TableCell>{record.notes}</TableCell>
              <TableCell>
                {record.attachments && record.attachments.length > 0 ? (
                  <div className="flex gap-2">
                    {record.attachments.map((file, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFileDownload(file)}
                      >
                        <FileIcon className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceTable;