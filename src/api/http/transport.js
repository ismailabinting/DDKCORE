const constants = require('../../helpers/constants');
const Router = require('../../helpers/router');
const httpApi = require('../../helpers/httpApi');
const schema = require('../../schema/transport');

/**
 * Binds api with modules and creates common url.
 * - End point: `/peer`
 * - Private API:
 *    - get    /blocks/common
 *    - get    /blocks
 *    - get    /list
 *    - get    /height
 *    - get    /ping
 *    - get    /signatures
 *    - get    /transactions
 *    - post    /dapp/message
 *    - post    /dapp/request
 *    - post    /blocks
 *    - post    /signatures
 *    - post    /transactions
 * @memberof module:transport
 * @requires helpers/Router
 * @requires helpers/httpApi
 * @constructor
 * @param {Object} transportModule - Module transport instance.
 * @param {scope} app - Network app.
 * @param {function} logger
 */
// Constructor
function TransportHttpApi(transportModule, app, logger) {
    const router = new Router();

    router.use(httpApi.middleware.attachResponseHeaders.bind(null, transportModule.headers));
    router.use(httpApi.middleware.blockchainReady.bind(null, transportModule.isLoaded));

    router.use(handshakeMiddleware);

    router.get('/blocks/common', getCommonBlocksMiddleware);
    router.get('/blocks', httpApi.middleware.sanitize('query', schema.blocks, transportModule.internal.blocks));

    router.map(transportModule.internal, {
        'get /list': 'list',
        'get /height': 'height',
        'get /ping': 'ping',
        'get /signatures': 'getSignatures',
        'get /transactions': 'getTransactions',
        'post /dapp/message': 'postDappMessage',
        'post /dapp/request': 'postDappRequest'

    });

    // Custom parameters internal functions
    router.post('/blocks', (req, res) => {
        transportModule.internal.postBlock(req.body.block, req.peer, `${req.method} ${req.url}`, httpApi.respond.bind(null, res));
    });

    router.post('/signatures', (req, res) => {
        transportModule.internal.postSignatures({
            signatures: req.body.signatures,
            signature: req.body.signature
        }, httpApi.respond.bind(null, res));
    });

    router.post('/transactions', (req, res) => {
        transportModule.internal.postTransactions({
            transactions: req.body.transactions,
            transaction: req.body.transaction
        }, req.peer, `${req.method} ${req.url}`, httpApi.respond.bind(null, res));
    });

    router.use(httpApi.middleware.notFound);

    app.use('/peer', router);

    function handshakeMiddleware(req, res, next) {
        transportModule.internal.handshake(req.ip, req.headers.port, req.headers, validateHeaders, (err, peer) => {
            if (err) {
                return res.status(500).send(err);
            }

            req.peer = peer;

            if (req.body && req.body.dappid) {
                req.peer.dappid = req.body.dappid;
            }
            return next();
        });

        function validateHeaders(headers, cb) {
            headers.port = constants.app.port;
            headers.nethash = constants.nethash;
            // FIXME: (???) actual "npm_package_version": "0.9.9-a", != '0.9.9a'
            headers.version = '0.9.9a';
            return req.sanitize(headers, schema.headers, (err, report) => {
                if (err) {
                    return cb(err.toString());
                } else if (!report.isValid) {
                    return cb(report.issues);
                }

                return cb();
            });
        }
    }

    function getCommonBlocksMiddleware(req, res, next) {
        req.sanitize(req.query, schema.commonBlock, (err, report, query) => {
            if (err) {
                logger.debug('Common block request validation failed', { err: err.toString(), req: req.query });
                return next(err);
            }
            if (!report.isValid) {
                logger.debug('Common block request validation failed', { err: report, req: req.query });
                return res.json({ success: false, error: report.issues });
            }

            return transportModule.internal.blocksCommon(query.ids, req.peer, `${req.method} ${req.url}`, httpApi.respond.bind(null, res));
        });
    }
}

module.exports = TransportHttpApi;

/** ************************************* END OF FILE ************************************ */
