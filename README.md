# Brandoo

## useBrandoo Hook

The `useBrandoo` hook is a utility that simplifies communication with the Brandoo API, providing a clean interface to manage various operations such as statistics, form responses, and content fetching. 

Works only with WMS Brandoo (www.brandoo.cz)

## Installation

1. Ensure you have the necessary environment variable `NEXT_PUBLIC_BRANDOO_AUTH_TOKEN` set in your environment. This token is used for authenticating API requests from localhost, on production ain't suppose to be `NEXT_PUBLIC_BRANDOO_AUTH_TOKEN`, it ain't necessary and it's a bit risky.

2. Usage of the hook

```
    const { createResponse, ... } = useBrandoo()
```

## Methods

### `addStatisticValue(statisticId: string, value: StatisticValue): Promise<void>`

#### Description:
Adds a value to the statistics associated with the given `statisticId`.

#### Parameters:
- `statisticId` (string): The ID of the statistic to which the value should be added.
- `value` (StatisticValue): The value object that needs to be added to the statistic. The value can include:
  - `number` (optional): A numeric value.
  - `boolean` (optional): A boolean value.
  - `time` (optional): A time string in the format `hh:mm:ss`.

#### Example Usage:

```typescript
const { addStatisticValue } = useBrandoo();

addStatisticValue("uuid", { number: 10 }); 
```

#### Error Handling:
Logs an error to the console if the request fails.

---

### `getPropertyOptions(propertyId: string, setter: Dispatch<SetStateAction<OptionsResponse>>): Promise<void>`

#### Description:
Retrieves the options for a specific property and passes them to the setter function.

#### Parameters:
- `propertyId` (string): The ID of the property for which the options should be retrieved.
- `setter` (Dispatch<SetStateAction<OptionsResponse>>): A function that will receive the data (options) retrieved from the API. This function typically updates the component's state.

#### Example Usage:

```typescript
const [options, setOptions] = useState<Option[]>([]);
  
const { getPropertyOptions } = useBrandoo();

getPropertyOptions("uuid", setOptions);
```

#### Error Handling:
Logs an error to the console if the request fails.

---

### `createResponse(formId: string, data: object): Promise<void>`

#### Description:
Submits a form response for the given `formId`.

#### Parameters:
- `formId` (string): The ID of the form for which the response is being created.
- `data` (object): The response data to be submitted, which can include any key-value pairs representing the form fields and their values.

#### Example Usage:

```typescript
const { createResponse } = useBrandoo();

createResponse("uuid", { name, email, ... });
```

#### Error Handling:
Logs an error to the console if the request fails.

---

### `getContent(contentId: string, setter: Dispatch<SetStateAction<any>>): Promise<void>`

#### Description:
Retrieves public content by its ID and passes the content to the setter function.

#### Parameters:
- `contentId` (string): The ID of the content to be retrieved.
- `setter` (Dispatch<SetStateAction<any>>): A function that will receive the retrieved content. This function typically updates the component's state.

#### Example Usage:

```typescript
const [content, setContent] = useState<string | null>(null);

const { getContent } = useBrandoo();

getContent("uuid", setContent);
```

For any questions contact us info@brandoo.cz