import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

const customMessages = {
  "string.base": "{#label} must be a string",
  "string.min": "{#label} must be at least {#limit} characters",
  "string.max": "{#label} must be at most {#limit} characters",
  "number.base": "{#label} must be a number",
  "number.valid": "{#label} must be one of {#valids}",
  "boolean.base": "{#label} must be a boolean True or false",
  "array.base": "{#label} must be an array",
  "array.items": "Invalid item in {#label}",
  "_id.required": "{#label} is required",
  "_id.optional": "{#label} is optional",
  "any.only": "{#label} must be {#valids}",
  "any.required": "{#label} is required",
};

export const addtrain = {
  body: joi
    .object({
      training_name: joi
        .string()
        .min(3)
        .max(40)
        .required()
        .messages(customMessages),
      desc: joi.string().min(10).max(400).required().messages(customMessages),
      OpenForRegister: joi.boolean().optional().messages(customMessages),
      instructor_id: generalFields._id.optional().messages(customMessages),
      start_date:joi.date().required().messages(customMessages),
      end_date:joi.date().required().messages(customMessages),
      requirements:joi.string().min(5).max(300).optional().messages(customMessages),
      max_student:joi.number().optional().messages(customMessages)
    })
    .required(),
};
export const updatetrain = {
  body: joi
    .object({
        training_name: joi
        .string()
        .min(3)
        .max(40)
        .required()
        .messages(customMessages),
      desc: joi.string().min(10).max(400).required().messages(customMessages),
      OpenForRegister: joi.boolean().optional().messages(customMessages),
      instructor_id: generalFields._id.optional().messages(customMessages),
      start_date:joi.date().required().messages(customMessages),
      end_date:joi.date().required().messages(customMessages),
      requirements:joi.string().min(5).max(300).optional().messages(customMessages),
      max_student:joi.number().optional().messages(customMessages)
    })
    .required(),
  query: joi
    .object({
      training_id: generalFields._id.required().messages(customMessages),
    })
    .required(),
};

export const deletetrain = {
  query: joi
    .object({
      training_id: generalFields._id.required().messages(customMessages),
    })
    .required(),
};

export const alltrain = {
  query: joi
    .object({
      sort: joi.string().messages(customMessages),
      select: joi.string().min(3).max(100).messages(customMessages),
      page: joi.number().min(0).max(33).messages(customMessages),
      size: joi.number().min(0).max(23).messages(customMessages),
      search: joi.string().min(0).max(100).messages(customMessages),
    })
    .required(),
};