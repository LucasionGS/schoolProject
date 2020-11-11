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

QueryRequest queryRequest = sql.Query("SELECT...`");

// Advances to the next row in the data.
Read(): bool; // Returns true if it found another row, false otherwise.

// Closes the query request. Should always end with this after handling the data.
Close();

// Get the value from a column in the current row as an object.
// This is supposed to be used inside of a while loop with queryRequest.Read().
Get(string columnName); // Returns the data with type object from the given name.
Get(int columnId); // Returns the data with type object from the given id.

// You can also specify a type for the Get method.
Get<DataType>(string columnName): DataType; // Returns the data with type DataType from the given name.
Get<DataType>(int columnId): DataType; // Returns the data with type DataType from the given id.

// You can use bracket notation as shorthand for the Get methods without custom types.
[string columnName]: object; // Returns the data with type object from the given name.
[int columnId]; object; // Returns the data with type object from the given id.

// These return the columns in the current query.
Columns(): string[]; // Returns String[] including all the field names. 
ColumnsValues: Dictionary<string, object>; // Returns Dictionary with field names as keys and their value as values.
ColumnsTypes: Dictionary<string, Type>; // Returns Dictionary with field names as keys and their type as values.

GetData
```
