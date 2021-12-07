import { HistoryModel } from "../models/histotyModel.js"

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
      const newHistory = req.body;
      const history = new HistoryModel(newHistory);
      await history.save();
      res.status(200).json(history);
  } catch (err) {
      res.status(500).json({ error: err});
  }
}