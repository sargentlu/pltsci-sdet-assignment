Feature('Robot cleanup - Room sizes');

Scenario('Room size example request',  ({ I }) => {
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

Scenario('Check negative values on roomSize - X dimension',  ({ I }) => {
    // Send payload with the x roomSize value set to
    // negative
    const response = I.sendPostRequest('', {
        roomSize: [-5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NNESEESWNWW"
    });

    // Using the same instructions as on the example payload,
    // the final coords will be different as E instructions
    // are ignored
    I.dontSeeResponseContainsJson({
        coords: [0, 3],
        patches: 0
    })
});

Scenario('Check negative values on roomSize - Y dimension',  ({ I }) => {
    // Send payload with the y roomSize value set to
    // negative values
    const response = I.sendPostRequest('', {
        roomSize: [5, -5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NNESEESWNWW"
    });

    // Using the same instructions as on the example payload,
    // the final coords will be different as N instructions
    // are ignored
    I.dontSeeResponseContainsJson({
        coords: [1, 0],
        patches: 2
    })
});

Scenario('Check negative values on roomSize',  ({ I }) => {
    // Send payload with the roomSize values set to
    // negative values
    const response = I.sendPostRequest('', {
        roomSize: [-5, -5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NNESEESWNWW"
    });

    // Using the same instructions as on the example payload,
    // the final coords will be different as both
    // E and N instructions are ignored
    I.dontSeeResponseContainsJson({
        coords: [0, 0],
        patches: 1
    })
});
