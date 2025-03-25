import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

 const Layout = () => {
    return(
        <>
       <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Regisztráció</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
        </>
    );


    
}
export default Layout;