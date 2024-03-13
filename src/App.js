import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard'
import Products from './components/Products/Products'
import Orders from './components/Orders/Orders'

function App() {
  return (
    <BrowserRouter>
        <div className="router-css">
        <Sidebar />
        <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/orders" element={<Orders/>}/>
        </Routes>

        </div>
        
    </BrowserRouter>
  );
}

export default App;
