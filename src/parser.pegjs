Commands
    = commands:Command* { return commands; }

Command
    = Print
    / Insert
    / Append
    / Replace
    / Delete
    / Search
    / SearchBetween
    / Conditional
    / NegatedConditional
    / Modulus
    / PushSelections
    / PopSelections
    / NumberedSelections
    / Span
    / ForwardOrBackward
    / Character
    / Line
    / Regex

Address
    = SimpleAddress
    / ComplexAddress

SimpleAddress
    = Dot
    / Character
    / Line
    / Regex

ForwardOffsetAddress
    = Character
    / Line
    / Regex

BackwardOffsetAddress
    = Character
    / Line
    / Regex

ComplexAddress
    = ForwardOrBackward
    / SimpleAddress

ForwardOrBackward
    = start:SimpleAddress 
    offsets:(ForwardOffset / BackwardOffset)+ {
        offsets.forEach((offset) => {
            start = offset(start);
        });
        return start;
    }


Print 
    = "p" { return new apply.Print(); }

Insert
    = "i" text:DelimitedText { return new apply.Insert(text); }

Append
    = "a" text:DelimitedText { return new apply.Append(text); }

Replace
    = "a" text:DelimitedText { return new apply.Replace(text); }

Delete
    = "d" { return new apply.Delete(); }

Search
    = "x" regex:DelimitedRegex? { return new apply.Search(regex || apply.Document.lineRegex); }

SearchBetween
    = "y" regex:DelimitedRegex { return new apply.SearchBetween(regex); }

Conditional
    = "g" regex:DelimitedRegex { return new apply.Conditional(regex); }

NegatedConditional
    = "v" regex:DelimitedRegex { return new apply.NegatedConditional(regex); }

Modulus
    = "%" modulus:Number { return new apply.Modulus(modulus); }

PushSelections
    = "{" { return new apply.PushSelections(); }

PopSelections
    = "}" { return new apply.PopSelections(); }

NumberedSelections
    = "@" included:NumberRangeList { return new apply.NumberedSelections(included); }

Span
    = start:ComplexAddress "," end:ComplexAddress { return new apply.Span(start, end); }

ForwardOffset
    = "+" next:ForwardOffsetAddress? { 
        return function(start) { 
            return new apply.Forward(start, next || new apply.Line(1)); 
        }; 
    }

BackwardOffset
    = "-" next:BackwardOffsetAddress { 
        return function(start) { 
            return new apply.Backward(start, next || new apply.Line(1)); 
        }; 
    }

Dot
    = "." { return new apply.Dot(); }

Character
    = "#" offset:Number { return new apply.Character(offset); }

Line
    = offset:Number { return new apply.Line(offset); }

Regex
    = regex:DelimitedRegex { return new apply.Regex(regex); }



NumberRangeList
    = value1:NumberRange (";" value2:NumberRange)+ {
        return [value1].concat(value2);
    } / value1:NumberRange {
        return [value1];
    }

NumberRange
    = start:Number "-" end:Number { return new apply.Range(start, end); }
    / start:Number { return new apply.Range(start, start); }

Number
    = value:[0-9]+ { return parseInt(value.join(""), 10); }



DelimitedRegex
    = RegularExpressionLiteral

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



DelimitedText
    = TextLiteral

TextLiteral
    = "/" body:TextBody "/" {
        return body;
    }

TextBody
    = chars:TextChar* { return chars.join(""); }

TextChar
    = ![\\/] char_:TextNonTerminator { return char_; }
    / TextBackslashSequence

TextBackslashSequence
    = "\\" char_:TextNonTerminator { return "\\" + char_; }

TextNonTerminator
    = !LineTerminator char_:SourceCharacter { return char_; }


LineTerminator
    = [\n\r\u2028\u2029]

SourceCharacter 
    = .