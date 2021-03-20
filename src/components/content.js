import "../assets/style/content.css"
import { connect } from 'react-redux'
import { TodoList } from "./list"
import { customFetch } from "../customFetch"
import { useState, useEffect, useRef } from "react"
import { deleteItem, addItem, doneItem, markItem, setItem } from "../redux/actions/index"
import { 
    Col, 
    Row, 
    Input, 
    Radio, 
    Layout, 
    Button, 
} from 'antd';

const Content = (props) => {
    const { data, deleteElm, addElm, doneElm, markElm, setElm } = props
    const [_data, setData] = useState(data)
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [activeTab, setActiveTab] = useState("a")
    const [searchText, setSearchText] = useState("")
    const [activeAndDone, setActiveAndDone] = useState({active: 0, done: 0})
    const { Content } = Layout;

    const inputRef = useRef()

    // Get items from database
    useEffect(() => {
        getItems()
    }, [])

    const getItems = () => {
        customFetch('/')
            .then(data => setElm(data))
            .catch(err => console.log(err))
    }

    // Update
    useEffect(() => {
        CountActiveAndDone()
        setData(data)
        handleSearch(searchText)
    }, [data])

    
    // Count active and done amount
    const CountActiveAndDone = () => {
        let done = 0;
        for (let {isDone} of data) {
            if(isDone) done++;
        }

        setActiveAndDone({active: data.length - done, done})
    }

    // Search
    const handleSearch = (val) => {
        setSearchText(val);
        setData(data.filter(({title}) => title.toLowerCase().includes(val.toLowerCase())))
    }

    // Add a new item
    const handleAddItem = () => {
        if(inputRef.current.value.trim().length) {
            setLoadingAdd(true)
            customFetch('/add', {
                method: "POST",
                body: JSON.stringify({title: inputRef.current.value})
            }).then(data => addElm(data))
            .catch(err => alert(err))
            .finally(() => setLoadingAdd(false))
        }
    }

    return (
        <Content className="content-body">
            <Row justify="center" style={{marginTop: '1rem'}}>
                <Col xs={24} sm={16} md={12} lg={8}>

                    <div className="content-title">
                        <h1 style={{fontSize: "40px", marginBottom: '8px'}}>Todo list</h1>
                        <h2 style={{color: "#6c757d", marginBottom: '8px'}}>
                            {activeAndDone.active} more to do, {activeAndDone.done} done
                        </h2>
                    </div>

                    <Input 
                        size="large" 
                        className="search-input"
                        placeholder="type to search" 
                        value={searchText}
                        onChange={e => handleSearch(e.target.value)}
                    />

                    <Radio.Group 
                        size="large"
                        defaultValue={activeTab}
                        buttonStyle="solid"
                        className="action-btn-group"
                        onChange={e => setActiveTab(e.target.value)}
                    >
                        <Radio.Button value="a">All</Radio.Button>
                        <Radio.Button value="b">Active</Radio.Button>
                        <Radio.Button value="c">Done</Radio.Button>
                    </Radio.Group>

                    {activeTab === "a" 
                        ? (
                            <TodoList 
                                data={_data} 
                                deleteItem={deleteElm}
                                doneItem={doneElm}
                                markItem={markElm}
                            />
                        ) : activeTab === "b" ? (
                            <TodoList 
                                data={_data.filter(({isDone}) => !isDone)} 
                                deleteItem={deleteElm}
                                doneItem={doneElm}
                                markItem={markElm}
                            />
                        ) : activeTab === "c" ? (
                            <TodoList 
                                data={_data.filter(({isDone}) => isDone)} 
                                deleteItem={deleteElm}
                                doneItem={doneElm}
                                markItem={markElm}
                            />
                        ) : <></>
                    }

                    <div className="adding-content">
                        <Input 
                            size="large" 
                            ref={inputRef}
                            placeholder="What needs to be done" 
                            onChange={e => {inputRef.current.value = e.target.value}}
                            onKeyPress={e => e.key === "Enter" && handleAddItem()}
                        />
                        <Button 
                            size="large"
                            className="add-btn"
                            loading={loadingAdd}
                            onClick={handleAddItem}
                        >
                            Add Item
                        </Button>
                    </div>

                </Col>
            </Row>
        </Content>
    )
}

const stateToProps = state => {
    return {
        data: state
    }
}

const manageItemToProps = dispatch => {
    return {
        setElm: val => dispatch(setItem(val)),
        deleteElm: id => dispatch(deleteItem(id)),
        addElm: newItem => dispatch(addItem(newItem)),
        doneElm: id => dispatch(doneItem(id)),
        markElm: id => dispatch(markItem(id))
    }
}

export default connect(stateToProps, manageItemToProps)(Content);