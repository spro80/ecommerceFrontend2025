from typing import List


def two_sum(nums: List[int], target: int) -> List[int]:


    index_by_number: dict[int, int] = {}
    for index, number in enumerate(nums):
        complement = target - number
        if complement in index_by_number:
            return [index_by_number[complement], index]
        index_by_number[number] = index
    raise ValueError("No solution found")


if __name__ == "__main__":
    print(two_sum([2, 7, 11, 15], 9))
