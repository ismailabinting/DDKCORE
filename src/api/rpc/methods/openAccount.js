const { createServerRPCMethod, mnemonicValidator } = require('../util');


module.exports = createServerRPCMethod(
    'OPEN_ACCOUNT',

    /**
     * @param {WebSocketServer} wss
     * @param {object} params
     * @param {object} scope - Application instance
     */
    (wss, params, scope) => new Promise((resolve) => {
        const secret = params.secret;

        if (mnemonicValidator(secret)) {
            scope.modules.accounts.shared.open({ body: params }, (error, result) => {
                resolve(error ? { error } : result);
            });
        } else {
            resolve({ error: 'Mnemonic is not valid!' });
        }
    }));
