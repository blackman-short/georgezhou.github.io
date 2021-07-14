const TestData = {
    "operationName": "CreatePublishedFormEntry",
    "variables": {
        "input": {
            "formId": "uEQB9T",
            "entryAttributes": {
                "field_3": "wTJW",
                "field_1": [
                    {
                        "api_code": "5Yxp",
                        "scheduled_at": "2021-07-25T09:00:00+08:00",
                        "end_at": "2021-07-25T12:00:00+08:00", "number": 1
                    },
                    {
                        "api_code": "5Yxp",
                        "scheduled_at": "2021-07-25T13:30:00+08:00",
                        "end_at": "2021-07-25T17:30:00+08:00", "number": 1
                    }
                ],
                "field_2": "george",
                "field_4": "george@xdf.cn",
                "field_6": "质检教师"
            },
            "captchaData": null,
            "weixinAccessToken": null, "xFieldWeixinOpenid": null, "weixinInfo": null, "prefilledParams": "", "embedded": false, "internal": false, "backgroundImage": false, "formMargin": false, "hasPreferential": false, "fillingDuration": 88.572, "forceSubmit": false
        }
    },
    "extensions": {
        "persistedQuery": {
            "version": 1,
            "sha256Hash": "efc2acc4016c37a69da13ffda3d86f5d44d71748f01fc53844ce0f1a3c03d489"
        }
    }
};
let endTime = '';
let time = {
    D: '',
    M: '',
    h: '',
    m: '',
    s: ''
};

getReqData = () => {
    const reqBody = {
        "operationName": "CreatePublishedFormEntry",
        "variables": {
            "input": {
                "formId": "uEQB9T",
                "entryAttributes": {
                    "field_3": "wTJW",
                    "field_1": [
                        {
                            "api_code": "5Yxp",
                            "scheduled_at": `2021-${time.M}-${time.D}T09:00:00+08:00`,
                            "end_at": `2021-${time.M}-${time.D}T12:00:00+08:00`,
                            "number": 1
                        },
                        {
                            "api_code": "5Yxp",
                            "scheduled_at": `2021-${time.M}-${time.D}T13:30:00+08:00`,
                            "end_at": `2021-${time.M}-${time.D}T17:30:00+08:00`,
                            "number": 1
                        },
                        {
                            "api_code": "5Yxp",
                            "scheduled_at": `2021-${time.M}-${time.D}T09:00:00+08:00`,
                            "end_at": `2021-${time.M}-${time.D}T12:00:00+08:00`,
                            "number": 2
                        },
                        {
                            "api_code": "5Yxp",
                            "scheduled_at": `2021-${time.M}-${time.D}T13:30:00+08:00`,
                            "end_at": `2021-${time.M}-${time.D}T17:30:00+08:00`,
                            "number": 2
                        }
                    ],
                    "field_2": "李方宁",
                    "field_4": "lifangning3@xdf.cn",
                    "field_6": "质检初中部全体教师"
                },
                "captchaData": null,
                "weixinAccessToken": null, "xFieldWeixinOpenid": null, "weixinInfo": null, "prefilledParams": "", "embedded": false, "internal": false, "backgroundImage": false, "formMargin": false, "hasPreferential": false, "fillingDuration": 88.572, "forceSubmit": false
            }
        },
        "extensions": {
            "persistedQuery": {
                "version": 1,
                "sha256Hash": "efc2acc4016c37a69da13ffda3d86f5d44d71748f01fc53844ce0f1a3c03d489"
            }
        }
    };

    return reqBody;
}

getEndTime = () => {
    const date = new Date();
    endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 15} 00:00:05`;
    // endTime = `2021-7-29 00:00:05` 开始时间

    time.M = date.getMonth() + 1;
    if (time.M < 10) {
        time.M = `0${time.M}`;
    }
    time.D = date.getDate();
    if (time.D < 10) {
        time.D = `0${time.D}`;
    }
}

sendRequest = (data) => {
    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'https://jinshuju.net/graphql/f/uEQB9T');
    httpRequest.setRequestHeader("Content-Type", "application/json")
    httpRequest.send(JSON.stringify(data));

    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
}

countTime = () => {
    setInterval(() => {
        var date = (new Date(endTime)) - (new Date());
        if (date < 0) {
            sendRequest(TestData)
        } else {
           time.h = parseInt(date / 1000 / 60 / 60 % 24, 10);
           time.m = parseInt(date / 1000 / 60 % 60, 10);
           time.s = parseInt(date / 1000 % 60, 10);
           console.clear();
           console.log(`距离发送预约还剩：${time.h}小时${time.m}分钟${time.s}秒`);
        }
    }, 1000);
},

main = () => {
    getEndTime()
    countTime();
}

main()