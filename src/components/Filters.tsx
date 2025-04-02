import { Input, Select } from "antd";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder={t("filters.namePlaceholder")}
          value={filters.name}
          onChange={(e) => onFilterChange("name", e.target.value)}
        />
        <Input
          placeholder={t("filters.emailPlaceholder")}
          value={filters.email}
          onChange={(e) => onFilterChange("email", e.target.value)}
        />
        <Select
          placeholder={t("filters.genderPlaceholder")}
          value={filters.gender}
          onChange={(value) => onFilterChange("gender", value)}
          allowClear
        >
          <Option value="male">{t("filters.genderMale")}</Option>
          <Option value="female">{t("filters.genderFemale")}</Option>
        </Select>
        <Select
          placeholder={t("filters.statusPlaceholder")}
          value={filters.status}
          onChange={(value) => onFilterChange("status", value)}
          allowClear
        >
          <Option value="active">{t("filters.statusActive")}</Option>
          <Option value="inactive">{t("filters.statusInactive")}</Option>
        </Select>
      </div>
    </div>
  );
}
