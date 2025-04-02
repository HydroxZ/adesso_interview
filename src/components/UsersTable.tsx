import { Table, Tag } from "antd";
import { User } from "../types";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FemaleIcon, MaleIcon } from "../icons/GenderIcons";
import { useTranslation } from "react-i18next";

interface UsersTableProps {
  loading: boolean;
  users: User[];
}

export default function UsersTable({ loading, users }: UsersTableProps) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("userTable.name"),
      dataIndex: "name",
      key: "name",
      render: (name: string, record: User) => (
        <Link to={`/user/${record.id}`}>{name}</Link>
      ),
    },
    {
      title: t("userTable.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("userTable.gender"),
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) =>
        gender === "male" ? <MaleIcon /> : <FemaleIcon />,
    },
    {
      title: t("userTable.status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? (
            <CheckCircleOutlined className="mr-1" />
          ) : (
            <CloseCircleOutlined className="mr-1" />
          )}
          {t(`filters.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      scroll={{ x: 768 }}
      loading={loading}
      dataSource={users}
      columns={columns}
      rowKey={(record) => record.id}
    />
  );
}
