import {ToDo} from "../components/ToDo";
import {useEffect, useState} from "react";
import appStore from "../store/AppStore";
import serverApi from "../api/serverApi";
import {observer} from "mobx-react";
import {Dropdown, DropdownButton, Pagination} from "react-bootstrap";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 3;
    const [totalPages, setTotalPages] = useState(0);
    const [currentSort, setCurrentSort] = useState('id');

    const getTodos = async () => {
        const data = await serverApi.getTodos({
            page: currentPage, per_page: todosPerPage, sort_field: currentSort
        });
        if (data) {
            appStore.setTodos(data.todos);
            setTotalPages(data.current_page);
            setTotalPages(data.total_pages);
        }
    };

    useEffect(() => {
        getTodos();
    }, [currentPage, currentSort]);

    const toFirstPage = () => {
        setCurrentPage(1);
    }
    const toPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const toNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    const toLastPage = () => {
        setCurrentPage(totalPages);
    }


    return (<div className={"todoHome"}>
        <h1>Home</h1>
        <DropdownButton id="dropdown-basic-button" title="Сортировка" onClick={(event) => {
            if (event.target.dataset.sort) {
                setCurrentSort(event.target.dataset.sort);
            }
        }} >
            <Dropdown.Item href="#/action-1" data-sort="username">Username от А до Я</Dropdown.Item>
            <Dropdown.Item href="#/action-2" data-sort="-username">Username от Я до А</Dropdown.Item>
            <Dropdown.Item href="#/action-3" data-sort="email">Email от А до Я</Dropdown.Item>
            <Dropdown.Item href="#/action-4" data-sort="-email">Email от Я до А</Dropdown.Item>
            <Dropdown.Item href="#/action-5" data-sort="is_completed">Выполнено от А до Я</Dropdown.Item>
            <Dropdown.Item href="#/action-6" data-sort="-is_completed">Выполнено от Я до А</Dropdown.Item>
        </DropdownButton>

        {totalPages < 1 && <p>Задач нет</p>}

        {appStore.todos.map((item) => {
            return <ToDo key={item.id} {...item} />
        })}
        {totalPages > 1 && <Pagination>
            <Pagination.First onClick={toFirstPage}/>
            <Pagination.Prev onClick={toPrevPage}/>
            <Pagination.Item>{currentPage}/{totalPages}</Pagination.Item>
            <Pagination.Next onClick={toNextPage}/>
            <Pagination.Last onClick={toLastPage}/>
        </Pagination>}

    </div>);
}

export default observer(Home);
