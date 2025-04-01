import React, { useState, useEffect } from 'react';
import ProfileSidebar from '../ui/bar/ProfileSidebar';
import AppNavbar from '../ui/bar/AppNavbar';
import EditImg from './profile/EditImg';
import EditTxt from './profile/EditTxt';
import Reward from './profile/Reward';
import '../style/Profile.css';



function Profile({  userId = 2 }) { // userId를 props로 받음
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null); // 프로필 데이터 상태 추가

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
                    {profileData ? ( // 프로필 데이터가 있을 경우 표시
                        <div>
                            <h2>{profileData.nickname}</h2>
                            <p>{profileData.introduce}</p>
                            {profileData.profile_picture && (
                                <img src={profileData.profile_picture} alt="Profile" />
                            )}
                        </div>
                    ) : (
                        <p>프로필 데이터를 불러오는 중입니다...</p>
                    )}
                </div>
                <EditImg />
                
                <EditTxt        
                    userId={userId} //로그인 상태변화 되면 여기로 userId값을 받으면 됨
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
