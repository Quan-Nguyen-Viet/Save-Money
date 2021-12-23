import { SavingModel } from "../models/savingModel.js";
import { UserModel } from "../models/userModel.js";
import { HistoryModel } from "../models/historyModel.js"

export const getSaving = async (req, res) => { //lấy tất cả sổ
    try{
        const savings = await SavingModel.find();
        
        //console.log('length', Object.keys(savings).length);
        var convertedJSON = JSON.parse(JSON.stringify(savings)); //convert data để chèn thêm trường
        for(var i = 0; i < (Object.keys(savings).length); i++  ) {
            var userInfo = await UserModel.findById(savings[i].userID);
            if(userInfo != null){
                //console.log("name", userInfo.name);
                convertedJSON[i].name = userInfo.name; //thêm tên user cho mỗi sổ
            }
        };
        res.status(200).json(convertedJSON);

    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const createSaving = async (req, res) => {
    try {
        const newSaving = req.body;
        const user = await UserModel.findById(newSaving.userID);

        if(user.balanced < newSaving.balanced) return res.status(500).json({error: 'Số dư không đủ'}); //kiem tra so du tai khoan voi so tien gui
        
        const usernewBalanced = user.balanced - newSaving.balanced; //số tiền của user sau khi tạo sổ
        //console.log("newuserblanced: ", usernewBalanced);
        let updateUser = await UserModel.findByIdAndUpdate({_id: newSaving.userID}, { balanced: usernewBalanced}, { new: true }); //update so du tai khoan
        const saving = new SavingModel(newSaving);
        await saving.save(); //save saving vào DB

        var convertedJSON = JSON.parse(JSON.stringify(saving));
        convertedJSON.userBalanced = usernewBalanced;
        const history = { //tạo history
            userid: user._id,
            detail: `Bạn đã tạo một sổ tiết kiệm online với số tiền ${newSaving.balanced} với thời hạn ${convertedJSON.duration/30} tháng`
        }
        const saveHistory = new HistoryModel(history);
        await saveHistory.save(); //save history
        console.log('history', saveHistory);
        res.status(200).json(convertedJSON);
        
    } catch (err) {
        res.status(500).json({error: err});
        
    }
};

export const getallSavingbyUserID = async (req, res) => {
    try{
        const getuserid = req.body;
        //console.log('userid',getuserid.userID);
        const savings = await SavingModel.find({ userID: getuserid.userID });
        //console.log('saving', savings);
        res.status(200).json(savings);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export const getSavingBySavingID = async (req, res) => {
    try{
        const savingid = req.body;
        var getsaving =  await SavingModel.findOne({_id: savingid._id});
        console.log('saving', getsaving);

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
        const date = Math.floor((((new Date()).getTime()) - getsaving.inContract)/86400000); //tính thời gian đã gữi của sổ milliseconds
        const cycles = Math.floor(date/getsaving.duration); //tính chu kỳ của sổ
        var bonusRate = 0.0015*(cycles-1); // +0.15% từ chu kỳ 2 trở đi
        if (bonusRate < 0) {  
            bonusRate = 0;
        }
        var finalRate =  interestRate + bonusRate; //lãi suât cuối cùng
        if (finalRate > 0.055) {
            finalRate = 0.055;
        }
        //console.log("finalRate: ", finalRate);
        const termBalanced = getsaving.balanced * (finalRate)*(getsaving.duration*cycles)/360; //lãi kỳ hạn
        const unlimitBalanced = getsaving.balanced * ((date - getsaving.duration * cycles) *0.015 / 360); //lãi không kỳ hạn
        const withdrawBalance = getsaving.balanced + termBalanced + unlimitBalanced; //tổng số tiền nếu rút
        //console.log('cycles', cycles);
        //console.log('termbalanced', termBalanced);
        //console.log('unbalanced', unlimitBalanced);
        //console.log('withdrawbalanced', withdrawBalance);

        var convertedJSON = JSON.parse(JSON.stringify(getsaving));

        convertedJSON.termBalanced = termBalanced;
        convertedJSON.unlimitBalanced = unlimitBalanced;
        convertedJSON.cycles = cycles;
        console.log("checkadd", convertedJSON.termBalanced);
        res.status(200).json(convertedJSON);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}


export const withdrawSaving =  async (req, res) => {
    try {
        const savingid = req.body;
        //console.log('test', savingid);
        const getsaving =  await SavingModel.findOne({_id: savingid._id});
        if(getsaving.status != 1) return res.status(500).json({error: 'Sổ đã rút'});
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
        const date = Math.floor((((new Date()).getTime() + 32154000000) - getsaving.inContract)/86400000);
        const cycles = Math.floor(date/getsaving.duration);
        var bonusRate = 0.0015*(cycles-1);
        if (bonusRate < 0) { 
            bonusRate = 0;
        }
        var finalRate =  interestRate + bonusRate;
        if (finalRate > 0.055) {
            finalRate = 0.055;
        }
        console.log("finalRate: ", finalRate);
        const termBalanced = getsaving.balanced * (finalRate)*(getsaving.duration*cycles)/360;
        const unlimitBalanced = getsaving.balanced * ((date - getsaving.duration * cycles) *0.015 / 360);
        const withdrawBalance = getsaving.balanced + termBalanced + unlimitBalanced;
        console.log('cycles', cycles);
        console.log('termbalanced', termBalanced);
        console.log('unbalanced', unlimitBalanced);
        console.log('withdrawbalanced', withdrawBalance);

        const updateSaving = await SavingModel.findByIdAndUpdate(getsaving._id ,
            {
                balancedWithdrawed: withdrawBalance,
                status: 0,
                stopDate: Date.now(),
            },
            { new: true }
        );
        console.log("checkpoint");
        // const saving = await SavingModel.findByIdAndUpdate(
        //     { _id: savingid },
        //     {

        //     },
        //     { new: true}
        // );
        const userInfo = await UserModel.findById(getsaving.userID);
        //console.log("checkpoint", getsaving.userID);
        const userNewBalanced = userInfo.balanced + withdrawBalance;
        //console.log("checkpoint", userNewBalanced);
        const updateBalanced = await UserModel.findByIdAndUpdate(getsaving.userID,
            { balanced: userNewBalanced },
            { new: true }
        );

        var convertedJSON = JSON.parse(JSON.stringify(updateSaving));

        convertedJSON.termBalanced = termBalanced;
        convertedJSON.unlimitBalanced = unlimitBalanced;
        convertedJSON.cycles = cycles;
        console.log("checkpoint");

        const history = {
            userid: userInfo._id,
            detail: `Bạn đã rút sổ tiết kiệm ${convertedJSON.balanced}, ${convertedJSON.duration/30} tháng. Bạn đã gữi được ${convertedJSON.cycles} chu kỳ và tổng số tiền là ${convertedJSON.balancedWithdrawed}`
        };
        const saveHistory = new HistoryModel(history);
        await saveHistory.save();
        console.log('history', saveHistory);

        res.status(200).json(convertedJSON);
        
        
    } catch (err) {
        res.status(500).json({error: err});
        
    }
}
