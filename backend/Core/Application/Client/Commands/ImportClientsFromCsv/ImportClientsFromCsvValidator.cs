using FluentValidation;

namespace Application.Client.Commands.ImportClientsFromCsv
{
    public class ImportClientsFromCsvRequestValidator : AbstractValidator<ImportClientsFromCsvRequest>
    {
        public ImportClientsFromCsvRequestValidator()
        {
            RuleFor(x => x.CsvData)
                .NotNull()
                .NotEmpty()
                .WithMessage("CSV data is required.");
            RuleFor(x => x.FileName)
                .NotEmpty()
                .Must(f => f.EndsWith(".csv"))
                .WithMessage("File must be a CSV.");
        }
    }
}
