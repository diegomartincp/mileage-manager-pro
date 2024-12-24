import { useState } from "react";
import MaintenanceForm from "../components/MaintenanceForm";
import MaintenanceTable from "../components/MaintenanceTable";
import MaintenanceCharts from "../components/MaintenanceCharts";
import ExportButtons from "../components/ExportButtons";
import { Card } from "@/components/ui/card";
import { MaintenanceRecord } from "@/types/maintenance";

const Index = () => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);

  const handleAddRecord = (record: MaintenanceRecord) => {
    setRecords([...records, { ...record, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Car Maintenance Tracker
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Record</h2>
            <MaintenanceForm onSubmit={handleAddRecord} />
          </Card>
          
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <MaintenanceCharts records={records} />
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Maintenance History</h2>
            <ExportButtons records={records} />
          </div>
          <MaintenanceTable records={records} />
        </Card>
      </div>
    </div>
  );
};

export default Index;