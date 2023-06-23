import { useEffect} from "react";
import "./categories-list.scss"
import useQuizzService from "../../services/quizz-service";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, clearTest, loadCategories } from "../../actions";
import { NavLink } from "react-router-dom";
const CategoriesList = () => {

    const {getCategories} = useQuizzService();

    const categories = useSelector(state=>state.categories);
    const dispatch = useDispatch()
    useEffect(()=>{
        getCategories().then(res=>dispatch(loadCategories(res)));
        dispatch(clearTest());
    },[])
    const array = categories.map(category=>{
        return (
            <li onClick={(e)=>{dispatch(addCategory(e.target.id));saveCategory(+e.target.id)}} id={category.id} key={category.id}><NavLink id={category.id} end to='/quizz'>{category.name}</NavLink></li>
        )
    })
    function chooseRandomCategory(){
        return Math.round(Math.random()*categories.length);
    }
    function saveCategory(category){
        if(localStorage.getItem('playedCategories')===null){
            localStorage.setItem('playedCategories',JSON.stringify([category]));
        }else{
            if(!JSON.parse(localStorage.getItem('playedCategories')).some(elem=>elem===category)){
                localStorage.setItem('playedCategories',JSON.stringify([...JSON.parse(localStorage.getItem('playedCategories')),category]));
            }
        }
    }
    const randomCategory = chooseRandomCategory();
    return (
        <>
        <div className="lucky_div"><button className="i_am_lucky" onClick={()=>{dispatch(addCategory(categories[randomCategory].id));saveCategory(categories[randomCategory].id)}}><NavLink end to='/quizz'>I'm lucky!</NavLink></button></div>
        <div className="list_of_quizzes">List of quizes</div>
        <ul className="categories_list">
            {array}
        </ul>
        </>
    )
}

export default CategoriesList;