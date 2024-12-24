import { MaintenanceRecord } from "@/types/maintenance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface MaintenanceChartsProps {
  records: MaintenanceRecord[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const MaintenanceCharts = ({ records }: MaintenanceChartsProps) => {
  // Sort by kilometers if no date, otherwise by date
  const sortedRecords = [...records].sort((a, b) => {
    if (!a.date && !b.date) return a.kilometers - b.kilometers;
    if (!a.date) return 1;  // Records without dates go last
    if (!b.date) return -1; // Records without dates go last
    return a.date.getTime() - b.date.getTime();
  });

  const categoryData = records.reduce((acc, record) => {
    acc[record.category] = (acc[record.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      <div className="h-[300px]">
        <h3 className="text-lg font-medium mb-2">Kilometers Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sortedRecords}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => 
                date ? new Date(date).toLocaleDateString() : "No Date"
              }
            />
            <YAxis dataKey="kilometers" />
            <Tooltip
              labelFormatter={(label) => 
                label ? new Date(label).toLocaleDateString() : "No Date"
              }
            />
            <Line
              type="monotone"
              dataKey="kilometers"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[300px]">
        <h3 className="text-lg font-medium mb-2">Maintenance Categories</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MaintenanceCharts;