import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    console.log('uid :' + uid);

    useEffect(() => {
        if (post.usersLiked.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.usersLiked, liked]);

    return (<div className="like-container">
        {uid === null && (
            <Popup
                trigger={<img src="../images/heart.png" alt="like" />}
                position={["bottom center", "bottom right", "bottom left"]}
                closeOnDocumentClick
            >
                <div>Connectez-vous pour aimer un post !</div>
            </Popup>
        )}
    </div>
    );
};

export default LikeButton;