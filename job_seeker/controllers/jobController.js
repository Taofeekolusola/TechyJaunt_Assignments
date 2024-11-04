const { Op } = require('sequelize');
const Job = require('../models/Job');

//@desc search jobs
//@route GET /jobs
//@access public 

const searchJobs = async (req, res) => {
    try {
        const { title, location, salary, experience, jobType, company } = req.query;
            
        // Build query conditions based on the filters
        const queryConditions = {};

        if (title) {
            queryConditions.title = {
                [Op.iLike]: `%${title}%`
            };
        }
        if (location) {
            queryConditions.location = {
                [Op.iLike]: `%${location}%`
            };
        }
        if (experience) {
            queryConditions.experience = {
                ...queryConditions.experience, [Op.gte]: parseInt(experience)
            };
        }
        if (salary) {
            queryConditions.salary = {
                ...queryConditions.salary, [Op.lte]: parseInt(salary)
            };
        }
        if (jobType) {
            queryConditions.jobType = jobType;
        }
        if (company) {
            queryConditions.company = {
                [Op.iLike]: `%${company}%`
            };
        }

        // Fetch jobs based on the query conditions
        const jobs = await Job.findAll({
            where: queryConditions
        });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    searchJobs
};