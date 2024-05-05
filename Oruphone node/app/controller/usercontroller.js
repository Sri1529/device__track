const bcrypt = require('bcrypt');  // Ensure bcrypt is imported
const db = require('../../Config/db');  // Ensure the correct database import

exports.signup_datas = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    console.warn('Required field missing');  // Log a warning for missing fields
    return res.status(400).json({ status: 'Error', message: 'All fields are required' });
  }

  try {
    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);  // Generate salt for hashing
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into the Users table
    const query = `
      INSERT INTO Users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id
    `;
    const result = await db.query(query, [name, email, hashedPassword]);

    console.log('User registered with ID:', result.rows[0].user_id);  // Log successful registration
    res.status(201).json({ status: 'Success', user_id: result.rows[0].user_id });
  } catch (error) {
    console.error('Signup error:', error);  // Log errors to the console

    if (error.code === '23505') {  // Unique constraint violation (duplicate email)
      return res.status(409).json({ status: 'Error', message: 'Email already exists' });
    }

    res.status(500).json({ status: 'Error', message: 'Failed to register user' });  // General error response
  }
};

exports.check_name_mail=async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ status: 'Error', message: 'Email and password are required' });
    }
  
    try {
      const result = await db.query('SELECT * FROM Users WHERE email = $1', [email]);
  
      if (result.rowCount === 0) {  // If no user with the given email
        return res.status(401).json({ status: 'Error', message: 'Invalid email or password' });
      }
  
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  
      if (!isPasswordValid) {  // If the password doesn't match
        return res.status(401).json({ status: 'Error', message: 'Invalid email or password' });
      }
  
      // Return the user object with the expected properties
      res.status(200).json({ status: 'Success', user: { user_id: user.user_id, name: user.name } });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ status: 'Error', message: 'Failed to authenticate user' });
    }
  };