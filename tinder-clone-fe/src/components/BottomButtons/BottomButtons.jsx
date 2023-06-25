import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import IconButton from '@mui/material/IconButton';
import "./BottomButtons.css";

const BottomButtons = ({onLike, onDislike, goBack}) => {
    return(
        <div className="footer">
            <IconButton aria-label="reload" size="large" onClick={goBack}>           
                <ReplaySharpIcon fontSize="large" style={{color: "rgba(209, 212, 21, 0.952)"}}/>
            </IconButton>
            <IconButton aria-label="dislike" size="large" onClick={onDislike}>
                <ClearRoundedIcon fontSize="large" style={{color: "rgb(240, 78, 78)"}} />
            </IconButton>
            <IconButton aria-label="superlike" size="large">
                <GradeRoundedIcon fontSize="large" style={{color: "rgb(8, 191, 252)"}} />
            </IconButton>
            <IconButton aria-label="like" size="large" onClick={onLike}>
                <FavoriteSharpIcon fontSize="large" style={{color: "rgb(111, 221, 173)"}} />
            </IconButton>
            <IconButton aria-label="boost" size="large">
                <ElectricBoltRoundedIcon fontSize="large" style={{color: "rgb(145, 93, 209)"}} />
            </IconButton>
        </div>
    );
}

export default BottomButtons;