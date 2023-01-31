interface IDateProvider {
    compareInHours(start_time: Date, end_time: Date): number;
    compareInDays(start_time: Date, end_time: Date): number;
    dateNow(): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    checkIfBefore(start_date: Date, end_date: Date)
}

export {IDateProvider}