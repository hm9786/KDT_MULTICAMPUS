// profile 사진 변경
import { useState, useRef, useEffect } from "react"; 
import EditImgModal from "../../ui/modal/EditImgModal";
import axios from 'axios';
import API_BASE_URL from '../../../utils/api';
import '../../style/Profile.css';

function EditImg() {

    const defaultImg = process.env.PUBLIC_URL + '/img/profile/default-img.png';
    const userId = parseInt(localStorage.getItem('userId') || '0');

    const [profileImgUrl, setProfileImgUrl] = useState(defaultImg);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);

    // 프로필 이미지 로드
    useEffect(() => {
        const fetchProfileImage = async () => {
            if (!userId) return;
            try {
                const response = await axios.get(`${API_BASE_URL}/users/${userId}/profile`);
                if (response.data && response.data.profilePicture) {
                    setProfileImgUrl(`http://localhost:8001${response.data.profilePicture}`);
                }
            } catch (error) {
                console.error('프로필 이미지 로드 실패:', error);
            }
        };
        fetchProfileImage();
    }, [userId]); 

    const updateHandler = async (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/")) {
            const imgUrl = URL.createObjectURL(file);
            setProfileImgUrl(imgUrl);

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post(`${API_BASE_URL}/users/${userId}/profile-image`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log('Image uploaded successfully', response.data);
                if (response.data.imageUrl) {
                    setProfileImgUrl(`http://localhost:8001${response.data.imageUrl}`);
                }
            } catch (error) {
                console.error('Image upload failed', error);
                alert('이미지 업로드에 실패했습니다.');
            }
        }
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(profileImgUrl);
        };
    }, [profileImgUrl]);

    const showModalHandler = () => setShowModal(true);
    const deleteImgHandler = () => {
        setProfileImgUrl(defaultImg);
        setShowModal(false);
    };
    const cancelHandler = () => setShowModal(false);
    const editHandler = () => {
        setShowModal(false); 
        setTimeout(() => fileInputRef.current?.click(), 100);
    };

    return (
        <div className="edit-img-container">
            <div className="edit-img-img-container">
                <img src={profileImgUrl} className="edit-img-img" alt="Profile" />
                <img 
                    src={process.env.PUBLIC_URL + '/img/button/img-edit.png'}
                    alt="Upload" 
                    className="edit-img-upload-button" 
                    onClick={showModalHandler} 
                />

                <input 
                    id="fileInput"
                    type="file" 
                    accept="image/*"
                    onChange={updateHandler} 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                />
            </div>

            <EditImgModal 
                show={showModal} 
                onDelete={deleteImgHandler}
                onEdit={editHandler} 
                onCancel={cancelHandler} 
            />
        </div>
    );
}

export default EditImg;
