Feature('Robot cleanup - Usage tests');

Scenario('Test example payload',  ({ I }) => {
    // Send example payload found on README.md
    // and validate that it returns a succesful response
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NNESEESWNWW"
    });

    // The expected result: the robot ends up cleaning
    // a single patch
    I.seeResponseContainsJson({
        coords: [1, 3],
        patches: 1
    })
});

Scenario('Check that robot cleans up its starting position',  ({ I }) => {
    // Send payload with no intructions and verify
    // that the robot is on its starting position
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 0],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "N"
    });

    // The robot should be one position North
    // with its initial position being cleaned up
    I.seeResponseContainsJson({
        coords: [1, 1],
        patches: 1
    })
});

Scenario('Verify if robot skids in place',  ({ I }) => {
    // Send payload with instructions that should make the
    // robot crash against the walls, verify the robot
    // ignores those instructions and continues on its path
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "SSSSSSEEEEEENNNNNNWWWWWWSSE"
    });

    // The robot should be back at its starting position
    // and should have cleaned up 1 patch
    I.seeResponseContainsJson({
        coords: [1, 2],
        patches: 1
    })
});
