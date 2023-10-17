import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "@rainbow-me/rainbowkit/styles.css";
import ConnectWallet from "./components/ConnectWallet";
import { API_KEY } from "../../env";

function App() {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, goerli],
    [alchemyProvider({ apiKey: API_KEY })]
  );

  const { connectors } = getDefaultWallets({
    appName: "web3-todo-list",
    projectId: "TODO_LIST",
    chains,
  });

  const config = createConfig({
    publicClient,
    connectors,
    autoConnect: true,
  });
  return (
    <>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <ConnectWallet />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
