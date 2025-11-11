export interface IDayDetails {
    date: Date;
    title: String;
    description: String;
    picture?: File

}


export abstract class DaySelector {

    /* Provides holiday details for a given day */
    abstract getDay(date: Date) : IDayDetails | null

    /* Provides holiday details for a full range to populate a calendar, ordered by date */
    abstract getCalendar(start: Date, end: Date) : IDayDetails[]


}