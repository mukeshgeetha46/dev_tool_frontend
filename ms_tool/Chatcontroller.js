const User = require('../models/User');

const { generateChatId } = require('../lib/common');
const ChatMaster = require('../models/Chatmaster');

const fetchAllUser = async (req, res) => {
    try {
        const { id } = req.query;
        const users = await User.find({ _id: { $ne: id } }); 
        res.status(200).json(users); 
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const checkChatmaster = async (req, res) => {
    try {
      const { user_id, receiver_id } = req.body;
      const chatid = await generateChatId(user_id,receiver_id);
  
      const results = await ChatMaster.find({
        $or: [
          { sender_id: user_id, receiver_id: receiver_id },
          { sender_id: receiver_id, receiver_id: user_id },
        ],
      }).select('chatmaster_id');
  
      console.log('results', results);
  
      const resultsLength = results.length;
      if (resultsLength === 0) {
        const newChatMaster = await ChatMaster.create({
          chatId: chatid,
          sender_id: user_id,
          receiver_id: receiver_id,
        });
        res.status(200).json(newChatMaster);
        return; // Prevent further execution after creating a new chat
      }
      res.status(200).json({ message: "Already Chated" });
    } catch (error) {
      console.error("Error fetching users:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  const getFriendsList = async (req, res) => {
    try {
      const { user_id } = req.query;
       
      // Step 1: Find all chats involving the user
      const chatRecords = await ChatMaster.find({
        $or: [
          { sender_id: user_id },
          { receiver_id: user_id }
        ]
      });
  
      // Step 2: Extract the friend IDs (other participants in the chats)
      const friendIds = chatRecords.map(chat =>
        chat.sender_id === user_id ? chat.receiver_id : chat.sender_id
      );
  
      // Step 3: Remove duplicate IDs
      const uniqueFriendIds = [...new Set(friendIds)];
  
      // Step 4: Fetch friend details from the User table
      const friends = await User.find({ _id: { $in: uniqueFriendIds } });
  
      // Return the list of friends
      res.status(200).json({ friends });
    } catch (error) {
      console.error("Error fetching friends list:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports = {
    fetchAllUser,
    checkChatmaster,
    getFriendsList
}