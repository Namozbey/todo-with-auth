import "../assets/style/todoList.css"
import { useState } from "react"
import { customFetch } from "../customFetch"
import { List, Button, Typography } from 'antd';
import { DeleteOutlined, ExclamationOutlined } from '@ant-design/icons';


export const TodoList = props => {
    const { data, deleteItem, doneItem, markItem } = props
    const [deleteLoading, setDeleteLoading] = useState('')
    const [doneLoading, setDoneLoading] = useState(false)
    const [markLoading, setMarkLoading] = useState('')

    const handleDelete = (id) => {
        setDeleteLoading(id)
        customFetch('/delete', {
            method: "DELETE",
            body: JSON.stringify({id})
        }).then(() => deleteItem(id))
        .catch(err => alert(err))
        .finally(() => setDeleteLoading(''))
    }

    const handleDone = (id, isDone) => {
        setDoneLoading(true)
        customFetch('/update', {
            method: 'PUT',
            body: JSON.stringify({id, name: "isDone", val: !isDone})
        }).then(() => doneItem(id))
        .catch(err => alert(err))
        .finally(() => setDoneLoading(false))
    }

    const handleMark = (id, isMarked) => {
        setMarkLoading(id)
        customFetch('/update', {
            method: 'PUT',
            body: JSON.stringify({id, name: "isMarked", val: !isMarked})
        }).then(() => markItem(id))
        .catch(err => alert(err))
        .finally(() => setMarkLoading(''))
        
    }

    return (
        <List
            bordered
            loading={doneLoading}
            dataSource={data}
            style={{marginTop: '1rem'}} 
            renderItem={({_id, title, isDone, isMarked}) => (
                <List.Item>
                    <div className="item-content">
                        <Typography.Text
                            delete={isDone}
                            strong={isMarked}
                            style={{color: isMarked ? '#4682b4' : 'unset', cursor: 'pointer'}}
                            onClick={() => handleDone(_id, isDone)}
                        >
                            {title}
                        </Typography.Text> 
                        <div>
                            <Button
                                danger
                                loading={deleteLoading === _id ? 1 : 0}
                                icon={<DeleteOutlined />}
                                style={{marginRight: 7}}
                                className="btn"
                                onClick={() => handleDelete(_id)}
                            />
                            <Button
                                loading={markLoading === _id ? 1 : 0}
                                icon={<ExclamationOutlined />}
                                className="btn btn-success"
                                onClick={() => handleMark(_id, isMarked)}
                            />
                        </div>
                    </div>
                </List.Item>
            )}
        />
    )
}