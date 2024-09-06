# Persian Yup Rules

A TypeScript utility package providing custom validation rules for Persian-specific data using Yup.

## Installation

You can install the package using either Yarn or npm:

```bash
# Using Yarn
yarn add persian-yup-ts

# Or using npm
npm install persian-yup-ts
```

## Usage

To use `persian-yup-ts` in your project, follow these steps:

1. **Create a Yup utility file:**

   In your project, create a `utils/yup.ts` file and set up Yup with custom messages and rules:

   ```typescript
   import { makeYup } from "persian-yup-ts";

   const yup = makeYup({
       messages: {
           mobile: "Invalid Mobile",
           // ... add your custom messages here
       }
   });

   export default yup;
   ```

2. **Use the customized Yup instance in your forms:**

   Import the custom Yup instance in your form validation schemas:

   ```typescript jsx
   import yup from "@/utils/yup";

   const SCHEMA = yup.object({
       mobile: yup.string().mobile(),
       // ... other rules
   });
   ```

## Available Validation Rules

`persian-yup-ts` provides a set of custom validation rules tailored for Persian data formats. Here’s a list of the
available rules:

| Rule Name      | Usage Example                 | Description                                      |
|----------------|-------------------------------|--------------------------------------------------|
| `nationalCode` | `yup.string().nationalCode()` | Validates Iranian national identification codes. |
| `mobile`       | `yup.string().mobile()`       | Validates Iranian mobile phone numbers.          |
| `telephone`    | `yup.string().telephone()`    | Validates Iranian landline telephone numbers.    |
| `iban`         | `yup.string().iban()`         | Validates Iranian IBANs.                         |
| `postalCode`   | `yup.string().postalCode()`   | Validates Iranian postal codes.                  |

## License

This package is open-source and available under the MIT License.
