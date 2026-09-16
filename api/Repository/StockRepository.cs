using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.models;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Dtos.Stock;
using api.Mappers;
using api.Helpers;
namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly StockDBContext _Context;
        public StockRepository(StockDBContext context)
        {
            _Context = context;
        }
        public async Task<List<Stock>> GetAllStocksAsync(QueryObject query)
        {
            var stocks = _Context.Stock.Include(c => c.Comments).ThenInclude(a => a.AppUser).AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stocks = stocks.Where(s => s.CompanyName.Contains(query.CompanyName));
            }
            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stocks = stocks.Where(s => s.Symbol.Contains(query.Symbol));
            }
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {

                if (query.SortBy.Equals("Symbol, StringComparison.OrdinalIgnoreCase"))
                {
                    stocks = query.IsDescending ? stocks.OrderByDescending(s => s.Symbol) : stocks.OrderBy(s => s.Symbol);
                }
            }
            return await stocks.Skip(query.Skip).Take(query.PageSize).ToListAsync();
        }
        public async Task<Stock?> GetStocksByIdAsync(int id)
        {
            return await _Context.Stock.Include(c => c.Comments).FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<bool> StockExists(int id)

        {
            return _Context.Stock.AnyAsync(s => s.Id == id);
        }
        public async Task<Stock> CreatedAsync(Stock stockModel)
        {
            _Context.Stock.Add(stockModel);
            await _Context.SaveChangesAsync();
            return stockModel;
        }
        public async Task<Stock?> GetStocksUpdatedAsync(int id, UpdateStockDto UpdateDto)
        {
            var stockModel = await _Context.Stock.FirstOrDefaultAsync(x => x.Id == id);
            if (stockModel != null)
            {
                UpdateDto.ToStockFromUpdateDto(stockModel);

                await _Context.SaveChangesAsync();
            }
            return stockModel!;
        }
        public async Task<Stock?> GetStocksRemovedAsync(int id)
        {
            var stockModel = await _Context.Stock.FirstOrDefaultAsync(x => x.Id == id);
            if (stockModel != null)
            {
                _Context.Stock.Remove(stockModel);
                await _Context.SaveChangesAsync();
            }
            return stockModel;
        }
        public async Task<Stock?> GetBySymbolAsync(string symbol)
        {
            return await _Context.Stock.FirstOrDefaultAsync(x => x.Symbol == symbol);
        }


    }
}