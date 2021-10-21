const initialState = []

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USERS":
            const datas = JSON.parse(localStorage.getItem("users"))
            if (datas) {
                return state = JSON.parse(localStorage.getItem("users"))
            } else {
                return state;
            }
        case "SIGNUP_USER":
            action.payload.isSignedIn = true;
            state = [...state, action.payload]
            localStorage.setItem("users", JSON.stringify(state));
            return state

        case "LOGIN_USER":
            const user = state.find(state => state.id == action.payload)
            user.isSignedIn = true;
            localStorage.setItem("users", JSON.stringify(state));
            return state

        case "LOGOUT":
            const index = state.find(state => state.isSignedIn == true)
            index.isSignedIn = false;
            localStorage.setItem("users", JSON.stringify(state));
            return state

        case "UPDATE_USER":
            const existData = [...state];
            const data = action.payload
            const updateUser = state.find(state => state.id == data.id)
            const indexUser = state.findIndex(state => state.id == data.id)
            console.log(indexUser);
            if (data.password == "") {
                data.password = updateUser.password
            }
            if (data.proPic == "") {
                data.proPic = updateUser.proPic
            }
            data.isSignedIn = updateUser.isSignedIn
            // console.log(data);
            existData.splice(indexUser, 1, data);
            state = existData;
            localStorage.setItem("users", JSON.stringify(state));
            return state;


        case "DELETE_USER":
            const deleted = state.filter(ele => ele.id != action.payload)
            state = deleted
            localStorage.setItem("users", JSON.stringify(state));
            return state
        default:
            return state;
    }
}

export default userReducer