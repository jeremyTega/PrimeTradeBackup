const walletModel = require('../WalletModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')




async function generateUniquePhrase() {
    const adjectives = ['secure', 'decentralized', 'immutable', 'transparent', 'trustless', 'distributed', 'permissionless', 'verifiable', 'censorship-resistant'];
    const nouns = ['ledger', 'blockchain', 'transaction', 'smart contract', 'token', 'node', 'miner', 'hash', 'consensus'];
    const verbs = ['encrypt', 'validate', 'audit', 'mine', 'confirm', 'verify', 'execute', 'propose', 'consent'];
    const otherWords = ['technology', 'digital', 'asset', 'protocol', 'network', 'crypto', 'currency', 'decentralization', 'security', 'innovation', 'revolution'];

    let phrase = '';

    do {
        const uniqueWords = new Set(); // To store unique words

        while (uniqueWords.size < 14) { // Ensure 14 unique words
            const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
            const randomOtherWord = otherWords[Math.floor(Math.random() * otherWords.length)];

            // Add the words to the set to ensure uniqueness
            uniqueWords.add(randomAdjective);
            uniqueWords.add(randomNoun);
            uniqueWords.add(randomVerb);
            uniqueWords.add(randomOtherWord);
        }

        // Convert the Set to an array and concatenate the words to form the phrase
        const uniqueWordsArray = Array.from(uniqueWords);
        phrase = uniqueWordsArray.slice(0, 14).join(' ');

        // Check if the phrase already exists in the database
        const existingUser = await walletModel.findOne({ phrase });

        if (!existingUser) {
            break; // Exit the loop if the phrase is unique
        }
    } while (true);

    return phrase;
}

// Call the function inside an async context
(async () => {
    try {
        const uniquePhrase = await generateUniquePhrase();
        
    } catch (error) {
        console.error('Error:', error);
    }
})();



// async function registerUser(userData) {
//     // Generate a unique phrase for the user
//     const phrase = await generateUniquePhrase();

//     // Attach the phrase to the user data
//     userData.phrase = phrase;

//     // Save the user data to the database
//     const newUser = new UserModel(userData);
//     await newUser.save();

//     return newUser;
// }
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!firstName || firstName.trim().length === 0) {
            throw new Error("firstName field cannot be empty");
        }
        if (!lastName || lastName.trim().length === 0) {
            throw new Error("firstName field cannot be empty");
        }
        if (!email || !emailPattern.test(email)) {
            throw new Error("Invalid email address format");
        }
        // if (!password || password.trim().length === 0) {
        //     throw new Error("Password field cannot be empty");
        // } else if (!passwordPattern.test(password)) {
        //     throw new Error("Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number");
        // }

        // Check if the email already exists in the database
        const findEmail = await walletModel.findOne({ email });
        if (findEmail) {
            return res.status(400).json({ message: 'User with this email is registered in the wallet' });
        }

        // Generate a unique phrase for the user
        const generatedPhrase = await generateUniquePhrase();
        console.log("this is function", generatedPhrase)

        // Hash the password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const lowerCase = email.toLowerCase();

        // Create a new user instance
        const user = new walletModel({
            firstName,
            lastName,
            email: lowerCase,
            password: hashedPassword,
            phrase: generatedPhrase // Assign the generated phrase to the user
        });

        // Save the user to the database
        await user.save();

        res.status(200).json({ message: 'User created in the wallet successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const activateAccount = async (req, res) => {
    try {
        let { email } = req.body;
        email = email.toLowerCase()
        const user = await walletModel.findOne({email});
        
        if (!user) {
            return res.status(401).json({ message: 'User with this email is not registered' });
        }
        if (user.isVerefied = true) {
            return res.status(401).json({ message: 'account already activated' });
        }

       user.isVerified = true
       await user.save()
        res.status(200).json({ message: ' account activated successful', data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const Walletlogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase()
        const user = await walletModel.findOne({email});
        
        if (!user) {
            return res.status(401).json({ message: 'User with this email is not registered' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: 'User  account not activated' });
        }

       
        if (user.deactivate === true) {
            return res.status(400).json({ message: 'User Account not valid' });
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(400).json({ message: "Incorrect password" });
        }
         user.isLoggedIn = true

        // const timestamp = new Date().toUTCString();
        // const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // const userAgent = req.headers['user-agent'];

        const token = jwt.sign({
            email: user.email,
            userId: user._id,
            isAdmin: user.isAdmin,
            isLoggedIn:user.isLoggedIn
        }, process.env.SECRET_KEY, { expiresIn: "1d" });

        

        res.status(200).json({ message: 'Login successful', data: user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const findUserByPhrase = async (req, res) => {
    try {
        const { phrase } = req.body;

        // Find the user in the database using the provided phrase
        const user = await walletModel.findOne({ phrase });

        if (user) {
            res.status(200).json({ message: 'User found', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





module.exports = {
    registerUser,
    activateAccount,
    findUserByPhrase,
    Walletlogin
};
