export enum statusConstants {
  ERROR = "Error",
  FAIL = "Fail",
  SUCCESS = "Success",
}

export const statusCodeMessages: { [key: number]: string } = {
  200: "Ok",
  201: "Created",
  202: "Accepted",
  204: "NoContent",
  206: "PartialContent",
  300: "MultipleChoices",
  301: "MovedPermanently",
  302: "Found",
  400: "BadRequest",
  401: "Unauthorized",
  402: "PaymentRequired",
  403: "Forbidden",
  404: "NotFound",
  405: "MethodNotAllowed",
  408: "RequestTimeout",
  409: "Conflict",
  410: "Gone",
  422: "UnprocessableEntity",
  429: "TooManyRequests",
  500: "InternalServerError",
  501: "NotImplemented",
  502: "BadGateway",
  503: "ServiceUnavailable",
  504: "GatewayTimeout",
};


