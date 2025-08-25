import { Action } from "./actions/Action";
import { AddAction } from "./actions/AddAction";
import { SetAction } from "./actions/SetAction";
import { SubtractAction } from "./actions/SubtractAction";

export const parseCodeValue = (qrCodeValue: string): Action | undefined => {
  const actionAndHash = qrCodeValue.split("&");

  if (actionAndHash[0] === undefined || actionAndHash[1] === undefined) {
    return undefined;
  }

  const actionString = actionAndHash[0];
  const hash = actionAndHash[1];

  // Never got around implementing an actual hash check.
  if (hash !== "1234567890") {
    return undefined;
  }

  const amount = parseInt(actionString.substring(1), 10);
  if (isNaN(amount)) {
    return undefined;
  }

  const actionCharacter = actionString.substring(0, 1);
  switch (actionCharacter) {
    case "+":
      return new AddAction(amount);

    case "-":
      return new SubtractAction(amount);

    case "=":
      return new SetAction(amount);

    default:
      return undefined;
  }
};
