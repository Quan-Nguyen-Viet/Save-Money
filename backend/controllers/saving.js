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

export const getallSavingbyUserID = async (req, res) => {
    try{
        const getuserid = req.body;
        console.log('userid',getuserid.userID);
        const savings = await SavingModel.find({ userID: getuserid.userID });
        console.log('saving', savings);
        res.status(200).json(savings);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export const cycleCheckSaving = async (req, res) => {
    try {
        const newSaving = req.body;
        const saving = await SavingModel.findByIdAndUpdate(
            { _id: newSaving._id },
            newSaving,
            { new: true}
        );
        

        res.status(200).json(saving);
        
        
    } catch (err) {
        res.status(500).json({error: err});
        
    }
};

export const withdrawSaving =  async (req, res) => {
    try {
        const savingid = req.body;
        console.log('test', savingid);
        const getsaving =  await SavingModel.findOne({_id: req.body._id});
        const date = Math.floor((((new Date()).getTime() + 864000000) - getsaving.inContract)/86400000);
        const cycles = Math.floor(date/getsaving.duration);
        var bonusRate = 0.015*(cycles-1);
        if (bonusRate < 0) { 
            bonusRate = 0;
        }
        const termBalanced = getsaving.balanced * (0.035 + bonusRate)*(getsaving.duration*cycles)/360;
        const unlimitBalanced = getsaving.balanced * ((date - getsaving.duration * cycles) *0.015 / 360);
        const withdrawBalance = getsaving.balanced + termBalanced + unlimitBalanced;
        console.log('cycles', cycles);
        console.log('termbalanced', termBalanced);
        console.log('unbalanced', unlimitBalanced);
        console.log('withdrawbalanced', withdrawBalance);

        // const saving = await SavingModel.findByIdAndUpdate(
        //     { _id: savingid },
        //     {

        //     },
        //     { new: true}
        // );
        

        res.status(200).json(getsaving);
        
        
    } catch (err) {
        res.status(500).json({error: err});
        
    }
}
