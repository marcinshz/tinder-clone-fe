import React, { useState, useEffect } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import IconButton from '@mui/material/IconButton';
import { Dialog } from 'primereact/dialog';
import './Swipes.css';
import './../../pages/MatchListPage/MatchListPage.scss'

const Swipes = ({user}) => {
  const [draws, setDraws] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [igLinkToDisplay, setIgLinkToDislplay] = useState('')

  // Przykładowa funkcja do pobierania danych z serwera
  const fetchDrawData = async () => {
    const url = `https://localhost:7127/User/draw/${user.id}`

    try {
        const response = await fetch(url);
        if (response.status === 200) {
          const data = await response.json();
          setDraws(data);
        } else {
          console.log('Nie udało się pobrać danych użytkowników.');
        }
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }

  };

  const fetchLikesData = async () => {
    const url = `https://localhost:7127/User/getLikedMe/${user.id}`

    try {
        const response = await fetch(url);
        if (response.status === 200) {
          const data = await response.json();
          setLikes(data);
        } else {
          console.log('Nie udało się pobrać danych użytkowników.');
        }
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }

  };

  useEffect(() => {
    fetchDrawData();
    fetchLikesData();
  }, []);

  const handleLike = async (currentPerson) => {
    const url = `https://localhost:7127/api/Like/like/${user.id}/${currentPerson.id}`
    try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "text/json",
        },
        });
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }

    likes.map((person) => {
        if (person.id === currentPerson.id){
            setShowMatchModal(true)
            setIgLinkToDislplay(person.instagramLink)
        }
    })
    
    setCurrentPersonIndex(currentPersonIndex + 1);
  };

  const handleDislike = async (currentPerson) => {
    const url = `https://localhost:7127/api/Like/disLike/${user.id}/${currentPerson.id}`

    try {
        const response = await fetch(url, {method: "GET"});
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }

    setCurrentPersonIndex(currentPersonIndex + 1);
  };

  const handleCloseModal = () => {
    setShowMatchModal(false);
  };

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
  
    let age = today.getFullYear() - dob.getFullYear();
  
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
  
    return age;
  }




  if (currentPersonIndex >= draws.length) {
    return <div className="tinder-cards">No more people to display.</div>;
  }

  if (draws.length === 0) {
    return <div className="tinder-cards">Loading...</div>;
  }

  const currentPerson = draws[currentPersonIndex];
  const previousPerson = draws[currentPersonIndex-1]

  return (
    <div className="tinder-cards">
        {showMatchModal && (
      <Dialog header="It's a match!" visible={showMatchModal} style={{ width: '50vw' }} modal onHide={() => {setShowMatchModal(false)}}>
      <div className="match-info">
        <div className="match-info__general">
          <img src={previousPerson?.photo} />
          <div className="match-info__general__text">
            <div className="match-info__general__text__name">{previousPerson?.firstName}</div>
            <div className="match-info__general__text__bio">{previousPerson?.aboutMe}</div>
          </div>
        </div>
        <div className="match-info__icon-container">
          <div className="match-info__icon-container__item">
            <i className="pi pi-heart"></i>
            {previousPerson?.sex === 2 && "Male"}
            {previousPerson?.sex === 1 && "Female"}
            {previousPerson?.sex === 3 && "Other"}
          </div>
          <div className="match-info__icon-container__item">
            <i className="pi pi-home"></i>
            {previousPerson?.city}
          </div>
          <div className="match-info__icon-container__item">
            <i className="pi pi-arrow-up"></i>
            {previousPerson?.height} cm
          </div>
        </div>
        <div className="match-info__icon-container" style={{gridTemplateColumns:'1fr 1fr'}}>
        <div className="match-info__icon-container__item">
            <i className="pi pi-book"></i>
            {previousPerson?.education}
          </div>
          <div className="match-info__icon-container__item">
            <i className="pi pi-money-bill"></i>
            {previousPerson?.job}
          </div>
        </div>
        <div className="match-info__icon-container" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="match-info__icon-container__item">
            <i className="pi pi-facebook"></i>
            <a href={previousPerson?.facebookLink}>{previousPerson?.facebookLink}</a>

          </div>
          <div className="match-info__icon-container__item">
            <i className="pi pi-instagram"></i>
            <a href={previousPerson?.instagramLink}>{previousPerson?.instagramLink}</a>
          </div>
        </div>
      </div>
    </Dialog>
      )}
      <div className="card">
        <img className="card-image" src={currentPerson.photo} alt={currentPerson.firstName} />
        <div className="card-info">
          <h2 className="card-name">{currentPerson.firstName}</h2>
          <p className="card-details">Age: {calculateAge(currentPerson.birthDate)}</p>
          <p className="card-details">Description: {currentPerson.aboutMe}</p>
        </div>
      </div>
      <div className="buttons">
        <IconButton aria-label="dislike" size="large" onClick={() => {handleDislike(currentPerson)}} disabled={showMatchModal}>
                <ClearRoundedIcon fontSize="large" style={{color: "rgb(240, 78, 78)"}} />
            </IconButton>
        <IconButton aria-label="like" size="large" onClick={() => {handleLike(currentPerson)}} disabled={showMatchModal}>
                <FavoriteSharpIcon fontSize="large" style={{color: "rgb(111, 221, 173)"}} />
        </IconButton>
      </div>
    </div>
  );
};

export default Swipes;
