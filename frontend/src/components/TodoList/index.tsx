import { useContractReads } from "wagmi";

const TodoList = (props) => {
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
        args: ["0x3a9EE713b1DB79B562b701f465f7Ef618a8165e8"],
      },
    ],
  });

  const eventList = data && data[1].result;

  console.log(eventList);
  return (
    <>
      {eventList?.map((event, index) => {
        return (
          <div key={index}>
            <text>{event.title}</text>
            <text>{event.content}</text>
            <text>{event.title}</text>
          </div>
        );
      })}
    </>
  );
};

export default TodoList;
