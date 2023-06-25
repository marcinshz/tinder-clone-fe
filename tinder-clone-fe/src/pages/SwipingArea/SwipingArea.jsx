import React from "react";
import TopButtons from "../../components/TopButtons/TopButtons";
import Swipes from "../../components/Swipes/Swipes";
import BottomButtons from "../../components/BottomButtons/BottomButtons";


const SwipingArea = ({user}) => {

    return (
        <>
            <TopButtons />
            <Swipes />
            <BottomButtons />
        </>
    )
}
export default SwipingArea