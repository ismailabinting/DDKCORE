const env = process.env;
const envConstants = require('../config/env');
const devConstants = require('../config/default/constants');
const testConstants = require('../config/testnet/constants');
const mainConstants = require('../config/mainnet/constants');

const constants = {
    NODE_ENV_IN: env.NODE_ENV_IN,
    PREVIOUS_DELEGATES_COUNT: 3,
    MASTER_NODE_MIGRATED_BLOCK: 0,
    CURRENT_BLOCK_VERSION: 1,
    // Block verify
    VERIFY_BLOCK_VERSION: true,
    VERIFY_BLOCK_SIGNATURE: true,
    VERIFY_BLOCK_ID: true,
    VERIFY_BLOCK_PAYLOAD: true,
    PAYLOAD_VALIDATE: {
        MAX_LENGTH: true,
        MAX_TRANSACTION_LENGTH: true,
        MAX_TRANSACTION_IN_BLOCK: true,
        MAX_TRANSACTION_DUPLICATE: true,
        INVALID_HASH: true,
        TOTAL_AMOUNT: true,
        TOTAL_FEE: true,
    },
    VERIFY_INVALID_BLOCK_TIMESTAMP: true,
    VERIFY_PREVIOUS_BLOCK: true,
    VERIFY_AGAINST_LAST_N_BLOCK_IDS: true,
    VERIFY_BLOCK_FORK_ONE: true,
    VERIFY_BLOCK_REWARD: true,
    VERIFY_BLOCK_SLOT: false,
    VERIFY_BLOCK_SLOT_WINDOW: true,
    VALIDATE_BLOCK_SLOT: false,

    // Delegates transaction verify
    VERIFY_DELEGATE_TRS_RECIPIENT: true,
    VERIFY_DELEGATE_TRS_AMOUNT: true,
    VERIFY_DELEGATE_TRS_IS_DELEGATE: true,
    VERIFY_DELEGATE_TRS_U_IS_DELEGATE: true,
    VERIFY_DELEGATE_TRS_ASSET: true,
    VERIFY_DELEGATE_USERNAME: true,
    VERIFY_DELEGATE_USERNAME_LOWERCASE: true,
    VERIFY_DELEGATE_EMPTY_USERNAME: true,
    VERIFY_DELEGATE_USERNAME_LENGTH: true,
    VERIFY_DELEGATE_USERNAME_ALPHANUMERIC_CHARACTERS: true,

    VOTE_VALIDATION_ENABLED: {
        INVALID_RECIPIENT: true,
        INVALID_TRANSACTION_ASSET: true,
        INVALID_VOTES_MUST_BE_ARRAY: true,
        INVALID_VOTES_EMPTY_ARRAY: true,
        VOTING_LIMIT_EXCEEDED: true,
        INVALID_VOTE_AT_INDEX: true,
        MULTIPLE_VOTES_FOR_SAME_DELEGATE: true,
        VOTE_REWARD_CORRUPTED: true,
        VOTE_UNSTAKE_CORRUPTED: true,
        PAYLOAD_HASH: true,
        VOTE_AIRDROP_CORRUPTED: true,
    },
    STAKE_VALIDATE: {
        AMOUNT_ENABLED: true,
        BALANCE_ENABLED: true,
        AIRDROP_ENABLED: true,
    },
    REWARD_VALIDATE: {
        RECIPIENT_ID_ENABLED: true,
        TRANSACTION_AMOUNT_ENABLED: true,
        REWARD_PER_ENABLED: true,
    },
    SEND_TRANSACTION_VALIDATION_ENABLED: {
        AMOUNT: true,
        RECIPIENT_ID: true
    },
    REFERRAL_TRANSACTION_VALIDATION_ENABLED: {
        GLOBAL_ACCOUNT: true
    },
    SIGNATURE_TRANSACTION_VALIDATION_ENABLED: {
        SIGNATURE: true,
        AMOUNT: true,
        PUBLIC_KEY: true
    },
    SENDSTAKE_VERIFICATION: {
        VERIFY_RECIPIENT_ID_ENABLED: true,
        VERIFY_BALANCE_ENABLED: true,
        VERIFY_ACTIVE_FROZE_ORDER_EXIST_ENABLED: true,
        VERIFY_ACTIVE_FROZE_ORDER_TRANSFERCOUNT_ENABLED: true

    },
    TRANSACTION_VALIDATION_ENABLED: {
        SENDER: true,
        TYPE: true,
        SECOND_SIGNATURE: true,
        SENDER_SECOND_SIGNATURE: true,
        REQUEST_SECOND_SIGNATURE: true,
        CHECKING_REQUEST_SECOND_SIGNATURE: true,
        SENDER_PUBLIC_KEY: true,
        SENDER_GENESIS_ACCOUNT: true,
        SENDER_ADDRESS: true,
        KEYSGROUP_MEMBER: true,
        MULTISIGNATURE_GROUP: true,
        VERIFY_TRANSACTION_SIGNATURE: true,
        VERIFY_TRANSACTION_SECOND_SIGNATURE: true,
        VERIFY_TRANSACTION_SIGNATURE_UNIQUE: true,
        VERIFY_TRANSACTION_MULTISIGNATURE: true,
        VERIFY_TRANSACTION_FEE: false,
        VERIFY_TRANSACTION_AMOUNT: true,
        VERIFY_SENDER_BALANCE: true,
        VERIFY_TRANSACTION_TIMESTAMP: true,
        VERIFY_TRANSACTION_TYPE: true,
        VERIFY_TRANSACTION_CONFIRMED: true,
    },
    BROADHASH_VALIDATION_ENABLED: true,
    ONLY_FROZEN_PEERS_ENABLED: true,
    DEFAULT_USERS: {
        DDK4995063339468361088: 'DSTAKEREWARD',
        DDK15546849747111093123: 'DPENDINGGB',
        DDK5143663806878841341: 'DCONTRIBUTOR',
        DDK14224602569244644359: 'DADVISOR',
        DDK9758601670400927807: 'DTEAM',
        DDK12671171770945235882: 'DFOUNDER',
        DDK10720340277000928808: 'DAIRDROP',
        DDK5216737955302030643: 'DRESERVEDEX',
        DDK8999840344646463126: 'DPREORDERDNC',
        DDK7214959811294852078: 'DBOUNTY',
    },
    TRANSACTION_QUEUE_EXPIRE: 60 * 5
};

Object.assign(constants, envConstants);

if (env.NODE_ENV_IN === 'development') {
    Object.assign(constants, devConstants);
}

// For staging environment
if (env.NODE_ENV_IN === 'testnet') {
    Object.assign(constants, testConstants);
}

// For production
if (env.NODE_ENV_IN === 'mainnet') {
    Object.assign(constants, mainConstants);
}

module.exports = constants;
