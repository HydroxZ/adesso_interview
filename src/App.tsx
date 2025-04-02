import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}
