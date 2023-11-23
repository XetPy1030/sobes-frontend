import {Container, Nav, Navbar} from "react-bootstrap";
import {useRouterStore} from "mobx-state-router";
import appStore from "../store/AppStore";
import {observer} from "mobx-react";
import serverApi from "../api/serverApi";

const Header = () => {
    const routerStore = useRouterStore();

    const handleSignOut = async () => {
        const response = await serverApi.signOut();
        if (response.data?.status === "success") {
            appStore.setToken(null);
        }
    };

    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => routerStore.goTo('home')}>
                    XetPy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => routerStore.goTo('home')}>Home</Nav.Link>
                        <Nav.Link onClick={() => routerStore.goTo('todo_create')}>Todo Create</Nav.Link>
                        {appStore.token ?
                            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
                            :
                            <Nav.Link onClick={() => routerStore.goTo('sign_in')}>Sign In</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default observer(Header);
