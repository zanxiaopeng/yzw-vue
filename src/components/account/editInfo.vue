<template>
    <section class="editinfobox">
        <div class="editinfolist clearfix font-xiti">
            <span>头像</span>
            <span>
                <img src="images/touxiangher.png">
                <i class="iconfont">&#xe65f;</i>
            </span>
        </div>
        <div class="listinfomy font-xiti">
            <ul>
                <li class="clearfix">
                    <span>姓名</span>
                    <span>
                        <input type="text" value="我是一个放羊娃">
                        <i class="iconfont">&#xe65f;</i>
                    </span>
                </li>
                <li class="clearfix">
                    <span>性别</span>
                    <span>
                        <select class="sexselct">
                            <option value="0" selected>男</option>
                            <option value="1">女</option>
                        </select>
                        <i class="iconfont">&#xe65f;</i>
                    </span>
                </li>
                <li class="clearfix">
                    <span>手机号</span>
                    <span>
                        <input type="text" disabled="disabled" value="157****9446">
                    </span>
                </li>
                <li class="clearfix">
                    <span>生日</span>
                    <span>
                        <input type="text" value="1991-02-02">
                        <i class="iconfont">&#xe65f;</i>
                    </span>
                </li>
            </ul>
        </div>
        <span class="editinfobtn">保存</span>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.editinfobox {
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    position: fixed;
    z-index: 100;
    top: 0px;
    left: 0px;
    .editinfolist {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: #666;
        background: #fff;
        padding: 0px 10px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        span {
            display: block;
            float: left;
        }

        span:nth-child(1) {
            width: 40%;
        }

        span:nth-child(2) {
            width: 60%;
            text-align: right;
            padding-top: 7px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            position: relative;
            img {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                margin-right: 20px;
            }
            i {
                font-size: 17px;
                display: block;
                position: absolute;
                right: 0px;
                top: 2px;
                color: #666;
            }
        }
    }
    .listinfomy {
        width: 100%;
        background: #fff;
        margin-top: 10px;
        ul {
            width: 100%;
            li {
                width: 100%;
                height: 50px;
                line-height: 50px;
                font-size: 14px;
                border-bottom: 1px solid #ddd;
                padding: 0px 10px;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                color: #666;
                span {
                    display: block;
                    float: left;
                    height: 100%;
                }
                span:nth-child(1) {
                    width: 40%;
                }
                span:nth-child(2) {
                    width: 60%;
                    text-align: right;
                    padding-top: 0px;
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    position: relative;
                    input {
                        width: 100%;
                        height: 44px;
                        line-height: 44px;
                        text-align: right;
                        padding-right: 20px;
                        box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        color: #666;
                    }
                    i {
                        font-size: 17px;
                        display: block;
                        position: absolute;
                        right: 0px;
                        top: 2px;
                        color: #666;
                    }
                }
            }
        }
    }
    .editinfobtn {
        width: 300px;
        margin: 0 auto;
        margin-top: 50px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background: #c79f62;
        border-radius: 5px;
        display: block;
    }
}

select.sexselct {
    font-size: 15px;
    color: #666;
    border: 0px;
    margin-right: 20px;
}
</style>


