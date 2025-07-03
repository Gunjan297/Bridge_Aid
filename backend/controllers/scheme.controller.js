import { Scheme } from "../models/scheme.model.js";

export const postScheme = async (req,res) => {
    try {
        const {
          title,
          description,
          details,
          eligibility,
          applicationProcess,
          documentsRequired,
          location,
          type,
          category,
          subCategory,
          organizationId,
          applyLink,
        } = req.body;

        const userId = req.id //the user who is posting the scheme

        if (
          !title ||
          !description ||
          !location ||
          !type ||
          !category ||
          !organizationId
        ) {
          return res.status(400).json({
            message: "All fields are required",
            success: false,
          });
        }
        
        const schemeData = {
          title,
          description,
          ...(details && { details }),
          ...(eligibility && { eligibility: eligibility.split(",") }),
          ...(applicationProcess && { applicationProcess }),
          ...(documentsRequired && { documentsRequired }),
          location,
          type,
          category,
          organization: organizationId,
          created_by: userId,
          ...(subCategory && { subCategory }), // conditionally include subCategory
          ...(applyLink && { applyLink }),
        };

        const scheme = await Scheme.create(schemeData);

        return res.status(201).json({
          message: "New Scheme created successfully",
          scheme,
          success: true,
        });

    } catch (error) {
        console.log(error)
        return res.status(201).json({
          message: "Error occured while posting scheme",
          success: false,
        });
    }
}

//based on keyword chosen
export const getAllSchemes = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { category: { $regex: keyword, $options: "i" } },

            ...(details
              ? [{ details: { $regex: keyword, $options: "i" } }]
              : []),

            ...(subCategory
              ? [{ subCategory: { $regex: keyword, $options: "i" } }]
              : []),
          ],
        };

        const schemes = await Scheme.find(query).populate({
          path:"organization"
        }).sort({createdAt: -1});

        if(!schemes || schemes.length ===0){
            return res.status(404).json({
              message: "Jobs not found.",
              success: false,
            });
        }
        
        return res.status(200).json({
          schemes,
          success: true,
        });
    } 
    catch (error) {
        console.log(error)
    }
}

export const getSchemeById = async (req,res) => {
    try {
        const schemeId = req.params.id;

        const scheme = await Scheme.findById(schemeId)
          .populate({
            path: "organization",
          })
          .populate({
            path: "applications",
          });
          

        if(!scheme){
            return res.status(404).json({
              message:"Scheme not found",
              success: true,
            });
        }

        return res.status(200).json({
          scheme,
          success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

//schemes created by admin so far
export const getAdminSchemes = async (req,res) => {
  
  try {
    const adminId = req.id

    const schemes = await Scheme.find({ created_by: adminId }).populate({
      path: "organization",
    });
    
    if(!schemes){
      return res.status(404).json({
        message: "No scheme created by admin",
        success: false,
      });
    }
    
    return res.status(200).json({
      schemes,
      success: true,
    });

  } catch (error) {
    console.log(error)
  }
}


