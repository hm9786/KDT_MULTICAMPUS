// profile 사진 변경
import { useState, useRef, useEffect } from "react"; 
import EditImgModal from "../../ui/modal/EditImgModal";
import axios from 'axios';
import '../../style/Profile.css';

function EditImg() {

    const defaultImg = process.env.PUBLIC_URL + '/img/profile/default-img.png';

    const [profileImgUrl, setProfileImgUrl] = useState(defaultImg);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null); 

    const updateHandler = async (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/")) {
            const imgUrl = URL.createObjectURL(file);
            setProfileImgUrl(imgUrl);

            const formData = new FormData();
            formData.append('image', file);

            try {
                await axios.post('/YOUR_BACKEND_API/upload-image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log('Image uploaded successfully');
            } catch (error) {
                console.error('Image upload failed', error);
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
