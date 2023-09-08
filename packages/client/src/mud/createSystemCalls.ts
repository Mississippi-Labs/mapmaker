import { getComponentValue } from "@latticexyz/recs";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { fromBytes } from 'viem'

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldContract, waitForTransaction }: SetupNetworkResult,
  ClientComponents
) {
  const { Counter, MapSystem } = ClientComponents;

  const increment = async () => {
    const tx = await worldContract.write.increment();
    await waitForTransaction(tx);
    return getComponentValue(Counter, singletonEntity);
  };

  const move = async (x: number, y: number, width: number, data: number[]) => {
    const tx = await worldContract.write.move([x, y, width, fromBytes(new Uint8Array(data), 'hex')]);
    await waitForTransaction(tx);
    return getComponentValue(MapSystem, singletonEntity);
  };

  return {
    move
  };
}
