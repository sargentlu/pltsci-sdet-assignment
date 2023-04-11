Feature('Robot cleanup - Patches');

Scenario('Patches example request',  ({ I }) => {
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

Scenario('Verify no patch coordinates',  ({ I }) => {
    // Send payload with no coordinates and verify
    // that the payload returns a client error
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        instructions: "NEWSSS"
    });

    // The request should return the same coordinates at the end as
    // the example request, although with no cleaned patches
    // I.seeResponseContainsJson({
    //     coords: [1, 0],
    //     patches: 0
    // })
    I.seeResponseCodeIsClientError();
});

Scenario('Use a string for patch coordinates',  ({ I }) => {
    // Send payload with the patch coordinates parsed as a string instead of an array
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 0],
        patches: [
            '[1, 0]',
            '[2, 2]',
            '[2, 3]'
        ],
        instructions: "NEWSSS"
    });

    // The request should return a client error as coordinates
    // should be an array
    I.seeResponseCodeIsClientError();
});

Scenario('Use an array with fewer elements than expected for patches',  ({ I }) => {
    // Send payload with patches that contain a single coordinate
    // instead of the expected 2
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1],
        patches: [
            [1],
            [2],
            [2]
        ],
        instructions: "NEWSSS"
    });

    // The request should return a client error as patch coordinates
    // should be an array with 2 elements
    I.seeResponseCodeIsClientError();
});

Scenario('Use an array with more elements than expected for patches',  ({ I }) => {
    // Send payload with 3 patch coordinates instead of the expected 2
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0, 1],
            [2, 2, 1],
            [2, 3, 1]
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

Scenario('Check negative values on patches - X dimension',  ({ I }) => {
    // Send payload with the patches' X coordinates set to
    // negative values
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [-1, 0],
            [-2, 2],
            [-2, 3]
        ],
        instructions: "NEWSSS"
    });

    // The request should return no cleaned up patches
    // as the coordinates should be invalid
    I.dontSeeResponseContainsJson({
        coords: [1, 0],
        patches: 2
    })
});

Scenario('Check negative values on patches - Y dimension',  ({ I }) => {
    // Send payload with the patches' Y coordinates set to
    // negative values
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [1, 0],
            [2, -2],
            [2, -3]
        ],
        instructions: "NEWSSS"
    });

    // The request should return no cleaned up patches
    // as the coordinates should be invalid
    I.dontSeeResponseContainsJson({
        coords: [1, 0],
        patches: 2
    })
});

Scenario('Check negative values on patches',  ({ I }) => {
    // Send payload with the patches' coordinates set to
    // negative values
    const response = I.sendPostRequest('', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
            [-1, 0],
            [-2, -2],
            [-2, -3]
        ],
        instructions: "NEWSSS"
    });

    // The request should return no cleaned up patches
    // as the coordinates should be invalid
    I.dontSeeResponseContainsJson({
        coords: [1, 0],
        patches: 2
    })
});
