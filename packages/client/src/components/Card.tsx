export default function Card(props: { cardData: {} }) {
    const { cardData } = props;
    const width = 300;
    const cardStyle = {
        display: 'flex',
        background: 'grey',
        position: 'relative',
        width: width,
        height: width * (4 / 3),
        borderRadius: '15px',
        border: '#ffffff1a',
        margin: 30,
    };

    return (
        <div style={cardStyle}>
            <div style={{ alignItems: 'center' }}>
                <h3>{cardData.title}</h3>
                <img style={{ width: width / 2 }} src={cardData.image}></img>
            </div>
        </div>
    );
}
