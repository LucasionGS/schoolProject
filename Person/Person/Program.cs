using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Person
{
    class Program
    {
        static void Main(string[] args)
        {
            Person p = new Person("phat", "person");
            Console.WriteLine(p.name);
            p.name = "test";
            Console.ReadKey();
        }
    }

    class Person
    {
        string firstName,
               lastName;
        int salary;
        public Person(string firstName, string lastName, int salary = 0)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.salary = salary;
        }

        public string name
        {
            get
            {
                return firstName + " " + lastName;
            }
            set
            {
                Console.WriteLine("Set name to {0}!", value);
            }
        }
    }
}
