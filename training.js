import { InstructorModel } from '../../../DB/models/instructor.model.js'
import trainingmodel from '../../../DB/models/training.model.js'
import { asyncHandler } from '../../utils/errorHandling.js'
import { ApiFeature } from "../../utils/apiFeature.js";

export const addtrain=asyncHandler(async (req,res,next)=>{
    const {
        training_name,
        start_date,
        end_date,
        requirements,
        desc,
        max_student,
        instructor_id,
        OpenForRegister
    }=req.body
    const training ={}

    //check training is already exist
    const check=await trainingmodel.findOne({training_name:training_name})
    if (check) {
        return next(new Error("Training already exists", { status: 400 }));
    } else {
        training.training_name = training_name;
    }

    //Check if there instracturid and valid or not
    if (instructor_id) {
        const instructor=await InstructorModel.findById(instructor_id)
        if (!instructor || instructor.role !=="instructor") {
            return next(new Error("Invalid Instructor_Id",{status: 404}))
        }
        training.instructor_id=instructor_id
    }

    // Assign OpenForRegistration and requiremenst and max_student if provided
    if (OpenForRegister) training.OpenForRegister = OpenForRegister;

    if (requirements) training.requirements = requirements;

    if(max_student) training.max_student=max_student

    //Assign training Dates
    training.start_date=start_date
    training.end_date=end_date

    //Assign Description
    training.desc=desc

    //create training
    const result=await trainingmodel.create(training);

    return res.status(201)
    .json({ message: "Training created successfully", training: result });
})
export const alltraining=asyncHandler(async(req,res,next)=>{
	const allowFields = [
        "training_name",
        "start_date",
        "end_date",
        "requirements",
        "desc",
        "max_student",
        "instructor_id",
        "OpenForRegister"
    ];
    const searchFields = ["training_name", "start_date"];
    const apiFeatureInstance = new ApiFeature(
        trainingmodel.find(),
        req.query,
        allowFields
      )
        .search(searchFields)
        .pagination()
        .sort()
        .select()
        .filter();
    
      const training = await apiFeatureInstance.MongoseQuery;
    
      return res
        .status(200)
        .json({ message: "Done All training Information", training });
})
export const updatetraining=asyncHandler(async (req,res,next)=>{
    const {training_id}=req.query;
    const {
        training_name,
        start_date,
        end_date,
        requirements,
        desc,
        max_student,
        instructor_id,
        OpenForRegister
    }=req.body
    const training=await trainingmodel.findById({_id:training_id})
    if (!training) {
        return next(new Error("Invalid Training Id", { cause: 404 }));
    }
    if (training_name && training?.training_name != training_name) {
        const check = await trainingmodel.findOne({ training_name });
        if (check && check._id.toString() != _id) {
          return next(new Error("Training Name Is Already Exist ", { cause: 400 }));
        } else {
          training.training_name = training_name;
        }
    }
    if (instructor_id && instructor_id != training?.instructor_id?.toString()) {
        const instructor = await InstructorModel.findById(instructor_id);
        if (!instructor) {
          return next(new Error("Invalid instructor Id", { cause: 404 }));
        }
        training.instructor_id = instructor._id;
    }
    if(start_date) training.start_date=start_date;
    if(end_date) training.end_date=end_date
    if(requirements) training.requirements=requirements
    if(desc) training.desc=desc
    if(max_student) training.max_student=max_student
    if(OpenForRegister) training.OpenForRegister=OpenForRegister

    await training.save();
    return res.status(200).json({ message: "Training updated Successfully", training });
})
export const deletetrain=asyncHandler(async(req,res,next)=>{
    const {training_id} = req.query
    const training = await trainingmodel.findByIdAndDelete(training_id)
    if (!training) {
        return next(new Error("In-valid training Id",{cause:404}))
    }
    return res.status(200)
    .json({ message: "Training deleted Successfully", training })
})