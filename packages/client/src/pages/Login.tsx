import Button from '@mui/material/Button';
import SignClient from '@walletconnect/sign-client';

export default function Login() {
    const handleConnect = () => {
        console.log('CONNECT!');
        SignClient;
    };
    return (
        <div>
            <h1>Login</h1>
            <Button onClick={handleConnect}>Connect with WalletConnect</Button>
        </div>
    );
}
