import { Link } from "react-router-dom";
import { Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { MaleIcon, FemaleIcon } from "../icons/GenderIcons";
import { User } from "../types";

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string, record: User) => (
      <Link to={`/user/${record.id}`}>{name}</Link>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (gender: string) =>
      gender === "male" ? <MaleIcon /> : <FemaleIcon />,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      // Questa parte del codice esiste gia', normalmente si farebbe una componente
      <Tag color={status === "active" ? "green" : "red"}>
        {status === "active" ? (
          <CheckCircleOutlined className="mr-1" />
        ) : (
          <CloseCircleOutlined className="mr-1" />
        )}
        {status.toUpperCase()}
      </Tag>
    ),
  },
];
