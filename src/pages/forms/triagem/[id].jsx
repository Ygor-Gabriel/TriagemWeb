import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Head from 'next/head';
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

import { InputClassificacao, InputPressao } from "../InputMask";

export async function getStaticProps({ params }) {
  const response = await fetch(`http://localhost:3331/paciente/${params.id}`);

  const data = await response.json();

  return {
    props: {
      dados: data,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await fetch(`http://localhost:3331/paciente`);

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
      nascimento: dados.nascimento,
      residencia: dados.residencia,
      classificacao: '',
      pressao: '',
      temperatura: '',
    },
    validationSchema: Yup.object({
      classificacao: Yup
      .string()
      .required('Campo obrigatório'),
      pressao: Yup
      .string()
      .required('Campo obrigatório'),
      temperatura: Yup
        .string()
        .required('Campo obrigatório')
        .matches(/^[0-9]{2}\.[0-9]$/, 'Temperatura inválida'),
    }),
    onSubmit: async (values) => {
      try {
        await Axios.post(`http://localhost:3331/triagem`, values);
        router.push('/triagem');
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(formik.values);

  return (
    <>
      <Head>
        <title>Triagem</title>
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
            title={`Triagem do paciente: ${dados.nome}`}
            subheader="Preencha os campos abaixo para realizar a triagem."
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
                    value={formik.values.nome}
                    disabled={true}
                  />

                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="CPF"
                    name="cpf"
                    value={formik.values.cpf}
                    disabled={true}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Data de Nascimento"
                    name="nascimento"
                    value={formik.values.nascimento}
                    disabled={true}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Residencia"
                    name="residencia"
                    value={formik.values.residencia}
                    disabled={true}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Typography color="grey">
                    Classificação de Risco
                  </Typography>
                  <InputClassificacao
                    fullWidth
                    label="Classificação"
                    name="classificacao"
                    value={formik.values.classificacao}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.classificacao && formik.touched.classificacao ? (
                    <Typography color="red">{formik.errors.classificacao}</Typography>
                  ) : null}
                </Grid>
                <Grid
                  xs={12}
                  md={3}
                >
                  <Typography color="grey">
                    Pressão Arterial
                  </Typography>
                  <TextField
                    fullWidth
                    name="pressao"
                    value={formik.values.pressao}
                    onChange={formik.handleChange}
                    InputProps={
                      { inputComponent: InputPressao }
                    }
                    focused={true}
                  />
                  {formik.errors.pressao && formik.touched.pressao ? (
                    <Typography color="red">{formik.errors.pressao}</Typography>
                  ) : null}
                </Grid>
                <Grid
                  xs={12}
                  md={3}
                >
                  <Typography color="grey">
                    Temperatura
                  </Typography>
                  <TextField
                    fullWidth
                    name="temperatura"
                    value={formik.values.temperatura}
                    onChange={formik.handleChange}
                    focused={true}
                  />
                  {formik.errors.temperatura && formik.touched.temperatura ? (
                    <Typography color="red">{formik.errors.temperatura}</Typography>
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
                color="success"
              >
                Salvar
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