using System;
using System.Collections.Generic;

namespace Motorcycle
{
    class Program
    {
        static void Main(string[] args)
        {
            Motorcycle.List bikes = new Motorcycle.List();
            // m will be reused for adding bikes to the list.
            Motorcycle m = new Motorcycle();
            m.Name = "A motorcycle name";
            m.Start();
            m.ShiftGearsUp();
            m.ShiftGearsUp();
            m.ShiftGearsDown(1);
            m.SetRPM(5000);
            bikes.Add(m);

            m = new Motorcycle();
            m.Name = "Another motorcycle";
            m.Start();
            m.ShiftGearsUp();
            m.ShiftGearsUp();
            m.ShiftGearsUp();
            m.SetRPM(2700);
            bikes.Add(m);

            m = new Motorcycle();
            m.Name = "I ran out of bike names already";
            m.Start();
            m.SetRPM(6000);
            bikes.Add(m);

            m = new Motorcycle();
            m.Name = "This bike is stationary";
            bikes.Add(m);

            bikes.Sort();

            foreach (Motorcycle motorcycle in bikes)
            {
                Console.WriteLine(motorcycle.ToString());
            }
        }
    }

    class Motorcycle: IComparable
    {
        bool started;
        string name;
        int rpm, gear;

        public int CompareTo(object obj)
        {
            Motorcycle mtr = (Motorcycle)obj;
            if (mtr == null) return -1;
            return GetSpeed().CompareTo(mtr.GetSpeed());
        }

        public class List : List<Motorcycle> { }

        public Motorcycle()
        {
            name = "";
            started = false;
            rpm = 0;
            gear = 0;
        }

        public Motorcycle(string name, bool isStarted)
        {
            this.name = name;
            if (started = isStarted)
            {
                rpm = 1000;
            }
            else
            {
                rpm = 0;
            }
            gear = 0;
        }

        public void SetRPM(int rpm)
        {
            if (!started) throw new Exception("The motor is disabled so you can't change the Rounds Per Minute");
            if (rpm > 8000) rpm = 8000;
            if (rpm < 1000) started = false;
            this.rpm = rpm;
        }

        public int GetRPM() { return rpm; }

        public string Name
        {
            get 
            {
                return name;
            }
            set
            {
                name = value;
            }
        }

        public void Start()
        {
            if (!started)
            {
                started = true;
                rpm = 1000;
                gear = 0;
            }
        }
        public void Stop()
        {
            started = false;
            rpm = 0;
            gear = 0;
        }

        public int GetSpeed()
        {
            return rpm * gear / 200;
        }

        public void ShiftGearsUp()
        {
            if (started && gear < 5) gear++;
            else if (!started) throw new Exception("The motor is disabled");
        }

        public void ShiftGearsDown(int g)
        {
            if (started && g > 0 && g < gear) gear -= g;
            else if (!started) throw new Exception("The motor is disabled");
        }

        public int GetGear()
        {
            return gear;
        }

        public override string ToString()
        {
            string mtrTxt;
            if (started) mtrTxt = "Motor is on";
            else mtrTxt = "Motor is off";

            return $"Name: \"{name}\" | Speed: {GetSpeed()} | Current Gear: {gear} | {mtrTxt} | RPM: {rpm}";
        }
    }
}
