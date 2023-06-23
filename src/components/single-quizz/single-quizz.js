import { useEffect } from "react";
import "./single-quizz.scss"
import useQuizzService from "../../services/quizz-service";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, addCorrectAnswer, addIncorrectAnswer, loadCategoryTest, setCurrentTest, setTimer } from "../../actions";
import { NavLink } from "react-router-dom";

const SingleQuizz = () => {
    const {getCategoryTest} = useQuizzService();
    const category_test = useSelector(state=>state.category_test);
    const current_test = useSelector(state=>state.current_test)
    const category = useSelector(state=>state.current_category)
    const dispatch = useDispatch();
    useEffect(()=>{
        getCategoryTest(category)
            .then(res=>{
                dispatch(loadCategoryTest(res));
                dispatch(setCurrentTest(0));
                dispatch(setTimer((new Date()).getTime()))
            })
        nextButtonDisabledOn();
    },[])
    const nextButtonDisabledOn = () =>{
        document.querySelector('[data-type="next"]').disabled=true;
        const isLastQuestion=document.querySelector('.last_button_disabled');
        if(isLastQuestion){isLastQuestion.classList.add('last_button_disabled')};

    }
    const nextButtonDisabledOff = () =>{
        document.querySelector('[data-type="next"]').disabled=false;
        const isLastQuestion=document.querySelector('.last_button_disabled');
        if(isLastQuestion){isLastQuestion.classList.remove('last_button_disabled')}
    }
    function shuffleAnswers(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    const answers = category_test[current_test]?category_test[current_test].allAnswers.map((answer,number)=>{
        return (
            <div className="answers" key={number}>
                <input onChange={nextButtonDisabledOff} type="radio" id={number} name={current_test} value={answer} />
                <label  htmlFor={number}>{answer}</label>
            </div>
        )
    }):[];


    const nextTest = (testNumber) => {
        const radiobuttons = document.querySelectorAll('input');
            radiobuttons.forEach((elem)=>{
                if(elem.checked){
                    if(elem.value === category_test[current_test].correct_answer) {
                        dispatch(addCorrectAnswer(elem.value))
                        localStorage.setItem('correct_have_been_answered',+localStorage.getItem('correct_have_been_answered')+1)
                    }else{
                        dispatch(addIncorrectAnswer(elem.value))    
                    }
                    dispatch(addAnswer({answer:elem.value,correct:category_test[current_test].correct_answer}))
                }
                elem.checked=false;
            })
        testNumber<category_test.length?dispatch(setCurrentTest(testNumber)):dispatch(setCurrentTest(0));
        nextButtonDisabledOn();
        localStorage.setItem('questions_have_been_answered',+localStorage.getItem('questions_have_been_answered')+1)
    }
    const next_button =current_test<category_test.length-1
                ?(<div className="button_container">
                    <button  data-type="next"  onClick={()=>nextTest(current_test+1)}>Next</button>
                </div>)
                :(<div className="button_container">
                    <button  data-type="next"  onClick={()=>{nextTest(current_test+1);localStorage.setItem('completed_quizzes',+localStorage.getItem('completed_quizzes')+1)}}><NavLink className="last_button_disabled" end to='/finalpage'>Finish quizz</NavLink></button>
                </div>)
    return (
        <div className="single_quizz">
            <div className="question">{category_test.length?category_test[current_test].category:''}</div>
            <div className="question">Question {current_test+1}/{category_test.length}</div>
            <div className="question">{category_test.length?category_test[current_test].question:''}</div>
            <div className="radiobutton_group">
                {shuffleAnswers(answers)}
            </div>
            {next_button}
        </div>
    )
}

export default SingleQuizz;