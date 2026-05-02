import query from "../config/query.helper.js";

export const getHealth = async (req, res, next) => {
  try {
    const dbResult = await query("SELECT NOW() AS current_time");
    res.status(200).json({
      success: true,
      message: "API and database are running successfully",
      database_time: dbResult.rows[0].current_time,
    });
  } catch (error) {
    next(error);
  }
};