import { useState } from "react";
import { Card } from "@/components/ui/card";
import PartsForm from "@/components/PartsForm";
import PartsTable from "@/components/PartsTable";
import { Part } from "@/types/parts";

const Build = () => {
  const [parts, setParts] = useState<Part[]>([]);

  const handleAddPart = (part: Part) => {
    setParts([...parts, { ...part, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Parts Management
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Part</h2>
            <PartsForm onSubmit={handleAddPart} existingParts={parts} />
          </Card>
          
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Parts Overview</h2>
            <PartsTable parts={parts} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Build;