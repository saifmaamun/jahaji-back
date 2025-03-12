"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    // Extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);
    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `E11000 duplicate key error collection: jahaji.users index: email_1 dup key: { email: ${extractedMessage}}`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: `E11000 duplicate key error collection: jahaji.users index: email_1 dup key: { email: ${extractedMessage}}`,
        errorSources,
    };
};
exports.default = handleDuplicateError;
