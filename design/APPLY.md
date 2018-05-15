# Structured Regular Expressions Design Document

This design document provides specific implementation details of applying text commands to a document and returning a new document.

# API

* [Document]
    * [Match]
* [Command]
* Modifications
    * [Print] implements [Command]
    * [Insert] implements [Command]
    * [Append] implements [Command]
    * [Replace] implements [Command]
    * [Delete] implements [Command]
* Loops and Conditionals
    * [Search] implements [Command]
    * [SearchBetween] implements [Command]
    * [Conditional] implements [Command]
    * [NegatedConditional] implements [Command]
    * [Modulus] implements [Command]
    * [NumberedSelections] implements [Command]
* Selectors
    * [Span] implements [Command]
        * [Address]
    * [Forward] implements [Command], [Address]
        * [ForwardOffsetAddress]
    * [Backward] implements [Command], [Address]
        * [BackwardOffsetAddress]
    * [Dot] implements [Address]
    * [Character] implements [Command], [Address], [ForwardOffsetAddress], [BackwardOffsetAddress]



## Document Class

The Document class contains the document text, current selections, and the current set of pending changes. This class is read only to make debugging and reproducing issues easier.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| text          | string    | The text of the document |
| selections    | [Range] []   | The set of non-overlapping selections in the doucment |
| changes       | [Changed] []   | The set of modifications the text commands would introduce to the document |

The document constructor throws an Error if there are any overlapping or duplicated selections.

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| text          | string    | The text of the document |
| selections    | [Range] []   | The set of non-overlapping selections in the doucment |
| changes       | [Changed] []   | The set of modifications the text commands would introduce to the document |

### Methods

#### apply(commands: [Command] []): [Document]

Apply each command to the document and pass the new document to the next command.

```javascript
let document: Document = this;
commands.forEach((command) => {
    document = command.apply(document);
});
return document;
```

#### getSelectionText(selection: [Range]): string

Pull the text from the selection.

```javascript
return this.text.substring(selection.start, selection.end);
```

#### findMatch(regex: string, selection: [Range]): [Match] | undefined

Search for the first match of this regex in the selection in the document and either return a [Match] or undefined if there is no next match. If regex is all lower case then the match is case insensitive.

## Match Interface

The Match interface provides information about a search and a match in a [Document]. This interface extends the [Range] interface.

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| start | number | The starting character offset |
| end | number | The ending character offset |
| values | any[] | The values from the regex captures |

### Methods

#### next(): [Match] | undefined

Search for the next match of this regex in the document and either return a [Match] or undefined if there is no next match.


## Command Interface

The Command interface provides a method to transform a document into a new document based on the class that implements the interface.

### Methods

#### apply(document: [Document]): [Document]

Apply this command to the document and return the new document.

## Print Class

The Print class adds the [Printed] change to the document for each selection in the document. This class implements the [Command] Interface.

### Methods

#### apply(document: [Document]): [Document]

Add a Printed change to the document for each selection in the document.

```javascript
return new Document(
    document.text, 
    document.selections, 
    document.changes.concat(
        document.selections.map(
            (selection) =>
                new Printed(document.getSelectionText(selection))
        )
    )
);
```

## Insert Class

The Insert class adds the [Inserted] change to the document for each selection in the document. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string    | The text to insert |

### Methods

#### apply(document: [Document]): [Document]

Add a [Inserted] change to the document for each selection in the document.

```javascript
return new Document(
    document.text, 
    document.selections, 
    document.changes.concat(
        document.selections.map(
            (selection) =>
                new Inserted(selection.start, this.text)
        )
    )
);
```

## Append Class

The Append class adds the [Inserted] change to the document for each selection in the document. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string  | The text to append |

### Methods

#### apply(document: [Document]): [Document]

Add a [Inserted] change to the document for each selection in the document.

```javascript
return new Document(
    document.text, 
    document.selections, 
    document.changes.concat(
        document.selections.map(
            (selection) =>
                new Inserted(selection.end, this.text)
        )
    )
);
```

## Replace Class

The Replace class adds the [Replaced] change to the document for each selection in the document. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string  | The replacement text |

### Methods

#### apply(document: [Document]): [Document]

Add a [Replaced] change to the document for each selection in the document.

```javascript
return new Document(
    document.text, 
    document.selections, 
    document.changes.concat(
        document.selections.map(
            (selection) =>
                new Replaced(selection, this.text)
        )
    )
);
```

## Delete Class

The Delete class adds the [Deleted] change to the document for each selection in the document. This class implements the [Command] Interface.

### Methods

#### apply(document: [Document]): [Document]

Add a [Deleted] change to the document for each selection in the document.

```javascript
return new Document(
    document.text, 
    document.selections, 
    document.changes.concat(
        document.selections.map(
            (selection) =>
                new Deleted(selection)
        )
    )
);
```

## Search Class

The Search class modifies the document selections. For each selection in the document it finds the matches of the regex in that selection and each match becomes a selection for the returned document. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| regex | string | The regex string |

If the regex string is all lower case then the regular expression match is case insensitive.

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document with the matches of the regex inside each existing selection.

```javascript
let selections: Range[] = [];

document.selections.forEach((selection) => {
    let match = document.findMatch(this.regex, selection);
    while(match !== undefined) {
        selections.push(match.range);
        match = match.next();
    }
});
return new Document(
    document.text, 
    selections, 
    document.changes
);
```

## SearchBetween Class

The SearchBetween class modifies the document selections. For each selection in the document it finds the matches of the regex in that selection and the space between each match becomes a selection for the returned document. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| regex | string | The regex string |

If the regex string is all lower case then the regular expression match is case insensitive.

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document with the space between the matches of the regex inside each existing selection.

```javascript
let selections: Range[] = [];

document.selections.forEach((selection) => {
    let start = selection.start;
    let match = document.findMatch(this.regex, selection);
    while(match !== undefined) {
        selections.push(new Range(start, match.start));
        start = match.end;
        match = match.next();
    }
    selections.push(new Range(start, selection.end));
});
return new Document(
    document.text, 
    selections, 
    document.changes
);
```

## Conditional Class

The Conditional class modifies the document selections. For each selection in the document it checks if the regex exists in that selection. If the regex does not exist then it removes the selection from the document. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| regex | string | The regex string |

If the regex string is all lower case then the regular expression match is case insensitive.

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document with the selections that have a match of the regex.

```javascript
let selections: Range[] = [];

document.selections.forEach((selection) => {
    let match = document.findMatch(this.regex, selection);
    if (match !== undefined) {
        selections.push(selection);
    }
});
return new Document(
    document.text, 
    selections, 
    document.changes
);
```

## NegatedConditional Class

The NegatedConditional class modifies the document selections. For each selection in the document it checks if the regex exists in that selection. If the regex does exist then it removes the selection from the document. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| regex | string | The regex string |

If the regex string is all lower case then the regular expression match is case insensitive.

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document with the selections that do not have a match of the regex.

```javascript
let selections: Range[] = [];

document.selections.forEach((selection) => {
    let match = document.findMatch(this.regex, selection);
    if (match === undefined) {
        selections.push(selection);
    }
});
return new Document(
    document.text, 
    selections, 
    document.changes
);
```

## Modulus Class

The Modulus class modifies the document selections. Include each n*th* selection from the document. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| modulus | number | The n*th* selections to include |

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document with the n*th* selections from the document.

```javascript
let selections: Range[] = [];

document.selections.forEach((selection, index) => {
    if ((index % this.modulus) === 0) {
        selections.push(selection);
    }
});
return new Document(
    document.text, 
    selections, 
    document.changes
);
```

## NumberedSelections Class

The NumberedSelections class modifies the document selections. Include only the selections specified in the list. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| included | [Range] [] | The list of selection ranges to include. In this case the Range.start and Range.end are selections not character offsets |

The constructor throws an Error if any range includes a Range.start that is less than or equal to 0.

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document with the selections in the included list.

```javascript
let selections: Range[] = [];

document.selections.forEach((selection, index) => {
    index += 1;
    let include = false;
    this.included.forEach((range) => {
        if (range.start <= index && index <= range.end) {
            include = true;
        }
    });
    if (include) {
        selections.push(selection);
    }
});
return new Document(
    document.text, 
    selections, 
    document.changes
);
```

## Span Class

The Span class modifies the document selections. If the start and end are both global then the result is one selection. Otherwise, there is one selection per selection in the original document. This class implements the [Command] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| start | [Address] | The starting address of the span |
| end | [Address] | The ending address of the span |

The constructor throws an Error if `start.global !== end.global`.

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document with the selections from `start` and `end`.

```javascript
if (start.global) { 
    return new Document(
        document.text, 
        [new Range(
            start.getRange(document).start, 
            end.getRange(document).end)], 
        document.changes
    );
} else {
    let selections: Range[] = [];

    document.selections.forEach((selection) => {
        selections.push(new Range(
            start.getRange(document, selection).start, 
            end.getRange(document, selection).end
        ));
    });

    return new Document(
        document.text, 
        selections, 
        document.changes
    );
}
```

## Address Interface

The Address interface provides for a character offset either within the scope of an existing selection in a document or in the entire document.

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| global | boolean | Is the address global within the document or relative to a selection |

### Methods

#### getRange(document: [Document], selection?: [Range]): [Range]

Return the [Range] based on the selection, if defined, or based on the document.


## Forward Class

The Forward class modifies the document selections. If the start is global then the result is one selection. Otherwise, there is one selection per selection in the original document. This class implements the [Command] Interface and the [Address] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| start | [Address] | The starting address |
| next | [ForwardOffsetAddress] | The address forward from the end of `start` |

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| global | boolean | returns `start.global` |

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document with the selections from `start` offset forward by `next`.

```javascript
if (start.global) {
    let range = this.getRange(document);
    return new Document(
        document.text, 
        [range], 
        document.changes
    );
} else {
    let selections: Range[] = 
        document.selections.map((selection) =>
            this.getRange(document, selection));

    return new Document(
        document.text, 
        selections, 
        document.changes
    );
}
```

#### getRange(document: [Document], selection?: [Range]): [Range]

Return the [Range] based on the selection, if defined, or based on the document.

```javascript
let range = start.getRange(document, selection);
range = next.getRangeForward(document, range);
return range;
```

## ForwardOffsetAddress Interface

The ForwardOffsetAddress interface provides for a character offset starting from a selection in a document.

### Methods

#### getRangeForward(document: [Document], selection: [Range]): [Range]

Return the [Range] based on the selection.


## Backward Class

The Backward class modifies the document selections. If the start is global then the result is one selection. Otherwise, there is one selection per selection in the original document. This class implements the [Command] Interface and the [Address] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| start | [Address] | The starting address |
| next | [BackwardOffsetAddress] | The address backward from the start of `start` |

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| global | boolean | returns `start.global` |

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document with the selections from `start` offset backward by `next`.

```javascript
if (start.global) {
    let range = this.getRange(document);
    return new Document(
        document.text, 
        [range], 
        document.changes
    );
} else {
    let selections: Range[] = 
        document.selections.map((selection) =>
            this.getRange(document, selection));

    return new Document(
        document.text, 
        selections, 
        document.changes
    );
}
```

#### getRange(document: [Document], selection?: [Range]): [Range]

Return the [Range] based on the selection, if defined, or based on the document.

```javascript
let range = start.getRange(document, selection);
range = next.getRangeBackward(document, range);
return range;
```

## BackwardOffsetAddress Interface

The ForwardOffsetAddress interface provides for a character offset starting from a selection in a document.

### Methods

#### getRangeBackward(document: [Document], selection: [Range]): [Range]

Return the [Range] based on the selection.



## Dot Class

The Dot class returns the current selection. This class implements the [Address] Interface.

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| global | boolean | returns `false` |

### Methods

#### getRange(document: [Document], selection?: [Range]): [Range]

Return the [Range] based on the document.

```javascript
return selection;
```


## Character Class

The Character class modifies the document selection. The result is one selection. This class implements the [Command] Interface and the [Address] Interface.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| offset | number | The number of characters |

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| global | boolean | returns `true` |

### Methods

#### apply(document: [Document]): [Document]

Replace the selections in the document.

```javascript
let range = this.getRange(document);
return new Document(
    document.text, 
    [range], 
    document.changes
);
```

#### getRange(document: [Document], selection?: [Range]): [Range]

Return the [Range] based on the document.

```javascript
let range = this.getRangeForward(document, new Range(0, 0));
return range;
```

#### getRangeForward(document: [Document], selection: [Range]): [Range]

Return the [Range] based on the selection.

```javascript
let offset = selection.end + this.offset;
let range = new Range(offset, offset);
return range;
```

#### getRangeBackward(document: [Document], selection: [Range]): [Range]

Return the [Range] based on the selection.

```javascript
let offset = selection.start - this.offset;
let range = new Range(offset, offset);
return range;
```



[Document]: #document-class
[Range]: PUBLIC.md#range-class
[Changed]: PUBLIC.md#changed-interface
[Printed]: PUBLIC.md#printed-class
[Inserted]: PUBLIC.md#inserted-class
[Replaced]: PUBLIC.md#replaced-class
[Deleted]: PUBLIC.md#deleted-class
[Command]: #command-interface
[Print]: #print-class
[Insert]: #insert-class
[Append]: #append-class
[Replace]: #replace-class
[Delete]: #delete-class
[Search]: #search-class
[SearchBetween]: #searchbetween-class
[Conditional]: #conditional-class
[NegatedConditional]: #negatedconditional-class
[Modulus]: #modulus-class
[NumberedSelections]: #numberedselections-class
[Match]: #match-interface
[Span]: #span-class
[Address]: #address-interface
[Forward]: #forward-class
[ForwardOffsetAddress]: #forwardoffsetaddress-interface
[Backward]: #backward-class
[BackwardOffsetAddress]: #backwardoffsetaddress-interface
[Dot]: #dot-class
[Character]: #character-class