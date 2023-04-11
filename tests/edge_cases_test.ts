Feature('Robot cleanup - Edge cases');

Scenario('Maximum values for roomSize and coords',  ({ I }) => {
    // The upper limit for roomSize values is 2^31-1, which means that coordinates
    // may be between 0 and 2^31-2. In this scenario, a robot is moved one space
    // north and one east, to its maximum possible position
    const response = I.sendPostRequest('', {
        roomSize: [2**31-1, 2**31-1],
        coords: [ 2**31-3, 2**31-3],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NE"
    });

    // The expected result: the robot moves from [2^31-3, 2^31-3] to its
    // max possible position, [2^31-2, 2^31-2]
    I.seeResponseContainsJson({
        coords: [2**31-2, 2**31-2],
        patches: 0
    })
});

Scenario('Max roomSize value exceeded - X coordinate',  ({ I }) => {
    // A request is made for a trip with the max X roomSize coordinate
    const response = I.sendPostRequest('', {
        roomSize: [2**31, 2**31-1],
        coords: [ 2**31-3, 2**31-3],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NE"
    });

    // The request should return a client error as
    // the X roomSize value is invalid
    I.seeResponseCodeIsClientError();
});

Scenario('Max roomSize value exceeded - Y coordinate',  ({ I }) => {
    // A request is made for a trip with the max Y roomSize coordinate
    const response = I.sendPostRequest('', {
        roomSize: [2**31-1, 2**31],
        coords: [ 2**31-3, 2**31-3],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NE"
    });

    // The request should return a client error as
    // the Y roomSize value is invalid
    I.seeResponseCodeIsClientError();
});

Scenario('Max roomSize value exceeded',  ({ I }) => {
    // A request is made for a trip with the max roomSize
    // for both X and Y coordinates
    const response = I.sendPostRequest('', {
        roomSize: [2**31, 2**31],
        coords: [ 2**31-3, 2**31-3],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NE"
    });

    // The request should return a client error as
    // both the X and Y roomSize values are invalid
    I.seeResponseCodeIsClientError();
});

Scenario('Max coords value exceeded - X coordinate',  ({ I }) => {
    // A request is made for a trip where the robot starts at the
    // max X coordinate
    const response = I.sendPostRequest('', {
        roomSize: [2**31-1, 2**31-1],
        coords: [ 2**31-2, 2**31-3],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NEEEEEE"
    });

    // Once the X coordinate exceeds its max value (2^31-2), the request should
    // return a client error but E instructions are ignored instead
    I.dontSeeResponseContainsJson({
        coords: [2**31-2, 2**31-2],
        patches: 0
    })
});

Scenario('Max coords value exceeded - Y coordinate',  ({ I }) => {
    // A request is made for a trip where the robot starts at the
    // max Y coordinate
    const response = I.sendPostRequest('', {
        roomSize: [2**31-1, 2**31-1],
        coords: [ 2**31-3, 2**31-2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NE"
    });

    // Once the Y coordinate exceeds its max value (2^31-2), the request should
    // return a client error but N instructions are ignored instead
    I.dontSeeResponseContainsJson({
        coords: [2**31-2, 2**31-2],
        patches: 0
    });
});

Scenario('Max coords value exceeded',  ({ I }) => {
    // A request is made for a trip where the robot starts at the
    // max X and Y coordinates
    const response = I.sendPostRequest('', {
        roomSize: [2**31-1, 2**31-1],
        coords: [ 2**31-2, 2**31-2],
        patches: [
            [1, 0],
            [2, 2],
            [2, 3]
        ],
        instructions: "NE"
    });

    // Once the X and Y coordinate exceed their max value (2^31-2), the request
    // should return a client error but E and N instructions are ignored instead
    I.dontSeeResponseContainsJson({
        coords: [2**31-2, 2**31-2],
        patches: 0
    });
});
