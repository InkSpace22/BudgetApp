
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestApiComponent from "../components/TestApiComponent";
import Navbar from "../components/Navbar/Navbar";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import TransactionList from "../components/TransactionList/TransactionList";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../components/HomePage/HomePage";
import PrivateRoute from "../components/Route/PrivateRoute";
import PublicRoute from "../components/Route/PublicRoute";
import BalanceBar from "../components/BalanceBar/BalanceBar";
import GroupMembersPage from "../pages/GroupsPage/GroupMembersPage";
import GroupDebtsPage from "../pages/GroupsPage/GroupDebtPage";
import GroupsPage from "../pages/GroupsPage/GroupsPage";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


// Przykładowa funkcja pobierająca dane grupy (dostosuj do swojego API)
const fetchGroupById = async (groupId: string) => {
  // Przykład pobrania z API
  const response = await fetch(`/api/groups/${groupId}`);
  if (!response.ok) throw new Error("Nie udało się pobrać grupy");
  return response.json();
};

const GroupMembersPageWrapper = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      fetchGroupById(groupId)
        .then(data => setGroup(data))
        .catch(() => setGroup(null))
        .finally(() => setLoading(false));
    }
  }, [groupId]);

  if (loading) return <div>Ładowanie...</div>;
  if (!group) return <div>Nie znaleziono grupy</div>;

  return (
    <GroupMembersPage
      group={group}
      onBack={() => navigate(-1)}
    />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <BalanceBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/add-transaction"
            element={
              <PrivateRoute>
                <TransactionForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <TransactionList />
              </PrivateRoute>
            }
          />
          <Route
            path="/groups"
            element={
              <PrivateRoute>
                <GroupsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/groups/:groupId/members"
            element={
              <PrivateRoute>
                <GroupMembersPageWrapper/>
              </PrivateRoute>
            }
          />
          <Route path="/groups/:groupId/debts" element={<GroupDebtsPage />} />
          <Route path="/test" element={<TestApiComponent />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
