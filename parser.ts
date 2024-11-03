import {
  Stmt,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
} from "./ast.ts";
import { tokenize, Token, TokenType } from "./lexer.ts";

// parser takes in tokens from the tokenizer
export default class Parser {
  private tokens: Token[] = [];

  private not_eof(): boolean {
    return this.tokens[0].type !== TokenType.EOF;
  }

  private at() {
    return this.tokens[0] as Token;
  }

  private next() {
    const prev = this.tokens.shift() as Token;
    return prev;
  }

  public produceAST(sourcecode: string): Program {
    this.tokens = tokenize(sourcecode);
    const program: Program = {
      kind: "Program",
      body: [],
    };

    // parse until end of file
    while (this.not_eof()) {
      program.body.push(this.parse_stmt());
    }
    return program;
  }

  private parse_stmt(): Stmt {
    // skip to parse expr

    return this.parse_expr();
  }

  private parse_expr(): Expr {
    return this.parse_primary_expr();
  }

  

  private parse_primary_expr(): Expr {
    const tk = this.at().type;

    switch (tk) {
      case TokenType.Identifier:
        return { kind: "Identifier", symbol: this.next().value } as Identifier;
      case TokenType.Number:
        return {
          kind: "NumericLiteral",
          value: parseFloat(this.next().value),
        } as NumericLiteral;
      default:
        console.error("Unexpected token found during parsing", this.at());
        Deno.exit(1);
    }
  }
}
