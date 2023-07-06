import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Head from 'next/head';
import moment from 'moment';
import * as Yup from 'yup';
import Axios from 'axios';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

import { InputCpf, InputDate, InputPhone, InputText } from "../../InputMask";

export async function getStaticProps({ params }) {
  const response = await fetch(`http://localhost:3331/recepcionista/${params.id}`);

  const data = await response.json();

  return {
    props: {
      dados: data,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await fetch(`http://localhost:3331/recepcionista`);

  const data = await response.json();

  const paths = data.map((dado) => {
    return { params: { id: dado.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
}


export default function Todo({ dados }) {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nome: dados.nome,
      cpf: dados.cpf,
      cr: dados.cr,
      nascimento: dados.nascimento,
      residencia: dados.residencia,
      telefone: dados.telefone,
      email: dados.email,
      senha: dados.senha,
    },
    validationSchema: Yup.object({
      nome: Yup
        .string()
        .required('Nome é obrigatório')
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Nome deve conter apenas letras'),
      cpf: Yup
        .string()
        .required('CPF é obrigatório')
        .min(14, 'CPF deve ter no mínimo 11 caracteres')
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF deve ser no formato 000.000.000-00'),
      cr: Yup
        .string(),
      nascimento:
        Yup.string().
          required('Data de nascimento é obrigatório')
          .min(10, 'Data de nascimento deve ser no formato 00/00/0000 ')
          .max(10, 'Data de nascimento deve ser no formato 00/00/0000 ')
          .test('age', 'Data de nascimento inválida',
            value => moment().diff(moment(value, 'DD/MM/YYYY'), 'years') >= 18 && moment().diff(moment(value, 'DD/MM/YYYY'), 'years') <= 100 && moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY') === moment(value, 'DD/MM/YYYY).isValid()').format('DD/MM/YYYY')),
      telefone: Yup
        .string()
        .required('Telefone é obrigatório')
        .min(15, 'Telefone deve ser no formato (83) 00000-0000')
        .matches(/^\(\d{2}\)\s\d{5}\-\d{4}$/, 'Telefone deve ser no formato (00) 00000-0000'),
      residencia: Yup
        .string()
        .required('Residência é obrigatório')
        .min(3, 'Residência deve ter no mínimo 3 caracteres')
        .matches(/.*\S.*$/, 'Residência não pode ser apenas espaços'),
      email: Yup
        .string()
        .required('E-mail é obrigatório')
        .email('E-mail inválido'),
      senha: Yup
        .string()
        .required('Senha é obrigatório')
        .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    }),
    onSubmit: async (values) => {
      try {
        await Axios.put(`http://localhost:3331/recepcionista/${dados.id}`, values);
        router.push('/recepcionista');
      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <>
      <Head>
        <title>Editar Recepcionista</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#d4d4d4',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
            maxWidth: '70vw',
            margin: '0 auto',
            marginTop: '50px',
          }}
        >
          <CardHeader
            title={`Editar dados de: ${dados.nome}`}
            subheader="Preencha os campos abaixo para editar os dados."
            sx={{
              mb: 5,
              textAlign: 'center',
            }}
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Nome completo"
                    name="nome"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.nome}
                    InputProps={{
                      inputComponent: InputText,
                    }}
                  />
                  {formik.touched.nome && formik.errors.nome ? (
                    <Typography color="error">{formik.errors.nome}</Typography>
                  ) : null}
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="CPF"
                    name="cpf"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.cpf}
                    InputProps={{
                      inputComponent: InputCpf,
                    }}
                  />
                  {formik.touched.cpf && formik.errors.cpf ? (
                    <Typography color="error">{formik.errors.cpf}</Typography>
                  ) : null}
                  <span value={formik.values.cr = formik.values.cpf.substring(0, 6)} />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Data de Nascimento"
                    name="nascimento"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.nascimento}
                    InputProps={{
                      inputComponent: InputDate,
                    }}
                  />
                  {formik.touched.nascimento && formik.errors.nascimento ? (
                    <Typography color="error">{formik.errors.nascimento}</Typography>
                  ) : null}
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="telefone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.telefone}
                    InputProps={{
                      inputComponent: InputPhone,
                    }}
                  />
                  {formik.touched.telefone && formik.errors.telefone ? (
                    <Typography color="error">{formik.errors.telefone}</Typography>
                  ) : null}
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Residencia"
                    name="residencia"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.residencia}
                    InputProps={{
                      inputComponent: InputText,
                    }}
                  />
                  {formik.touched.residencia && formik.errors.residencia ? (
                    <Typography color="error">{formik.errors.residencia}</Typography>
                  ) : null}
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 5 }} />
            <Box
              sx={{
                mt: 3,
                textAlign: 'center',
              }}
            >
              <Typography
                color="textPrimary"
                variant="h6"
              >
                Dados de acesso
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Insira os dados de acesso do recepcionista.
              </Typography>
              <Divider sx={{ my: 3 }} />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Typography color="error">{formik.errors.email}</Typography>
                  ) : null}
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Senha"
                    name="senha"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.senha}
                    type="password"
                  />
                  {formik.touched.senha && formik.errors.senha ? (
                    <Typography color="error">{formik.errors.senha}</Typography>
                  ) : null}
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Grid>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: '#ffa500',
                }}
              >
                Atualizar
              </Button>
              <Button
                sx={{ mx: 2 }}
                variant="contained"
                color="primary"
                onClick={() => router.back()}
              >
                Voltar
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
    </>
  );
}