import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getCashflowStatement } from "../../api";
import type { CompanyCashFlow } from "../../company";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.investmentsInPropertyPlantAndEquipment),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByFinancingActivities),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssuance),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

function CashflowStatement() {
  const ticker = useOutletContext<string>();
  const [cashflowStatement, setCashflowStatement] =
    useState<CompanyCashFlow[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCashFlowStatement = async () => {
      try {
        const result = await getCashflowStatement(ticker.toUpperCase());

        if (result && result.length > 0) {
          console.log(result);
          setCashflowStatement(result);
        }
      } catch (error) {
        console.warn("Error fetching cashflow statement data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCashFlowStatement();
  }, [ticker]);
  if (loading) return <Spinner />;
  return (
    <div>
      {cashflowStatement && <Table data={cashflowStatement} config={config} />}
    </div>
  );
}

export default CashflowStatement;
