import { HistoryModel } from "../models/historyModel.js"

export const getHistory = async (req, res) => {
  try{
      const history = await HistoryModel.find();
      console.log('history', history);
      res.status(200).json(history);
  }catch (err){
      res.status(500).json({ error: err});
  }
}

export const createHistory = async (req, res) => {
  try {
      const {
        userid,
        detail
      } = req.body;
      const history = await HistoryModel.findOne({userid})
      if(history) return res.status(400).json({msg: "This user history already exists."})
      const newHistory = new UserModel({
        userid, detail
      })
      await newHistory.save();
      res.status(200).json({msg: "Create history success"});
  } catch (err) {
      res.status(500).json({ error: err});
  }
}

export const updateHistory = async(req, res) =>{
  try{
    const { 
      userid,
      detail
    } = req.body
    if(!userid) return res.status(400).json({msg: "UserID is empty"})
    if(!detail) return res.status(400).json({msg: "Detail is empty"})
    
    await HistoryModel.findOneAndUpdate({_id: req.params.id}, {userid, detail})

    res.json({msg: "Update complete"})
  } catch (err){
    res.status(500).json({ error: err})
  }
}

export const deleteHistory = async(req, res) =>{
  try{
    await HistoryModel.findByIdAndDelete(req.params.id)
    res.json({msg: "Delete complete"})
  } catch (err){
    return res.status(500).json({msg: err.message})
  }
}

export const getHistoryById = async (req, res) => {
  try{
      const { userid } = req.body;
      const history = await HistoryModel.findById(userid);
      if(!user) return res.status(400).json({msg: "User history not exist."})
      res.status(200).json(history);
  }catch (err){
      res.status(500).json({ error: err});
  }
}
