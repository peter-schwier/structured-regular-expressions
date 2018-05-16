# Structured Regular Expressions Design Document

This design document provides specific implementation details of parsing a command string to produce a command list.

# Parser

* [Command] =
    * [Print]
    * [Insert]
    * [Append]
    * [Replace]
    * [Delete]
    * [Search]
    * [SearchBetween]
    * [Conditional]
    * [NegatedConditional]
    * [Modulus]
    * [PushSelections]
    * [PopSelections]
    * [NumberedSelections]
    * [Span]
    * [Forward]
    * [Backward]
    * [Dot]
    * [Character]
    * [Line]
    * [Regex]
* [Print] = "p"
* [Insert] = "i" text:DelimitedText
* [Append] = "a" text:DelimitedText
* [Replace] = "c" text:DelimitedText
* [Delete] = "d"
* [Search] = "x" regex:[DelimitedRegex]
* [SearchBetween] = "y" regex:[DelimitedRegex]
* [Conditional] = "g" regex:[DelimitedRegex]
* [NegatedConditional] = "v" regex:[DelimitedRegex]
* [Modulus] = "%" modulus:Number
* [PushSelections] = "{"
* [PopSelections] = "}"
* [NumberedSelections] = "@" included:NumberRangeList
* [Span] = start:[Address] "," end:[Address]
* [Forward] = start:[Address] "+" next:[ForwardOffsetAddress]
* [Backward] = start:[Address] "-" next:[BackwardOffsetAddress]
* [Dot] = "."
* [Character] = "#" offset:Number
* [Line] = offset:Number
* [Regex] = regex:[DelimitedRegex]
* [Address] =
    * [Forward]
    * [Backward]
    * [Dot]
    * [Character]
    * [Line]
    * [Regex]
* [ForwardOffsetAddress] =
    * [Character]
    * [Line]
    * [Regex]
* [BackwardOffsetAddress] =
    * [Character]
    * [Line]
    * [Regex]
* DelimitedText = ???
* Number = value:["0" - "9"]+
* NumberRangeList = value:NumberRange (";" value:NumberRange)*
* [Range] = start:Number ("-" end:Number) / {end = start;}

## DelimitedRegex
```
RegularExpressionLiteral "regular expression"
  = "/" body:RegularExpressionBody "/" {
      return body;
    }

RegularExpressionBody
  = char_:RegularExpressionFirstChar chars:RegularExpressionChars {
      return char_ + chars;
    }

RegularExpressionChars
  = chars:RegularExpressionChar* { return chars.join(""); }

RegularExpressionFirstChar
  = ![*\\/[] char_:RegularExpressionNonTerminator { return char_; }
  / RegularExpressionBackslashSequence
  / RegularExpressionClass

RegularExpressionChar
  = ![\\/[] char_:RegularExpressionNonTerminator { return char_; }
  / RegularExpressionBackslashSequence
  / RegularExpressionClass

/*
 * This rule contains an error in the specification: "NonTerminator" instead of
 * "RegularExpressionNonTerminator".
 */
RegularExpressionBackslashSequence
  = "\\" char_:RegularExpressionNonTerminator { return "\\" + char_; }

RegularExpressionNonTerminator
  = !LineTerminator char_:SourceCharacter { return char_; }

RegularExpressionClass
  = "[" chars:RegularExpressionClassChars "]" { return "[" + chars + "]"; }

RegularExpressionClassChars
  = chars:RegularExpressionClassChar* { return chars.join(""); }

RegularExpressionClassChar
  = ![\]\\] char_:RegularExpressionNonTerminator { return char_; }
  / RegularExpressionBackslashSequence

LineTerminator
  = [\n\r\u2028\u2029]

SourceCharacter
  = .
```

## DelimitedText
```
TextLiteral
  = "/" body:TextBody "/" {
      return body;
    }

TextBody
  = chars:TextChar* { return chars.join(""); }

TextChar
  = ![\\/] char_:TextNonTerminator { return char_; }
  / TextBackslashSequence

/*
 * This rule contains an error in the specification: "NonTerminator" instead of
 * "TextNonTerminator".
 */
TextBackslashSequence
  = "\\" char_:TextNonTerminator { return backslashEscapes(char_); }

TextNonTerminator
  = !LineTerminator char_:SourceCharacter { return char_; }

LineTerminator
  = [\n\r\u2028\u2029]

SourceCharacter
  = .
```
* backslashEscapes
  * "\\" = "\\"
  * "/" = "/"
  * "n" = Line Feed
  * "r" = Carriage Return
  * "t" = Tab
  * Otherwise return character

[Range]: PUBLIC.md#range-class
[Command]: APPLY.md#command-interface
[Print]: APPLY.md#print-class
[Insert]: APPLY.md#insert-class
[Append]: APPLY.md#append-class
[Replace]: APPLY.md#replace-class
[Delete]: APPLY.md#delete-class
[Search]: APPLY.md#search-class
[SearchBetween]: APPLY.md#searchbetween-class
[Conditional]: APPLY.md#conditional-class
[NegatedConditional]: APPLY.md#negatedconditional-class
[Modulus]: APPLY.md#modulus-class
[NumberedSelections]: APPLY.md#numberedselections-class
[Match]: APPLY.md#match-interface
[Span]: APPLY.md#span-class
[Address]: APPLY.md#address-interface
[Forward]: APPLY.md#forward-class
[ForwardOffsetAddress]: APPLY.md#forwardoffsetaddress-interface
[Backward]: APPLY.md#backward-class
[BackwardOffsetAddress]: APPLY.md#backwardoffsetaddress-interface
[Dot]: APPLY.md#dot-class
[Character]: APPLY.md#character-class
[Line]: APPLY.md#line-class
[Regex]: APPLY.md#regex-class
[DelimitedRegex]: #delimitedregex