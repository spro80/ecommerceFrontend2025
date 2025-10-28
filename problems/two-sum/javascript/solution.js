export function twoSum(nums, target) {
  const indexByNumber = new Map();
  for (let index = 0; index < nums.length; index += 1) {
    const number = nums[index];
    const complement = target - number;
    if (indexByNumber.has(complement)) {
      return [indexByNumber.get(complement), index];
    }
    indexByNumber.set(number, index);
  }
  throw new Error('No solution found');
}

if (import.meta.main) {
  console.log(twoSum([2, 7, 11, 15], 9));
}
