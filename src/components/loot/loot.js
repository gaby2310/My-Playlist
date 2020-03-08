import React, {useEffect, useState} from 'react';
import {AppContext} from '../context/context';

const Loot = (props) => {
    const canRedirectLS = JSON.parse(localStorage.getItem('redirectLS'));
    const localUser = JSON.parse(localStorage.getItem('user'));
    const [redirectLS, handleChangeRedirectLS] = useState(false);

    const [cats, handleChangeCats] = useState([]);
    const [list, handleChangeList] = useState([]);

    useEffect(() => {
        handleChangeCats(['MUZICA', 'VIDEO'])
    }, []);

const addList = (name, type) => {
    const prevList = [...list];

    const createItem = {
        id: name + Math.random().toString(36).substr(2,9),
        name,
        type
    };

    const newList = [...prevList, {...createItem}];

    handleChangeList(newList);
};

const deleteList = (itemId) => {
    const newArr = list.filter(({id}) => id !== itemId );
    handleChangeList(newArr);
};

return (
    <AppContext.Provider value= {
        {
            canRedirectLS: canRedirectLS,
            redirectLS: redirectLS,
            handleChangeRedirectLS: handleChangeRedirectLS,
            localUser: localUser,
            list: list,
            cats: cats,
            addList,
            deleteList
        }
    } > {props.children} </AppContext.Provider>
)


};

export default Loot;