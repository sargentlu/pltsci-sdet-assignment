Platform Science Software Development Engineer in Test assignment
==========================================

## Test assumptions

For this assignment some assumptions were made:

* As the hoover is always on, the cleaning robot should be able to clean up a patch if there's one under it when the cleanup task begins
* The endpoint should only accept valid inputs:
  * Coordinates should consist of an array with two elements
  * Coordinates with more or less than two elements should return an error, as should coordinates that consist of strings, booleans, or even negative integers
  * The only valid instructions should be N, S, E, W, and they should only be ignored when the robot collides with a wall

## How to run

1. Clone this repository (https://github.com/sargentlu/pltsci-sdet-assignment.git)
2. Checkout the `test-robot-cleanup` branch
3. Run the tests (`npx codeceptjs run`)

## Test results

Several tests were written for testing the cleaning robot's functionality. These are:

* `robot_cleanup_test.ts` - Usage tests
  * ✅ Test example payload
  * ❌ Check that robot cleans up its starting position
    * If there is a patch on the robot's starting position it is ignored, when it should be cleaned up
  * ✅ Verify if robot skids in place
* `edge_cases_test.ts` - Edge cases
  * ✅ Maximum values for roomSize and coords
  * ✅ Max roomSize value exceeded - X coordinate
  * ✅ Max roomSize value exceeded - Y coordinate
  * ✅ Max roomSize value exceeded
  * ❌ Max coords value exceeded - X coordinate
    * Once the X coordinate exceeds 2^31-2, the robot will ignore any E instruction
  * ❌ Max coords value exceeded - Y coordinate
    * Once the Y coordinate exceeds 2^31-2, the robot will ignore any N instruction
  * ❌ Max coords value exceeded
    * Once either the X or Y coordinates exceed 2^31-2, the robot will ignore any E or N instruction, respectively
* `room_size_test.ts` - Room sizes
  * ✅ Room size example request
  * ❌ Check negative values on roomSize - X dimension
    * When a negative roomSize X coordinate is used, the robot will ignore E instructions
  * ❌ Check negative values on roomSize - Y dimension
    * When a negative roomSize Y coordinate is used, the robot will ignore N instructions
  * ❌ Check negative values on roomSize
    * When negative roomSize coordinates are used, the robot will ignore both N and E instructions
* `coordinates_test.ts` - Initial coordinates
  * ✅ Coordinates example request
  * ✅ Verify no coordinates
  * ✅ Use a string as coordinates
  * ✅ Use an array with fewer elements than expected for coordinates
  * ❌ Use an array with more elements than expected for coordinates
    * The endpoint accepts arrays with more than two coordinates, but only takes into account the first two
  * ✅ Check negative values on coordinates - X dimension
  * Check negative values on coordinates - Y dimension
  * ✅ Check negative values on coordinates
  * ✅ Check integer on coordinates
* `patches_test.ts` - Patches
  * ✅ Patches example request
  * ✅ Verify no patch coordinates
  * ✅ Use a string for patch coordinates
  * ✅ Use an array with fewer elements than expected for patches
  * ❌ Use an array with more elements than expected for patches
    * The endpoint accepts arrays with more than two patch coordinates, but only takes into account the first two
  * ❌ Check negative values on patches - X dimension
    * Negative X patch coordinates are treated as positive instead of being treated as invalid. This could be a feature, but I'm considering it as a bug as the behavior isn't documented
  * ❌ Check negative values on patches - Y dimension
    * Negative Y patch coordinates are treated as positive instead of being treated as invalid. This could be a feature, but I'm considering it as a bug as the behavior isn't documented
  * ❌ Check negative values on patches
    * Negative patch coordinates are treated as positive instead of being treated as invalid. This could be a feature, but I'm considering it as a bug as the behavior isn't documented
* `instructions_test.ts` - Instructions
  * ✅ Instructions example request
  * ✅ Verify no instructions
  * ✅ Verify instructions consisting of only blank spaces
  * ✅ Check spaces in instructions
  * ✅ Check non-cardinal letter in instructions
  * ✅ Check Emoji in instructions
  * ✅ Check integer in instructions
  * ✅ Check boolean in instructions
