import { Link } from "react-router-dom"

function Navigation({isAuthenticated}){
    return(
        <div className="navigation-class">
            <div><strong className="name websiteName">WheelDeal</strong></div>
            <ul className="container pt-3 list">
                {isAuthenticated && <li className="list-item"><Link className="list-item" to="/mainpage">Main Page</Link></li> }
                {isAuthenticated && <li className="list-item"><Link className="list-item" to="/auctionpage">Auction Page</Link></li>}
                {!isAuthenticated && <li className="list-item"><Link className="list-item" to="/">Home</Link></li>}
                <li className="list-item"><Link className="list-item" to="/about">About</Link></li>
                <li className="list-item"><Link className="list-item" to="/contact">Contact</Link></li>
                {!isAuthenticated && <li className="list-item"><Link className="list-item" to="/login">Login</Link></li>}
            </ul>
        </div>
    )
}

export default Navigation;