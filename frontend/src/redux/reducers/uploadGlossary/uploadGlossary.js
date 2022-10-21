import constants from "../../constants";

export default function (state = {}, action) {
    switch (action.type) {
        
        case constants.UPLOAD_GLOSSARY_FILE:
            return action.payload;

        default:
            return state;
    }
}