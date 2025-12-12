import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const codes = [
  { value: "+50&1234567890", filename: "+50.svg" },
  { value: "+100&1234567890", filename: "+100.svg" },
  { value: "+200&1234567890", filename: "+200.svg" },
  { value: "+500&1234567890", filename: "+500.svg" },
  { value: "+1000&1234567890", filename: "+1000.svg" },
  { value: "+2000&1234567890", filename: "+2000.svg" },
  { value: "-50&1234567890", filename: "-50.svg" },
  { value: "-100&1234567890", filename: "-100.svg" },
  { value: "-200&1234567890", filename: "-200.svg" },
  { value: "-500&1234567890", filename: "-500.svg" },
  { value: "-1000&1234567890", filename: "-1000.svg" },
  { value: "-2000&1234567890", filename: "-2000.svg" },
];

const outDir = join(process.cwd(), "qr-codes");

function ensureOutDir(): void {
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
}

function run(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}.`));
    });
  });
}

async function main(): Promise<void> {
  ensureOutDir();

  for (const code of codes) {
    const outFile = join(outDir, code.filename);
    const args = [
      "qrcode",
      "-t",
      "svg",
      "-o",
      outFile,
      "--margin",
      "0",
      "--",
      code.value,
    ];
    process.stdout.write(`Generating ${outFile}...\n`);
    await run("npx", args);
  }

  process.stdout.write("All QR codes generated in ./qr-codes.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
