import React from 'react'
import { StyleSheet, View, Text, Image,  TextInput, TouchableOpacity, } from 'react-native'

import Firebase from '../config/Firebase'

export default class AddTeacher extends React.Component {
    constructor() {
        super()
        this.state = {
            className: '', 
            classTime: '',
            teacherUID: '',
            teacherName: ''
        }
    }
    handleCreation = () => {
        let data = {
            className: this.state.className,
            Time: this.state.classTime,
            meetingDays: [],
            Students: [],
            TeacherUID:this.state.teacherUID, 
            TeacherName: this.state.teacherName,
            Attendance: {} 
        }
        Firebase.firestore().collection('classes').doc().set(data)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({ errMsg: error.message }))
    }
   
  render() {
    return (
        <View style = {styles.container}>
            <View style = {styles.square}>
                <Image style = {styles.logo } source={require('../assets/logo.png')} />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.teacherName}
                    onChangeText={teacherName => this.setState({ teacherName: teacherName })}
                    placeholder="Teacher's Name"
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.teacherUID}
                    onChangeText={teacherUID => this.setState({ teacherUID: teacherUID })}
                    placeholder="Teacher's UID"
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.className}
                    onChangeText={className => this.setState({ className: className })}
                    placeholder='Class Name'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.classTime}
                    onChangeText={classTime => this.setState({ classTime: classTime})}
                    placeholder='Class Time'
                />
                
                <TouchableOpacity style={styles.button} onPress={() => this.handleCreation()}>
                    <Text style={styles.buttonText}>create class</Text>
                </TouchableOpacity>
        
            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    square: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 500,
        height: 570,
        backgroundColor: 'white',
        borderRadius: 10
    },
    logo: {
        alignItems: 'center',
        width: 200,
        height: 200        
    },
    inputBox: {
        width: '80%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#7B1D0B',
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        width: 130
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})
