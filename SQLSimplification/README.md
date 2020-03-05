# SQL Simplification

## Get started without all the explanation shit
Here's a quick example of how it works.
Think of a table that looks like this:  
### **Data**
| id | name | age |
| - | ---- | -- |
| 1 | Jeff | 21 |
| 2 | Alan | 45 |
| 3 | Meme | 69 |
```cs
MSSQL sql = new MSSQL("localhost", "userid", "password", "database");
QueryRequest req = sql.Query("SELECT * FROM [Data]");

while(req.Read()) { // this loops through all the rows until the end
  int id = req.Get<int>("id");
  string name = req.Get<string>("name");
  int age = req.Get<int>("age");
  Console.WriteLine($"{name} has ID {id} and is {age} years old.");
}

req.Close(); // Close the query request
sql.Close(); // Close the SQL connection.
```

## Documentation and explanation
To create a new connection to a server, initiate a new instance of `MSSQL`. New instances are open by default.
```cs
MSSQL sql = new MSSQL(string servername, string userid, string password, string db);
```

### Open and close
MSSQL connections can be opened and closed with their respective instance methods.
```cs
MSSQL.Open();
MSSQL.Close();
```

### Query Method
Execute a new query by using the `Query` instance method.
```cs
MSSQL.Query(string query); // Returns a QueryRequest Object
```

### QueryRequest Object
`QueryRequest Objects` is what you'll use to handle the request.

The `QueryRequest Object` has instance methods and properties that you are going to use to get the results of a request.

```cs
// Advances the SqlDataReader to the next record.
QueryRequest.Read();

// Closes the query request. Should always end with this after
QueryRequest.Close();

// Get the value from a column in the current row as an object.
// This is supposed to be used inside of a while loop with QueryRequest.Read().
QueryRequest.Get(string columnName); // Returns Object
QueryRequest.Get(int columnId); // Returns Object
QueryRequest.Get<DataType>(string columnName); // Returns DataType
QueryRequest.Get<DataType>(int columnId); // Returns DataType
```
