import {Dimensions, View, TouchableWithoutFeedback, Text} from 'react-native';
import {useState} from 'react'

const Joystick = () => {
    const [pressed, setPressed] = useState(false);
    
    return (
        <TouchableWithoutFeedback 
            onPressIn={ () => setPressed(true)}
            onPressOut={ () => setPressed(false)}>
        <View 
            style = {{
            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').width * 0.5,
            backgroundColor: pressed ? '#4B7F52': '#7DD181' ,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text> Mom, look, I am a circle! </Text>
        </View>
      </TouchableWithoutFeedback>
)
}

export default Joystick;