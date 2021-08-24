import { Finviz } from "./finviz.model";
import { TipRanks } from "./tipRanks.model";
import { Wsj } from "./wsj.model";

export class PriceResult {
    stockName: String;
    companyLogoSrc: String
    finviz?: Finviz = {targetPrice: ""};
    tipRanks?: TipRanks= {high: "",average: "",lowest:""};
    wsj?: Wsj = {high: "",average: "",lowest:""};;
}    