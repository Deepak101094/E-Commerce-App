import {DELETE_PRODUCT} from '../action/actionType';

const deleteProductReducer = (state={}, action) => {
const {type, product} = action;
switch(type) {
    case DELETE_PRODUCT: 
    return {
        ...state,
        type,
        product: {
            ...state.product,
            product: {...data}
        }
    }
}
}

export default deleteProductReducer;