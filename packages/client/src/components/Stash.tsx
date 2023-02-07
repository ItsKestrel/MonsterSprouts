import Card from './Card';

export default function Stash() {
    const cardData = {
        title: 'Sword',
        image: 'https://cdn-icons-png.flaticon.com/512/842/842184.png',
        type: 'weapon',
    };
    const deck = [
        {
            cardData: cardData,
        },
        {
            cardData: cardData,
        },
        {
            cardData: cardData,
        },
        {
            cardData: cardData,
        },
        {
            cardData: cardData,
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-4">
            {deck.map((card) => {
                return <Card cardData={card.cardData} />;
            })}
        </div>
    );
}
