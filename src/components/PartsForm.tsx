import { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { Part, PartCategory } from "@/types/parts";

interface PartsFormProps {
  onSubmit: (part: Part) => void;
  existingParts: Part[];
}

const categories: PartCategory[] = [
  "Brake Pads",
  "Brake Discs",
  "Oil",
  "Coolant",
  "Brake Fluid",
  "Wheels",
  "Tires",
  "Custom",
];

const PartsForm = ({ onSubmit, existingParts }: PartsFormProps) => {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "" as PartCategory,
    brand: "",
    specifications: {} as { [key: string]: string },
    notes: "",
  });

  useEffect(() => {
    if (formData.name.length > 2) {
      const matches = existingParts
        .filter(part => 
          part.name.toLowerCase().includes(formData.name.toLowerCase()) &&
          part.name.toLowerCase() !== formData.name.toLowerCase()
        )
        .map(part => part.name);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [formData.name, existingParts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in name and category",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...formData,
      id: 0, // Will be set by parent
      createdAt: new Date(),
    });

    setFormData({
      name: "",
      category: "" as PartCategory,
      brand: "",
      specifications: {},
      notes: "",
    });

    toast({
      title: "Success",
      description: "Part added successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Name *</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter part name"
          required
        />
        {suggestions.length > 0 && (
          <div className="mt-1 p-2 bg-gray-50 rounded border">
            <p className="text-sm text-gray-500 mb-1">Similar parts:</p>
            <ul className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-blue-600">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category *</label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value as PartCategory })}
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
        <label className="text-sm font-medium">Brand</label>
        <Input
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          placeholder="Enter brand name"
        />
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
        Add Part
      </Button>
    </form>
  );
};

export default PartsForm;