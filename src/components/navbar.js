import "../assets/style/navbar.css"
import { Layout, Avatar, Typography } from 'antd';

export const Navbar = () => {
    const { Text } = Typography;
    const { Header } = Layout;

    return (
        <Header className="nav-header">
            <Avatar className="avatar" size="large" gap={4}>
                N
            </Avatar>
            <Text className="nav-text">Namoz Ostonayev</Text>
        </Header>
    )
}