﻿using _61_react_people_backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _61_react_people_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getpeople")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetPeople();
        }
        
        [Route("addperson")]
        [HttpPost]
        public int AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            int id = repo.AddPerson(person);
            return id;
        }
    }
}
