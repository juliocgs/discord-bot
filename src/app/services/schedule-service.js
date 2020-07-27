const ValidationResult = require('../utils/validation-result');

/**
 * Schedule Servive class
 */
class ScheduleService {
    schedule;

    constructor() {
        this.schedule = require('node-schedule');
    }

    /**
     * Gets all scheduled jobs
     */
    getAllScheduledJobs() {
        return this.schedule.scheduledJobs;
    }

    /**
     * Schedule a new job or reenchedule a existing one
     */
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

    /**
     * Cancel a scheduled job by it's name
     */
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