import { Transport } from "./transport";

export interface Flight {
  Origin: string;
  Destination: string;
  Price: number;
  Transport: Transport;
}
