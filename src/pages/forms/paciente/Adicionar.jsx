import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
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
  Unstable_Grid2 as Grid,
  Container
} from '@mui/material';


import { InputCpf, InputDate, InputPhone, InputText } from '../InputMask';

const Page = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      nascimento: '',
      telefone: '',
      residencia: '',
    },
    validationSchema: Yup.object().shape({
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
      nascimento:
        Yup.string().
          required('Data de nascimento é obrigatório')
          .min(10, 'Data de nascimento deve ser no formato 00/00/0000 ')
          .max(10, 'Data de nascimento deve ser no formato 00/00/0000 ')
          .test('nascimento', 'Data de nascimento inválida', (value) => {
            const data = moment(value, 'DD/MM/YYYY');
            const hoje = moment();
            return data.isBefore(hoje);
          })
          .test('nascimento', 'Data de nascimento inválida', (value) => {
            const dataAtual = moment().format('DD/MM/YYYY');
            const dataNascimento = moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY');
            const idade = moment(dataAtual, 'DD/MM/YYYY').diff(moment(dataNascimento, 'DD/MM/YYYY'), 'years');
            return idade <= 130;
          }),
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
    }),
    onSubmit: async (values, helpers) => {
      try {
        await Axios.post('http://localhost:3331/paciente', values);
        helpers.setStatus({ success: true });
        router.push('/paciente');
        alert('Cadastrado realizado com sucesso!');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });


  return (
    <Container maxWidth="xl">
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#d4d4d4',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
            maxWidth: '70vw',
            margin: '0 auto',

          }}
        >
          <CardHeader
            title="Cadastrar Paciente"
            subheader="Preencha os campos abaixo para adicionar um novo paciente."
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
                    value={formik.values.nome.toUpperCase()}
                    error={!!(formik.touched.nome && formik.errors.nome)}
                    helperText={formik.touched.nome && formik.errors.nome}
                    InputProps={{
                      inputComponent: InputText,
                    }}
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.cpf}
                    error={!!(formik.touched.cpf && formik.errors.cpf)}
                    helperText={formik.touched.cpf && formik.errors.cpf}
                    InputProps={{
                      inputComponent: InputCpf,
                    }}
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.nascimento}
                    error={!!(formik.touched.nascimento && formik.errors.nascimento)}
                    helperText={formik.touched.nascimento && formik.errors.nascimento}
                    InputProps={{
                      inputComponent: InputDate,
                    }}
                  />
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
                    error={!!(formik.touched.telefone && formik.errors.telefone)}
                    helperText={formik.touched.telefone && formik.errors.telefone}
                    InputProps={{
                      inputComponent: InputPhone,
                    }}

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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.residencia.toUpperCase()}
                    error={!!(formik.touched.residencia && formik.errors.residencia)}
                    helperText={formik.touched.residencia && formik.errors.residencia}
                    InputProps={{
                      inputComponent: InputText,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Grid>
              <Button
                variant="contained"
                color="success"
                type="submit"
              >
                Cadastrar
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
      </form >
    </Container >
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
