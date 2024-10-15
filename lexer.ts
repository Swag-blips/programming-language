enum TokenType {
  "Number",
  "Identifier",
  "Equals",
  "OpenParen",
  "CloseParen",
  "BinaryOperator",
  "Let",
}

export interface Token {
  value: string;
  type: TokenType;
}

const Dictionary: Record<string, TokenType> = {
  let: TokenType.Let,
};

function isAlpha(str: string) {
  return str.toUpperCase() !== str.toLowerCase();
}

function isNum(str: string) {
  const charAt = str.charCodeAt(0);

  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];

  return charAt >= bounds[0] && charAt <= bounds[1];
}

function isWhiteSpace(str: string) {
  return str === " " || str === "\n" || str === "\t";
}

function token(value = "", type: TokenType): Token {
  return { value, type };
}

function tokenize(sourcecode: string): Token[] {
  const tokens = new Array<Token>();
  const src = sourcecode.split("");

  while (src.length > 0) {
    if (src[0] === "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    } else if (src[0] === ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    } else if (
      src[0] === "+" ||
      src[0] === "-" ||
      src[0] === "/" ||
      src[0] === "*"
    ) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    } else if (src[0] === "=") {
      tokens.push(token(src.shift(), TokenType.Equals));
    } else {
      if (isNum(src[0])) {
        let num = "";

        while (src.length > 0 && isNum(src[0])) {
          num += src.shift();
        }

        tokens.push(token(num, TokenType.Number));
      } else if (isAlpha(src[0])) {
        let ident = "";

        while (src.length > 0 && isAlpha(src[0])) {
          ident += src.shift();
        }

        const reserved = Dictionary[ident];

        if (reserved === undefined) {
          tokens.push(token(ident, TokenType.Identifier));
        } else {
          tokens.push(token(ident, reserved));
        }
      } else if (isWhiteSpace(src[0])) {
        src.shift();
      } else {
        console.log("Unrecognized character found in source", src[0]);
        Deno.exit(1);
      }
    }
  }

  return tokens;
}

const sourceCode = await Deno.readTextFile("./test.txt");

for (const token of tokenize(sourceCode)) {
  console.log(token);
}
