using Application.Client.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Client.Commands.CreateClient
{
    public class CreateClientCommandRequest : ClientModel, IRequest<Guid>
    {
    }
}
