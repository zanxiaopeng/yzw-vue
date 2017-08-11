import fetch from './fetch';
import axiosFetch from './axiosFetch';

export const getIndexBanner = () => axiosFetch('/index/getbanner');
export const getInexProList = (data) => axiosFetch('/index/getproductlist', data);
export const getProListAll = (data) => axiosFetch('/product/getproductlist', data);
export const getProListNew = (data) => axiosFetch('/product/getproductnewlist', data);
export const getProInfo = (data) => axiosFetch('/product/productinfo', data);
export const getProductAttr = (data) => axiosFetch('/product/productattr', data);
export const setCart = (data) => axiosFetch('/order/addcart', data, 'POST');
export const getLogin = (data) => axiosFetch('/account/login', data, 'POST');
export const getCartList = (data) => axiosFetch('/order/cartlist', data);
export const setCartChecked = (data) => axiosFetch('/order/selectedcart', data, 'POST');
export const delCart = (data) => axiosFetch('/order/delcart', data, 'POST');
export const getOrderCofim = (data) => axiosFetch('/order/getordercofim', data, 'POST');
export const setOrder = (data) => axiosFetch('/order/setorder', data, 'POST');
export const getAddressList = (data) => axiosFetch('/account/getaddresslist', data);
export const delAddress = (data) => axiosFetch('/account/deladdress', data, 'POST');
export const getAddressInfo = (data) => axiosFetch('/account/getaddressinfo', data);
export const getSysAddressData = (data) => axiosFetch('/common/getsysaddressdata', data);
export const addAddress = (data) => axiosFetch('/account/addaddress', data, 'POST');
export const updateAddress = (data) => axiosFetch('/account/updateaddress', data, 'POST');
export const getUserInfoMy = (data) => axiosFetch('/account/getuserinfomy', data);
export const getSmsCode = (data) => axiosFetch('/account/getsmscode', data, 'POST');
export const setRegiste = (data) => axiosFetch('/account/registe', data, 'POST');
export const Backpassword = (data) => axiosFetch('/account/backpassword',data,'POST');
export const getOrderList = (data) => axiosFetch('/order/getorderlist',data,'POST');
export const getOrderInfo = (data) => axiosFetch('/order/getorderinfo',data,'POST');
export const getExpressListInfo = (data) => axiosFetch('/common/getexpresslistinfo',data,'POST');