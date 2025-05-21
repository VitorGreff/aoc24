import fs from "fs";

// the input has to many quotes so it is easier to just read the file instead of declaring an variable
const readInputFile = (): string => {
  return fs.readFileSync("./input.txt", "utf8");
};

export const day03a = () => {
  let result = 0;
  const input = readInputFile(),
    regex = /mul\((\d+),\s*(\d+)\)/g,
    matchs = input.match(regex) || [];

  for (const m of matchs) {
    const left = Number(m.split(",")[0].split("(")[1]),
      right = Number(m.split(",")[1].split(")")[0]);
    result += left * right;
  }
  return result;
};

export const day03b = () => {
  let isEnabled = true;
  let result = 0;

  const input = readInputFile(),
    mulRegex = /mul\((\d+),\s*(\d+)\)|do\(\)|don't\(\)/g;
  const matchs = input.match(mulRegex) || [];

  for (const m of matchs) {
    if (m !== "do()" && m !== "don't()" && isEnabled) {
      const left = Number(m.split(",")[0].split("(")[1]),
        right = Number(m.split(",")[1].split(")")[0]);
      result += left * right;
    } else if (m === "do()") isEnabled = true;
    else if (m === "don't()") isEnabled = false;
  }
  return result;
};
