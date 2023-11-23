import {
    Modal,
    Button,
    Form,

} from 'react-bootstrap'
import serverApi from "../api/serverApi";
import {useEffect, useState} from "react";
import appStore from "../store/AppStore";

const ModalEditTodo = ({id, username, email, text, is_completed, isShow, setIsShow}) => {
    const [error, setError] = useState(null);
    const [textTodo, setTextTodo] = useState(text);

    useEffect(() => {
        setTextTodo(text);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            id: id,
            text: event.target[2].value,
        };
        const response = await serverApi.editTodo(data);
        if (response.data?.status === "success") {
            setIsShow(false);
            appStore.setTodos(appStore.todos.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        text: event.target[2].value,
                        is_edited: true,
                    }
                }
                return item;
            }))
        } else {
            setError(response.data?.error);
        }
    };

    return (
        <Modal show={isShow} onHide={() => setIsShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование задачи</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control type="text" placeholder="Имя пользователя" value={username} readOnly/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} readOnly/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Текст задачи</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Текст задачи" value={textTodo} onChange={(event) => {
                            setTextTodo(event.target.value);
                        }}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Выполнено" checked={is_completed} />
                    </Form.Group>
                    {error ? <p className={"error"}>{error}</p> : ''}
                    <Button variant="primary" type="submit">
                        Сохранить
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    setIsShow(false);
                } }>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditTodo;