import { Application } from "../models/application.model.js";
import { Scheme } from "../models/scheme.model.js";

export const applyScheme = async (req,res) => {
    try {
        const userId = req.id;
        const schemeId = req.params.id
    
        if(!schemeId){
            return res.status(404).json({
                message:"Scheme Id is required",
                success:false
            })
        }
    
        //checking if the user has already aplied for the scheme
    
        const existingApplication = await Application.findOne({scheme:schemeId ,applicant: userId });
    
        if(existingApplication){
            return res.status(400).json({
              message: "Already applied for this scheme",
              success: false,
            });
        }

        //checking if the scheme exists
        const scheme = await Scheme.findById(schemeId).populate({
          path: "applications",
        });

        if(!scheme){
            return res.status(404).json({
              message: "Scheme does not exist",
              success: false,
            });
        }

        //applying for the job
        const newApplication = await Application.create({
          scheme: schemeId,
          applicant: userId,
        });
        
        //saving these applicants in the scheme section (we have applications section in schemes.model)
        scheme.applications.push(newApplication._id)
        await scheme.save();

        return res.status(200).json({
          message: "Applied for scheme successfully",
          scheme,
          success: true,
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({
          message: "Error ocurred while applying for this scheme",
          success: false,
        });
    }
}

export const getAppliedSchemes = async (req,res) => {
    try {
        const userId = req.id;

        const application = await Application.find({ applicant: userId })
          .sort({ createdAt: -1 })
          .populate({
            path: "scheme",
            options: { sort: { createdAt: -1 } },
            populate: {
              path: "organization", //this is present in scheme.model
              options: { sort: { createdAt: -1 } },
            },
          });
        
        if(!application){
            return res.status(404).json({
              message: "No application found",
              success: false,
            });
        }

        return res.status(200).json({
          application,
          success: true,
        });
    } 
    catch (error) {
        console.log(error)
    }
}

//admin gets to know who all & how many have applied
export const getApplicants = async (req,res) => {
  try {
    const schemeId = req.params.id

    const scheme = await Scheme.findById(schemeId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant"
      },
    });

    if(!scheme){
      return res.status(404).json({
        message: "Scheme not found",
        success: false,
      });
    }

    return res.status(200).json({
      scheme,
      success: true,
    });
  } 
  
  catch (error) {
    console.log(error)
  }
}

export const updateStatus = async (req,res) => {
  try {
    const {status} = req.body;
    const applicationId = req.params.id;

    if(!status){
      return res.status(404).json({
        message: "Status is required",
        success: false,
      });
    }

    //finding application by application id
    const application = await Application.findOne({_id:applicationId})

    if(!application){
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    //update status
    application.status = status.toLowerCase();
    await application.save()

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } 
  catch (error) {
    console.log(error)
  }
}