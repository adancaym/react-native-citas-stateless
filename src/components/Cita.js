import React from 'react';
import {Text, View, StyleSheet, Button, TouchableHighlight} from 'react-native';

export const Cita = ({cita, eliminarPaciente}) => {
    const dialogoEliminar = id => {
        console.log(id)
        eliminarPaciente(id);
    };
    return (
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.texto}>{cita.paciente}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario: </Text>
                <Text style={styles.texto}>{cita.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas: </Text>
                <Text style={styles.texto}>{cita.sintomas}</Text>
            </View>
            <View>
                <TouchableHighlight
                    style={styles.buttonEliminar}
                    onPress={() => dialogoEliminar(cita.id)}
                >
                    <Text style={styles.buttonEliminarTexto}> &times; Eliminar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#E1E1E1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
    },
    texto: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonEliminar: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 10,
        backgroundColor: 'red',
    },
    buttonEliminarTexto: {
        color: 'white',
        textAlign: 'center',
    },
});
