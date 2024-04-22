﻿using listContactsApi.Data;
using listContactsApi.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Options;
using Microsoft.Extensions.Options;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Security.Claims;
using System.Collections.Generic;

namespace listContactsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthsController : ControllerBase
    {
        private readonly UsersController _context;
        private readonly JwtOption _option;

        public AuthsController(UsersController context, IOptions<JwtOption> option)
        {
            _context = context;
            this._option = option.Value;
        }

        [HttpPost("login")]

        public async Task<ActionResult> Login([FromBodyAttribute]LoginDto model){
            var user = await _context.getUserByEmail(model.email);
            if (user is null)
            {
                return BadRequest(new { error = "email does not exist" });
            }
            if (user.password != model.password) {
                return BadRequest(new {error= "email/password is in"});
            }
            var jwtKey=new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_option.Key));
            var credential= new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>()
            {
                new Claim("email",model.email),

            };
            var stoken= new JwtSecurityToken(_option.Key,_option.Issuer, claims, expires:DateTime.Now.AddHours(5),signingCredentials: credential);
            var token = new JwtSecurityTokenHandler().WriteToken(stoken);
            //var token = GenerateJwtToken(model.email) ;
            return Ok(token);
            }

        //private string GenerateJwtToken(string username)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_option.Key));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var claims = new[]
        //    {
        //        new Claim(JwtRegisteredClaimNames.Sub, username),
        //        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        //    };

        //    var token = new JwtSecurityToken(
        //        issuer: _option.Issuer,
        //        audience: _option.Audience,
        //        claims: claims,
        //        expires: DateTime.Now.AddMinutes(30), // Cambia según tus necesidades
        //        signingCredentials: credentials
        //    );

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}
    }

}

