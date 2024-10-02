const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('taodb', 'postgres', 'postgres', {
    host: 'host.docker.internal',
    port: 5432,
    dialect: 'postgres',
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;