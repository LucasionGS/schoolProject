using System;
using System.Collections.Generic;
using System.ComponentModel;
namespace Program
{
    class Program
    {
        public static void Main(string[] args) {
            // Defining the list of users.
            // (Defining it here instead of in the declaration so it's more obvious what it includes)
            User.users = new List<User>{
                new User(1, "Person 1"),
                new SpecialUser(2, "Person 2", "Hi I am special"),
                new User(3, "Person 3"),
                new User(4, "Person 4"),
            };
            
            // Find a specific user using the static method getUser() on the User class.
            var user1 = User.getUser(1); // Would return user with ID 1
            var user2 = User.getUser("Person 2"); // Would return user with username "Person 2"

            // Print out the users
            user1.print();
            user2.print();
        }
    }

    // *public* means it can be accessed from 
    class User
    {
        // Constructor for this class.
        public User(int id, string username) {
            this.id = id;
            this.username = username;
        }

        // Public means these are accessible outside of the class scope itself.
        // i.e it can be used when the instance is used as a reference.
        public int id;
        public string username;

        // *static* makes this method a class method, instead of a class instance method.
        // It can only be used when referring to the class object itself, and not the instances.
        public static User getUser(int id) {
            // Find uses a delegate to determined which user to return.
            // In this case, it wants a delegate method (I'm using a lambda function here) that accepts 1 parameter: A User object.
            // It's expecting the function to return a boolean, and the first it returns `true` on, it will return as value for Find().
            return users.Find(user => user.id == id);
        }
        // This is a overload method, it has the same name as the one above, but uses differnt type parameters.
        // C# automatically figures out which one to use based on the type passed to it.
        public static User getUser(string username) {
            return users.Find(user => user.username == username);
        }

        // This is declared as a static list of User instances and other classes that extend from User.
        public static List<User> users;

        // This print class is modified as *virtual*, making it overridable by classes that extends this base class.
        public virtual void print() {
            Console.WriteLine(
                "User"
                + $"\n\tid = {this.id}"
                + $"\n\tusername = {this.username}"
            );
        }
    }

    // This class extends and inherits from base class User.
    class SpecialUser : User
    {
        // Constructor for this class AND intializing the base class after by using ": base(...params)" after the method declaration.
        public SpecialUser(int id, string username, string specialMessage) : base(id, username) {
            this.specialMessage = specialMessage;
        }

        public string specialMessage;

        // This method can be overridden because the base class it extends from has it's own print method marked as *virtual*.
        public override void print() {
            Console.WriteLine(
                "SpecialUser"
                + $"\n\tid = {this.id}"
                + $"\n\tusername = {this.username}"
                + $"\n\tspecialMessage = {this.specialMessage}"
            );
        }
    }
}