import React, { useContext } from "react";
import TopButtons from "../../components/TopButtons/TopButtons";
import Swipes from "../../components/Swipes/Swipes";
import BottomButtons from "../../components/BottomButtons/BottomButtons";
import UserContext from '../../context';
import { User } from "../../model";

const SwipingArea = (props:{user:User}) => {
    console.log('swipe',props.user)
    return (
        <>
            <TopButtons />
            <Swipes />
            <BottomButtons />
        </>
    )
}
export default SwipingArea