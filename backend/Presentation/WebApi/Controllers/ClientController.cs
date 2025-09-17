using Application.Client.Commands.CreateClient;
using Application.Client.Commands.ImportClientsFromCsv;
using Application.Client.Commands.UpdateClient;
using Application.Client.Queries.AllClientsQuery;
using Application.Client.Queries.ClientByDocumentNumberQuery;
using Application.Client.Queries.ClientByIdQuery;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ClientController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ClientController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] CreateClientCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] UpdateClientCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<AllClientsQueryResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> ListAll()
        {
            var response = await _mediator.Send(new AllClientsQueryRequest());
            return Ok(response);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ClientByIdQueryResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var response = await _mediator.Send(new ClientByIdQueryRequest { Id = id });

            return Ok(response);
        }

        [HttpGet("clients")]
        [ProducesResponseType(typeof(ClientByDocumentNumberQueryResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByDocumentNumber([FromQuery(Name = "document")] string documentNumber)
        {
            var response = await _mediator.Send(new ClientByDocumentNumberQueryRequest { DocumentNumber = documentNumber });
            return Ok(response);
        }

        [HttpPost("import-csv")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public async Task<IActionResult> ImportClientsFromCsv([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("CSV file is required.");

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);

            var command = new ImportClientsFromCsvRequest
            {
                FileName = file.FileName,
                CsvData = memoryStream.ToArray()
            };

            await _mediator.Send(command);
            return Accepted("File uploaded and import will be processed in background.");
        }
    }
}
