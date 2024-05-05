const db = require('../../Config/db');  // Ensure the correct database import

exports.loginhistory = async (req, res) => {
  const { user_id } = req.params;  // Get user_id from URL parameters
  console.log('Fetching login history for user:', user_id);  // Log user_id to verify

  try {
    const result = await db.query('SELECT * FROM loginhistory WHERE user_id = $1', [user_id]);
    if (result.rowCount === 0) {  // If no data is found
      console.warn('No login history found for user:', user_id);
      return res.status(404).json({ error: 'No login history found for this user' });
    }
    res.status(200).json(result.rows);  // Return the data if found
  } catch (error) {
    console.error('Error fetching login history:', error);
    res.status(500).json({ error: 'Failed to fetch login history' });  // Handle exceptions
  }
};
