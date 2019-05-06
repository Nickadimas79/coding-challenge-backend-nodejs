const Officer = require('../models/officer');
const Report = require('../models/report');


async function addOfficer(req, res) {
    let officer = new Officer(req.body);

    try {
        let report = await Report.findOne({officer: 'unassigned'});

        if (report) {
            officer.status = 'assigned';
            report.officer = officer;

            report.save().then((data) => {
                console.log({
                    message: 'Report assigned and saved.',
                    report: data
                });
            }).catch((err) => {
                throw new Error({
                    message: 'Error while saving assigned report.',
                    error: err
                });
            });
        }

        await officer.save();
        return res.status(201).json({ officer });
    } catch (error) {
        res.status(500).send({
            error: error
        });
    }
}

async function removeOfficer(req, res) {
    let id = req.params.id;

    try {
        let officer = await Officer.findByIdAndDelete(id);
        if (!officer) {
            return res.status(404).json({
                message: `No officer with id: ${id}.`
            });
        }

        return res.status(204).send();
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `No officer with id: ${id}.`
            });
        }

        return res.status(500).send({
            message: `Could not delete officer with id: ${id}.`
        });
    }
}


module.exports = {
    addOfficer,
    removeOfficer
};
