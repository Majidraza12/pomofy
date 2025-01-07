import Session from "../models/session.model.js";

export const storeSession = async (req, res) => {
  const { userId, duration } = req.body;
  try {
    if (!userId || !duration) {
      return res.status(400).json({ message: "Cannot Store Sessions,Something went wrong" });
    }
    const newSession = new Session({
      userId,
      duration,
    });
    await newSession.save();
    return res.status(200).json({ message: "Session Stored Successfully" });
  } catch (error) {
    console.log("Error in Store Session controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSessionsByUser = async (req, res) => {
try {
      const { userId } = req.body;
      const sessions = await Session.find({ userId }).sort({createdAt: 1}) //sort by createdAt in ascending order
    const sessionsByDate = sessions.reduce((acc, session) => { 
        const date = session.createdAt.toISOString().split('T')[0]; //get the date in yyyy-mm-dd format
        //Initialize the accumulator if the date is not present
        if (!acc[date]) {
            acc[date] = {
                totalDuration: 0,
                sessions: [], // Fixed property name to match where it's used
            }
        }
        acc[date].totalDuration += session.duration;
        acc[date].sessions.push(session);
        return acc; 
    }, {});
    const GraphData = Object.entries(sessionsByDate).map(([date, data]) => ({   
        date,
        totalDuration: data.totalDuration,
    }));
    return res.status(200).json({ 
        success: true,
        data: GraphData,
     });
} catch (error) {
    console.log("Error in Get Sessions By User controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
}  
};

