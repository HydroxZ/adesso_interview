import { Table } from "antd";
import { columns } from "../constants/UserTableColumns";
import { User } from "../types";

interface UsersTableProps {
  loading: boolean;
  users: User[];
}

export default function UsersTable({ loading, users }: UsersTableProps) {
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
