const officer = require('../api/services/officer');
const Officer = require('../api/models/officer');
const Report = require('../api/models/report');

const res = {
    json: function (obj) {
        return obj;
    },
    send: function (obj) {
        return obj;
    },
    then: function () {
        return this;
    },
    status: function () {
        return this;
    }
};

let req = {
    body: {
        "name" : "Gotham PD",
        "badgeNum" : "GCPD",
        "status" : "unassigned"
    }
};


test('Adds an officer to the DB', async () => {
    jest.spyOn(Report, 'findOne').mockImplementationOnce(() => {
        Promise.resolve(undefined);
    });
    jest.spyOn(Officer.prototype, 'save').mockImplementationOnce(() => {
        Promise.resolve(undefined);
    });

    let result = await officer.addOfficer(req, res);

    expect(result.officer._id).toBeDefined();
    expect(result.officer.name).toEqual(req.body.name);
    expect(result.officer.badgeNum).toEqual(req.body.badgeNum);
    expect(result.officer.status).toEqual(req.body.status);
});



