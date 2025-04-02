import { Input, Select } from "antd";

const { Option } = Select;

interface FiltersProps {
  filters: {
    name: string;
    email: string;
    gender?: string;
    status?: string;
  };
  onFilterChange: (name: string, value?: string) => void;
}

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => onFilterChange("name", e.target.value)}
        />
        <Input
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e) => onFilterChange("email", e.target.value)}
        />
        <Select
          placeholder="Filter by gender"
          value={filters.gender}
          onChange={(value) => onFilterChange("gender", value)}
          allowClear
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
        <Select
          placeholder="Filter by status"
          value={filters.status}
          onChange={(value) => onFilterChange("status", value)}
          allowClear
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </div>
    </div>
  );
}
