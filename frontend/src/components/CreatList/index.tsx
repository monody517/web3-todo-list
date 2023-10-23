import { Button } from "@web3uikit/core";
import { useWriteContract } from "../../hooks/useWriteContract";
import { Plus } from "@web3uikit/icons";

const CreatList = (props) => {
  const [write, loading, error, success] = useWriteContract(
    props.Contract,
    "creatTask",
    ["1", "1", "1"]
  );

  console.log("success", success);

  return (
    <div
      style={{
        paddingTop: 60,
        paddingBottom: 60,
      }}
    >
      <Button
        color="red"
        icon={<Plus fontSize="20px" />}
        onClick={() => {
          write();
        }}
        disabled={!write}
        isLoading={loading}
        size="xl"
        text="creat event"
        theme="moneyPrimary"
        type="button"
      />
    </div>
  );
};

export default CreatList;
