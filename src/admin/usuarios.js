import { useMediaQuery } from "@mui/material";
import {
    ArrayField,
    Create,
    CreateButton,
    DatagridConfigurable,
    Edit, EditButton,
    EmailField,
    ExportButton,
    FilterButton,
    List,
    SelectColumnsButton,
    SimpleForm, SimpleList, TextField, TextInput,
    TopToolbar
} from "react-admin";

const postRowStyle = (record, index) => ({
    backgroundColor: record.nb_views >= 1 ? "#8ECAE6" : "#8ECAE6",
});
    

const UserListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export const ListaDeUsuariosList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={ListaDeUsuariosFilters} actions={<UserListActions/>}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <DatagridConfigurable rowStyle={postRowStyle} sx={{
                    "& .RaDatagrid-headerCell": {
                        backgroundColor: "#023047",
                        color: "white"
                    },
                }}>
                    <TextField source="id" label="ID"/>
                    <TextField source="name" label="Nome"/>
                    <EmailField source="email" label="Email" />
                    <TextField source="birthDate" label="Data de Nascimento" />
                    <TextField source="phone" label="Telefone"/>
                    <ArrayField source="action" label="Ações">
                        <EditButton />
                    </ArrayField>
                </DatagridConfigurable>
            )}
        </List>
    );
};

export const ListaDeUsuariosCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled label="ID" />
            <TextInput source="name" label="Nome"/>
             <TextInput source="email" label="Email"/>
             <TextInput source="birthDate" label="Data de Nascimento"/>
             <TextInput source="phone" label="Telefone"/>
             <TextInput source="password" label="Senha"/>
             <TextInput source="country" label="País"/>
        </SimpleForm>
    </Create>
);

export const ListaDeUsuariosEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Nome"/>
             <TextInput source="email" label="Email"/>
             <TextInput source="birthDate" label="Telefone"/>
             <TextInput source="phone" label="Telefone"/>
        </SimpleForm>
    </Edit>
);


export const ListaDeUsuariosFilters = [
    <TextInput source="q" label="Pesquisar" alwaysOn />,
    <TextInput source="id" label="ID" />,
    <TextInput source="name" label="Nome" />,
    <TextInput source="email" label="Email" />,
    <TextInput source="birthDate" label="Data de Nascimento" />,
    <TextInput source="phone" label="Telefone" />,
];






//Inserir dado em forma de data
//  <DateField source="published_at" />


//Inserir dado em forma de arquivo
//<FileField source="url" title="title" />
// renders the record { id: 123, url: 'doc.pdf', title: 'Presentation' } as 
//<div>
    //<a href="doc.pdf" title="Presentation">Presentation</a>
//</div>


//Inserir dado em forma de imagem
//import { ImageField } from 'react-admin';
//<ImageField source="url" title="title" />
// renders the record { id: 123, url: 'cat.png', title: 'meow' } as 
//<div>
    //<img src="cat.png" title="meow" />
//</div>


//Inserir dados em forma de números(int, float...)
//import { NumberField }  from 'react-admin';
//<NumberField source="views" />
// renders the record { id: 1234, views: 2108 } as
//<span>2 108</span>

//import { NumberField }  from 'react-admin';
//<NumberField source="score" options={{ maximumFractionDigits: 2 }}/>
// renders the record { id: 1234, score: 567.3567458569 } as
//<span>567.35</span>
//<NumberField source="share" options={{ style: 'percent' }} />
// renders the record { id: 1234, share: 0.2545 } as
//<span>25%</span>
//<NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
// renders the record { id: 1234, price: 25.99 } as
//<span>$25.99</span>
//<NumberField source="volume" options={{ style: 'unit', unit: 'liter' }} />
// renders the record { id: 1234, volume: 3500 } as
//<span>3,500 L</span>


// Inserir dados em forma de referencia para outro recurso
//import { Show, SimpleShowLayout, ReferenceField, TextField, DateField } from 'react-admin';

//export const PostShow = () => (
    //<Show>
        //<SimpleShowLayout>
            //<TextField source="id" />
            //<TextField source="title" />
            //<DateField source="published_at" />
            //<ReferenceField label="Author" source="user_id" reference="users" />
        //</SimpleShowLayout>
    //</Show>
//);