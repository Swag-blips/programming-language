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

function token(value = "", type: TokenType): Token {
  return { value, type };
}

function isalpha(src: string) {
  return src.toUpperCase() !== src.toLowerCase();
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
    }
  }
  return tokens;
}
