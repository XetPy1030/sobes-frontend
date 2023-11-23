import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {useState} from "react";
import ModalEditTodo from "./ModalEditTodo";
import serverApi from "../api/serverApi";
import appStore from "../store/AppStore";

export const ToDo = ({id, username, email, text, is_completed, is_edited}) => {
    const [isShow, setIsShow] = useState(false);
    const [error, setError] = useState(null);

    const handleCompleted = async () => {
        const response = await serverApi.completeTodo({id});
        if (response.data?.status === "success") {
            appStore.setTodos(appStore.todos.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        is_completed: true,
                    }
                }
                return item;
            }))
        } else {
            setError(response.data?.error);
        }
    }

    return (
        <Container className={'todo'}>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{username}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                            <Card.Text>{text}</Card.Text>
                            <Card.Text href="#">{is_completed ? 'Выполнено' : 'Не выполнено'}</Card.Text>
                            {is_edited ? <Card.Text href="#">Отредактировано администратором</Card.Text> : ''}

                            <Button variant="primary" onClick={
                                () => setIsShow(true)
                            }>Редактировать</Button>
                            <ModalEditTodo
                                isShow={isShow} setIsShow={setIsShow}
                                id={id} username={username} email={email}
                                text={text} is_completed={is_completed} is_edited={is_edited}
                            />
                            <br/>
                            {error ? <p className={"error"}>{error}</p> : ''}
                            <Button variant="primary" onClick={handleCompleted}>Отметить как выполненное</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}