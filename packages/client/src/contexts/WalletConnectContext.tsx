import Client from '@walletconnect/sign-client';
import { PairingTypes, SessionTypes } from '@walletconnect/types';
import { getSdkError } from '@walletconnect/utils';
import { Web3Modal } from '@web3modal/standalone';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    METADATA,
    PROJECT_ID,
    RELAY_URL,
    REQUIRED_NAMESPACES,
} from '../constants/walletconnect';

interface WalletConnect {
    client: Client | undefined;
    session: SessionTypes.Struct | undefined;
    connect: (pairing?: { topic: string }) => Promise<void>;
    disconnect: () => Promise<void>;
    isInitializing: boolean;
    pairings: PairingTypes.Struct[];
    accounts: string[];
}

export const WalletConnectContext = createContext<WalletConnect>(
    {} as WalletConnect
);

export function WalletConnectContextProvider({
    children,
}: {
    children: ReactNode | ReactNode[];
}) {
    const [client, setClient] = useState<Client>();
    const [pairings, setPairings] = useState<PairingTypes.Struct[]>([]);
    const [session, setSession] = useState<SessionTypes.Struct>();
    const [isInitializing, setIsInitializing] = useState(false);
    const [accounts, setAccounts] = useState<string[]>([]);

    const reset = () => {
        setSession(undefined);
        setAccounts([]);
    };

    const onSessionConnected = useCallback((session: SessionTypes.Struct) => {
        const allNamespaceAccounts = Object.values(session.namespaces)
            .map((namespace) => namespace.accounts)
            .flat();

        setSession(session);
        setAccounts(allNamespaceAccounts);
    }, []);

    const connect = useCallback(
        async (pairing: any) => {
            if (!client) {
                throw new Error('WalletConnect is not initialized');
            }

            const web3Modal = new Web3Modal({
                projectId: process.env.PROJECT_ID!,
                standaloneChains: [process.env.CHAIN_ID!],
                walletConnectVersion: 2,
            });

            let wasOpened = false;

            try {
                const { uri, approval } = await client.connect({
                    pairingTopic: pairing?.topic,
                    requiredNamespaces: REQUIRED_NAMESPACES,
                });

                if (uri) {
                    web3Modal.openModal({ uri });
                    wasOpened = true;
                }

                const session = await approval();
                onSessionConnected(session);
                setPairings(client.pairing.getAll({ active: true }));
            } catch (e) {
                if (e !== undefined) {
                    console.log(e);
                }
            } finally {
                if (wasOpened) {
                    web3Modal.closeModal();
                }
            }
        },
        [client, onSessionConnected]
    );

    const disconnect = useCallback(async () => {
        if (!client) {
            throw new Error('WalletConnect is not initialized');
        }

        if (!session) {
            throw new Error('Session is not connected');
        }

        await client.disconnect({
            topic: session.topic,
            reason: getSdkError('USER_DISCONNECTED'),
        });

        reset();
    }, [client, session]);

    const subscribeToEvents = useCallback(
        async (client: Client) => {
            if (!client) {
                throw new Error('WalletConnect is not initialized');
            }

            client.on('session_update', ({ topic, params }) => {
                const { namespaces } = params;
                const session = client.session.get(topic);
                const updatedSession = { ...session, namespaces };
                onSessionConnected(updatedSession);
            });

            client.on('session_delete', () => {
                reset();
            });
        },
        [onSessionConnected]
    );

    const checkPersistedState = useCallback(
        async (client: Client) => {
            if (!client) {
                throw new Error('WalletConnect is not initialized.');
            }

            setPairings(client.pairing.getAll({ active: true }));

            if (session) return;

            if (client.session.length) {
                const lastKeyIndex = client.session.keys.length - 1;
                const session = client.session.get(
                    client.session.keys[lastKeyIndex]
                );

                onSessionConnected(session);
                return session;
            }
        },
        [session, onSessionConnected]
    );

    const createClient = useCallback(async () => {
        try {
            setIsInitializing(true);

            const client = await Client.init({
                relayUrl: RELAY_URL,
                projectId: PROJECT_ID,
                metadata: METADATA,
            });

            setClient(client);
            await subscribeToEvents(client);
            await checkPersistedState(client);
        } catch (err) {
            throw err;
        } finally {
            setIsInitializing(false);
        }
    }, [checkPersistedState, subscribeToEvents]);

    useEffect(() => {
        if (!client) {
            createClient();
        }
    }, [createClient]);

    const value = useMemo(
        () => ({
            pairings,
            isInitializing,
            accounts,
            client,
            session,
            connect,
            disconnect,
        }),
        [
            pairings,
            isInitializing,
            accounts,
            client,
            session,
            connect,
            disconnect,
        ]
    );

    return (
        <WalletConnectContext.Provider
            value={{
                ...value,
            }}
        >
            {children}
        </WalletConnectContext.Provider>
    );
}

export function useWalletConnectClient() {
    const context = useContext(WalletConnectContext);
    if (context === undefined) {
        throw new Error(
            'useWalletConnectClient must be used within a WalletConnectContext provider'
        );
    }
    return context;
}
