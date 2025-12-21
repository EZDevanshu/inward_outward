import { Link } from "react-router-dom";

function Header(){
    return(
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/add'>Add</Link>
                <Link to='/edit/1'>Edit</Link>
                <Link to='/list'>List</Link>
            </nav>
        </>
    );
}

export default Header;