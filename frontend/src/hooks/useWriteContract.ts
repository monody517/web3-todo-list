import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {useState} from 'react'

export const useWriteContract = (contract: { address: `0x${string}`; abi: unknown; }, functionName:string,args?: unknown) => {
    
  const [success, setSuccess] = useState(false)

  const { config } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: functionName,
        args: [...args],
        onError(error) {
        console.log("Error", error);
        },
  });

  const {
    data,
    isLoading: isWriteLoading,
    error: writeError,
    write,
    isError: isWriteError,
  } = useContractWrite(config);

  console.log("isWriteError", isWriteError);

  const {
    error: transactionError,
    isLoading: isTransactionLoading,
    isError: isTransactionError,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      setSuccess(true)
    },
  });
    
  const loading = isWriteLoading || isTransactionLoading
  const error = writeError || transactionError || isTransactionError
    
  return [write,loading,error,success]
}