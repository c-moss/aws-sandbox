import { APIGatewayProxyEvent, Context } from "aws-lambda";
import DefaultHandler from "./api/DefaultHandler";

export const getResponse = (event: APIGatewayProxyEvent, context: Context) =>
  DefaultHandler.getResponse(event, context);
