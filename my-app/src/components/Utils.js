
import React, { useContext} from "react";

import { UidContext } from "./AppContext";
export const dateDiff = (date2, date1) => {
  var diff = {}                           // Initialisation du retour
  var tmp = date2 - date1;
  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures

  tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
  diff.day = tmp;
   
  return diff;
}

export const getPostDate = (num) => {


    let options_hour = {
      hour: "2-digit",
      month: "short",
      day: "numeric",
    };

    let options_day = {
      
      month: "short",
      day: "numeric",
      
    };

    let options_year = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    const date_actuelle = Date.now('2012-07-20 00:00:00');
    const date_diff = dateDiff(date_actuelle, new Date(num));
    if (date_diff.year > 0)
    {var date = new Date(num).toLocaleDateString("fr-FR", options_year);}
    else if (date_diff.day > 2)
    {var date = new Date(num).toLocaleDateString("fr-FR", options_day);}
else if (date_diff.day ==0 && date_diff.hour > 0) {
  //var date = new Date(num).toLocaleDateString("fr-FR", options_min);
  var date = `${date_diff.hour} h`;
  return date;
}
else if (date_diff.day ==0 && date_diff.hour == 0 && date_diff.min > 0) {
  //var date = new Date(num).toLocaleDateString("fr-FR", options_min);
  var date = `${date_diff.min} min`;
  return date;
}
else if (date_diff.day ==0 && date_diff.hour == 0 && date_diff.min == 0) {
  var date = 'A l\'instant';
  return date;
}
else {var date = new Date(num).toLocaleDateString("fr-FR", options_hour);}

    return (date.toString());

  }

  
  export const getDate = (num) => {
    const date_actuelle = Date.now('2012-07-20 00:00:00');
    const date_diff = dateDiff(date_actuelle, num);
  
  
      let options_hour = {
        hour: "2-digit",
    
        month: "short",
        day: "numeric",
      };
  
      let options_day = {
       
        month: "short",
        day: "numeric",
      };
      let options_year = {
      
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      if (date_diff.year > 0)
      {var date = new Date(num).toLocaleDateString("fr-FR", options_year);}
      else if (date_diff.day > 2)
    {var date = new Date(num).toLocaleDateString("fr-FR", options_day);}
else if (date_diff.day ==0 && date_diff.hour > 0) {
  var date = `${date_diff.hour} h`;
  return date;
}
else if (date_diff.day ==0 && date_diff.hour == 0 && date_diff.min > 0) {
  var date = `${date_diff.min} min`;
  return date;
}

else if (date_diff.day ==0 && date_diff.hour == 0 && date_diff.min == 0) {
  var date = 'A l\'instant';
  return date;
}
  else {var date = new Date(num).toLocaleDateString("fr-FR", options_hour);}

    return (date.toString());

  
    }
  

  export const isAdmin = () => {
    const uid = useContext(UidContext);
    const admin_user_id=`${process.env.REACT_APP_ADMIN_USER_ID}`;
    
     
    return admin_user_id==uid ? true : false;
  }