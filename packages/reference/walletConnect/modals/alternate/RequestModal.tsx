import './modalStyles.css';

interface IRequestModalProps {
    pending: boolean;
    result: any;
}

export default function RequestModal(props: IRequestModalProps) {
    const { pending, result } = props;

    return (
        <>
            {pending ? (
                <div className="SModalContainer">
                    <div className="SModalTitle">
                        Pending JSON-RPC Request
                    </div>
                    <div className="SContainer">
                        Loading
                        <p className="SModalParagraph">
                            Approve or reject request using your wallet
                        </p>
                    </div>
                </div>
            ) : result ? (
                <div className="SModalContainer">
                    <div className="SModalTitle">
                        {result.valid
                            ? "JSON-RPC Request Approved"
                            : "JSON-RPC Rquest Failed"}
                    </div>
                    <div className="SContainer STable">
                        {Object.keys(result).map((key) => (
                            <div className='SRow' key={key}>
                                <div className='SKey'>{key}</div>
                                <div className='SValue'>{result[key].toString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='SModalContainer'>
                    <div className='SModalTitle'>
                        JSON-RPC Request Rejected
                    </div>
                </div>
            )}
        </>
    );
}