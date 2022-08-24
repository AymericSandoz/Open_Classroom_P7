import axios from "axios";

export const GET_POSTS = "GET_POSTS";

export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get('http://localhost:5000/api/post/')
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data });;
                console.log("res data" + res.data);
            })
            .catch((err) => console.log('requête axios de post actions ne fonctionne pas' + err));
    };
};