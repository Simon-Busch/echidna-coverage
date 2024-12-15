import { parseArgs } from "./args";
import { readFileAndProcess } from "./parsing";

const main = () => {
  const options = parseArgs();

  let result = readFileAndProcess(options.filePath);
  if (options.contract) {
    result = result.filter((file) =>
      file.path.toLowerCase().includes(options.contract!.toLowerCase())
    );
  }
  result.forEach((data) => {
    console.log("\n\n");
    console.log("=====================================");
    console.log(`\x1b[1m File: ${data.path}`);
    console.log("=====================================");

    if (options.outputFormat === "json") {
      console.log(JSON.stringify(data.coverage, null, 2));
    } else {
      console.table(data.coverage);

      if (options.verbose) {
        const uncoveredFunctions = data.data.filter((d) => !d.isFullyCovered);
        if (uncoveredFunctions.length > 0) {
          console.log("\nNot fully covered functions:");
          console.table(
            uncoveredFunctions.map((d) => ({
              functionName: d.functionName,
              touched: d.touched,
              reverted: d.reverted,
              untouchedLines: d.untouchedLines,
            }))
          );
          if (options.veryVerbose) {
            uncoveredFunctions.forEach((f) => {
              if (f.untouchedContent.length > 0 || f.revertedContent.length > 0) {
                console.log(`Function: ${f.functionName}\n\n`);
              }
              if (f.untouchedContent.length > 0) {
                console.log("Untouched lines for: \n");
                f.untouchedContent.forEach((line) => {
                  console.log(line);
                });
                console.log("\n")
              }

              if (f.revertedContent.length > 0) {
                console.log("Reverted lines: \n");
                f.revertedContent.forEach((line) => {
                  console.log(line);
                });
              }
            });
          }
        }
      }
      console.log("===========================");
    }

    if (data.coverage.coveragePercentage < options.threshold) {
      console.log(
        `\nWarning ❌: Coverage ${data.coverage.coveragePercentage}% below threshold ${options.threshold}%`
      );
    }
  });
};

main();

// ex: ts-node index.ts -v -f ./data/test.txt --format table -t 90 --contract xxx.sol
