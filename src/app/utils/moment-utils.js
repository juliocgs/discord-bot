module.exports = {
    formatTimeDiff: function (firstDate, secondDate) {
        let totalSeconds = firstDate.diff(secondDate, 'seconds');
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds -= hours * 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds - minutes * 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}