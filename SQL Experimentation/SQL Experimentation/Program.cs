using System;
using System.Data.SqlClient;

namespace SQL_Experimentation
{
    class Program
    {
        static void Main(string[] args)
        {
            SqlConnection cnn = SetupSql("localhost", "DESKTOP-53URI23\\Lucas", "", "Kundekartotek");
            cnn.Open();
            Console.WriteLine("Done something");

            string query = "SELECT * FROM Kontakter";

            SqlCommand o = new SqlCommand(query, cnn);
            SqlDataReader dr = o.ExecuteReader();
            string data = "";
            while (dr.Read())
            {
                data += dr.GetValue(0) + " - " + Row(dr, "Kontakttidspunkt") +"\n";
            }

            Console.WriteLine(data);

            cnn.Close();
            Console.ReadKey();
        }

        static SqlConnection SetupSql(string servername, string userid, string password, string db)
        {
            return new SqlConnection($"Data Source={servername};Initial Catalog={db};User ID={userid};Password={password}; Integrated Security=true");
        }

        static object Row(SqlDataReader dr, string name)
        {
            return dr.GetValue(dr.GetOrdinal(name));
        }
    }
}
