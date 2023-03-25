// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract ChatRecord {
    address public admin;

    struct Chat {
        address sender; //sender's VaultID.
        string message;
    }
    mapping(bytes32 => Chat[]) private chatRecords;

    modifier onlyAdmin() {
        if (msg.sender != admin && admin != address(0)) revert("onlyAdmin");
        _;
    }

    constructor() {
        admin = address(0);
    }

    function newChat(
        bytes32 _hash,
        address _sender,
        string calldata _message
    ) external onlyAdmin {
        chatRecords[_hash].push(Chat(_sender, _message));
    }

    function readChat(
        bytes32 _hash
    ) external view onlyAdmin returns (Chat[] memory) {
        return chatRecords[_hash];
    }

    /**
     * @param _newAdmin address(0): Public, address(x): Restrict to x.
     */
    function setAdmin(address _newAdmin) external onlyAdmin {
        admin = _newAdmin;
    }
}
