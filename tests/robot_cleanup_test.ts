Feature('Robot cleanup');

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

    I.seeResponseContainsJson({
        coords: [1, 3],
        patches: 1
    })
});
