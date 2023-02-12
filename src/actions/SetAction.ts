import { Action } from "./Action";

export class SetAction extends Action {
  public get text(): string {
    return `Nulstil til ${this.formattedAmount}?`;
  }

  public performAction(_previousAmount: number): number {
    return this.actionAmount;
  }
}
