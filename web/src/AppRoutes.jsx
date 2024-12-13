import { Route, Routes, Navigate } from "react-router-dom";
import App from "./pages/App/App";
import Home from './pages/Home/Home';
import Maps from './pages/Maps/Maps';
import Alert from './pages/Alert/Alert'; 
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { AuthProvider } from "./context/AuthProvider";

function AppRoutes() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/maps" element={<Maps />} />
                <Route path="/alert" element={<Alert />} /> 
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </AuthProvider>
    );
}

export default AppRoutes;
