import { Menu } from 'react-admin';

export const MyMenu = () => (
  <div style={{ height: '100vh' }}>
    <Menu sx={{ backgroundColor: "#023047", color: "#219EBC", height: '100%' }}>
      <Menu.DashboardItem />
      <Menu.ResourceItem name="Usuarios" sx={{ color: "#219EBC" }} />
      <Menu.ResourceItem name="Itens" sx={{ color: "#219EBC" }} />
      <Menu.ResourceItem name="Custos" sx={{ color: "#219EBC" }} />
      <Menu.ResourceItem name="Linha" sx={{ color: "#219EBC" }} />
      <Menu.ResourceItem name="Barra" sx={{ color: "#219EBC" }} />
      <Menu.ResourceItem name="Pizza" sx={{ color: "#FB8500" }} />
      <Menu.ResourceItem name="Geografico" sx={{ color: "#FB8500" }} />
      <Menu.ResourceItem name="Calendario" sx={{ color: "#FB8500" }} />
    </Menu>
  </div>
);
