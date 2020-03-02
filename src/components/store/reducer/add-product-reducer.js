import {
    ADD_PRODUCT_INIT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL
} from '../action/actionType';

const addProductReducer = (state={} ,action) => {
    const {type, product} = action;
    switch(type) {
        case ADD_PRODUCT_INIT: 
        return {
            ...state,
            type,
            product
        }
        case ADD_PRODUCT_SUCCESS:
         return {
             ...state,
             type,
             product
         }
        case ADD_PRODUCT_FAIL:
         return {
             ...state,
             type,
             product
         }
         default: 
         return state    
    }
}

export default addProductReducer;