using System;
using System.Globalization;

namespace Windspeed
{
    class Program
    {
        static void Main(string[] args)
        {
            while(true)
            {
                Console.CursorLeft = 0;
                Console.Write("Type in how many meters per second the wind is blowing: ");
                // Predefining speed to use in the result text.
                double speed;
                string fb;
                while (!ConvertToData(Console.ReadLine().Replace(".", ","), out speed, out fb))
                {
                    Console.Write("Please enter a valid number: ");
                }
                Console.WriteLine("The speed is {0}km/h\n\n", speed);
                Console.WriteLine(fb);
                Console.WriteLine("Press any key to continue or press F5 to exit");
                ConsoleKeyInfo key = Console.ReadKey();
                if (key.Key == ConsoleKey.F5)
                {
                    Console.CursorLeft = 0;
                    Console.WriteLine("\nSee you next time o/");
                    System.Threading.Thread.Sleep(1000);
                    break;
                }
            }
        }

        static bool ConvertToData(string data, out double speed, out string fb)
        {
            speed = 0;
            fb = null;
            double m;
            if (double.TryParse(data, out m))
            {
                speed = m * 60 * 60 / 1000;

                if (m < 1.6)
                {
                    fb = "Stille.";
                }
                else if (m < 10.8)
                {
                    fb = "Svag til frisk vind.";
                }
                else if (m < 20.8)
                {
                    fb = "Hård vind til hård kuling.";
                }
                else if (m <= 32.7)
                {
                    fb = "Stormende kuling til stærk storm.";
                }
                else if (m > 32.7)
                {
                    fb = "Orkan";
                }
                return true;
            }
            return false; // Return false if the number is invalid
        }
    }
}
