// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Upload {
    struct Access{
        address user;
        bool access;
    }

    mapping(address=>string[]) value;//to save file by user address and file address
    mapping(address=>mapping(address=>bool)) ownership; // whome to give permisssion for file by form of true and false
    mapping(address=>Access[]) accesslist; // whome to give permisssion for file store there address
    mapping(address=>mapping(address=>bool)) previousData; // to collect previos data

    function add(address user,string memory url) external {
        value[user].push(url);
    }

    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if(previousData[msg.sender][user]){
            for(uint i=0;i<accesslist[msg.sender].length;i++){
                if(accesslist[msg.sender][i].user == user){
                    accesslist[msg.sender][i].access = true;
                }
            }
        }else{
            accesslist[msg.sender].push(Access(user,true));
            previousData[msg.sender][user] = true;
        }
        //accesslist[msg.sender].push(Access(_user,true));//0xdef - true
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for(uint i=0;i<accesslist[msg.sender].length;i++){
            if(accesslist[msg.sender][i].user == user){
                accesslist[msg.sender][i].access = false;//0xdef - false
            }
        }
    }

    function display(address _user) external view returns(string[] memory){
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have any access");
        return value[_user];
    }

    function shareAccess() public view returns(Access[] memory){
        return accesslist[msg.sender];
    }
}