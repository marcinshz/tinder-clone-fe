import { Button } from 'primereact/button';
import { getMatches } from '../../DataService';
import { Match, User } from '../../model'
import './MatchListPage.scss'
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';

export default function MatchListPage(props: { user: User }) {
  const [matches, setMatches] = useState<Match[]>([])
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [displayedMatch, setDisplayedMatch] = useState<Match | null>(null);

  const handleFetchMatches = async () => {
    const tmp = await getMatches(props.user.id);
    console.log(tmp)
    if (tmp) setMatches(tmp);
  }

  useEffect(() => {
    handleFetchMatches()
  }, [props])

  const handleCloseModal = () => {
    setShowMatchModal(false);
    setDisplayedMatch(null)
  }
  const handleOpenModal = (match: Match) => {
    setDisplayedMatch(match)
    setShowMatchModal(true)
  }

  return (
    <div className="match-list-page">
      <ul className="match-list-page__list">
        {matches.map((match) => (
          <li className="match-list-page__list__item">
            <img src={match.photo} className="match-list-page__list__item__photo" />
            {match.firstName}
            <Button label="See more" link onClick={() => { handleOpenModal(match) }} />
          </li>
        ))}
      </ul>
      <Dialog header="Your match" visible={showMatchModal} style={{ width: '50vw' }} modal onHide={handleCloseModal}>
        <div className="match-info">
          <div className="match-info__general">
            <img src={displayedMatch?.photo} />
            <div className="match-info__general__text">
              <div className="match-info__general__text__name">{displayedMatch?.firstName}</div>
              <div className="match-info__general__text__bio">{displayedMatch?.aboutMe}</div>
            </div>
          </div>
          <div className="match-info__icon-container">
            <div className="match-info__icon-container__item">
              <i className="pi pi-heart"></i>
              {displayedMatch?.sex === 2 && "Male"}
              {displayedMatch?.sex === 1 && "Female"}
              {displayedMatch?.sex === 3 && "Other"}
            </div>
            <div className="match-info__icon-container__item">
              <i className="pi pi-home"></i>
              {displayedMatch?.city}
            </div>
            <div className="match-info__icon-container__item">
              <i className="pi pi-arrow-up"></i>
              {displayedMatch?.height} cm
            </div>
          </div>
          <div className="match-info__icon-container" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="match-info__icon-container__item">
              <i className="pi pi-book"></i>
              {displayedMatch?.education}
            </div>
            <div className="match-info__icon-container__item">
              <i className="pi pi-money-bill"></i>
              {displayedMatch?.job}
            </div>
          </div>
          <div className="match-info__icon-container" style={{gridTemplateColumns:'1fr 1fr'}}>
            <div className="match-info__icon-container__item">
              <i className="pi pi-facebook"></i>
              <a href={displayedMatch?.facebookLink}>{displayedMatch?.facebookLink}</a>

            </div>
            <div className="match-info__icon-container__item">
              <i className="pi pi-instagram"></i>
              <a href={displayedMatch?.instagramLink}>{displayedMatch?.instagramLink}</a>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
