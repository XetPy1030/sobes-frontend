import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import serverApi from "../api/serverApi";
import {useState} from "react";
import appStore from "../store/AppStore";

const ToDoCreate = () => {
    const [error, setError] = useState(null);

    const addTodo = async (data) => {
        const response = await serverApi.addTodo(data);
        if (response.data?.status === "success") {
            appStore.setModal({
                show: true,
                title: 'Успех',
                body: 'Задача успешно добавлена',
                type: 'success',
            });
        }
        else {
            setError(response.data?.error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: event.target[0].value,
            email: event.target[1].value,
            text: event.target[2].value,
        };
        addTodo(data);
    };

    return (
        <Container className={'todoCreate'}>
            <h1>ToDo Create</h1>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Text</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter text"/>
                                </Form.Group>

                                {error ? <p className={"error"}>{error}</p> : ''}

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ToDoCreate;
