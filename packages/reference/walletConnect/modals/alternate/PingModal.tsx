import './modalStyles.css';

interface IPingModalProps {
    pending: boolean;
    result: any;
}

export default function PingModal(props: IPingModalProps) {
    const { pending, result } = props;

    return (
        <>
            {pending ? (
                <div className="SModalContainer">
                    <div className='SModalTitle'>
                        Pending Session Ping
                    </div>
                    <div className='SContainer'>
                        Loading
                    </div>
                </div>
            ) : result ? (
                <div className='SModalContainer'>
                    <div className='SModalTitle'>
                        {result.valid ? "Successful Session Ping" : "Failed Session Ping"}
                    </div>
                </div>
            ) : (
                <div className='SModalContainer'>
                    <div className='SModalTitle'>
                        Unknown Error with Session Ping
                    </div>
                </div>
            )}
        </>
    );
}