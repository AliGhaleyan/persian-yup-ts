type Message = string | (() => string);

type CustomRules = "nationalCode" | "mobile" | "passwordConfirmation" | "telephone" | "postalCode"
    | "iban";

export type MakeYupProps = {
    messages?: Partial<Record<CustomRules, Message>>;
}