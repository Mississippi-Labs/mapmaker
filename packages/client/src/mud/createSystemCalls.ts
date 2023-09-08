import { getComponentValue } from "@latticexyz/recs";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { singletonEntity } from "@latticexyz/store-sync/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldContract, waitForTransaction }: SetupNetworkResult,
  ClientComponents
) {
  const { Counter, Position } = ClientComponents;
  console.log(Position, Counter, ClientComponents)
  const increment = async () => {
    const tx = await worldContract.write.increment();
    await waitForTransaction(tx);
    return getComponentValue(Counter, singletonEntity);
  };

  const move = async (x: number, y: number, width: number, data: Uint8Array) => {
    const tx = await worldContract.write.move(x, y, width, data);
    await waitForTransaction(tx);
    return getComponentValue(Position, singletonEntity);
  };

  return {
    increment,
    move
  };
}
