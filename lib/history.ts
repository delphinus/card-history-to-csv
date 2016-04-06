///<reference path="../typings/main.d.ts" />

interface HistoryOptions {
    amount?: number;
    date?:   moment.Moment;
    header?: boolean;
    payee?:  string;
}

const header = "Type,Date,Account,CurrencyCode,Amount,AccountTo,CurrencyCodeTo,AmountTo,Category,Subcategory,Payee/Payer,Tag,Note"
    .split(',');

class History {

    constructor(private options: HistoryOptions) { }

    stringify(): string[] {

        if (this.options.header) {
            return header;
        } else {
            return [
                "",
                this.options.date.format("YYYY-MM-DD"),
                "",
                "",
                String(this.options.amount),
                "",
                "",
                "",
                "",
                "",
                this.trim(this.options.payee),
                "",
                "",
            ];
        }
    }

    private trim(str: string): string {

        return str.replace(/^\s+/, "").replace(/\s+$/, "");
    }
}

export = History;
