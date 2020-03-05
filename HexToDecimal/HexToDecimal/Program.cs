using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace HexToDecimal
{
    class Program
    {
        static void Main(string[] _)
        {
            Console.Write("Select which convertion tool you want to use:\n" +
                "1 - Hex To Integer\n" +
                "2 - Int To Hex\n" +
                "3 - Binary To Int\n" +
                "4 - Int To Binary\n" +
                "5 - Binary to Hex\n" +
                "6 - Hex To Binary\n\n" +
                "Write the index number: ");
            int.TryParse(Console.ReadLine(), out int ans);


            while (ans < 1 || ans > 6)
            {
                Console.Write("Please select a valid number: ");
                int.TryParse(Console.ReadLine(), out ans);
            }

            if (ans == 1)
            {
                Console.Write("Write a Hexadecimal: ");
                HexToInt(Console.ReadLine(), out int result);

                Console.WriteLine("\nResult: " + result);
            }
            else if (ans == 2)
            {
                Console.Write("Write an Int: ");
                string rl = Console.ReadLine();
                int num;

                while (!int.TryParse(rl, out num)) Console.Write("Invalid input.\nTry another input: ");
                IntToHex(num, out string result);

                Console.WriteLine("\nResult: " + result);
            }
            else if (ans == 3)
            {
                Console.Write("Write a Binary: ");
                string rl = Console.ReadLine();

                BinaryToInt(rl, out int result);

                Console.WriteLine("\nResult: " + result);
            }
            else if (ans == 4)
            {
                Console.Write("Write an Int: ");
                string rl = Console.ReadLine();
                int num;

                while (!int.TryParse(rl, out num)) Console.Write("Invalid input.\nTry another input: ");
                IntToBinary(num, out string result);

                Console.WriteLine("\nResult: " + result);
            }
            else if (ans == 5)
            {
                Console.Write("Write a Binary: ");
                string rl = Console.ReadLine();

                BinaryToHex(rl, out string result);

                Console.WriteLine("\nResult: " + result);
            }
            else if (ans == 6)
            {
                Console.Write("Write a Hexadecimal: ");
                string rl = Console.ReadLine();

                HexToBinary(rl, out string result);

                Console.WriteLine("\nResult: " + result);
            }
        }

        static bool HexToInt(string hex, out int deci)
        {
            hex = hex.ToLower();
            deci = 0;
            Regex rex = new Regex("^[0-9a-f]", RegexOptions.IgnoreCase);
            if (!rex.IsMatch(hex))
            {
                return false;
            }

            for (int p = 0; p < hex.Length; p++)
            {
                int i = hex.Length - 1 - p;
                char hexC = hex[i];

                switch (hexC)
                {
                    case '0':
                        break;
                    case '1':
                        deci += 1 * (int)Math.Pow(16, p);
                        break;
                    case '2':
                        deci += 2 * (int)Math.Pow(16, p);
                        break;
                    case '3':
                        deci += 3 * (int)Math.Pow(16, p);
                        break;
                    case '4':
                        deci += 4 * (int)Math.Pow(16, p);
                        break;
                    case '5':
                        deci += 5 * (int)Math.Pow(16, p);
                        break;
                    case '6':
                        deci += 6 * (int)Math.Pow(16, p);
                        break;
                    case '7':
                        deci += 7 * (int)Math.Pow(16, p);
                        break;
                    case '8':
                        deci += 8 * (int)Math.Pow(16, p);
                        break;
                    case '9':
                        deci += 9 * (int)Math.Pow(16, p);
                        break;
                    case 'a':
                        deci += 10 * (int)Math.Pow(16, p);
                        break;
                    case 'b':
                        deci += 11 * (int)Math.Pow(16, p);
                        break;
                    case 'c':
                        deci += 12 * (int)Math.Pow(16, p);
                        break;
                    case 'd':
                        deci += 13 * (int)Math.Pow(16, p);
                        break;
                    case 'e':
                        deci += 14 * (int)Math.Pow(16, p);
                        break;
                    case 'f':
                        deci += 15 * (int)Math.Pow(16, p);
                        break;

                    default:
                        throw new Exception("Cannot convert "+hexC+" to a number.");
                }
            }

            return true;
        }

        static bool IntToHex(int hexInt, out string hex)
        {
            hex = "";

            while (hexInt > 0)
            {
                char c = GetHighestHex(hexInt, out int hexValue);
                hexInt -= hexValue;
                hex += c;
            }

            static char GetHighestHex(int number, out int hexValue)
            {
                int i = 0;
                int hexI = 0;
                hexValue = hexI * (int)Math.Pow(16, i);
                while (hexValue <= number)
                {
                    if (hexI > 15)
                    {
                        i++;
                        hexI = 0;
                    }
                    hexI++;
                    hexValue = hexI * (int)Math.Pow(16, i);
                }

                hexI--;
                if (hexI < 0)
                {
                    hexI = 15;
                }

                hexValue = hexI * (int)Math.Pow(16, i);

                return hexI switch
                {
                    0 => '0',
                    1 => '1',
                    2 => '2',
                    3 => '3',
                    4 => '4',
                    5 => '5',
                    6 => '6',
                    7 => '7',
                    8 => '8',
                    9 => '9',
                    10 => 'a',
                    11 => 'b',
                    12 => 'c',
                    13 => 'd',
                    14 => 'e',
                    15 => 'f',
                    _ => throw new Exception("Shit didn't work!"),
                };
            }
            return true;
        }

        static bool IntToBinary(int binInt, out string binary)
        {
            // A list of binary numbers which will be in reverse order.
            List<int> bin = new List<int>{ 0 };

            binary = "";
            for (int index = 0; index < binInt; index++)
            {
                bin[0]++;
                for (int i = 0; i < bin.Count; i++)
                {
                    if (bin.Count > i+1 && bin[i] == 2)
                    {
                        bin[i] = 0;
                        bin[i + 1]++;
                    }
                    if (bin[bin.Count-1] == 2)
                    {
                        bin[bin.Count - 1] = 0;
                        bin.Add(1);
                    }
                }
            }

            for (int i = bin.Count - 1; i >= 0; i--)
            {
                binary += bin[i];
            }
            return true;
        }

        static bool HexToBinary(string hex, out string binary)
        {
            HexToInt(hex, out int intFromHex);
            IntToBinary(intFromHex, out binary);
            return true;
        }

        static bool BinaryToInt(string binary, out int num)
        {
            num = 0;
            char[] bin = binary.ToCharArray();
            for (int i = bin.Length - 1; i >= 0; i--)
            {
                int m = bin.Length - 1 - i;
                if (bin[i] == '1')
                {
                    num += (int)Math.Pow(2, m);
                }
            }
            return true;
        }

        static bool BinaryToHex(string binary, out string hex)
        {
            BinaryToInt(binary, out int binInt);
            IntToHex(binInt, out hex);
            return true;
        }
    }
}
