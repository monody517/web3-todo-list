// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

enum levelType {
    gugu,
    normal,
    emergency
}

contract TodoList {
    address public owner; //合约拥有者
    uint256 public taskCount = 0; // 任务数量
    uint public creatAmount = 1; // 创建需要的token数
    uint256 public completeAmount = 2; // 完成获取的token数
    uint256 public tokenAmount; // 总共的token池子
    mapping(address => uint256) private _balances; //账本
    mapping(address => uint256) private _record; //  创建记录

    struct Task {
        // 任务结构
        uint256 id;
        string title;
        string content;
        string level;
        bool isCompleted;
    }

    Task[] public tasks;
    mapping(uint => address) private taskToOwner; // 任务拥有者地址

    event TaskCreated(
        uint256 id,
        string title,
        string content,
        string level,
        bool isCompleted
    );

    event TaskChanged(
        uint256 id,
        string title,
        string content,
        string level,
        bool isCompleted
    );

    event TaskCompleted(uint256 id);

    constructor() {
        owner = msg.sender;
        tokenAmount = 1024;
    }

    function getBalance(address addr) external view returns (uint) {
        return _balances[addr];
    }

    function getTasks() external view returns (Task[] memory) {
        return tasks;
    }

    function getTask(uint256 _id) external view returns (Task memory) {
        return tasks[_id - 1];
    }

    // 改变单次创建所需token
    function changeCreatAmount(uint256 _amount) external {
        require(owner == msg.sender, "Only the owner can change tokens");
        creatAmount = _amount;
    }

    // 改变完成获取token
    function changeCompleteAmount(uint256 _amount) external {
        require(owner == msg.sender, "Only the owner can change tokens");
        completeAmount = _amount;
    }

    // 创建任务
    function creatTask(
        string memory _title,
        string memory _content,
        string memory _level
    ) public {
        if (_record[msg.sender] != 1) {
            _record[msg.sender] = 1;
            _balances[msg.sender] = 5;
            tokenAmount -= 5;
        }

        require(
            _balances[msg.sender] >= creatAmount,
            "dont have enought token"
        );

        taskCount++;
        tasks.push(Task(taskCount, _title, _content, _level, false));
        taskToOwner[taskCount] = msg.sender;
        _balances[msg.sender] -= creatAmount;
        tokenAmount += creatAmount;
    }

    function changeTask(
        uint256 _id,
        string memory _title,
        string memory _content,
        string memory _level
    ) public {
        require(_id - 1 <= taskCount, "can't find this task");
        tasks[_id - 1].title = _title;
        tasks[_id - 1].content = _content;
        tasks[_id - 1].level = _level;
        emit TaskChanged(_id - 1, _title, _content, _level, false);
    }

    function finishTask(uint256 _id) public {
        tasks[_id - 1].isCompleted = true;
        _balances[msg.sender] += completeAmount;
        tokenAmount -= completeAmount;
        emit TaskCompleted(_id - 1);
    }
}
