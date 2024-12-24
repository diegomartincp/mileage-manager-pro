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
import { Upload } from "lucide-react";

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
    cost: "",
    attachments: [] as File[],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.kilometers || !formData.category || !formData.cost) {
      toast({
        title: "Error",
        description: "Please fill in kilometers, category, and cost",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...(formData.date && { date: new Date(formData.date) }),
      kilometers: Number(formData.kilometers),
      category: formData.category,
      notes: formData.notes,
      cost: Number(formData.cost),
      attachments: formData.attachments,
    });

    setFormData({
      date: "",
      kilometers: "",
      category: "" as MaintenanceCategory,
      notes: "",
      cost: "",
      attachments: [],
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
        <label className="text-sm font-medium">Cost *</label>
        <Input
          type="number"
          value={formData.cost}
          onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
          placeholder="Enter maintenance cost"
          required
          step="0.01"
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Attachments</label>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
            accept=".pdf,image/*"
          />
          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="truncate">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add Record
      </Button>
    </form>
  );
};

export default MaintenanceForm;