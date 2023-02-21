import { CoreTypes, ProposalTypes } from '@walletconnect/types';

export const PROJECT_ID = process.env.PROJECT_ID!;
export const RELAY_URL = process.env.RELAY_URL!;
export const CHAIN_ID = process.env.CHAIN_ID!;

export const REQUIRED_NAMESPACES: ProposalTypes.RequiredNamespaces = {
    chia: {
        methods: [
            'chia_sendTransaction',
            'chia_getNextAddress',
            'chia_logIn',
            'chia_signMessageByAddress',
            'chia_signMessageById',
            'chia_getSyncStatus',
        ],
        chains: [CHAIN_ID],
        events: [],
    },
};

export const METADATA: CoreTypes.Metadata = {
    name: 'Monster Sprouts',
    description: 'A game on the Chia blockchain.',
    url: '#',
    icons: ['https://walletconnect.com/walletconnect-logo.png'],
};
