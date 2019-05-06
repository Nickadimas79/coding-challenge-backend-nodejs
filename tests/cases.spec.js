let bikes = require('../api/services/cases');
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
        "status" : "open",
        "licenseNum" : "Bat-1",
        "color" : "black",
        "type" : "street",
        "date" : "June 26, 1996, 22:47",
        "name" : "Bruce Wayne",
        "description" : "Mugger appeared on Crime Alley. The rest is... as they say... Legend..."
    }
};


test('Add a case to the DB', async () => {
    jest.spyOn(Officer, 'findOne').mockImplementationOnce(() => {
        return undefined;
    });
    jest.spyOn(Report.prototype, 'save').mockImplementationOnce(() => {
        return undefined;
    });

    let result = await bikes.addCase(req, res);

    expect(result.report._id).toBeDefined();
    expect(result.report.officer).toBeDefined();
    expect(result.report.name).toEqual(req.body.name);
    expect(result.report.type).toEqual(req.body.type);
    expect(result.report.color).toEqual(req.body.color);
    expect(result.report.status).toEqual('open');
});

test('Get all cases.', async () => {
    jest.spyOn(Report, 'find').mockImplementationOnce(() => {
        return [req.body];
    });

    let reqQuery = {
        query: {
            status: 'open',
            color: 'black'
        }
    };

    let result = await bikes.getCases(reqQuery, res);

    expect(result.reports[0].status).toEqual('open');
    expect(result.reports[0].name).toEqual(req.body.name);
    expect(result.reports[0].type).toEqual(req.body.type);
    expect(result.reports[0].color).toEqual(req.body.color);
});
