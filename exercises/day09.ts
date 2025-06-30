const mapToBlock = (diskMap: string): number[] => {
  const blocks: number[] = [];
  let fileId = 0;
  for (let i = 0; i < diskMap.length; i++) {
    const length = parseInt(diskMap[i]);
    const value = i % 2 === 0 ? fileId++ : -1;
    for (let j = 0; j < length; j++) {
      blocks.push(value);
    }
  }
  return blocks;
};

const compactDisk = (blocks: number[]): number[] => {
  const result = [...blocks];
  let left = 0;
  let right = result.length - 1;
  while (left < right) {
    while (left < right && result[left] !== -1) left++;
    while (left < right && result[right] === -1) right--;
    if (left < right) {
      result[left] = result[right];
      result[right] = -1;
      left++;
      right--;
    }
  }
  return result;
};

const calculateChecksum = (blocks: number[]): number => {
  return blocks.reduce((acc, cur, i) => (cur !== -1 ? acc + i * cur : acc), 0);
};

export const day09a = (): number => {
  const blocks = mapToBlock(input);
  const compacted = compactDisk(blocks);
  return calculateChecksum(compacted);
};

const compactByChunk = (blocks: number[]): number[] => {
  const result = [...blocks];
  // ID -> [pos, size]
  const files = new Map<number, [number, number]>();
  // Build file map
  for (let i = 0; i < result.length; i++) {
    const block = result[i];
    if (block !== -1) {
      if (!files.has(block)) {
        files.set(block, [i, 1]);
      } else {
        const [pos, size] = files.get(block)!;
        files.set(block, [pos, size + 1]);
      }
    }
  }
  // Process files in reverse order (right -> left)
  const fileIds = Array.from(files.keys()).sort((a, b) => b - a);
  for (const fileId of fileIds) {
    const [filePos, fileSize] = files.get(fileId)!;
    let bestSlotPos = -1;
    let currentSlotPos = -1;
    let currentSlotSize = 0;

    for (let i = 0; i < filePos; i++) {
      if (result[i] === -1) {
        if (currentSlotPos === -1) {
          currentSlotPos = i;
          currentSlotSize = 1;
        } else {
          currentSlotSize++;
        }
      } else {
        if (currentSlotPos !== -1 && currentSlotSize >= fileSize) {
          bestSlotPos = currentSlotPos;
          break;
        }
        currentSlotPos = -1;
        currentSlotSize = 0;
      }
    }
    // Check the last slot if we ended on free space (because of the loop)
    if (
      currentSlotPos !== -1 &&
      currentSlotSize >= fileSize &&
      bestSlotPos === -1
    ) {
      bestSlotPos = currentSlotPos;
    }

    if (bestSlotPos !== -1) {
      for (let i = 0; i < fileSize; i++) {
        result[filePos + i] = -1;
      }
      for (let i = 0; i < fileSize; i++) {
        result[bestSlotPos + i] = fileId;
      }
    }
  }
  return result;
};

export const day09b = (): number => {
  const blocks = mapToBlock(input);
  console.log(blocks);
  const compacted = compactByChunk(blocks);
  return calculateChecksum(compacted);
};

const input = "2333133121414131402";
