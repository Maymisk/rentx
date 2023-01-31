import dayjs from "dayjs";

import { IDateProvider } from "../IDateProvider";

class DayJsDateProvider implements IDateProvider {

    compareInHours(start_time: Date, end_time: Date): number {
        const formattedStartTime = dayjs(start_time).format()
        const formattedEndTime = dayjs(end_time).format()

        const difference = dayjs(formattedEndTime).diff(formattedStartTime, 'hours')
        return difference
    }
    
    compareInDays(start_time: Date, end_time: Date): number {
        const formattedStartTime = dayjs(start_time).format()
        const formattedEndTime = dayjs(end_time).format()

        const difference = dayjs(formattedEndTime).diff(formattedStartTime, 'days')
        return difference
    }

    dateNow(): Date {
        return dayjs().toDate()
    }

    addDays(days: number): Date {
        return dayjs().add(days, 'days').toDate()
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, 'hours').toDate()
    }

    checkIfBefore(start_date: Date, end_date: Date) {
        return dayjs(start_date).isBefore(end_date)
    }

}

export {DayJsDateProvider}