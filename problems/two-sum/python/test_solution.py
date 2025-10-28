import unittest
from solution import two_sum


class TestTwoSum(unittest.TestCase):
    def test_example_1(self):
        self.assertEqual(two_sum([2, 7, 11, 15], 9), [0, 1])

    def test_example_2(self):
        self.assertEqual(two_sum([3, 2, 4], 6), [1, 2])

    def test_example_3(self):
        self.assertEqual(two_sum([3, 3], 6), [0, 1])


if __name__ == "__main__":
    unittest.main()
