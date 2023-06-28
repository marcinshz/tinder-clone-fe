import React, { useContext } from "react";
import Swipes from "../../components/Swipes/Swipes";
import BottomButtons from "../../components/BottomButtons/BottomButtons";
import UserContext from '../../context';
import { User } from "../../model";

const SwipingArea = (props:{user:User}) => {
    console.log('swipe',props.user)
    return (
        <>
            <Swipes user={props.user}/>
        </>
    )
}
export default SwipingArea