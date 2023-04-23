const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebPageMain(url) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    let arr= {};
    const title = $('div[class="container-row container-grid container-col2"]>div[class="box"]>div[class="box-title"]>h3>a')
        .each((i,elm)=>{
            arr[$(elm).text()]=[]
        });
    const sport =  $('div[class="container-row container-grid section-sport"]>div[class="box"]>div[class="box-title"]>h3>a').text()
    arr[sport]=[]
    var path=$('div[class="box-content box-content-2c1r box-fixalignment"]>div[class="item"]>div[class=image]>a>img').each((i,elm)=>{
        var img=$(elm).attr('src');
        var data=$(elm).attr('alt');
        if (i<2){
            arr['مجتمع'].push({img:img,data:data})

        }else{
            arr['جريمة'].push({img:img,data:data})
        }
    });
    var count=0;
    const data=$('div[class="box-content box-content-2c1r box-fixalignment"]>div[class="item"]>div[class=image]>a').each((i,elm)=>{
        var link=$(elm).attr('href');
        if (i<2){
            arr['مجتمع'][i].link=link
        }else {
            arr['جريمة'][count].link=link
            count++

        }

    })

    var dd=$('div[class="container-row container-grid section-sport"]>div[class="box"]>div[class="box-content box-content-3c"]>div[class="item"]>div[class="image"]>a>img').each((i,elm)=>{
        var img=$(elm).attr('src');
        var data=$(elm).attr('alt');

        arr['رياضة'].push({img:img,data:data})


    });
    const ss=$('div[class="container-row container-grid section-sport"]>div[class="box"]>div[class="box-content box-content-3c"]>div[class="item"]>div[class="image"]>a').each((i,elm)=>{


        arr['رياضة'][i].link=$(elm).attr('href');


    })

    return arr


}
async function scrapeWebPageDeatils(url) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    let arr= {};
    const datam=$('div[itemprop="articleBody"]>div[id="articleText"]>div').text()
    const image=$('figure[class="poster"]>img').attr('src')
    arr.image=image
    arr.data=datam
    arr.title=$('h1').text()

    return arr


}

module.exports= {
    scrapeWebPageMain,
    scrapeWebPageDeatils
}