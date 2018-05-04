# Structured Regular Expressions Design Document

This design document provides an overview of the architecture of the Structured Regular Expressions library and specific implemenation details of individual functionality.

## Intent

The library will provide two sub-libraries and a common interface that uses both sub library. 
* The first sub-library will parse a command string into a list of text commands. 
* The second sub-library will take a document and apply a list of text commands to it. 
* The [common interface](COMMON.md) will take a document and apply a command string to it.

# Public API

* [Document Class](#document-class)
* [Range Class](#range-class)
* [Changed Interface](#changed-interface)
* [Printed Class](#printed-class)
* [Inserted Class](#inserted-class)
* [Replaced Class](#replaced-class)
* [Deleted Class](#deleted-class)

```javascript
let sre = require("structed-regular-expressions");
let original = new sre.Document("Hello World!");
let changed = original.apply("/ /c/ Cruel, Cruel /");
print(changed.text); "Hello Cruel, Curel World!"
```

## Document Class

The Document class contains the document text, current selections, and the current set of pending changes. The Document class is read only to make debugging and reproducing issues easier.

### Constructor

| Name | Type | Description | Default Value |
| ---- | ---- | ----------- | ------------- |
| text          | string    | The text of the document | Required |
| selections    | Range[]   | The set of non-overlapping selections in the doucment | A single empty range at the start of the document |

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| text          | string    | The text of the document |
| selections    | Range[]   | The set of non-overlapping selections in the doucment |
| changes       | Changed[]  | The set of modifications the text commands would introduce to the document |

### Methods

| Name | Returns | Arguments | Description |
| ---- | ------- | --------- | ----------- |
| apply | Document | commands:string | Parse the command string to command objects and apply the commands to the document |

## Range Class

The Range class contains the starting and ending character offsets in the document. A character offset is the number of characters to skip from the start of the document. So, an offset of zero is before the first character and an offset of the document length is after the last character.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| start | number | The starting character offset |
| end | number | The ending character offset |

The constructor throws an Error if the start is less than zero or the end is less than the start.

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| start | number | The starting character offset |
| end | number | The ending character offset |

### Methods

None


## Changed Interface

Each of the four change classes implement the Changed interface. 

### Properties

None

### Methods

None


## Printed Class

The Printed class implements the Changed interface. This change comes about from the print command.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | The text to print |

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | string | The text to print |

### Methods

None

## Inserted Class

The Inserted class implements the Changed interface. This change comes about from the insert and append commands.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| offset | number | The character offset at which to insert the text |
| text | string | The text to insert |

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| offset | number | The character offset at which to insert the text |
| text | string | The text to insert |

### Methods

None

## Replaced Class

The Replaced class implements the Changed interface. This change comes about from the change command.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| range | Range | The range of text in the document to replace |
| text | string | The replacement text |

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| range | Range | The range of text in the document to replace |
| text | string | The replacement text |

### Methods

None

## Deleted Class

The Deleted class implements the Changed interface. This change comes about from the delete command.

### Constructor

| Name | Type | Description |
| ---- | ---- | ----------- |
| range | Range | The range of text in the document to delete |

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| range | Range | The range of text in the document to replace |

### Methods

None

