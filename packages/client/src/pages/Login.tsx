import Button from '@mui/material/Button';

export default function Login() {
    const handleConnect = () => {
        console.log('CONNECT!');
    }
    return (
        <div>
            <h1>Login</h1>
            <Button onClick={handleConnect}>Connect with WalletConnect</Button>

        </div>
    );
}
