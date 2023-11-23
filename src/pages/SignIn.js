import {
    Container,
    Row,
    Col,
    Form,
    Button,

} from 'react-bootstrap'
import serverApi from "../api/serverApi";
import {useState} from "react";
import appStore from "../store/AppStore";
import {useRouterStore} from "mobx-state-router";

const SignIn = () => {
    const [error, setError] = useState(null);
    const routerStore = useRouterStore();

    const handleSignIn = async (event) => {
        event.preventDefault();
        const data = {
            username: event.target[0].value,
            password: event.target[1].value,
        };
        const response = await serverApi.signIn(data);
        if (response.data?.token) {
            appStore.setToken(response.data.token);
            routerStore.goTo('home');
        } else {
            setError(response.data?.error);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Sign In</h1>
                    <Form onSubmit={handleSignIn}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control/>
                        </Form.Group>

                        {error ? <p className={"error"}>{error}</p> : ''}

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;