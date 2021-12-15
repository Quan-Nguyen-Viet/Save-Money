import { SavingModel } from "../models/savingModel.js";
import { UserModel } from "../models/userModel.js";

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
        const user = await UserModel.findById(newSaving.userID);

        if(user.balanced < newSaving.balanced) return next(); //kiem tra so du tai khoan voi so tien gui
        
        const usernewBalanced = user.balanced - newSaving.balanced;
        let updateUser = await UserModel.findByIdAndUpdate({_id: newSaving.userID}, { balanced: usernewBalanced}, { new: true }); //update so du tai khoan
        const saving = new SavingModel(newSaving);
        await saving.save();

        saving.newbalanced = usernewBalanced;

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


export const withdrawSaving =  async (req, res) => {
    try {
        const savingid = req.body;
        console.log('test', savingid);
        const getsaving =  await SavingModel.findOne({_id: req.body._id});

        var interestRate = 0;
        // % lai suat
        switch(getsaving.duration){
            case 30:
                interestRate = 0.03;
                break;
            case 90:
                interestRate = 0.033;
                break;
            case 180:
                interestRate = 0.04;
                break;
            case 270:
                interestRate = 0.04;
                break;
            case 360:
                interestRate = 0.055;
                break;
            default: 
                interestRate = 0.053;

        }
        const date = Math.floor((((new Date()).getTime() + 864000000) - getsaving.inContract)/86400000);
        const cycles = Math.floor(date/getsaving.duration);
        var bonusRate = 0.015*(cycles-1);
        if (bonusRate < 0) { 
            bonusRate = 0;
        }
        var finalRate =  interestRate + bonusRate;
        if (finalRate > 0.055) {
            finalRate = 0.055;
        }
        const termBalanced = getsaving.balanced * (finalRate)*(getsaving.duration*cycles)/360;
        const unlimitBalanced = getsaving.balanced * ((date - getsaving.duration * cycles) *0.015 / 360);
        const withdrawBalance = getsaving.balanced + termBalanced + unlimitBalanced;
        console.log('cycles', cycles);
        console.log('termbalanced', termBalanced);
        console.log('unbalanced', unlimitBalanced);
        console.log('withdrawbalanced', withdrawBalance);

        const updateSaving = await SavingModel.findByIdAndUpdate(getSaving._id ,
            {
                balancedWithdrawed: withdrawBalance,
                status: 0,
                stopDate: Date.now(),
            },
            { new: true }
        );
        // const saving = await SavingModel.findByIdAndUpdate(
        //     { _id: savingid },
        //     {

        //     },
        //     { new: true}
        // );
        const updateBalanced = await UserModel.findByIdAndUpdate(getSaving.userID,
            { balanced: updateBalanced.balanced + withdrawBalance },
            { new: true });

        updateSaving.userNewBalaned = updateBalanced.balanced;    
        res.status(200).json(updateSaving);
        
        
    } catch (err) {
        res.status(500).json({error: err});
        
    }
}
