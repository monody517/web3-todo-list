import ConnectWallet from "../components/ConnectWallet";
import CreatList from "../components/CreatList";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <>
      <ConnectWallet />
      <CreatList />
      <TodoList />
    </>
  );
};

export default Home;
