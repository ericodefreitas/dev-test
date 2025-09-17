using MediatR;


namespace Application.Client.Commands.ImportClientsFromCsv
{
    public class ImportClientsFromCsvRequest : IRequest
    {
        public string FileName { get; set; }
        public byte[] CsvData { get; set; }
    }
}