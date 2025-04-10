interface IAccMarkets {
  checkFields: boolean;
  currentScreen: string;
  intlMarkets: IMarket[];
  intlMarketsMap: IMarket[];
  sortByInter: string;
  sortByUS: string;
  usMarkets: IMarket[];
  usMarketsMap: [];
  nextScreen: string;
  previousScreen: string;
  lastUpdate: string;
  maxTravelMarkets: number;
}

interface IMarket {
  accountinfoid: number;
  brandsegment: string;
  contactTypeID: number;
  contactemail: string;
  contactname: string;
  contactphone: number;
  contacttitle: string;
  curractivity: string;
  location: string;
  market_country: string;
  market_state: string;
  marketinfoid: string;
  marketname: string;
  marketpotentialrev: string;
  marketpotentialrn: number;
  maxrate: number;
  notes: string;
  prefhotels: string;
  prefmarprop: string;
  ratecap: string;
  recid: number;
  seqid: number;
  traveldist: number;
  usMarket: string;
}

export type { IAccMarkets, IMarket };
