import axios, { Axios } from "axios";
import type {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
} from "./company.d";
import {
  getMockCompanyMetrics,
  mockBalanceSheet,
  mockCashFlowStatement,
  mockCompanyProfile,
  mockIncomeStatement,
} from "./Mocks/Mock";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const searchCompanies = async (query: string) => {
  try {
    const response = await axios.get<CompanySearch[]>(
      `https://financialmodelingprep.com/stable/search-name?query=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return "error message: " + error.message;
    } else {
      console.log("unexpected error", error);
      return " An unexpected error has occured";
    }
  }
};

export const getCompanyProfile = async (
  query: string,
  searchFallBack?: CompanySearch,
): Promise<CompanyProfile[]> => {
  try {
    const response = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    console.log(response.data);
    if (response.data && response.data.length > 0) {
      return response.data;
    }
  } catch (error) {
    console.warn("API Call has been limited, showing mock data", error);
  }
  return [mockCompanyProfile({ query, searchFallBack })];
};

export const getCompanyMetrics = async (
  query: string,
): Promise<CompanyKeyMetrics[]> => {
  try {
    const response = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );

    console.log(response.data);
    return response.data;
  } catch (error) {}
  return [getMockCompanyMetrics()];
};

export const getIncomeStatement = async (
  query: string,
): Promise<CompanyIncomeStatement[]> => {
  try {
    const response = await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/stable/income-statement?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    console.log(response);
    return response.data;
  } catch (error) {}
  return mockIncomeStatement();
};

export const getBalanceSheet = async (
  query: string,
): Promise<CompanyBalanceSheet[]> => {
  try {
    const response = await axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    console.log(response);
    return response.data;
  } catch (error) {}
  return mockBalanceSheet();
};

export const getCashflowStatement = async (
  query: string,
): Promise<CompanyCashFlow[]> => {
  try {
    const response = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );

    console.log(response.data);
    return response.data;
  } catch (error) {}
  return mockCashFlowStatement();
};
