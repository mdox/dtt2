import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Drivers } from "./pages/Drivers";
import { Home } from "./pages/Home";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<Drivers />} />
      </Routes>
    </Layout>
  );
}

export default App;
