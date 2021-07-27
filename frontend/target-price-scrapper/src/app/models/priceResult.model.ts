import { Finviz } from "./finviz.model";
import { TipRanks } from "./tipRanks.model";
import { Wsj } from "./wsj.model";

export class PriceResult {
    stockName: String;
    companyLogoSrc: String
    finviz: Finviz;
    tipRanks: TipRanks;
    wsj: Wsj;
}    