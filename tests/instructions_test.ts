Feature('Robot cleanup - Instructions');

Scenario('Instructions example request',  ({ I }) => {
    // If coordinates are within the roomSize dimensions, the request
    // should return a successful response
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NEWSSS"
    });

    // The expected result: the robot cleans up 2 patches and finishes
    // at [1, 0]
    I.seeResponseContainsJson({
        coords: [1, 0],
        patches: 2
    })
});

Scenario('Verify no instructions',  ({ I }) => {
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
        instructions: ""
    });

    // The robot should be at its starting position
    // with no cleaned up patches
    I.seeResponseContainsJson({
        coords: [1, 0],
        patches: 0
    })
});

Scenario('Verify instructions consisting of only blank spaces',  ({ I }) => {
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
        instructions: "   "
    });

    // The request should return a client error as '   '
    // is not a valid instruction
    I.seeResponseCodeIsClientError();
});

Scenario('Check spaces in instructions',  ({ I }) => {
    // Send payload with an non-cardinal letter as part
    // of the instructions
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "SEN   W"
    });

    // The request should return a client error as '   '
    // is not a valid instruction
    I.seeResponseCodeIsClientError();
});

Scenario('Check non-cardinal letter in instructions',  ({ I }) => {
    // Send payload with an non-cardinal letter as part
    // of the instructions
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "SENWX"
    });

    // The request should return a client error as 'X'
    // is not a valid instruction
    I.seeResponseCodeIsClientError();
});

Scenario('Check Emoji in instructions',  ({ I }) => {
    // Send payload with an non-cardinal letter as part
    // of the instructions
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "👾"
    });

    // The request should return a client error as '👾'
    // is not a valid instruction
    I.seeResponseCodeIsClientError();
});

Scenario('Check integer in instructions',  ({ I }) => {
    // Send payload with an integer as part
    // of the instructions
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: 1
    });

    // The request should return a client error as an integer
    // is not a valid instruction
    I.seeResponseCodeIsClientError();
});

Scenario('Check boolean in instructions',  ({ I }) => {
    // Send payload with a boolean as part
    // of the instructions
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: true
    });

    // The request should return a client error as 'X'
    // is not a valid instruction
    I.seeResponseCodeIsClientError();
});
