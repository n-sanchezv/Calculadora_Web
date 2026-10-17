using Calculadora_Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics;

namespace Calculadora_Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        
        public IActionResult EjecutarCalculadora()
        {
            return View();
        }
    


// Este es el método que recibe la operación al presionar "Enter" o "="
[HttpPost]
public IActionResult Calcular(string expresion)
{
    try
    {
        if (!string.IsNullOrWhiteSpace(expresion))
        {
            string operacionLimpia = expresion.Trim();

            var resultado = new DataTable().Compute(operacionLimpia, null);
            string resultadoFinal = resultado.ToString();

            if (resultadoFinal.Contains("Infinity") || resultadoFinal.Contains("Infinito") || resultadoFinal == "NaN")
            {
                ViewBag.Resultado = "No se puede dividir entre cero";
            }
            else
            {
                ViewBag.Resultado = resultadoFinal;
            }
        }
    }
    catch
    {
        ViewBag.Resultado = "Error";
    }

    return View("EjecutarCalculadora");
}

public IActionResult Privacy()
{
    return View();
}

[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
public IActionResult Error()
{
    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
}
    }
}

