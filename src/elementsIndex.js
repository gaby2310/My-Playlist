import React from 'react';
import {useContext, useState} from 'react';
import {AppContext} from './components/context/context';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Header from './components/app/header';


const ElementsIndex = () => {
    const [nameMV, handleChangeNameMV] = useState("");
    const [type, handleChangeType] = useState("");
    const [listFilter, handleChangeListFilter] = useState("All");
    const {localUser, addList, deleteList, cats, list} = useContext(AppContext);

    let filtered = (listFilter === "All") ? list : list.filter(({type}) => type === listFilter);

    return (
        <div className='elements'>
            <h2 class="ui header">
            <img alt="person-face" src="https://semantic-ui.com/images/avatar2/large/patrick.png" class="ui circular image" />
            { (localUser !== null) ? <Header username={localUser.name}/> : null }
</h2>
            
            <Card>
                <Card.Header>
                    <Form>
                        <Form.Row>


            <div class="ui form">
  <div class="field">
    <label>Nume:</label>
    <input placeholder='Denumire' value={nameMV} onChange={e => handleChangeNameMV((e.target.value))} type="text" />
  </div>
</div>

            <Col sm={4}>
            <Form.Control as='select' onChange={e => handleChangeType((e.target.value))}>
                {cats.map((element, idx) => {
                    return (<option key={idx}>{element}</option>)
                } )}
            </Form.Control>
            </Col>

            <div class="ui selection dropdown" onChange={e => handleChangeType((e.target.value))}>
                <input type="hidden" name="gender"/>
                <i class="dropdown icon"></i>
                <div class="default text">Gender</div>
                <div class="menu">
                    <div class="ui selection dropdown" onChange={e => handleChangeType((e.target.value))}></div>

                </div>
            </div>

            <Col sm={2}>
            <button class="ui right labeled icon button" type='submit' onClick={(e => {
                e.preventDefault();
                if (nameMV !== '' ) {
                    let newCats = (type !== '') ? type : cats[0];
                    addList(nameMV, newCats);
                    handleChangeNameMV('');
                }
            } )} > <i class="ellipsis horizontal icon"></i> ADAUGA </button>
            </Col>
            </Form.Row>
                </Form>
            </Card.Header>
                 <Card.Body className='list' >
                     <ToggleButtonGroup type='radio' name='options' defaultValue='Toate'>
                     <ToggleButton
                            value='Toate'
                            onClick={(() => {
                                handleChangeListFilter('Toate')
                            })}
                        > Toate </ToggleButton>
                        {cats.map((element, idx) => {
                                return (
                                    <ToggleButton
                                        key={idx}
                                        value={element}
                                        onClick={(() => {
                                            handleChangeListFilter(element)
                                        })}
                                    >
                                        {element}
                                    </ToggleButton>
                                )
                            }
                        )}
                     </ToggleButtonGroup>
                     <ListGroup variant="flush">
                        {filtered.map(item => {
                            return (
                                <ListGroup.Item key={item.id} className="playlist-item">
                                    <span>{item.name}</span>
                                    <button class="ui icon button"
                                        variant="danger"
                                        type="submit"
                                        onClick={(e => {
                                            e.preventDefault();
                                            deleteList(item.id)
                                        })}
                                    ><i class="trash alternate icon"></i></button>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                 </Card.Body>
             </Card>

            
        </div>
    )

};

export default ElementsIndex;
