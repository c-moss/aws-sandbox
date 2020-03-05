"use strict";

module.exports.hello = async event => {
  if (q = event.queryStringParameters.foo) {
    switch (q) {
      case "bar":
        return {
          statusCode: 200,
          body: "FOO!"
        };
      default:
        return {
          statusCode: 200,
          body: event.queryStringParameters.foo
        };
    }
  } else {

  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};