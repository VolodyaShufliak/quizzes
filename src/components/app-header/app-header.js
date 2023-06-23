import { useDispatch } from 'react-redux';
import './app-header.scss'
import { Link , NavLink} from 'react-router-dom';
import { clearTest } from '../../actions';

const AppHeader = () => {
    const dispatch = useDispatch();
    function disableOverflow(e) {
        if (e.target.checked) {
          document.body.classList.add('disable_overflow_y');
        } else {
            document.body.classList.remove('disable_overflow_y');
        }
    }
    function closeMenu(e){
        const menu = document.querySelector('#check');
        if(menu.checked && e.target.tagName!=='UL'){menu.click()}
    }
    return (
        <nav className='header_container'>
            <input type="checkbox" onChange={disableOverflow} id="check"/>
            <div className='logo'><a>Kolopnyy's quizzes</a></div>
            <ul onClick={closeMenu}>
                <li className="nav_li_item"><Link to='/'><h2 onClick={()=>{dispatch(clearTest())}}>Home</h2></Link></li>
                <li className="nav_li_item"><NavLink end to='/stats'><h2 onClick={()=>{dispatch(clearTest())}}>Stats page</h2></NavLink></li>
            </ul>
            <div className="checkbtn">
                <label className="show_check" htmlFor="check"><i className="fa fa-bars" ></i></label>
                <label className="hide_check" htmlFor="check"><i  className="fa fa-window-close"></i></label>
            </div>
        </nav>
    )
}

export default AppHeader;