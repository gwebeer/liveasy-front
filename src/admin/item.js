import {
    ArrayField,
    Create,
    CreateButton,
    DatagridConfigurable,
    Edit,
    EditButton,
    ExportButton,
    FilterButton,
    List,
    ReferenceInput,
    SelectColumnsButton,
    SimpleForm,
    TextField,
    TextInput,
    TopToolbar
} from "react-admin";

const postRowStyle = (record, index) => ({
    backgroundColor: record.nb_views >= 1 ? "#8ECAE6" : "#8ECAE6",
});

const ItemListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export const ItensList = (props) => {
    return (
        <List {...props} resource="Itens" filters={ItensFilters} actions={<ItemListActions/>}>
           <DatagridConfigurable rowStyle={postRowStyle} sx={{
                    "& .RaDatagrid-headerCell": {
                        backgroundColor: "#023047",
                        color: "white", 
                    }
                }}>
                <TextField source="id" label="ID"/>
                <TextField source="title" label="Título"/>
                <TextField source="category" label="Categoria"/>
                <TextField source="convenient" label="Cômodo"/>
                <ArrayField source="action" label="Ações">
                        <EditButton />
                </ArrayField>
            </DatagridConfigurable>
        </List>
    )
};

export const ItensEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled label="ID"/>
            <TextInput source="title" label="Título"/>
            <TextInput source="category" label="Categoria"/>
            <TextInput source="convenient" label="Cômodo"/>
        </SimpleForm>
    </Edit>
);

export const ItensCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled label="ID"/>
            <TextInput source="title" label="Título"/>
            <TextInput source="category" label="Categoria"/>
            <TextInput source="convenient" label="Cômodo"/>
        </SimpleForm>
    </Create>
);

const ItensFilters = [
    <TextInput source="q" label="Pesquisar" alwaysOn />,
    <ReferenceInput source="title" label="Título" reference="title" />,
    <ReferenceInput source="convenient" label="Cômodo" reference="convenient" />
];
