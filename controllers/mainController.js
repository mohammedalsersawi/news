const {scrapeWebPageMain,scrapeWebPageDeatils}=require('../ulits/scraperMain')

const getDataMain=(req,res)=>{
    const url = 'https://www.alwatanvoice.com/arabic/index.html';
    const category =  req.params.category;
    scrapeWebPageMain(url ,category)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => console.error(error));
}
const getDatadetails=(req,res)=>{
    const url = `https://www.alwatanvoice.com/arabic/${req.body.url}`;

    scrapeWebPageDeatils(url)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => console.error(error));
}

module.exports={
    getDataMain,
    getDatadetails
}