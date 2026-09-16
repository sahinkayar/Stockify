using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using api.Dtos.Stock;
using api.Helpers;
namespace api.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllStocksAsync(QueryObject query);
        Task<Stock?> GetStocksByIdAsync(int id);
        Task<Stock> CreatedAsync(Stock stockModel);

        Task<Stock?> GetBySymbolAsync(string symbol);
        Task<Stock> GetStocksUpdatedAsync(int id, UpdateStockDto UpdateDto);
        Task<Stock?> GetStocksRemovedAsync(int id);
        Task<bool> StockExists(int id);
    }
}