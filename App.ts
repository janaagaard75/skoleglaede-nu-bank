import { App } from "./src/App";
import { Wallet } from "./src/Wallet";
(async () => {
  await Wallet.initialize();
})();

export default App;
