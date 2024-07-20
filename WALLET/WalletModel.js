const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    
     firstName:{type:String, },
    lastName:{type:String, },
    password:{type:String, },
    email:{type:String, require:true, unique:true},
     isAdmin:{type:Boolean, default:false},
    isVerified:{type: Boolean, default:false},
    deactivate:{type: Boolean, default:false},
    isLoggedIn:{type: Boolean, default:false},
    phrase:{type:String},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user'}, 
        },
{timestamps:true})

const walletModel = mongoose.model("Wallet user", userSchema)
module.exports = walletModel






// function generateRandomPhrase() {
//     const adjectives = ['elephant', 'dog', 'lemon', 'kangaroo', 'cherry', 'banana', 'apple', 'forest', 'ice', 'cream', 'giraffe', 'jungle'];
//     const nouns = ['elephant', 'dog', 'lemon', 'kangaroo', 'cherry', 'banana', 'apple', 'forest', 'ice', 'cream', 'giraffe', 'jungle'];
//     const emotions = ['happiness', 'sadness', 'excitement', 'anger', 'joy', 'fear', 'surprise', 'love', 'disgust', 'trust', 'anxiety', 'contentment'];

//     const uniqueWords = new Set(); // To store unique words
    
//     let phrase = '';

//     while (uniqueWords.size < 13) { // Ensure 13 unique words
//         const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
//         const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
//         const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        
//         // Add the words to the set to ensure uniqueness
//         uniqueWords.add(randomAdjective);
//         uniqueWords.add(randomNoun);
//         uniqueWords.add(randomEmotion);
//     }

//     // Convert the Set to an array and concatenate the words to form the phrase
//     const uniqueWordsArray = Array.from(uniqueWords);
//     phrase = uniqueWordsArray.slice(0, 13).join(' ');

//     return phrase;
// }

// // Example usage:
// for (let i = 0; i < 10000; i++) {
//     console.log(generateRandomPhrase()); // Output: Random phrase with 13 unique words
// }
