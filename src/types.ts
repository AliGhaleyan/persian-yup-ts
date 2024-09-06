type Message = string | (() => string);

type CustomRules = "nationalCode" | "mobile" | "telephone" | "postalCode" | "iban";

export type MakeYupProps = {
    messages?: Partial<Record<CustomRules, Message>>;
}