///<reference path="../typings/main.d.ts" />

interface HistoryOptions {
    amount?: number;
    date?:   moment.Moment;
    header?: boolean;
    payee?:  string;
}

export const header = "Type,Date,Account,CurrencyCode,Amount,AccountTo,CurrencyCodeTo,AmountTo,Category,Subcategory,Payee/Payer,Tag,Note"
    .split(',');

const FULLWIDTH_ALPHANUMERIC: RegExp = /[\uFF01-\uFF5F]/g;

export class History {

    constructor(private options: HistoryOptions) { }

    stringify(): string[] {

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
            this.cleanUp(this.options.payee),
            "",
            "",
        ];
    }

    private cleanUp(str: string): string {

        return str
            .replace(/^\s+|\s+$/g, "")
            .replace(/\s+/g, " ")
            .replace(
                FULLWIDTH_ALPHANUMERIC,
                (char: string) => String.fromCharCode(char.charCodeAt(0) - 65248)
            );
    }
}
