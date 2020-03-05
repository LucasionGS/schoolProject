using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLSimplification;

namespace SQL_Testing
{
    class Program
    {
        static void Main(string[] args)
        {
            MSSQL sql = new MSSQL("localhost", "LUCASION\\Lucasion", "", "test");
            var o = sql.Query(
                "UPDATE dat SET age = 69 WHERE name LIKE 'Jeff';" +
                "SELECT * FROM dat"
                );
            while(o.Read())
            {
                Console.WriteLine(o.Get<int>("age"));
            }

            o.Close();
            Console.ReadKey();
        }
    }
}
