import React, { useState, useEffect } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import IconButton from '@mui/material/IconButton';
import './Swipes.css';

const Swipes = () => {
  const [people, setPeople] = useState([]);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);

  // Przykładowa funkcja do pobierania danych z serwera
  const fetchData = async () => {

    try {
        const response = await fetch('https://localhost:44304/User/draw/{userId}');
        if (response.status === 200) {
          const data = await response.json();
          setPeople(data);
        } else {
          console.log('Nie udało się pobrać danych użytkowników.');
        }
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }

    const dummyData = [
      { id: 1, name: 'John', age: 25, description: 'Lorem ipsum', imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" },
      { id: 2, name: 'Jane', age: 28, description: 'Dolor sit amet', imageUrl: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" },
      // Dodaj więcej osób
    ];

    setPeople(dummyData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLike = () => {
    setShowMatchModal(true)
    // Wywołaj request POST do serwera z informacją o polubieniu osoby
    // Tu możesz dodać własną logikę związaną z obsługą polubień

    // Przejdź do następnej osoby
    setCurrentPersonIndex(currentPersonIndex + 1);
  };

  const handleDislike = () => {
    // Wywołaj request POST do serwera z informacją o odrzuceniu osoby
    // Tu możesz dodać własną logikę związaną z obsługą odrzuceń

    // Przejdź do następnej osoby
    setCurrentPersonIndex(currentPersonIndex + 1);
  };

  const handleCloseModal = () => {
    setShowMatchModal(false);
  };


  if (people.length === 0) {
    return <div className="tinder-cards">Loading...</div>;
  }

  if (currentPersonIndex >= people.length) {
    return <div className="tinder-cards">No more people to display.</div>;
  }

  const currentPerson = people[currentPersonIndex];

  return (
    <div className="tinder-cards">
        {showMatchModal && (
        <div className="modal">
            <div className="modal-content">
                <h2>It's a Match!</h2>
                <p>You matched with Jadwiga!</p>
                <button onClick={handleCloseModal}>Close</button>
            </div>
            </div>
      )}
      <div className="card">
        <img className="card-image" src={currentPerson.imageUrl} alt={currentPerson.name} />
        <div className="card-info">
          <h2 className="card-name">{currentPerson.name}</h2>
          <p className="card-details">Age: {currentPerson.age}</p>
          <p className="card-details">Description: {currentPerson.description}</p>
        </div>
      </div>
      <div className="buttons">
        <IconButton aria-label="dislike" size="large" onClick={handleDislike}>
                <ClearRoundedIcon fontSize="large" style={{color: "rgb(240, 78, 78)"}} />
            </IconButton>
        <IconButton aria-label="like" size="large" onClick={handleLike}>
                <FavoriteSharpIcon fontSize="large" style={{color: "rgb(111, 221, 173)"}} />
        </IconButton>
      </div>
    </div>
  );
};

export default Swipes;