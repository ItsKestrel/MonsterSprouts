import React, { useEffect, useRef, useState } from "react";

import Banner from "./components/Banner";
import Blockchain from "./components/Blockchain";
import Column from "./components/Column";
import Dropdown from "./components/Dropdown";
import Header from "./components/Header";
import Modal from "./components/Modal";
import {
  DEFAULT_COSMOS_METHODS,
  DEFAULT_EIP155_METHODS,
  DEFAULT_MAIN_CHAINS,
  DEFAULT_SOLANA_METHODS,
  DEFAULT_POLKADOT_METHODS,
  DEFAULT_ELROND_METHODS,
  DEFAULT_TEST_CHAINS,
  DEFAULT_NEAR_METHODS,
  DEFAULT_CHIA_METHODS,
} from "./constants";
import { AccountAction, setLocaleStorageTestnetFlag } from "./helpers";
import Toggle from "./components/Toggle";
import RequestModal from "./modals/RequestModal";
import PairingModal from "./modals/PairingModal";
import PingModal from "./modals/PingModal";
import {
  SAccounts,
  SAccountsContainer,
  SButtonContainer,
  SConnectButton,
  SContent,
  SLanding,
  SLayout,
  SToggleContainer,
} from "./components/app";
import { useWalletConnectClient } from "./contexts/ClientContext";
import { useJsonRpc } from "./contexts/JsonRpcContext";
import { useChainData } from "./contexts/ChainDataContext";

// Normal import does not work here
const { version } = require("@walletconnect/sign-client/package.json");

/* const Home: NextPage = () => { */
const WalletConnect = () => {
  const [modal, setModal] = useState("");

  const closeModal = () => setModal("");
  const openPairingModal = () => setModal("pairing");
  const openPingModal = () => setModal("ping");
  const openRequestModal = () => setModal("request");

  // Initialize the WalletConnect client.
  const {
    client,
    pairings,
    session,
    connect,
    disconnect,
    chains,
    relayerRegion,
    accounts,
    balances,
    isFetchingBalances,
    isInitializing,
    setChains,
    setRelayerRegion,
  } = useWalletConnectClient();

  // Use `JsonRpcContext` to provide us with relevant RPC methods and states.
  const {
    ping,
    chiaRpc,
    isRpcRequestPending,
    rpcResult,
    isTestnet,
    setIsTestnet,
  } = useJsonRpc();

  const { chainData } = useChainData();

  // Close the pairing modal after a session is established.
  useEffect(() => {
    if (session && modal === "pairing") {
      closeModal();
    }
  }, [session, modal]);

  const onConnect = () => {
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    // Suggest existing pairings (if any).
    if (pairings.length) {
      openPairingModal();
    } else {
      // If no existing pairings are available, trigger `WalletConnectClient.connect`.
      connect();
    }
  };

  const onPing = async () => {
    openPingModal();
    await ping();
  };

  const getChiaActions = (): AccountAction[] => {
    const onSendTransaction = async (chainId: string, address: string) => {
      openRequestModal();
      await chiaRpc.testSendTransaction(chainId, address);
    };

    const onNewAddress = async (chainId: string, address: string) => {
      openRequestModal();
      await chiaRpc.testNewAddress(chainId, address);
    };

    const onLogIn = async (chainId: string, address: string) => {
      openRequestModal();
      await chiaRpc.testLogIn(chainId, address);
    };

    const onSignMessageByAddress = async (chainId: string, address: string) => {
      openRequestModal();
      await chiaRpc.testSignMessageByAddress(chainId, address);
    };

    const onSignMessageById = async (chainId: string, address: string) => {
      openRequestModal();
      await chiaRpc.testSignMessageById(chainId, address);
    };

    const onGetWalletSyncStatus = async (chainId: string, address: string) => {
      openRequestModal();
      await chiaRpc.testGetWalletSyncStatus(chainId, address);
    };

    

    return [
      {
        method: DEFAULT_CHIA_METHODS.CHIA_SEND_TRANSACTION,
        callback: onSendTransaction,
      },
      {
        method: DEFAULT_CHIA_METHODS.CHIA_NEW_ADDRESS,
        callback: onNewAddress,
      },
      {
        method: DEFAULT_CHIA_METHODS.CHIA_LOG_IN,
        callback: onLogIn,
      },
      {
        method: DEFAULT_CHIA_METHODS.CHIA_SIGN_MESSAGE_BY_ADDRESS,
        callback: onSignMessageByAddress,
      },
      {
        method: DEFAULT_CHIA_METHODS.CHIA_SIGN_MESSAGE_BY_ID,
        callback: onSignMessageById,
      },
      {
        method: DEFAULT_CHIA_METHODS.CHIA_GET_WALLET_SYNC_STATUS,
        callback: onGetWalletSyncStatus,
      },
    ];
  };

  const getBlockchainActions = (chainId: string) => {
    const [namespace] = chainId.split(":");
    switch (namespace) {
      case "chia":
        return getChiaActions();
      default:
        break;
    }
  };

  // Toggle between displaying testnet or mainnet chains as selection options.
  const toggleTestnets = () => {
    const nextIsTestnetState = !isTestnet;
    setIsTestnet(nextIsTestnetState);
    setLocaleStorageTestnetFlag(nextIsTestnetState);
  };

  const handleChainSelectionClick = (chainId: string) => {
    if (chains.includes(chainId)) {
      setChains(chains.filter((chain) => chain !== chainId));
    } else {
      setChains([...chains, chainId]);
    }
  };

  // Renders the appropriate model for the given request that is currently in-flight.
  const renderModal = () => {
    switch (modal) {
      case "pairing":
        if (typeof client === "undefined") {
          throw new Error("WalletConnect is not initialized");
        }
        return <PairingModal pairings={pairings} connect={connect} />;
      case "request":
        return (
          <RequestModal pending={isRpcRequestPending} result={rpcResult} />
        );
      case "ping":
        return <PingModal pending={isRpcRequestPending} result={rpcResult} />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    const chainOptions = isTestnet ? DEFAULT_TEST_CHAINS : DEFAULT_MAIN_CHAINS;
    return !accounts.length && !Object.keys(balances).length ? (
      <SLanding center>
        <Banner />
        <h6>{`Using v${version || "2.0.0-beta"}`}</h6>
        <SButtonContainer>
          <h6>Select chains:</h6>
          <SToggleContainer>
            <p>Testnets Only?</p>
            <Toggle active={isTestnet} onClick={toggleTestnets} />
          </SToggleContainer>
          {chainOptions.map((chainId) => (
            <Blockchain
              key={chainId}
              chainId={chainId}
              chainData={chainData}
              onClick={handleChainSelectionClick}
              active={chains.includes(chainId)}
            />
          ))}
          <SConnectButton left onClick={onConnect} disabled={!chains.length}>
            {"Connect"}
          </SConnectButton>
          <Dropdown
            relayerRegion={relayerRegion}
            setRelayerRegion={setRelayerRegion}
          />
        </SButtonContainer>
      </SLanding>
    ) : (
      <SAccountsContainer>
        <h3>Accounts</h3>
        <SAccounts>
          {accounts.map((account) => {
            const [namespace, reference, address] = account.split(":");
            const chainId = `${namespace}:${reference}`;
            return (
              <Blockchain
                key={account}
                active={true}
                chainData={chainData}
                fetching={isFetchingBalances}
                address={address}
                chainId={chainId}
                balances={balances}
                actions={getBlockchainActions(chainId)}
              />
            );
          })}
        </SAccounts>
      </SAccountsContainer>
    );
  };

  return (
    <SLayout>
      <Column maxWidth={1000} spanHeight>
        <Header ping={onPing} disconnect={disconnect} session={session} />
        <SContent>{isInitializing ? "Loading..." : renderContent()}</SContent>
      </Column>
      <Modal show={!!modal} closeModal={closeModal}>
        {renderModal()}
      </Modal>
    </SLayout>
  );
};

export default WalletConnect;
