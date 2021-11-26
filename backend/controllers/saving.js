import { SavingModel } from "../models/savingModel.js";

export const getSaving = async (req, res) => {
    try{
        const savings = await SavingModel.find();
        console.log('saving', savings);
        res.status(200).json(savings);

    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const createSaving = async (req, res) => {
    try {
        const newSaving = req.body;
        const saving = new SavingModel(newSaving);
        await saving.save();
        res.status(200).json(saving);
        
    } catch (err) {
        res.status(500).json({error: err});
        
    }
};

