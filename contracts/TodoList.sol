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

    mapping(address => Task[]) private tasks; // 任务列表

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
        return tasks[msg.sender];
    }

    function getTask(uint256 _id) external view returns (Task memory) {
        return tasks[msg.sender][_id - 1];
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
            _balances[msg.sender] = 2;
            tokenAmount -= 2;
        }

        require(_balances[msg.sender] > 0, "dont have enought token");

        taskCount++;
        tasks[msg.sender].push(
            Task(taskCount, _title, _content, _level, false)
        );
        _balances[msg.sender] -= 1;
        tokenAmount += 1;
        emit TaskCreated(taskCount, _title, _content, _level, false);
    }

    function changeTask(
        uint256 _id,
        string memory _title,
        string memory _content,
        string memory _level
    ) public {
        require(_id - 1 <= taskCount, "can't find this task");
        tasks[msg.sender][_id - 1].title = _title;
        tasks[msg.sender][_id - 1].content = _content;
        tasks[msg.sender][_id - 1].level = _level;
        emit TaskChanged(_id - 1, _title, _content, _level, false);
    }

    function finishTask(uint256 _id) public {
        tasks[msg.sender][_id - 1].isCompleted = true;
        emit TaskCompleted(_id - 1);
    }
}
