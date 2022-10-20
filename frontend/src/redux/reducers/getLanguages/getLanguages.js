import constants from "../../constants";

export default function (state = {}, action) {
    switch (action.type) {
        
        case constants.GET_ALL_LANGUAGE:
          const modifiedData = action.payload?.languages.map((el,i)=>{
            if(el.active){
              return el
            }
          })
            return modifiedData;

        default:
            return state;
    }
}