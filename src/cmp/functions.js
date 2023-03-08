const obj = {
    token: "5463908143:AAHNg9b9dPzOnRv53Qsh6uCEXXnvo3nDJzg",
    myFeel: "6050163237:AAG-MBbp5iNGVFwsozOl93goXnokQNNHrVc",
    partnerFeel: "6049250415:AAEQ8xfYCaYhO-wTX3I8qKJfaKVbDen1QVs"

}
const socialToken = ['45236d54d6mshc93d1793ed865acp1804d3jsn85233d493cdc', '465b564310mshc384aca2e281b2fp16902ajsn127bfb0ba489', 'e8a95bf804msh6896acedde80df4p1d7ceajsn4fb093fa5a51']
const sendMsg = async (msg, type) => {
    try {

        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({
                text: msg,
                disable_web_page_preview: false,
                disable_notification: false,
                chat_id: '1120121505'
            })
        };
        await fetch('https://api.telegram.org/bot' + obj[type] + '/sendMessage', options)
        return
    } catch (error) {
        return {
            status: false,
            msg: "something went wrong"
        }
    }
}
async function tokenValidate(url, defaultStart) {
    let options = {
        'method': 'GET',
        'headers': {
            'X-RapidAPI-Key': socialToken[defaultStart],//
            'X-RapidAPI-Host': 'socialdownloader.p.rapidapi.com'
        }
    };
    var data = await fetch(url, options)
    data = await data.json()
    console.log(data.message)
    if (data.hasOwnProperty('message') && data.message[0] === "Y") {
        console.log(socialToken.length, defaultStart + 1)
        if (socialToken.length > defaultStart + 1) {
            await tokenValidate(url, defaultStart + 1)
        }
        else return false
    }
    return data
}
const ytdwnld = async (link) => {
    try {
        console.log(link)
        const url = 'https://socialdownloader.p.rapidapi.com/api/youtube/video?video_link=' + link
        let data = await tokenValidate(url, 0)
        console.log(data)
        if (data === false)
            return {
                status: false,
                msg: "Today limit exceded"
            }
        if (data.ok === false)
            return {
                status: false,
                msg: "incorrect url"
            }
        data = data.body
        const quality = data.video_quality
        let video = []
        let audio = {}
        data['url'].map(x => {
            if (x.no_audio === false && quality.includes(x.quality))
                video.push({ url: x['url'], quality: x.quality })
            if (x.audioCodec === "opus")
                audio = { url: x['url'], quality: 'mp3' }
            return true
        });
        if (video.length === 0 && audio.length === 0)
            return {
                status: false,
                msg: "not found"

            }
        audio && video.push(audio)
        return {
            status: true,
            video: video,
            msg: "Success"
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            msg: error.message
        }
    }
}

const checkMsg = async (purpose) => {
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({ offset: -1, limit: 1, timeout: null })
    };

    let resp = await fetch('https://api.telegram.org/bot' + obj[purpose] + '/getUpdates', options)
    resp = await resp.json()
    console.log(resp)
    return resp.result[0].message.text
}



export { sendMsg, ytdwnld, checkMsg }