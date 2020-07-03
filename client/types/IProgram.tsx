import { COMMODITY } from "@satoshi-test/common";

export interface IProgram {
  id: string;
  name: string;
  currentPrice: number;
  commodity: COMMODITY;
}
