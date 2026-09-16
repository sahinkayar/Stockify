using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Stock.Comment
{
    public class UpdateCommentRequestDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title Must be 5 characters")]
        [MaxLength(280, ErrorMessage = "Title Cant be over 280 characters")]
        public string Title { get; set; } = string.Empty; [Required]
        [MinLength(5, ErrorMessage = "Content Must be 5 characters")]
        [MaxLength(280, ErrorMessage = "Content Cant be over 280 characters")]
        public string Content { get; set; } = string.Empty;
    }
}