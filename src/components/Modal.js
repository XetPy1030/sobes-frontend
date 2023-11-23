import appStore from "../store/AppStore";
import {observer} from "mobx-react";
import {
    Modal,
    Button
} from "react-bootstrap"

const MyModal = () => {
    return (
        <Modal show={appStore.modal.show} onHide={() => appStore.setModal({show: false})}>
            <Modal.Header closeButton>
                <Modal.Title>{appStore.modal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{appStore.modal.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    appStore.setModal({show: false});
                }}>
                    Ок
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default observer(MyModal);