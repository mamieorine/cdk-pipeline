'use strict';
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    const token = event.authorizationToken;
    const signature = process.env.JWT_SIGNATURE;

    console.log(`JWT signature: ${signature}`);

    let decoded = null;
    jwt.verify(token, signature, (err, decodedToken) => {
      if (err) {
        throw new Error("The signature is invalid");
      }
      decoded = decodedToken;
    });

    if (!decoded) {
      throw new Error("invalid token");
    }

    const company = decoded.company;
    const owner = decoded.owner;
    const role = decoded.role;

    let isAuthorized = false;
    let deniedFields = [];

    if (role === 'admin') {
      isAuthorized = true;
    } else if (role === 'standard') {
      isAuthorized = true;
      deniedFields = [
        "Mutation.createBilling",
        "Mutation.updateBilling",
        "Mutation.deleteBilling",
        "Mutation.deleteUser",
      ]
    } else if (role === 'financial') {
      isAuthorized = true;
      deniedFields = [
        "Mutation.deleteUser",
      ]
    }
    
    const response = {
      isAuthorized: isAuthorized,
      resolverContext: {
        userSub: owner,
        userName: event.userName,
        userCompany: company,
        userRole: role
      },
      deniedFields: deniedFields,
      ttlOverride: 300
    };

    console.log(`response >`, JSON.stringify(response, null, 2));
    return response;

  } catch (error) {
    console.log({ error });

    return { isAuthorized: false };
  }
};