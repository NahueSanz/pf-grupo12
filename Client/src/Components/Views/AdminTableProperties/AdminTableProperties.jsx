import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AdminTableProperties.module.css"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Switch, Typography, Grid } from '@mui/material';
import '@fontsource/roboto/400.css';

const AdminTableProperties = () => {   
  //propiedades estado
	const properties  = useSelector((state) => state.allProperties);
	const [ data, setData ] = useState(properties);
  //Paginado estados
	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //Search estado
  const [searchText, setSearchText] = useState('');

  //Cambia el estado enabled de una propiedad
  const handleToggle = (id) => {
		setData((prevState) =>
			prevState.map((prop) => (prop.id === id ? { ...prop, enabled: !prop.enabled } : prop))
		);
	};
  //Cambio de pagina
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //Ordenar el numero de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //Busqueda de propiedad mediante dueño
  const filteredData = data.filter((prop) =>
    (`${prop.User.name} ${prop.User.lastname}`).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {/* Titulo */}
      <Typography variant="h5" gutterBottom>
        Table Properties
      </Typography>
      {/* Search */}
      <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Buscar por Dueño"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <div style={{ marginBottom: '16px' }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Titulo</TableCell>
              <TableCell>Fecha de Posteo</TableCell>
              <TableCell>Dueño</TableCell>
              <TableCell>Habilitado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prop) => (
              <TableRow key={prop.id} className={styles.fila}>
                <TableCell>{prop.id}</TableCell>
                <TableCell>{prop.title}</TableCell>
                <TableCell>{prop.createdAt}</TableCell>
                <TableCell>{prop.User.name || prop.User.lastname?`${prop.User.name} ${prop.User.lastname}`:null}</TableCell>
                <TableCell>
                  <Switch
                    checked={prop.enabled}
                    color="primary"
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={() => handleToggle(prop.id)}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {prop.enabled ? 'Enabled' : 'Disabled'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginBottom: '8px' }}></div>
      {/* Paginado */}
      <TablePagination
        className={styles.customPagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AdminTableProperties;