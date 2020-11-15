import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    TouchableHighlight,
    Alert,
    ScrollView,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import  shortid from 'shortid'

export const Formulario = ({citas, setCitas, guardarMostrarForm}) => {

    const [show, setShow] = useState(false);

    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState(new Date(1598051730000));
    const [hora, setHora] = useState(new Date(1598051730000));
    const [sintomas, setSintomas] = useState('');

    const [showTime, setShowTime] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShow(Platform.OS === 'ios');
        setFecha(currentDate);
    };
    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || hora;
        setShowTime(Platform.OS === 'ios');
        setHora(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };
    const showTimepicker = () => {
        setShowTime(true);
    };
    const hideDatepicker = () => {
        setShow(false);
    };
    const hideTimepicker = () => {
        setShowTime(false);
    };

    const submit = () => {
        if (paciente.trim() === '' ||
            propietario.trim() === '' ||
            telefono.trim() === '' ||
            fecha.toString().trim() === '' ||
            hora.toString().trim() === '' ||
            sintomas.trim() === ''
        ) {
            Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'ok'}]);
            return ;
        }
        const cita = {paciente, propietario, telefono, fecha, hora, sintomas}
        cita.id = shortid.generate()
        const citasNuevo = [...citas, cita]
        setCitas(citasNuevo)
        guardarMostrarForm(false)
    };


    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPaciente(text)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPropietario(text)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Telefono de contacto: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setTelefono(text)}
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <View>
                        <Text style={styles.label}>Fecha:</Text>
                        <Button onPress={showDatepicker} title="Seleccionar una fecha"/>
                        <Text style={styles.centerContent}>{fecha.toLocaleDateString()}</Text>
                    </View>
                    {show && <DateTimePicker
                        value={fecha}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        open={show}
                        locale='es_ES'
                        onChange={onChange}
                        onCancel={() => hideDatepicker} r
                        onConfirm={() => hideDatepicker}
                    />
                    }

                </View>
                <View>
                    <View>
                        <Text style={styles.label}>Hora:</Text>
                        <Button onPress={showTimepicker} title="Seleccionar una hora"/>
                        <Text style={styles.centerContent}>{hora.toLocaleDateString()}</Text>
                    </View>
                    {showTime && <DateTimePicker
                        value={hora}
                        mode='time'
                        is24Hour={true}
                        display="default"
                        locale='es_ES'
                        open={showTime}
                        onChange={onChangeTime}
                        onCancel={() => hideTimepicker} r
                        onConfirm={() => hideTimepicker}
                    />}
                </View>
                <View>
                    <Text style={styles.label}>Sintomas: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setSintomas(text)}
                        multiline
                    />
                </View>
                <View>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => submit()}
                    >
                        <Text style={styles.buttonTexto}> Guardar</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: '2.5%',
    },
    marginTop: {
        marginTop: 35,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    centerContent: {
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
});
