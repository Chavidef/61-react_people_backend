using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _61_react_people_backend.Data
{
    public class PeopleRepository
    {
        private string _connectionString;
        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person>GetPeople()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }
        public int AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
            return person.Id;
        }
        public void DeletePerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            context.SaveChanges();
        }
        public void UpdatePerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }
        public void DeletePeople(List<Person> people)
        {
            //using var context = new PeopleDataContext(_connectionString);
            //foreach(int id in ids)
            //{
            //    context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            //};
            //context.SaveChanges();

            using var context = new PeopleDataContext(_connectionString);
            foreach (var person in people)
            {
                context.People.Remove(person);
            }
            context.SaveChanges();
        }
    }
}
