import { useContractReads, useAccount } from "wagmi";
import { Accordion, Widget } from "@web3uikit/core";

const TodoList = (props) => {
  const { address } = useAccount();
  const { data } = useContractReads({
    contracts: [
      {
        ...props.Contract,
        functionName: "taskCount",
      },
      {
        ...props.Contract,
        functionName: "getTasks",
      },
      {
        ...props.Contract,
        functionName: "getBalance",
        args: [address],
      },
    ],
  });

  const eventList = data && data[1].result;

  console.log(data);
  return (
    <>
      {eventList?.map((event, index) => {
        return (
          <Accordion id="index" title={event.title} style={{ width: "100%" }}>
            <Widget info={event.content} />
          </Accordion>
        );
      })}
    </>
  );
};

export default TodoList;
