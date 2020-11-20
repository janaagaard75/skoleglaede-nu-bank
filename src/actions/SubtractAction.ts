import { Action } from "./Action";

export class SubtractAction extends Action {
  public get text(): string {
    return `Fratræk ${this.formattedAmount}?`;
  }

  public performAction(previousAmount: number): number {
    return previousAmount - this.actionAmount;
  }
}
