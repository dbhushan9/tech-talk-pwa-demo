import axios from "axios";
import { bufferDecode, bufferEncode } from "../../utils/utils";

const WEBAUTHN_URL =
  process.env.REACT_APP_WEBAUTHN_URL || "http://localhost:8000";

export const beginRegistration = (username) => {
  return axios
    .get(`${WEBAUTHN_URL}/webauthn/register/begin/${username}`)
    .then((res) => {
      console.log(res);
      let credentialCreationOptions = res.data.data;
      console.log(credentialCreationOptions);
      credentialCreationOptions.publicKey.challenge = bufferDecode(
        credentialCreationOptions.publicKey.challenge
      );
      credentialCreationOptions.publicKey.user.id = bufferDecode(
        credentialCreationOptions.publicKey.user.id
      );
      if (credentialCreationOptions.publicKey.excludeCredentials) {
        // credentialCreationOptions.publicKey.excludeCredentials.forEach(
        //   (cred) => (cred.id = bufferDecode(cred.id))
        // );
        for (
          let i = 0;
          i < credentialCreationOptions.publicKey.excludeCredentials.length;
          i++
        ) {
          credentialCreationOptions.publicKey.excludeCredentials[i].id =
            bufferDecode(
              credentialCreationOptions.publicKey.excludeCredentials[i].id
            );
        }
      }
      return navigator.credentials.create({
        publicKey: credentialCreationOptions.publicKey,
      });
    })
    .catch(function (error) {
      console.error(error);
      return Promise.reject(error);
    });
};

export const endRegistration = (username, credential) => {
  console.log(credential);
  let attestationObject = credential.response.attestationObject;
  let clientDataJSON = credential.response.clientDataJSON;
  let rawId = credential.rawId;
  const bodyData = JSON.stringify({
    id: credential.id,
    rawId: bufferEncode(rawId),
    type: credential.type,
    response: {
      attestationObject: bufferEncode(attestationObject),
      clientDataJSON: bufferEncode(clientDataJSON),
    },
  });

  return axios
    .post(`${WEBAUTHN_URL}/webauthn/register/end/${username}`, bodyData)
    .then((res) => {
      console.log(res);
      return Promise.resolve(res);
    })
    .catch(function (error) {
      console.error(error);
      return Promise.reject(error);
    });
};

export const beginLogin = (username) => {
  return axios
    .get(`${WEBAUTHN_URL}/webauthn/login/begin/${username}`)
    .then((res) => {
      console.log(res);
      let credentialRequestOptions = res.data.data;
      console.log(credentialRequestOptions);
      credentialRequestOptions.publicKey.challenge = bufferDecode(
        credentialRequestOptions.publicKey.challenge
      );
      credentialRequestOptions.publicKey.allowCredentials.forEach(function (
        listItem
      ) {
        listItem.id = bufferDecode(listItem.id);
      });

      return navigator.credentials.get({
        publicKey: credentialRequestOptions.publicKey,
      });
    })
    .catch(function (error) {
      console.error(error);
      return Promise.reject(error);
    });
};

export const endLogin = (username, assertion) => {
  console.log(assertion);
  let authData = assertion.response.authenticatorData;
  let clientDataJSON = assertion.response.clientDataJSON;
  let rawId = assertion.rawId;
  let sig = assertion.response.signature;
  let userHandle = assertion.response.userHandle;
  const bodyData = JSON.stringify({
    id: assertion.id,
    rawId: bufferEncode(rawId),
    type: assertion.type,
    response: {
      authenticatorData: bufferEncode(authData),
      clientDataJSON: bufferEncode(clientDataJSON),
      signature: bufferEncode(sig),
      userHandle: bufferEncode(userHandle),
    },
  });

  return axios
    .post(`${WEBAUTHN_URL}/webauthn/login/end/${username}`, bodyData)
    .then((res) => {
      console.log(res);
      return Promise.resolve(res);
    })
    .catch(function (error) {
      console.error(error.response.data);
      return Promise.reject(error);
    });
};
