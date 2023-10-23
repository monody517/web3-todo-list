import { Button } from "@web3uikit/core";
import { useWriteContract } from "../../hooks/useWriteContract";

const CreatList = (props) => {
  const [write, loading, error, success] = useWriteContract(
    props.Contract,
    "creatTask",
    ["1", "1", "1"]
  );

  console.log("write", write);
  return (
    <>
      <Button
        color="red"
        onClick={() => {
          write();
        }}
        disabled={!write}
        isLoading={loading}
        size="large"
        text="creat event"
        theme="moneyPrimary"
        type="button"
      />
    </>
  );
};

export default CreatList;
