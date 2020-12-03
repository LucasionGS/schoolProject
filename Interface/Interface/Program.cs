using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interface
{
    class Program
    {
        static void Main(string[] args)
        {
            char[] s1 = "Hello".ToCharArray();
            char[] s2 = s1;
            Console.WriteLine(s1);
            Console.ReadKey();
        }

        interface IDrawable
        {
            /// <summary>
            /// Draws the object
            /// </summary>
            void Draw();
        }

        class Box : IDrawable
        {
            public void Draw()
            {
                // Unique Procedure to draw a Box
            }
        }

        class Circle : IDrawable
        {
            public void Draw()
            {
                // Unique Procedure to draw a Circle
            }
        }
        class Triangle : IDrawable
        {
            public void Draw()
            {
                // Unique Procedure to draw a Triangle
            }
        }
    }
}
