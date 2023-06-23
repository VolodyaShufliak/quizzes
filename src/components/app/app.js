import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import CategoriesList from "../categories-list/categories-list";
import SingleQuizz from "../single-quizz/single-quizz";
import StatisticAfterTest from "../statistic-after-quizz/statistic-after-quizz";
import StatsPage from "../stats-page/stats-page";


const App = () =>{
    return (
        <Router>
            <div>
                <AppHeader></AppHeader>
                <main>
                    <Routes>
                        <Route path="/quizz" element={<SingleQuizz/>}></Route>
                        <Route path="/finalpage" element={<StatisticAfterTest/>}></Route>
                        <Route path="/stats" element={<StatsPage/>}></Route>
                        <Route path="/" element={<CategoriesList/>}></Route>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;