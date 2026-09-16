import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { CompanyIncomeStatement } from "../../company";
import Table from "../Table/Table";
import { getIncomeStatement } from "../../api";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
const formatLargeNumber = (num: number) => {
  if (!num && num !== 0) return "-";
  return `$${(num / 1e9).toFixed(2)}B`;
};

const formatPercent = (ratio: number) => {
  if (!ratio && ratio !== 0) return "-";
  return `%${(ratio * 100).toFixed(2)}`;
};

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },

  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.netIncomeRatio),
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
];
function IncomeStatement() {
  const ticker = useOutletContext<string>();
  const [statementData, setStatementdata] =
    useState<CompanyIncomeStatement[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchIncomeStatement = async () => {
      if (!ticker) return;
      try {
        const value = await getIncomeStatement(ticker);
        if (value && value.length > 0) {
          setStatementdata(value);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchIncomeStatement();
  }, [ticker]);
  if (loading) return <Spinner />;
  return (
    <div>
      {statementData && <Table data={statementData} config={configs} />}
    </div>
  );
}

export default IncomeStatement;
