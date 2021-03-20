import "../assets/style/todoList.css"
import { List, Button, Typography } from 'antd';
import { DeleteOutlined, ExclamationOutlined } from '@ant-design/icons';


export const TodoList = props => {
    const { data, deleteItem, doneItem, markItem } = props

    const handleDelete = (id) => {
        deleteItem(id)
    }

    const handleDone = (id) => {
        doneItem(id)
    }

    const handleMark = (id) => {
        markItem(id)
    }

    return (
        <List
            bordered
            dataSource={data}
            style={{marginTop: '1rem'}} 
            renderItem={({_id, title, isDone, isMarked}) => (
                <List.Item>
                    <div className="item-content">
                        <Typography.Text
                            delete={isDone}
                            strong={isMarked}
                            style={{color: isMarked ? '#4682b4' : 'unset', cursor: 'pointer'}}
                            onClick={() => handleDone(_id)}
                        >
                            {title}
                        </Typography.Text> 
                        <div>
                            <Button
                                icon={<DeleteOutlined />}
                                style={{marginRight: 7}}
                                danger
                                className="btn"
                                onClick={() => handleDelete(_id)}
                            />
                            <Button
                                icon={<ExclamationOutlined />}
                                className="btn btn-success"
                                onClick={() => handleMark(_id)}
                            />
                        </div>
                    </div>
                </List.Item>
            )}
        />
    )
}