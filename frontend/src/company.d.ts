export interface CompanySearch {
  currency: string;
  exchangeShortName?: string;
  name: string;
  stockExchange?: string;
  symbol: string;
  exchangeFullName:string;
  exchange:string;
}
export interface CompanyProfile {
  country?: string;
  symbol?: string;
  price?: number;
  beta?: number;
  volAvg?: number;
  mktCap?: number;
  lastDiv?: number;
  currency?: string;
  range?: string;
  changes?: number;
  companyName?: string ;
  currency?: string;
  cik?: string;
  isin?: string;
  exchange?: string;
  exchangeShortName?: string;
  industry?: string;
  website?: string;
  description?: string;
  ceo?: string;
  sector?: string;
  counter?: string;
  fullTimeEmployees?: string;
  phone?: string;
  address?: string;
  city?: string;
  name?: string;
  state?: string;
  exchangeFullName?: string;
  zip?: string;
  dcfDiff?: number;
  dcf?: number;
  image?: string;
  ipoDate?: string;
  defaultImage?: boolean;
  isEtf?: boolean;
  isActivelyTrading?: boolean;
  isAdr?: boolean;
  isFund?: boolean;

}


export interface CompanyIncomeStatement {
  netIncomeRatio: number;
  date: string;
  revenue: number;
  costOfRevenue: number;
  depreciationAndAmortization: number;
  operatingIncome: number;
  incomeBeforeTax: number;
  netIncome: number;
  eps: number;
 
}

export interface CompanyBalanceSheet {
 
  totalAssets: number;
  totalCurrentAssets: number;
  cashAndCashEquivalents: number;
  propertyPlantEquipmentNet: number;
  intangibleAssets: number;
  longTermDebt: number;
  totalDebt: number;
  totalLiabilities: number;
  totalCurrentLiabilities: number;
  taxAssets: number;
  totalStockholdersEquity: number;
  retainedEarnings: number;
}

export interface CompanyCashFlow {
  commonStockIssuance: number;
  netCashUsedForInvestingActivites:number
  netCashProvidedByFinancingActivities:number
  date: string;
  operatingCashFlow: number;
  investmentsInPropertyPlantAndEquipment:number;
  freeCashFlow: number;
  cashAtEndOfPeriod: number;
  capitalExpenditure: number;
  netStockIssuance: number;
  netIncome: number;
}
  
export interface CompanyKeyMetrics {
  capexToDepreciationTTM
: 
number;
currentRatioTTM
: 
number;
earningsYieldTTM
: 
number;
freeCashFlowYieldTTM
: 
number;
grahamNumberTTM
: 
number;
marketCap
: 
number;
peRatioTTM
: 
number;
returnOnEquityTTM
: 
number;
returnOnTangibleAssetsTTM
: 
number;
tangibleAssetValueTTM
: 
number;
capexToOperatingCashFlowTTM:number;
}
