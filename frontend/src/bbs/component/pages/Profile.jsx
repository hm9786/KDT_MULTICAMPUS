import React, { useState, useEffect } from 'react';
import ProfileSidebar from '../ui/bar/ProfileSidebar';
import AppNavbar from '../ui/bar/AppNavbar';
import EditImg from './profile/EditImg';
import EditTxt from './profile/EditTxt';
import Reward from './profile/Reward';
import '../style/Profile.css';

function Profile({ userId = 2 }) {
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const sidebarHandler = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="profile-container">
            <AppNavbar />
            <ProfileSidebar isOpen={isOpen} sidebarHandler={sidebarHandler}/> 

            <div className={`profile-content ${isOpen ? 'sidebar-open' : ''}`}>
                <div className="profile-center">
                    <h1 className="profile-title">Profile</h1>
                    {profileData ? (
                        <div>
                            <h2>{profileData.nickname}</h2>
                            <p>{profileData.introduce}</p>
                            {profileData.profile_picture && (
                                <img src={profileData.profile_picture} alt="Profile" />
                            )}
                        </div>
                    ) : (
                        <p>프로필 정보를 불러오는 중입니다...</p>
                    )}
                </div>
                <EditImg /> 
                
                <EditTxt        
                    userId={userId}
                />

                <div className="profile-reward">
                <Reward 
                    userId={userId} 
                /> 

                </div>
                <div className="profile-padding-bottom"></div>
            </div>
        </div>
    );
}

export default Profile;
