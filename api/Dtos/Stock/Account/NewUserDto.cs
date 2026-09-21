using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock.Account
{
    public class NewUserDto
    {

        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string Token { get; set; }
    }
}