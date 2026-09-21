using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock.Account
{
    public class LoginDto
    {
        [Required]
        public required string UserName { get; set; }
        [Required]
        public required string Password { get; set; }

    }
}