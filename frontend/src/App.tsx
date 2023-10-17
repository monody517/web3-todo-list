import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "@rainbow-me/rainbowkit/styles.css";
import { API_KEY } from "../../env";
import Home from "./pages/Home";

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
          <Home />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
