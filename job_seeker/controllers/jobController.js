const { Op } = require('sequelize');
const Job = require('../models/Job');


const createJobs = async (req, res) => {
    try {
        const { title, location, salary, experience, jobTypes, company, userId } = req.body;

        const newJob = await Job.create({
            title,
            location,
            salary,
            experience,
            jobTypes,
            company,
            userId
        });

        res.status(201).json(newJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while creating job' });
    }
}

//@desc search jobs
//@route GET /jobs
//@access public 

const searchJobs = async (req, res) => {
    try {
        const user = req.user;
        const { title, location, salary, jobType, company, experience } = req.query;

        const conditions = {
            userId: user.id
        };

        // Dynamically add conditions for each filter if provided
        if (title) {
            conditions.title = { [Op.like]: `%${title}%` };
        }
        if (location) {
            conditions.location = { [Op.like]: `%${location}%` };
        }
        if (salary) {
            conditions.salary = salary;
        }
        if (jobType) {
            conditions.jobType = { [Op.like]: `%${jobType}%` };
        }
        if (company) {
            conditions.company = { [Op.like]: `%${company}%` };
        }
        if (experience) {
            conditions.experience = experience;
        }

        const jobs = await Job.findAll({
            where: conditions
        });
        res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

//@desc delete jobs
//@route DELETE /jobs/:id
//@access public 

const deleteJobs = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByPk(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        await job.destroy();
        res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    searchJobs,
    createJobs,
    deleteJobs
};