
import React, { useContext} from "react";

import { UidContext } from "./AppContext";

export const getDate = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let date = new Date(num).toLocaleDateString("fr-FR", options);
  
    return date.toString();
  }

  export const dateParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let timestamp = Date.parse(num);
  
    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  
    return date.toString();
  };

  export const isAdmin = () => {
    const uid = useContext(UidContext);
    //const admin_user_id=`${process.env.REACT_APP_ADMIN_USER_ID}`;
    const admin_user_id='6322321abd94b7e4c5f762a1';
     
    return admin_user_id==uid ? true : false;
  }