using System;
using System.Threading;

namespace Assignment_1
{
    class Program
    {
        static void Main(string[] args)
        {
            Extra.GraphicFrame(1, 1, 20, 11);
            Extra.Frame(3, 2, 18, 10);
            Extra.GraphicFrame(5, 3, 16, 9);
            Extra.Frame(7, 4, 14, 8);
            Extra.GraphicFrame(9, 5, 12, 7);
            Console.SetCursorPosition(10, 6);
            Console.Write("Hi");

            Console.SetCursorPosition(0, 12);

            if (args.Length >= 1 && args[0].StartsWith("@error:"))
            {
                Extra.WriteColor(args[0].Substring("@error:".Length), ConsoleColor.Red);
                Console.WriteLine("\n");
            }
            int x, y, x2, y2;

            if (args.Length < 4)
            {
                Console.WriteLine("What's the starting X position?");
                while (!int.TryParse(Console.ReadLine(), out x))
                {
                    Extra.WriteColor("Please enter a valid number.");
                    Console.WriteLine("\n");
                }

                Console.WriteLine("What's the ending Y position?");
                while (!int.TryParse(Console.ReadLine(), out y))
                {
                    Extra.WriteColor("Please enter a valid number.");
                    Console.WriteLine("\n");
                }

                Console.WriteLine("What's the starting X position?");
                while (!int.TryParse(Console.ReadLine(), out x2))
                {
                    Extra.WriteColor("Please enter a valid number.");
                    Console.WriteLine("\n");
                }

                Console.WriteLine("What's the ending Y position?");
                while (!int.TryParse(Console.ReadLine(), out y2))
                {
                    Extra.WriteColor("Please enter a valid number.");
                    Console.WriteLine("\n");
                }
            }
            else
            {
                int.TryParse(args[0], out x);
                int.TryParse(args[1], out y);
                int.TryParse(args[2], out x2);
                int.TryParse(args[3], out y2);
            }

            Console.Clear();
            try
            {
                Extra.GraphicFrame(x, y, x2, y2);
            }
            catch (Exception e)
            {
                Main(new string[1] {"@error:"+e.Message});
                return;
            }

            Console.ReadKey();
        }
    }

    static class Extra
    {
        /// <summary>
        /// Create a frame. Color optional.
        /// </summary>
        /// <param name="x">Starting x position of the bounding box.</param>
        /// <param name="y">Starting y position of the bounding box.</param>
        /// <param name="x2">End x position of the bounding box.</param>
        /// <param name="y2">End y position of the bounding box.</param>
        public static void Frame(int x, int y, int x2, int y2, ConsoleColor color = ConsoleColor.White)
        {
            // Needed something else to do, so added throwing when the starting points is not lower than the starting points.
            if (x >= x2) throw new Exception("x must be smaller than x2");
            if (y >= y2) throw new Exception("y must be smaller than y2");

            int preX = Console.CursorLeft;
            int preY = Console.CursorTop;

            Console.CursorLeft = x;
            Console.CursorTop = y;

            // To Left
            for (int i = x; i < x2; i++)
            {
                WriteBGColor(" ", color);
                Console.CursorLeft++;
            }

            // To Bottom
            for (int i = y; i < y2; i++)
            {
                WriteBGColor(" ", color);
                Console.CursorTop++;
            }

            // To Right
            for (int i = x2; i > x; i--)
            {
                WriteBGColor(" ", color);
                Console.CursorLeft--;
            }

            // To Top
            for (int i = y2; i > y; i--)
            {
                WriteBGColor(" ", color);
                Console.CursorTop--;
            }

            // Return the color to the previous position the command was executed at.
            Console.CursorLeft = preX;
            Console.CursorTop = preY;
        }

        /// <summary>
        /// Create a better-looking frame uysing Unicode. Color optional.
        /// </summary>
        /// <param name="x">Starting x position of the bounding box.</param>
        /// <param name="y">Starting y position of the bounding box.</param>
        /// <param name="x2">End x position of the bounding box.</param>
        /// <param name="y2">End y position of the bounding box.</param>
        public static void GraphicFrame(int x, int y, int x2, int y2, ConsoleColor color = ConsoleColor.White)
        {
            // Needed something else to do, so added throwing when the starting points is not lower than the starting points.
            if (x >= x2) throw new Exception("x must be smaller than x2");
            if (y >= y2) throw new Exception("y must be smaller than y2");

            int preX = Console.CursorLeft;
            int preY = Console.CursorTop;

            Console.CursorLeft = x;
            Console.CursorTop = y;

            // To Left
            for (int i = x; i < x2; i++)
            {
                WriteColor("═", color);
                Console.CursorLeft++;
            }

            // To Bottom
            for (int i = y; i < y2; i++)
            {
                WriteColor("║", color);
                Console.CursorTop++;
            }

            // To Right
            for (int i = x2; i > x; i--)
            {
                WriteColor("═", color);
                Console.CursorLeft--;
            }

            // To Top
            for (int i = y2; i > y; i--)
            {
                WriteColor("║", color);
                Console.CursorTop--;
            }

            // Set the corners
            Console.SetCursorPosition(x, y);
            WriteColor("╔", color);
            Console.SetCursorPosition(x2, y);
            WriteColor("╗", color);
            Console.SetCursorPosition(x2, y2);
            WriteColor("╝", color);
            Console.SetCursorPosition(x, y2);
            WriteColor("╚", color);

            // Return the color to the previous position the command was executed at.
            Console.CursorLeft = preX;
            Console.CursorTop = preY;
        }

        /// <summary>
        /// Writes a string just like Console.Write, but in colored background.
        /// </summary>
        /// <param name="text">String to print.</param>
        /// <param name="color">ConsoleColor to use for the text background.</param>
        public static void WriteBGColor(string text, ConsoleColor color)
        {
            int oldX = Console.CursorLeft;
            int oldY = Console.CursorTop;
            ConsoleColor old = Console.BackgroundColor;
            Console.BackgroundColor = color;
            Console.Write(text);
            Console.BackgroundColor = old;
            Console.SetCursorPosition(oldX, oldY);
        }

        /// <summary>
        /// Writes a string just like Console.Write, but in color.
        /// </summary>
        /// <param name="text">String to print.</param>
        /// <param name="color">ConsoleColor to use for the text background.</param>
        public static void WriteColor(string text, ConsoleColor color = ConsoleColor.White)
        {
            int oldX = Console.CursorLeft;
            int oldY = Console.CursorTop;
            ConsoleColor old = Console.ForegroundColor;
            Console.ForegroundColor = color;
            Console.Write(text);
            Console.ForegroundColor = old;
            Console.SetCursorPosition(oldX, oldY);
        }
    }
}
