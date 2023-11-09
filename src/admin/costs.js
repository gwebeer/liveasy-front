// in src/posts.tsx
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

const CostListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);


export const CostList = (props) => {
    return (
        <List {...props} resource="Custos" filters={CostFilters} actions={<CostListActions/>}>
            <DatagridConfigurable rowStyle={postRowStyle} sx={{
                    "& .RaDatagrid-headerCell": {
                        backgroundColor: "#023047",
                        color: "white"
                    },
                }}>
                <TextField source="id" label="ID"/>
                <TextField source="process" label="Processo"/>
                <TextField source="title" label="Título"/>
                <TextField source="category" label="Categoria"/>
                <TextField source="value" label="Valor"/>
                <ArrayField source="action" label="Ações">
                        <EditButton />
                </ArrayField>
            </DatagridConfigurable>
        </List>
    )
};

export const CostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled label="ID"/>
            <TextInput source="process" disabled label="Processo"/>
            <TextInput source="title" label="Título"/>
            <TextInput source="category" label="Categoria"/>
            <TextInput source="value" label="Valor"/>
        </SimpleForm>
    </Edit>
);

export const CostCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled label="ID"/>
            <TextInput source="process" label="Processo"/>
            <TextInput source="title" label="Título"/>
            <TextInput source="category" label="Categoria"/>
            <TextInput source="value" label="Valor"/>
        </SimpleForm>
    </Create>
);

const CostFilters = [
    <TextInput source="q" label="Pesquisar" alwaysOn />,
    <ReferenceInput source="cost" label="cost" reference="cost" />,
];