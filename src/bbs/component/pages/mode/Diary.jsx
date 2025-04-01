import AppNavbar from "../../ui/bar/AppNavbar";
import DiarySidebar from "../../ui/bar/DiarySidebar";
import { useState } from "react";


function Diary(){

    const [isOpen, setIsOpen] = useState(false);    

    const sidebarHandler = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div>
            <AppNavbar/>
            <DiarySidebar isOpen={isOpen} 
                          sidebarHandler={sidebarHandler}/> 
                        <div className={`profile-content ${isOpen ? 'sidebar-open' : ''}`}>

                <div className="profile-padding-bottom"></div>
            </div>

        </div>

    );
}

export default Diary;