// let x = 45

// [letTokn, identifierTk, EqualsToken, NumberToken]

export enum TokenType {
  Number,
  Identifier,
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,
  Let,
}
export interface Token {
  value: string;
  type: TokenType;
}

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
};

function token(value = "", type: TokenType): Token {
  return { value, type };
}

function isalpha(src: string) {
  return src.toUpperCase() !== src.toLowerCase();
}

function isInt(str: string) {
  const c = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];

  return c >= bounds[0] && c <= bounds[1];
}

export function tokenize(source: string): Token[] {
  const tokens = new Array<Token>();

  const src = source.split("");

  // build each token until end of file
  while (src.length > 0) {
    if (src[0] === "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    } else if (src[0] === ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    } else if (
      src[0] === "+" ||
      src[0] === "-" ||
      src[0] === "*" ||
      src[0] === "/"
    ) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    } else if (src[0] === "=") {
      tokens.push(token(src.shift(), TokenType.Equals));
    } else {
      // Handle multicharacter tokens

      // build number token
      if (isInt(src[0])) {
        let num = "";
        while (src.length > 0 && isInt(src[0])) {
          num += src.shift();
        }

        tokens.push(token(num, TokenType.Number));
      } else if (isalpha(src[0])) {
        let ident = "";
        while (src.length > 0 && isalpha(src[0])) {
          ident += src.shift();
        }

        tokens.push(token(ident, TokenType.Identifier));
      }
    }
  }
  return tokens;
}
