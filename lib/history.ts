///<reference path="../typings/main.d.ts" />

interface HistoryOptions {
    amount: number;
    date:   moment.Moment;
    payee:  string;
}

class History {

    constructor(private options: HistoryOptions) { }

    stringify(): string[] {
        return [
            this.options.date.format("YYYY-MM-DD"),
            String(this.options.amount),
            this.options.payee,
        ];
    }
}

export = History;
