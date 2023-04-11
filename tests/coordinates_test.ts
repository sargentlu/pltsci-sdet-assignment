Feature('Robot cleanup - Initial coordinates');

Scenario('Coordinates example request',  ({ I }) => {
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

Scenario('Verify no coordinates',  ({ I }) => {
    // Send payload with no coordinates and verify
    // that the payload returns a client error
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NEWSSS"
    });

    // The request should return a client error as coordinates
    // are needed to start the robot's path
    I.seeResponseCodeIsClientError();
});

Scenario('Use a string as coordinates',  ({ I }) => {
    // Send payload with the coordinates parsed as a string instead of an array
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: '[1, 0]',
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NEWSSS"
    });

    // The request should return a client error as coordinates
    // should be an array
    I.seeResponseCodeIsClientError();
});

Scenario('Use an array with fewer elements than expected for coordinates',  ({ I }) => {
    // Send payload with a single coordinate instead of the expected 2
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NEWSSS"
    });

    // The request should return a client error as coordinates
    // should be an array with 2 elements
    I.seeResponseCodeIsClientError();
});

Scenario('Use an array with more elements than expected for coordinates',  ({ I }) => {
    // Send payload with 3 coordinates instead of the expected 2
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2, 5],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NEWSSS"
    });

    // The request should return a client error as coordinates
    // should be an array with 2 elements
    I.dontSeeResponseContainsJson({
        coords: [1, 0],
        patches: 2
    })
});

Scenario('Check negative values on coordinates - X dimension',  ({ I }) => {
    // Send payload with the robot X coordinate set to
    // a negative value
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [-1, 2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NEWSSS"
    });

    // The request should return a client error as
    // the initial coordinates are invalid
    I.seeResponseCodeIsClientError();
});

Scenario('Check negative values on coordinates - Y dimension',  ({ I }) => {
    // Send payload with the robot Y coordinate set to
    // a negative value
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, -2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NEWSSS"
    });

    // The request should return a client error as the initial coordinates
    // are invalid. However, it seems that negative Y coordinates
    // will be accepted, but this triggers a bug where S directions are ignored
    I.dontSeeResponseContainsJson({
        coords: [1, -1],
        patches: 0
    })
});

Scenario('Check negative values on coordinates',  ({ I }) => {
    // Send payload with the robot coordinates set to
    // negative values
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [-1, -2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "ENWSSS"
    });

    // The request should return a client error as
    // the initial coordinates are invalid
    I.seeResponseCodeIsClientError();
});

Scenario('Check integer on coordinates',  ({ I }) => {
    // Send payload with the robot coordinates set to
    // a single integer
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: 1,
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "ENWSSS"
    });

    // The request should return a client error as
    // the initial coordinates are invalid
    I.seeResponseCodeIsClientError();
});

Scenario('Coordinates edge case',  ({ I }) => {
    // If coordinates are within the roomSize dimensions, the request
    // should return a successful response
    const response = I.sendPostRequest('', {
        roomSize: [2**31-2, 2**31-2],
        coords: [ 2**31-4, 2**31-4],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NE"
    });

    // The expected result: the robot cleans up 2 patches and finishes
    // at [1, 0]
    I.seeResponseContainsJson({
        coords: [2**31-3, 2**31-3],
        patches: 0
    })
});