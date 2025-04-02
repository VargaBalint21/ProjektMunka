import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout.Jsx";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProfilePage from "./components/ProfilePage";
import 'bootstrap/dist/css/bootstrap.css';
export default function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm/>} />
          <Route path="profile" element={<ProfilePage />} />
          

        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}