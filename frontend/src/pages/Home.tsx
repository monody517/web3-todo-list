import ConnectWallet from "../components/ConnectWallet";
import CreatList from "../components/CreatList";
import TodoList from "../components/TodoList";
import { address } from "../../../data/TodoList-contract-address.json";
import { abi } from "../../../data/TodoList.json";

const Home = () => {
  const Contract = {
    address: address,
    abi: abi,
  } as const;

  return (
    <>
      <ConnectWallet />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CreatList Contract={Contract} />
        <TodoList Contract={Contract} />
      </div>
    </>
  );
};

export default Home;
