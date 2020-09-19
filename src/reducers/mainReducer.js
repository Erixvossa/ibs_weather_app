const initialValue = {
    result: "las vegas",
    loading: false,
    data: {},
    error: ""
};

export const mainReducer = (state = initialValue, action) => {
    switch (action.type) {
        case "FETCHING_DATA":
            return {
                ...state,
                loading: true
            };
        case "GET_VALUE":
            return {
                ...state,
                result: action.payload.value
            };
        case "GOT_DATA":
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};