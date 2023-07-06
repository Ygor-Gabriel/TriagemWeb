import { UsersIcon, UserPlusIcon, UserIcon, ChartBarIcon } from '@heroicons/react/24/solid';

import { MedicalInformation } from '@mui/icons-material';

import { SvgIcon } from '@mui/material';


export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Administrador',
    path: '/administrador',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Recepcionista',
    path: '/recepcionista',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Médico',
    path: '/medico',
    icon: (
      <SvgIcon fontSize="small">
        <MedicalInformation />
      </SvgIcon>
    )
  },
  {
    title: 'Enfermeiro',
    path: '/enfermeiro',
    icon: (
      <SvgIcon fontSize="small">
        <MedicalInformation />
      </SvgIcon>
    )
  },
  {
    title: 'Paciente',
    path: '/paciente',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Triagem',
    path: '/triagem',
    icon: (
      <SvgIcon fontSize="small">
        <MedicalInformation />
      </SvgIcon>
    )
  }
];
