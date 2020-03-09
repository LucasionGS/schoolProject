using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace KasseApparat
{
    class Program
    {
        static void Main(string[] _)
        {
            string datFile = AppContext.BaseDirectory+@"../../itemlist.dat";
            Item.ParseFromFile(datFile);
            string ans = null;
            Dictionary<int, int> itemCount = new Dictionary<int, int>();
            do
            {
                if (ans == "")
                {
                    WriteLineColor("You need to write either the Item Number or name to select.");
                    continue;
                }
                if (ans != null)
                {
                    Console.Clear();
                    Item selected = ItemList.FindItem(ans);
                    if (selected is Item && selected != null)
                    {
                        ItemList.cart.Add(selected);
                        WriteLineColor("Added " + selected.name + " To cart!", ConsoleColor.Green);
                        Console.WriteLine("Your cart:");
                        
                        if (!itemCount.ContainsKey(selected.id)) itemCount.Add(selected.id, 0);
                        itemCount[selected.id]++;

                        foreach (KeyValuePair<int, int> itemPair in itemCount)
                        {
                            WriteLineColor(ItemList.FindItem(itemPair.Key).name+": x"+itemPair.Value, ConsoleColor.Yellow);
                        }
                    }
                    else
                    {
                        WriteLineColor("The item could not be found. Try again.");
                    }
                }
                for (int i = 0; i < ItemList.items.Count; i++)
                {
                    Item item = ItemList.items[i];
                    Console.Write("Item Number: " + item.id + " | " + item.name
                        + "\n  Price: " + item.price + "kr");
                    if (item.discount > 0 && item.amountForDiscount > 0)
                    {
                        Console.Write(" | Get " + item.discount + "% discount on each if you buy " + item.amountForDiscount+" or more");
                    }

                    Console.WriteLine();
                }
            }
            while ((ans = Console.ReadLine().Trim()) != "0");

            Console.Clear();
            Console.WriteLine("Here's your cart:");
            double total = 0;
            double totalDiscount = 0;
            Dictionary<int, int> itemCounts = new Dictionary<int, int>();
            Dictionary<int, double> itemDiscounts = new Dictionary<int, double>();
            for (int i = 0; i < ItemList.cart.Count; i++)
            {
                var cartItem = ItemList.cart[i];
                if (!itemCounts.ContainsKey(cartItem.id)) itemCounts.Add(cartItem.id, 0);
                itemCounts[cartItem.id]++;
                // Preparing items for discounts
                if (!itemDiscounts.ContainsKey(cartItem.id)) itemDiscounts.Add(cartItem.id, 0);

                total += cartItem.price;
                if (cartItem.amountForDiscount > 0 && itemCounts[cartItem.id] > cartItem.amountForDiscount)
                {
                    var dis = cartItem.price * (Convert.ToDouble(cartItem.discount) / 100);
                    totalDiscount += dis;
                    itemDiscounts[cartItem.id] += dis;
                }
                if (cartItem.amountForDiscount > 0 && itemCounts[cartItem.id] == cartItem.amountForDiscount)
                {
                    double dis = cartItem.amountForDiscount * (cartItem.price * (Convert.ToDouble(cartItem.discount) / 100));
                    totalDiscount += dis;
                    itemDiscounts[cartItem.id] += dis;
                }
                Console.WriteLine(cartItem.name + " - " + cartItem.price+"kr");
            }

            Console.WriteLine("Sub Total: "+total + "kr");
            Console.WriteLine("----------------------------------------");
            foreach (int itemId in itemDiscounts.Keys.ToArray())
            {
                var itmDis = itemDiscounts[itemId];
                if (itmDis > 0)
                {
                    Console.WriteLine(ItemList.FindItem(itemId).name + " Discount: "+ itmDis+"kr");
                }
            }
            Console.WriteLine("Discount: " + totalDiscount + "kr");
            WriteLineColor("Total: " + (total - totalDiscount) + "kr", ConsoleColor.Green);

            Console.ReadKey();
        }

        public static void WriteColor(string text, ConsoleColor color = ConsoleColor.Red)
        {
            ConsoleColor old = Console.ForegroundColor;
            Console.ForegroundColor = color;
            Console.Write(text);
            Console.ForegroundColor = old;
        }
        public static void WriteLineColor(string text, ConsoleColor color = ConsoleColor.Red)
        {
            ConsoleColor old = Console.ForegroundColor;
            Console.ForegroundColor = color;
            Console.WriteLine(text);
            Console.ForegroundColor = old;
        }
    }

    class Item
    {
        public int id, price, amountForDiscount;
        public string name;
        public int discount;

        public Item(int id, string itemName, int price, int discount, int amountForDiscount)
        {
            this.id = id;
            this.name = itemName;
            this.price = price;
            this.discount = discount;
            this.amountForDiscount = amountForDiscount;
        }

        public static void ParseFromFile(string filePath)
        {
            StreamReader sr = new StreamReader(filePath);
            string line;
            int lineNum = 0;
            while ((line = sr.ReadLine()) != null)
            {
                lineNum++;
                line = line.Trim();
                if (line.StartsWith("#") || line == "") continue; // Filtering out comments
                string[] args = line.Split(',');
                int adc = 0;
                try
                {
                    if (int.Parse(args[3]) > 0 && args.Length > 4)
                    {
                        adc = int.Parse(args[4]);
                    }
                    ItemList.items.Add(
                        new Item(int.Parse(args[0]), args[1].Trim(), int.Parse(args[2]), int.Parse(args[3]), adc)
                    );
                }
                catch (Exception)
                {
                    Program.WriteLineColor("Line " + lineNum + " couldn't be parsed");
                    continue;
                }
            }
        }
    }

    class ItemList
    {
        public static List<Item> items = new List<Item>();
        public static List<Item> cart = new List<Item>();
        public static Item FindItem(int itemID)
        {
            for (int i = 0; i < items.Count; i++)
            {
                Item item = items[i];
                if (item.id == itemID)
                {
                    return item;
                }
            }
            return null;
        }

        public static Item FindItem(string itemName)
        {
            if (int.TryParse(itemName, out int itemId))
            {
                return FindItem(itemId);
            }
            for (int i = 0; i < items.Count; i++)
            {
                Item item = items[i];
                if (item.name == itemName)
                {
                    return item;
                }
            }
            return null;
        }
    }
}