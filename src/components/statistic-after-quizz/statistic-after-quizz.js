import { useSelector } from "react-redux";
import "./statistic-after-quizz.scss"


const StatisticAfterTest = () => {
    const answers = useSelector(state=>state.answers)
    const timer = useSelector(state=>state.timer)
    function calcResult(answers){
        let correct_a = 0;
        let incorrect_a = 0;
        let result_lvl;
        answers.forEach(a =>a.answer===a.correct?correct_a++:incorrect_a++);
        if(correct_a/answers.length<0.5){
            result_lvl='bad'
        }else if(correct_a/answers.length>=0.5 && correct_a!==answers.length){
            result_lvl='good'
        }else{
            result_lvl='fantastic'
        }
        return {
            result:`${correct_a}/${answers.length}`,
            result_lvl
        };
    }
    const result=calcResult(answers);
    const myAnswers = answers.map((answer,i)=>{
        const clazz = answer.answer===answer.correct?'iscorrect_answer':'iscorrect_answer incorrect_answer';
        return (
            <div key={i}>
                <div className="gratz_1">Question {i+1}</div>
                <div className={clazz}>Your answer: {answer.answer}. Correct answer: {answer.correct}</div>
            </div>
        )
    }) 

    const getTime = (timer) => {
        const test_time = (new Date()).getTime() - timer;
        setAvarageTime(test_time);
        const minutes = Math.trunc(test_time/60000);
        const seconds = Math.trunc((test_time - minutes*60000)/1000); 
        return `${minutes} minutes ${seconds} seconds`;
    }

    function setAvarageTime(new_time){
        const avg_time_before_test = localStorage.getItem('avg_time');
        const completed_quizzes = localStorage.getItem('completed_quizzes');
        avg_time_before_test
        ?localStorage.setItem('avg_time',(+avg_time_before_test*(completed_quizzes-1)+new_time)/(completed_quizzes))
        :localStorage.setItem('avg_time',new_time);
    }

    return (
        <div className="statistic_after_test">
            <div className="gratz">Congratulations!</div>
            <div className="gratz_1">You have completed the test with a {timer?result.result_lvl:''} result </div>
            <div className="result">{result.result}</div>
            <div className="gratz_1">You passed the test for</div>
            <div className="result">{timer?getTime(timer):'0 minutes 0 seconds'}</div>
            <div className="gratz_1">Your answers</div>
            {myAnswers}
            
        </div>
    )
}

export default StatisticAfterTest;