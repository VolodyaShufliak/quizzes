import "./stats-page.scss"
import { Chart } from "react-google-charts";
const StatsPage = () => {
    const quizzes_were_played = JSON.parse(localStorage.getItem('playedCategories'));
    const question_have_been_answered = +localStorage.getItem('questions_have_been_answered');
    const avg_time = localStorage.getItem('avg_time');
    const correct_have_been_answered = +localStorage.getItem('correct_have_been_answered');
    const data = [
        ["result", "count"],
        ["+", correct_have_been_answered],
        ["-", question_have_been_answered-correct_have_been_answered]
      ];
      const options = {
        title: "Questions pie diagram"
      };
      const style ={
        'backgrounColor':'black',
        'color':'green'
      }
    const avgTime = (test_time) =>{
        const minutes = Math.trunc(test_time/60000);
        const seconds = Math.trunc((test_time - minutes*60000)/1000); 
        return `${minutes} minutes ${seconds} seconds`;
    }
    return (
        <div className="stats_page">
            <div className="title">Stats</div>
            <div className="quizzes_played">Played unique quizzes: {quizzes_were_played?quizzes_were_played.length:0}</div>
            <div className="quizzes_played">Completed quizzes: {+localStorage.getItem('completed_quizzes')}</div>
            <div className="quizzes_played">Questions have been answered: {+question_have_been_answered}</div>
            <div className="quizzes_played">Avarage time on quizzes: {avgTime(avg_time)}</div>
            {question_have_been_answered?<Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"inherit"}
                height={"400px"}
                style={style}
            />:null}
        </div>
    )
}

export default StatsPage;