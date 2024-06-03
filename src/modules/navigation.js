import { Link } from "react-router-dom"

function Navigation(){
    return(
        <ul className="container pt-2 list">
        <li className="list-item"><Link className="list-item" to="/">Home</Link></li>
            <li className="list-item"><Link className="list-item" to="/about">About</Link></li>
            <li className="list-item"><Link className="list-item" to="/contact">Contact</Link></li>
            <li className="list-item"><Link className="list-item" to="/login">Login</Link></li>
        </ul>
    )
}

export default Navigation;