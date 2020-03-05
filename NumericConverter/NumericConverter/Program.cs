using System;
using System.Text.RegularExpressions;

namespace NumericConverter
{
    class Program
    {
        static void Main(string[] args)
        {
            while(true)
            {
                Console.Write("As String: ");
                ToNumber(Console.ReadLine(), out double a);
                Console.Write(a.GetType().ToString() + ": ");
                Console.WriteLine(a);
            }
        }

        static bool ToNumber(string stringToNumber, out double num)
        {
            // Making a Integer converter without build-in convertion.
            stringToNumber = stringToNumber.Trim();
            num = 0;
            double more = 0;
            bool isNegative = false;
            for (int i = 0; i < stringToNumber.Length; i++)
            {
                char l = stringToNumber[i];
                double multiply = 0;
                try
                {
                    multiply = Convert.ToInt64(Math.Pow(10, stringToNumber.Length - i - 1));
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    num = 0;
                    return false;
                }
                bool fullStop = false;
                switch (l)
                {
                    case '0':
                        break;
                    case '1':
                        num += 1 * multiply;
                        break;
                    case '2':
                        num += 2 * multiply;
                        break;
                    case '3':
                        num += 3 * multiply;
                        break;
                    case '4':
                        num += 4 * multiply;
                        break;
                    case '5':
                        num += 5 * multiply;
                        break;
                    case '6':
                        num += 6 * multiply;
                        break;
                    case '7':
                        num += 7 * multiply;
                        break;
                    case '8':
                        num += 8 * multiply;
                        break;
                    case '9':
                        num += 9 * multiply;
                        break;
                    case '-':
                        isNegative = true;
                        break;
                    case ' ':
                        fullStop = true;
                        break;
                    case '.':
                        fullStop = true;
                        break;
                    default:
                        // throw new Exception("Not a number");
                        num = 0;
                        return false;
                }
                if (fullStop)
                {
                    break;
                }

            }
            if (isNegative)
            {
                num *= -1;
            }
            return true;
        }
        static bool ToNumber(string stringToNumber, out int num)
        {
            ToNumber(stringToNumber, out double _num);
            try
            {
                num = Convert.ToInt32(_num);
                return true;
            }
            catch (Exception)
            {
                num = 0;
                return false;
            }
        }
    }
}
