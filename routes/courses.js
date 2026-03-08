const express=require("express");
const router=express.Router();
const supabase=require("../");
const validateEnrollment=require("");

//get all courses

router.get("/courses",async(req,res)=>{
    try{
    const {data,error}=await supabase.from("courses").selet("*");
    if(error) {
        throw error;
    }
    res.status(200).json({
        status:false,
        message:"All the courses fetched successfully",
        data
    })

    }
    catch(error){
        res.status(500).json({
            status:false,
            message:error.message

        })

    }
});

router.post("/enroll",validateEnrollment,async(req,res)=>{
    try{
        const {studentName,courseId}=req.body;
        const {data,error}=await supabase.from("enrollments").insert([{student_name:studentName,course_id:courseId}]);
        if(error){
            throw error
        }
        res.status(200).json({status:false,
            message:"Student entrolled successfully",
            data
        })

    }
    catch(error){
        res.status(500).json({
            status:false,
            message:error.message
    
        })

    }
});
router.get("/courses/:id/enrollments",async(req,res)=>{
    try{
        const {courseId}=req.body;
        const {data,error}=await supabase.from("enrollments").select("*").eq("course_id",courseId).single();
        if(error) throw error;
        res.status.json({status:true,

            message:"enrolled successfully"
        })


    }
    catch(error){
        res.status(500).json({
            status:false,
            message:error.message
        })

    }
})
