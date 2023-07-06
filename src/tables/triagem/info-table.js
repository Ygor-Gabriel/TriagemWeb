import Axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import NextLink from 'next/link';

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
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  AZUL: 'info',
  AMARELO: 'warning',
  VERDE: 'success',
  VERMELHO: 'error'
};

export const CustomersTable = () => {

  const baseUrl = 'http://localhost:3331/triagem';
  const [data, setData] = useState([]);
  const [busca, setBusca] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    Axios.get(baseUrl)
      .then(json => setData(json.data))
  }, [])

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const orderByClassificacao = (data) => {

    const classificacao = data;

    if (classificacao === 'VERMELHO') {
      return 1;
    } else if (classificacao === 'AMARELO') {
      return 2;
    } else if (classificacao === 'VERDE') {
      return 3;
    } else if (classificacao === 'AZUL') {
      return 4;
    } else {
      return 0;
    }

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
                    Residência
                  </TableCell>
                  <TableCell>
                    Pressão
                  </TableCell>
                  <TableCell>
                    Temperatura
                  </TableCell>
                  <TableCell>
                    Classificação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData.length > 0 ? (filterData
                  .sort((a, b) => orderByClassificacao(a.classificacao) - orderByClassificacao(b.classificacao))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((datas) => (
                    <TableRow
                      hover
                      key={datas.id}
                    >
                      <TableCell>
                        {datas.nome}
                      </TableCell>
                      <TableCell>
                        {datas.cpf}
                      </TableCell>
                      <TableCell>
                        {datas.nascimento}
                      </TableCell>
                      <TableCell>
                        {datas.residencia}
                      </TableCell>
                      <TableCell>
                        {datas.pressao}
                      </TableCell>
                      <TableCell align="left">
                        {datas.temperatura}
                      </TableCell>
                      <TableCell align='left'>
                        <SeverityPill color={statusMap[datas.classificacao]}>
                          {datas.classificacao}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                  ))) : (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          p: 3
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="h4"
                        >
                          Não há registros
                        </Typography>
                      </Box>
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