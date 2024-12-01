import input from "./input";

const calculateDiffList = (list1: number[], list2: number[]): number[] => {
  const diffList: number[] = [];
  for (let i = 0; i < list1.length; i++) {
    diffList.push(Math.abs(list1[i] - list2[i]));
  }
  return diffList;
}

const pt1 = (input: string) => {
  const leftList: number[] = [];
  const rightList: number[] = [];

  const lines = input.split("\n").slice(1);
  lines.forEach((line) => {
    const [first, second] = line.split("   ");
    leftList.push(+first);
    rightList.push(+second);
  })

  leftList.sort((a, b) => b - a);
  rightList.sort((a, b) => b - a);

  const diffList = calculateDiffList(leftList, rightList);
  console.log(diffList.reduce((a, b) => a + b, 0));
}

const checkAppearanceFrequency = (list1_member: number, list2: number[]): number => {
  return list2.filter((a) => a === list1_member).length
}

const pt2 = (input: string) => {
  const leftList: number[] = [];
  const rightList: number[] = [];

  const lines = input.split("\n").slice(1);
  lines.forEach((line) => {
    const [first, second] = line.split("   ");
    leftList.push(+first);
    rightList.push(+second);
  })

  const freqList: number[] = []
  leftList.forEach((a) => freqList.push(a * checkAppearanceFrequency(a, rightList)))

  console.log(freqList.reduce((a, b) => a + b, 0))
}

pt1(input)
pt2(input)
