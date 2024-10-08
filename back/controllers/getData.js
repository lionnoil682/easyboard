const database = require('../database/database'); // database 가져오기

exports.getData = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await database.query(
      'SELECT * FROM users WHERE user_id = $1',
      [user_id]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: 'Get Items Fail' + error });
  }
};
