import { Action } from "./Action";

// TODO: Remove this action, since the app now has a reset function.
export class SetAction extends Action {
  public get text(): string {
    return `Nulstil til ${this.formattedAmount}?`;
  }

  public performAction(previousAmount: number): number {
    return this.amount;
  }
}
