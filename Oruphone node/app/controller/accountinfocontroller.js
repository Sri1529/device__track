const db = require('../../Config/db');  // Ensure the correct database import

exports.accountinfo=async (req, res) => {
    const { user_id } = req.params;  // Get user ID from the route parameter
      
    try {
      const result = await db.query('SELECT name, email, phone_number FROM Users WHERE user_id = $1', [user_id]);
  
      if (result.rowCount === 0) {  // No user with the given ID
        return res.status(404).json({ status: 'Error', message: 'User not found' });
      }
  
      const user = result.rows[0];
      res.status(200).json({ status: 'Success', user });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ status: 'Error', message: 'Failed to fetch user details' });
    }
  };