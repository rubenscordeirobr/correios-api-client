
export class DateUtil {

    static format(date: Date, format: string): string {

        if (date == null)
            return "";

        if (format == null)
            return date.toISOString();

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return format
            .replace("dd", day.toString().padStart(2, "0"))
            .replace("MM", month.toString().padStart(2, "0"))
            .replace("yyyy", year.toString())
            .replace("HH", hours.toString().padStart(2, "0"))
            .replace("mm", minutes.toString().padStart(2, "0"))
            .replace("ss", seconds.toString().padStart(2, "0"));
    }
}