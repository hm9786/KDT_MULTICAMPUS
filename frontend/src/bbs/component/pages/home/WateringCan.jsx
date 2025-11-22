import '../../style/Animation.css';

function WateringCan() {
    return (
        <div className="watering-can">
            <img src='./img/icon/watering-can.png' alt="Watering Can" />
            <img 
                className="water-drop"
                style={styles.waterDropImg}
                src='/img/icon/water-drop.png'
                alt="Water Drop"
            />
        </div>
    );
}

const styles = {
    waterDropImg: {
        width: '50px',
    },
};

export default WateringCan;
