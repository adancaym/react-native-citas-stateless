import React, {useState} from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Platform,
    Keyboard
} from 'react-native';

import {Cita} from './src/components/Cita';
import {Formulario} from './src/components/Formulario';

const App = () => {

    const [mostrarForm, guardarMostrarForm] = useState(false);

    const [citas, setCitas] = useState([ ]);

    const eliminarPaciente = id => {
        setCitas((citasAcutuales) => {
            return citasAcutuales.filter(cita => cita.id !== id);
        });
    };

    const mostrarFormulario = () => {
        guardarMostrarForm(!mostrarForm);
    };
    const cerrarTeclado = () => {
        Keyboard.dismiss()
    }
    return (
        <TouchableWithoutFeedback onPress={cerrarTeclado()}>
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Administrador de Citas</Text>
                <View>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => mostrarFormulario()}
                    >
                        <Text style={styles.buttonTexto}> {mostrarForm ? 'Cancelar cita':'Crear nueva Cita'}</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.contenido}>
                    {
                        mostrarForm ?
                            (
                                <>
                                    <Text style={styles.titulo}>Crear nueva Cita </Text>
                                    <Formulario
                                        citas={citas}
                                        setCitas={setCitas}
                                        guardarMostrarForm={guardarMostrarForm}
                                    />
                                </>
                            )
                            :
                            (
                                <>
                                    <Text style={styles.titulo}>
                                        {citas.length > 0 ? 'Administra tus de Citas' : 'No hay citas agrega una'}
                                    </Text>
                                    <FlatList
                                        style={styles.listado}
                                        data={citas}
                                        renderItem={({item}) => <Cita cita={item} eliminarPaciente={eliminarPaciente}/>}
                                        keyExtractor={(cita) => cita.id}
                                    />
                                </>
                            )
                    }
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#AA076B',
        minHeight: '100%',
    },
    titulo: {
        marginVertical: Platform.OS === 'ios' ? 20: 5,
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitulo: {
        marginVertical: 10,
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 10,
        backgroundColor: '#830553',
    },
    buttonTexto: {
        color: 'white',
        textAlign: 'center',
    },
    contenido: {
        flex: 1,
        marginHorizontal: '2.5%',
    },
    listado: {
        flex: 1,
        marginHorizontal: '2.5%',
    },
});

export default App;
