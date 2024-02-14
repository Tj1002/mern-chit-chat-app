import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Layout from "./Layout";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
// import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ChatPage from "./pages/ChatPage";
import { SocketContextProvider } from "./context/socketContext";
import { Toaster } from "react-hot-toast";
function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <SocketContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={currentUser ? <ChatPage /> : <Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </SocketContextProvider>
  );
}

export default App;
