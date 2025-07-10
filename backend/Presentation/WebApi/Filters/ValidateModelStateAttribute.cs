using Application.Common.Models;
using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Filters
{
    public class ValidateModelStateAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                try
                {

                    var values = context.ModelState.Values.Where(v => v.Errors.Count > 0).ToList();

                    var errors = new List<ResponseErrorItem>();

                    foreach (var val in values)
                    {
                        var key = val.ToJson().FromJson<ResponseErrorItem>().Key;

                        foreach (var error in val.Errors)
                        {
                            errors.Add(new ResponseErrorItem
                            {
                                Key = key,
                                Value = error.ErrorMessage
                            });

                        }
                    }

                    var result = new ResponseError
                    {
                        Errors = errors
                    };

                    context.Result = new JsonResult(result)
                    {
                        StatusCode = 400
                    };
                }
                catch
                {
                    var result = new ResponseError
                    {
                        Message = "Ocorreu um erro interno."
                    };

                    context.Result = new JsonResult(result)
                    {
                        StatusCode = 400
                    };
                }
            }
        }
    }
}
