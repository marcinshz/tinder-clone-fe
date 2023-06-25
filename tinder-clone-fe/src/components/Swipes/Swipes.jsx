import "./Swipes.css";
import React, {useState} from "react";
import TinderCard from "react-tinder-card";
import usePeople from "../hooks/usePeople";
import BottomButtons from "../BottomButtons/BottomButtons";


const Swipes = () => {
    const people = usePeople()
    const [step, setStep] = useState(0)

    const onSwipe = (direction) => {
        console.log("Przesunales w " + ((direction==='right') ? 'prawo' : 'lewo'));
    };

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + " oceniona");
    };

    return (
        <>
            <div className="cards"> 
                {people.map((person) =>(
                        <TinderCard 
                            key={person.name}
                            className="swipe"
                            preventSwipe={["up","down"]}
                        onSwipe={(dir) => onSwipe(dir)}
                        onCardLeftScreen={() => onCardLeftScreen(person.name)}
                        >
                            <div style={{ backgroundImage: `url(${person.image})` }} className="tinder-card">
                                <h1>{person.name}, {person.age}</h1>
                            </div>
                        </TinderCard>
                    ))}          
            </div>
            {/*@todo dopisac funkcjonalne przyciski <BottomButtons onLike={} onDislike={} goBack={} />*/}
        </>
    );
}

export default Swipes;