import { Action } from "./Action";

export class AddAction extends Action {
  public get text(): string {
    return `Tilføj ${this.formattedAmount}?`;
  }

  public performAction(previousAmount: number): number {
    return previousAmount + this.actionAmount;
  }
}
