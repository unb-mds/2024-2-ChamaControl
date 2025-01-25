import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthProvider";
import Loading from "./components/Loading/Loading.jsx";


const Home = lazy(() => import("./pages/Home/Home"));
// const Maps = lazy(() => import("./pages/Maps/Maps"));
const Alert = lazy(() => import("./pages/Alert/Alert"));
const About = lazy(() => import("./pages/About/About"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

function AppRoutes() {
    return (
        <AuthProvider>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/maps" element={<Maps />} /> */}
                    <Route path="/alert" element={<Alert />} /> 
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Suspense>
        </AuthProvider>
    );
}

export default AppRoutes;
