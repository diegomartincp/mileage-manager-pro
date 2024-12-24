import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaintenanceCategory, MaintenanceRecord } from "@/types/maintenance";
import { useToast } from "@/components/ui/use-toast";

interface MaintenanceFormProps {
  onSubmit: (record: MaintenanceRecord) => void;
}

const categories: MaintenanceCategory[] = [
  "Oil Change",
  "Tire Service",
  "Brake Service",
  "Regular Maintenance",
  "Parts Replacement",
  "Other",
];

const MaintenanceForm = ({ onSubmit }: MaintenanceFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: "",
    kilometers: "",
    category: "" as MaintenanceCategory,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.kilometers || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in kilometers and category",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...(formData.date && { date: new Date(formData.date) }),
      kilometers: Number(formData.kilometers),
      category: formData.category,
      notes: formData.notes,
    });

    setFormData({
      date: "",
      kilometers: "",
      category: "" as MaintenanceCategory,
      notes: "",
    });

    toast({
      title: "Success",
      description: "Maintenance record added successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Date (Optional)</label>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Kilometers *</label>
        <Input
          type="number"
          value={formData.kilometers}
          onChange={(e) => setFormData({ ...formData, kilometers: e.target.value })}
          placeholder="Enter current kilometers"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category *</label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value as MaintenanceCategory })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes</label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add any additional notes"
        />
      </div>

      <Button type="submit" className="w-full">
        Add Record
      </Button>
    </form>
  );
};

export default MaintenanceForm;