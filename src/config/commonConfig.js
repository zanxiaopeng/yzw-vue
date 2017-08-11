export default {
    apiUrl: "http://localhost:3000",
    loginStoreName: "USERINFO",
    payState: {
        pendin_Payment: "00", //待支付
        already_Paid: "01", //已支付——待发货
        completed: "02", //已发货
        pending_evaluation: "03", //待评价
        canceled: "04",//已取消
        payStateWri(data) {
            let returnData = "";
            switch (data) {
                case "00":
                    returnData = "待支付";
                    break;
                case "01":
                    returnData = "待发货";
                    break;
                case "02":
                    returnData = "已发货";
                    break;
                case "03":
                    returnData = "待评价";
                    break;
                default:
                    returnData = "已取消";
            }
            return returnData;
        }
    }
}