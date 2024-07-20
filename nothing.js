// const kycModel = require('../models/kycVerication')
// const userModel = require('../models/userModel')
// const jwt = require('jsonwebtoken')
// const cloudinary = require('../helpers/cloudinary')
// const sendEmail = require('../middlewares/mail')
// const {KycVericationMail} = require('../utils/mailTemplates')
// const mongoose = require('mongoose')

// // const kycVerification = async(req, res) => {
// //     try {
// //         const {token} = req.params
        
// //         const {fullName,gender,dateOfBirth,SSN,occupation,billingAddress}= req.body
        
// //         if (!token) {
// //             return res.status(400).json({ message: 'Token not found' });
// //         }
// //         const { email } = jwt.verify(token, process.env.SECRET_KEY);
// //         const user = await userModel.findOne({ email });

// //         const ssnPartern = /^\d{9}$/
// //         if (!fullName || fullName.trim().length === 0) {
// //             throw new Error("fullName field cannot be empty");
// //         }
// //         if (!gender || gender.trim().length === 0) {
// //             throw new Error("gender field cannot be empty");
// //         }
        
// //         if (!dateOfBirth || dateOfBirth.trim().length === 0) {
// //             throw new Error("dateOfBirth field cannot be empty");
// //         }
// //         if (!SSN || !ssnPartern.test(email)) {
// //             throw new Error("Invalid SSN  format");
// //         }
// //         if (!occupation || occupation.trim().length === 0) {
// //             throw new Error("occupation field cannot be empty");
// //         }
// //         if (!billingAddress || billingAddress.trim().length === 0) {
// //             throw new Error("billingAddress field cannot be empty");
// //         }

// //           // Upload file to Cloudinary with specific options
// //           const license = await new Promise((resolve, reject) => {
// //             cloudinary.uploader.upload(req.files.driversLicense.tempFilePath, {
// //                 allowed_formats: ['txt', 'doc', 'pdf', 'docx', 'png', 'jpeg'], // Allow these file formats
// //                 max_file_size: 2000000 // Maximum file size in bytes (2MB)
// //             }, (error, result) => {
// //                 if (error) {
// //                     reject(error);
// //                 } else {
// //                     resolve(result);
// //                 }
// //             });
// //         });
// //           // Upload back to Cloudinary with specific options
// //           const licenseBack = await new Promise((resolve, reject) => {
// //             cloudinary.uploader.upload(req.files.driversLicenseBack.tempFilePath, {
// //                 allowed_formats: ['txt', 'doc', 'pdf', 'docx', 'png', 'jpeg'], // Allow these file formats
// //                 max_file_size: 2000000 // Maximum file size in bytes (2MB)
// //             }, (error, result) => {
// //                 if (error) {
// //                     reject(error);
// //                 } else {
// //                     resolve(result);
// //                 }
// //             });
// //         });
                

//         // Create deposit record
// //         const updatedKyc = new kycModel({
// //             fullName,
// //             gender,
// //             dateOfBirth,
// //             SSN,
// //             occupation,
// //             billingAddress,
// //             driversLicense: { public_id: license.public_id, url: license.url },

// //             driversLicenseBack: { public_id: licenseBack.public_id, url: licenseBack.url }
// //         });
// //     } catch (error) {
// //         res.status(500).json(error.messsage)
// //     }
// //}




//         // // Upload file to Cloudinary with specific options
//         //  license = await new Promise((resolve, reject) => {
//         //     cloudinary.uploader.upload(req.files.driversLicense.tempFilePath, {
//         //         allowed_formats: ['txt', 'doc', 'pdf', 'docx', 'png', 'jpeg'], // Allow these file formats
//         //         max_file_size: 2000000 // Maximum file size in bytes (2MB)
//         //     }, (error, result) => {
//         //         if (error) {
//         //             reject(error);
//         //         } else {
//         //             resolve(result);
//         //         }
//         //     });
//         // });
//         // console.log(license, "this is license")


//         //  // Upload file to Cloudinary with specific options
//         //  driversLicenseBack = await new Promise((resolve, reject) => {
//         //     cloudinary.uploader.upload(req.files.driversLicenseBack.tempFilePath, {
//         //         allowed_formats: ['txt', 'doc', 'pdf', 'docx', 'png', 'jpeg'], // Allow these file formats
//         //         max_file_size: 2000000 // Maximum file size in bytes (2MB)
//         //     }, (error, result) => {
//         //         if (error) {
//         //             reject(error);
//         //         } else {
//         //             resolve(result);
//         //         }
//         //     });
//         // });


// const kycVerification = async (req, res) => {
//     try {
//         const { token } = req.params;

//         // Extract KYC data from request body
//         const { fullName, gender, dateOfBirth, SSN, occupation, billingAddress } = req.body;

//         if (!token) {
//             return res.status(400).json({ message: 'Token not found' });
//         }

//         // Verify token and find user by email
//         const { email } = jwt.verify(token, process.env.SECRET_KEY);
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         console.log(req.files)
//         const ssnPattern = /^\d{9}$/;

//         // Validate KYC data
//         if (!fullName || fullName.trim().length === 0) {
//             throw new Error("fullName field cannot be empty");
//         }
//         if (!gender || gender.trim().length === 0) {
//             throw new Error("gender field cannot be empty");
//         }
//         if (!dateOfBirth || dateOfBirth.trim().length === 0) {
//             throw new Error("dateOfBirth field cannot be empty");
//         }
//         if (!SSN || !ssnPattern.test(SSN)) {
//             throw new Error("Invalid SSN format");
//         }
//         if (!occupation || occupation.trim().length === 0) {
//             throw new Error("occupation field cannot be empty");
//         }
//         if (!billingAddress || billingAddress.trim().length === 0) {
//             throw new Error("billingAddress field cannot be empty");
//         }



//         // Function to upload file to Cloudinary
// const uploadToCloudinary = async (file) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(file.tempFilePath, {
//             // Specify upload options
//         }, (error, result) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// };

//        // console.log(driversLicenseBack,"this is lincense back")


//          // Upload the first file (driversLicense)
//          const License = await uploadToCloudinary(req.files.driversLicense);
       
        
        
        
//          // Upload the second file (driversLicenseBack)
//          const LicenseBack =  await uploadToCloudinary(req.files.driversLicenseBack);

        
//         console.log(req.files)
       
//         // Create KYC document and save to database
//         const kycDoc = new kycModel({
//             fullName,
//             gender,
//             dateOfBirth,
//             SSN,
//             occupation,
//             billingAddress,
//             driversLicense: { public_id: License.public_id, url: License.url },
//             driversLicenseBack: { public_id: LicenseBack.public_id, url: LicenseBack.url },
//             userId: user._id
//         });
//         console.log(driversLicense,driversLicenseBack)
        
//         const savedKycDoc = await kycDoc.save();

//         // Update user's KYC ID and set verification status to true
//         user.kyc = { id: savedKycDoc._id };
//         await user.save();

//         // sending an email to the admin telling him that a user has uploaded KYC form
//         // const recipients = process.env.loginMails.split(',');
//         // for (const recipient of recipients) {
//             const html = KycVericationMail(savedKycDoc);
//             const data = {
//                 email: process.env.AdminMail,
//                 subject: "User Uploaded KYC Form",
//                 html: html,
//                 attachments: [
//                     {
//                         filename: 'driversLicense.jpg',
//                         path: license.url // Access license.url here
//                     }
//                 ]
//             };
//             await sendEmail(data);
        

//         res.status(200).json({ message: 'KYC verification successful', kycDoc });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };




// //view kyc form
// const KycData = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const findUser = await kycModel.findOne({ userId: userId }); // Corrected
//         if (!findUser) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         res.status(200).json({ message: `User with ID ${userId}`, findUser });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



// const approveKyc = async (req, res) => {
//     try {
//         const { adminId } = req.params;
//         const { userId } = req.body;

//         // Check if userId is a valid ObjectId
//         if (!mongoose.isValidObjectId(userId)) {
//             return res.status(400).json({ message: 'Invalid user ID, please pass the correct user ID' });
//         }

//         const findUser = await kycModel.findOne({ userId: userId }); // 
//         const User = await userModel.findOne({ _id:userId}); 
//         if (!findUser) {
//             return res.status(400).json({ message: "User not found" });
//         }
//         findUser.approved=true
//         await findUser.save()
//         User.kyc.verified = true
//         await User.save()


//         res.status(200).json({ message: `User KYC updated successfully`, findUser,User });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };




// module.exports = {
    
//     kycVerification,
//     KycData,
//     approveKyc

// }



