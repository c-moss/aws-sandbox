import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";

export default class DefaultHandler {
  private static getSource(): string {
    let s =
      ";\n    return (\n      'import {\\n  APIGatewayProxyEvent,\\n  APIGatewayProxyResult,\\n  Context\\n} from \"aws-lambda\";\\n\\nexport default class DefaultHandler {\\n  private static getSource(): string {\\n    let s =\\n      ' +\n      JSON.stringify(s) +\n      s\n    );\n  }\n\n  public static async getResponse(\n    event: APIGatewayProxyEvent,\n    context: Context\n  ): Promise<APIGatewayProxyResult> {\n    let q = event.queryStringParameters?.q;\n    if (q) {\n      switch (true) {\n        case /PING/.test(q):\n          return this.generateResponse(\"PONG\");\n        case /What is your name?/.test(q):\n          return this.generateResponse(\"Campbell Moss\");\n        case /What is your quest?/.test(q):\n          return this.generateResponse(\"coding\");\n        case /.*= \\?/.test(q):\n          return this.generateResponse(this.answerSum(q));\n        case /^[ a-zA-Z]*$/.test(q):\n          return this.generateResponse(this.answerWords(q));\n        case /^<[ 0-9]*>$/.test(q):\n          return this.generateResponse(this.answerNumbers(q));\n        case /ABCD/.test(q):\n          return this.generateResponse(this.answerSorting(q));\n        case /Source code for this exercise?/.test(q):\n          return this.generateResponse(this.getSource());\n        default:\n          return this.generateResponse(`Unknown 'q' param supplied: ${q}`, 400);\n      }\n    } else {\n      return this.generateResponse(\"No 'q' param supplied\", 400);\n    }\n  }\n\n  private static answerSum(input: string): string | undefined {\n    let numbers = input.match(/[0-9]+/g)?.map((s: string) => {\n      return +s;\n    });\n    return numbers\n      ?.reduce((prev: number, curr: number) => {\n        return prev + curr;\n      })\n      .toString();\n  }\n\n  private static answerWords(input: string): string | undefined {\n    let words = input.match(/\\b\\w+\\b/g)?.length;\n    let consonants = input.toLowerCase().match(/[^aeiou\\s]/g)?.length;\n    let vowels = input.toLowerCase().match(/[aeiou]/g)?.length;\n\n    return `${words}-${consonants}-${vowels}`;\n  }\n\n  private static answerNumbers(input: string): string | undefined {\n    let numbers = input\n      .match(/[0-9]+/g)\n      ?.map((s: string) => {\n        return +s;\n      })\n      .sort((first: number, second: number) => {\n        return first - second;\n      });\n    let evens: number[] = [];\n    let odds: number[] = [];\n    numbers?.forEach((value: number) => {\n      if (value % 2 == 0) {\n        evens.unshift(value);\n      } else {\n        odds.push(value);\n      }\n    });\n\n    return odds\n      .map((value: number, index: number) => {\n        return (value + evens[index]).toString();\n      })\n      .join(\" \");\n  }\n\n  private static answerSorting(input: string): string | undefined {\n    let lines = input.split(\"\\n\");\n    let cols = lines[0];\n    let pairs: string[] = [];\n    lines.forEach(value => {\n      let row = value[0];\n      let beforePos = value.indexOf(\"<\");\n      let afterPos = value.indexOf(\">\");\n      if (beforePos >= 0) {\n        pairs.push(`${row}${cols[beforePos]}`);\n      }\n      if (afterPos >= 0) {\n        pairs.push(`${cols[afterPos]}${row}`);\n      }\n    });\n\n    var result = pairs.pop()!;\n    var safetyCounter = 0;\n    while (result.length < cols.length - 1 && ++safetyCounter < 10) {\n      let prefix = pairs.find(pair => pair[1] == result[0]);\n      let suffix = pairs.find(pair => pair[0] == result[result.length - 1]);\n      if (prefix) {\n        result = prefix[0] + result;\n      }\n      if (suffix) {\n        result = result + suffix[1];\n      }\n    }\n    return result;\n  }\n\n  private static generateResponse(\n    body: string | undefined,\n    statusCode: number = 200\n  ): APIGatewayProxyResult {\n    return body\n      ? {\n        statusCode: statusCode,\n        headers: {},\n        body: body\n      }\n      : {\n        statusCode: 400,\n        headers: {},\n        body: \"Invalid input\"\n      };\n  }\n}\n";
    return (
      'import {\n  APIGatewayProxyEvent,\n  APIGatewayProxyResult,\n  Context\n} from "aws-lambda";\n\nexport default class DefaultHandler {\n  private static getSource(): string {\n    let s =\n      ' +
      JSON.stringify(s) +
      s
    );
  }

  public static async getResponse(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    let q = event.queryStringParameters?.q;
    if (q) {
      switch (true) {
        case /PING/.test(q):
          return this.generateResponse("PONG");
        case /What is your name?/.test(q):
          return this.generateResponse("Campbell Moss");
        case /What is your quest?/.test(q):
          return this.generateResponse("coding");
        case /.*= \?/.test(q):
          return this.generateResponse(this.answerSum(q));
        case /^[ a-zA-Z]*$/.test(q):
          return this.generateResponse(this.answerWords(q));
        case /^<[ 0-9]*>$/.test(q):
          return this.generateResponse(this.answerNumbers(q));
        case /ABCD/.test(q):
          return this.generateResponse(this.answerSorting(q));
        case /Source code for this exercise?/.test(q):
          return this.generateResponse(this.getSource());
        default:
          return this.generateResponse(`Unknown 'q' param supplied: ${q}`, 400);
      }
    } else {
      return this.generateResponse("No 'q' param supplied", 400);
    }
  }

  private static answerSum(input: string): string | undefined {
    let numbers = input.match(/[0-9]+/g)?.map((s: string) => {
      return +s;
    });
    return numbers
      ?.reduce((prev: number, curr: number) => {
        return prev + curr;
      })
      .toString();
  }

  private static answerWords(input: string): string | undefined {
    let words = input.match(/\b\w+\b/g)?.length;
    let consonants = input.toLowerCase().match(/[^aeiou\s]/g)?.length;
    let vowels = input.toLowerCase().match(/[aeiou]/g)?.length;

    return `${words}-${consonants}-${vowels}`;
  }

  private static answerNumbers(input: string): string | undefined {
    let numbers = input
      .match(/[0-9]+/g)
      ?.map((s: string) => {
        return +s;
      })
      .sort((first: number, second: number) => {
        return first - second;
      });
    let evens: number[] = [];
    let odds: number[] = [];
    numbers?.forEach((value: number) => {
      if (value % 2 == 0) {
        evens.unshift(value);
      } else {
        odds.push(value);
      }
    });

    return odds
      .map((value: number, index: number) => {
        return (value + evens[index]).toString();
      })
      .join(" ");
  }

  private static answerSorting(input: string): string | undefined {
    let lines = input.split("\n");
    let cols = lines[0];
    let pairs: string[] = [];
    lines.forEach(value => {
      let row = value[0];
      let beforePos = value.indexOf("<");
      let afterPos = value.indexOf(">");
      if (beforePos >= 0) {
        pairs.push(`${row}${cols[beforePos]}`);
      }
      if (afterPos >= 0) {
        pairs.push(`${cols[afterPos]}${row}`);
      }
    });

    var result = pairs.pop()!;
    var safetyCounter = 0;
    while (result.length < cols.length - 1 && ++safetyCounter < 10) {
      let prefix = pairs.find(pair => pair[1] == result[0]);
      let suffix = pairs.find(pair => pair[0] == result[result.length - 1]);
      if (prefix) {
        result = prefix[0] + result;
      }
      if (suffix) {
        result = result + suffix[1];
      }
    }
    return result;
  }

  private static generateResponse(
    body: string | undefined,
    statusCode: number = 200
  ): APIGatewayProxyResult {
    return body
      ? {
        statusCode: statusCode,
        headers: {},
        body: body
      }
      : {
        statusCode: 400,
        headers: {},
        body: "Invalid input"
      };
  }
}