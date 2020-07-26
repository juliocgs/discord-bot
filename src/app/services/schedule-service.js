const ValidationResult = require('../utils/validation-result');

class ScheduleService {
    schedule;

    constructor() {
        this.schedule = require('node-schedule');
    }

    getAllScheduledJobs() {
        return this.schedule.scheduledJobs;
    }

    scheduleJob(jobName, date, action) {
        if (this.getAllScheduledJobs()[jobName]) {
            this.getAllScheduledJobs()[jobName].reschedule(date);
        }
        else {
            this.schedule.scheduleJob(jobName, date, function () {
                action();
            });
        }
    }

    cancelJob(jobName) {
        const result = new ValidationResult();

        if (this.getAllScheduledJobs()[jobName]) {
            this.getAllScheduledJobs()[jobName].cancel();
        }
        else {
            result.addError('this job doesn\'t exist.');
        }

        return result;
    }
}

module.exports = new ScheduleService();