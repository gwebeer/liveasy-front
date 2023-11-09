import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import ptBrMessages from 'ra-language-pt-br';
import React from 'react';
import { Admin, Resource, ThemeProvider, defaultTheme } from 'react-admin';
import { BiCalendar, BiLineChart } from "react-icons/bi";
import { BsFillBarChartLineFill, BsFillPieChartFill, BsGeoAltFill } from "react-icons/bs";
import { FaCoins } from "react-icons/fa6";
import BarChartComponent from "./BarChartComponent";
import { MyLayout } from "./Layout";
import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";
import Calendar from "./calendar";
import { CostCreate, CostEdit, CostList } from "./costs";
import { Dashboard } from "./dashboard";
import dataProvider from './dataProvider';
import Geography from "./geoChart";
import { ItensCreate, ItensEdit, ItensList } from './item';
import { ListaDeUsuariosCreate, ListaDeUsuariosEdit, ListaDeUsuariosFilters, ListaDeUsuariosList } from "./usuarios";

const messages = {
  'pt-br': ptBrMessages,
};
const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br');

const lightTheme = defaultTheme;
const darkTheme = { ...defaultTheme, palette: { mode: 'dark' } };
const customTheme = {
    ...lightTheme,
    palette: {
      ...lightTheme.palette,
      background: {
        default: '#FB8500',
      },
    },
  };
  
  const App = () => {
    return (
      <ThemeProvider theme={customTheme}>
        <Admin i18nProvider={i18nProvider} layout={MyLayout} dataProvider={dataProvider} dashboard={Dashboard} theme={lightTheme} darkTheme={darkTheme}>
          <Resource name="Usuarios" list={ListaDeUsuariosList} edit={ListaDeUsuariosEdit} create={ListaDeUsuariosCreate} filter={ListaDeUsuariosFilters} icon={UserIcon} />
          <Resource name="Itens" list={ItensList} edit={ItensEdit} create={ItensCreate} icon={PostIcon} />
          <Resource name="Custos" list={CostList} edit={CostEdit} create={CostCreate} icon={FaCoins} />
          <Resource name="Linha" list={LineChartComponent} icon={BiLineChart}/>
          <Resource name="Barra" list={BarChartComponent} icon={BsFillBarChartLineFill}/>
          <Resource name="Pizza" list={PieChartComponent} icon={BsFillPieChartFill}/>
          <Resource name="Geografico" list={Geography} icon={BsGeoAltFill}/>
          <Resource name="Calendario" list={Calendar} icon={BiCalendar}/>
        </Admin>
      </ThemeProvider>
    );
  };
  
  export default App;