import * as yup from 'yup';

const priceField = yup.number().typeError("nums only").required("enter price").positive("Positive nums only").min(1, "min price: 1").max(99000, "max price: 99,000");

const prepTimeField = yup.number("nums only").required("required field").positive("Positive nums only").integer("Round mins only.")
                    .min(3, "min time: 3").max(720, "max: 720 (12hrs).");

const requiredStringField = yup.string().required("required field").min(3, "min: 3 chars").max(30, "max: 30 chars")
    .matches(/^[a-zA-Z0-9\u0590-\u05FF].*$/, "start with ltr/num").trim();

const descriptionField = yup.string().min(0, "min: 3").max(100, "max: 100")
    .matches(/^[a-zA-Z0-9\u0590-\u05FF].*$/, "start with ltr/num").trim();

export {requiredStringField, descriptionField, priceField, prepTimeField};