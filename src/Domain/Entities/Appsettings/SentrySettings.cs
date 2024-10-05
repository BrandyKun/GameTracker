namespace Gaming.Domain.Entities.Appsettings;

public class SentrySettings
{
    public string Dns { get; set; }
    public int MaxBreadCrumb { get; set; }
    public bool Debug { get; set; }
    public double TracesSampleRate { get; set; }
}
