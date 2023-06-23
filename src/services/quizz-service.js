import useHttp from "../hooks/http-hook";

const useQuizzService = () => {
    const {loading,request,error,clearError} = useHttp();
    const amount = 10;
    const getCategories = async () => {
        try {
            // const res = await request('http://localhost:8010/proxy/api_category.php');
            const res = await request('https://opentdb.com/api_category.php');
            const data = res.trivia_categories; 
            return data;
        } catch (error) {
            return [];
        }
    }

    const getCategoryTest = async (category) => {
        try {
            // const res = await request(`http://localhost:8010/proxy/api.php?amount=${amount}&category=${category}`);
            const res = await request(`https://opentdb.com/api.php?amount=${amount}&category=${category}`);
            const data = res.results; 
            return data.map((elem)=>{
                return {...elem,allAnswers:[...elem.incorrect_answers,elem.correct_answer]}
            });
        } catch (error) {
            return [];
        }
    }

    return {loading,error,clearError,getCategories,getCategoryTest}
}
export default useQuizzService;