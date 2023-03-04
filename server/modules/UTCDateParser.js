// this function is just designed for safe Date object assigning
// will be further improved soon..... i think
export default function utcDateParser(dateStr) {
    const timeParsed = dateStr.split('T');

    // probably no time assigned
    if (timeParsed.length < 2) {
        // checks if the date is completely assigned
        const dateParsed = timeParsed[0].split('-');
        if (dateParsed.length < 3) {
            // broken date and time
            return new Date();
        } else {
            // just assign the time to 00:00:00
            return new Date(timeParsed[0] + 'T00:00:00');
        }
    }

    return new Date(dateStr);
}