import userRoutes from "../service/endPoints/userEndPoints";
import Api from "../service/axios";

const signup = async (userData) => {
    try {
        const result = await Api.post(userRoutes.register, userData)
        return result.data;
    } catch (error) {
        throw error
    }
}

const login = async (credentials) => {
    try {
        const result = await Api.post(userRoutes.login, credentials);
        return result.data
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw { message: 'Network error or server unavailable' };
        }
    }
}

const getQuestions = async ()=>{
    try {
        const result = await Api.get('/questions')
        console.log(1,result.data);
        
        return result.data
        
    } catch (error) {
        throw error
    }
}

const submitAnswers = async (answers , feedback)=>{
    try {
        const token = localStorage.getItem('token');
        const result = await Api.post('/submit', { answers,feedback}, {
            headers: { Authorization: `Bearer ${token}`}
        })
        return result.data
    }catch (error){
        console.log(error);
        throw error
    }
}

export {
    signup,
    login,
    getQuestions,
    submitAnswers
}