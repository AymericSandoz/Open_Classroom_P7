import React, { useContext } from "react";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";

const Home = () => {
        const uid = useContext(UidContext);
        return (
                <div className="home">
                        <LeftNav />
                        <div className="main">
                                <div className="home-header">
                                        {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
                                </div>
                                <Thread />
                        </div>

                </div>
        );
}

export default Home;