Commands
    = commands:Command* { return commands; }

Command
    = Print
    / Insert
    / Append
    / Replace
    / Delete

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