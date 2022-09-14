
import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";


//Objectif : stocker ID pour vérifier à chaque fois si notre utilisateurs est connecté ou pas. 
//Le problème est que je veux récupérer token(donc faire une requete get) mais je dois
const App = () => {
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "post",

                url: 'http://localhost:5000/jwtid',
                data: {
                    token: localStorage.getItem('token')
                },

                //withCredentials: true,
            })
                .then((res) => {//QUESTION MENTOR POURQUOI ça ne marche pas ? 
                    console.log(res.data);
                    setUid(res.data);
                })
                .catch((err) => console.log("No token   333"));
        };
        fetchToken();
       

    }, [uid]);

    return (
        <UidContext.Provider value={uid} >
            <Routes />
        </UidContext.Provider>
    )
}

export default App;