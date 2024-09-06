import * as yup from "yup";
import {MakeYupProps} from "./types";

declare module "yup" {
    interface StringSchema {
        nationalCode(): StringSchema;

        mobile(): StringSchema;

        telephone(): StringSchema;

        iban(): StringSchema;

        postalCode(): StringSchema;
    }
}

export const makeYup = (props?: MakeYupProps) => {
    yup.addMethod(yup.string, "nationalCode", function () {
        return yup.string().test({
            name: "national-code",
            message: props?.messages?.nationalCode,
            test: (input) => {
                if (!input || !input.trim()) return true;
                if (
                    !/^\d{10}$/.test(input) ||
                    input == "0000000000" ||
                    input == "1111111111" ||
                    input == "2222222222" ||
                    input == "3333333333" ||
                    input == "4444444444" ||
                    input == "5555555555" ||
                    input == "6666666666" ||
                    input == "7777777777" ||
                    input == "8888888888" ||
                    input == "9999999999"
                )
                    return false;
                const check = parseInt(input[9]);
                let sum = 0;
                let i;
                for (i = 0; i < 9; ++i) {
                    sum += parseInt(input[i]) * (10 - i);
                }
                sum %= 11;
                return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
            }
        });
    });

    yup.addMethod(yup.string, "mobile", function () {
        return yup.string().test(
            {
                name: "mobile",
                message: props?.messages?.mobile,
                test: (value) =>
                    value
                        ? !!value.match(
                            /^(098|0098|98|\+98|0)?9(0[0-5]|[1 3]\d|2[0-3]|9[0-9]|41)\d{7}$/g,
                        )
                        : true,
            });
    });

    yup.addMethod(yup.string, "telephone", function () {
        return yup.string().test({
            name: "telephone",
            message: props?.messages?.telephone,
            test: (value) => {
                if (!value) return true;

                return !!value.match(/^[2-9]\d{7,}$/g);
            },
        });
    });

    yup.addMethod(yup.string, "postalCode", function () {
        return yup
            .string()
            .matches(/^\d+$/, props?.messages?.postalCode)
            .length(10, props?.messages?.postalCode);
    });

    yup.addMethod(yup.string, "iban", function () {
        return yup.string().test({
            message: props?.messages?.iban,
            test: (value) => {
                let ibanReplaceValues: string[] = [];
                let flag: boolean = true;

                if (value && value.length > 0) {
                    value = value.toUpperCase().replace(/[\W_]+/g, "");
                    if (value.length < 4 || value.length > 34) {
                        flag = false;
                    }

                    if (
                        !isNaN(parseInt(value[0])) ||
                        !isNaN(parseInt(value[1])) ||
                        isNaN(parseInt(value[2])) ||
                        isNaN(parseInt(value[3]))
                    ) {
                        flag = false;
                    }

                    if (flag) {
                        const ibanReplaceChars: string[] = [];
                        for (let i = 65; i <= 90; i++) {
                            ibanReplaceChars.push(String.fromCharCode(i));
                        }

                        for (let i = 10; i <= 35; i++) {
                            ibanReplaceValues.push(i.toString());
                        }

                        let tmpIBAN: string = value.substring(4) + value.substring(0, 4);
                        tmpIBAN = tmpIBAN
                            .split("")
                            .map((char) => {
                                const index = ibanReplaceChars.indexOf(char);
                                return index !== -1 ? ibanReplaceValues[index] : char;
                            })
                            .join("");

                        let tmpValue: number = parseInt(tmpIBAN[0]);

                        for (let i = 1; i < tmpIBAN.length; i++) {
                            tmpValue *= 10;
                            tmpValue += parseInt(tmpIBAN[i]);
                            tmpValue %= 97;
                        }

                        if (tmpValue !== 1) {
                            flag = false;
                        }
                    }
                }

                return flag;
            },
        });
    });

    return yup;
};