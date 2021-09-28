import * as SecureStore from "expo-secure-store";
import { Action } from "./actions/Action";

export class Wallet {
  public static async initialize() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    try {
      const walletString = await SecureStore.getItemAsync(this.key);

      if (walletString === null) {
        this.reset();
        return;
      }

      const wallet = JSON.parse(walletString);
      this._credit = wallet.credit;
      this._savings = wallet.savings;
    } catch {
      this.reset();
    }
  }

  private static _credit = 0;
  private static _savings = 0;
  private static readonly key = "wallet";
  private static initialized = false;

  public static broke() {
    this._credit = 0;
    this.save();
  }

  public static reset() {
    this._credit = 4000;
    this._savings = 0;
    this.save();
  }

  public static get credit(): number {
    return this._credit;
  }

  public static get savings(): number {
    return this._savings;
  }

  public static performAction(action: Action): void {
    this._credit = action.performAction(this._credit);
    this.save();
  }

  public static transferToSavings(amount: number): void {
    this._credit -= amount;
    this._savings += amount;
    this.save();
  }

  public static transferToSavingsAllowed(amount: number): boolean {
    return this._credit >= amount;
  }

  private static async save() {
    const wallet = {
      credit: this._credit,
      savings: this._savings,
    };

    const walletString = JSON.stringify(wallet);

    await SecureStore.setItemAsync(this.key, walletString);
  }
}
