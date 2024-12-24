import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MaintenanceRecord } from "@/types/maintenance";

interface MaintenanceTableProps {
  records: MaintenanceRecord[];
}

const MaintenanceTable = ({ records }: MaintenanceTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Kilometers</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.date.toLocaleDateString()}</TableCell>
              <TableCell>{record.kilometers.toLocaleString()}</TableCell>
              <TableCell>{record.category}</TableCell>
              <TableCell>{record.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceTable;