import * as fs from "fs";
import process from "process";
import { Cell } from "@ton/core";
import { compileFunc } from "@ton-community/func-js";
import { Address } from "@ton/core";


async function compileScript() {
    const addressParse = Address.parse('0:a3935861f79daf59a13d6d182e1640210c02f98e3df18fda74b8f5ab141abf18');
    console.log(addressParse)
    console.log(
      "================================================================="
    );
    console.log(
      "Compile script is running, let's find some FunC code to compile..."
    );
  
    const compileResult = await compileFunc({
      targets: ["./contracts/main.fc"],
      sources: (x) => fs.readFileSync(x).toString("utf8"),
    });
  
    if (compileResult.status === "error") {
      console.log(" - OH NO! Compilation Errors! The compiler output was:");
      console.log(`\n${compileResult.message}`);
      process.exit(1);
    }
  
    console.log(" - Compilation successful!");
  
    const hexArtifact = `build/main.compiled.json`;
  
    fs.writeFileSync(
      hexArtifact,
      JSON.stringify({
        hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc, "base64"))[0]
          .toBoc()
          .toString("hex"),
      })
    );
  
    console.log(" - Compiled code saved to " + hexArtifact);
  }
  compileScript();