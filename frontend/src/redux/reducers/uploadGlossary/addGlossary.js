import constants from "../../constants";

export default function (state = {}, action) {
    switch (action.type) {
        
        case constants.ADD_INDIVIDUAL_GLOSSARY:
            return action.payload;

        default:
            return state;
    }
}