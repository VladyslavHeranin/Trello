import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../reducers/userRed"
import { Auth } from "../../actions/user"


export const Header = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return <div className="card">
      
            <nav className="blue-grey"  >
                <a href="#!" className="brand-logo">   <span className=" blue-text">React</span>Trello </a>

                <ul className="right hide-on-med-and-down">

                    {!isAuth && <li><NavLink to="/login">Log in</NavLink></li>}
                    {!isAuth && <li><NavLink to="/registartion">Registartion</NavLink></li>}
                    {isAuth &&
                        <div className="button__block">
                            <NavLink 
                            to="/createList"
                            className="btn yellow"
                                   >
                                       Add list  
                            </NavLink>

                            <NavLink 
                            to="/login"
                            className="btn  "
                            onClick={() => dispatch(logOut())}>
                                   Log out
                            </NavLink>
                            <a className="btn" target="_blank"  href="https://github.com/VladyslavHeranin/Trello"> 
                            Git Hub
                            </a>
                         
                       
                        </div>
                    }
                </ul>
            </nav>
    </div>
}