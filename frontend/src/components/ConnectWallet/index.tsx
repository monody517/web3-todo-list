import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWallet = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: "20px",
      }}
    >
      <ConnectButton />
    </div>
  );
};

export default ConnectWallet;
