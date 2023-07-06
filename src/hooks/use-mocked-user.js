export const useMockedUser = () => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  return {
    id: '00001',
    avatar: '/assets/avatars/avatar-marcus-finn.png',
    name: 'Triagem Web Tec',
    email: 'triagem.web@tec.com'
  };
};
