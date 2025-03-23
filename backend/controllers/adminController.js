import validator from 'validator';
import bcrypt from 'bcrypt';
// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.imageFile

        // checking for all data to add doctor
       if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
       return res.json({success:false, message: 'Missing Details'})
    } 
    // checking for valid email
    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: 'Invalid Email' });
    }
    // checking for valid password
    if (password.length < 8) {
        return res.json({ success: false, message: 'Please enter a strong Password' });
    }
    // hassing doctor password
    const salt = await bcrypt.genSalt(10);
    
}
catch (error) {}
}
export { addDoctor };