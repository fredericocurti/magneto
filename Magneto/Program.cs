using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows;

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
            string url = args[0].Replace("magneto://magnet:/?", "magnet:?");
            string strCmdText = "/C peerflix " + '"' + url + '"' + " --vlc -q --connection 200";
            System.Diagnostics.Process.Start("CMD.exe", strCmdText);
        }
    }
}