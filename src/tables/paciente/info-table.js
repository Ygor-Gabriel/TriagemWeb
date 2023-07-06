import Axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import NextLink from 'next/link';

import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import MedicalInformation from '@mui/icons-material/MedicalInformationOutlined';


import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Link,
} from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';


import { Scrollbar } from 'src/components/scrollbar';

export const CustomersTable = (props) => {

  const baseUrl = 'http://localhost:3331/paciente';
  const [data, setData] = useState([]);
  const [busca, setBusca] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    Axios.get(baseUrl)
      .then(json => setData(json.data))
  }, [])

  const handleDelete = (id) => {
    if (confirm("Deseja realmente excluir?")) {
      Axios.delete(`${baseUrl}/${id}`)
        .then(() => {
          setData(datas => [
            ...datas.filter(datas => datas.id !== id),
          ]);
        })
      alert('Registro apagado com sucesso!');
    }
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    if (busca.length) {
      return data.filter((datas) => {
        return datas.nome.toLowerCase().includes(lowerBusca) || datas.cpf.toLowerCase().includes(lowerBusca);
      });
    }
    return data;
  }, [busca, data]);

  return (
    <>
      <Card sx={{ p: 2 }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Pesquisar por nome ou CPF"
          startAdornment={(
            <InputAdornment position="start">
              <SvgIcon
                color="action"
                fontSize="small"
              >
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          )}
          sx={{ maxWidth: 500 }}
          onChange={(e) => setBusca(e.target.value)}

        />
      </Card>
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Nome
                  </TableCell>
                  <TableCell>
                    CPF
                  </TableCell>
                  <TableCell>
                    Nascimento
                  </TableCell>
                  <TableCell>
                    Telefone
                  </TableCell>
                  <TableCell>
                    Residência
                  </TableCell>
                  <TableCell>
                    Atendimento
                  </TableCell>
                  <TableCell>
                    Excluir
                  </TableCell>
                  <TableCell>
                    Editar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData.length > 0 ? (
                  filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((datas) => (
                    <TableRow
                      hover
                      key={datas.id}
                    >
                      <TableCell>
                        <Link
                          color="inherit"
                          component={NextLink}
                          href={` /forms/paciente/editar/${datas.id}`}
                          underline="none"
                          variant="subtitle2"

                        >
                          {datas.nome}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {datas.cpf}
                      </TableCell>
                      <TableCell>
                        {datas.nascimento}
                      </TableCell>
                      <TableCell>
                        {datas.telefone}
                      </TableCell>
                      <TableCell>
                        {datas.residencia}
                      </TableCell>
                      <TableCell align='center'>
                        <Link
                          color="inherit"
                          component={NextLink}
                          href={` /forms/triagem/${datas.id}`}
                          underline="none"
                          variant="subtitle2"

                        >
                          <IconButton>
                            <SvgIcon
                              color="primary"
                              fontSize="small"
                            >
                              <MedicalInformation />
                            </SvgIcon>
                          </IconButton>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDelete(datas.id)}>
                          <SvgIcon
                            color="error"
                            fontSize="small"
                          >
                            <TrashIcon />
                          </SvgIcon>
                        </IconButton>
                      </TableCell>
                      <TableCell
                        id={datas.id}
                      >
                        <Link
                          component={NextLink}
                          href={` /forms/paciente/editar/${datas.id}`}
                          underline="hover"
                          variant="subtitle1"
                          color="inherit"

                        >
                          <IconButton>
                            <SvgIcon
                              color="primary"
                              fontSize="small"
                            >
                              <PencilIcon />
                            </SvgIcon>
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={7}
                      sx={{ py: 3 }}>
                      <Typography
                        color="textPrimary"
                        variant="h4">
                        Não há registros para exibir.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={filterData.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
};