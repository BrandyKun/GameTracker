using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;

[ApiController]
[Route("[controller]")]
public class IgdbController : ControllerBase
{
    private readonly IConfiguration _config;
    public IgdbController(IConfiguration config)
    {
        _config = config;
        
    }
}