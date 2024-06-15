import { Link } from "react-router-dom"
var $ = require("jquery");

function Navigation({isAuthenticated, setIsAuthenticated}){
    $("#confirm-logut").hide();
    const showLogOut = () => {
        $("#confirm-logut").show();
        $('.show_confirm').hide()
    }
    const hideLogOut = () => {
        $("#confirm-logut").hide();
        $('.show_confirm').show();
    }
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
                {isAuthenticated && <li className="list-item"><Link className="list-item show_confirm"
                onClick={()=>showLogOut()}>Logout</Link></li>}
                <div className="list-group" id="confirm-logut">
                    <li className="list-item" id="confirm"><Link to="/" className="link-underline-light text-dark"
                        onClick={
                            ()=>{
                                setIsAuthenticated(false);
                                $('.show_confirm').show();
                                localStorage.setItem('isAuthenticated','false')
                            }
                        } >Confirm</Link></li>
                    <li className="list-item" id="cancel"><Link className="link-underline-light text-dark"
                    onClick={()=>hideLogOut()}>Cancel</Link></li>
                </div>
            </ul>
        </div>
    )
}

export default Navigation;