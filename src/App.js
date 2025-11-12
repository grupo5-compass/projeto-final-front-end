import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


/* Components */
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

/* Pages */
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import BankListPage from "./components/pages/BankList/BankListPage";

/* Contexts */
import { UserProvider } from "./context/UserContext";


function App() {
    return (
        <Router>
            <MainContent />
        </Router>
    );
    }       
function MainContent(){
    const location = useLocation();
    const hideLayout = location.pathname === "/banklist";

    return(
    <UserProvider>
         {/* só mostra o Navbar e o footer se não estivermos na /banklist */}
         {!hideLayout && <Navbar />}
         
         <Message />
         <Container>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/" element={<Home />} />
                <Route path="/banklist" element={<BankListPage/>} />
            </Routes>
         </Container>
         
         {!hideLayout && <Footer />}
    </UserProvider>
    );
}

export default App;
