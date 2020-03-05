using System;
using System.Data.SqlClient;

/// <summary>
/// Wrapper created by the high and mighty Lucasion.
/// If you steal you're gay >:(
/// </summary>
namespace SQLSimplification
{
    /// <summary>
    /// Microsoft SQL wrapper to make it easier for basic MSSQL query requests and handling.
    /// </summary>
    public class MSSQL
    {
        static void Error(string msg, Exception e = null)
        {
            var old = Console.ForegroundColor;
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(msg);
            Console.ForegroundColor = old;

            if (e is Exception)
            {
                Console.WriteLine(e);
            }
        }

        public SqlConnection sqlConnection;
        /// <summary>
        /// Create a new SQL connection and open it.
        /// Can be closed again using the Close() method.
        /// </summary>
        /// <param name="servername">Server Address / Domain</param>
        /// <param name="userid">User Identification</param>
        /// <param name="password">User Password</param>
        /// <param name="db">Database name.</param>
        /// <param name="doNotOpenByDefault">Set to true if you don't want it to open on initialization, leave blank otherwise.</param>
        public MSSQL(string servername, string userid, string password, string db, bool doNotOpenByDefault = false)
        {
            sqlConnection = Setup(servername, userid, password, db);
            if (!doNotOpenByDefault)
            {
                Open();
            }
        }

        public void Open()
        {
            sqlConnection.Open();
        }

        public void Close()
        {
            sqlConnection.Close();
        }

        /// <summary>
        /// Creates an SqlConnection to a server.
        /// </summary>
        /// <param name="servername"></param>
        /// <param name="userid"></param>
        /// <param name="password"></param>
        /// <param name="db"></param>
        /// <returns></returns>
        static SqlConnection Setup(string servername, string userid, string password, string db)
        {
            // This will only work for Windows Integrated users, I believe.
            try
            {
                return new SqlConnection($"Data Source={servername};Initial Catalog={db};User ID={userid};Password={password}; Integrated Security=true");
            }
            catch (Exception e)
            {
                Error(e.Message, e);
                return null;
            }
        }

        /// <summary>
        /// Query Request Object. Use this to handle the query's output.
        /// </summary>
        public class QueryRequest
        {
            public SqlCommand sqlCommand;
            public SqlDataReader dataReader;
            public QueryRequest(SqlCommand sqlcommand)
            {
                sqlCommand = sqlcommand;
                try
                {
                    dataReader = sqlcommand.ExecuteReader();
                }
                catch (Exception e)
                {
                    Error(e.Message, e);
                    throw new Exception(e.Message+"\nCould not finish query. The SQL syntax is likely incorrect or this query object already has an open query that needs closing with Close().");
                }
            }

            /// <summary>
            /// Advances the SqlDataReader to the next record.
            /// Can be used inside of a while loop.
            /// </summary>
            /// <returns>true if there are more rows; otherwise false.</returns>
            public bool Read()
            {
                return dataReader.Read();
            }

            public void Close()
            {
                dataReader.Close();
            }

            /// <summary>
            /// Get the value from a column in the current row as a specified type. This is supposed to be used inside of a while loop with QueryRequest.Read().
            /// </summary>
            /// <typeparam name="DataType">Specify a datatype to get.</typeparam>
            /// <param name="columnName">Name of the column.</param>
            public DataType Get<DataType>(string columnName)
            {
                try
                {
                    return dataReader.GetFieldValue<DataType>(dataReader.GetOrdinal(columnName));
                }
                catch
                {
                    throw new Exception($"Could not find any values in {columnName} with the type {typeof(DataType).Name}.");
                }
            }

            /// <summary>
            /// Get the value from a column in the current row as a specified type. This is supposed to be used inside of a while loop with QueryRequest.Read().
            /// </summary>
            /// <typeparam name="DataType">Specify a datatype to get.</typeparam>
            /// <param name="columnId">ID of the column.</param>
            public DataType Get<DataType>(int columnId)
            {
                try
                {
                    return dataReader.GetFieldValue<DataType>(columnId);
                }
                catch
                {
                    throw new Exception($"Could not find any values at ID {columnId} with the type {typeof(DataType).Name}.");
                }
            }

            /// <summary>
            /// Get the value from a column in the current row as an object. This is supposed to be used inside of a while loop with QueryRequest.Read().
            /// </summary>
            /// <param name="columnName">Name of the column.</param>
            public object Get(string columnName)
            {
                return Get<object>(columnName);
            }

            /// <summary>
            /// Get the value from a column in the current row as an object. This is supposed to be used inside of a while loop with QueryRequest.Read().
            /// </summary>
            /// <param name="columnId">ID of the column.</param>
            public object Get(int columnId)
            {
                return Get<object>(columnId);
            }
        }

        /// <summary>
        /// Execute a query on the server and return the result. To minimize errors, make sure to use .Close() when you are done handling the query.
        /// </summary>
        /// <param name="query">An SQL query string.</param>
        /// <returns></returns>
        public QueryRequest Query(string query)
        {
            return new QueryRequest(new SqlCommand(query, sqlConnection));
        }
    }
}
