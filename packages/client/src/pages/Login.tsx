import Button from '@mui/material/Button';
import { SignClient } from '@walletconnect/sign-client';
import { SessionTypes } from '@walletconnect/types';
import { Web3Modal } from '@web3modal/standalone';
import { useEffect } from 'react';
import { useGlobalState } from '../App';

export default function Login() {
    const [session, setSession] = useGlobalState('session');
    const [signClient, setSignClient] = useGlobalState('signClient');

    async function setupWalletConnect() {
        const signClient = await SignClient.init({
            projectId: process.env.PUBLIC_PROJECT_ID,
            relayUrl: process.env.PUBLIC_RELAY_URL,
            metadata: {
                name: 'Monster Sprouts',
                description: 'A game on the Chia blockchain.',
                url: '#',
                icons: ['https://walletconnect.com/walletconnect-logo.png'],
            },
        });

        signClient.on('session_event', () => {});

        signClient.on('session_update', ({ topic, params }) => {
            const { namespaces } = params;
            const _session = signClient.session.get(topic);
            const updatedSession: SessionTypes.Struct = {
                ..._session,
                namespaces,
            };
            setSession(updatedSession);
        });

        signClient.on('session_delete', () => {
            setSession(null);
        });

        setSignClient(signClient);
    }

    async function login() {
        if (signClient === null) return;

        const web3Modal = new Web3Modal({
            projectId: process.env.PUBLIC_PROJECT_ID!,
            standaloneChains: [process.env.CHAIN_ID!],
            walletConnectVersion: 2,
        });

        try {
            const { uri, approval } = await signClient.connect({
                pairingTopic: undefined,
                requiredNamespaces: {
                    chia: {
                        methods: [
                            'chia_sendTransaction',
                            'chia_getNextAddress',
                            'chia_logIn',
                            'chia_signMessageByAddress',
                            'chia_signMessageById',
                            'chia_getSyncStatus',
                        ],
                        chains: [process.env.CHAIN_ID!],
                        events: [],
                    },
                },
            });

            if (uri) {
                web3Modal.openModal({ uri });
                const session = await approval();
                setSession(session);
                web3Modal.closeModal();
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        setupWalletConnect();
    }, []);

    return (
        <div>
            <h1>Login</h1>
            <p>
                {session === null
                    ? 'Not logged in'
                    : 'Logged in, holy shit it worked'}
            </p>
            <Button disabled={signClient === null} onClick={login}>
                Connect with WalletConnect
            </Button>
        </div>
    );
}
