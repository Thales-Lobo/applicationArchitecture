// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");
using Newtonsoft.Json;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System.Diagnostics;

//General paths definition
string originalDirectory = @"./originalImages";
string resizedDirectory = @"./resizedImages";
Directory.CreateDirectory(resizedDirectory);

//General variables definition
int resizeFactor = 3;
string[] files = Directory.GetFiles(originalDirectory);

//Sequential manipulation of multiple images
Stopwatch sequentialStopwatch = Stopwatch.StartNew();

foreach(string currentFile in files)
{
    Image sequentialOriginalImage = Image.Load(currentFile);
    Image sequentialResizedImage = sequentialOriginalImage.Clone(img => img.Resize(sequentialOriginalImage.Width/resizeFactor, sequentialOriginalImage.Height/resizeFactor));

    sequentialResizedImage.Save($"{resizedDirectory}/sequential_resized_{Path.GetFileName(currentFile)}");
};
sequentialStopwatch.Stop();

//Parallel manipulation of multiple images
Stopwatch parallelStopwatch = Stopwatch.StartNew();

Parallel.ForEach(files, (currentFile) =>
{
    Image parallelOriginalImage = Image.Load(currentFile);
    Image parallelResizedImage = parallelOriginalImage.Clone(img => img.Resize(parallelOriginalImage.Width/resizeFactor, parallelOriginalImage.Height/resizeFactor));

    parallelResizedImage.Save($"{resizedDirectory}/parallel_resized_{Path.GetFileName(currentFile)}");
});
parallelStopwatch.Stop();

//Display results
Console.WriteLine($"Durée totale du traitement sequential: {sequentialStopwatch.ElapsedMilliseconds} ms"); 
Console.WriteLine($"Durée totale du traitement parallel: {parallelStopwatch.ElapsedMilliseconds} ms"); 
Console.WriteLine($"\nL'accélération du processus était de {((float)sequentialStopwatch.ElapsedMilliseconds/(float)parallelStopwatch.ElapsedMilliseconds):N2}x, correspondant à un gain de {sequentialStopwatch.ElapsedMilliseconds-parallelStopwatch.ElapsedMilliseconds} ms !"); 

/*
Personne p = new Personne();
p.nom = "Thales Lobo";
p.age = 22;

string output = JsonConvert.SerializeObject(p, Formatting.Indented);
//Console.WriteLine(p.Hello(true));
Console.WriteLine(output);

public class Personne {
    public string nom { get; set; }
    public int age { get; set; }


    public string Hello(bool isLowercase) {
        string msg = $"Hello {nom}, you are {age}";
        if(isLowercase) {
            return msg.ToLower();
        }
        else {
            return msg.ToUpper();
        }
    }
}
*/ 
