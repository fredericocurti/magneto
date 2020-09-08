using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace Magneto
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                MessageBox.Show("Please open Magneto from the Chrome Extension");
                return;
            }

            Process p = new Process();
            p.StartInfo.UseShellExecute = false;
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.CreateNoWindow = true;
            p.StartInfo.FileName = "Magnetojs.exe";
            p.StartInfo.Arguments = args[0];
            p.Start();
            p.WaitForExit();
        }
    }
}
