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
            MSSQL sql = new MSSQL("localhost", @"DESKTOP-63URI23\Lucas", "", "Kundekartotek");
            MSSQL.QueryRequest o = sql.Query(
                "SELECT * FROM Kunder"
            );

            while (o.Read())
            {
                //Console.WriteLine(o["Kundenummer"] + " - " + o[""]);
            }

            o.Close();

            Console.ReadKey();
        }
    }
}
