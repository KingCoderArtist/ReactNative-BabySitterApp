import Url from '../Base_Url/Base_Url';
import AsyncStorage from '@react-native-community/async-storage';

export let User_Login = async (End_Points, Data) => {
  return fetch(`${Url.BASE_URL}/${End_Points}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(Data),
  });
};

export let Company_SignUp = async (End_Points, Data) => {
  console.log(Data);
  return fetch(`${Url.BASE_URL}/${End_Points}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(Data),
  });
};

export let Sitter_SignUp = async (End_Points, Data) => {
 
  const data = new FormData();

  for (let key in Data) {
    data.append(key, Data[key]);
  }

  console.log('data:', data);

  return fetch(`${Url.BASE_URL}/${End_Points}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });
};

export let POST = async (End_Points, Data, type = '') => {
  let formData = new FormData();
  let token = await AsyncStorage.getItem('token');
  for (let key in Data) {
    formData.append(key, formData[key]);
  }
  return fetch(`${Url.BASE_URL}/${End_Points}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
    body: type == 'raw' ? JSON.stringify(Data) : data,
  });
};

export let GET = async (End_Points, Data, type = '') => {
  console.log(Data, type, 'gjghgh')
  let formData = new FormData();
  let token = await AsyncStorage.getItem('token');
  for (let key in Data) {
    formData.append(key, formData[key]);
  }
  return fetch(`${Url.BASE_URL}/${End_Points}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
    body: type == 'raw' ? JSON.stringify(Data) : data,
  });
};


export let Common_Get = async (End_Points) => {
    let token = await AsyncStorage.getItem('token');
    return fetch(`${Url.BASE_URL}/${End_Points}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
}

export let Common_Post = async (End_Points, Data) => {
    let token = await AsyncStorage.getItem('token');
    return fetch(`${Url.BASE_URL}/${End_Points}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body:JSON.stringify(Data)
      });
}

export let Common_Put = async (End_Points, Data) => {
  let formData = new FormData();
  let token = await AsyncStorage.getItem('token');
  for (let key in Data) {
    formData.append(key, formData[key]);
  }
  return fetch(`${Url.BASE_URL}/${End_Points}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(Data),
  });
};


export let Verify_Otp = async (End_Points, Data) => {
  console.log("Here3!");
  console.log(`${Url.BASE_URL}/${End_Points}/${Data.otp}`);
  return fetch(`${Url.BASE_URL}/${End_Points}/${Data.otp}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
};

export let Reset_Password = async (End_Points, Data) => {
  return fetch(`${Url.BASE_URL}/${End_Points}/${Data.otp}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body:JSON.stringify({password:Data.password})
  });
};
