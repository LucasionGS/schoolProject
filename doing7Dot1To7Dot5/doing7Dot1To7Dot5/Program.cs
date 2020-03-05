using System;

namespace doing7Dot1To7Dot5
{
    class Program
    {
        static void Main(string[] args)
        {
            Ass._7Dot1();
            Ass._7Dot2();
            Ass._7Dot3();
            Ass._7Dot5();
        }
    }

    static class Ass
    {
        public static void _7Dot1()
        {
            Console.WriteLine("7.1\n___________________________________________________");
            string text = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
            int spaces = 0;
            for (int i = 0; i < text.Length; i++)
            {
                if (text[i] == ' ')
                {
                    spaces++;
                }
            }

            Console.WriteLine("Total of {0} spaces.", spaces);
        }

        public static void _7Dot2()
        {
            Console.WriteLine("7.2\n___________________________________________________");
            string text = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
            text = text.Replace(" ", "\n");

            Console.WriteLine(text);
        }

        public static void _7Dot3()
        {
            Console.WriteLine("7.3 - 7.4\n___________________________________________________");
            string text = "hans hansen";
            string[] names = text.Split(' ');
            text = "";
            for (int i = 0; i < names.Length; i++)
            {
                text += names[i].Substring(0, 1).ToUpper() + names[i].Substring(1).ToLower()+" ";
            }
            text = text.Trim();

            Console.WriteLine(text);
        }
        public static void _7Dot5()
        {
            Console.WriteLine("7.5\n___________________________________________________");
            string text = "Hans Hansen Hansensen";
            string[] names = text.Split(' ');
            text = "";
            for (int i = names.Length - 1; i >= 0; i--)
            {
                text += names[i]+" ";
            }
            text = text.Trim();

            Console.WriteLine(text);
        }
    }
}
