const { assert } = require('chai');
const { utils } = require('ethers')
const Todo = artifacts.require('Todo');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Todo', async ([deployer, ...accounts]) => {

    let todo;

    function toBytes32(text){
        return utils.formatBytes32String(text);
    }

    function toAscii(text){
        return utils.parseBytes32String(text);
    }

    before(async () => {
        todo = await Todo.new();
    })

    describe('Deployemnt', async() => {
        it('Deployed successfully', async () => {
            let ownerAddress = await todo.owner();
            assert.equal(ownerAddress, deployer, "owner address not equal to deployer address");
        })
    })

    describe('Functionality', async () => {
        it('Add item to the list', async () => {

            let title = toBytes32("AddItem")
            let description = toBytes32("Add Item to the list");

            await todo.addItem(title, description, {from: accounts[0]});

            let item = await todo.todolist(accounts[0], title);
            assert.equal(item.description, description, "Item Not Added to the list yet")

        })

        it('Set Item to done', async () => {

            let title = toBytes32("AddItem")

            await todo.setDone(title, {from :accounts[0]});

            let item = await todo.todolist(accounts[0], title);
            assert.equal((item.isDone).toString(), "true", "Item Not set to done yet")

        })
    })



})