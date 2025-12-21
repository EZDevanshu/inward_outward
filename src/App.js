import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import List from "./components/List";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";

function App() {
  return (
    <>
      <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/add" element={<AddForm />} />
            <Route path="/edit/:id" element={<EditForm />} />
          </Routes>
      </div>
    </>

  );
}

export default App;
