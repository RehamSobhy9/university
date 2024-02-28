import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addcourse = {
  body: joi
    .object({
      course_name: joi.string().min(3).max(30).required(),
      credit_hour: joi.number().valid(2, 3).required(),
      desc: joi.string().min(20).max(200).optional(),
      OpenForRegistration: joi.boolean().optional(),
      Prerequisites: joi.array().items(generalFields._id.optional()).optional(),
      instructorId: generalFields._id.optional(),
    })
    .required(),
};
export const updatecourse = {
  body: joi
    .object({
      course_name: joi.string().min(3).max(30).optional(),
      credit_hour: joi.number().valid(2, 3).optional(),
      desc: joi.string().min(20).max(200).optional(),
      OpenForRegistration: joi.boolean().optional(),
      Prerequisites: joi.array().items(generalFields._id.optional()).optional(),
      instructorId: generalFields._id.optional(),
    })
    .required(),
  query: joi
    .object({
      courseId: generalFields._id.required(),
    })
    .required(),
};

export const deletecourse = {
  query: joi
    .object({
      courseId: generalFields._id.required(),
    })
    .required(),
};


export const searchcourse = {
  query: joi
    .object({
      sort: joi.string(),
      select: joi.string().min(3).max(100),
      page: joi.number().min(0).max(33),
      size: joi.number().min(0).max(23),
      search: joi.string().min(0).max(100),
    })
    .required(),
};