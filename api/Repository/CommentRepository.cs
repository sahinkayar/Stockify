using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Data;
using api.models;
using api.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using api.Helpers;
namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly StockDBContext _context;

        public CommentRepository(StockDBContext context)
        {
            _context = context;
        }
        public async Task<List<Comment>> GetAllCommmentsAsync(CommentQueryObject queryObject)
        {
            var comments = _context.Comment
         .Include(c => c.AppUser)
         .Include(c => c.Stock)
         .AsQueryable();

            if (!string.IsNullOrEmpty(queryObject.Symbol) && !string.IsNullOrWhiteSpace(queryObject.Symbol))
            {
                comments = comments.Where(c => c.Stock.Symbol.ToLower() == queryObject.Symbol.ToLower());

            }
            if (queryObject.IsDecsending)
            {
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }

            return await comments.ToListAsync();
        }
        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comment.Include(c => c.AppUser).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Comment?> CreateAsync(Comment commentModel)
        {
            await _context.Comment.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }
        public async Task<Comment?> UpdateAsync(int id, Comment commentModel)
        {
            var existingComment = await _context.Comment.FindAsync(id);

            if (existingComment == null)
            {
                return null;
            }
            existingComment.Title = commentModel.Title;
            existingComment.Content = commentModel.Content;
            await _context.SaveChangesAsync();
            return existingComment;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentModel = await _context.Comment.FirstOrDefaultAsync(s => s.Id == id);
            if (commentModel == null)
            {
                return null;
            }
            ;
            _context.Comment.Remove(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }
    }
}