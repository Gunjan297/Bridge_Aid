import { Organization } from "../models/organization.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerOrg = async (req,res) => {
    try {
        const {orgName} =req.body
        if(!orgName){
            return res.status(400).json({message:"Organization name is required",
             success:false
            })
        }

        let organization = await Organization.findOne({name:orgName})

        if(organization){
            return res.status(400).json({message:"Organization already exists",
             success:false
            })
        } 
        organization = await Organization.create({
          name: orgName,
          userId: req.id,
        });

        return res.status(201).json({
            message:"Organization registered successfully",
            organization,
            success:true,
        })
    } 
    
    catch (error) {
        console.log(error)
        return res
          .status(400)
          .json({ message: "Error occured! Could not register organization", success: false });
    }
}

//to get all the organizations registered by a user
export const getOrg = async (req,res) => {
    try {
        const userId = req.id;

        const organizations = await Organization.find({userId})

        if(!organizations){
            return res.status(404).json({
                message:"No Organization found",
                success:false
            })
        }

        return res.status(200).json({
            organizations,
            success:true,
        })
    } catch (error) {
        console.log(error)
    }
}

//to get organizations by id
export const getOrgById = async (req, res) => {
  try {
    const orgId= req.params.id
    const organization = await Organization.findById(orgId)

    if(!organization){
       return res.status(404).json({
        message:"Organization not found",
        success: false,
       }) 
    }

    return res.status(200).json({
        organization,
        success:true,
    })
  } 

  catch (error) {
    console.log(error);
  }
};

export const updateOrg = async (req,res) => {
    try {
      // console.log(req.body);
      // console.log(req.file);
        const {name, description,website,location} = req.body;
        const file= req.file; 
        if (!file) {
          return res.status(400).json({
            message: "Comapny Logo is required",
            success: false,
          });
        }
        //uploading files to cloudinary
              const fileUri = getDataUri(file);
              const cloudResponse = await cloudinary.uploader
                .upload(fileUri.content)
                .catch((error) => {
                  console.log(error);
                });

        const updateData = {
          name,
          description,
          website,
          location,
          logo: cloudResponse.secure_url,
        };
        
        const organization = await Organization.findByIdAndUpdate(req.params.id, updateData, {new:true})

        if(!organization){
            return res.status(404).json({
              message: "Organization not found",
              success: false,
            }); 
        }

        return res.status(200).json({
          message: "Organization info updated",
          organization,
          success: true,
        }); 
    } 
    catch (error) {
       console.log(error);
       return res.status(500).json({
         message: "An error occurred while updating the organization",
         success: false,
       });
    }
}