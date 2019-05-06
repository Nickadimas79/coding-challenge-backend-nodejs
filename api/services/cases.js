const Report = require('../models/report');
const Officer = require('../models/officer');


async function getCases(req, res) {
    try {
        let reports = await Report.find(req.query);
        return res.status(200).json({ reports });
    } catch (error) {
        return res.status(500).send({ error });
    }
}

async function addCase(req, res) {
    let report = new Report(req.body);

    try {
        let officer = await Officer.findOne({ status: 'unassigned' });

        if (officer) {
            officer.status = 'assigned';
            report.officer = officer;

            await officer.save().then((data) => {
                console.log({
                    message: 'Officer assigned and saved.',
                    officer: data
                });
            }).catch((err) => {
                throw new Error({
                    message: 'Error while saving assigned officer.',
                    error: err
                });
            });
        } else {
            report.officer = 'unassigned';
        }

        await report.save();
        return res.status(201).json({ report });
    } catch (error) {
        res.status(500).send({
            error: error
        });
    }
}

async function closeCase(req, res) {
    let id = req.params.caseid;

    try {
        let report = await Report.findById(id);
        let temp = report.toObject();
        let officer = await Officer.findOne(temp.officer._id);

        report.status = 'resolved';

        await report.save().then((data) => {
            console.log({
                message: 'Report resolved and saved.',
                report: data
            });
        }).catch((err) => {
            throw new Error({
                message: 'Error while saving resolved report.',
                error: err
            });
        });

        let newReport = await Report.findOne({status: 'open'});

        if (newReport) {
            newReport.officer = officer;
        } else {
            officer.status = 'unassigned';
            await officer.save().then((data) => {
                console.log({
                    message: 'Officer unassigned and saved.',
                    officer: data
                });
            }).catch((err) => {
                throw new Error({
                    message: 'Error while saving unassigned officer.',
                    error: err
                });
            });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}

module.exports = {
    getCases,
    addCase,
    closeCase
};
