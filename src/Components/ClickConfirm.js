import '../Styles/ClickConfirm.css'
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { GiConvergenceTarget } from "react-icons/gi";

const ClickConfirm = ( { show, hit, anchorPoint, clickConfirm, miss, gameOver } ) => {
  let y = anchorPoint.y, x = anchorPoint.x, icon = <GiConvergenceTarget id='aiming'/>, bColor = "rgb(127,230,239)"
  
  if (miss)
  {
    icon = <MdClose id='miss-icon'/>;
    bColor = "rgb(202, 17, 17)"
  }
  else if (hit)
  {
    icon = <MdCheck id='checkmark' />;
    bColor = "rgb(75, 211, 75)"
  }
  

  if (show && !gameOver) {
    return (
      <div className="circle-div" onClick={clickConfirm} style={{ top: `calc(${y}px - 2.5em)`, left: `calc(${x}px - 2.5em)`, borderColor: bColor}}>{icon}</div>
    );
  }
  return <></>;
};

export default ClickConfirm;