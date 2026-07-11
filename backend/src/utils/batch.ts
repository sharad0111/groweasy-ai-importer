export function chunkArray<T>(arr: T[], size: number): T[][] {
    const batches: T[][] = [];
  
    for (let i = 0; i < arr.length; i += size) {
      batches.push(arr.slice(i, i + size));
    }
  
    return batches;
  }