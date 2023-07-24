import {Dropdown, Button } from 'react-bootstrap';



function DropdownProperty() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic" size='sm'> 
        <i class="bi bi-pencil"></i>
      </Dropdown.Toggle>  
      <Dropdown.Menu variant='dark'>
        <Dropdown.Item href="/update-my-property">Edit</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Delete</Dropdown.Item> 
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownProperty;