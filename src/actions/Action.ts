import { Formatter } from "../Formatter";

export abstract class Action {
  constructor(amount: number) {
    this.actionAmount = amount;
  }

  public readonly actionAmount: number;

  protected get formattedAmount(): string {
    return Formatter.formatAsCurrency(this.actionAmount);
  }

  public abstract get text(): string;

  public abstract performAction(previousAmount: number): number;
}
