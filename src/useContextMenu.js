//https://blog.logrocket.com/creating-context-menu-react/#:~:text=What%20is%20a%20context%20menu,a%20right%2Dclick%20mouse%20operation.

import { useState } from "react";

const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    }

  const handleClickMenu = e => (show ? setShow(false) : handleContextMenu(e));

  
  return { anchorPoint, show, handleClickMenu, setShow };
};

export default useContextMenu;