import { quizzReducer } from "../reducers/quizz-reducer";
import { configureStore } from "@reduxjs/toolkit";


const stringMiddleware = () => (next) => (action) => {
        if (typeof action === "string"){
                return next({
                        type:action
                })
        }
        return next(action)
}
export const store = configureStore({
        reducer:quizzReducer,
        middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(stringMiddleware),
        devTools:process.env.NODE_ENV !== "production",

})