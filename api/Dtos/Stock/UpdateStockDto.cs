using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Stock
{
    public class UpdateStockDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol Can not be over 10 characters")]
        public string Symbol { get; set; } = string.Empty; [Required]
        [MaxLength(20, ErrorMessage = "Company name Can not be over 20 characters")]
        public string CompanyName { get; set; } = string.Empty;
        [Required]
        [Range(1, 10000000000)]
        public decimal Purchase { get; set; }
        [Required]
        [Range(000.1, 100)]
        public decimal LastDiv { get; set; }
        [Required]
        [MaxLength(10, ErrorMessage = "Industry Can not be over 10 characters")]
        public string Industry { get; set; } = string.Empty;
        [Required]
        [Range(1, 50000000000)]
        public long MarketCap { get; set; } = 0;
    }
}