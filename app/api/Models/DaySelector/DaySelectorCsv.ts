import { DaySelector, IDayDetails } from "./DaySelector";
import dayjs from 'dayjs'
import { parse } from "csv-parse";
import  fs  from 'fs';

export class DaySelectorCsv extends DaySelector {

    private csvData=[] as any[];

    constructor(csvPath='app/api/data/holidays.csv'){
        super()
        fs.createReadStream(csvPath)
            .pipe(parse({delimiter: ',', columns: true}))
            .on('data', (row: any) => {

                console.log('row', row)
                this.csvData.push(row);        
            })
    }

    getDay(date: Date): IDayDetails | null {
        const day = dayjs(date).format('MM/DD')
        const today = this.csvData.find((row: any) => row.date==day)
        return today ? {
            date: date,
            title: today.title,
            description: today.description,
            picture: undefined
        } : null
        

        
    }

    getCalendar(start: Date, end: Date): IDayDetails[] {
        const days = this.csvData.map(row => ({
            date: new Date(row.date +'/'+ new Date().getFullYear()),
            title: row.title,
            description: row.description,
            picture: undefined
        }))
        console.log(days)
        return days.filter(day => day.date >= start && day.date <= end)
    }

}