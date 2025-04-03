import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";

export default function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <header className="p-3 flex justify-end">
        <Select
          defaultValue="en"
          style={{ width: 60 }}
          onChange={changeLanguage}
          options={[
            { value: "en", label: "🇬🇧" },
            { value: "it", label: "🇮🇹" },
          ]}
        />
      </header>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}
